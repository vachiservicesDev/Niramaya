# 🚀 Quick Test Without Supabase

## The Problem is SOLVED! ✅

You can now test the Niramaya application **without setting up Supabase**. The app automatically detects when Supabase is not configured and switches to **Test Mode**.

## How to Start Testing (30 seconds)

### Step 1: Start the App
```bash
npm install
npm run dev
```

**No `.env` file needed!** The app will automatically enter Test Mode.

### Step 2: Open in Browser
Go to: http://localhost:5173/auth

You'll see a yellow banner: **🧪 Test Mode - No Supabase Required**

### Step 3: Login with Test Credentials

Pick any of these accounts:

| Role | Email | Password |
|------|-------|----------|
| **User** | testuser@example.com | Test123 |
| **Provider** | testprovider@example.com | Test123 |
| **Admin** | admin@example.com | Test123 |

### Step 4: Explore!

You're now logged in and can:
- ✅ Navigate the entire application
- ✅ Test all UI components
- ✅ Create new test users via Sign Up
- ✅ Switch between user roles
- ✅ Test authentication flows

## What Works in Test Mode

✅ **Authentication** - Login, Sign Up, Sign Out
✅ **Session Persistence** - Sessions survive page refresh
✅ **Multiple Users** - Switch between User/Provider/Admin
✅ **User Creation** - Sign up new users on the fly
✅ **UI Components** - All pages and layouts render
✅ **Navigation** - All routes accessible

## What Doesn't Work

Since there's no database, these won't work (expected):
- ❌ Fetching moods, journals, communities (will show errors in console)
- ❌ Creating new entries (no persistence)
- ❌ AI features (requires backend)

**This is normal!** Test mode is for testing authentication and UI only.

## Creating Your Own Test Users

1. Click **Sign Up** on the auth page
2. Enter any email (e.g., `mytest@example.com`)
3. Choose a password (6+ characters)
4. Enter your name
5. Select a role
6. Click **Sign Up**

Your new user is saved in localStorage!

## Switching to Production

To use real Supabase:

1. Create `.env` file in project root
2. Add your credentials:
   ```
   VITE_SUPABASE_URL=your_url_here
   VITE_SUPABASE_ANON_KEY=your_key_here
   ```
3. Restart the server

Test mode banner will disappear and everything will work with real data.

## More Information

See **TEST_MODE.md** for complete documentation including:
- Technical details
- Security notes
- Troubleshooting
- How it works under the hood

---

**Happy Testing!** 🎉

No Supabase setup required. Just run `npm run dev` and go!
