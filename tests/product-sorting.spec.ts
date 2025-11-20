import { test, expect } from '@playwright/test';
import { ExpectedProductOrder, Credentials, SortOption } from '../types/interfaces';
import {
  signInAndNavigateToPage,
  setSortOption,
  readFirstProductName,
} from '../helpers/test-helpers';

/**
 * Test data for product sorting validation
 */
const testCases: ExpectedProductOrder[] = [
  {
    sortSetting: 'az',
    expectedFirst: 'Sauce Labs Backpack',
  },
  {
    sortSetting: 'za',
    expectedFirst: 'Test.allTheThings() T-Shirt (Red)',
  },
  {
    sortSetting: 'lohi',
    expectedFirst: 'Sauce Labs Onesie',
  },
  {
    sortSetting: 'hilo',
    expectedFirst: 'Sauce Labs Fleece Jacket',
  },
];

/**
 * Demo credentials for standard user
 */
const demoCredentials: Credentials = {
  username: 'standard_user',
  password: 'secret_sauce',
};

test.describe('Product Sorting Tests', () => {
  /**
   * Parameterized test for validating product sort order
   * Tests that the first product matches expected value after applying sort
   */
  for (const testCase of testCases) {
    test(`should display "${testCase.expectedFirst}" as first product when sorted by "${testCase.sortSetting}"`, async ({
      page,
    }) => {
      // Sign in to the application
      await signInAndNavigateToPage(page, demoCredentials);

      // Set the sort option
      await setSortOption(page, testCase.sortSetting as SortOption);

      // Read the first product name
      const actualFirstProduct = await readFirstProductName(page);

      // Assert that the first product matches the expected value
      expect(actualFirstProduct).toBe(testCase.expectedFirst);
    });
  }

  /**
   * Additional test to verify all products are properly typed
   */
  test('should retrieve all products with proper types', async ({ page }) => {
    const { InventoryPage } = await import('../pages/InventoryPage');

    await signInAndNavigateToPage(page, demoCredentials);

    const inventoryPage = new InventoryPage(page);
    const products = await inventoryPage.getAllProducts();

    // Verify we have products
    expect(products.length).toBeGreaterThan(0);

    // Verify each product has the required properties
    for (const product of products) {
      expect(product.name).toBeTruthy();
      expect(typeof product.name).toBe('string');
      expect(product.description).toBeTruthy();
      expect(typeof product.description).toBe('string');
      expect(product.image).toBeTruthy();
      expect(typeof product.image).toBe('string');
      expect(product.price).toBeDefined();
      expect(typeof product.price).toBe('number');
    }
  });
});
