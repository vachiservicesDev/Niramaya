# 🧪 Test Mode - No Supabase Required

## Overview

Niramaya now supports a **Test Mode** that allows you to run and test the application completely offline without any Supabase configuration. This is perfect for:

- 🚀 Quick testing and demos
- 👨‍💻 Local development without backend setup
- 🎓 Learning and exploring the application
- 🧪 Testing authentication flows

## How It Works

When Supabase environment variables are not configured, the application automatically switches to **Test Mode**:

1. **Automatic Detection**: The app detects missing `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY`
2. **localStorage Authentication**: Uses browser localStorage instead of Supabase Auth
3. **Mock User Database**: Pre-configured test users stored locally
4. **Session Persistence**: Sessions survive page refreshes
5. **Visual Indicator**: Yellow banner shows "🧪 Test Mode - No Supabase Required"

## Getting Started

### Step 1: Start the Application

Simply run the dev server without setting up Supabase:

```bash
npm install
npm run dev
```

No `.env` file needed! The app will automatically enter test mode.

### Step 2: Login with Test Credentials

Navigate to http://localhost:5173/auth and use any of these credentials:

#### User Account (Regular User)
- **Email**: `testuser@example.com`
- **Password**: `Test123`
- **Role**: User (seeking support)

#### Provider Account (Mental Health Professional)
- **Email**: `testprovider@example.com`
- **Password**: `Test123`
- **Role**: Provider

#### Admin Account
- **Email**: `admin@example.com`
- **Password**: `Test123`
- **Role**: Admin

### Step 3: Explore Features

After logging in, you can:
- ✅ Navigate the app interface
- ✅ Test authentication flows (login/logout)
- ✅ Create new test users via Sign Up
- ✅ Switch between different user roles
- ✅ Verify UI components and layouts

## Creating New Test Users

You can create additional test users:

1. Click **Sign Up** on the auth page
2. Enter any email address (e.g., `mytest@example.com`)
3. Choose a password (6+ characters)
4. Enter your name
5. Select a role (User or Provider)
6. Click **Sign Up**

Your new user will be stored in browser localStorage and persist across sessions!

## Features in Test Mode

### ✅ What Works

- **Authentication**: Full login/signup/logout functionality
- **Session Management**: Persistent sessions via localStorage
- **User Profiles**: Mock user profiles with all required fields
- **Navigation**: All routes and pages accessible
- **UI Components**: All components render correctly
- **Role-Based Access**: Different views for User/Provider/Admin

### ⚠️ What Doesn't Work

Since test mode doesn't have a real database, these features will show errors:

- **Data Fetching**: API calls to fetch moods, journals, etc. will fail
- **Data Storage**: Creating new entries won't persist (no database)
- **Real-time Features**: Supabase real-time subscriptions unavailable
- **AI Features**: AI companion and analysis require backend

These errors are **expected and normal** in test mode. The console will show:
```
Error fetching moods: TypeError: Cannot read properties of null (reading 'from')
```

This is intentional - test mode focuses on **authentication and UI testing**, not data operations.

## Technical Details

### How Test Mode is Activated

```typescript
// In src/lib/supabase.ts
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isTestMode = !supabaseUrl || !supabaseAnonKey
```

### Where Data is Stored

Test mode uses browser localStorage with these keys:

- `niramaya_test_users` - Array of test user accounts
- `niramaya_test_session` - Current session data

You can inspect this in your browser's DevTools:
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Find `http://localhost:5173`

### Default Test Users

The following users are pre-configured:

```javascript
[
  {
    id: 'test-user-1',
    email: 'testuser@example.com',
    password: 'Test123',
    name: 'Test User',
    role: 'User',
    anonymous_handle: 'BraveSoul123'
  },
  {
    id: 'test-provider-1',
    email: 'testprovider@example.com',
    password: 'Test123',
    name: 'Test Provider',
    role: 'Provider',
    anonymous_handle: 'WiseHeart456'
  },
  {
    id: 'test-admin-1',
    email: 'admin@example.com',
    password: 'Test123',
    name: 'Admin User',
    role: 'Admin',
    anonymous_handle: 'StrongMind789'
  }
]
```

## Switching to Production Mode

To use the real Supabase backend:

1. Create a `.env` file in the project root
2. Add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```
3. Restart the dev server
4. The app will automatically switch to production mode

The test mode banner will disappear, and all database features will work.

## Clearing Test Data

To reset test mode data:

### Option 1: Clear localStorage
Open browser DevTools → Application → Local Storage → Right-click → Clear

### Option 2: Programmatically
```javascript
localStorage.removeItem('niramaya_test_users')
localStorage.removeItem('niramaya_test_session')
```

Then refresh the page to reinitialize with default test users.

## Troubleshooting

### "Invalid login credentials" error
- Make sure you're using the exact credentials (case-sensitive)
- Password is `Test123` (capital T)
- Clear localStorage and try again

### Test mode banner not showing
- Verify there's no `.env` file with Supabase credentials
- Check browser console for the isTestMode value
- Restart the dev server

### New users not persisting
- Check if cookies/localStorage is enabled in your browser
- Try a different browser
- Check browser DevTools for localStorage errors

### Console errors about database operations
- These are **expected** in test mode
- Test mode doesn't have a real database
- Only authentication and UI features work in test mode

## Building for Production

Test mode is automatically disabled in production builds when Supabase is configured. To build:

```bash
npm run build
```

The build process will check for environment variables and configure accordingly.

## Security Note

⚠️ **Important**: Test mode is for development and testing only.

- Test credentials are hardcoded and not secure
- localStorage data is not encrypted
- Anyone with browser access can view test data
- Never use test mode for real user data
- Always use proper Supabase authentication in production

## Benefits of Test Mode

✅ **Zero Configuration**: No backend setup required
✅ **Instant Testing**: Start testing immediately
✅ **Offline Development**: Work without internet
✅ **Fast Iteration**: No API latency
✅ **Safe Experimentation**: No risk to production data
✅ **Learning Tool**: Understand auth flows without complexity

---

**Ready to test?** Just run `npm run dev` and start exploring! 🚀
