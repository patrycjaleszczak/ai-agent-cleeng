# Playwright Quick Reference Guide

## 🎯 For QA Trainers and Students

---

## Reports Cheat Sheet

### Built-in Reporters
```bash
# HTML (default)
npx playwright test --reporter=html

# List
npx playwright test --reporter=list

# JSON
npx playwright test --reporter=json

# JUnit
npx playwright test --reporter=junit

# Multiple
npx playwright test --reporter=html,json,list
```

### Popular Third-Party Reporters

| Reporter | Type | Best For | Cost |
|----------|------|----------|------|
| Allure | Open Source | Rich visualization, trends | Free |
| Monocart | Open Source | Modern UI, coverage | Free |
| ReportPortal | Open Source | Enterprise dashboard, ML | Free |
| TestRail | Commercial | Test management | $37+/user/month |
| Xray | Commercial | Jira integration | $10+/user/month |
| Katalon TestOps | Hybrid | Orchestration, analytics | Free tier available |

---

## Debugging Quick Commands

### VS Code
```bash
# Debug with inspector
npx playwright test --debug

# Debug specific test
npx playwright test --debug test.spec.ts:10

# UI Mode
npx playwright test --ui
```

### Logs
```bash
# Verbose output
npx playwright test --reporter=list --verbose

# Browser logs
DEBUG=pw:browser npx playwright test

# API logs
DEBUG=pw:api npx playwright test

# All logs
DEBUG=pw:* npx playwright test
```

### Traces
```bash
# View trace
npx playwright show-trace trace.zip

# Run with trace
npx playwright test --trace on
```

---

## Stability Checklist

### ✅ Do's

1. **Use auto-waiting**
   ```javascript
   await page.click('button'); // Waits automatically
   ```

2. **Use test IDs**
   ```javascript
   await page.click('[data-testid="submit"]');
   ```

3. **Wait for network**
   ```javascript
   await page.waitForLoadState('networkidle');
   ```

4. **Handle loading states**
   ```javascript
   await expect(page.locator('.spinner')).not.toBeVisible();
   ```

5. **Use fixtures**
   ```javascript
   test.beforeEach(async ({ page }) => {
     // Setup
   });
   ```

6. **Proper assertions**
   ```javascript
   await expect(locator).toBeVisible();
   ```

7. **Set appropriate timeouts**
   ```javascript
   await page.goto(url, { timeout: 30000 });
   ```

8. **Create test data**
   ```javascript
   await request.post('/api/test-data');
   ```

9. **Use error handling**
   ```javascript
   try { } catch (error) { }
   ```

10. **Clean up after tests**
    ```javascript
    test.afterEach(async () => { });
    ```

### ❌ Don'ts

1. ~~`await page.waitForTimeout(5000)`~~ - Use smart waits
2. ~~`div > div > button:nth-child(3)`~~ - Use stable selectors
3. ~~Test dependencies~~ - Isolate tests
4. ~~Shared state~~ - Use fixtures
5. ~~Skipping flaky tests~~ - Fix them!

---

## Flaky Test Solutions

### 1. Retries with Exponential Backoff
```javascript
const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
await new Promise(resolve => setTimeout(resolve, delay));
```

### 2. Polling
```javascript
await page.waitForFunction(() => {
  return document.querySelector('.result')?.textContent === 'Done';
}, { timeout: 10000, polling: 100 });
```

### 3. Health Checks
```javascript
test.beforeEach(async ({ request }) => {
  const response = await request.get('/api/health');
  expect(response.ok()).toBeTruthy();
});
```

### 4. Mark Flaky Tests
```javascript
test.info().annotations.push({
  type: 'flaky',
  description: 'Investigating network issues'
});
```

### 5. Conditional Execution
```javascript
test.skip(process.env.ENVIRONMENT === 'staging', 'Unstable');
```

---

## Common Patterns

### Login Fixture
```javascript
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('[name="username"]', 'user');
    await page.fill('[name="password"]', 'pass');
    await page.click('button[type="submit"]');
    await use(page);
  }
});
```

### API Logger
```javascript
class Logger {
  log(level, message, data) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFile, `[${timestamp}] [${level}] ${message}\n`);
  }
}
```

### Network Monitor
```javascript
page.on('request', req => console.log('➡️', req.url()));
page.on('response', res => console.log('⬅️', res.url()));
page.on('requestfailed', req => console.log('❌', req.url()));
```

---

## Configuration Template

```javascript
// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { open: 'on-failure' }],
    ['json', { outputFile: 'results.json' }],
    ['list']
  ],
  
  use: {
    baseURL: 'https://example.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  
  expect: {
    timeout: 10000
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

---

## Troubleshooting

### Test Timeout
- Increase timeout
- Check network conditions
- Look for blocked requests
- Verify selectors

### Flaky Test
- Add proper waits
- Check for race conditions
- Review selectors
- Verify test isolation

### Selector Not Found
- Use Playwright Inspector
- Check for dynamic content
- Verify element visibility
- Use waitForSelector

### Network Issues
- Add network idle wait
- Increase timeout
- Check CORS
- Monitor failed requests

---

## Best Practices Summary

1. **Always use data-testid** for stable selectors
2. **Never use fixed timeouts** - use smart waits
3. **Isolate tests** - no dependencies between tests
4. **Clean up test data** - use beforeEach/afterEach
5. **Handle loading states** explicitly
6. **Log meaningful information** for debugging
7. **Use fixtures** for common setup
8. **Configure retries** appropriately for environment
9. **Monitor flaky tests** and fix them
10. **Document known issues** with annotations

---

## Resources

- 📚 [Playwright Docs](https://playwright.dev/)
- 🎓 [Playwright University](https://playwright.dev/docs/intro)
- 💬 [Discord Community](https://discord.com/invite/playwright)
- 🐛 [GitHub Issues](https://github.com/microsoft/playwright/issues)
- 📹 [YouTube Channel](https://www.youtube.com/@Playwrightdev)

---

**Remember:** The goal is not to skip flaky tests, but to understand and fix them! 🎭
