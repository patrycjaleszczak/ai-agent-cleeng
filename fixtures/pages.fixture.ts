import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CoffeePLPPage } from '../pages/CoffeePLPPage';
import { CoffeePDPPage } from '../pages/CoffeePDPPage';

/**
 * Type definition for page fixtures
 */
type PageFixtures = {
  homePage: HomePage;
  coffeePLPPage: CoffeePLPPage;
  coffeePDPPage: CoffeePDPPage;
};

/**
 * Extended test with page object fixtures
 * This allows us to use page objects directly in tests like: test('...', async ({ homePage }) => {})
 */
export const test = base.extend<PageFixtures>({
  /**
   * HomePage fixture
   * Automatically creates a new HomePage instance for each test
   */
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  /**
   * CoffeePLPPage fixture
   * Automatically creates a new CoffeePLPPage instance for each test
   */
  coffeePLPPage: async ({ page }, use) => {
    const coffeePLPPage = new CoffeePLPPage(page);
    await use(coffeePLPPage);
  },

  /**
   * CoffeePDPPage fixture
   * Automatically creates a new CoffeePDPPage instance for each test
   */
  coffeePDPPage: async ({ page }, use) => {
    const coffeePDPPage = new CoffeePDPPage(page);
    await use(coffeePDPPage);
  },
});

/**
 * Export expect from Playwright
 */
export { expect } from '@playwright/test';
