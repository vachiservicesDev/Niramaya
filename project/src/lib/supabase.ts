import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'User' | 'Provider' | 'Admin'
export type MoodLevel = 'very_low' | 'low' | 'neutral' | 'high' | 'very_high'
export type CrisisSeverity = 'info' | 'concerned' | 'urgent'
export type SubscriptionStatus = 'active' | 'trial' | 'canceled' | 'past_due'
export type PlanType = 'B2C_AI_Companion' | 'B2B_Provider'
export type LinkStatus = 'invited' | 'active' | 'ended'
export type CommunityRole = 'member' | 'moderator' | 'owner'
export type AIRoutingDecision = 'self_help' | 'suggest_contact_provider' | 'show_hotline'
