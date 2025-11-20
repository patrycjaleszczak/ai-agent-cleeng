import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private pageTitle: Locator;
  private cartItems: Locator;
  private checkoutButton: Locator;
  private continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const product = this.page.locator('.cart_item', { hasText: productName });
    return await product.isVisible();
  }

  async getProductNameInCart(index: number = 0): Promise<string> {
    const item = this.cartItems.nth(index);
    const nameElement = item.locator('.inventory_item_name');
    return await nameElement.textContent() || '';
  }

  async getProductPriceInCart(productName: string): Promise<string> {
    const product = this.page.locator('.cart_item', { hasText: productName });
    const price = product.locator('.inventory_item_price');
    return await price.textContent() || '';
  }

  async removeProductFromCart(productName: string) {
    const product = this.page.locator('.cart_item', { hasText: productName });
    const removeButton = product.locator('button', { hasText: 'Remove' });
    await removeButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
