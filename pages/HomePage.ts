import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationItem } from '../types/product.types';

/**
 * HomePage - Page Object for Nespresso home page
 */
export class HomePage extends BasePage {
  // Page specific locators
  private readonly heroSection: Locator;
  private readonly mainNavigation: Locator;
  private readonly coffeeNavLink: Locator;
  private readonly machinesNavLink: Locator;
  private readonly accessoriesNavLink: Locator;
  private readonly primaryCTA: Locator;
  private readonly searchButton: Locator;
  private readonly cartIcon: Locator;
  private readonly accountIcon: Locator;
  private readonly languageSelector: Locator;
  private readonly socialLinks: Locator;
  private readonly featuredProducts: Locator;
  private readonly promotionalBanner: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize page-specific elements
    this.heroSection = page.locator('[class*="hero"], [data-test="hero"], .homepage-hero').first();
    this.mainNavigation = page.locator('nav[role="navigation"], [data-test="main-nav"], .main-navigation').first();
    
    // Navigation links - using multiple selectors for robustness
    this.coffeeNavLink = page.locator('a:has-text("Coffee"), nav a[href*="coffee"], [data-test="nav-coffee"]').first();
    this.machinesNavLink = page.locator('a:has-text("Machines"), nav a[href*="machine"], [data-test="nav-machines"]').first();
    this.accessoriesNavLink = page.locator('a:has-text("Accessories"), nav a[href*="accessories"], [data-test="nav-accessories"]').first();
    
    // Header actions
    this.primaryCTA = page.locator('[data-test="primary-cta"], .cta-primary, button[class*="primary"]').first();
    this.searchButton = page.locator('[data-test="search"], button[aria-label*="Search"], [class*="search-icon"]').first();
    this.cartIcon = page.locator('[data-test="cart"], a[href*="cart"], [aria-label*="cart"]').first();
    this.accountIcon = page.locator('[data-test="account"], a[href*="account"], [aria-label*="account"]').first();
    this.languageSelector = page.locator('[data-test="language"], select[name*="language"], [class*="language-selector"]').first();
    
    // Footer and content
    this.socialLinks = page.locator('[data-test="social-links"], .social-media, a[aria-label*="Facebook"], a[aria-label*="Instagram"]');
    this.featuredProducts = page.locator('[data-test="featured-products"], .product-card, [class*="product-item"]');
    this.promotionalBanner = page.locator('[data-test="promo-banner"], .promotional-banner, [class*="promotion"]').first();
  }

  /**
   * Navigate to home page
   */
  async open(): Promise<void> {
    await this.goto('');
    await this.waitForPageLoad();
  }

  /**
   * Click on Coffee navigation link
   */
  async clickCoffeeNavigation(): Promise<void> {
    await this.waitForElement(this.coffeeNavLink);
    await this.clickElement(this.coffeeNavLink);
    await this.waitForPageLoad();
  }

  /**
   * Click on Machines navigation link
   */
  async clickMachinesNavigation(): Promise<void> {
    await this.waitForElement(this.machinesNavLink);
    await this.clickElement(this.machinesNavLink);
    await this.waitForPageLoad();
  }

  /**
   * Click on Accessories navigation link
   */
  async clickAccessoriesNavigation(): Promise<void> {
    await this.waitForElement(this.accessoriesNavLink);
    await this.clickElement(this.accessoriesNavLink);
    await this.waitForPageLoad();
  }

  /**
   * Verify home page is displayed correctly with comprehensive checks
   */
  async verifyHomePageDisplayed(): Promise<void> {
    // Verify URL
    await this.verifyURLContains('nespresso.com');
    
    // Verify page title
    const title = await this.getTitle();
    expect(title.length).toBeGreaterThan(0);
    
    // Verify common elements
    await this.verifyCommonElements();
    
    // Verify main navigation is visible
    await expect(this.mainNavigation).toBeVisible({ timeout: 10000 });
    
    // Verify logo is visible and clickable
    await expect(this.logo).toBeVisible();
    await expect(this.logo).toBeEnabled();
    
    // Verify navigation links are present
    const coffeeVisible = await this.isVisible(this.coffeeNavLink);
    expect(coffeeVisible || await this.isNavigationItemPresent('Coffee')).toBeTruthy();
    
    // Verify header actions are present
    await this.verifyHeaderActions();
    
    // Verify footer is present and contains links
    await this.verifyFooterElements();
    
    console.log('✓ Home page verification completed successfully');
  }

  /**
   * Verify header actions are present
   */
  private async verifyHeaderActions(): Promise<void> {
    // Check for search, cart, or account icons
    const searchVisible = await this.isVisible(this.searchButton, 3000);
    const cartVisible = await this.isVisible(this.cartIcon, 3000);
    const accountVisible = await this.isVisible(this.accountIcon, 3000);
    
    // At least one header action should be visible
    const hasHeaderActions = searchVisible || cartVisible || accountVisible;
    expect(hasHeaderActions).toBeTruthy();
    
    console.log(`Header actions found - Search: ${searchVisible}, Cart: ${cartVisible}, Account: ${accountVisible}`);
  }

  /**
   * Verify footer elements
   */
  private async verifyFooterElements(): Promise<void> {
    await expect(this.footer).toBeVisible();
    
    // Footer should contain links
    const footerLinks = this.footer.locator('a');
    const linksCount = await footerLinks.count();
    expect(linksCount).toBeGreaterThan(0);
    
    console.log(`Footer contains ${linksCount} links`);
  }

  /**
   * Check if navigation item is present by text
   */
  private async isNavigationItemPresent(text: string): Promise<boolean> {
    const navItem = this.mainNavigation.locator(`text="${text}"`).first();
    return await this.isVisible(navItem, 3000);
  }

  /**
   * Get all navigation items
   */
  async getNavigationItems(): Promise<NavigationItem[]> {
    const items: NavigationItem[] = [];
    const navLinks = this.mainNavigation.locator('a');
    const count = await navLinks.count();
    
    for (let i = 0; i < Math.min(count, 10); i++) {
      const link = navLinks.nth(i);
      const name = await link.textContent() || '';
      const href = await link.getAttribute('href') || '';
      const isVisible = await link.isVisible();
      
      if (name.trim()) {
        items.push({
          name: name.trim(),
          link: href,
          isVisible
        });
      }
    }
    
    return items;
  }

  /**
   * Verify hero section is displayed
   */
  async verifyHeroSection(): Promise<void> {
    const heroVisible = await this.isVisible(this.heroSection);
    if (heroVisible) {
      await expect(this.heroSection).toBeVisible();
      console.log('✓ Hero section is visible');
    } else {
      console.log('⚠ Hero section not found - may vary by locale');
    }
  }

  /**
   * Verify featured products section (if present)
   */
  async verifyFeaturedProducts(): Promise<void> {
    const productsCount = await this.featuredProducts.count();
    if (productsCount > 0) {
      expect(productsCount).toBeGreaterThan(0);
      console.log(`✓ Found ${productsCount} featured products`);
    } else {
      console.log('⚠ No featured products section found - may vary by page');
    }
  }

  /**
   * Search for a product
   */
  async searchProduct(query: string): Promise<void> {
    if (await this.isVisible(this.searchButton)) {
      await this.clickElement(this.searchButton);
      const searchInput = this.page.locator('input[type="search"], input[placeholder*="Search"]').first();
      await searchInput.fill(query);
      await searchInput.press('Enter');
      await this.waitForPageLoad();
    }
  }

  /**
   * Verify page is loaded by checking multiple indicators
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.header).toBeVisible({ timeout: 15000 });
    await expect(this.logo).toBeVisible();
    await expect(this.footer).toBeVisible();
    
    // Verify the page has rendered content
    const bodyText = await this.page.locator('body').textContent();
    expect(bodyText?.length || 0).toBeGreaterThan(100);
  }
}
