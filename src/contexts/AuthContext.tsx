import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, UserRole } from '../lib/supabase'

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
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
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
    supabase.auth.getSession().then(({ data: { session } }) => {
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
    const randomNum = Math.floor(Math.random() * 999) + 1
    return `${randomAdj}${randomNoun}${randomNum}`
  }

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
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

  const signIn = async (email: string, password: string) => {
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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
  }

  const signOut = async () => {
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
