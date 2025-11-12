import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, UserRole, isTestMode } from '../lib/supabase'

interface UserProfile {
  id: string
  role: UserRole
  email: string
  name: string
  avatar_url: string | null
  timezone: string
  country: string | null
  is_anonymous_handle: boolean
  anonymous_handle: string | null
  crisis_flag: boolean
}

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>
  signIn: (email: string, password: string, role?: UserRole) => Promise<UserProfile | null>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Test mode user database (localStorage-based)
// SECURITY NOTE: Test mode stores passwords in plain text in localStorage
// This is INTENTIONAL and ONLY for local testing/development
// DO NOT use test mode in production or with real user data
const TEST_USERS_KEY = 'niramaya_test_users'
const TEST_SESSION_KEY = 'niramaya_test_session'

const defaultTestUsers = [
  { 
    id: 'test-user-1',
    email: 'testuser@example.com', 
    password: 'Test123', 
    name: 'Test User', 
    role: 'User' as UserRole,
    avatar_url: null,
    timezone: 'UTC',
    country: null,
    is_anonymous_handle: true,
    anonymous_handle: 'BraveSoul123',
    crisis_flag: false
  },
  { 
    id: 'test-provider-1',
    email: 'testprovider@example.com', 
    password: 'Test123', 
    name: 'Test Provider', 
    role: 'Provider' as UserRole,
    avatar_url: null,
    timezone: 'UTC',
    country: null,
    is_anonymous_handle: true,
    anonymous_handle: 'WiseHeart456',
    crisis_flag: false
  },
  { 
    id: 'test-admin-1',
    email: 'admin@example.com', 
    password: 'Test123', 
    name: 'Admin User', 
    role: 'Admin' as UserRole,
    avatar_url: null,
    timezone: 'UTC',
    country: null,
    is_anonymous_handle: true,
    anonymous_handle: 'StrongMind789',
    crisis_flag: false
  },
]

// Initialize test users in localStorage
const initTestUsers = () => {
  if (isTestMode) {
    const stored = localStorage.getItem(TEST_USERS_KEY)
    if (!stored) {
      localStorage.setItem(TEST_USERS_KEY, JSON.stringify(defaultTestUsers))
    }
  }
}

const getTestUsers = () => {
  if (!isTestMode) return []
  const stored = localStorage.getItem(TEST_USERS_KEY)
  return stored ? JSON.parse(stored) : defaultTestUsers
}

const saveTestUsers = (users: any[]) => {
  if (isTestMode) {
    // codeql[js/clear-text-storage-of-sensitive-data] - Test mode only, not for production
    localStorage.setItem(TEST_USERS_KEY, JSON.stringify(users))
  }
}

const getTestSession = () => {
  if (!isTestMode) return null
  const stored = localStorage.getItem(TEST_SESSION_KEY)
  return stored ? JSON.parse(stored) : null
}

const saveTestSession = (session: any) => {
  if (isTestMode) {
    // codeql[js/clear-text-storage-of-sensitive-data] - Test mode only, not for production
    localStorage.setItem(TEST_SESSION_KEY, JSON.stringify(session))
  }
}

const clearTestSession = () => {
  if (isTestMode) {
    localStorage.removeItem(TEST_SESSION_KEY)
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize test mode on mount
  useEffect(() => {
    if (isTestMode) {
      initTestUsers()
      // Check for existing test session
      const testSession = getTestSession()
      if (testSession) {
        setUser(testSession.user)
        setSession(testSession.session)
        setProfile(testSession.profile)
      }
      setLoading(false)
    }
  }, [])

  const fetchProfile = async (userId: string) => {
    // In test mode, get profile from test users
    if (isTestMode) {
      const testUsers = getTestUsers()
      const testUser = testUsers.find((u: any) => u.id === userId)
      if (testUser) {
        const { password, ...profileData } = testUser
        return profileData
      }
      return null
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return data
  }

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id)
      setProfile(profileData)
    }
  }

  useEffect(() => {
    // Skip Supabase auth setup in test mode
    if (isTestMode) {
      return
    }

    supabase.auth.getSession().then(({ data: { session } }: any) => {
      (async () => {
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          const profileData = await fetchProfile(session.user.id)
          setProfile(profileData)
        }

        setLoading(false)
      })()
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      (async () => {
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          const profileData = await fetchProfile(session.user.id)
          setProfile(profileData)
        } else {
          setProfile(null)
        }
      })()
    })

    return () => subscription.unsubscribe()
  }, [])

  const generateAnonymousHandle = () => {
    const adjectives = ['Calm', 'Brave', 'Kind', 'Wise', 'Gentle', 'Strong', 'Peaceful', 'Hopeful', 'Bright', 'Steady']
    const nouns = ['Soul', 'Heart', 'Spirit', 'Mind', 'Journey', 'Path', 'Light', 'Star', 'Wave', 'Cloud']
    // codeql[js/insecure-randomness] - Anonymous handles are not security-sensitive
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
    const randomNum = Math.floor(Math.random() * 999) + 1
    return `${randomAdj}${randomNoun}${randomNum}`
  }

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    // Test mode: store user in localStorage
    if (isTestMode) {
      const testUsers = getTestUsers()
      
      // Check if user already exists
      const existingUser = testUsers.find((u: any) => u.email === email)
      if (existingUser) {
        throw new Error('User already exists with this email')
      }

      const anonymousHandle = generateAnonymousHandle()
      const newUser = {
        id: `test-user-${Date.now()}`,
        email,
        password,
        name,
        role,
        avatar_url: null,
        timezone: 'UTC',
        country: null,
        is_anonymous_handle: true,
        anonymous_handle: anonymousHandle,
        crisis_flag: false
      }

      testUsers.push(newUser)
      saveTestUsers(testUsers)

      // Create mock user and session
      const { password: _, ...profileData } = newUser
      const mockUser = {
        id: newUser.id,
        email: newUser.email,
        created_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: { name, role },
        aud: 'authenticated'
      } as User

      const mockSession = {
        user: mockUser,
        access_token: 'test-token',
        token_type: 'bearer',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
        refresh_token: 'test-refresh-token'
      }

      saveTestSession({ user: mockUser, session: mockSession, profile: profileData })
      setUser(mockUser)
      setSession(mockSession as Session)
      setProfile(profileData)
      return
    }

    // Regular Supabase flow
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error
    if (!data.user) throw new Error('User creation failed')

    const anonymousHandle = generateAnonymousHandle()

    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: data.user.id,
          email,
          name,
          role,
          anonymous_handle: anonymousHandle,
          is_anonymous_handle: true,
        },
      ])

    if (profileError) throw profileError
  }

  const signIn = async (email: string, password: string, role?: UserRole) => {
    // Test mode: authenticate against localStorage
    if (isTestMode) {
      const testUsers = getTestUsers()
      const testUser = testUsers.find((u: any) => u.email === email && u.password === password)
      
      if (!testUser) {
        throw new Error('Invalid login credentials')
      }

      // Create mock user and session
      const { password: _, ...profileData } = testUser
      const mockUser = {
        id: testUser.id,
        email: testUser.email,
        created_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: { name: testUser.name, role: testUser.role },
        aud: 'authenticated'
      } as User

      const mockSession = {
        user: mockUser,
        access_token: 'test-token',
        token_type: 'bearer',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
        refresh_token: 'test-refresh-token'
      }

      saveTestSession({ user: mockUser, session: mockSession, profile: profileData })
      setUser(mockUser)
      setSession(mockSession as Session)
      setProfile(profileData)
      return profileData
    }

    // Hardcoded test credentials for seamless testing
    const testUsers = [
      { email: 'testuser@example.com', password: 'Test123', name: 'Test User', role: 'User' as UserRole },
      { email: 'testprovider@example.com', password: 'Test123', name: 'Test Provider', role: 'Provider' as UserRole },
      { email: 'admin@example.com', password: 'Test123', name: 'Admin User', role: 'Admin' as UserRole },
    ]

    // Check if this is a hardcoded test user
    const testUser = testUsers.find(u => u.email === email && u.password === password)
    
    if (testUser) {
      // For test users, try to sign in with Supabase Auth first
      // If it fails, auto-create the account
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (!error) {
          // Successfully logged in
          return
        }
      } catch (signInError) {
        // Login failed, try to create the account
      }

      // If we get here, the user doesn't exist in Supabase Auth
      // Auto-create it for seamless testing
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) throw signUpError
      if (!data.user) throw new Error('User creation failed')

      // Create the user profile
      const anonymousHandle = generateAnonymousHandle()

      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email,
            name: testUser.name,
            role: testUser.role,
            anonymous_handle: anonymousHandle,
            is_anonymous_handle: true,
          },
        ])

      if (profileError) {
        // Profile might already exist, try to update it
        const { error: updateError } = await supabase
          .from('users')
          .update({
            email,
            name: testUser.name,
            role: testUser.role,
          })
          .eq('id', data.user.id)
        
        if (updateError) throw updateError
      }

      return
    }

    // For non-test users, use regular Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    if (!data.user) return null

    const profileData = await fetchProfile(data.user.id)
    return profileData
  }

  const signOut = async () => {
    // Test mode: clear localStorage session
    if (isTestMode) {
      clearTestSession()
      setUser(null)
      setSession(null)
      setProfile(null)
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
