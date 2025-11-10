# Test Accounts Guide

## ⚠️ IMPORTANT: Getting "Invalid Login Credentials"?

**The pre-made test accounts don't have Supabase Auth accounts yet!**

👉 **EASY SOLUTION**: Just sign up through the app with ANY email address!

- Go to `/auth`
- Click "Sign Up"
- Use any email (e.g., `mytest@example.com`)
- Password: anything 6+ characters
- Select your role
- Done! ✅

**See SETUP_TEST_ACCOUNTS.md for detailed instructions**

---

## 🎯 Recommended Testing Approach

### Create Your Own Test Accounts

Instead of using the pre-made accounts, simply:

### User Account - Create Fresh
1. Go to `/auth` → Sign Up
2. **Email**: `testuser@example.com` (or any email)
3. **Password**: `password123`
4. **Name**: `Test User`
5. **Role**: User
6. Start using features!

### Provider Account - Create Fresh
1. Sign out, go to `/auth` → Sign Up
2. **Email**: `testprovider@example.com`
3. **Password**: `password123`
4. **Name**: `Dr. Test Provider`
5. **Role**: Provider
6. Explore provider features!

### Features to Test (User)
- User dashboard with mood check-ins
- Create mood trends by checking in daily
- Write journal entries with moods and tags
- AI Companion chat
- Join communities (5 pre-made ones available!)
- Create posts and comments
- Crisis resources
- Settings and profile management

### Features to Test (Provider)
- Provider dashboard with statistics
- View client list (will be empty initially)
- Test provider profile settings
- Explore provider workflow
  - Provider profile settings

### Admin Account
- **Email**: `admin@test.com`
- **Password**: `password123`
- **Role**: Admin
- **Features to Test**:
  - Admin access controls
  - Moderation capabilities
  - All user features

## 📊 Sample Data Included

### For Test User (user@test.com)

#### Mood Check-ins
- **14 mood check-ins** spanning the last 2 weeks
- Mix of moods: very_low, low, neutral, high, very_high
- Visible in the mood trends timeline on home page

#### Journal Entries
- **10 detailed journal entries** over 13 days
- Various mood levels with tags
- AI risk scores ranging from 10-50
- Topics include:
  - Meditation and mindfulness
  - Work stress and deadlines
  - Therapy progress
  - Anxiety management
  - Social activities
  - Personal growth

#### Crisis Check-in
- 1 crisis check-in from 5 days ago (severity: concerned)
- Demonstrates crisis tracking for providers

#### Community Participation
- Member of "General Support" and "Anxiety Support" communities
- 2 posts created with thoughtful content
- 1 comment received from provider

### For Provider (provider@test.com)

#### Provider Profile
- **License**: PSY-12345-CA
- **Specialties**: Anxiety, Depression, PTSD, CBT
- **Practice**: Mindful Wellness Practice
- **Insurance**: Accepts most major providers

#### Client Link
- Active connection with Test User (30 days)
- Access to all client data via dashboard

#### Dashboard Statistics
- Shows total clients: 1
- Total journal entries from clients
- Recent crisis check-ins (7 days)

## 🎯 How to Create Auth Accounts

Since the database migration created the user profile records, you need to create the actual auth accounts. You can do this in two ways:

### Option 1: Sign Up Through the App (Recommended)

1. Go to `/auth` page
2. Click "Sign Up" tab
3. For each test account, enter:
   - The email from above
   - Password: `password123`
   - Name: as listed above
   - Select the appropriate role

**Note**: This will create NEW user IDs, so the test data won't be linked. Use Option 2 for full test data.

### Option 2: Using Supabase Dashboard

1. Open your Supabase project dashboard
2. Go to Authentication → Users
3. Click "Add User"
4. For each account:
   - Enter the email
   - Set auto-generate password to OFF
   - Enter password: `password123`
   - Confirm user email (no confirmation needed for testing)

**Important**: After creating auth users, you'll need to update the user IDs in the database to match the auth user IDs.

### Option 3: Use the App Normally (Easiest)

Simply sign up as a new user through the app with any email you want. This will:
- Create a fresh auth user
- Generate an anonymous handle
- Give you a clean slate to test features

Then create a provider account separately to test provider features.

## 🧪 Testing Scenarios

### Scenario 1: User Journey
1. Sign in as `user@test.com`
2. View mood trends on home page (should show 14 days)
3. Create a new mood check-in
4. Go to Journal and view existing entries
5. Create a new journal entry
6. Visit Communities and view posts
7. Add a comment to a post
8. Try the AI Companion chat
9. Visit Crisis Resources page
10. Update settings and anonymous handle

### Scenario 2: Provider Journey
1. Sign in as `provider@test.com`
2. View dashboard statistics
3. Click on Test User from client list
4. Review journal timeline
5. Check risk scores
6. Note the crisis check-in indicator
7. Test report generation (button available)

### Scenario 3: Community Interaction
1. Sign in as user
2. Join a new community
3. Create a post (try both anonymous and public)
4. Comment on your own or others' posts
5. Test anonymous handle display

### Scenario 4: Crisis Workflow
1. Sign in as user
2. Go to Crisis Resources
3. Complete the check-in form
4. Try different severity levels
5. Observe appropriate hotline displays
6. Sign in as provider to see crisis alert

## 📝 Notes

- All test data is realistic and appropriate
- No real personal information is used
- Test accounts can be deleted and recreated anytime
- Sample data demonstrates all key features
- Risk scores are reasonable (10-50 range)

## 🔄 Resetting Test Data

To reset test data, run the migration again:
```sql
-- This will recreate all test data
-- Run the migration file: create_test_users_and_data.sql
```

## 🚀 Quick Start

1. Sign up as a new user with any email
2. Explore the features
3. Create a provider account separately
4. Test both perspectives

Enjoy testing Niramaya!
