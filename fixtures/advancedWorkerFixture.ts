import { test as base, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Advanced Worker Fixture with Storage State
 * This fixture creates an authentication state once per worker and reuses it across tests
 * This is more efficient than logging in for each test
 */

const authFile = path.join(__dirname, '../.auth/user.json');

type WorkerFixtures = {
  authenticatedContext: void;
};

type TestFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  /**
   * Worker-scoped fixture that runs once per worker
   * Creates and saves the authentication state to a file
   */
  authenticatedContext: [async ({ browser }, use) => {
    // Ensure .auth directory exists
    const authDir = path.dirname(authFile);
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    // Check if auth file already exists
    if (!fs.existsSync(authFile)) {
      // Create a new context to perform login
      const context = await browser.newContext();
      const page = await context.newPage();

      // Navigate to the login page
      await page.goto('https://the-internet.herokuapp.com/login');

      // Perform login with valid credentials
      await page.fill('#username', 'tomsmith');
      await page.fill('#password', 'SuperSecretPassword!');
      await page.click('button[type="submit"]');

      // Wait for successful login
      await page.waitForURL('**/secure');
      await page.waitForSelector('.flash.success');

      // Save the storage state to file
      await context.storageState({ path: authFile });

      // Close the context
      await context.close();

      console.log('✓ Authentication state saved to:', authFile);
    } else {
      console.log('✓ Using existing authentication state from:', authFile);
    }

    // Provide the fixture to tests
    await use();
  }, { scope: 'worker' }],

  /**
   * Test-scoped fixture that provides an authenticated page
   * Uses the storage state created by the worker fixture
   */
  authenticatedPage: async ({ browser, authenticatedContext }, use) => {
    // Create a new context with the saved storage state
    const context = await browser.newContext({
      storageState: authFile,
    });

    const page = await context.newPage();

    // Provide the page to the test
    await use(page);

    // Cleanup
    await context.close();
  },
});

export { expect } from '@playwright/test';
