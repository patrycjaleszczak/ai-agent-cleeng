import { Page, Locator, expect } from '@playwright/test';
import { PageConfig, CommonElements } from '../types/page.types';

/**
 * BasePage - Contains common functionality shared across all page objects
 */
export class BasePage {
  readonly page: Page;
  readonly baseURL: string;

  // Common elements present on all pages
  protected readonly header: Locator;
  protected readonly footer: Locator;
  protected readonly navigation: Locator;
  protected readonly logo: Locator;
  protected readonly cookieBanner: Locator;
  protected readonly cookieAcceptButton: Locator;

  constructor(page: Page, baseURL: string = 'https://www.nespresso.com/') {
    this.page = page;
    this.baseURL = baseURL;

    // Initialize common elements
    this.header = page.locator('header, [data-test="header"], .header');
    this.footer = page.locator('footer, [data-test="footer"], .footer');
    this.navigation = page.locator('nav, [role="navigation"], .navigation');
    this.logo = page.locator('[data-test="logo"], .logo, a[href="/"]').first();
    this.cookieBanner = page.locator('#onetrust-banner-sdk, [id*="cookie"], [class*="cookie-banner"]');
    this.cookieAcceptButton = page.locator('#onetrust-accept-btn-handler, [id*="accept"], button:has-text("Accept")');
  }

  /**
   * Navigate to a specific URL
   */
  async goto(path: string = ''): Promise<void> {
    const url = path.startsWith('http') ? path : `${this.baseURL}${path}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.handleCookieConsent();
  }

  /**
   * Handle cookie consent banner if present
   */
  async handleCookieConsent(): Promise<void> {
    try {
      if (await this.cookieBanner.isVisible({ timeout: 5000 })) {
        await this.cookieAcceptButton.click({ timeout: 3000 });
        await this.cookieBanner.waitFor({ state: 'hidden', timeout: 5000 });
      }
    } catch (error) {
      // Cookie banner not present or already handled
      console.log('Cookie consent banner not found or already handled');
    }
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      console.log('Network idle timeout - continuing anyway');
    });
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  getCurrentURL(): string {
    return this.page.url();
  }

  /**
   * Verify common page elements are visible
   */
  async verifyCommonElements(): Promise<void> {
    await expect(this.header).toBeVisible({ timeout: 10000 });
    await expect(this.footer).toBeVisible({ timeout: 10000 });
  }

  /**
   * Take a screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Scroll to element
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Get element text
   */
  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait and click element
   */
  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.click();
  }

  /**
   * Verify URL contains specific text
   */
  async verifyURLContains(text: string): Promise<void> {
    expect(this.getCurrentURL()).toContain(text);
  }

  /**
   * Verify page title contains specific text
   */
  async verifyTitleContains(text: string): Promise<void> {
    const title = await this.getTitle();
    expect(title).toContain(text);
  }
}
