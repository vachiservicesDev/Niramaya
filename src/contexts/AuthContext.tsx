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
  signUp: (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    onboardingData: {
      emergencyContactName: string
      emergencyContactPhone: string
      permissions: {
        dataProcessing: boolean
        notifications: boolean
      }
    }
  ) => Promise<void>
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

  const signUp = async (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    onboardingData: {
      emergencyContactName: string
      emergencyContactPhone: string
      permissions: {
        dataProcessing: boolean
        notifications: boolean
      }
    }
  ) => {
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
          emergency_contact_name: onboardingData.emergencyContactName,
          emergency_contact_phone: onboardingData.emergencyContactPhone,
          accepted_data_processing: onboardingData.permissions.dataProcessing,
          accepted_notifications: onboardingData.permissions.notifications,
        },
      ])

    if (profileError) throw profileError
  }

  const signIn = async (email: string, password: string) => {
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
