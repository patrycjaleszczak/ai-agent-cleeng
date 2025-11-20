import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { Credentials, SortOption } from '../types/interfaces';

/**
 * Sign in to the application and navigate to the inventory page
 * @param page - Playwright page object
 * @param credentials - User credentials
 */
export async function signInAndNavigateToPage(
  page: Page,
  credentials: Credentials
): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(credentials);
  
  // Wait for navigation to inventory page
  await page.waitForURL('**/inventory.html');
}

/**
 * Set the sort option on the inventory page
 * @param page - Playwright page object
 * @param sortOption - The sort option to set
 */
export async function setSortOption(
  page: Page,
  sortOption: SortOption
): Promise<void> {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.setSortOption(sortOption);
}

/**
 * Read the first product name from the inventory page
 * @param page - Playwright page object
 * @returns The name of the first product
 */
export async function readFirstProductName(page: Page): Promise<string> {
  const inventoryPage = new InventoryPage(page);
  return await inventoryPage.readFirstProductName();
}
