import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  private pageTitle: Locator;
  private inventoryItems: Locator;
  private cartBadge: Locator;
  private cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async addProductToCart(productName: string) {
    const product = this.page.locator('.inventory_item', { hasText: productName });
    const addButton = product.locator('button', { hasText: 'Add to cart' });
    await addButton.click();
  }

  async getCartItemCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    const count = await this.cartBadge.textContent();
    return parseInt(count || '0', 10);
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async isProductDisplayed(productName: string): Promise<boolean> {
    const product = this.page.locator('.inventory_item', { hasText: productName });
    return await product.isVisible();
  }

  async getProductPrice(productName: string): Promise<string> {
    const product = this.page.locator('.inventory_item', { hasText: productName });
    const price = product.locator('.inventory_item_price');
    return await price.textContent() || '';
  }
}
