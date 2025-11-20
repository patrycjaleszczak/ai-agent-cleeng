# SauceDemo Playwright Automation Project

This project contains automated tests for the SauceDemo application using Playwright with TypeScript. The project follows best practices with proper page objects, type safety, and parameterized tests.

## Project Structure

```
/workspace/
├── pages/                      # Page Object Models
│   ├── LoginPage.ts           # Login page interactions
│   └── InventoryPage.ts       # Inventory/products page interactions
├── types/                      # TypeScript interfaces and types
│   └── interfaces.ts          # Product, ExpectedProductOrder, etc.
├── helpers/                    # Test helper functions
│   └── test-helpers.ts        # Reusable test utilities
├── tests/                      # Test specifications
│   └── product-sorting.spec.ts # Product sorting parameterized tests
├── playwright.config.ts        # Playwright configuration (Chrome only)
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## Key Features

### 1. **Type Safety**
- All code is fully typed with TypeScript
- No use of `any` type anywhere in the codebase
- Strict type checking enabled

### 2. **Page Object Model**
- **LoginPage**: Handles login functionality
- **InventoryPage**: Manages inventory/product interactions

### 3. **Interfaces**
- **Product**: Represents product data (name, description, image, price)
- **ExpectedProductOrder**: Configuration for sort testing (sortSetting, expectedFirst)
- **Credentials**: User login credentials
- **SortOption**: Type-safe sort options ('az', 'za', 'lohi', 'hilo')

### 4. **Helper Functions**
- `signInAndNavigateToPage()`: Authenticates and navigates to inventory
- `setSortOption()`: Sets product sort option
- `readFirstProductName()`: Reads the first product name from the list

### 5. **Parameterized Tests**
- Tests run for all sort options (A-Z, Z-A, Low-High, High-Low)
- Each test validates the correct first product appears after sorting

## Installation

```bash
npm install
npx playwright install chromium
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Debug tests
npm run test:debug

# View test report
npm run report
```

## Configuration

The project is configured to run tests **only on Chrome** as specified in `playwright.config.ts`:

```typescript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
]
```

## Test Credentials

The tests use the standard demo credentials:
- **Username**: `standard_user`
- **Password**: `secret_sauce`

## Test Cases

The product sorting tests validate four different sort scenarios:

| Sort Setting | Expected First Product |
|--------------|------------------------|
| az (A-Z)     | Sauce Labs Backpack    |
| za (Z-A)     | Test.allTheThings() T-Shirt (Red) |
| lohi (Low-High) | Sauce Labs Onesie   |
| hilo (High-Low) | Sauce Labs Fleece Jacket |

## Type Safety Examples

All functions are properly typed:

```typescript
async function signInAndNavigateToPage(
  page: Page,
  credentials: Credentials
): Promise<void>

async function setSortOption(
  page: Page,
  sortOption: SortOption
): Promise<void>

async function readFirstProductName(page: Page): Promise<string>
```

## Best Practices Implemented

✅ Page Object Model pattern  
✅ Type-safe interfaces and types  
✅ No `any` types used  
✅ Reusable helper functions  
✅ Parameterized tests  
✅ Clear separation of concerns  
✅ Comprehensive TypeScript configuration  
✅ Chrome-only browser testing  
✅ Proper async/await handling  
✅ Waiting for page navigation and element rendering  

## Extending the Project

To add more tests:

1. Create new interfaces in `types/interfaces.ts`
2. Add page objects in `pages/` directory
3. Create helper functions in `helpers/test-helpers.ts`
4. Write tests in `tests/` directory

All code must maintain full type safety without using `any` type.
