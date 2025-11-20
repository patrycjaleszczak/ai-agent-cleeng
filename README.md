# 🧪 Nespresso Playwright Test Automation Suite

A comprehensive Playwright test automation framework for testing Nespresso NC2 coffee browsing functionality with TypeScript, Page Objects, Fixtures, and Type-safe interfaces.

---

## 📁 Project Structure

```
nespresso-playwright-tests/
│
├── pages/                          # Page Object Models
│   ├── BasePage.ts                # Base page with common functionality
│   ├── HomePage.ts                # Home page object
│   ├── CoffeePLPPage.ts          # Coffee Product Listing Page
│   └── CoffeePDPPage.ts          # Coffee Product Details Page
│
├── types/                          # TypeScript type definitions
│   ├── product.types.ts          # Product-related interfaces
│   └── page.types.ts             # Page configuration types
│
├── fixtures/                       # Playwright fixtures
│   └── pages.fixture.ts          # Page object fixtures
│
├── tests/                          # Test specifications
│   └── coffee-browsing.spec.ts   # Coffee browsing test suite
│
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies
├── .gitignore                     # Git ignore rules
├── TEST_DOCUMENTATION.md          # Detailed test documentation
└── README.md                      # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Install Playwright browsers:**

```bash
npx playwright install
```

### Running Tests

**Run all tests:**
```bash
npm test
```

**Run tests in headed mode (see browser):**
```bash
npm run test:headed
```

**Run tests in UI mode (interactive):**
```bash
npm run test:ui
```

**Run tests in debug mode:**
```bash
npm run test:debug
```

**Run specific test file:**
```bash
npx playwright test tests/coffee-browsing.spec.ts
```

**Run specific browser:**
```bash
npx playwright test --project=chromium
```

**View test report:**
```bash
npm run test:report
```

---

## 🎯 Test Coverage

### Feature: Browse coffee products on Nespresso NC2

#### ✅ Scenario 1: Home Page Display
- Verifies home page loads correctly
- Validates navigation, header, footer
- Checks for essential page elements

#### ✅ Scenario 2: Coffee Product Listing (PLP)
- Tests navigation to coffee section
- Validates product grid display
- Verifies filters and product cards

#### ✅ Scenario 3: Coffee Product Details (PDP)
- Tests product selection from listing
- Validates product details display
- Verifies images, pricing, descriptions

#### ✅ Bonus: Complete Browsing Journey
- End-to-end test from home to product details
- Validates entire user flow

**See [TEST_DOCUMENTATION.md](./TEST_DOCUMENTATION.md) for comprehensive test expectations and additional test ideas.**

---

## 🏗️ Architecture

### Page Object Model (POM)

**BasePage** - Common functionality:
- Cookie consent handling
- Page navigation
- Element waiting and interaction
- Common validations

**Page Objects:**
- `HomePage` - Home page interactions
- `CoffeePLPPage` - Product listing logic
- `CoffeePDPPage` - Product details logic

### Fixtures

Custom Playwright fixtures for automatic page object instantiation:

```typescript
test('example', async ({ homePage, coffeePLPPage }) => {
  await homePage.open();
  await homePage.clickCoffeeNavigation();
  // Page objects are ready to use!
});
```

### Type Safety

Full TypeScript implementation with interfaces for:
- Product data structures
- Page configurations
- Navigation items
- Breadcrumb trails
- Filter options

---

## 🔧 Configuration

### Playwright Config

Located in `playwright.config.ts`:

- **Browsers:** Chromium, Firefox, WebKit
- **Mobile:** Pixel 5, iPhone 13
- **Timeouts:** 60s test, 30s navigation, 10s action
- **Retries:** 2 (in CI), 0 (local)
- **Reports:** HTML, JSON, List
- **Screenshots:** On failure
- **Video:** On failure
- **Traces:** On first retry

### TypeScript Config

Located in `tsconfig.json`:

- **Target:** ES2022
- **Strict mode:** Enabled
- **Path aliases:** `@pages/*`, `@fixtures/*`, `@types/*`

---

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npm run test:report
```

Reports include:
- Test execution timeline
- Screenshots of failures
- Video recordings (on failure)
- Trace viewer links
- Detailed step logs

---

## 🎨 Key Features

✨ **Page Object Model** - Clean, maintainable test code
✨ **TypeScript** - Type-safe implementation
✨ **Fixtures** - Reusable test components
✨ **Multiple Selectors** - Robust element location
✨ **Smart Waiting** - Automatic element waiting
✨ **Cookie Handling** - Automatic consent management
✨ **Comprehensive Logging** - Detailed console output
✨ **Cross-browser** - Chrome, Firefox, Safari
✨ **Mobile Support** - Responsive testing
✨ **Parallel Execution** - Fast test runs
✨ **Screenshot/Video** - Visual debugging
✨ **Test Steps** - Organized test structure

---

## 🧩 Usage Examples

### Using Page Objects

```typescript
test('example test', async ({ homePage, coffeePLPPage }) => {
  // Navigate to home
  await homePage.open();
  
  // Verify home page
  await homePage.verifyHomePageDisplayed();
  
  // Go to coffee section
  await homePage.clickCoffeeNavigation();
  
  // Get products
  const products = await coffeePLPPage.getProductCards();
  expect(products.length).toBeGreaterThan(0);
});
```

### Adding New Page Objects

1. Create new page object extending `BasePage`:
```typescript
export class NewPage extends BasePage {
  constructor(page: Page) {
    super(page);
    // Initialize locators
  }
}
```

2. Add to fixtures:
```typescript
export const test = base.extend<PageFixtures>({
  newPage: async ({ page }, use) => {
    await use(new NewPage(page));
  },
});
```

3. Use in tests:
```typescript
test('test', async ({ newPage }) => {
  // Use newPage
});
```

---

## 📝 Writing Tests

### Test Structure

```typescript
test.describe('Feature Name', () => {
  test('scenario name', async ({ pageName }) => {
    // Arrange
    await test.step('setup step', async () => {
      // Setup code
    });
    
    // Act
    await test.step('action step', async () => {
      // Action code
    });
    
    // Assert
    await test.step('verification step', async () => {
      // Assertions
    });
  });
});
```

### Best Practices

1. **Use test steps** for organization
2. **Use page objects** - never interact directly with page
3. **Use fixtures** - automatic setup/teardown
4. **Use types** - leverage TypeScript
5. **Use descriptive names** - clear test intent
6. **Independent tests** - no test dependencies
7. **Comprehensive assertions** - verify all key elements
8. **Handle optional elements** - graceful degradation

---

## 🐛 Debugging

### Run in headed mode:
```bash
npm run test:headed
```

### Debug specific test:
```bash
npx playwright test --debug tests/coffee-browsing.spec.ts
```

### Use Playwright Inspector:
```bash
npm run test:debug
```

### View trace:
```bash
npx playwright show-trace trace.zip
```

### Use Codegen to generate selectors:
```bash
npm run test:codegen
```

---

## 🔍 Advanced Features

### Parallel Execution

Tests run in parallel by default. Configure in `playwright.config.ts`:

```typescript
workers: process.env.CI ? 1 : undefined,
fullyParallel: true,
```

### Serial Tests

For tests that must run in order:

```typescript
test.describe.configure({ mode: 'serial' });
```

### Test Retry

Tests automatically retry on failure in CI:

```typescript
retries: process.env.CI ? 2 : 0,
```

### Custom Timeouts

```typescript
test('long test', async ({ page }) => {
  test.setTimeout(120000); // 2 minutes
  // Test code
});
```

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Test Fixtures](https://playwright.dev/docs/test-fixtures)

---

## 🤝 Contributing

To extend this test suite:

1. Add new page objects in `pages/`
2. Create corresponding types in `types/`
3. Update fixtures in `fixtures/`
4. Write tests in `tests/`
5. Update documentation

---

## 📄 License

MIT

---

## 👤 Author

QA Automator

---

## 📞 Support

For questions or issues:
1. Check [TEST_DOCUMENTATION.md](./TEST_DOCUMENTATION.md)
2. Review Playwright docs
3. Check test execution logs
4. Review HTML report

---

## ✅ Checklist for Running Tests

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Playwright browsers installed (`npx playwright install`)
- [ ] Tests run successfully (`npm test`)
- [ ] Reports generated (`npm run test:report`)

---

**Happy Testing! ☕🧪**
