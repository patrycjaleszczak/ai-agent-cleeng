import { test, expect } from '../fixtures/pages.fixture';

/**
 * Test Suite: Browse coffee products on Nespresso NC2
 * 
 * Feature: Browse coffee products on Nespresso NC2
 * 
 * Background: I am an anonymous user
 * 
 * This test suite covers the coffee browsing journey:
 * 1. Home page display
 * 2. Coffee product listing page (PLP)
 * 3. Coffee product details page (PDP)
 */

test.describe('Browse coffee products on Nespresso NC2', () => {
  
  test.describe.configure({ mode: 'serial' });

  /**
   * Scenario: Home page is displayed correctly
   * 
   * Enhanced expectations:
   * - URL contains nespresso.com
   * - Page title exists and is not empty
   * - Header is visible with logo
   * - Main navigation is present
   * - Footer is visible with links
   * - Coffee navigation link is present
   * - Header actions (search, cart, account) are available
   */
  test('Home page is displayed correctly', async ({ homePage }) => {
    // Given I am an anonymous user
    // When I open the Nespresso NC2 website
    await test.step('Open Nespresso homepage', async () => {
      await homePage.open();
    });

    // Then the home page is displayed correctly
    await test.step('Verify home page is displayed correctly', async () => {
      await homePage.verifyHomePageDisplayed();
    });

    // Additional comprehensive checks
    await test.step('Verify hero section', async () => {
      await homePage.verifyHeroSection();
    });

    await test.step('Verify featured products section', async () => {
      await homePage.verifyFeaturedProducts();
    });

    await test.step('Verify navigation items', async () => {
      const navItems = await homePage.getNavigationItems();
      expect(navItems.length).toBeGreaterThan(0);
      console.log(`Navigation items found: ${navItems.length}`);
    });

    await test.step('Verify page is fully loaded', async () => {
      await homePage.verifyPageLoaded();
    });
  });

  /**
   * Scenario: Coffee PLP (listing) is displayed correctly
   * 
   * Enhanced expectations:
   * - URL contains coffee/capsules/pods
   * - Page title is visible and relevant
   * - Breadcrumbs navigation is present
   * - Product grid is displayed
   * - Multiple products are visible (count > 0)
   * - Each product has: image, name, link
   * - Filter options are available
   * - Product count or results message is shown
   * - Product images are loaded properly
   * - Product prices are displayed (if available)
   */
  test('Coffee PLP (listing) is displayed correctly', async ({ homePage, coffeePLPPage }) => {
    // Given I am on the Nespresso NC2 home page
    await test.step('Navigate to home page', async () => {
      await homePage.open();
    });

    // When I click on "Coffee" in the main navigation
    await test.step('Click on Coffee navigation', async () => {
      await homePage.clickCoffeeNavigation();
    });

    // Then the coffee product listing page is displayed correctly
    await test.step('Verify coffee PLP is displayed correctly', async () => {
      await coffeePLPPage.waitForPLPLoad();
      await coffeePLPPage.verifyCoffeePLPDisplayed();
    });

    // Additional comprehensive checks
    await test.step('Verify product count', async () => {
      const productCount = await coffeePLPPage.getProductCount();
      expect(productCount).toBeGreaterThan(0);
      console.log(`Total products found: ${productCount}`);
    });

    await test.step('Verify product cards structure', async () => {
      const products = await coffeePLPPage.getProductCards();
      expect(products.length).toBeGreaterThan(0);
      
      // Verify first product has required fields
      expect(products[0].name || products[0].link).toBeTruthy();
      console.log(`First product: ${products[0].name}`);
    });

    await test.step('Verify product images are loaded', async () => {
      await coffeePLPPage.verifyProductImagesLoaded();
    });

    await test.step('Verify product prices are displayed', async () => {
      await coffeePLPPage.verifyProductPricesDisplayed();
    });
  });

  /**
   * Scenario: Coffee PDP is displayed correctly
   * 
   * Enhanced expectations:
   * - URL is a product detail page (not listing)
   * - Product title is visible and not empty
   * - Product image is displayed and loaded (naturalWidth > 0)
   * - Product image has valid src attribute
   * - Product price is displayed with currency
   * - Product description exists and has content
   * - Add to cart button is present
   * - Breadcrumbs navigation is visible
   * - Product attributes (intensity, aroma, cup size) are shown
   * - Related products section exists
   * - Product gallery has images
   * - Header and footer are present
   */
  test('Coffee PDP is displayed correctly', async ({ homePage, coffeePLPPage, coffeePDPPage }) => {
    // Given I am on the coffee product listing page
    await test.step('Navigate to home page', async () => {
      await homePage.open();
    });

    await test.step('Navigate to coffee PLP', async () => {
      await homePage.clickCoffeeNavigation();
      await coffeePLPPage.waitForPLPLoad();
    });

    // When I open a random coffee product
    let productName: string;
    await test.step('Click on a random coffee product', async () => {
      productName = await coffeePLPPage.clickRandomProduct();
      console.log(`Selected product: ${productName}`);
    });

    // Then the coffee product details page is displayed correctly
    await test.step('Verify coffee PDP is displayed correctly', async () => {
      await coffeePDPPage.waitForPDPLoad();
      await coffeePDPPage.verifyCoffeePDPDisplayed();
    });

    // Additional comprehensive checks
    await test.step('Verify product data', async () => {
      const productData = await coffeePDPPage.getProductData();
      expect(productData.name).toBeTruthy();
      expect(productData.name.length).toBeGreaterThan(0);
      expect(productData.imageUrl).toBeTruthy();
      console.log(`Product details: ${productData.name} - ${productData.price}`);
    });

    await test.step('Verify breadcrumbs navigation', async () => {
      const breadcrumbs = await coffeePDPPage.getBreadcrumbs();
      if (breadcrumbs.length > 0) {
        expect(breadcrumbs.length).toBeGreaterThanOrEqual(2);
        console.log(`Breadcrumb path: ${breadcrumbs.map(b => b.text).join(' > ')}`);
      }
    });

    await test.step('Verify product gallery', async () => {
      await coffeePDPPage.verifyProductGallery();
    });

    await test.step('Verify product reviews section', async () => {
      await coffeePDPPage.verifyProductReviews();
    });

    await test.step('Verify availability status', async () => {
      await coffeePDPPage.verifyAvailabilityStatus();
    });

    await test.step('Verify share functionality', async () => {
      await coffeePDPPage.verifyShareButtons();
    });

    await test.step('Verify nutritional information', async () => {
      await coffeePDPPage.verifyNutritionalInfo();
    });
  });

  /**
   * Bonus: End-to-end coffee browsing journey
   * This test covers the complete user journey from home to product details
   */
  test('Complete coffee browsing journey', async ({ homePage, coffeePLPPage, coffeePDPPage }) => {
    // Start from home
    await test.step('Start from home page', async () => {
      await homePage.open();
      await homePage.verifyHomePageDisplayed();
    });

    // Navigate to coffee listing
    await test.step('Browse to coffee section', async () => {
      await homePage.clickCoffeeNavigation();
      await coffeePLPPage.waitForPLPLoad();
      
      const productCount = await coffeePLPPage.getProductCount();
      expect(productCount).toBeGreaterThan(0);
    });

    // Select and view a product
    await test.step('View product details', async () => {
      const productName = await coffeePLPPage.clickRandomProduct();
      await coffeePDPPage.waitForPDPLoad();
      
      const pdpProductName = await coffeePDPPage.getProductName();
      expect(pdpProductName.length).toBeGreaterThan(0);
      console.log(`Viewing product: ${pdpProductName}`);
    });

    // Verify complete product information
    await test.step('Verify complete product information', async () => {
      await coffeePDPPage.verifyCoffeePDPDisplayed();
      const productData = await coffeePDPPage.getProductData();
      
      // Comprehensive validation
      expect(productData.name).toBeTruthy();
      expect(productData.imageUrl).toBeTruthy();
      
      console.log('✓ Complete browsing journey successful');
    });
  });
});
