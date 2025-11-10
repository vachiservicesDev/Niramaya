# 🔧 Setting Up Test Accounts - Step by Step

## The Issue

The database has user profile records, but Supabase Auth accounts don't exist yet. You need to create them!

## ✅ EASIEST SOLUTION: Sign Up Through the App

This is the **recommended** way to test the application:

### Option 1: Create Your Own Test Accounts (Recommended)

**Step 1: Create a User Account**
1. Open the app and go to `/auth`
2. Click "Sign Up"
3. Enter:
   - **Email**: `testuser@example.com` (or any email you want)
   - **Password**: `password123`
   - **Name**: `Test User`
   - **Role**: Select "User (seeking support)"
4. Click "Sign Up"
5. ✅ You're in! Anonymous handle auto-generated

**Step 2: Create a Provider Account**
1. Sign out (button in navigation)
2. Go to `/auth` again
3. Click "Sign Up"
4. Enter:
   - **Email**: `testprovider@example.com`
   - **Password**: `password123`
   - **Name**: `Dr. Test Provider`
   - **Role**: Select "Provider (mental health professional)"
5. Click "Sign Up"
6. ✅ Provider account created!

**Step 3: Create Test Data**
- Add some mood check-ins
- Write journal entries
- Join communities and create posts
- Test all features with fresh data

### Option 2: Use the Existing Test Data

If you want to use the pre-populated test data (10 journal entries, 14 mood check-ins, etc.), you need to:

**A) Using Supabase Dashboard**
1. Go to your Supabase project dashboard
2. Navigate to: **Authentication → Users**
3. Click **"Add User"** (or "Invite User")
4. For the User account:
   - **Email**: `user@test.com`
   - **Password**: `password123`
   - **Auto Confirm User**: Toggle ON (no email verification)
   - Click "Send Invitation" or "Create User"
5. **IMPORTANT**: Copy the UUID of the created user
6. Update the database:
   ```sql
   -- In Supabase SQL Editor
   UPDATE users
   SET id = 'PASTE-UUID-HERE'
   WHERE email = 'user@test.com';

   -- Also update related records
   UPDATE journal_entries
   SET user_id = 'PASTE-UUID-HERE'
   WHERE user_id = '11111111-1111-1111-1111-111111111111';

   UPDATE mood_check_ins
   SET user_id = 'PASTE-UUID-HERE'
   WHERE user_id = '11111111-1111-1111-1111-111111111111';

   UPDATE crisis_check_ins
   SET user_id = 'PASTE-UUID-HERE'
   WHERE user_id = '11111111-1111-1111-1111-111111111111';

   UPDATE community_posts
   SET author_id = 'PASTE-UUID-HERE'
   WHERE author_id = '11111111-1111-1111-1111-111111111111';

   UPDATE provider_client_links
   SET client_id = 'PASTE-UUID-HERE'
   WHERE client_id = '11111111-1111-1111-1111-111111111111';
   ```
7. Repeat for provider@test.com and admin@test.com

**B) Simpler Alternative**
Just delete the old test data and create fresh accounts:

```sql
-- Clean up old test data
DELETE FROM users WHERE email IN ('user@test.com', 'provider@test.com', 'admin@test.com');
```

Then sign up through the app normally!

---

## 🎯 RECOMMENDED WORKFLOW

**Just create new accounts and add data yourself!**

1. **Sign up as User** → Explore all user features
2. **Add some data**:
   - Create 3-4 mood check-ins
   - Write 2-3 journal entries
   - Join a community and make a post
3. **Sign up as Provider** → See provider dashboard
4. **Test the relationship**:
   - Providers can't see clients until linked
   - In production, you'd need to implement invite/accept flow

---

## 🔑 Quick Reference

### What Works Now
- ✅ Sign up with any email
- ✅ Auto-generated anonymous handles
- ✅ All features work perfectly
- ✅ Database schema is ready
- ✅ RLS policies are active

### What You Need to Do
- Create Supabase Auth accounts by signing up through the app
- Add your own test data by using the features
- No complex setup required!

---

## 💡 Pro Tip

**Best Testing Approach:**

1. **Day 1**: Sign up as user, explore features, add some data
2. **Day 2**: Check your mood trends, write more journal entries
3. **Day 3**: Sign up as provider, check provider dashboard
4. **Day 4**: Sign up as admin, test admin features

This way you experience the app as real users would!

---

## ❓ FAQ

**Q: Why can't I use user@test.com / password123?**
A: Those accounts don't exist in Supabase Auth yet. Only the database profiles exist.

**Q: Do I have to use those exact emails?**
A: No! Use any email you want. The app works with any valid credentials.

**Q: Will I lose the test data?**
A: The database records are there, but they're linked to non-existent user IDs. Just create fresh data - it's easy!

**Q: How do I link a provider to a client?**
A: Currently, you can manually insert into `provider_client_links` table, or implement an invite feature later.

**Q: Can I see the pre-made communities?**
A: Yes! 5 communities are already created and ready to join.

---

## ✅ Verification

After signing up, you should be able to:
- ✅ See your dashboard
- ✅ Create mood check-ins
- ✅ Write journal entries
- ✅ Join communities
- ✅ Chat with AI companion
- ✅ Access all features

---

## 🆘 Still Having Issues?

1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Make sure you're connected to the internet
4. Try a different email address
5. Clear browser cache and try again

---

**Remember: The app is fully functional! Just sign up normally and everything works! 🚀**
