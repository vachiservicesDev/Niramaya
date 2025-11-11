import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if we're in test mode (no Supabase configured)
export const isTestMode = !supabaseUrl || !supabaseAnonKey

// Create supabase client only if configured, otherwise use a mock
export const supabase = isTestMode 
  ? null as any // Will be handled by mock auth in AuthContext
  : createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'User' | 'Provider' | 'Admin'
export type MoodLevel = 'very_low' | 'low' | 'neutral' | 'high' | 'very_high'
export type CrisisSeverity = 'info' | 'concerned' | 'urgent'
export type SubscriptionStatus = 'active' | 'trial' | 'canceled' | 'past_due'
export type PlanType = 'B2C_AI_Companion' | 'B2B_Provider'
export type LinkStatus = 'invited' | 'active' | 'ended'
export type CommunityRole = 'member' | 'moderator' | 'owner'
export type AIRoutingDecision = 'self_help' | 'suggest_contact_provider' | 'show_hotline'
