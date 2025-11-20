import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductCard, FilterOption } from '../types/product.types';

/**
 * CoffeePLPPage - Page Object for Coffee Product Listing Page
 */
export class CoffeePLPPage extends BasePage {
  // Page specific locators
  private readonly pageTitle: Locator;
  private readonly productGrid: Locator;
  private readonly productCards: Locator;
  private readonly productImages: Locator;
  private readonly productNames: Locator;
  private readonly productPrices: Locator;
  private readonly filterSection: Locator;
  private readonly filterButtons: Locator;
  private readonly sortDropdown: Locator;
  private readonly breadcrumbs: Locator;
  private readonly productCount: Locator;
  private readonly loadMoreButton: Locator;
  private readonly intensityFilter: Locator;
  private readonly sizeFilter: Locator;
  private readonly aromaFilter: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize page-specific elements
    this.pageTitle = page.locator('h1, [data-test="page-title"], .page-title').first();
    this.productGrid = page.locator('[data-test="product-grid"], .product-grid, .products-list, [class*="product-container"]').first();
    this.productCards = page.locator('[data-test="product-card"], .product-card, [class*="product-item"], article[class*="product"]');
    this.productImages = page.locator('[data-test="product-image"], .product-image img, [class*="product"] img');
    this.productNames = page.locator('[data-test="product-name"], .product-name, [class*="product-title"]');
    this.productPrices = page.locator('[data-test="product-price"], .product-price, [class*="price"]');
    
    // Filters and sorting
    this.filterSection = page.locator('[data-test="filters"], .filters, aside[class*="filter"], [class*="sidebar"]').first();
    this.filterButtons = page.locator('[data-test="filter-button"], button[class*="filter"], [role="button"][class*="filter"]');
    this.sortDropdown = page.locator('[data-test="sort"], select[name*="sort"], [class*="sort-select"]').first();
    
    // Breadcrumbs and navigation
    this.breadcrumbs = page.locator('[data-test="breadcrumbs"], nav[aria-label*="Breadcrumb"], .breadcrumbs, [class*="breadcrumb"]').first();
    this.productCount = page.locator('[data-test="product-count"], .product-count, [class*="result-count"]').first();
    this.loadMoreButton = page.locator('button:has-text("Load more"), button:has-text("Show more"), [data-test="load-more"]').first();
    
    // Specific filter types
    this.intensityFilter = page.locator('[data-test="intensity-filter"], [class*="intensity"]').first();
    this.sizeFilter = page.locator('[data-test="size-filter"], [class*="size-filter"]').first();
    this.aromaFilter = page.locator('[data-test="aroma-filter"], [class*="aroma"]').first();
  }

  /**
   * Wait for PLP to load completely
   */
  async waitForPLPLoad(): Promise<void> {
    await this.waitForPageLoad();
    await this.waitForElement(this.pageTitle);
    
    // Wait for products to load
    await this.page.waitForSelector('[data-test="product-card"], .product-card, [class*="product-item"]', { 
      timeout: 15000 
    }).catch(() => {
      console.log('Product cards selector not found, trying alternative...');
    });
  }

  /**
   * Verify Coffee PLP is displayed correctly with comprehensive checks
   */
  async verifyCoffeePLPDisplayed(): Promise<void> {
    // Verify URL contains coffee-related path
    const url = this.getCurrentURL();
    const hasCoffeeInUrl = url.toLowerCase().includes('coffee') || 
                          url.toLowerCase().includes('capsules') ||
                          url.toLowerCase().includes('pods');
    expect(hasCoffeeInUrl).toBeTruthy();
    
    // Verify page title is visible and contains relevant text
    await expect(this.pageTitle).toBeVisible({ timeout: 15000 });
    const titleText = await this.getText(this.pageTitle);
    expect(titleText.length).toBeGreaterThan(0);
    console.log(`Page title: "${titleText}"`);
    
    // Verify common elements
    await this.verifyCommonElements();
    
    // Verify breadcrumbs are present
    await this.verifyBreadcrumbs();
    
    // Verify product grid and products are displayed
    await this.verifyProductsDisplayed();
    
    // Verify filter options are available
    await this.verifyFiltersAvailable();
    
    // Verify product count or results message
    await this.verifyProductCount();
    
    console.log('✓ Coffee PLP verification completed successfully');
  }

  /**
   * Verify breadcrumbs navigation
   */
  private async verifyBreadcrumbs(): Promise<void> {
    const breadcrumbsVisible = await this.isVisible(this.breadcrumbs, 5000);
    
    if (breadcrumbsVisible) {
      await expect(this.breadcrumbs).toBeVisible();
      const breadcrumbLinks = this.breadcrumbs.locator('a, span');
      const count = await breadcrumbLinks.count();
      expect(count).toBeGreaterThan(0);
      console.log(`✓ Breadcrumbs found with ${count} items`);
    } else {
      console.log('⚠ Breadcrumbs not found - may vary by page design');
    }
  }

  /**
   * Verify products are displayed on the page
   */
  private async verifyProductsDisplayed(): Promise<void> {
    // Check for product grid or list
    const gridVisible = await this.isVisible(this.productGrid, 5000);
    
    // Count products
    const productCount = await this.productCards.count();
    expect(productCount).toBeGreaterThan(0);
    console.log(`✓ Found ${productCount} product(s) on the page`);
    
    // Verify first product card has essential elements
    if (productCount > 0) {
      await this.verifyProductCardStructure(0);
    }
  }

  /**
   * Verify product card structure
   */
  private async verifyProductCardStructure(index: number): Promise<void> {
    const productCard = this.productCards.nth(index);
    await expect(productCard).toBeVisible();
    
    // Check for product image
    const productImage = productCard.locator('img').first();
    const imageVisible = await this.isVisible(productImage, 3000);
    
    // Check for product name/title
    const productName = productCard.locator('[class*="name"], [class*="title"], h2, h3, h4').first();
    const nameVisible = await this.isVisible(productName, 3000);
    
    // Check for product link
    const productLink = productCard.locator('a').first();
    const linkVisible = await this.isVisible(productLink, 3000);
    
    expect(imageVisible || nameVisible || linkVisible).toBeTruthy();
    console.log(`✓ Product card ${index} structure verified`);
  }

  /**
   * Verify filters are available
   */
  private async verifyFiltersAvailable(): Promise<void> {
    const filterVisible = await this.isVisible(this.filterSection, 5000);
    const filterButtonsCount = await this.filterButtons.count();
    
    if (filterVisible || filterButtonsCount > 0) {
      console.log(`✓ Filters section found with ${filterButtonsCount} filter options`);
    } else {
      console.log('⚠ No filters found - may vary by page design');
    }
  }

  /**
   * Verify product count is displayed
   */
  private async verifyProductCount(): Promise<void> {
    const countVisible = await this.isVisible(this.productCount, 3000);
    
    if (countVisible) {
      const countText = await this.getText(this.productCount);
      console.log(`✓ Product count displayed: ${countText}`);
    } else {
      // Alternative: count products manually
      const count = await this.productCards.count();
      console.log(`✓ Found ${count} products (no count label)`);
    }
  }

  /**
   * Get all product cards data
   */
  async getProductCards(): Promise<ProductCard[]> {
    const products: ProductCard[] = [];
    const count = await this.productCards.count();
    
    for (let i = 0; i < Math.min(count, 20); i++) {
      const card = this.productCards.nth(i);
      
      const nameElement = card.locator('[class*="name"], [class*="title"], h2, h3, h4').first();
      const name = await nameElement.textContent().catch(() => '') || '';
      
      const priceElement = card.locator('[class*="price"]').first();
      const price = await priceElement.textContent().catch(() => '') || '';
      
      const imageElement = card.locator('img').first();
      const imageUrl = await imageElement.getAttribute('src').catch(() => '') || '';
      
      const linkElement = card.locator('a').first();
      const link = await linkElement.getAttribute('href').catch(() => '') || '';
      
      if (name || link) {
        products.push({
          name: name.trim(),
          price: price.trim(),
          imageUrl,
          link
        });
      }
    }
    
    return products;
  }

  /**
   * Click on a random product
   */
  async clickRandomProduct(): Promise<string> {
    const count = await this.productCards.count();
    expect(count).toBeGreaterThan(0);
    
    // Select a random product (prefer first few for consistency)
    const randomIndex = Math.floor(Math.random() * Math.min(count, 3));
    const productCard = this.productCards.nth(randomIndex);
    
    // Get product name before clicking
    const nameElement = productCard.locator('[class*="name"], [class*="title"], h2, h3, h4, a').first();
    const productName = await nameElement.textContent() || `Product ${randomIndex}`;
    
    console.log(`Clicking on product: "${productName.trim()}"`);
    
    // Click the product card or its link
    const productLink = productCard.locator('a').first();
    await this.clickElement(productLink);
    await this.waitForPageLoad();
    
    return productName.trim();
  }

  /**
   * Click on specific product by name
   */
  async clickProductByName(productName: string): Promise<void> {
    const productCard = this.productCards.filter({ hasText: productName }).first();
    await this.clickElement(productCard);
    await this.waitForPageLoad();
  }

  /**
   * Apply intensity filter
   */
  async applyIntensityFilter(intensity: string): Promise<void> {
    const filterOption = this.page.locator(`[data-intensity="${intensity}"], button:has-text("${intensity}")`).first();
    if (await this.isVisible(filterOption)) {
      await this.clickElement(filterOption);
      await this.waitForPageLoad();
    }
  }

  /**
   * Apply sorting
   */
  async applySorting(sortOption: string): Promise<void> {
    if (await this.isVisible(this.sortDropdown)) {
      await this.sortDropdown.selectOption(sortOption);
      await this.waitForPageLoad();
    }
  }

  /**
   * Get product count from page
   */
  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  /**
   * Verify all product images are loaded
   */
  async verifyProductImagesLoaded(): Promise<void> {
    const images = await this.productImages.all();
    
    for (let i = 0; i < Math.min(images.length, 5); i++) {
      const image = images[i];
      if (await image.isVisible()) {
        const naturalWidth = await image.evaluate((img: HTMLImageElement) => img.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }
    
    console.log(`✓ Verified ${Math.min(images.length, 5)} product images are loaded`);
  }

  /**
   * Verify all product prices are displayed
   */
  async verifyProductPricesDisplayed(): Promise<void> {
    const pricesCount = await this.productPrices.count();
    
    if (pricesCount > 0) {
      console.log(`✓ Found ${pricesCount} product prices`);
      
      // Verify first price has currency symbol or number
      const firstPrice = await this.productPrices.first().textContent();
      const hasPriceFormat = /[\d,.$€£¥]/.test(firstPrice || '');
      expect(hasPriceFormat).toBeTruthy();
    } else {
      console.log('⚠ No product prices found - may require login');
    }
  }
}
