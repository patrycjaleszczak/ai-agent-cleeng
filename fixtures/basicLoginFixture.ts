import { test as base, Page } from '@playwright/test';

/**
 * Basic Login Fixture for SauceDemo
 * This fixture provides a simple login functionality that can be used in tests
 */

type LoginFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<LoginFixtures>({
  /**
   * Fixture that automatically logs in before each test
   * Uses standard_user credentials for SauceDemo
   */
  authenticatedPage: async ({ page }, use) => {
    // Navigate to SauceDemo login page
    await page.goto('https://www.saucedemo.com/');
    
    // Perform login
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    
    // Wait for successful login (inventory page loads)
    await page.waitForURL('**/inventory.html');
    
    // Provide the authenticated page to the test
    await use(page);
    
    // Cleanup: logout after test
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
  },
});

export { expect } from '@playwright/test';
