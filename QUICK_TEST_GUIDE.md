# Quick Test Guide - Hardcoded Test Credentials

## 🚀 Instant Login - No Signup Required!

You can now test the Niramaya app instantly using pre-configured test accounts. No signup, no email verification - just login and start testing!

## 📋 Test Credentials

Copy and paste these credentials to login:

### User Account (Regular User)
```
Email:    testuser@example.com
Password: Test123
```

### Provider Account (Mental Health Professional)
```
Email:    testprovider@example.com
Password: Test123
```

### Admin Account
```
Email:    admin@example.com
Password: Test123
```

## 🎯 How to Test

### Step 1: Access the Login Page
1. Open the application in your browser
2. Navigate to `/auth` (or click "Get Started" from the landing page)

### Step 2: Enter Credentials
1. Make sure you're on the **"Log In"** tab (not Sign Up)
2. Enter one of the test emails (e.g., `testuser@example.com`)
3. Enter the password: `Test123`
4. Click **"Log In"**

### Step 3: Start Testing!
- You'll be automatically logged in
- First login creates the account automatically
- Subsequent logins are instant

## ✨ What You Can Test

### As User (testuser@example.com)
- ✅ User dashboard with mood trends
- ✅ Create mood check-ins
- ✅ Write journal entries
- ✅ Chat with AI companion
- ✅ Join communities
- ✅ Create posts and comments (anonymously or publicly)
- ✅ Access crisis resources
- ✅ Manage settings and profile

### As Provider (testprovider@example.com)
- ✅ Provider dashboard with statistics
- ✅ View client list (when clients are linked)
- ✅ Access client journal entries
- ✅ Generate bi-weekly reports
- ✅ Manage provider profile
- ✅ Set specialties and credentials

### As Admin (admin@example.com)
- ✅ All user features
- ✅ Admin controls
- ✅ Moderation capabilities
- ✅ Full system access

## 🔄 Switching Between Accounts

To test different roles:
1. **Sign Out** (button in navigation or settings)
2. Return to `/auth`
3. Login with a different test account

## ⚡ First Time vs. Returning Users

### First Login
- Takes a few seconds longer
- Automatically creates Supabase Auth account
- Sets up user profile in database
- Generates anonymous handle

### Subsequent Logins
- Instant login
- All your data is preserved
- Same as regular login

## 🧪 Testing Scenarios

### Scenario 1: User Journey
```
1. Login as testuser@example.com
2. Create 3-4 mood check-ins
3. Write a journal entry
4. Join "Anxiety Support" community
5. Create a post (try both anonymous and public)
6. Chat with AI companion
7. Check crisis resources
```

### Scenario 2: Provider Workflow
```
1. Login as testprovider@example.com
2. View provider dashboard
3. Check client list
4. Update provider profile
5. Set specialties
```

### Scenario 3: Multi-Role Testing
```
1. Login as testuser@example.com
2. Create some journal entries
3. Sign out
4. Login as testprovider@example.com
5. Check if you can see linked clients
```

## ❌ Testing Error Cases

### Wrong Password
```
Email:    testuser@example.com
Password: WrongPassword
Expected: Error message displayed
```

### Non-existent User
```
Email:    nobody@example.com
Password: AnyPassword123
Expected: "Invalid login credentials" error
```

## 📊 Running Automated Tests

The E2E test suite includes comprehensive tests for these credentials:

```bash
# Start the dev server
npm run dev

# In another terminal, run E2E tests
npm run test:e2e

# Or with UI mode for visual testing
npm run test:e2e:ui
```

**Tests include:**
- ✅ Login with all 3 test users
- ✅ Error handling (wrong password, non-existent user)
- ✅ Signup flow validation
- ✅ Form validation (email, password, required fields)
- ✅ Complete user journey (signup → logout → login)

## 💡 Tips

1. **Password is case-sensitive**: Must be exactly `Test123`
2. **First login is slower**: Account creation takes a few seconds
3. **Use Sign Out button**: To switch accounts properly
4. **Check browser console**: For any error messages
5. **Clear cache if needed**: If experiencing issues

## 🐛 Troubleshooting

### "Invalid login credentials" error
- ✅ Check you typed the email correctly
- ✅ Ensure password is exactly `Test123` (case-sensitive)
- ✅ Make sure you're on the "Log In" tab, not "Sign Up"

### First login takes too long
- ✅ This is normal - creating account for first time
- ✅ Refresh the page if it takes more than 30 seconds
- ✅ Check browser console for errors

### Can't see my data after re-login
- ✅ Make sure you're using the same test account
- ✅ Check you didn't accidentally create a new account in signup tab

## 🎓 For New Users

If you want to create your own test account instead:

1. Click **"Sign Up"** tab
2. Enter any email (e.g., `mytest@example.com`)
3. Create a password (6+ characters)
4. Enter your name
5. Select your role
6. Click **"Sign Up"**

This creates a fresh account that's separate from the hardcoded test accounts.

## 📚 More Information

For complete details, see:
- **[HARDCODED_TEST_CREDENTIALS.md](./HARDCODED_TEST_CREDENTIALS.md)** - Full documentation
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical details
- **[README.md](./README.md)** - General project information

## 🎉 Ready to Test!

Pick a test account above and start exploring Niramaya!

**Most Common Starting Point:**
```
Email:    testuser@example.com
Password: Test123
```

Just paste these into the login form and click "Log In" - you're done! 🚀
