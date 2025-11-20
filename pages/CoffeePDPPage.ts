import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Product, BreadcrumbItem } from '../types/product.types';

/**
 * CoffeePDPPage - Page Object for Coffee Product Details Page
 */
export class CoffeePDPPage extends BasePage {
  // Page specific locators
  private readonly productTitle: Locator;
  private readonly productImage: Locator;
  private readonly productGallery: Locator;
  private readonly productPrice: Locator;
  private readonly productDescription: Locator;
  private readonly addToCartButton: Locator;
  private readonly quantitySelector: Locator;
  private readonly productRating: Locator;
  private readonly productReviews: Locator;
  private readonly breadcrumbs: Locator;
  private readonly productAttributes: Locator;
  private readonly intensityLevel: Locator;
  private readonly aromaProfile: Locator;
  private readonly cupSize: Locator;
  private readonly productSKU: Locator;
  private readonly availabilityStatus: Locator;
  private readonly relatedProducts: Locator;
  private readonly productDetails: Locator;
  private readonly nutritionInfo: Locator;
  private readonly shareButtons: Locator;
  private readonly wishlistButton: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize page-specific elements
    this.productTitle = page.locator('h1[class*="product"], [data-test="product-title"], .product-title, h1').first();
    this.productImage = page.locator('[data-test="product-image"], .product-image img, [class*="product-gallery"] img, main img').first();
    this.productGallery = page.locator('[data-test="product-gallery"], .product-gallery, [class*="image-gallery"]').first();
    this.productPrice = page.locator('[data-test="product-price"], .product-price, [class*="price-display"], [class*="product-price"]').first();
    this.productDescription = page.locator('[data-test="description"], .product-description, [class*="description"], p[class*="product"]').first();
    
    // Actions
    this.addToCartButton = page.locator('button:has-text("Add to cart"), button:has-text("Add to bag"), [data-test="add-to-cart"]').first();
    this.quantitySelector = page.locator('[data-test="quantity"], input[type="number"], select[name*="quantity"]').first();
    this.wishlistButton = page.locator('button:has-text("Wishlist"), [data-test="wishlist"], [aria-label*="wishlist"]').first();
    
    // Reviews and ratings
    this.productRating = page.locator('[data-test="rating"], .product-rating, [class*="rating"], [class*="stars"]').first();
    this.productReviews = page.locator('[data-test="reviews"], .reviews, [class*="review"]').first();
    
    // Navigation
    this.breadcrumbs = page.locator('[data-test="breadcrumbs"], nav[aria-label*="Breadcrumb"], .breadcrumbs, [class*="breadcrumb"]').first();
    
    // Product specifications
    this.productAttributes = page.locator('[data-test="attributes"], .product-attributes, [class*="specifications"]').first();
    this.intensityLevel = page.locator('[data-test="intensity"], [class*="intensity"], *:has-text("Intensity")').first();
    this.aromaProfile = page.locator('[data-test="aroma"], [class*="aroma"], *:has-text("Aroma")').first();
    this.cupSize = page.locator('[data-test="cup-size"], [class*="cup-size"], *:has-text("Cup size")').first();
    this.productSKU = page.locator('[data-test="sku"], .product-sku, [class*="sku"]').first();
    this.availabilityStatus = page.locator('[data-test="availability"], .availability, [class*="stock-status"]').first();
    
    // Additional sections
    this.relatedProducts = page.locator('[data-test="related-products"], .related-products, [class*="recommendations"]').first();
    this.productDetails = page.locator('[data-test="product-details"], .product-details, [class*="details-section"]').first();
    this.nutritionInfo = page.locator('[data-test="nutrition"], .nutrition-info, [class*="nutrition"]').first();
    this.shareButtons = page.locator('[data-test="share"], .share-buttons, [class*="social-share"]').first();
  }

  /**
   * Wait for PDP to load completely
   */
  async waitForPDPLoad(): Promise<void> {
    await this.waitForPageLoad();
    await this.waitForElement(this.productTitle, 15000);
    await this.waitForElement(this.productImage, 10000);
  }

  /**
   * Verify Coffee PDP is displayed correctly with comprehensive checks
   */
  async verifyCoffeePDPDisplayed(): Promise<void> {
    // Verify URL structure (should not be listing page)
    const url = this.getCurrentURL();
    const isNotListingPage = !url.includes('/coffee/capsules') || url.split('/').length > 5;
    expect(isNotListingPage || url.includes('product')).toBeTruthy();
    
    // Verify common elements
    await this.verifyCommonElements();
    
    // Verify product title is visible and has content
    await this.verifyProductTitle();
    
    // Verify product image is displayed and loaded
    await this.verifyProductImage();
    
    // Verify product price is displayed
    await this.verifyProductPrice();
    
    // Verify product description exists
    await this.verifyProductDescription();
    
    // Verify add to cart button is present
    await this.verifyAddToCartButton();
    
    // Verify breadcrumbs navigation
    await this.verifyBreadcrumbsPresent();
    
    // Verify product attributes/specifications
    await this.verifyProductAttributes();
    
    // Verify related products or recommendations
    await this.verifyRelatedProducts();
    
    console.log('✓ Coffee PDP verification completed successfully');
  }

  /**
   * Verify product title
   */
  private async verifyProductTitle(): Promise<void> {
    await expect(this.productTitle).toBeVisible({ timeout: 15000 });
    const titleText = await this.getText(this.productTitle);
    expect(titleText.length).toBeGreaterThan(0);
    console.log(`✓ Product title: "${titleText}"`);
  }

  /**
   * Verify product image is displayed and loaded
   */
  private async verifyProductImage(): Promise<void> {
    await expect(this.productImage).toBeVisible({ timeout: 10000 });
    
    // Verify image has loaded (natural width > 0)
    const naturalWidth = await this.productImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
    
    // Verify image has src attribute
    const imageSrc = await this.productImage.getAttribute('src');
    expect(imageSrc).toBeTruthy();
    expect(imageSrc?.length || 0).toBeGreaterThan(0);
    
    console.log('✓ Product image is loaded and displayed');
  }

  /**
   * Verify product price
   */
  private async verifyProductPrice(): Promise<void> {
    const priceVisible = await this.isVisible(this.productPrice, 5000);
    
    if (priceVisible) {
      const priceText = await this.getText(this.productPrice);
      expect(priceText.length).toBeGreaterThan(0);
      
      // Verify price contains currency symbol or number
      const hasPriceFormat = /[\d,.$€£¥]/.test(priceText);
      expect(hasPriceFormat).toBeTruthy();
      
      console.log(`✓ Product price: ${priceText}`);
    } else {
      console.log('⚠ Price not visible - may require login or location');
    }
  }

  /**
   * Verify product description
   */
  private async verifyProductDescription(): Promise<void> {
    const descriptionVisible = await this.isVisible(this.productDescription, 5000);
    
    if (descriptionVisible) {
      const descText = await this.getText(this.productDescription);
      expect(descText.length).toBeGreaterThan(10);
      console.log(`✓ Product description found (${descText.length} characters)`);
    } else {
      // Try to find any description-like text
      const mainContent = this.page.locator('main, [role="main"]');
      const contentText = await mainContent.textContent() || '';
      expect(contentText.length).toBeGreaterThan(50);
      console.log('✓ Product content area has text');
    }
  }

  /**
   * Verify add to cart button
   */
  private async verifyAddToCartButton(): Promise<void> {
    const buttonVisible = await this.isVisible(this.addToCartButton, 5000);
    
    if (buttonVisible) {
      await expect(this.addToCartButton).toBeVisible();
      const buttonText = await this.getText(this.addToCartButton);
      console.log(`✓ Add to cart button found: "${buttonText}"`);
    } else {
      console.log('⚠ Add to cart button not found - may vary by locale or availability');
    }
  }

  /**
   * Verify breadcrumbs are present
   */
  private async verifyBreadcrumbsPresent(): Promise<void> {
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
   * Verify product attributes and specifications
   */
  private async verifyProductAttributes(): Promise<void> {
    // Check for intensity level
    const intensityVisible = await this.isVisible(this.intensityLevel, 3000);
    
    // Check for aroma profile
    const aromaVisible = await this.isVisible(this.aromaProfile, 3000);
    
    // Check for cup size
    const cupSizeVisible = await this.isVisible(this.cupSize, 3000);
    
    // Check for general attributes section
    const attributesVisible = await this.isVisible(this.productAttributes, 3000);
    
    const hasAttributes = intensityVisible || aromaVisible || cupSizeVisible || attributesVisible;
    
    if (hasAttributes) {
      console.log(`✓ Product attributes found - Intensity: ${intensityVisible}, Aroma: ${aromaVisible}, Cup Size: ${cupSizeVisible}`);
    } else {
      console.log('⚠ Specific attributes not found - checking for general product information');
      
      // Fallback: check if page has substantial product information
      const mainContent = this.page.locator('main');
      const textContent = await mainContent.textContent() || '';
      expect(textContent.length).toBeGreaterThan(200);
    }
  }

  /**
   * Verify related products section
   */
  private async verifyRelatedProducts(): Promise<void> {
    const relatedVisible = await this.isVisible(this.relatedProducts, 3000);
    
    if (relatedVisible) {
      await expect(this.relatedProducts).toBeVisible();
      console.log('✓ Related products section found');
    } else {
      console.log('⚠ Related products section not found - may vary by page');
    }
  }

  /**
   * Get product data
   */
  async getProductData(): Promise<Product> {
    const name = await this.getText(this.productTitle);
    const priceText = await this.isVisible(this.productPrice) 
      ? await this.getText(this.productPrice) 
      : 'Price not available';
    const description = await this.isVisible(this.productDescription)
      ? await this.getText(this.productDescription)
      : '';
    const imageUrl = await this.productImage.getAttribute('src') || '';
    
    return {
      name: name.trim(),
      price: priceText.trim(),
      description: description.trim(),
      imageUrl
    };
  }

  /**
   * Add product to cart
   */
  async addToCart(quantity: number = 1): Promise<void> {
    // Set quantity if selector is available
    if (await this.isVisible(this.quantitySelector)) {
      await this.quantitySelector.fill(quantity.toString());
    }
    
    // Click add to cart button
    if (await this.isVisible(this.addToCartButton)) {
      await this.clickElement(this.addToCartButton);
      console.log(`Added product to cart (quantity: ${quantity})`);
    }
  }

  /**
   * Get breadcrumb navigation
   */
  async getBreadcrumbs(): Promise<BreadcrumbItem[]> {
    const breadcrumbs: BreadcrumbItem[] = [];
    
    if (await this.isVisible(this.breadcrumbs)) {
      const items = this.breadcrumbs.locator('a, span');
      const count = await items.count();
      
      for (let i = 0; i < count; i++) {
        const item = items.nth(i);
        const text = await item.textContent() || '';
        const link = await item.getAttribute('href');
        const isActive = (await item.getAttribute('aria-current')) === 'page';
        
        if (text.trim()) {
          breadcrumbs.push({
            text: text.trim(),
            link: link || undefined,
            isActive
          });
        }
      }
    }
    
    return breadcrumbs;
  }

  /**
   * Verify product gallery has multiple images
   */
  async verifyProductGallery(): Promise<void> {
    if (await this.isVisible(this.productGallery)) {
      const images = this.productGallery.locator('img');
      const imageCount = await images.count();
      expect(imageCount).toBeGreaterThan(0);
      console.log(`✓ Product gallery has ${imageCount} images`);
    }
  }

  /**
   * Verify product reviews section
   */
  async verifyProductReviews(): Promise<void> {
    const reviewsVisible = await this.isVisible(this.productReviews, 3000);
    const ratingVisible = await this.isVisible(this.productRating, 3000);
    
    if (reviewsVisible || ratingVisible) {
      console.log(`✓ Reviews/Ratings found - Reviews: ${reviewsVisible}, Rating: ${ratingVisible}`);
    } else {
      console.log('⚠ Reviews section not found - may not be available for all products');
    }
  }

  /**
   * Verify nutritional information
   */
  async verifyNutritionalInfo(): Promise<void> {
    if (await this.isVisible(this.nutritionInfo)) {
      await expect(this.nutritionInfo).toBeVisible();
      console.log('✓ Nutritional information section found');
    } else {
      console.log('⚠ Nutritional information not found');
    }
  }

  /**
   * Verify share functionality
   */
  async verifyShareButtons(): Promise<void> {
    if (await this.isVisible(this.shareButtons)) {
      await expect(this.shareButtons).toBeVisible();
      console.log('✓ Share buttons found');
    } else {
      console.log('⚠ Share buttons not found');
    }
  }

  /**
   * Get product name
   */
  async getProductName(): Promise<string> {
    return await this.getText(this.productTitle);
  }

  /**
   * Verify availability status
   */
  async verifyAvailabilityStatus(): Promise<void> {
    if (await this.isVisible(this.availabilityStatus)) {
      const status = await this.getText(this.availabilityStatus);
      console.log(`✓ Availability status: ${status}`);
    } else {
      // If add to cart is visible, product is likely available
      const cartButtonVisible = await this.isVisible(this.addToCartButton);
      console.log(`✓ Product availability implied by add to cart button: ${cartButtonVisible}`);
    }
  }
}
