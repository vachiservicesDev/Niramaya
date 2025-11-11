import { test, expect } from '@playwright/test'

/**
 * E2E tests for authentication flows with hardcoded test credentials
 * 
 * These tests verify that the hardcoded test users can login seamlessly
 * and that the signup flow works correctly for new users.
 * 
 * Test credentials:
 * - testuser@example.com / Test123 (User role)
 * - testprovider@example.com / Test123 (Provider role)
 * - admin@example.com / Test123 (Admin role)
 */

test.describe('Hardcoded Test User Login', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to auth page before each test
    await page.goto('/auth')
  })

  test('should login with testuser@example.com and Test123', async ({ page }) => {
    // Ensure we're on the login tab
    const loginTab = page.locator('button:has-text("Log In")')
    await loginTab.click()
    
    // Fill in the login form
    await page.fill('input[type="email"]', 'testuser@example.com')
    await page.fill('input[type="password"]', 'Test123')
    
    // Submit the form
    await page.click('button[type="submit"]')
    
    // Wait for navigation to home page
    await page.waitForURL(/\/app\/home/, { timeout: 15000 })
    
    // Verify we're on the home page
    await expect(page).toHaveURL(/\/app\/home/)
    
    // Verify the page loaded successfully
    await expect(page.locator('body')).toBeVisible()
  })

  test('should login with testprovider@example.com and Test123', async ({ page }) => {
    // Ensure we're on the login tab
    const loginTab = page.locator('button:has-text("Log In")')
    await loginTab.click()
    
    // Fill in the login form
    await page.fill('input[type="email"]', 'testprovider@example.com')
    await page.fill('input[type="password"]', 'Test123')
    
    // Submit the form
    await page.click('button[type="submit"]')
    
    // Wait for navigation
    await page.waitForURL(/\/(app|provider)/, { timeout: 15000 })
    
    // Verify we're logged in (could be home or provider dashboard)
    const url = page.url()
    expect(url).toMatch(/\/(app\/home|provider)/)
  })

  test('should login with admin@example.com and Test123', async ({ page }) => {
    // Ensure we're on the login tab
    const loginTab = page.locator('button:has-text("Log In")')
    await loginTab.click()
    
    // Fill in the login form
    await page.fill('input[type="email"]', 'admin@example.com')
    await page.fill('input[type="password"]', 'Test123')
    
    // Submit the form
    await page.click('button[type="submit"]')
    
    // Wait for navigation
    await page.waitForURL(/\/app/, { timeout: 15000 })
    
    // Verify we're logged in
    await expect(page).toHaveURL(/\/app/)
  })

  test('should show error for invalid password', async ({ page }) => {
    // Ensure we're on the login tab
    const loginTab = page.locator('button:has-text("Log In")')
    await loginTab.click()
    
    // Fill in the login form with wrong password
    await page.fill('input[type="email"]', 'testuser@example.com')
    await page.fill('input[type="password"]', 'WrongPassword')
    
    // Submit the form
    await page.click('button[type="submit"]')
    
    // Should show an error message
    await expect(page.locator('.error-message, [class*="error"]')).toBeVisible({ timeout: 5000 })
  })

  test('should show error for non-existent user', async ({ page }) => {
    // Ensure we're on the login tab
    const loginTab = page.locator('button:has-text("Log In")')
    await loginTab.click()
    
    // Fill in the login form with non-existent user
    await page.fill('input[type="email"]', 'nonexistent@example.com')
    await page.fill('input[type="password"]', 'SomePassword123')
    
    // Submit the form
    await page.click('button[type="submit"]')
    
    // Should show an error message
    await expect(page.locator('.error-message, [class*="error"]')).toBeVisible({ timeout: 5000 })
  })
})

test.describe('User Signup Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth')
  })

  test('should allow new user to sign up', async ({ page }) => {
    // Switch to signup tab
    const signupTab = page.locator('button:has-text("Sign Up")')
    await signupTab.click()
    
    // Generate a unique email
    const uniqueEmail = `testuser${Date.now()}@example.com`
    
    // Fill in the signup form
    await page.fill('input[type="email"]', uniqueEmail)
    await page.fill('input[type="password"]', 'TestPassword123')
    
    // Fill in the name field (only visible in signup)
    const nameInput = page.locator('input[type="text"]').first()
    await nameInput.fill('New Test User')
    
    // Select User role
    const userRoleRadio = page.locator('input[type="radio"][value="User"]')
    await userRoleRadio.click()
    
    // Submit the form
    await page.click('button[type="submit"]')
    
    // Wait for successful signup and redirect
    await page.waitForURL(/\/app\/home/, { timeout: 15000 })
    
    // Verify we're on the home page
    await expect(page).toHaveURL(/\/app\/home/)
  })

  test('should allow provider signup', async ({ page }) => {
    // Switch to signup tab
    const signupTab = page.locator('button:has-text("Sign Up")')
    await signupTab.click()
    
    // Generate a unique email
    const uniqueEmail = `provider${Date.now()}@example.com`
    
    // Fill in the signup form
    await page.fill('input[type="email"]', uniqueEmail)
    await page.fill('input[type="password"]', 'ProviderPass123')
    
    // Fill in the name field
    const nameInput = page.locator('input[type="text"]').first()
    await nameInput.fill('New Test Provider')
    
    // Select Provider role
    const providerRoleRadio = page.locator('input[type="radio"][value="Provider"]')
    await providerRoleRadio.click()
    
    // Submit the form
    await page.click('button[type="submit"]')
    
    // Wait for successful signup and redirect
    await page.waitForURL(/\/(app|provider)/, { timeout: 15000 })
    
    // Verify we're logged in
    const url = page.url()
    expect(url).toMatch(/\/(app\/home|provider)/)
  })

  test('should validate email format', async ({ page }) => {
    // Switch to signup tab
    const signupTab = page.locator('button:has-text("Sign Up")')
    await signupTab.click()
    
    // Try to submit with invalid email
    await page.fill('input[type="email"]', 'invalid-email')
    await page.fill('input[type="password"]', 'Password123')
    
    const nameInput = page.locator('input[type="text"]').first()
    await nameInput.fill('Test User')
    
    const userRoleRadio = page.locator('input[type="radio"][value="User"]')
    await userRoleRadio.click()
    
    // Submit button should be disabled or form should not submit
    const emailInput = page.locator('input[type="email"]')
    
    // Check HTML5 validation
    const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage)
    expect(validationMessage).toBeTruthy()
  })

  test('should validate password minimum length', async ({ page }) => {
    // Switch to signup tab
    const signupTab = page.locator('button:has-text("Sign Up")')
    await signupTab.click()
    
    // Try to submit with short password
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', '12345') // Only 5 characters
    
    const nameInput = page.locator('input[type="text"]').first()
    await nameInput.fill('Test User')
    
    const userRoleRadio = page.locator('input[type="radio"][value="User"]')
    await userRoleRadio.click()
    
    // Check password validation
    const passwordInput = page.locator('input[type="password"]')
    const validationMessage = await passwordInput.evaluate((el: HTMLInputElement) => el.validationMessage)
    expect(validationMessage).toBeTruthy()
  })

  test('should require name field for signup', async ({ page }) => {
    // Switch to signup tab
    const signupTab = page.locator('button:has-text("Sign Up")')
    await signupTab.click()
    
    // Fill in email and password but not name
    await page.fill('input[type="email"]', 'test@example.com')
    await page.fill('input[type="password"]', 'Password123')
    
    const userRoleRadio = page.locator('input[type="radio"][value="User"]')
    await userRoleRadio.click()
    
    // Try to submit without name
    await page.click('button[type="submit"]')
    
    // Name field should have validation error
    const nameInput = page.locator('input[type="text"]').first()
    const validationMessage = await nameInput.evaluate((el: HTMLInputElement) => el.validationMessage)
    expect(validationMessage).toBeTruthy()
  })

  test('should have role selection visible in signup', async ({ page }) => {
    // Switch to signup tab
    const signupTab = page.locator('button:has-text("Sign Up")')
    await signupTab.click()
    
    // Check that role selection is visible
    const userRole = page.locator('input[type="radio"][value="User"]')
    const providerRole = page.locator('input[type="radio"][value="Provider"]')
    
    await expect(userRole).toBeVisible()
    await expect(providerRole).toBeVisible()
  })
})

test.describe('Navigation Between Login and Signup', () => {
  test('should switch between login and signup tabs', async ({ page }) => {
    await page.goto('/auth')
    
    // Should start on login tab
    const loginTab = page.locator('button:has-text("Log In")')
    await expect(loginTab).toHaveClass(/active/)
    
    // Click signup tab
    const signupTab = page.locator('button:has-text("Sign Up")')
    await signupTab.click()
    
    // Signup tab should be active
    await expect(signupTab).toHaveClass(/active/)
    
    // Name field should be visible in signup
    const nameInput = page.locator('label:has-text("Name")')
    await expect(nameInput).toBeVisible()
    
    // Click back to login tab
    await loginTab.click()
    
    // Login tab should be active again
    await expect(loginTab).toHaveClass(/active/)
  })
})

test.describe('End-to-End Authentication Journey', () => {
  test('complete user journey: signup -> logout -> login', async ({ page }) => {
    // 1. Navigate to auth page
    await page.goto('/auth')
    
    // 2. Sign up as new user
    const signupTab = page.locator('button:has-text("Sign Up")')
    await signupTab.click()
    
    const uniqueEmail = `journey${Date.now()}@example.com`
    
    await page.fill('input[type="email"]', uniqueEmail)
    await page.fill('input[type="password"]', 'Journey123')
    
    const nameInput = page.locator('input[type="text"]').first()
    await nameInput.fill('Journey User')
    
    const userRoleRadio = page.locator('input[type="radio"][value="User"]')
    await userRoleRadio.click()
    
    await page.click('button[type="submit"]')
    
    // 3. Verify successful signup
    await page.waitForURL(/\/app\/home/, { timeout: 15000 })
    await expect(page).toHaveURL(/\/app\/home/)
    
    // 4. Sign out (look for sign out button in navigation)
    const signOutButton = page.locator('button:has-text("Sign Out"), a:has-text("Sign Out"), button:has-text("Log Out"), a:has-text("Log Out")')
    
    if (await signOutButton.count() > 0) {
      await signOutButton.first().click()
      
      // 5. Should redirect to landing or auth page
      await page.waitForURL(/\/(auth|$)/, { timeout: 10000 })
      
      // 6. Navigate back to auth page if needed
      if (!page.url().includes('/auth')) {
        await page.goto('/auth')
      }
      
      // 7. Log back in with same credentials
      const loginTab = page.locator('button:has-text("Log In")')
      await loginTab.click()
      
      await page.fill('input[type="email"]', uniqueEmail)
      await page.fill('input[type="password"]', 'Journey123')
      
      await page.click('button[type="submit"]')
      
      // 8. Verify successful login
      await page.waitForURL(/\/app\/home/, { timeout: 15000 })
      await expect(page).toHaveURL(/\/app\/home/)
    }
  })
})
