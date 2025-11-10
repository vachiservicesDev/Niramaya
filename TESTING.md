# Testing Guide - Niramaya

## Overview

This guide provides comprehensive testing procedures for all user roles and features in Niramaya.

## Table of Contents

1. [Testing Prerequisites](#testing-prerequisites)
2. [User Role Testing](#user-role-testing)
3. [Provider Role Testing](#provider-role-testing)
4. [Admin Role Testing](#admin-role-testing)
5. [Cross-Role Testing](#cross-role-testing)
6. [Automated Testing](#automated-testing)
7. [Test Data Setup](#test-data-setup)

---

## Testing Prerequisites

### Environment Setup

1. **Supabase Database**: Ensure migrations are applied
2. **Environment Variables**: Set in `.env` file
3. **Test Accounts**: Create or use provided test accounts

### Test Accounts

| Role | Email | Password | Purpose |
|------|-------|----------|---------|
| User | user@test.com | password123 | User feature testing |
| Provider | provider@test.com | password123 | Provider feature testing |
| Admin | admin@test.com | password123 | Admin feature testing |

Or create your own test accounts through the signup flow.

---

## User Role Testing

### Test 1: User Registration & Authentication

**Objective**: Verify user can sign up and log in

**Steps**:
1. Navigate to `/auth`
2. Click "Sign Up" tab
3. Enter:
   - Email: `testuser@example.com`
   - Password: `password123`
   - Name: `Test User`
   - Role: Select "User"
4. Click "Sign Up"

**Expected Results**:
- ✅ User is created successfully
- ✅ Redirected to `/app/home`
- ✅ Anonymous handle is auto-generated (e.g., "BraveSoul234")
- ✅ Profile appears in navbar

**Test 2: User Login**

**Steps**:
1. Sign out (Settings → Sign Out)
2. Navigate to `/auth`
3. Enter credentials
4. Click "Sign In"

**Expected Results**:
- ✅ Successfully logged in
- ✅ Redirected to home dashboard
- ✅ Session persists on page refresh

---

### Test 3: Mood Check-In

**Objective**: Verify user can track moods

**Steps**:
1. Log in as User
2. On home page, select a mood emoji (😢, 😔, 😐, 🙂, 😊)
3. Add optional notes
4. Click "Save Mood"

**Expected Results**:
- ✅ Success message appears
- ✅ Mood appears in "Recent Moods" timeline
- ✅ Date/time is correct
- ✅ Can create multiple mood check-ins

**Edge Cases**:
- Try submitting without selecting mood → Should show error
- Create 10+ moods → Should display timeline correctly
- Create mood, refresh page → Should persist

---

### Test 4: Journal Entry

**Objective**: Verify journaling functionality

**Steps**:
1. Navigate to `/app/journal`
2. Click "New Entry"
3. Enter:
   - Text: "Today I practiced mindfulness meditation..."
   - Mood: Select "neutral"
   - Tags: "meditation, calm, focused"
4. Click "Save Entry"

**Expected Results**:
- ✅ Entry saved successfully
- ✅ Appears in journal list
- ✅ Mood badge shows correct color
- ✅ Tags display correctly
- ✅ Timestamp is accurate

**Additional Tests**:
- View existing entries
- Edit an entry (if implemented)
- Delete an entry
- Create entry with very long text (1000+ words)
- Create entry with special characters

---

### Test 5: Community Features

**Objective**: Test community participation

**Test 5a: Join Community**

**Steps**:
1. Navigate to `/app/communities`
2. Click on a community (e.g., "General Support")
3. Click "Join Community"

**Expected Results**:
- ✅ Successfully joined
- ✅ "Join" button changes to "Leave"
- ✅ Can now view posts
- ✅ Can create new posts

**Test 5b: Create Post**

**Steps**:
1. In a joined community, click "New Post"
2. Enter:
   - Title: "My journey with anxiety"
   - Body: "I wanted to share my experience..."
   - Keep "Post anonymously" checked
3. Click "Post"

**Expected Results**:
- ✅ Post created successfully
- ✅ Appears in community feed
- ✅ Shows anonymous handle (not real name)
- ✅ Timestamp is correct

**Test 5c: Comment on Post**

**Steps**:
1. View a post
2. Enter comment text
3. Click "Add Comment"

**Expected Results**:
- ✅ Comment appears under post
- ✅ Uses anonymous handle
- ✅ Timestamp shows
- ✅ Can add multiple comments

**Test 5d: Public Post**

**Steps**:
1. Create a new post
2. Uncheck "Post anonymously"
3. Submit post

**Expected Results**:
- ✅ Post shows real name instead of handle
- ✅ User can choose per-post

---

### Test 6: AI Companion Chat

**Objective**: Test chat functionality

**Steps**:
1. Navigate to `/app/chat`
2. Read safety disclaimers
3. Type message: "I'm feeling anxious today"
4. Click send

**Expected Results**:
- ✅ Disclaimer is prominently displayed
- ✅ Message appears in chat
- ✅ Simulated response appears (or real AI if configured)
- ✅ Can send multiple messages
- ✅ Chat history persists (if implemented)

**Note**: This is a UI/UX test. AI functionality may be simulated.

---

### Test 7: Crisis Resources

**Objective**: Test crisis support features

**Steps**:
1. Navigate to `/app/crisis`
2. Read disclaimer
3. Complete crisis check-in form:
   - Select severity level
   - Answer safety questions
4. Submit

**Expected Results**:
- ✅ Warning disclaimers are clear
- ✅ Form submits successfully
- ✅ Appropriate resources displayed based on severity
- ✅ Hotline numbers shown for region
- ✅ Crisis check-in saved to database

**Test Different Severity Levels**:
- Info → General resources
- Concerned → Suggest contacting provider
- Urgent → Immediate hotline display

---

### Test 8: Settings & Profile

**Objective**: Test user settings

**Steps**:
1. Navigate to `/app/settings`
2. View current anonymous handle
3. Click "Generate New Handle"
4. Update profile information
5. Click "Save"

**Expected Results**:
- ✅ New handle generated (e.g., "CalmStar567")
- ✅ Profile updates save
- ✅ Changes persist after logout/login
- ✅ Can update timezone
- ✅ Can update country

---

### Test 9: Navigation & Routing

**Objective**: Verify all routes work

**Steps**:
Test each route:
- `/` → Landing page
- `/auth` → Login/signup
- `/app/home` → Dashboard
- `/app/chat` → AI companion
- `/app/journal` → Journal
- `/app/crisis` → Crisis resources
- `/app/communities` → Community list
- `/app/communities/:id` → Community detail
- `/app/settings` → Settings

**Expected Results**:
- ✅ All routes load correctly
- ✅ Protected routes redirect if not logged in
- ✅ Back button works
- ✅ No 404 errors
- ✅ Navbar highlights current page

---

## Provider Role Testing

### Test 10: Provider Registration

**Objective**: Create provider account

**Steps**:
1. Sign out any current user
2. Navigate to `/auth`
3. Sign up with role "Provider"

**Expected Results**:
- ✅ Provider account created
- ✅ Redirected to provider dashboard (`/provider/dashboard`)
- ✅ Different UI than user dashboard

---

### Test 11: Provider Dashboard

**Objective**: View provider dashboard

**Steps**:
1. Log in as provider
2. View dashboard at `/provider/dashboard`

**Expected Results**:
- ✅ Statistics displayed (clients, entries, crises)
- ✅ Client list shown
- ✅ Links to client details work
- ✅ Shows empty state if no clients

---

### Test 12: Provider-Client Link

**Objective**: Test provider-client relationship

**Setup**:
- Need to manually create link in database OR
- Implement invite system

**Steps**:
1. Create link between provider and user (via database)
2. Log in as provider
3. View client in dashboard

**Expected Results**:
- ✅ Client appears in provider's list
- ✅ Can click to view details
- ✅ Shows client statistics

---

### Test 13: View Client Details

**Objective**: Provider can access client data (with consent)

**Steps**:
1. As provider, click on a linked client
2. Navigate to `/provider/client/:id`

**Expected Results**:
- ✅ Client name and basic info shown
- ✅ Journal entries visible (with RLS permission)
- ✅ Mood check-ins visible
- ✅ Crisis check-ins visible
- ✅ Risk scores displayed
- ✅ Timeline view works

---

### Test 14: Provider Profile

**Objective**: Provider can manage professional info

**Steps**:
1. Navigate to settings
2. View/edit provider profile:
   - License number
   - Specialties
   - Practice name
   - Insurance info

**Expected Results**:
- ✅ Can save provider profile
- ✅ Data persists
- ✅ Required fields validated

---

### Test 15: Generate Bi-weekly Report

**Objective**: Provider can generate client reports

**Steps**:
1. View client detail page
2. Click "Generate Report"
3. Select date range

**Expected Results**:
- ✅ Report generates (if implemented)
- ✅ Shows summary of client activity
- ✅ Includes risk trends
- ✅ Can download/print

---

## Admin Role Testing

### Test 16: Admin Access

**Objective**: Verify admin privileges

**Steps**:
1. Log in as admin
2. Check access to all features

**Expected Results**:
- ✅ Can access all user features
- ✅ Can access all provider features
- ✅ Has admin-specific controls (if implemented)

---

## Cross-Role Testing

### Test 17: Role-Based Access Control

**Objective**: Verify users cannot access other roles' features

**Test 17a: User Cannot Access Provider Dashboard**

**Steps**:
1. Log in as User
2. Try to navigate to `/provider/dashboard`

**Expected Results**:
- ✅ Redirected to `/app/home`
- ✅ Cannot access provider routes

**Test 17b: Provider Can Access User Features**

**Steps**:
1. Log in as Provider
2. Access user features (journal, mood, communities)

**Expected Results**:
- ✅ Provider can use all user features
- ✅ Provider has both user AND provider dashboards

---

### Test 18: Data Privacy & RLS

**Objective**: Verify Row Level Security policies

**Test 18a: Users Cannot See Other Users' Data**

**Steps**:
1. Create two user accounts (User A, User B)
2. As User A, create journal entries
3. Log in as User B
4. Try to access User A's data

**Expected Results**:
- ✅ User B cannot see User A's journal entries
- ✅ User B cannot see User A's moods
- ✅ Database queries return only own data

**Test 18b: Provider Can Only See Linked Clients**

**Steps**:
1. Create Provider P and Users A and B
2. Link Provider P with User A only
3. Log in as Provider P

**Expected Results**:
- ✅ Provider P can see User A's data
- ✅ Provider P cannot see User B's data
- ✅ Proper authorization checks

---

### Test 19: Community Privacy

**Objective**: Test community access controls

**Steps**:
1. Create private community (if feature exists)
2. User A joins community
3. User B does not join
4. User A posts

**Expected Results**:
- ✅ User A can see posts
- ✅ User B cannot see posts in private community
- ✅ Public communities visible to all

---

## Performance Testing

### Test 20: Large Data Sets

**Objective**: Test with realistic data volumes

**Steps**:
1. Create 100+ mood check-ins
2. Create 50+ journal entries
3. Join 10+ communities
4. View timeline and lists

**Expected Results**:
- ✅ Pages load in <2 seconds
- ✅ Lists are paginated or lazy-loaded
- ✅ No performance degradation
- ✅ Smooth scrolling

---

### Test 21: Concurrent Users

**Objective**: Test multi-user scenarios

**Steps**:
1. Open multiple browser sessions
2. Log in different users
3. Perform actions simultaneously

**Expected Results**:
- ✅ No data conflicts
- ✅ Each user sees own data
- ✅ Real-time updates work (if implemented)

---

## Edge Cases & Error Handling

### Test 22: Network Errors

**Steps**:
1. Simulate offline mode
2. Try to save data

**Expected Results**:
- ✅ Appropriate error messages
- ✅ Data not lost
- ✅ Retry mechanism works

---

### Test 23: Invalid Input

**Steps**:
1. Try to submit forms with:
   - Empty required fields
   - Invalid email formats
   - Passwords too short
   - Special characters
   - Very long text

**Expected Results**:
- ✅ Validation errors shown
- ✅ Clear error messages
- ✅ No crashes or console errors

---

### Test 24: Session Management

**Steps**:
1. Log in
2. Wait for session timeout (or force expire)
3. Try to perform action

**Expected Results**:
- ✅ Redirected to login
- ✅ Session expires appropriately
- ✅ Can log back in

---

## Automated Testing

### Setup Testing Framework

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Install Playwright for E2E
npm install -D @playwright/test
```

### Unit Tests (Vitest)

Create `src/__tests__/AuthContext.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { AuthProvider, useAuth } from '../contexts/AuthContext'

describe('AuthContext', () => {
  it('should provide auth context', () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current).toBeDefined()
    expect(result.current.user).toBeNull()
  })
})
```

### E2E Tests (Playwright)

Create `tests/e2e/user-flow.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test('user can sign up and create mood check-in', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Get Started')
  
  // Fill signup form
  await page.fill('[name=email]', 'test@example.com')
  await page.fill('[name=password]', 'password123')
  await page.fill('[name=name]', 'Test User')
  await page.selectOption('[name=role]', 'User')
  await page.click('text=Sign Up')
  
  // Should redirect to home
  await expect(page).toHaveURL('/app/home')
  
  // Create mood check-in
  await page.click('[data-mood=neutral]')
  await page.click('text=Save Mood')
  
  // Should see success message
  await expect(page.locator('text=Mood saved')).toBeVisible()
})
```

---

## Test Data Setup

### Automated Test Data Creation

Create `scripts/setup-test-data.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function setupTestData() {
  // Create test users
  // Create provider-client links
  // Create sample journal entries
  // Create communities
  console.log('Test data created successfully')
}

setupTestData()
```

---

## Testing Checklist

Use this checklist for each release:

### Before Testing
- [ ] Database migrations applied
- [ ] Test accounts created
- [ ] Environment variables set
- [ ] Build completes successfully

### User Features
- [ ] Sign up / sign in
- [ ] Mood check-ins
- [ ] Journal entries
- [ ] Communities (join, post, comment)
- [ ] AI companion chat
- [ ] Crisis resources
- [ ] Settings & profile

### Provider Features
- [ ] Provider sign up
- [ ] Dashboard statistics
- [ ] View client list
- [ ] View client details
- [ ] Provider profile

### Admin Features
- [ ] Admin access
- [ ] Moderation tools (if implemented)

### Security & Privacy
- [ ] RLS policies enforced
- [ ] Users cannot see others' data
- [ ] Providers can only see linked clients
- [ ] Anonymous handles work
- [ ] Session management

### Performance
- [ ] Pages load quickly
- [ ] No console errors
- [ ] No network errors
- [ ] Mobile responsive

### Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

---

## Reporting Issues

When you find a bug, report:
1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **User role** (User/Provider/Admin)
5. **Browser & version**
6. **Console errors** (if any)

---

## Continuous Testing

### After Each Code Change
1. Run build: `npm run build`
2. Test affected features
3. Run automated tests (when implemented)
4. Check console for errors

### Before Each Deployment
1. Complete full test checklist
2. Test on staging environment
3. Verify database migrations
4. Check all environment variables

---

**🎯 Goal: 100% feature coverage before production deployment**

Remember: Testing is iterative. Keep this guide updated as features are added or changed.
