# QA Automation Project with Playwright

This project demonstrates two different approaches to authentication in Playwright tests:
1. **Basic Login Fixture** - Simple fixture that logs in before each test
2. **Advanced Worker Fixture** - Efficient fixture that saves and reuses authentication state

## 🎯 Project Structure

```
/workspace/
├── fixtures/
│   ├── basicLoginFixture.ts          # Basic login fixture
│   └── advancedWorkerFixture.ts      # Advanced worker fixture with storageState
├── tests/
│   ├── basic/
│   │   └── login.spec.ts             # Tests using basic fixture
│   └── advanced/
│       └── secure-login.spec.ts      # Tests using worker fixture
├── .auth/                             # Storage for authentication state (auto-generated)
├── playwright.config.ts               # Playwright configuration
├── package.json                       # Project dependencies
└── tsconfig.json                      # TypeScript configuration
```

## 📋 Tasks Completed

### ✅ Basic Task: Simple Login Fixture
- **Target Site**: https://www.saucedemo.com/
- **Implementation**: `fixtures/basicLoginFixture.ts`
- **Tests**: `tests/basic/login.spec.ts`
- **Features**:
  - Automatically logs in before each test
  - Provides authenticated page to tests
  - Cleans up by logging out after tests
  - Uses standard_user credentials

### ✅ Advanced Task: Worker Fixture with Storage State
- **Target Site**: https://the-internet.herokuapp.com/secure
- **Implementation**: `fixtures/advancedWorkerFixture.ts`
- **Tests**: `tests/advanced/secure-login.spec.ts`
- **Features**:
  - Worker-scoped authentication (runs once per worker)
  - Saves authentication state to `.auth/user.json`
  - Reuses stored state across all tests
  - More efficient than logging in for each test
  - Demonstrates proper fixture scoping

## 🚀 Installation

```bash
npm install
npx playwright install
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run basic login tests only
```bash
npm run test:basic
```

### Run advanced worker fixture tests only
```bash
npm run test:advanced
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### View test report
```bash
npm run test:report
```

## 📝 Key Concepts

### Basic Login Fixture
- **Scope**: Test-level (runs for each test)
- **Use Case**: Simple scenarios, few tests, or when state cleanup is needed
- **Pros**: Simple, predictable, isolated tests
- **Cons**: Slower (logs in for each test)

### Advanced Worker Fixture
- **Scope**: Worker-level (runs once per worker)
- **Use Case**: Many tests, parallel execution, performance optimization
- **Pros**: Fast, efficient, reuses authentication
- **Cons**: Slightly more complex setup

## 🔑 Test Credentials

### SauceDemo (Basic Tests)
- Username: `standard_user`
- Password: `secret_sauce`

### The Internet (Advanced Tests)
- Username: `tomsmith`
- Password: `SuperSecretPassword!`

## 📊 Test Coverage

### Basic Tests (3 tests)
1. Verify user is logged in and can view products
2. Add product to cart after login
3. Access account menu after login

### Advanced Tests (4 tests)
1. Access secure area using saved storage state
2. Verify logout functionality
3. Maintain authentication state across navigation
4. Verify secure area elements

## 🎓 Learning Points

1. **Fixture Scope**: Understanding test-scoped vs worker-scoped fixtures
2. **Storage State**: Saving and reusing authentication state for performance
3. **Fixture Extension**: Extending base test with custom fixtures
4. **Cleanup**: Proper teardown after tests
5. **Best Practices**: Organized project structure, typed fixtures, clear naming

## 🔧 Configuration

The project is configured to run on three browsers:
- Chromium
- Firefox
- WebKit (Safari)

Screenshots and videos are captured on failure for debugging.

## 📈 Next Steps

- Add more test scenarios
- Implement Page Object Model
- Add API authentication tests
- Set up CI/CD pipeline
- Add visual regression testing
- Implement custom reporters

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Fixtures](https://playwright.dev/docs/test-fixtures)
- [Authentication with Playwright](https://playwright.dev/docs/auth)
