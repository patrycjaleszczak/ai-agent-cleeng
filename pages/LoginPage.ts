import { Page, Locator } from '@playwright/test';
import { Credentials } from '../types/interfaces';

/**
 * Page Object Model for the SauceDemo Login Page
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigate to the login page
   */
  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Perform login with provided credentials
   * @param credentials - User credentials
   */
  async login(credentials: Credentials): Promise<void> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }

  /**
   * Get error message text if displayed
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }
}
