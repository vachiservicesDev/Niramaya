# Niramaya - Mental Wellness Companion

A comprehensive mental health application that supports people living with mental health disorders and improves the workflows of service providers.

## Features

### For Users
- **AI Companion Chat** - Conversational support with safety disclaimers
- **Smart Journal** - Track moods, emotions, and daily reflections
- **Mood Trends** - Visualize mood patterns over time
- **Crisis Resources** - Access to international crisis hotlines with intelligent triage
- **Anonymous Communities** - Join peer support groups with full anonymity
- **Privacy Controls** - Manage anonymous handles and personal settings

### For Providers
- **Client Dashboard** - Overview of all active clients with key statistics
- **Client Details** - Access to client journal entries and mood data (with consent)
- **Activity Monitoring** - Track journal entries and crisis check-ins
- **Bi-weekly Reports** - Generate comprehensive summaries for sessions

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email/Password)
- **Styling**: Custom CSS with CSS Variables

## Database Schema

### Core Tables
- `users` - User accounts with role-based access (User, Provider, Admin)
- `subscriptions` - User subscription plans
- `provider_profiles` - Professional credentials
- `provider_client_links` - Provider-client relationships
- `journal_entries` - User journal entries with AI summaries
- `mood_check_ins` - Quick mood tracking
- `crisis_check_ins` - Crisis assessment with AI routing
- `communities` - Peer support communities
- `community_posts` - Community posts with anonymity support
- `community_comments` - Comments on posts
- `biweekly_reports` - Provider reports

### Security
- Row-level security (RLS) enabled on all tables
- Users can only access their own data
- Providers can only access linked clients' data
- Anonymous posting protected by anonymous handles

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (already configured):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Key Features

### Anonymous Handle System
Users automatically receive a randomly generated anonymous handle on signup (e.g., "BraveSoul234") for community participation while maintaining privacy.

### Crisis Management
- Three-tier severity assessment (info, concerned, urgent)
- AI-based routing to appropriate resources
- International crisis hotline directory
- Immediate safety warnings and disclaimers

### Community Safety
- All posts are anonymous by default
- Users can choose to post with their real name
- Moderation tools for community owners
- Safe, judgment-free spaces

### Provider Tools
- Dashboard with client statistics
- Journal entry timeline view
- Risk score indicators
- Crisis check-in alerts

## Important Safety Disclaimers

**Niramaya is NOT a replacement for professional mental health care.**

- Not suitable for emergency situations
- Does not provide medical diagnosis
- Cannot respond to crisis situations
- Users in danger should contact emergency services immediately

## Project Structure

```
src/
├── components/       # Reusable components (Layout)
├── contexts/        # React contexts (AuthContext)
├── lib/            # Utility libraries (Supabase client)
├── pages/          # Page components
│   ├── LandingPage.tsx
│   ├── AuthPage.tsx
│   ├── UserHome.tsx
│   ├── CompanionChat.tsx
│   ├── JournalPage.tsx
│   ├── CrisisPage.tsx
│   ├── CommunityListPage.tsx
│   ├── CommunityDetailPage.tsx
│   ├── ProviderDashboard.tsx
│   ├── ProviderClientDetail.tsx
│   └── SettingsPage.tsx
└── index.css       # Global styles

supabase/
└── migrations/     # Database migrations
```

## Design Principles

- **Calm Color Palette** - Soft teal/mint tones for a soothing experience
- **Clear Visual Hierarchy** - Easy navigation and information architecture
- **Responsive Design** - Works seamlessly on all devices
- **Accessibility** - Clear disclaimers and safety warnings
- **Privacy First** - Anonymous participation by default

## License

This project is provided as-is for educational and demonstration purposes.

## Support

If you're experiencing a mental health crisis, please contact:
- **USA**: 988 (Suicide & Crisis Lifeline)
- **UK**: 116 123 (Samaritans)
- **International**: Visit https://www.iasp.info/resources/Crisis_Centres

---

Built with care for mental wellness.
