import { Page, Locator } from '@playwright/test';
import { Product, SortOption } from '../types/interfaces';

/**
 * Page Object Model for the SauceDemo Inventory Page
 */
export class InventoryPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemDescription: Locator;
  readonly inventoryItemImage: Locator;
  readonly inventoryItemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.inventoryItemName = page.locator('.inventory_item_name');
    this.inventoryItemDescription = page.locator('.inventory_item_desc');
    this.inventoryItemImage = page.locator('.inventory_item_img img');
    this.inventoryItemPrice = page.locator('.inventory_item_price');
  }

  /**
   * Set the sort option in the dropdown
   * @param sortOption - The sort option to select ('az', 'za', 'lohi', 'hilo')
   */
  async setSortOption(sortOption: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(sortOption);
    // Wait for the inventory to re-render after sorting
    await this.page.waitForTimeout(500);
  }

  /**
   * Read the name of the first product in the list
   * @returns The name of the first product
   */
  async readFirstProductName(): Promise<string> {
    const firstName = await this.inventoryItemName.first().textContent();
    return firstName || '';
  }

  /**
   * Get all products from the inventory page
   * @returns Array of Product objects
   */
  async getAllProducts(): Promise<Product[]> {
    const products: Product[] = [];
    const count = await this.inventoryItems.count();

    for (let i = 0; i < count; i++) {
      const item = this.inventoryItems.nth(i);
      const name = await item.locator('.inventory_item_name').textContent() || '';
      const description = await item.locator('.inventory_item_desc').textContent() || '';
      const image = await item.locator('.inventory_item_img img').getAttribute('src') || '';
      const priceText = await item.locator('.inventory_item_price').textContent() || '';
      const price = parseFloat(priceText.replace('$', ''));

      products.push({
        name,
        description,
        image,
        price,
      });
    }

    return products;
  }

  /**
   * Verify the inventory page is loaded
   */
  async isLoaded(): Promise<boolean> {
    return await this.sortDropdown.isVisible();
  }
}
