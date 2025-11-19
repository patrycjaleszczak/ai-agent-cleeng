# Playwright E-commerce Testing Project

This is a Playwright testing project for testing e-commerce functionality on SauceDemo.com. The project includes a complete test that adds a product to the shopping cart and verifies it.

## 🚀 Project Structure

```
/workspace/
├── pages/                    # Page Object Models
│   ├── BasePage.ts          # Base page with common functionality
│   ├── LoginPage.ts         # Login page object
│   ├── ProductsPage.ts      # Products page object
│   ├── CartPage.ts          # Shopping cart page object
│   └── index.ts             # Page exports
├── helpers/                  # Helper utilities
│   ├── pageHelper.ts        # Page initialization and common actions
│   ├── testData.ts          # Test data (users, products)
│   └── index.ts             # Helper exports
├── tests/                    # Test files
│   └── shopping-cart.spec.ts # Shopping cart test
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies
```

## 🛠️ Configuration

### Playwright Config
- **Base URL**: https://www.saucedemo.com
- **Browser**: Chrome only (Chromium)
- **Test Directory**: `./tests`
- **Features**: 
  - Screenshot on failure
  - Video on failure
  - Trace on first retry
  - HTML reporter

### TypeScript Config
- Target: ES2020
- Module: CommonJS
- Strict mode enabled

## 📦 Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## 🧪 Running Tests

### Run all tests (headless)
```bash
npm test
```

### Run tests in headed mode (with browser UI)
```bash
npm run test:headed
```

### Run tests with Playwright UI
```bash
npm run test:ui
```

### View HTML report
```bash
npm run report
```

## 🎯 Test Scenarios

### Shopping Cart Test
**Test**: `should add product to cart and verify it is in the basket`

**Steps**:
1. Navigate to the login page
2. Log in with standard user credentials
3. Verify navigation to products page
4. Verify the product (Sauce Labs Backpack) is displayed
5. Get the product price
6. Add product to cart
7. Verify cart badge shows 1 item
8. Navigate to cart
9. Verify the correct product is in the cart
10. Verify product name matches
11. Verify product price matches

## 📚 Page Objects

### BasePage
Base class with common functionality for all pages:
- Navigation
- Page load waiting
- Get page title

### LoginPage
Handles login functionality:
- Login with username/password
- Get error messages
- Check login button visibility

### ProductsPage
Handles product browsing and cart operations:
- Get page title
- Add product to cart
- Get cart item count
- Navigate to cart
- Check product visibility
- Get product price

### CartPage
Handles shopping cart operations:
- Get cart items count
- Check if product is in cart
- Get product name and price
- Remove products
- Proceed to checkout
- Continue shopping

## 🔧 Helper Functions

### TestUsers
Predefined user credentials:
- STANDARD_USER
- LOCKED_OUT_USER
- PROBLEM_USER
- PERFORMANCE_GLITCH_USER

### TestProducts
Predefined product names:
- BACKPACK
- BIKE_LIGHT
- BOLT_TSHIRT
- FLEECE_JACKET
- ONESIE
- RED_TSHIRT

### PageHelper
Utility class for initializing page objects:
- getLoginPage()
- getProductsPage()
- getCartPage()
- loginAsStandardUser() - Quick login helper

## ✅ Test Results

The test successfully:
- ✅ Logs in to the application
- ✅ Adds a product to the cart
- ✅ Verifies the cart badge count
- ✅ Navigates to the cart
- ✅ Confirms the correct product is in the cart
- ✅ Validates product name and price match

## 🎨 Best Practices Used

1. **Page Object Model (POM)**: Clean separation of page logic and tests
2. **TypeScript**: Type safety and better IDE support
3. **Base URL Configuration**: Easy environment switching
4. **Test Data Management**: Centralized test data in helpers
5. **Locator Strategy**: Using data-test attributes when available
6. **Assertions**: Multiple verification points for robust testing
7. **Chrome Only**: Configured to run on Chrome as requested

## 🔍 Troubleshooting

If tests fail:
1. Check the HTML report: `npm run report`
2. Review screenshots in `test-results/`
3. Check videos in `test-results/`
4. View traces for detailed debugging

## 📝 Notes

- The test uses SauceDemo.com, a demo e-commerce site specifically designed for testing
- Credentials are intentionally public (standard_user / secret_sauce)
- The test is configured to run only on Chrome as requested
- All page objects use TypeScript for better type safety
