---
title: "Playwright: Reporting, Debugging & Stability"
subtitle: "Complete Workshop for QA Automation Engineers"
author: "QA Training"
date: "2025"
theme: "default"
---

<!-- Slide 1 -->
# Playwright Workshop
## Reporting, Debugging & Test Stability

### 🎭 1.5 Hour Hands-On Workshop

**Your Instructor:** [Your Name]

**Today's Goal:** Master the tools to write stable, debuggable tests with excellent reporting

---

<!-- Slide 2 -->
## 📋 Workshop Agenda

| Time | Topic | Duration |
|------|-------|----------|
| 0:00 - 0:25 | **Reports & Reporters** | 25 min |
| 0:25 - 0:50 | **Debugging & Analysis** | 25 min |
| 0:50 - 1:20 | **Test Stability** | 30 min |
| 1:20 - 1:30 | **Q&A & Wrap-up** | 10 min |

---

<!-- Slide 3 -->
# Part 1: Reports & Reporters
## 25 Minutes

---

<!-- Slide 4 -->
## Why Reporting Matters

### Different Stakeholders, Different Needs

- **Developers** → Quick failure details
- **QA Managers** → Trends and metrics
- **Product Owners** → Feature coverage
- **DevOps** → CI/CD integration

### One Test Suite, Multiple Reports! 📊

---

<!-- Slide 5 -->
## Built-in Reporters Overview

| Reporter | Use Case | Output |
|----------|----------|--------|
| **HTML** | Interactive, detailed | Web UI |
| **List** | CI/CD, terminal | Text |
| **JSON** | Tool integration | JSON file |
| **JUnit** | Jenkins, Azure | XML file |
| **Dot** | Minimal output | Terminal |
| **GitHub** | PR annotations | GitHub UI |

---

<!-- Slide 6 -->
## HTML Reporter - The Default

```javascript
// playwright.config.js
export default defineConfig({
  reporter: 'html',
});
```

**Run and view:**
```bash
npx playwright test
npx playwright show-report
```

### Features:
✅ Screenshots & Videos  
✅ Trace files  
✅ Filter & Search  
✅ Time-travel debugging  

---

<!-- Slide 7 -->
## Multiple Reporters Configuration

```javascript
// playwright.config.js
export default defineConfig({
  reporter: [
    ['html', { open: 'on-failure' }],
    ['json', { outputFile: 'results.json' }],
    ['junit', { outputFile: 'results.xml' }],
    ['list']
  ],
});
```

### Get the best of all worlds! 🌍

---

<!-- Slide 8 -->
## Third-Party Reporters: FREE Options

### 🆓 Allure Reporter - Most Popular

```bash
npm install --save-dev allure-playwright
```

```javascript
reporter: [['allure-playwright', {
  outputFolder: 'allure-results',
  detail: true
}]]
```

**Generate Report:**
```bash
npx allure generate ./allure-results --clean
npx allure open ./allure-report
```

---

<!-- Slide 9 -->
## Allure Features

### Why Teams Love Allure:

- 📈 **Historical Trends** - Track test health over time
- 🎯 **Test Categories** - Organize by feature/severity
- ⏱️ **Timeline View** - See parallel execution
- 📎 **Rich Attachments** - Logs, screenshots, videos
- 🔍 **Detailed Reports** - Every step documented

### 100% FREE & Open Source!

---

<!-- Slide 10 -->
## Other Free Reporters

| Reporter | Best For | Key Feature |
|----------|----------|-------------|
| **Monocart** | Coverage + Reports | Code coverage integration |
| **ReportPortal** | Enterprise | ML-based analysis |
| **Tesults** | Cloud storage | Team collaboration |

**All offer free tiers for small teams!**

---

<!-- Slide 11 -->
## Paid Solutions - When to Use?

### 💰 TestRail, Xray, Katalon TestOps

**Consider paid solutions when:**
- Team > 10 people
- Need test management features
- Require Jira integration
- Want advanced analytics
- Need enterprise support

**Starting from $10-37/user/month**

---

<!-- Slide 12 -->
## 🎯 DEMO: Reporters in Action

### Live Coding Demo (5 minutes)

1. Configure multiple reporters
2. Run sample tests
3. Explore HTML report
4. Generate Allure report
5. Compare outputs

**Follow along if you have time!**

---

<!-- Slide 13 -->
# Part 2: Debugging & Analysis
## 25 Minutes

---

<!-- Slide 14 -->
## Debugging Arsenal

### Your Debugging Tools:

1. **VS Code Integration** 🔧
2. **Playwright Inspector** 🔍
3. **Logging Strategies** 📝
4. **Traces** 📹
5. **Screenshots & Videos** 📸

### Never be stuck debugging again!

---

<!-- Slide 15 -->
## VS Code Setup

### Install Playwright Extension

1. Open Extensions (Ctrl+Shift+X)
2. Search "Playwright Test for VSCode"
3. Install official extension

### Instant Benefits:
- ▶️ Run tests with one click
- 🐛 Debug with breakpoints
- 👁️ Watch mode
- 📊 Test explorer

---

<!-- Slide 16 -->
## VS Code Configuration

**Create `.vscode/launch.json`:**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Playwright Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/@playwright/test/cli.js",
      "args": ["test", "--debug", "${file}"],
      "console": "integratedTerminal"
    }
  ]
}
```

---

<!-- Slide 17 -->
## Playwright Inspector

### Launch Inspector:

```bash
# Debug specific test
npx playwright test --debug test.spec.ts

# Debug specific line
npx playwright test --debug test.spec.ts:10

# UI Mode (Recommended!)
npx playwright test --ui
```

### Inspector Powers:
✅ Step through execution  
✅ Pick selectors  
✅ Record actions  
✅ View console  

---

<!-- Slide 18 -->
## Using `page.pause()`

```javascript
import { test, expect } from '@playwright/test';

test('debug example', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Opens Inspector automatically
  await page.pause();
  
  await page.click('button');
  await expect(page).toHaveTitle(/Example/);
});
```

### Perfect for investigating issues! 🔍

---

<!-- Slide 19 -->
## Logging Strategies

### Three Levels of Logging:

```javascript
// 1. Console logs
console.log('🚀 Test started');

// 2. Browser console capture
page.on('console', msg => {
  console.log(`[${msg.type()}] ${msg.text()}`);
});

// 3. Network monitoring
page.on('request', req => 
  console.log('➡️', req.url())
);
```

---

<!-- Slide 20 -->
## File Logging for API Tests

```javascript
import fs from 'fs';

test('API with logging', async ({ request }, testInfo) => {
  const logFile = `logs/${testInfo.title}.log`;
  
  const log = (msg) => {
    fs.appendFileSync(logFile, 
      `[${new Date().toISOString()}] ${msg}\n`
    );
  };
  
  log('Starting API test');
  const response = await request.get('/api/users');
  log(`Status: ${response.status()}`);
  log(`Body: ${JSON.stringify(await response.json())}`);
});
```

---

<!-- Slide 21 -->
## Professional Logger Class

```javascript
export class TestLogger {
  constructor(testInfo) {
    this.logFile = `logs/${testInfo.title}.log`;
  }
  
  info(message, data) {
    this.log('INFO', message, data);
  }
  
  error(message, data) {
    this.log('ERROR', message, data);
  }
  
  log(level, message, data) {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(this.logFile, log);
  }
}
```

---

<!-- Slide 22 -->
## Debug with Environment Variables

```bash
# Show browser logs
DEBUG=pw:browser npx playwright test

# Show API calls
DEBUG=pw:api npx playwright test

# Show everything
DEBUG=pw:* npx playwright test

# Verbose output
npx playwright test --reporter=list --verbose
```

### Quick debugging without code changes! ⚡

---

<!-- Slide 23 -->
## Traces - Time Travel Debugging

**Enable in config:**
```javascript
export default defineConfig({
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});
```

**View trace:**
```bash
npx playwright show-trace trace.zip
```

### See EVERYTHING that happened! 🎬

---

<!-- Slide 24 -->
## What Traces Include

### Complete Test Execution Details:

- 📸 Screenshots at every step
- 🌐 Network requests/responses
- 📝 Console logs
- 🎯 Action timeline
- 📊 Performance metrics
- 🔍 DOM snapshots

**It's like a DVR for your tests!**

---

<!-- Slide 25 -->
## 🎯 DEMO: Debugging in Action

### Live Debugging Demo (5 minutes)

1. Set breakpoint in VS Code
2. Debug failing test
3. Use Inspector to find selector
4. Add logging
5. View trace file

**The tools that save hours!**

---

<!-- Slide 26 -->
# Part 3: Test Stability
## 30 Minutes - The Most Important Section!

---

<!-- Slide 27 -->
## The Stability Challenge

### Reality Check:
- 😢 **70% stability** = 3/10 tests fail randomly
- 😐 **90% stability** = 1/10 tests fail randomly  
- 😊 **99% stability** = 1/100 tests fail randomly

### Our Goal Today:
# 99%+ Stability 🎯

---

<!-- Slide 28 -->
## Rule #1: NEVER Use Fixed Timeouts

### ❌ BAD - Unreliable & Slow
```javascript
await page.waitForTimeout(5000); // DON'T!
await page.click('button');
```

### ✅ GOOD - Fast & Reliable
```javascript
await page.click('button'); // Auto-waits!

// Or explicit wait:
await page.waitForSelector('button', { 
  state: 'visible' 
});
```

**Playwright waits automatically!** ⚡

---

<!-- Slide 29 -->
## Rule #2: Use Stable Selectors

### ❌ BAD - Fragile Selectors
```javascript
await page.click('div > div > button:nth-child(3)');
await page.click('.btn-primary'); // Classes change!
```

### ✅ GOOD - Resilient Selectors
```javascript
await page.click('[data-testid="submit"]');
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabel('Email').fill('test@example.com');
```

**Use test IDs and roles!** 🎯

---

<!-- Slide 30 -->
## Rule #3: Handle Network Properly

### ❌ BAD - Assumes Instant Network
```javascript
await page.goto('https://example.com');
const text = await page.locator('.data').textContent();
// Fails on slow network!
```

### ✅ GOOD - Wait for Everything
```javascript
await page.goto('https://example.com', {
  waitUntil: 'networkidle'
});

await page.waitForResponse(
  res => res.url().includes('/api/data') && res.ok()
);

await expect(page.locator('.data')).toBeVisible();
```

---

<!-- Slide 31 -->
## Rule #4: Isolate Your Tests

### ❌ BAD - Test Dependencies
```javascript
test('create user', async () => {
  userId = await createUser(); // Shared state!
});

test('get user', async () => {
  await getUser(userId); // Depends on previous test!
});
```

### ✅ GOOD - Independent Tests
```javascript
test.beforeEach(async () => {
  userId = await createUser(); // Fresh for each!
});

test.afterEach(async () => {
  await deleteUser(userId); // Clean up!
});
```

---

<!-- Slide 32 -->
## Rule #5: Use Fixtures

### ❌ BAD - Repeated Setup
```javascript
test('test 1', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="user"]', 'test');
  await page.fill('[name="pass"]', 'pass');
  await page.click('button');
  // Now do actual test...
});
```

### ✅ GOOD - Reusable Fixture
```javascript
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await login(page);
    await use(page);
    await logout(page);
  }
});

test('test 1', async ({ authenticatedPage }) => {
  // Already logged in!
});
```

---

<!-- Slide 33 -->
## Rule #6: No Race Conditions

### ❌ BAD - Parallel Chaos
```javascript
page.click('button#first');  // No await!
page.click('button#second'); // No await!
page.click('button#third');  // No await!
// Who knows what happens? 🤷
```

### ✅ GOOD - Sequential Control
```javascript
await page.click('button#first');
await page.waitForSelector('.first-result');

await page.click('button#second');
await page.waitForSelector('.second-result');

await page.click('button#third');
```

---

<!-- Slide 34 -->
## Rule #7: Wait for Dynamic Content

### ❌ BAD - No Loading State Handling
```javascript
await page.click('button');
const text = await page.locator('.result').textContent();
// Might not be loaded yet!
```

### ✅ GOOD - Wait for Content
```javascript
await page.click('button');

// Wait for loading to finish
await expect(page.locator('.spinner'))
  .not.toBeVisible();

// Wait for content to appear
await expect(page.locator('.result'))
  .toBeVisible({ timeout: 30000 });

const text = await page.locator('.result').textContent();
```

---

<!-- Slide 35 -->
## Rule #8: Create Stable Test Data

### ❌ BAD - Using Production Data
```javascript
await page.fill('[name="search"]', 'Latest Product 2024');
// What if it doesn't exist tomorrow?
```

### ✅ GOOD - Create Your Own Data
```javascript
// Create test data first
const product = await request.post('/api/products', {
  data: { name: 'Test Product', sku: 'TEST-001' }
});

// Use it in test
await page.fill('[name="search"]', product.sku);

// Clean up after
await request.delete(`/api/products/${product.id}`);
```

---

<!-- Slide 36 -->
## Rule #9: Proper Error Handling

### ❌ BAD - Crashes Without Info
```javascript
await page.click('button');
const text = await page.locator('.result').textContent();
expect(text.length).toBeGreaterThan(0); // Crash!
```

### ✅ GOOD - Informative Errors
```javascript
try {
  await page.click('button');
  await expect(page.locator('.result')).toBeVisible();
  const text = await page.locator('.result').textContent();
  expect(text).toBeTruthy();
} catch (error) {
  await page.screenshot({ path: 'error.png' });
  console.error('Failed at:', page.url());
  throw error;
}
```

---

<!-- Slide 37 -->
## Rule #10: Configure Timeouts

### ❌ BAD - Default Everything
```javascript
// Uses default 30s everywhere
// Too short for slow operations
// Too long for fast operations
```

### ✅ GOOD - Smart Timeouts
```javascript
// playwright.config.js
export default defineConfig({
  timeout: 60000, // 60s for test
  expect: { timeout: 10000 }, // 10s for assertions
  use: {
    actionTimeout: 15000, // 15s for actions
    navigationTimeout: 30000 // 30s for navigation
  }
});
```

---

<!-- Slide 38 -->
## Handling Flaky Tests

### The 5-Step Approach:

1. **Retries** - Strategic, not blind
2. **Polling** - Check conditions repeatedly
3. **Health Checks** - Verify system readiness
4. **Exponential Backoff** - Smart retry delays
5. **Annotations** - Track and monitor

### NEVER just skip flaky tests! ⚠️

---

<!-- Slide 39 -->
## Strategy #1: Smart Retries

```javascript
// playwright.config.js
export default defineConfig({
  retries: process.env.CI ? 2 : 0,
});

// Per-test retry
test.describe('Flaky tests', () => {
  test.describe.configure({ retries: 3 });
  
  test('might fail', async ({ page }) => {
    // Test logic
  });
});
```

**Retries = Safety net, not solution!**

---

<!-- Slide 40 -->
## Strategy #2: Polling

### ❌ BAD - Fixed Wait
```javascript
await page.waitForTimeout(5000);
expect(await page.locator('.result').textContent())
  .toBe('Success');
```

### ✅ GOOD - Poll Until Ready
```javascript
await page.waitForFunction(() => {
  const el = document.querySelector('.result');
  return el?.textContent === 'Success';
}, { 
  timeout: 10000, 
  polling: 100 // Check every 100ms
});
```

---

<!-- Slide 41 -->
## Strategy #3: Health Checks

```javascript
test.beforeEach(async ({ request }) => {
  // Don't start if system isn't ready!
  let healthy = false;
  
  for (let i = 0; i < 5; i++) {
    try {
      const res = await request.get('/api/health');
      if (res.ok()) {
        healthy = true;
        break;
      }
    } catch {}
    await new Promise(r => setTimeout(r, 2000));
  }
  
  if (!healthy) {
    throw new Error('System not ready');
  }
});
```

---

<!-- Slide 42 -->
## Strategy #4: Exponential Backoff

```javascript
async function fetchWithBackoff(request, url) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await request.get(url);
      if (response.ok()) return response;
    } catch (error) {
      if (attempt === 4) throw error;
      
      // Wait longer each time: 1s, 2s, 4s, 8s
      const delay = 1000 * Math.pow(2, attempt);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

**Smart waiting beats blind waiting!** 🧠

---

<!-- Slide 43 -->
## Strategy #5: Annotations & Tracking

```javascript
test('known flaky test', async ({ page }) => {
  // Mark it!
  test.info().annotations.push({
    type: 'flaky',
    description: 'Investigating network issues'
  });
  
  // Skip in unstable environments
  test.skip(
    process.env.ENVIRONMENT === 'staging',
    'Staging is unstable'
  );
  
  // Test logic...
});
```

**Track flaky tests, then FIX them!** 🔧

---

<!-- Slide 44 -->
## 🎯 DEMO: Fixing Flaky Tests

### Live Demo (5 minutes)

**Before:** Flaky test that fails randomly  
**After:** Stable test with proper waits

1. Identify the issue
2. Apply stability rules
3. Add proper waits
4. Test multiple times
5. Confirm stability

---

<!-- Slide 45 -->
## The Golden Rules - Summary

1. ✅ **NO fixed timeouts** - Use smart waits
2. ✅ **Stable selectors** - Test IDs & roles
3. ✅ **Handle network** - Wait for responses
4. ✅ **Isolate tests** - No dependencies
5. ✅ **Use fixtures** - DRY setup/teardown
6. ✅ **Prevent races** - Proper async/await
7. ✅ **Wait for content** - Handle loading
8. ✅ **Create test data** - Don't rely on production
9. ✅ **Error handling** - Informative failures
10. ✅ **Smart timeouts** - Environment-specific

---

<!-- Slide 46 -->
## Real-World Impact

### Case Study: E-commerce Company

**Before:**
- 70% test stability
- 2-3 hours debugging daily
- No confidence in tests
- Slow releases

**After applying these principles:**
- 99.5% test stability
- 15 minutes debugging daily
- Full confidence in CI/CD
- 3x faster releases

### **ROI: Massive!** 📈

---

<!-- Slide 47 -->
## Tools Comparison Quick Reference

| Need | Tool | Cost |
|------|------|------|
| Rich Reports | Allure | Free |
| CI Integration | JUnit + HTML | Free |
| Test Management | TestRail | $37/mo |
| Jira Integration | Xray | $10/mo |
| Debug Failed Test | Trace Viewer | Free |
| Real-time Debug | Inspector | Free |
| Historical Data | ReportPortal | Free |

---

<!-- Slide 48 -->
## Your Homework 📚

### This Week:

1. **Install Allure** reporter on your project
2. **Add logging** to 3 tests
3. **Debug one test** using Inspector
4. **Fix one flaky test** using today's techniques
5. **Measure** your test stability

### Goal: 95%+ stability by next week!

---

<!-- Slide 49 -->
## Quick Wins - Start Tomorrow

### Easy Wins (30 minutes):
- ✅ Add `data-testid` to 10 elements
- ✅ Replace `waitForTimeout` with proper waits
- ✅ Configure HTML + JSON reporters

### Medium Wins (2 hours):
- ✅ Create authentication fixture
- ✅ Add logging to API tests
- ✅ Set up Allure reporter

### Big Wins (1 week):
- ✅ Fix all flaky tests
- ✅ Achieve 99% stability
- ✅ Implement health checks

---

<!-- Slide 50 -->
## Resources You Have

### In Your Repository:

1. ✅ **Complete Guide** - 2000+ lines reference
2. ✅ **Quick Reference** - Cheat sheet
3. ✅ **Training Outline** - Extended learning
4. ✅ **This Presentation** - Review anytime
5. ✅ **Code Examples** - Ready to use

### Online:
- 📚 [playwright.dev](https://playwright.dev)
- 💬 Discord: Playwright Community
- 🎥 YouTube: Playwright Channel

---

<!-- Slide 51 -->
## Common Pitfalls to Avoid

### Don't:
- ❌ Skip flaky tests (fix them!)
- ❌ Use fixed timeouts (use smart waits)
- ❌ Rely on production data (create test data)
- ❌ Test in sequence (isolate tests)
- ❌ Ignore failures (investigate and fix)

### Do:
- ✅ Track test stability metrics
- ✅ Review failed tests immediately
- ✅ Refactor unstable selectors
- ✅ Use fixtures for common setup
- ✅ Monitor and improve continuously

---

<!-- Slide 52 -->
## Measuring Success

### Track These Metrics:

```javascript
// Test stability: passed tests / total tests
const stability = (passed / total) * 100;

// Flaky rate: tests passed after retry
const flakyRate = (passedOnRetry / total) * 100;

// Average test duration
const avgDuration = totalDuration / totalTests;
```

### Targets:
- 🎯 Stability: **99%+**
- 🎯 Flaky Rate: **<1%**
- 🎯 Duration: **<5 min for suite**

---

<!-- Slide 53 -->
## Questions & Answers

### Common Questions:

**Q: Which reporter should we use?**  
A: Start with HTML, add Allure if you need trends

**Q: When to use retries?**  
A: In CI only, and fix the root cause

**Q: How to handle slow tests?**  
A: Parallel execution + optimize waits

**Q: Should we test in production?**  
A: Use separate test environment with test data

---

<!-- Slide 54 -->
## Your Action Plan

### Next 30 Days:

#### Week 1:
- Set up reporters
- Add test IDs
- Replace fixed timeouts

#### Week 2:
- Implement logging
- Create fixtures
- Debug with Inspector

#### Week 3:
- Fix flaky tests
- Add health checks
- Measure stability

#### Week 4:
- Review and optimize
- Share with team
- Celebrate success! 🎉

---

<!-- Slide 55 -->
## The Philosophy

### Remember:

> "The goal is not just to write tests,  
> but to write **reliable, maintainable,  
> and debuggable** tests that provide  
> confidence in your software quality."

### Key Mindset:
- Tests are **code** - treat them well
- Flaky tests are **bugs** - fix them
- Stability is **achievable** - commit to it

---

<!-- Slide 56 -->
## Before We End...

### What You Learned Today:

1. ✅ **7+ reporting options** with setup
2. ✅ **5 debugging techniques** that save hours
3. ✅ **10 stability rules** for reliable tests
4. ✅ **5 strategies** for handling flaky tests

### You now have the tools to achieve:
# 99%+ Test Stability! 🎯

---

<!-- Slide 57 -->
## Stay Connected

### Resources:
- 📚 Full guide in repository
- 💬 Join Playwright Discord
- 🐛 Report issues on GitHub
- 📧 Email: [your-email]

### Keep Learning:
- 🎓 Playwright Docs
- 🎥 YouTube Tutorials
- 📖 Blog Posts
- 🏆 Contribute to Open Source

---

<!-- Slide 58 -->
## Thank You! 🎭

### You're Now Ready To:
- Write stable tests (99%+ reliability)
- Debug efficiently (save hours)
- Generate beautiful reports
- Handle flaky tests like a pro

### Remember:
**Stable tests = Happy teams = Faster releases**

### Questions? Let's discuss! 💬

---

<!-- Slide 59 -->
## Bonus: Pro Tips

### 1. CI/CD Configuration
```javascript
reporter: process.env.CI 
  ? [['github'], ['json'], ['junit']]
  : [['html'], ['list']]
```

### 2. Parallel Execution
```javascript
workers: process.env.CI ? 1 : undefined
```

### 3. Screenshot Everything
```javascript
await page.screenshot({ 
  path: `screenshot-${Date.now()}.png`,
  fullPage: true 
});
```

---

<!-- Slide 60 -->
## Bonus: Debugging Checklist

When a test fails:

1. ☑️ Check the screenshot
2. ☑️ Review the trace
3. ☑️ Read the logs
4. ☑️ Verify the selector
5. ☑️ Check network requests
6. ☑️ Run in headed mode
7. ☑️ Use `page.pause()`
8. ☑️ Add more logging
9. ☑️ Test in isolation
10. ☑️ Review test data

---

<!-- Slide 61 -->
## Bonus: Configuration Template

```javascript
// playwright.config.js - Production Ready
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
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: process.env.BASE_URL,
  },
});
```

---

<!-- Slide 62 -->
# Workshop Complete! 🎉

## Start Building Stable Tests Today!

### Your journey to 99%+ stability begins now.

**Remember: Every flaky test is an opportunity to learn and improve!**

---

**END OF PRESENTATION**

---

## Speaker Notes

### Timing Guide:

**Introduction (5 min):**
- Slides 1-2: Quick intro and agenda

**Part 1: Reporting (25 min):**
- Slides 3-12: Theory (15 min)
- Slide 12: Live demo (10 min)

**Part 2: Debugging (25 min):**
- Slides 13-24: Theory (15 min)
- Slide 25: Live demo (10 min)

**Part 3: Stability (30 min):**
- Slides 26-43: Rules and strategies (20 min)
- Slide 44: Live demo (10 min)

**Wrap-up (10 min):**
- Slides 45-58: Summary, Q&A, resources

**Bonus slides:** Use if time permits or for reference

---

## Demo Preparation Checklist:

- [ ] Sample project set up
- [ ] Allure installed
- [ ] VS Code configured
- [ ] Inspector ready
- [ ] Flaky test prepared for demo
- [ ] Network connection stable
- [ ] Screen recording ready (backup)
