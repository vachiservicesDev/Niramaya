import { vi } from 'vitest'

// Mock Supabase client for testing
export const mockSupabaseClient = {
  auth: {
    getSession: vi.fn(),
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: { unsubscribe: vi.fn() } },
    })),
    signUp: vi.fn(),
    signInWithPassword: vi.fn(),
    signOut: vi.fn(),
  },
  from: vi.fn(() => ({
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn(),
    maybeSingle: vi.fn(),
  })),
}

// Helper to mock Supabase module
export function mockSupabase() {
  vi.mock('@supabase/supabase-js', () => ({
    createClient: vi.fn(() => mockSupabaseClient),
  }))
}

// Mock user profile data
export const mockUserProfile = {
  id: 'test-user-id',
  role: 'User' as const,
  email: 'test@example.com',
  name: 'Test User',
  avatar_url: null,
  timezone: 'UTC',
  country: 'US',
  is_anonymous_handle: true,
  anonymous_handle: 'BraveSoul123',
  crisis_flag: false,
}

// Mock provider profile data
export const mockProviderProfile = {
  id: 'test-provider-id',
  role: 'Provider' as const,
  email: 'provider@example.com',
  name: 'Dr. Test Provider',
  avatar_url: null,
  timezone: 'UTC',
  country: 'US',
  is_anonymous_handle: false,
  anonymous_handle: null,
  crisis_flag: false,
}

// Mock journal entry
export const mockJournalEntry = {
  id: 'journal-1',
  user_id: 'test-user-id',
  text: 'Today was a good day',
  mood: 'high' as const,
  mood_tags: ['grateful', 'happy'],
  ai_summary: 'User expressed positive emotions',
  ai_risk_score: 10,
  created_at: new Date().toISOString(),
}

// Mock mood check-in
export const mockMoodCheckIn = {
  id: 'mood-1',
  user_id: 'test-user-id',
  mood: 'neutral' as const,
  emotions: ['calm', 'focused'],
  notes: 'Feeling steady today',
  created_at: new Date().toISOString(),
}

// Mock community
export const mockCommunity = {
  id: 'community-1',
  name: 'General Support',
  description: 'A safe space for everyone',
  is_private: false,
  created_at: new Date().toISOString(),
}

// Mock community post
export const mockCommunityPost = {
  id: 'post-1',
  community_id: 'community-1',
  author_id: 'test-user-id',
  title: 'My Story',
  body: 'This is my journey...',
  is_anonymous: true,
  created_at: new Date().toISOString(),
}
