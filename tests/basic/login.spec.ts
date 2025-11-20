import { test, expect } from '../../fixtures/basicLoginFixture';

/**
 * Basic Login Tests using the login fixture
 * Demonstrates how to use the authenticatedPage fixture
 */

test.describe('SauceDemo - Basic Login Fixture Tests', () => {
  test('should verify user is logged in and can view products', async ({ authenticatedPage }) => {
    // Verify we're on the inventory page
    await expect(authenticatedPage).toHaveURL(/.*inventory\.html/);
    
    // Verify the products container is visible
    await expect(authenticatedPage.locator('.inventory_container')).toBeVisible();
    
    // Verify products are displayed
    const products = authenticatedPage.locator('.inventory_item');
    await expect(products).toHaveCount(6);
    
    // Verify page title
    await expect(authenticatedPage.locator('.title')).toHaveText('Products');
  });

  test('should add product to cart after login', async ({ authenticatedPage }) => {
    // Add first product to cart
    await authenticatedPage.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Verify cart badge shows 1 item
    await expect(authenticatedPage.locator('.shopping_cart_badge')).toHaveText('1');
    
    // Navigate to cart
    await authenticatedPage.click('.shopping_cart_link');
    
    // Verify we're on cart page
    await expect(authenticatedPage).toHaveURL(/.*cart\.html/);
    
    // Verify product is in cart
    await expect(authenticatedPage.locator('.cart_item')).toHaveCount(1);
    await expect(authenticatedPage.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  });

  test('should be able to access account menu after login', async ({ authenticatedPage }) => {
    // Open menu
    await authenticatedPage.click('#react-burger-menu-btn');
    
    // Verify menu items are visible
    await expect(authenticatedPage.locator('#inventory_sidebar_link')).toBeVisible();
    await expect(authenticatedPage.locator('#about_sidebar_link')).toBeVisible();
    await expect(authenticatedPage.locator('#logout_sidebar_link')).toBeVisible();
    await expect(authenticatedPage.locator('#reset_app_state_sidebar_link')).toBeVisible();
  });
});
