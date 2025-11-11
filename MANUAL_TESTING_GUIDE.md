# Manual Testing Guide - Test Credentials Login

## 🎯 Objective
Verify that all three hardcoded test credentials work seamlessly and all features are production-ready.

## ⚡ Prerequisites
1. Development server running: `npm run dev`
2. Application accessible at: `http://localhost:5173`
3. Supabase credentials configured in `.env` file

## 📋 Test Credentials
All passwords are: **Test123**

| Role | Email | Password | Expected Features |
|------|-------|----------|-------------------|
| User | testuser@example.com | Test123 | Mood tracking, journal, AI chat, communities |
| Provider | testprovider@example.com | Test123 | Client dashboard, reports, provider profile |
| Admin | admin@example.com | Test123 | All features + admin controls |

---

## 🧪 Test Suite 1: Login Flow Testing

### Test 1.1: User Login (testuser@example.com)
**Steps:**
1. Navigate to `/auth`
2. Ensure you're on the "Log In" tab
3. Enter email: `testuser@example.com`
4. Enter password: `Test123`
5. Click "Log In" button

**Expected Results:**
- ✅ No errors displayed
- ✅ Redirected to `/app/home`
- ✅ User dashboard visible
- ✅ First login takes a few seconds (auto-creates account)
- ✅ Subsequent logins are instant

**Status:** [ ] PASS [ ] FAIL

**Notes:**
_________________________________

---

### Test 1.2: Provider Login (testprovider@example.com)
**Steps:**
1. Sign out if already logged in
2. Navigate to `/auth`
3. Ensure you're on the "Log In" tab
4. Enter email: `testprovider@example.com`
5. Enter password: `Test123`
6. Click "Log In" button

**Expected Results:**
- ✅ No errors displayed
- ✅ Redirected to dashboard (could be `/app/home` or `/provider`)
- ✅ Provider features accessible
- ✅ Profile shows "Provider" role

**Status:** [ ] PASS [ ] FAIL

**Notes:**
_________________________________

---

### Test 1.3: Admin Login (admin@example.com)
**Steps:**
1. Sign out if already logged in
2. Navigate to `/auth`
3. Ensure you're on the "Log In" tab
4. Enter email: `admin@example.com`
5. Enter password: `Test123`
6. Click "Log In" button

**Expected Results:**
- ✅ No errors displayed
- ✅ Redirected to `/app/home` or admin dashboard
- ✅ Admin features accessible
- ✅ Profile shows "Admin" role

**Status:** [ ] PASS [ ] FAIL

**Notes:**
_________________________________

---

### Test 1.4: Wrong Password Error Handling
**Steps:**
1. Navigate to `/auth`
2. Ensure you're on the "Log In" tab
3. Enter email: `testuser@example.com`
4. Enter password: `WrongPassword123`
5. Click "Log In" button

**Expected Results:**
- ✅ Error message displayed
- ✅ Message indicates invalid credentials
- ✅ User remains on login page
- ✅ No navigation occurs

**Status:** [ ] PASS [ ] FAIL

**Notes:**
_________________________________

---

### Test 1.5: Non-existent User Error Handling
**Steps:**
1. Navigate to `/auth`
2. Ensure you're on the "Log In" tab
3. Enter email: `nonexistent@example.com`
4. Enter password: `AnyPassword123`
5. Click "Log In" button

**Expected Results:**
- ✅ Error message displayed
- ✅ Message indicates invalid credentials
- ✅ User remains on login page

**Status:** [ ] PASS [ ] FAIL

**Notes:**
_________________________________

---

## 🧪 Test Suite 2: User Features (as testuser@example.com)

### Test 2.1: Dashboard Access
**Steps:**
1. Login as `testuser@example.com`
2. Verify you're on `/app/home`

**Expected Results:**
- ✅ Dashboard loads without errors
- ✅ User name displayed correctly
- ✅ Navigation menu visible
- ✅ Quick actions available

**Status:** [ ] PASS [ ] FAIL

---

### Test 2.2: Mood Check-in Creation
**Steps:**
1. From user dashboard, find mood check-in feature
2. Select a mood level
3. Add notes (optional)
4. Submit mood check-in

**Expected Results:**
- ✅ Mood saved successfully
- ✅ Success message displayed
- ✅ Mood appears in history/trends
- ✅ No errors in console

**Status:** [ ] PASS [ ] FAIL

---

### Test 2.3: Journal Entry Creation
**Steps:**
1. Navigate to Journal page (`/app/journal`)
2. Click "New Entry" or similar
3. Write a journal entry
4. Save the entry

**Expected Results:**
- ✅ Entry saved successfully
- ✅ Entry appears in journal list
- ✅ AI summary generated (if feature enabled)
- ✅ Can view the saved entry

**Status:** [ ] PASS [ ] FAIL

---

### Test 2.4: AI Companion Chat
**Steps:**
1. Navigate to AI Companion page
2. Send a test message
3. Wait for AI response

**Expected Results:**
- ✅ Message sends successfully
- ✅ AI response received
- ✅ Safety disclaimers visible
- ✅ Chat history preserved

**Status:** [ ] PASS [ ] FAIL

---

### Test 2.5: Community Access
**Steps:**
1. Navigate to Communities page
2. Browse available communities
3. Join a community
4. View community posts

**Expected Results:**
- ✅ Communities list loads
- ✅ Can join communities
- ✅ Community posts visible
- ✅ Anonymous handle displayed

**Status:** [ ] PASS [ ] FAIL

---

### Test 2.6: Community Post Creation
**Steps:**
1. Inside a community, create a new post
2. Try posting anonymously
3. Try posting with real name (if option available)

**Expected Results:**
- ✅ Post creation successful
- ✅ Anonymous posting works
- ✅ Post appears in community feed
- ✅ Author shows anonymous handle or real name as selected

**Status:** [ ] PASS [ ] FAIL

---

### Test 2.7: Crisis Resources Access
**Steps:**
1. Navigate to Crisis Resources page
2. Review available resources
3. Check hotline information

**Expected Results:**
- ✅ Crisis resources page loads
- ✅ Hotlines displayed correctly
- ✅ Safety warnings visible
- ✅ International resources available

**Status:** [ ] PASS [ ] FAIL

---

### Test 2.8: Settings and Profile
**Steps:**
1. Navigate to Settings page
2. View profile information
3. Update settings (timezone, country, etc.)
4. Save changes

**Expected Results:**
- ✅ Settings page loads
- ✅ Profile information correct
- ✅ Changes save successfully
- ✅ Anonymous handle visible

**Status:** [ ] PASS [ ] FAIL

---

### Test 2.9: Sign Out
**Steps:**
1. Find and click "Sign Out" button
2. Verify redirect

**Expected Results:**
- ✅ Successfully signed out
- ✅ Redirected to landing page or auth page
- ✅ Cannot access protected routes
- ✅ Can sign back in

**Status:** [ ] PASS [ ] FAIL

---

## 🧪 Test Suite 3: Provider Features (as testprovider@example.com)

### Test 3.1: Provider Dashboard Access
**Steps:**
1. Sign out if needed
2. Login as `testprovider@example.com`
3. Navigate to provider dashboard

**Expected Results:**
- ✅ Provider dashboard loads
- ✅ Statistics displayed (may be empty if no clients)
- ✅ Client list visible
- ✅ Provider-specific navigation

**Status:** [ ] PASS [ ] FAIL

---

### Test 3.2: Provider Profile Setup
**Steps:**
1. Navigate to provider profile/settings
2. Add specialties
3. Add credentials
4. Save profile

**Expected Results:**
- ✅ Profile fields editable
- ✅ Changes save successfully
- ✅ Profile displays updated information

**Status:** [ ] PASS [ ] FAIL

---

### Test 3.3: Client List View
**Steps:**
1. View client list on provider dashboard
2. Check for empty state if no clients

**Expected Results:**
- ✅ Client list component renders
- ✅ Shows appropriate message if empty
- ✅ No errors displayed

**Status:** [ ] PASS [ ] FAIL

---

### Test 3.4: Sign Out
**Steps:**
1. Sign out from provider account

**Expected Results:**
- ✅ Successfully signed out
- ✅ Redirected appropriately

**Status:** [ ] PASS [ ] FAIL

---

## 🧪 Test Suite 4: Admin Features (as admin@example.com)

### Test 4.1: Admin Login and Access
**Steps:**
1. Sign out if needed
2. Login as `admin@example.com`
3. Navigate through available features

**Expected Results:**
- ✅ Login successful
- ✅ Dashboard accessible
- ✅ Admin role recognized
- ✅ All user features available

**Status:** [ ] PASS [ ] FAIL

---

### Test 4.2: Admin Controls
**Steps:**
1. Look for admin-specific features
2. Check moderation capabilities
3. Verify full system access

**Expected Results:**
- ✅ Admin features accessible
- ✅ Additional controls visible
- ✅ Full system access granted

**Status:** [ ] PASS [ ] FAIL

---

## 🧪 Test Suite 5: Cross-Browser Testing

### Test 5.1: Chrome/Chromium
**Steps:**
1. Test all three logins in Chrome
2. Verify features work correctly

**Status:** [ ] PASS [ ] FAIL

---

### Test 5.2: Firefox
**Steps:**
1. Test all three logins in Firefox
2. Verify features work correctly

**Status:** [ ] PASS [ ] FAIL

---

### Test 5.3: Safari (if available)
**Steps:**
1. Test all three logins in Safari
2. Verify features work correctly

**Status:** [ ] PASS [ ] FAIL

---

## 🧪 Test Suite 6: Mobile Responsiveness

### Test 6.1: Mobile View Testing
**Steps:**
1. Open browser developer tools
2. Switch to mobile view (e.g., iPhone 12)
3. Test login with `testuser@example.com`
4. Navigate through features

**Expected Results:**
- ✅ Layout responsive
- ✅ All buttons accessible
- ✅ Forms usable on mobile
- ✅ Navigation works

**Status:** [ ] PASS [ ] FAIL

---

## 🧪 Test Suite 7: Performance & Production Readiness

### Test 7.1: First-time Login Performance
**Steps:**
1. Clear browser data
2. Login with fresh test credential
3. Measure time to complete login

**Expected Results:**
- ✅ First login completes in under 10 seconds
- ✅ No timeout errors
- ✅ Smooth user experience

**Status:** [ ] PASS [ ] FAIL

---

### Test 7.2: Subsequent Login Performance
**Steps:**
1. Login again with same credential
2. Measure time to complete login

**Expected Results:**
- ✅ Login completes in under 3 seconds
- ✅ Instant authentication
- ✅ Fast dashboard load

**Status:** [ ] PASS [ ] FAIL

---

### Test 7.3: Console Error Check
**Steps:**
1. Open browser console
2. Login and navigate through app
3. Check for errors

**Expected Results:**
- ✅ No errors in console
- ✅ No warnings about deprecated features
- ✅ No security warnings

**Status:** [ ] PASS [ ] FAIL

---

### Test 7.4: Network Tab Check
**Steps:**
1. Open Network tab in developer tools
2. Perform various actions
3. Check for failed requests

**Expected Results:**
- ✅ All API requests succeed
- ✅ Reasonable response times
- ✅ No 4xx or 5xx errors

**Status:** [ ] PASS [ ] FAIL

---

## 📊 Test Results Summary

### Overall Results
- Total Tests: ___
- Passed: ___
- Failed: ___
- Pass Rate: ___%

### Critical Issues Found
1. _________________________________
2. _________________________________
3. _________________________________

### Minor Issues Found
1. _________________________________
2. _________________________________
3. _________________________________

### Recommendations
1. _________________________________
2. _________________________________
3. _________________________________

---

## ✅ Production Readiness Checklist

### Functionality
- [ ] All three test credentials login successfully
- [ ] Error handling works correctly
- [ ] All user features accessible
- [ ] All provider features accessible
- [ ] All admin features accessible
- [ ] Sign out works correctly

### Performance
- [ ] First-time login completes in reasonable time
- [ ] Subsequent logins are fast
- [ ] No performance bottlenecks
- [ ] Responsive on all devices

### Security
- [ ] Passwords are not exposed in logs
- [ ] Authentication is secure
- [ ] Authorization checks work correctly
- [ ] No sensitive data in console

### User Experience
- [ ] Error messages are clear
- [ ] Loading states are shown
- [ ] Navigation is intuitive
- [ ] Forms are user-friendly

### Cross-browser Compatibility
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works on mobile browsers

### Code Quality
- [ ] No console errors
- [ ] No console warnings
- [ ] Code follows best practices
- [ ] Proper error handling

---

## 🎓 Testing Notes

### Tips for Effective Testing
1. **Clear browser data** between different user tests to ensure clean state
2. **Check browser console** regularly for errors
3. **Test on multiple browsers** to ensure compatibility
4. **Test mobile view** using browser developer tools
5. **Document all issues** with screenshots when possible
6. **Verify error messages** are user-friendly
7. **Test edge cases** like rapid clicking, slow network, etc.

### Common Issues to Watch For
- Infinite loading states
- 404 errors after login
- Broken navigation links
- Missing error messages
- Slow database queries
- Memory leaks in long sessions
- Unhandled promise rejections

---

## 📝 Sign-off

**Tester Name:** _______________________

**Date:** _______________________

**Signature:** _______________________

**Final Verdict:** [ ] PRODUCTION READY [ ] NEEDS FIXES

---

**For automated testing, run:**
```bash
npm run test         # Unit tests
npm run test:e2e     # E2E tests
npm run build        # Production build
```
