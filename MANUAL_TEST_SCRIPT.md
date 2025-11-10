# Manual Testing Script

This is a step-by-step guide to manually test all features of Niramaya.

## Prerequisites

- ✅ Application is running (locally or deployed)
- ✅ Supabase database is set up
- ✅ Test accounts created or ability to create new accounts

## Testing Environment

- [ ] Local development (`npm run dev`)
- [ ] Production deployment (Vercel URL)

Testing URL: ___________________________

---

## Test Session 1: User Registration & Authentication (15 min)

### Test 1.1: User Sign Up
**Time**: 3 minutes

1. Navigate to `/auth`
2. Click "Sign Up" tab
3. Enter:
   - Email: `testuser-{timestamp}@example.com`
   - Password: `password123`
   - Name: `Test User`
   - Role: User
4. Click "Sign Up"

**Expected Results**:
- [ ] Sign up successful
- [ ] Redirected to `/app/home`
- [ ] Anonymous handle visible in navbar
- [ ] No console errors

**Actual Results**: ___________________________

---

### Test 1.2: Sign Out
**Time**: 1 minute

1. Click profile menu
2. Click "Sign Out"

**Expected Results**:
- [ ] Signed out successfully
- [ ] Redirected to landing page
- [ ] Can no longer access protected routes

**Actual Results**: ___________________________

---

### Test 1.3: Sign In
**Time**: 2 minutes

1. Navigate to `/auth`
2. Enter credentials from Test 1.1
3. Click "Sign In"

**Expected Results**:
- [ ] Login successful
- [ ] Redirected to dashboard
- [ ] Session persists on page refresh

**Actual Results**: ___________________________

---

## Test Session 2: Mood Tracking (10 min)

### Test 2.1: Create Mood Check-In
**Time**: 3 minutes

1. On home page, click mood emoji (😊)
2. Add notes: "Feeling good today"
3. Click "Save Mood"

**Expected Results**:
- [ ] Success message displayed
- [ ] Mood appears in timeline
- [ ] Timestamp is correct
- [ ] Can create multiple moods

**Actual Results**: ___________________________

---

### Test 2.2: View Mood Trends
**Time**: 2 minutes

1. Create 5+ mood check-ins with different moods
2. View mood timeline

**Expected Results**:
- [ ] All moods displayed in order
- [ ] Correct dates/times
- [ ] Visual indicators match mood levels

**Actual Results**: ___________________________

---

## Test Session 3: Journaling (15 min)

### Test 3.1: Create Journal Entry
**Time**: 5 minutes

1. Navigate to `/app/journal`
2. Click "New Entry"
3. Enter:
   - Text: "Today I practiced mindfulness meditation. It helped me feel more centered and calm."
   - Mood: Neutral
   - Tags: "meditation, calm, mindfulness"
4. Click "Save"

**Expected Results**:
- [ ] Entry saved successfully
- [ ] Appears in journal list
- [ ] Mood badge displays correctly
- [ ] Tags show properly
- [ ] Timestamp accurate

**Actual Results**: ___________________________

---

### Test 3.2: View Journal Entry
**Time**: 2 minutes

1. Click on saved entry
2. View full details

**Expected Results**:
- [ ] All content displays correctly
- [ ] Can navigate back to list

**Actual Results**: ___________________________

---

### Test 3.3: Create Multiple Entries
**Time**: 5 minutes

1. Create 3 more journal entries with different moods
2. Verify list displays all entries

**Expected Results**:
- [ ] All entries in list
- [ ] Sorted by date (newest first)
- [ ] Can scroll/navigate entries

**Actual Results**: ___________________________

---

## Test Session 4: Communities (20 min)

### Test 4.1: Browse Communities
**Time**: 3 minutes

1. Navigate to `/app/communities`
2. View list of communities

**Expected Results**:
- [ ] Communities list loads
- [ ] Can see community names and descriptions
- [ ] Join buttons visible

**Actual Results**: ___________________________

---

### Test 4.2: Join Community
**Time**: 2 minutes

1. Click "Join" on "General Support"
2. Enter community

**Expected Results**:
- [ ] Successfully joined
- [ ] Button changes to "Leave"
- [ ] Can view posts
- [ ] Can create new posts

**Actual Results**: ___________________________

---

### Test 4.3: Create Anonymous Post
**Time**: 5 minutes

1. In joined community, click "New Post"
2. Enter:
   - Title: "My Journey with Anxiety"
   - Body: "I wanted to share my experience..."
   - Keep "Post anonymously" checked
3. Click "Post"

**Expected Results**:
- [ ] Post created successfully
- [ ] Shows anonymous handle (not real name)
- [ ] Appears in community feed
- [ ] Timestamp correct

**Actual Results**: ___________________________

---

### Test 4.4: Create Public Post
**Time**: 3 minutes

1. Create another post
2. Uncheck "Post anonymously"
3. Submit

**Expected Results**:
- [ ] Post shows real name
- [ ] User can choose per post

**Actual Results**: ___________________________

---

### Test 4.5: Comment on Post
**Time**: 3 minutes

1. View a post
2. Add comment: "Thank you for sharing!"
3. Submit

**Expected Results**:
- [ ] Comment appears under post
- [ ] Uses anonymous handle (if checked)
- [ ] Timestamp shows

**Actual Results**: ___________________________

---

## Test Session 5: AI Companion (5 min)

### Test 5.1: Access AI Chat
**Time**: 2 minutes

1. Navigate to `/app/chat`
2. View interface

**Expected Results**:
- [ ] Page loads
- [ ] Disclaimer visible
- [ ] Chat interface accessible

**Actual Results**: ___________________________

---

### Test 5.2: Send Message
**Time**: 3 minutes

1. Type: "I'm feeling anxious today"
2. Send message

**Expected Results**:
- [ ] Message appears in chat
- [ ] Response received (simulated or real)
- [ ] Can send multiple messages

**Actual Results**: ___________________________

---

## Test Session 6: Crisis Resources (10 min)

### Test 6.1: Access Crisis Page
**Time**: 2 minutes

1. Navigate to `/app/crisis`

**Expected Results**:
- [ ] Page loads
- [ ] Warning disclaimers visible
- [ ] Emergency numbers displayed

**Actual Results**: ___________________________

---

### Test 6.2: Complete Crisis Check-In (Info Level)
**Time**: 3 minutes

1. Fill crisis check-in form
2. Select severity: "Info"
3. Answer questions
4. Submit

**Expected Results**:
- [ ] Form submits successfully
- [ ] Appropriate resources shown
- [ ] Self-help suggestions displayed

**Actual Results**: ___________________________

---

### Test 6.3: Crisis Check-In (Urgent Level)
**Time**: 3 minutes

1. Complete another check-in
2. Select severity: "Urgent"
3. Submit

**Expected Results**:
- [ ] Hotline numbers prominently displayed
- [ ] Strong warnings shown
- [ ] Crisis resources accessible

**Actual Results**: ___________________________

---

## Test Session 7: Settings (10 min)

### Test 7.1: View Settings
**Time**: 2 minutes

1. Navigate to `/app/settings`

**Expected Results**:
- [ ] Settings page loads
- [ ] Current profile info displayed
- [ ] Anonymous handle shown

**Actual Results**: ___________________________

---

### Test 7.2: Update Anonymous Handle
**Time**: 3 minutes

1. Click "Generate New Handle"
2. View new handle
3. Save

**Expected Results**:
- [ ] New handle generated
- [ ] Follows pattern (e.g., "BraveSoul234")
- [ ] Saves successfully
- [ ] Reflects in communities

**Actual Results**: ___________________________

---

### Test 7.3: Update Profile
**Time**: 3 minutes

1. Update name, timezone, country
2. Save changes

**Expected Results**:
- [ ] Changes save successfully
- [ ] Persist after logout/login

**Actual Results**: ___________________________

---

## Test Session 8: Provider Features (20 min)

### Test 8.1: Provider Registration
**Time**: 3 minutes

1. Sign out
2. Sign up as Provider
3. Enter:
   - Email: `testprovider-{timestamp}@example.com`
   - Password: `password123`
   - Name: `Dr. Test Provider`
   - Role: Provider

**Expected Results**:
- [ ] Provider account created
- [ ] Redirected to provider dashboard
- [ ] Different interface than user

**Actual Results**: ___________________________

---

### Test 8.2: View Provider Dashboard
**Time**: 5 minutes

1. View dashboard at `/provider/dashboard`

**Expected Results**:
- [ ] Statistics displayed
- [ ] Client list shown (empty if no clients)
- [ ] Dashboard is functional

**Actual Results**: ___________________________

---

### Test 8.3: Access User Features as Provider
**Time**: 5 minutes

1. Navigate to `/app/home`
2. Test user features (mood check-in, journal)

**Expected Results**:
- [ ] Provider can access user features
- [ ] Provider has both dashboards available

**Actual Results**: ___________________________

---

## Test Session 9: Security & Privacy (15 min)

### Test 9.1: Cross-User Data Access
**Time**: 5 minutes

1. Create User A account
2. Create journal entries
3. Sign out, sign in as User B
4. Try to access User A's data

**Expected Results**:
- [ ] User B cannot see User A's data
- [ ] Database queries return only own data

**Actual Results**: ___________________________

---

### Test 9.2: Anonymous Handle Privacy
**Time**: 5 minutes

1. As User A, create anonymous post
2. Sign in as User B
3. View the post

**Expected Results**:
- [ ] Post shows anonymous handle only
- [ ] Real name not visible
- [ ] User identity protected

**Actual Results**: ___________________________

---

## Test Session 10: Navigation & Routes (10 min)

### Test 10.1: All Routes Accessible
**Time**: 5 minutes

Test each route:
- [ ] `/` - Landing page
- [ ] `/auth` - Authentication
- [ ] `/app/home` - User dashboard
- [ ] `/app/chat` - AI companion
- [ ] `/app/journal` - Journal
- [ ] `/app/crisis` - Crisis resources
- [ ] `/app/communities` - Communities list
- [ ] `/app/settings` - Settings
- [ ] `/provider/dashboard` - Provider dashboard

**Actual Results**: ___________________________

---

### Test 10.2: Protected Routes
**Time**: 3 minutes

1. Sign out
2. Try to access `/app/home`

**Expected Results**:
- [ ] Redirected to `/auth`
- [ ] Cannot access without login

**Actual Results**: ___________________________

---

## Test Session 11: Mobile Responsiveness (10 min)

### Test 11.1: Mobile View
**Time**: 5 minutes

1. Open browser dev tools
2. Set viewport to iPhone (375x667)
3. Test key pages

**Expected Results**:
- [ ] All pages display properly
- [ ] Buttons are tappable
- [ ] Text is readable
- [ ] Navigation works

**Actual Results**: ___________________________

---

### Test 11.2: Tablet View
**Time**: 3 minutes

1. Set viewport to iPad (768x1024)
2. Test key pages

**Expected Results**:
- [ ] Layout adapts properly
- [ ] Good use of screen space

**Actual Results**: ___________________________

---

## Summary

### Test Results

Total Tests: _______ / _______  
Passed: _______  
Failed: _______  
Blocked: _______

### Critical Issues Found

1. ___________________________
2. ___________________________
3. ___________________________

### Minor Issues Found

1. ___________________________
2. ___________________________
3. ___________________________

### Overall Assessment

- [ ] Ready for production
- [ ] Needs minor fixes
- [ ] Needs major fixes
- [ ] Not ready

### Tester Information

**Name**: ___________________________  
**Date**: ___________________________  
**Environment**: ___________________________  
**Browser**: ___________________________

### Notes

___________________________
___________________________
___________________________
