import { test, expect } from '../../fixtures/advancedWorkerFixture';

/**
 * Advanced Tests using Worker Fixture with Storage State
 * Demonstrates reusing authentication state across tests for better performance
 */

test.describe('The Internet - Advanced Worker Fixture Tests', () => {
  test('should access secure area using saved storage state', async ({ authenticatedPage }) => {
    // Navigate to secure area (should already be authenticated)
    await authenticatedPage.goto('https://the-internet.herokuapp.com/secure');
    
    // Verify we're on the secure page
    await expect(authenticatedPage).toHaveURL(/.*\/secure$/);
    
    // Verify success message is displayed
    const successMessage = authenticatedPage.locator('.flash.success');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('You logged into a secure area!');
    
    // Verify secure area content
    await expect(authenticatedPage.locator('h2')).toHaveText('Secure Area');
    await expect(authenticatedPage.locator('.subheader')).toContainText('Welcome to the Secure Area');
  });

  test('should verify logout functionality from secure area', async ({ authenticatedPage }) => {
    // Navigate to secure area
    await authenticatedPage.goto('https://the-internet.herokuapp.com/secure');
    
    // Verify we're authenticated
    await expect(authenticatedPage.locator('h2')).toHaveText('Secure Area');
    
    // Logout
    await authenticatedPage.click('a[href="/logout"]');
    
    // Verify redirect to login page
    await expect(authenticatedPage).toHaveURL(/.*\/login$/);
    
    // Verify logout message
    const logoutMessage = authenticatedPage.locator('.flash.success');
    await expect(logoutMessage).toBeVisible();
    await expect(logoutMessage).toContainText('You logged out of the secure area!');
  });

  test('should maintain authentication state across navigation', async ({ authenticatedPage }) => {
    // Navigate to secure area
    await authenticatedPage.goto('https://the-internet.herokuapp.com/secure');
    await expect(authenticatedPage.locator('h2')).toHaveText('Secure Area');
    
    // Navigate to home page
    await authenticatedPage.goto('https://the-internet.herokuapp.com/');
    
    // Navigate back to secure area (should still be authenticated)
    await authenticatedPage.goto('https://the-internet.herokuapp.com/secure');
    
    // Verify we're still authenticated
    await expect(authenticatedPage).toHaveURL(/.*\/secure$/);
    await expect(authenticatedPage.locator('h2')).toHaveText('Secure Area');
  });

  test('should verify secure area elements are present', async ({ authenticatedPage }) => {
    // Navigate to secure area
    await authenticatedPage.goto('https://the-internet.herokuapp.com/secure');
    
    // Verify various elements on the page
    await expect(authenticatedPage.locator('h2')).toBeVisible();
    await expect(authenticatedPage.locator('.subheader')).toBeVisible();
    await expect(authenticatedPage.locator('a[href="/logout"]')).toBeVisible();
    await expect(authenticatedPage.locator('a[href="/logout"]')).toHaveText(/Logout/);
    
    // Verify footer
    await expect(authenticatedPage.locator('#page-footer')).toBeVisible();
    await expect(authenticatedPage.locator('#page-footer')).toContainText('Powered by');
  });
});
