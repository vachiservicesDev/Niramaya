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
  const testUsers = [
    { email: 'testuser@example.com', password: 'Test123', name: 'Test User', role: 'User' as UserRole },
    { email: 'testprovider@example.com', password: 'Test123', name: 'Test Provider', role: 'Provider' as UserRole },
    { email: 'admin@example.com', password: 'Test123', name: 'Admin User', role: 'Admin' as UserRole },
  ]

  const testUser = testUsers.find(u => u.email === email && u.password === password)

  if (testUser) {
    // 1) Try sign-in first
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (!signInError && signInData?.user) {
      console.info('Test user signed in successfully.')
      return
    }

    // Log the sign-in error for diagnostics
    console.warn('Test user signIn failed (will attempt signUp):', signInError)

    // 2) Attempt sign up (only if signups are allowed)
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password })
    if (signUpError) {
      console.error('Test user signUp failed:', signUpError)
      throw signUpError
    }
    if (!signUpData?.user) {
      throw new Error('User creation failed after signUp call.')
    }

    // 3) Sign in after sign up to ensure session token is created
    const { data: postSignInData, error: postSignInError } = await supabase.auth.signInWithPassword({ email, password })
    if (postSignInError || !postSignInData?.user) {
      console.error('Post-signup signIn failed:', postSignInError)
      throw postSignInError ?? new Error('Post-signup signIn failed')
    }

    // 4) Create or update profile
    const anonymousHandle = generateAnonymousHandle()
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: signUpData.user.id,
          email,
          name: testUser.name,
          role: testUser.role,
          anonymous_handle: anonymousHandle,
          is_anonymous_handle: true,
        },
      ])

    if (profileError) {
      // If insert fails because profile exists, try update
      console.warn('Profile insert failed, attempting update:', profileError)
      const { error: updateError } = await supabase
        .from('users')
        .update({
          email,
          name: testUser.name,
          role: testUser.role,
        })
        .eq('id', signUpData.user.id)

      if (updateError) {
        console.error('Profile update failed:', updateError)
        throw updateError
      }
    }

    console.info('Test user auto-created and signed in.')
    return
  }

  // Non-test users: normal auth
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    console.error('Regular signIn failed:', error)
    throw error
  }
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
