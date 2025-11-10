import { test, expect } from '@playwright/test'

/**
 * E2E test for landing page and basic navigation
 * 
 * Note: These tests require a running development server
 * Run with: npm run test:e2e
 */

test.describe('Landing Page', () => {
  test('should load landing page successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check that the page title contains Niramaya
    await expect(page).toHaveTitle(/Niramaya/)
    
    // Check for key elements on landing page
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should navigate to auth page', async ({ page }) => {
    await page.goto('/')
    
    // Find and click "Get Started" or similar button
    const getStartedButton = page.locator('a[href="/auth"], button:has-text("Get Started")')
    
    if (await getStartedButton.count() > 0) {
      await getStartedButton.first().click()
      await expect(page).toHaveURL(/\/auth/)
    }
  })
})

test.describe('Authentication Page', () => {
  test('should show sign up and sign in forms', async ({ page }) => {
    await page.goto('/auth')
    
    // Check for email and password inputs
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('should have role selection for sign up', async ({ page }) => {
    await page.goto('/auth')
    
    // Check if role selection exists (could be tabs or select)
    const hasRoleSelect = await page.locator('select, [role="tablist"]').count() > 0
    expect(hasRoleSelect).toBeTruthy()
  })
})

test.describe('Protected Routes', () => {
  test('should redirect to auth when not logged in', async ({ page }) => {
    // Try to access protected route
    await page.goto('/app/home')
    
    // Should redirect to auth or show login
    await expect(page).toHaveURL(/\/(auth|login)/)
  })

  test('should redirect provider routes when not logged in', async ({ page }) => {
    await page.goto('/provider/dashboard')
    
    // Should redirect to auth
    await expect(page).toHaveURL(/\/(auth|login)/)
  })
})

test.describe('Responsive Design', () => {
  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Page should still load correctly
    await expect(page.locator('body')).toBeVisible()
  })

  test('should be tablet responsive', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    
    // Page should still load correctly
    await expect(page.locator('body')).toBeVisible()
  })
})

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    
    // Check for h1
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBeGreaterThan(0)
  })

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/')
    
    // Check that images have alt attributes
    const images = await page.locator('img').all()
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      // Alt can be empty string for decorative images, but should exist
      expect(alt !== null).toBeTruthy()
    }
  })
})

/**
 * NOTE: The following tests require valid Supabase credentials
 * and would be skipped in CI without proper setup
 */

test.describe.skip('User Sign Up Flow', () => {
  test('should allow user to sign up', async ({ page }) => {
    await page.goto('/auth')
    
    // Generate random email to avoid conflicts
    const randomEmail = `test-${Date.now()}@example.com`
    
    // Fill sign up form
    await page.fill('input[type="email"]', randomEmail)
    await page.fill('input[type="password"]', 'password123')
    await page.fill('input[name="name"]', 'Test User')
    
    // Select User role (implementation dependent)
    // await page.selectOption('select[name="role"]', 'User')
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Should redirect to home after successful signup
    await expect(page).toHaveURL(/\/app\/home/, { timeout: 10000 })
  })
})

test.describe.skip('User Login Flow', () => {
  test('should allow existing user to log in', async ({ page }) => {
    await page.goto('/auth')
    
    // Use test account
    await page.fill('input[type="email"]', 'user@test.com')
    await page.fill('input[type="password"]', 'password123')
    
    // Click sign in
    await page.click('button:has-text("Sign In")')
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/app\/home/, { timeout: 10000 })
  })
})

test.describe.skip('Mood Check-In Flow', () => {
  test('should create mood check-in', async ({ page }) => {
    // This test requires being logged in
    // You would need to set up authentication state first
    
    await page.goto('/app/home')
    
    // Select a mood
    await page.click('[data-mood="neutral"]')
    
    // Save mood
    await page.click('button:has-text("Save")')
    
    // Check for success message
    await expect(page.locator('text=/saved/i')).toBeVisible({ timeout: 5000 })
  })
})
