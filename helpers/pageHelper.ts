import { Page } from '@playwright/test';
import { LoginPage, ProductsPage, CartPage } from '../pages';

export class PageHelper {
  static getLoginPage(page: Page): LoginPage {
    return new LoginPage(page);
  }

  static getProductsPage(page: Page): ProductsPage {
    return new ProductsPage(page);
  }

  static getCartPage(page: Page): CartPage {
    return new CartPage(page);
  }
}

export async function loginAsStandardUser(page: Page) {
  const loginPage = PageHelper.getLoginPage(page);
  await page.goto('/');
  await loginPage.login('standard_user', 'secret_sauce');
}
