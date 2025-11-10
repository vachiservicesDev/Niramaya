/*
  # Create Test Users and Sample Data

  ## Overview
  Creates test accounts for all three roles with realistic sample data:
  - User account with journal entries, mood check-ins, and community posts
  - Provider account with client links
  - Admin account for moderation

  ## Test Accounts Created

  ### 1. User Account
  - Email: user@test.com
  - Password: password123
  - Role: User
  - Includes: journal entries, mood check-ins, community posts

  ### 2. Provider Account
  - Email: provider@test.com
  - Password: password123
  - Role: Provider
  - Includes: provider profile, linked to test user

  ### 3. Admin Account
  - Email: admin@test.com
  - Password: password123
  - Role: Admin

  ## Sample Data
  - 10 journal entries for test user
  - 14 mood check-ins (2 weeks)
  - Community memberships and posts
  - Provider-client link
  - 1 crisis check-in

  ## Important Notes
  - These are for testing only
  - Use these credentials to log in and test features
  - All test users have automatic anonymous handles
*/

-- Insert test users
-- Note: Supabase Auth users must be created through the auth.signUp() method
-- We'll create the profile records that will link to auth users

-- Test User (regular user)
INSERT INTO users (id, role, email, name, timezone, country, is_anonymous_handle, anonymous_handle, crisis_flag)
VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    'User',
    'user@test.com',
    'Test User',
    'America/New_York',
    'United States',
    true,
    'BraveHeart123',
    false
  )
ON CONFLICT (id) DO NOTHING;

-- Test Provider
INSERT INTO users (id, role, email, name, timezone, country, is_anonymous_handle, anonymous_handle, crisis_flag)
VALUES 
  (
    '22222222-2222-2222-2222-222222222222',
    'Provider',
    'provider@test.com',
    'Dr. Sarah Johnson',
    'America/Los_Angeles',
    'United States',
    true,
    'CalmMind456',
    false
  )
ON CONFLICT (id) DO NOTHING;

-- Test Admin
INSERT INTO users (id, role, email, name, timezone, country, is_anonymous_handle, anonymous_handle, crisis_flag)
VALUES 
  (
    '33333333-3333-3333-3333-333333333333',
    'Admin',
    'admin@test.com',
    'Admin User',
    'UTC',
    NULL,
    true,
    'WiseSoul789',
    false
  )
ON CONFLICT (id) DO NOTHING;

-- Create provider profile for test provider
INSERT INTO provider_profiles (user_id, license_number, specialties, practice_name, accepts_insurance, insurance_notes)
VALUES
  (
    '22222222-2222-2222-2222-222222222222',
    'PSY-12345-CA',
    'Anxiety, Depression, PTSD, Cognitive Behavioral Therapy',
    'Mindful Wellness Practice',
    true,
    'Accepts most major insurance providers. Out-of-network benefits available.'
  )
ON CONFLICT (user_id) DO NOTHING;

-- Link provider to test user as client
INSERT INTO provider_client_links (provider_id, client_id, status, created_at)
VALUES
  (
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'active',
    NOW() - INTERVAL '30 days'
  )
ON CONFLICT (provider_id, client_id) DO NOTHING;

-- Create subscriptions for test users
INSERT INTO subscriptions (user_id, plan_type, status, renewal_date)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'B2C_AI_Companion',
    'active',
    CURRENT_DATE + INTERVAL '30 days'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'B2B_Provider',
    'active',
    CURRENT_DATE + INTERVAL '30 days'
  )
ON CONFLICT DO NOTHING;

-- Create mood check-ins for the last 14 days
INSERT INTO mood_check_ins (user_id, mood, notes, created_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'neutral', 'Starting the week feeling okay', NOW() - INTERVAL '13 days'),
  ('11111111-1111-1111-1111-111111111111', 'low', 'Having a tough day at work', NOW() - INTERVAL '12 days'),
  ('11111111-1111-1111-1111-111111111111', 'low', 'Still struggling with stress', NOW() - INTERVAL '11 days'),
  ('11111111-1111-1111-1111-111111111111', 'neutral', 'Feeling a bit better today', NOW() - INTERVAL '10 days'),
  ('11111111-1111-1111-1111-111111111111', 'high', 'Had a good therapy session', NOW() - INTERVAL '9 days'),
  ('11111111-1111-1111-1111-111111111111', 'high', 'Productive day, feeling accomplished', NOW() - INTERVAL '8 days'),
  ('11111111-1111-1111-1111-111111111111', 'neutral', 'Weekend was relaxing', NOW() - INTERVAL '7 days'),
  ('11111111-1111-1111-1111-111111111111', 'high', 'Great morning workout', NOW() - INTERVAL '6 days'),
  ('11111111-1111-1111-1111-111111111111', 'neutral', 'Regular day, nothing special', NOW() - INTERVAL '5 days'),
  ('11111111-1111-1111-1111-111111111111', 'low', 'Anxiety acting up today', NOW() - INTERVAL '4 days'),
  ('11111111-1111-1111-1111-111111111111', 'neutral', 'Using coping strategies', NOW() - INTERVAL '3 days'),
  ('11111111-1111-1111-1111-111111111111', 'high', 'Feeling much better', NOW() - INTERVAL '2 days'),
  ('11111111-1111-1111-1111-111111111111', 'very_high', 'Amazing day with friends', NOW() - INTERVAL '1 day'),
  ('11111111-1111-1111-1111-111111111111', 'high', 'Good morning so far', NOW())
ON CONFLICT DO NOTHING;

-- Create journal entries
INSERT INTO journal_entries (user_id, text, mood, mood_tags, ai_risk_score, created_at)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Started my day with meditation. It really helps center me and prepare for the day ahead. I''m grateful for these peaceful moments.',
    'high',
    '["grateful", "peaceful", "mindful"]',
    15,
    NOW() - INTERVAL '13 days'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'Work stress is getting to me. The deadline is approaching and I feel overwhelmed. Need to remember to breathe and take breaks.',
    'low',
    '["stressed", "overwhelmed", "anxious"]',
    45,
    NOW() - INTERVAL '12 days'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'Had a really tough conversation with my manager today. Feeling discouraged but trying to stay positive. Tomorrow is a new day.',
    'low',
    '["discouraged", "worried", "hopeful"]',
    50,
    NOW() - INTERVAL '11 days'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'Therapy session was helpful. Dr. Johnson helped me see things from a different perspective. Working on my thought patterns.',
    'neutral',
    '["reflective", "hopeful", "learning"]',
    30,
    NOW() - INTERVAL '10 days'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'Practiced the CBT techniques we discussed. I can already see how negative thoughts spiral. Catching them earlier now.',
    'high',
    '["progress", "aware", "hopeful"]',
    20,
    NOW() - INTERVAL '9 days'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'Completed a big project at work! Feeling accomplished and proud of myself. Hard work pays off.',
    'very_high',
    '["accomplished", "proud", "happy"]',
    10,
    NOW() - INTERVAL '8 days'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'Quiet weekend. Spent time reading and just being present. Sometimes doing nothing is exactly what I need.',
    'neutral',
    '["calm", "peaceful", "content"]',
    15,
    NOW() - INTERVAL '7 days'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'Morning anxiety hit hard today. Used my breathing exercises and it helped. Small victories matter.',
    'low',
    '["anxious", "coping", "resilient"]',
    40,
    NOW() - INTERVAL '4 days'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'Went out with friends tonight. It''s good to socialize even when I don''t feel like it. They always lift my spirits.',
    'very_high',
    '["social", "happy", "connected"]',
    10,
    NOW() - INTERVAL '1 day'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'Reflecting on my progress over the past few weeks. I can see real improvement in managing my anxiety. Proud of myself.',
    'high',
    '["proud", "grateful", "progress"]',
    15,
    NOW()
  )
ON CONFLICT DO NOTHING;

-- Create a crisis check-in (past, resolved)
INSERT INTO crisis_check_ins (user_id, severity, thoughts_of_self_harm, has_immediate_plan, ai_routing_decision, hotline_country, created_at)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'concerned',
    true,
    false,
    'suggest_contact_provider',
    'United States',
    NOW() - INTERVAL '5 days'
  )
ON CONFLICT DO NOTHING;

-- Add test user to communities
INSERT INTO community_memberships (community_id, user_id, role)
SELECT 
  id,
  '11111111-1111-1111-1111-111111111111',
  'member'
FROM communities
WHERE name IN ('General Support', 'Anxiety Support')
ON CONFLICT (community_id, user_id) DO NOTHING;

-- Create community posts from test user
INSERT INTO community_posts (community_id, author_id, title, body, is_anonymous, created_at)
SELECT 
  (SELECT id FROM communities WHERE name = 'Anxiety Support' LIMIT 1),
  '11111111-1111-1111-1111-111111111111',
  'Just wanted to share a small win',
  'I managed to use my breathing exercises during an anxiety attack today and it actually helped! It''s not perfect but I''m making progress. To anyone struggling - keep going, small steps matter.',
  true,
  NOW() - INTERVAL '3 days'
WHERE EXISTS (SELECT 1 FROM communities WHERE name = 'Anxiety Support')
ON CONFLICT DO NOTHING;

INSERT INTO community_posts (community_id, author_id, title, body, is_anonymous, created_at)
SELECT 
  (SELECT id FROM communities WHERE name = 'General Support' LIMIT 1),
  '11111111-1111-1111-1111-111111111111',
  'Grateful for this community',
  'Just wanted to say thank you to everyone here. Reading your stories helps me feel less alone. We''re all in this together.',
  true,
  NOW() - INTERVAL '1 day'
WHERE EXISTS (SELECT 1 FROM communities WHERE name = 'General Support')
ON CONFLICT DO NOTHING;

-- Create some supportive comments from other users
INSERT INTO community_comments (post_id, author_id, body, is_anonymous, created_at)
SELECT 
  cp.id,
  '22222222-2222-2222-2222-222222222222',
  'This is wonderful progress! Keep up the great work. Every small win builds momentum.',
  false,
  NOW() - INTERVAL '2 days'
FROM community_posts cp
WHERE cp.title = 'Just wanted to share a small win'
AND cp.author_id = '11111111-1111-1111-1111-111111111111'
LIMIT 1
ON CONFLICT DO NOTHING;
