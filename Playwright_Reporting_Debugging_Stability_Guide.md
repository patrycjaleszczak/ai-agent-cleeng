# Playwright: Reporting, Debugging, and Stability Guide

## 🎯 Complete Guide for QA Automation Engineers

---

## Table of Contents

1. [Reports and Reporters](#reports-and-reporters)
2. [Results Analysis and Debugging](#results-analysis-and-debugging)
3. [Test Stability and Flaky Tests](#test-stability-and-flaky-tests)

---

# 1. Reports and Reporters

## 1.1 Built-in Playwright Reporters

### Default HTML Reporter

The HTML reporter is Playwright's default reporter that provides a comprehensive web-based interface to view test results.

#### Basic Setup

```javascript
// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'html',
});
```

#### Running Tests and Opening Report

```bash
# Run tests
npx playwright test

# Open the HTML report
npx playwright show-report
```

#### Advanced HTML Reporter Configuration

```javascript
// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never', // 'always', 'never', 'on-failure'
      host: 'localhost',
      port: 9223,
    }]
  ],
});
```

**Example Output Location:**
- Default: `./playwright-report/index.html`
- Screenshots, videos, and traces are included

---

### List Reporter

Perfect for CI/CD environments where you want simple, clean output.

```javascript
// playwright.config.js
export default defineConfig({
  reporter: 'list',
});
```

**Terminal Output Example:**
```
✓ [chromium] › tests/login.spec.ts:3:5 › should login successfully (2s)
✓ [chromium] › tests/login.spec.ts:12:5 › should show error on invalid credentials (1s)
✗ [chromium] › tests/checkout.spec.ts:5:5 › should complete checkout (3s)
```

---

### Dot Reporter

Minimalistic reporter showing one character per test.

```javascript
// playwright.config.js
export default defineConfig({
  reporter: 'dot',
});
```

**Output:**
```
··✓··✓·✗··✓✓✓

5 passed, 1 failed
```

---

### Line Reporter

Shows one line per test file with a summary.

```javascript
// playwright.config.js
export default defineConfig({
  reporter: 'line',
});
```

---

### JSON Reporter

Generates machine-readable JSON output for integration with other tools.

```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['json', { outputFile: 'test-results.json' }]
  ],
});
```

**JSON Output Structure:**
```json
{
  "suites": [
    {
      "title": "Login Tests",
      "file": "tests/login.spec.ts",
      "specs": [
        {
          "title": "should login successfully",
          "ok": true,
          "tests": [
            {
              "status": "expected",
              "duration": 2000
            }
          ]
        }
      ]
    }
  ]
}
```

---

### JUnit Reporter

Generates XML reports compatible with CI/CD tools like Jenkins, Azure DevOps.

```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['junit', { outputFile: 'results.xml' }]
  ],
});
```

**JUnit XML Output:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite name="Login Tests" tests="2" failures="0" time="3.5">
    <testcase name="should login successfully" classname="tests.login.spec" time="2.0"/>
    <testcase name="should show error on invalid credentials" classname="tests.login.spec" time="1.5"/>
  </testsuite>
</testsuites>
```

---

### GitHub Actions Reporter

Automatically annotates failed tests in GitHub PRs.

```javascript
// playwright.config.js
export default defineConfig({
  reporter: process.env.CI ? 'github' : 'list',
});
```

**GitHub Actions Workflow:**
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
```

---

## 1.2 Multiple Reporters Configuration

You can combine multiple reporters to get the best of both worlds.

```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['html', { open: 'on-failure' }],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'results.xml' }],
    ['list']
  ],
});
```

---

## 1.3 Custom Reporter

Create your own reporter for specific needs.

```javascript
// my-custom-reporter.js
class MyCustomReporter {
  constructor(options) {
    this.options = options;
  }

  onBegin(config, suite) {
    console.log(`Starting test suite with ${suite.allTests().length} tests`);
  }

  onTestEnd(test, result) {
    const status = result.status;
    const emoji = status === 'passed' ? '✅' : status === 'failed' ? '❌' : '⚠️';
    console.log(`${emoji} ${test.title} - ${result.duration}ms`);
  }

  onEnd(result) {
    console.log(`\nFinished the run: ${result.status}`);
    console.log(`Total: ${result.duration}ms`);
  }
}

module.exports = MyCustomReporter;
```

**Using Custom Reporter:**
```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['./my-custom-reporter.js', { customOption: 'value' }]
  ],
});
```

---

## 1.4 Third-Party Reporters

### 🆓 Free Third-Party Reporters

#### 1. Allure Reporter

Popular open-source reporting framework with rich visualization.

**Installation:**
```bash
npm install --save-dev allure-playwright
```

**Configuration:**
```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true,
      environmentInfo: {
        'Environment': 'staging',
        'Browser': 'chromium',
        'OS': 'Ubuntu 22.04'
      }
    }]
  ],
});
```

**Generate and View Report:**
```bash
# Run tests
npx playwright test

# Generate Allure report
npx allure generate ./allure-results --clean

# Open report
npx allure open ./allure-report
```

**Features:**
- Timeline view
- Test categories
- Historical trends
- Screenshots and videos
- Attachments support

**Adding Attachments in Tests:**
```javascript
import { test } from '@playwright/test';
import { allure } from 'allure-playwright';

test('API test with logs', async ({ request }) => {
  await allure.step('Send GET request', async () => {
    const response = await request.get('/api/users');
    await allure.attachment('Response', JSON.stringify(await response.json(), null, 2), 'application/json');
  });
});
```

---

#### 2. Monocart Reporter

Modern, feature-rich HTML reporter with coverage support.

**Installation:**
```bash
npm install --save-dev monocart-reporter
```

**Configuration:**
```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['monocart-reporter', {
      name: "My Test Report",
      outputFile: './test-results/report.html',
      trend: './test-results/trend.json',
      
      // Custom columns
      columns: (defaultColumns) => {
        return [
          ...defaultColumns,
          {
            id: 'owner',
            name: 'Owner',
            align: 'center',
          }
        ];
      },
      
      // Coverage options
      coverage: {
        reports: [
          ['v8'],
          ['console-details']
        ]
      }
    }]
  ],
});
```

**Features:**
- Beautiful UI with dark/light themes
- Test trend analysis
- Coverage reporting
- Custom columns and metadata
- Search and filtering

---

#### 3. Tesults Reporter

Cloud-based test reporting and analytics (free tier available).

**Installation:**
```bash
npm install --save-dev playwright-tesults-reporter
```

**Configuration:**
```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['playwright-tesults-reporter', {
      'tesults-target': 'your-token-here'
    }]
  ],
});
```

**Features:**
- Cloud storage for artifacts
- Test analytics and trends
- CI/CD integration
- Team collaboration

---

#### 4. ReportPortal

Enterprise test automation dashboard (open-source).

**Installation:**
```bash
npm install --save-dev @reportportal/agent-js-playwright
```

**Configuration:**
```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['@reportportal/agent-js-playwright', {
      apiKey: 'your-api-key',
      endpoint: 'https://your-instance.reportportal.io/api/v1',
      project: 'your-project',
      launch: 'Playwright Tests',
      description: 'Playwright test execution',
      attributes: [
        { key: 'env', value: 'staging' },
        { key: 'browser', value: 'chromium' }
      ]
    }]
  ],
});
```

**Features:**
- Real-time test execution dashboard
- ML-based failure analysis
- Historical data and trends
- Advanced filtering and search

---

### 💰 Paid Third-Party Reporters

#### 1. TestRail Reporter

Integration with TestRail test management platform.

**Installation:**
```bash
npm install --save-dev playwright-testrail-reporter
```

**Configuration:**
```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['playwright-testrail-reporter', {
      host: 'https://your-company.testrail.io',
      username: 'user@example.com',
      password: 'your-api-key',
      projectId: 1,
      suiteId: 10,
      runName: 'Playwright Automated Tests'
    }]
  ],
});
```

**In Test File:**
```javascript
test('Login test @C123', async ({ page }) => {
  // @C123 is the TestRail case ID
  await page.goto('/login');
  // test logic
});
```

**Pricing:** Starts at $37/user/month

---

#### 2. Xray (Jira Integration)

Test management for Jira with Playwright integration.

**Installation:**
```bash
npm install --save-dev playwright-xray-reporter
```

**Configuration:**
```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['playwright-xray-reporter', {
      jiraUrl: 'https://your-company.atlassian.net',
      clientId: 'your-client-id',
      clientSecret: 'your-client-secret',
      testPlanKey: 'PROJ-123',
      testExecutionKey: 'PROJ-456'
    }]
  ],
});
```

**Pricing:** Starts at $10/user/month (Cloud), $10,000+ (Server)

---

#### 3. Katalon TestOps

Comprehensive test orchestration and analytics platform.

**Installation:**
```bash
npm install --save-dev @katalon/testops-playwright
```

**Configuration:**
```javascript
// playwright.config.js
import { testOpsReporter } from '@katalon/testops-playwright';

export default defineConfig({
  reporter: [
    testOpsReporter({
      projectId: 123456,
      reportFolder: 'test-results'
    })
  ],
});
```

**Features:**
- Test orchestration
- Visual testing
- Analytics and insights
- CI/CD integration

**Pricing:** Free tier available, paid plans start at $25/month

---

#### 4. LambdaTest Reporter

Cloud-based testing platform with Playwright support.

**Installation:**
```bash
npm install --save-dev playwright-lambdatest-reporter
```

**Configuration:**
```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['playwright-lambdatest-reporter', {
      username: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,
      projectName: 'My Playwright Project',
      buildName: 'Build #1'
    }]
  ],
});
```

**Pricing:** Starts at $15/month

---

#### 5. BrowserStack Reporter

Cloud browser testing with comprehensive reporting.

**Installation:**
```bash
npm install --save-dev browserstack-playwright-reporter
```

**Configuration:**
```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['browserstack-playwright-reporter', {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      projectName: 'Playwright Tests'
    }]
  ],
});
```

**Pricing:** Starts at $29/month

---

## 1.5 Reporter Configuration Best Practices

### Environment-Specific Configuration

```javascript
// playwright.config.js
export default defineConfig({
  reporter: process.env.CI
    ? [
        ['github'],
        ['html', { open: 'never' }],
        ['json', { outputFile: 'results.json' }],
        ['junit', { outputFile: 'results.xml' }]
      ]
    : [
        ['html', { open: 'on-failure' }],
        ['list']
      ],
});
```

### Conditional Reporter Based on Test Type

```javascript
// playwright.config.js
const reporters = [['list']];

if (process.env.GENERATE_HTML) {
  reporters.push(['html', { open: 'always' }]);
}

if (process.env.GENERATE_ALLURE) {
  reporters.push(['allure-playwright']);
}

export default defineConfig({
  reporter: reporters,
});
```

**Usage:**
```bash
# Run with HTML report
GENERATE_HTML=true npx playwright test

# Run with Allure report
GENERATE_ALLURE=true npx playwright test

# Run with both
GENERATE_HTML=true GENERATE_ALLURE=true npx playwright test
```

---

# 2. Results Analysis and Debugging

## 2.1 Debugging in Visual Studio Code

### Basic VS Code Configuration

**Step 1: Install Playwright Extension**
- Open VS Code
- Go to Extensions (Ctrl+Shift+X)
- Search for "Playwright Test for VSCode"
- Install the official extension

**Step 2: Configure Launch Settings**

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Playwright Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/@playwright/test/cli.js",
      "args": [
        "test",
        "--debug",
        "${file}"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Debug Current Test",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/@playwright/test/cli.js",
      "args": [
        "test",
        "--debug",
        "${file}:${lineNumber}"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug with UI Mode",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/@playwright/test/cli.js",
      "args": [
        "test",
        "--ui"
      ],
      "console": "integratedTerminal"
    }
  ]
}
```

### Using Playwright Inspector

**Launch Inspector:**
```bash
# Debug specific test
npx playwright test --debug tests/example.spec.ts

# Debug specific test line
npx playwright test --debug tests/example.spec.ts:10

# Debug with specific browser
npx playwright test --debug --browser=firefox
```

**Inspector Features:**
- Step through test execution
- Record actions
- Generate code
- Inspect selectors
- View console logs

### Debugging with Breakpoints

```javascript
import { test, expect } from '@playwright/test';

test('debug example', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Add debugger statement
  await page.pause(); // Opens Playwright Inspector
  
  await page.click('button');
  
  // Or use Node.js debugger
  debugger; // Pauses if running with Node debugger
  
  await expect(page).toHaveTitle(/Example/);
});
```

**Debug with VS Code:**
1. Set breakpoint by clicking left of line number
2. Press F5 or click "Run and Debug"
3. Select "Debug Playwright Tests"
4. Use debug controls: Continue (F5), Step Over (F10), Step Into (F11)

### Using VS Code Playwright Extension Features

**Run tests with UI:**
```javascript
test('test with debug', async ({ page }) => {
  await page.goto('https://example.com');
  // Click the play button in VS Code gutter to run this test
});
```

**Test Explorer:**
- View all tests in sidebar
- Run/Debug individual tests
- See test results inline
- Watch mode for continuous testing

---

## 2.2 Reading Logs in Terminal

### Console Output Configuration

```javascript
// playwright.config.js
export default defineConfig({
  use: {
    // Show browser console in terminal
    launchOptions: {
      logger: {
        isEnabled: (name, severity) => true,
        log: (name, severity, message) => console.log(`[${name}] ${message}`)
      }
    }
  }
});
```

### Adding Console Logs in Tests

```javascript
import { test, expect } from '@playwright/test';

test('test with logging', async ({ page }) => {
  console.log('🚀 Starting test');
  
  await page.goto('https://example.com');
  console.log('✅ Page loaded');
  
  const title = await page.title();
  console.log(`📄 Page title: ${title}`);
  
  await page.click('button#submit');
  console.log('🖱️ Button clicked');
  
  await expect(page.locator('.result')).toBeVisible();
  console.log('✨ Test completed successfully');
});
```

### Capturing Browser Console

```javascript
test('capture browser console', async ({ page }) => {
  // Listen to console messages
  page.on('console', msg => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });
  
  // Listen to page errors
  page.on('pageerror', error => {
    console.error(`❌ Page error: ${error.message}`);
  });
  
  // Listen to request failures
  page.on('requestfailed', request => {
    console.error(`❌ Request failed: ${request.url()}`);
  });
  
  await page.goto('https://example.com');
});
```

### Verbose Test Output

```bash
# Run with verbose output
npx playwright test --reporter=list --verbose

# Show browser logs
DEBUG=pw:browser npx playwright test

# Show API logs
DEBUG=pw:api npx playwright test

# Show all logs
DEBUG=pw:* npx playwright test
```

---

## 2.3 Saving Logs to Files

### Basic File Logging

```javascript
import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.beforeEach(async ({ }, testInfo) => {
  const logDir = path.join(__dirname, 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  testInfo.logFile = path.join(logDir, `${testInfo.title.replace(/\s+/g, '_')}.log`);
});

test('test with file logging', async ({ page }, testInfo) => {
  const log = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(testInfo.logFile, logMessage);
    console.log(message);
  };
  
  log('Starting test');
  await page.goto('https://example.com');
  log('Page loaded');
  
  // Test logic...
  
  log('Test completed');
});
```

### Advanced Logger Class

```javascript
// utils/logger.js
import fs from 'fs';
import path from 'path';

export class TestLogger {
  constructor(testInfo) {
    this.testInfo = testInfo;
    this.logDir = path.join(process.cwd(), 'test-logs');
    
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.logFile = path.join(
      this.logDir,
      `${testInfo.title.replace(/\s+/g, '_')}_${timestamp}.log`
    );
  }
  
  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] [${level}] ${message}`;
    
    if (data) {
      logMessage += `\n${JSON.stringify(data, null, 2)}`;
    }
    
    logMessage += '\n';
    
    fs.appendFileSync(this.logFile, logMessage);
    
    // Also log to console with colors
    const colors = {
      INFO: '\x1b[36m',  // Cyan
      WARN: '\x1b[33m',  // Yellow
      ERROR: '\x1b[31m', // Red
      SUCCESS: '\x1b[32m' // Green
    };
    
    console.log(`${colors[level] || ''}${logMessage}\x1b[0m`);
  }
  
  info(message, data) {
    this.log('INFO', message, data);
  }
  
  warn(message, data) {
    this.log('WARN', message, data);
  }
  
  error(message, data) {
    this.log('ERROR', message, data);
  }
  
  success(message, data) {
    this.log('SUCCESS', message, data);
  }
  
  getLogPath() {
    return this.logFile;
  }
}
```

**Using the Logger:**

```javascript
import { test, expect } from '@playwright/test';
import { TestLogger } from './utils/logger';

test('API test with logging', async ({ request }, testInfo) => {
  const logger = new TestLogger(testInfo);
  
  logger.info('Starting API test');
  
  try {
    logger.info('Sending GET request to /api/users');
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    
    logger.info('Response received', {
      status: response.status(),
      headers: response.headers()
    });
    
    const users = await response.json();
    logger.success(`Received ${users.length} users`, { users: users.slice(0, 2) });
    
    expect(response.ok()).toBeTruthy();
    logger.success('Test passed');
    
  } catch (error) {
    logger.error('Test failed', { error: error.message });
    throw error;
  }
  
  logger.info(`Log file saved: ${logger.getLogPath()}`);
});
```

### API Request/Response Logging

```javascript
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('API Tests with Logging', () => {
  let apiLogFile;
  
  test.beforeAll(() => {
    const logDir = path.join(__dirname, 'api-logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    apiLogFile = path.join(logDir, `api-test-${Date.now()}.log`);
  });
  
  async function logApiCall(method, url, request, response) {
    const log = {
      timestamp: new Date().toISOString(),
      method: method,
      url: url,
      request: {
        headers: request.headers,
        body: request.body
      },
      response: {
        status: response.status(),
        statusText: response.statusText(),
        headers: response.headers(),
        body: await response.text()
      }
    };
    
    fs.appendFileSync(apiLogFile, JSON.stringify(log, null, 2) + '\n---\n');
  }
  
  test('Create user', async ({ request }) => {
    const requestData = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
      data: requestData
    });
    
    await logApiCall('POST', '/users', { headers: {}, body: requestData }, response);
    
    expect(response.ok()).toBeTruthy();
  });
  
  test('Get users', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    
    await logApiCall('GET', '/users', { headers: {}, body: null }, response);
    
    expect(response.ok()).toBeTruthy();
  });
});
```

### Network Request Logging

```javascript
test('Log all network requests', async ({ page }) => {
  const logDir = path.join(__dirname, 'network-logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  const logFile = path.join(logDir, `network-${Date.now()}.log`);
  
  // Log all requests
  page.on('request', request => {
    const log = `➡️  ${request.method()} ${request.url()}\n`;
    fs.appendFileSync(logFile, log);
  });
  
  // Log all responses
  page.on('response', response => {
    const log = `⬅️  ${response.status()} ${response.url()}\n`;
    fs.appendFileSync(logFile, log);
  });
  
  // Log failed requests
  page.on('requestfailed', request => {
    const log = `❌ FAILED: ${request.url()}\n   Error: ${request.failure()?.errorText}\n`;
    fs.appendFileSync(logFile, log);
  });
  
  await page.goto('https://example.com');
  
  console.log(`Network log saved to: ${logFile}`);
});
```

---

## 2.4 Using Traces for Debugging

### Enabling Traces

```javascript
// playwright.config.js
export default defineConfig({
  use: {
    trace: 'on-first-retry', // 'on', 'off', 'retain-on-failure', 'on-first-retry'
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});
```

### Viewing Traces

```bash
# View trace
npx playwright show-trace trace.zip

# Or from test results
npx playwright show-trace test-results/example-test/trace.zip
```

### Programmatic Trace Creation

```javascript
test('trace example', async ({ page, context }) => {
  // Start tracing
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });
  
  await page.goto('https://example.com');
  await page.click('button');
  
  // Stop tracing and save
  await context.tracing.stop({
    path: 'trace.zip'
  });
});
```

---

## 2.5 Additional Debugging Techniques

### Step-by-Step Execution with Slow-Mo

```javascript
// playwright.config.js
export default defineConfig({
  use: {
    launchOptions: {
      slowMo: 500 // Slows down operations by 500ms
    }
  }
});
```

### Headed Mode for Visual Debugging

```bash
# Run in headed mode
npx playwright test --headed

# Run with specific browser
npx playwright test --headed --browser=chromium

# Run with devtools open
npx playwright test --debug
```

### Video Recording

```javascript
// playwright.config.js
export default defineConfig({
  use: {
    video: 'on', // 'off', 'on', 'retain-on-failure', 'on-first-retry'
    videoSize: { width: 1280, height: 720 }
  }
});
```

**Attach video to test results:**

```javascript
test('test with video', async ({ page }, testInfo) => {
  await page.goto('https://example.com');
  
  // Test logic...
  
  // Video is automatically attached to test results
});
```

### Screenshot on Failure

```javascript
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot({
      path: `test-results/failure-${testInfo.title}-${Date.now()}.png`,
      fullPage: true
    });
    await testInfo.attach('screenshot', {
      body: screenshot,
      contentType: 'image/png'
    });
  }
});
```

### Using Test Info for Debugging

```javascript
test('debug with test info', async ({ page }, testInfo) => {
  console.log('Test Info:', {
    title: testInfo.title,
    file: testInfo.file,
    line: testInfo.line,
    column: testInfo.column,
    project: testInfo.project.name,
    timeout: testInfo.timeout
  });
  
  // Add custom annotations
  testInfo.annotations.push({
    type: 'issue',
    description: 'https://github.com/microsoft/playwright/issues/12345'
  });
  
  // Attach custom data
  await testInfo.attach('debug-info', {
    body: JSON.stringify({ custom: 'data' }),
    contentType: 'application/json'
  });
  
  await page.goto('https://example.com');
});
```

---

# 3. Test Stability and Flaky Tests

## 3.1 Ten Examples to Improve Test Stability

### 1. Use Proper Wait Strategies

**❌ Bad Practice:**
```javascript
test('bad wait', async ({ page }) => {
  await page.goto('https://example.com');
  await page.waitForTimeout(5000); // Fixed timeout - unreliable!
  await page.click('.dynamic-button');
});
```

**✅ Good Practice:**
```javascript
test('good wait', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Wait for element to be visible and ready
  await page.waitForSelector('.dynamic-button', { state: 'visible' });
  
  // Even better: use auto-waiting
  await page.click('.dynamic-button'); // Playwright waits automatically
  
  // Wait for network to be idle
  await page.waitForLoadState('networkidle');
  
  // Wait for specific API call
  await page.waitForResponse(response => 
    response.url().includes('/api/data') && response.status() === 200
  );
});
```

---

### 2. Use Resilient Selectors

**❌ Bad Practice:**
```javascript
test('fragile selectors', async ({ page }) => {
  await page.click('body > div > div > div:nth-child(3) > button'); // Breaks easily
  await page.click('.btn-primary'); // Class might change
  await page.fill('#email'); // ID might change
});
```

**✅ Good Practice:**
```javascript
test('resilient selectors', async ({ page }) => {
  // Use test IDs
  await page.click('[data-testid="submit-button"]');
  
  // Use text content
  await page.click('button:has-text("Submit")');
  
  // Use role
  await page.click('role=button[name="Submit"]');
  
  // Use accessible name
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Use label association
  await page.getByLabel('Email address').fill('test@example.com');
  
  // Use placeholder
  await page.getByPlaceholder('Enter your email').fill('test@example.com');
});
```

---

### 3. Handle Network Conditions

**❌ Bad Practice:**
```javascript
test('assumes instant network', async ({ page }) => {
  await page.goto('https://example.com');
  const data = await page.locator('.data').textContent();
  // Might fail on slow network
});
```

**✅ Good Practice:**
```javascript
test('handles network properly', async ({ page }) => {
  // Increase timeout for slow networks
  await page.goto('https://example.com', {
    waitUntil: 'networkidle',
    timeout: 60000
  });
  
  // Wait for specific API call
  const responsePromise = page.waitForResponse(
    response => response.url().includes('/api/data') && response.ok()
  );
  
  await page.click('button[data-testid="load-data"]');
  const response = await responsePromise;
  
  // Wait for data to be displayed
  await expect(page.locator('.data')).toBeVisible({ timeout: 30000 });
  
  const data = await page.locator('.data').textContent();
});
```

**Mock slow network for testing:**
```javascript
test('test with slow network', async ({ page, context }) => {
  // Emulate slow 3G
  await context.route('**/*', route => {
    setTimeout(() => route.continue(), 1000); // Add 1s delay
  });
  
  await page.goto('https://example.com');
});
```

---

### 4. Isolate Tests with Proper Cleanup

**❌ Bad Practice:**
```javascript
test.describe('User tests', () => {
  let userId;
  
  test('create user', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: { name: 'Test User' }
    });
    userId = (await response.json()).id;
  });
  
  test('get user', async ({ request }) => {
    // Depends on previous test - flaky!
    const response = await request.get(`/api/users/${userId}`);
  });
});
```

**✅ Good Practice:**
```javascript
test.describe('User tests', () => {
  let userId;
  
  test.beforeEach(async ({ request }) => {
    // Create fresh user for each test
    const response = await request.post('/api/users', {
      data: { name: 'Test User' }
    });
    userId = (await response.json()).id;
  });
  
  test.afterEach(async ({ request }) => {
    // Cleanup after each test
    if (userId) {
      await request.delete(`/api/users/${userId}`);
    }
  });
  
  test('get user', async ({ request }) => {
    const response = await request.get(`/api/users/${userId}`);
    expect(response.ok()).toBeTruthy();
  });
  
  test('update user', async ({ request }) => {
    const response = await request.patch(`/api/users/${userId}`, {
      data: { name: 'Updated Name' }
    });
    expect(response.ok()).toBeTruthy();
  });
});
```

---

### 5. Use Test Fixtures for Setup

**❌ Bad Practice:**
```javascript
test('login test', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="username"]', 'testuser');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
  
  // Now do the actual test...
  // This setup is repeated in many tests!
});
```

**✅ Good Practice:**
```javascript
// fixtures/auth.js
import { test as base } from '@playwright/test';

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Setup: Login
    await page.goto('/login');
    await page.fill('[name="username"]', 'testuser');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
    
    // Provide authenticated page to test
    await use(page);
    
    // Teardown: Logout
    await page.click('[data-testid="logout"]');
  }
});

// Use in tests
test('dashboard test', async ({ authenticatedPage }) => {
  // Already logged in, just test
  await expect(authenticatedPage.locator('h1')).toHaveText('Dashboard');
});
```

---

### 6. Avoid Race Conditions

**❌ Bad Practice:**
```javascript
test('race condition', async ({ page }) => {
  await page.goto('https://example.com');
  
  // These might execute before page fully loads
  page.click('button#first');
  page.click('button#second');
  page.click('button#third');
});
```

**✅ Good Practice:**
```javascript
test('no race condition', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Use await to ensure sequential execution
  await page.click('button#first');
  await page.waitForSelector('.first-result');
  
  await page.click('button#second');
  await page.waitForSelector('.second-result');
  
  await page.click('button#third');
  await expect(page.locator('.third-result')).toBeVisible();
});
```

**Handle concurrent operations properly:**
```javascript
test('parallel operations', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Use Promise.all for truly independent operations
  await Promise.all([
    page.click('button#independent1'),
    page.click('button#independent2'),
    page.click('button#independent3')
  ]);
  
  // But wait for all results
  await expect(page.locator('.all-done')).toBeVisible();
});
```

---

### 7. Handle Dynamic Content

**❌ Bad Practice:**
```javascript
test('dynamic content', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Element might not exist yet
  const text = await page.locator('.dynamic-content').textContent();
  expect(text).toContain('Expected');
});
```

**✅ Good Practice:**
```javascript
test('handle dynamic content', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Wait for content to appear
  const locator = page.locator('.dynamic-content');
  await expect(locator).toBeVisible();
  await expect(locator).toContainText('Expected');
  
  // Or wait for specific condition
  await locator.waitFor({ state: 'visible', timeout: 10000 });
  
  // For API-driven content
  await page.waitForResponse(response =>
    response.url().includes('/api/content') && response.ok()
  );
  
  await expect(locator).toContainText('Expected');
});
```

**Handle loading states:**
```javascript
test('handle loading states', async ({ page }) => {
  await page.goto('https://example.com');
  
  await page.click('button[data-testid="load-data"]');
  
  // Wait for loading indicator to appear
  await expect(page.locator('.loading-spinner')).toBeVisible();
  
  // Wait for loading to finish
  await expect(page.locator('.loading-spinner')).not.toBeVisible({
    timeout: 30000
  });
  
  // Now interact with loaded content
  await expect(page.locator('.data-container')).toBeVisible();
});
```

---

### 8. Use Stable Test Data

**❌ Bad Practice:**
```javascript
test('search for latest item', async ({ page }) => {
  await page.goto('/products');
  
  // Searching for dynamic data - might not exist tomorrow!
  await page.fill('[name="search"]', 'Latest Product 2024');
  await page.click('button[type="submit"]');
  
  await expect(page.locator('.product-result').first()).toBeVisible();
});
```

**✅ Good Practice:**
```javascript
test('search with stable data', async ({ page, request }) => {
  // Create test data first
  const response = await request.post('/api/products', {
    data: {
      name: 'Test Product Stable',
      sku: 'TEST-STABLE-001',
      price: 99.99
    }
  });
  
  const product = await response.json();
  
  await page.goto('/products');
  await page.fill('[name="search"]', product.sku);
  await page.click('button[type="submit"]');
  
  await expect(page.locator('.product-result').first()).toContainText(product.name);
  
  // Cleanup
  await request.delete(`/api/products/${product.id}`);
});
```

**Use test database:**
```javascript
// playwright.config.js
export default defineConfig({
  use: {
    baseURL: process.env.CI 
      ? 'https://test.example.com' 
      : 'http://localhost:3000',
  },
  
  webServer: {
    command: 'npm run test:server', // Starts server with test DB
    port: 3000,
    reuseExistingServer: !process.env.CI
  }
});
```

---

### 9. Implement Proper Error Handling

**❌ Bad Practice:**
```javascript
test('no error handling', async ({ page }) => {
  await page.goto('https://example.com');
  await page.click('button'); // Might fail with no context
  const text = await page.locator('.result').textContent(); // Might be null
  expect(text.length).toBeGreaterThan(0); // Crashes if text is null
});
```

**✅ Good Practice:**
```javascript
test('proper error handling', async ({ page }) => {
  try {
    await page.goto('https://example.com', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    const button = page.locator('button[data-testid="submit"]');
    await expect(button).toBeVisible({ timeout: 10000 });
    await button.click();
    
    const resultLocator = page.locator('.result');
    await expect(resultLocator).toBeVisible({ timeout: 15000 });
    
    const text = await resultLocator.textContent();
    expect(text).toBeTruthy();
    expect(text.length).toBeGreaterThan(0);
    
  } catch (error) {
    // Take screenshot for debugging
    await page.screenshot({
      path: `error-${Date.now()}.png`,
      fullPage: true
    });
    
    // Log helpful information
    console.error('Test failed:', {
      url: page.url(),
      error: error.message,
      timestamp: new Date().toISOString()
    });
    
    throw error;
  }
});
```

**Soft assertions for non-critical checks:**
```javascript
test('soft assertions', async ({ page }) => {
  await page.goto('https://example.com');
  
  // These won't stop test execution
  await expect.soft(page.locator('.logo')).toBeVisible();
  await expect.soft(page.locator('.footer')).toBeVisible();
  
  // Critical assertion
  await expect(page.locator('.main-content')).toBeVisible();
  
  // Test continues even if soft assertions fail
  // All failures reported at the end
});
```

---

### 10. Configure Appropriate Timeouts

**❌ Bad Practice:**
```javascript
// playwright.config.js
export default defineConfig({
  timeout: 10000, // Too short for complex tests
  expect: {
    timeout: 1000 // Too short for assertions
  }
});

test('timeout issues', async ({ page }) => {
  await page.goto('https://slow-site.com'); // Might timeout
  await page.click('button'); // Might timeout
  await expect(page.locator('.result')).toBeVisible(); // Might timeout
});
```

**✅ Good Practice:**
```javascript
// playwright.config.js
export default defineConfig({
  timeout: 60000, // 60 seconds for test
  
  expect: {
    timeout: 10000 // 10 seconds for assertions
  },
  
  use: {
    actionTimeout: 15000, // 15 seconds for actions
    navigationTimeout: 30000 // 30 seconds for navigation
  }
});

test('proper timeouts', async ({ page }) => {
  // Override timeout for specific action
  await page.goto('https://slow-site.com', {
    timeout: 45000
  });
  
  // Override timeout for specific assertion
  await expect(page.locator('.slow-loading-element')).toBeVisible({
    timeout: 20000
  });
  
  // Override timeout for entire test
  test.setTimeout(120000); // 2 minutes
});
```

**Conditional timeouts:**
```javascript
test('conditional timeout', async ({ page }) => {
  const timeout = process.env.CI ? 60000 : 30000;
  
  await page.goto('https://example.com', { timeout });
  
  await expect(page.locator('.content')).toBeVisible({ timeout });
});
```

---

## 3.2 Five Examples for Handling Flaky Tests

### 11. Use Test Retries Strategically

**Configuration:**
```javascript
// playwright.config.js
export default defineConfig({
  retries: process.env.CI ? 2 : 0, // Retry in CI, not locally
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      retries: 1 // Project-specific retries
    }
  ]
});
```

**Per-test retry configuration:**
```javascript
test.describe('Flaky API tests', () => {
  test.describe.configure({ retries: 3 }); // All tests in this suite retry 3 times
  
  test('flaky API call', async ({ request }) => {
    const response = await request.get('/api/unreliable-endpoint');
    expect(response.ok()).toBeTruthy();
  });
});

test('single flaky test', async ({ page }) => {
  test.info().retry = 2; // This test retries twice
  
  await page.goto('https://unreliable-site.com');
  await expect(page.locator('.content')).toBeVisible();
});
```

**Smart retry with fixture:**
```javascript
import { test as base } from '@playwright/test';

export const test = base.extend({
  autoRetryPage: async ({ page }, use, testInfo) => {
    const maxRetries = 3;
    let attempts = 0;
    
    const retryableGoto = async (url) => {
      while (attempts < maxRetries) {
        try {
          await page.goto(url, { timeout: 30000 });
          break;
        } catch (error) {
          attempts++;
          if (attempts >= maxRetries) throw error;
          console.log(`Retry ${attempts}/${maxRetries} for ${url}`);
          await page.waitForTimeout(1000 * attempts); // Exponential backoff
        }
      }
    };
    
    page.retryableGoto = retryableGoto;
    await use(page);
  }
});

test('use retryable goto', async ({ autoRetryPage }) => {
  await autoRetryPage.retryableGoto('https://unreliable-site.com');
});
```

---

### 12. Implement Wait Polling Strategies

**❌ Flaky:**
```javascript
test('flaky check', async ({ page }) => {
  await page.goto('https://example.com');
  await page.click('button');
  await page.waitForTimeout(2000); // Fixed wait - unreliable
  expect(await page.locator('.result').textContent()).toBe('Success');
});
```

**✅ Stable with polling:**
```javascript
test('stable with polling', async ({ page }) => {
  await page.goto('https://example.com');
  await page.click('button');
  
  // Poll until condition is met
  await page.waitForFunction(() => {
    const element = document.querySelector('.result');
    return element && element.textContent === 'Success';
  }, { timeout: 10000, polling: 100 }); // Check every 100ms
  
  await expect(page.locator('.result')).toHaveText('Success');
});
```

**Custom polling utility:**
```javascript
async function pollUntil(checkFunction, options = {}) {
  const {
    timeout = 10000,
    interval = 100,
    errorMessage = 'Polling timeout'
  } = options;
  
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    try {
      const result = await checkFunction();
      if (result) return result;
    } catch (error) {
      // Continue polling on error
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  throw new Error(errorMessage);
}

test('use polling utility', async ({ page, request }) => {
  await page.goto('https://example.com');
  await page.click('button[data-testid="process"]');
  
  // Poll API until processing is complete
  const result = await pollUntil(
    async () => {
      const response = await request.get('/api/status');
      const data = await response.json();
      return data.status === 'complete' ? data : null;
    },
    {
      timeout: 30000,
      interval: 500,
      errorMessage: 'Processing did not complete in time'
    }
  );
  
  expect(result.status).toBe('complete');
});
```

---

### 13. Add Pre-Test Health Checks

**❌ No health check:**
```javascript
test('checkout flow', async ({ page }) => {
  // Starts test without checking if system is ready
  await page.goto('/checkout');
  // Test might fail if backend is down
});
```

**✅ With health check:**
```javascript
test.beforeEach(async ({ request }) => {
  // Check if backend is healthy
  const maxAttempts = 5;
  let attempt = 0;
  
  while (attempt < maxAttempts) {
    try {
      const response = await request.get('/api/health', { timeout: 5000 });
      
      if (response.ok()) {
        const health = await response.json();
        
        if (health.status === 'healthy') {
          console.log('✅ System health check passed');
          return;
        }
      }
    } catch (error) {
      console.log(`Health check attempt ${attempt + 1}/${maxAttempts} failed`);
    }
    
    attempt++;
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  throw new Error('System not healthy - skipping test');
});

test('checkout flow', async ({ page }) => {
  // System is confirmed healthy
  await page.goto('/checkout');
  // Rest of test...
});
```

**Comprehensive health check fixture:**
```javascript
import { test as base } from '@playwright/test';

export const test = base.extend({
  healthCheckedContext: async ({ request, context }, use) => {
    // Check multiple endpoints
    const checks = [
      { name: 'API', url: '/api/health' },
      { name: 'Database', url: '/api/db-health' },
      { name: 'Cache', url: '/api/cache-health' }
    ];
    
    for (const check of checks) {
      try {
        const response = await request.get(check.url, { timeout: 5000 });
        
        if (!response.ok()) {
          throw new Error(`${check.name} health check failed: ${response.status()}`);
        }
        
        console.log(`✅ ${check.name} is healthy`);
      } catch (error) {
        console.error(`❌ ${check.name} health check failed:`, error.message);
        throw error;
      }
    }
    
    await use(context);
  }
});

test('test with health checks', async ({ page, healthCheckedContext }) => {
  // All systems checked and healthy
  await page.goto('/checkout');
});
```

---

### 14. Implement Exponential Backoff for Retries

**❌ Immediate retry:**
```javascript
test('API with immediate retry', async ({ request }) => {
  let response;
  for (let i = 0; i < 3; i++) {
    response = await request.get('/api/flaky');
    if (response.ok()) break;
    // No delay - hammers the server
  }
  expect(response.ok()).toBeTruthy();
});
```

**✅ Exponential backoff:**
```javascript
async function fetchWithExponentialBackoff(request, url, maxRetries = 5) {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await request.get(url);
      
      if (response.ok()) {
        return response;
      }
      
      // Retry on 5xx errors
      if (response.status() >= 500) {
        throw new Error(`Server error: ${response.status()}`);
      }
      
      // Don't retry on 4xx errors
      return response;
      
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s, 8s, 16s
        const delayMs = Math.min(1000 * Math.pow(2, attempt), 30000);
        console.log(`Attempt ${attempt + 1} failed, retrying in ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }
  
  throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`);
}

test('API with exponential backoff', async ({ request }) => {
  const response = await fetchWithExponentialBackoff(
    request,
    '/api/flaky-endpoint'
  );
  
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data).toBeTruthy();
});
```

**Exponential backoff with jitter:**
```javascript
async function fetchWithBackoffAndJitter(request, url, options = {}) {
  const {
    maxRetries = 5,
    baseDelay = 1000,
    maxDelay = 30000,
    jitter = true
  } = options;
  
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await request.get(url);
      
      if (response.ok()) {
        return response;
      }
      
      if (response.status() >= 500) {
        throw new Error(`Server error: ${response.status()}`);
      }
      
      return response;
      
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries - 1) {
        // Calculate delay with exponential backoff
        let delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
        
        // Add jitter (randomness) to prevent thundering herd
        if (jitter) {
          delay = delay * (0.5 + Math.random() * 0.5);
        }
        
        console.log(`Attempt ${attempt + 1}/${maxRetries} failed, retrying in ${Math.round(delay)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`);
}

test('API with backoff and jitter', async ({ request }) => {
  const response = await fetchWithBackoffAndJitter(
    request,
    '/api/highly-flaky-endpoint',
    {
      maxRetries: 7,
      baseDelay: 500,
      maxDelay: 20000,
      jitter: true
    }
  );
  
  expect(response.ok()).toBeTruthy();
});
```

---

### 15. Use Test Annotations and Conditional Execution

**Mark flaky tests:**
```javascript
test('known flaky test', async ({ page }) => {
  test.info().annotations.push({
    type: 'issue',
    description: 'https://github.com/project/issues/123'
  });
  
  test.fixme(
    process.env.CI === 'true',
    'Flaky in CI - investigating'
  );
  
  await page.goto('https://example.com');
  // Test logic...
});
```

**Conditional test execution:**
```javascript
test('run only in stable environment', async ({ page }) => {
  test.skip(
    process.env.ENVIRONMENT === 'staging',
    'Staging environment is unstable'
  );
  
  test.skip(
    new Date().getHours() >= 22 || new Date().getHours() <= 6,
    'Skip during maintenance window'
  );
  
  await page.goto('https://example.com');
  // Test logic...
});
```

**Flaky test handler:**
```javascript
import { test as base } from '@playwright/test';

export const test = base.extend({
  flakyTestHandler: async ({}, use, testInfo) => {
    const originalTimeout = testInfo.timeout;
    
    // Increase timeout for flaky tests
    if (testInfo.annotations.some(a => a.type === 'flaky')) {
      testInfo.timeout = originalTimeout * 2;
      console.log('⚠️  Flaky test detected - increased timeout');
    }
    
    await use({});
    
    // Log flaky test results
    if (testInfo.annotations.some(a => a.type === 'flaky')) {
      console.log(`Flaky test result: ${testInfo.status}`);
      console.log(`Attempts: ${testInfo.retry + 1}`);
      
      if (testInfo.status === 'failed') {
        console.log('🔴 Flaky test failed - needs investigation');
      } else if (testInfo.retry > 0) {
        console.log('🟡 Flaky test passed after retry');
      }
    }
  }
});

test('flaky network test', async ({ page, flakyTestHandler }) => {
  test.info().annotations.push({ type: 'flaky', description: 'Network dependent' });
  
  await page.goto('https://example.com');
  // Test logic...
});
```

**Quarantine flaky tests:**
```javascript
// playwright.config.js
export default defineConfig({
  projects: [
    {
      name: 'stable',
      testMatch: /(?<!\.flaky)\.spec\.ts$/, // Exclude .flaky.spec.ts files
    },
    {
      name: 'quarantine',
      testMatch: /\.flaky\.spec\.ts$/, // Only .flaky.spec.ts files
      retries: 3,
      timeout: 120000
    }
  ]
});
```

**Usage:**
```bash
# Run only stable tests
npx playwright test --project=stable

# Run quarantined tests
npx playwright test --project=quarantine

# Run all tests
npx playwright test
```

**Smart flaky test reporter:**
```javascript
// flaky-test-reporter.js
class FlakyTestReporter {
  constructor() {
    this.flakyTests = [];
  }
  
  onTestEnd(test, result) {
    // Track tests that passed after retry
    if (result.status === 'passed' && result.retry > 0) {
      this.flakyTests.push({
        title: test.title,
        file: test.location.file,
        line: test.location.line,
        retries: result.retry,
        duration: result.duration
      });
    }
  }
  
  onEnd() {
    if (this.flakyTests.length > 0) {
      console.log('\n⚠️  FLAKY TESTS DETECTED:\n');
      
      this.flakyTests.forEach(test => {
        console.log(`  ❌ ${test.title}`);
        console.log(`     File: ${test.file}:${test.line}`);
        console.log(`     Passed after ${test.retries} retries`);
        console.log(`     Duration: ${test.duration}ms\n`);
      });
      
      console.log(`Total flaky tests: ${this.flakyTests.length}`);
      console.log('⚠️  These tests need to be stabilized!\n');
    }
  }
}

module.exports = FlakyTestReporter;
```

**Use the reporter:**
```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['html'],
    ['./flaky-test-reporter.js']
  ],
  retries: 2
});
```

---

## Summary

### Key Takeaways

#### Reports
- Use built-in reporters for basic needs (HTML, JSON, JUnit)
- Combine multiple reporters for comprehensive reporting
- Leverage third-party reporters for advanced features (Allure, ReportPortal)
- Consider paid solutions for enterprise features (TestRail, Xray)

#### Debugging
- Use VS Code Playwright extension for interactive debugging
- Enable traces and videos for post-mortem analysis
- Implement structured logging for API tests
- Use Playwright Inspector for step-by-step execution

#### Stability
- Always use proper wait strategies (never use fixed timeouts)
- Choose resilient selectors (test IDs, roles, accessible names)
- Handle network conditions and loading states properly
- Isolate tests and use fixtures for setup/cleanup
- Configure appropriate timeouts for different environments

#### Flaky Tests
- Implement smart retry strategies with exponential backoff
- Use polling instead of fixed waits
- Add health checks before tests
- Mark and track flaky tests for investigation
- NEVER just skip flaky tests - fix them!

---

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright GitHub](https://github.com/microsoft/playwright)
- [Playwright Community Discord](https://discord.com/invite/playwright)

---

## Questions?

Happy Testing! 🎭🧪
