# Hardcoded Test Credentials

## Overview

For seamless testing and development, the application includes three hardcoded test user accounts that can be used without signing up. These credentials work automatically and will create the necessary Supabase Auth accounts on first login.

## Test Accounts

### 1. User Account (Regular User)
- **Email**: `testuser@example.com`
- **Password**: `Test123`
- **Name**: Test User
- **Role**: User (seeking support)

**Features to Test**:
- User dashboard with mood check-ins
- Create mood trends
- Write journal entries with AI analysis
- AI Companion chat
- Join and participate in communities
- Crisis resources
- Settings and profile management

### 2. Provider Account (Mental Health Professional)
- **Email**: `testprovider@example.com`
- **Password**: `Test123`
- **Name**: Test Provider
- **Role**: Provider

**Features to Test**:
- Provider dashboard with statistics
- Client list management
- View client journal entries and mood data (with linked clients)
- Generate bi-weekly reports
- Provider profile settings

### 3. Admin Account
- **Email**: `admin@example.com`
- **Password**: `Test123`
- **Name**: Admin User
- **Role**: Admin

**Features to Test**:
- Admin access controls
- Moderation capabilities
- All user features
- Full system access

## How It Works

The authentication system has been enhanced to support these hardcoded test credentials:

1. When you enter one of the test emails with the password "Test123", the system recognizes it as a test account
2. On first login, the system automatically:
   - Creates a Supabase Auth account (if it doesn't exist)
   - Sets up the user profile in the database
   - Generates an anonymous handle for community participation
   - Logs you in seamlessly
3. On subsequent logins, you simply use the same credentials

**Important**: For non-test users (any other email), the normal signup/login flow applies.

## Quick Start

### Testing the User Flow
1. Go to the login page at `/auth`
2. Enter:
   - Email: `testuser@example.com`
   - Password: `Test123`
3. Click "Log In"
4. You'll be redirected to the user dashboard
5. Start exploring features!

### Testing the Provider Flow
1. Sign out if already logged in
2. Go to `/auth`
3. Enter:
   - Email: `testprovider@example.com`
   - Password: `Test123`
4. Click "Log In"
5. Explore the provider dashboard

### Testing the Admin Flow
1. Sign out if already logged in
2. Go to `/auth`
3. Enter:
   - Email: `admin@example.com`
   - Password: `Test123`
4. Click "Log In"
5. Access admin features

## End-to-End Testing

Comprehensive E2E tests have been created in `tests/e2e/auth-flows.spec.ts` that verify:

### Login Tests
- ✅ Login with testuser@example.com
- ✅ Login with testprovider@example.com
- ✅ Login with admin@example.com
- ✅ Error handling for wrong password
- ✅ Error handling for non-existent users

### Signup Tests
- ✅ New user signup flow
- ✅ Provider signup flow
- ✅ Email format validation
- ✅ Password minimum length validation
- ✅ Required field validation
- ✅ Role selection visibility

### Navigation Tests
- ✅ Switch between login and signup tabs
- ✅ Complete user journey: signup → logout → login

## Running E2E Tests

To run the end-to-end tests:

```bash
# Start the development server
npm run dev

# In another terminal, run the E2E tests
npm run test:e2e

# Or run with UI mode
npm run test:e2e:ui
```

## Security Notes

⚠️ **Important**: These hardcoded credentials are for testing and development only.

- Do NOT use these credentials in production
- Regular users must sign up through the normal signup flow
- The hardcoded check only applies to these specific three email addresses
- All other authentication goes through standard Supabase Auth

## Regular User Signup

For testing new user accounts (not using hardcoded credentials):

1. Click "Sign Up" on the auth page
2. Enter any email address (e.g., `mytest@example.com`)
3. Enter a password (6+ characters)
4. Enter your name
5. Select your role (User or Provider)
6. Click "Sign Up"

The system will create a new account with:
- Supabase Auth credentials
- User profile in the database
- Auto-generated anonymous handle
- Access to all features

## Troubleshooting

### Issue: "Invalid login credentials" error
**Solution**: Make sure you're using the exact credentials listed above. Password is case-sensitive: `Test123`

### Issue: First login takes longer than expected
**Solution**: This is normal. The first login creates the Supabase Auth account and user profile. Subsequent logins will be faster.

### Issue: E2E tests fail
**Solution**: 
1. Make sure the dev server is running (`npm run dev`)
2. Verify Supabase credentials are set in environment variables
3. Check that you have an active internet connection

## Benefits

✅ **Instant Testing**: No signup required, login immediately
✅ **Consistent Data**: Same test accounts across all environments
✅ **Automated Testing**: E2E tests can use these credentials reliably
✅ **Role Testing**: Easy to switch between User, Provider, and Admin roles
✅ **No Email Verification**: Skip email confirmation for faster testing

---

**Ready to test?** Just use any of the credentials above and start exploring Niramaya! 🚀
