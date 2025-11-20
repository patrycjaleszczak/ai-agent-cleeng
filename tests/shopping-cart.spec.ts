import { test, expect } from '@playwright/test';
import { LoginPage, ProductsPage, CartPage } from '../pages';
import { TestUsers, TestProducts } from '../helpers';

test.describe('Shopping Cart Tests', () => {
  test('should add product to cart and verify it is in the basket', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/');

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.login(TestUsers.STANDARD_USER.username, TestUsers.STANDARD_USER.password);

    // Verify we're on the products page
    const productsPage = new ProductsPage(page);
    await expect(page).toHaveURL(/.*inventory/);
    const pageTitle = await productsPage.getPageTitle();
    expect(pageTitle).toBe('Products');

    // Verify product is displayed
    const productName = TestProducts.BACKPACK;
    const isProductDisplayed = await productsPage.isProductDisplayed(productName);
    expect(isProductDisplayed).toBe(true);

    // Get product price before adding to cart
    const productPrice = await productsPage.getProductPrice(productName);
    expect(productPrice).toBeTruthy();

    // Add product to cart
    await productsPage.addProductToCart(productName);

    // Verify cart badge shows 1 item
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // Go to cart
    await productsPage.goToCart();

    // Verify we're on the cart page
    const cartPage = new CartPage(page);
    await expect(page).toHaveURL(/.*cart/);
    const cartPageTitle = await cartPage.getPageTitle();
    expect(cartPageTitle).toBe('Your Cart');

    // Verify the product is in the cart
    const isProductInCart = await cartPage.isProductInCart(productName);
    expect(isProductInCart).toBe(true);

    // Verify cart has 1 item
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe(1);

    // Verify product name in cart matches what we added
    const productNameInCart = await cartPage.getProductNameInCart(0);
    expect(productNameInCart).toBe(productName);

    // Verify product price in cart matches the original price
    const productPriceInCart = await cartPage.getProductPriceInCart(productName);
    expect(productPriceInCart).toBe(productPrice);
  });
});
