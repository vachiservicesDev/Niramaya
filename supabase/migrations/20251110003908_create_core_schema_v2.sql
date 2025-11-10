/*
  # Niramaya Mental Health Application - Core Schema

  ## Overview
  Complete database schema for Niramaya mental health application supporting:
  - User, Provider, and Admin roles
  - Mental health journaling and mood tracking
  - AI companion interactions
  - Crisis intervention workflows
  - Provider-client relationships
  - Anonymous community features
  - Bi-weekly provider reports

  ## New Tables Created

  ### 1. `users`
  User accounts with role-based access (User, Provider, Admin)
  
  ### 2. `subscriptions`
  User subscription plans for B2C and B2B offerings
  
  ### 3. `provider_profiles`
  Professional credentials for provider users
  
  ### 4. `provider_client_links`
  Links between providers and their clients
  
  ### 5. `journal_entries`
  User journal entries with AI-generated summaries
  
  ### 6. `mood_check_ins`
  Quick mood tracking entries
  
  ### 7. `crisis_check_ins`
  Crisis assessment entries with AI triage
  
  ### 8. `communities`
  Peer support communities
  
  ### 9. `community_memberships`
  User memberships in communities
  
  ### 10. `community_posts`
  Posts in communities (can be anonymous)
  
  ### 11. `community_comments`
  Comments on community posts (can be anonymous)
  
  ### 12. `biweekly_reports`
  AI-generated reports for providers summarizing client data

  ## Security
  - RLS enabled on all tables
  - Users can only read/update their own data
  - Providers can access linked clients' data
  - Community members can read posts in their communities
  - Anonymous posting supported in communities
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL DEFAULT 'User' CHECK (role IN ('User', 'Provider', 'Admin')),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  avatar_url text,
  timezone text DEFAULT 'UTC',
  country text,
  is_anonymous_handle boolean DEFAULT false,
  anonymous_handle text,
  crisis_flag boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_type text NOT NULL CHECK (plan_type IN ('B2C_AI_Companion', 'B2B_Provider')),
  status text NOT NULL DEFAULT 'trial' CHECK (status IN ('active', 'trial', 'canceled', 'past_due')),
  renewal_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create provider_profiles table
CREATE TABLE IF NOT EXISTS provider_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  license_number text NOT NULL,
  specialties text NOT NULL,
  practice_name text NOT NULL,
  accepts_insurance boolean DEFAULT false,
  insurance_notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE provider_profiles ENABLE ROW LEVEL SECURITY;

-- Create provider_client_links table
CREATE TABLE IF NOT EXISTS provider_client_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'invited' CHECK (status IN ('invited', 'active', 'ended')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(provider_id, client_id)
);

ALTER TABLE provider_client_links ENABLE ROW LEVEL SECURITY;

-- Create journal_entries table
CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text text NOT NULL,
  mood text NOT NULL CHECK (mood IN ('very_low', 'low', 'neutral', 'high', 'very_high')),
  mood_tags jsonb,
  ai_summary text,
  ai_risk_score integer CHECK (ai_risk_score >= 0 AND ai_risk_score <= 100),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- Create mood_check_ins table
CREATE TABLE IF NOT EXISTS mood_check_ins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mood text NOT NULL CHECK (mood IN ('very_low', 'low', 'neutral', 'high', 'very_high')),
  emotions jsonb,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mood_check_ins ENABLE ROW LEVEL SECURITY;

-- Create crisis_check_ins table
CREATE TABLE IF NOT EXISTS crisis_check_ins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  severity text NOT NULL CHECK (severity IN ('info', 'concerned', 'urgent')),
  thoughts_of_self_harm boolean DEFAULT false,
  has_immediate_plan boolean DEFAULT false,
  ai_routing_decision text NOT NULL CHECK (ai_routing_decision IN ('self_help', 'suggest_contact_provider', 'show_hotline')),
  hotline_country text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE crisis_check_ins ENABLE ROW LEVEL SECURITY;

-- Create communities table
CREATE TABLE IF NOT EXISTS communities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  is_private boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

-- Create community_memberships table
CREATE TABLE IF NOT EXISTS community_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'owner')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(community_id, user_id)
);

ALTER TABLE community_memberships ENABLE ROW LEVEL SECURITY;

-- Create community_posts table
CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  is_anonymous boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- Create community_comments table
CREATE TABLE IF NOT EXISTS community_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body text NOT NULL,
  is_anonymous boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;

-- Create biweekly_reports table
CREATE TABLE IF NOT EXISTS biweekly_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  period_start date NOT NULL,
  period_end date NOT NULL,
  ai_summary text NOT NULL,
  key_events jsonb,
  risk_trend jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE biweekly_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Providers can read linked client profiles"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM provider_client_links
      WHERE provider_client_links.client_id = users.id
      AND provider_client_links.provider_id = auth.uid()
      AND provider_client_links.status = 'active'
    )
  );

-- RLS Policies for subscriptions table
CREATE POLICY "Users can read own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for provider_profiles table
CREATE POLICY "Providers can read own profile"
  ON provider_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Providers can insert own profile"
  ON provider_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Providers can update own profile"
  ON provider_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for provider_client_links table
CREATE POLICY "Providers can read own links"
  ON provider_client_links FOR SELECT
  TO authenticated
  USING (auth.uid() = provider_id);

CREATE POLICY "Clients can read own links"
  ON provider_client_links FOR SELECT
  TO authenticated
  USING (auth.uid() = client_id);

CREATE POLICY "Providers can create links"
  ON provider_client_links FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Providers can update own links"
  ON provider_client_links FOR UPDATE
  TO authenticated
  USING (auth.uid() = provider_id)
  WITH CHECK (auth.uid() = provider_id);

-- RLS Policies for journal_entries table
CREATE POLICY "Users can read own journal entries"
  ON journal_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own journal entries"
  ON journal_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries"
  ON journal_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries"
  ON journal_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Providers can read linked client journal entries"
  ON journal_entries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM provider_client_links
      WHERE provider_client_links.client_id = journal_entries.user_id
      AND provider_client_links.provider_id = auth.uid()
      AND provider_client_links.status = 'active'
    )
  );

-- RLS Policies for mood_check_ins table
CREATE POLICY "Users can read own mood check-ins"
  ON mood_check_ins FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own mood check-ins"
  ON mood_check_ins FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Providers can read linked client mood check-ins"
  ON mood_check_ins FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM provider_client_links
      WHERE provider_client_links.client_id = mood_check_ins.user_id
      AND provider_client_links.provider_id = auth.uid()
      AND provider_client_links.status = 'active'
    )
  );

-- RLS Policies for crisis_check_ins table
CREATE POLICY "Users can read own crisis check-ins"
  ON crisis_check_ins FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own crisis check-ins"
  ON crisis_check_ins FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Providers can read linked client crisis check-ins"
  ON crisis_check_ins FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM provider_client_links
      WHERE provider_client_links.client_id = crisis_check_ins.user_id
      AND provider_client_links.provider_id = auth.uid()
      AND provider_client_links.status = 'active'
    )
  );

-- RLS Policies for communities table
CREATE POLICY "Anyone can read public communities"
  ON communities FOR SELECT
  TO authenticated
  USING (is_private = false);

CREATE POLICY "Members can read private communities"
  ON communities FOR SELECT
  TO authenticated
  USING (
    is_private = true AND EXISTS (
      SELECT 1 FROM community_memberships
      WHERE community_memberships.community_id = communities.id
      AND community_memberships.user_id = auth.uid()
    )
  );

-- RLS Policies for community_memberships table
CREATE POLICY "Users can read own memberships"
  ON community_memberships FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create memberships"
  ON community_memberships FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own memberships"
  ON community_memberships FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for community_posts table
CREATE POLICY "Members can read posts in their communities"
  ON community_posts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM community_memberships
      WHERE community_memberships.community_id = community_posts.community_id
      AND community_memberships.user_id = auth.uid()
    )
  );

CREATE POLICY "Members can create posts in their communities"
  ON community_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = author_id AND EXISTS (
      SELECT 1 FROM community_memberships
      WHERE community_memberships.community_id = community_posts.community_id
      AND community_memberships.user_id = auth.uid()
    )
  );

CREATE POLICY "Authors can update own posts"
  ON community_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete own posts"
  ON community_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- RLS Policies for community_comments table
CREATE POLICY "Members can read comments on posts in their communities"
  ON community_comments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM community_posts
      JOIN community_memberships ON community_memberships.community_id = community_posts.community_id
      WHERE community_posts.id = community_comments.post_id
      AND community_memberships.user_id = auth.uid()
    )
  );

CREATE POLICY "Members can create comments on posts in their communities"
  ON community_comments FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = author_id AND EXISTS (
      SELECT 1 FROM community_posts
      JOIN community_memberships ON community_memberships.community_id = community_posts.community_id
      WHERE community_posts.id = community_comments.post_id
      AND community_memberships.user_id = auth.uid()
    )
  );

CREATE POLICY "Authors can update own comments"
  ON community_comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete own comments"
  ON community_comments FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- RLS Policies for biweekly_reports table
CREATE POLICY "Providers can read reports for their clients"
  ON biweekly_reports FOR SELECT
  TO authenticated
  USING (auth.uid() = provider_id);

CREATE POLICY "Clients can read own reports"
  ON biweekly_reports FOR SELECT
  TO authenticated
  USING (auth.uid() = client_id);

CREATE POLICY "Providers can create reports for their clients"
  ON biweekly_reports FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = provider_id AND EXISTS (
      SELECT 1 FROM provider_client_links
      WHERE provider_client_links.client_id = biweekly_reports.client_id
      AND provider_client_links.provider_id = auth.uid()
      AND provider_client_links.status = 'active'
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_created_at ON journal_entries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mood_check_ins_user_id ON mood_check_ins(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_check_ins_created_at ON mood_check_ins(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crisis_check_ins_user_id ON crisis_check_ins(user_id);
CREATE INDEX IF NOT EXISTS idx_provider_client_links_provider_id ON provider_client_links(provider_id);
CREATE INDEX IF NOT EXISTS idx_provider_client_links_client_id ON provider_client_links(client_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_community_id ON community_posts(community_id);
CREATE INDEX IF NOT EXISTS idx_community_comments_post_id ON community_comments(post_id);
