# Presenter Notes: Playwright Reports, Debugging & Stability Workshop

## Workshop Overview
This workshop covers three critical aspects of Playwright testing:
1. **Reports** - Understanding and configuring test reporting
2. **Debugging** - Tools and techniques for troubleshooting tests
3. **Stability** - Best practices for reliable, non-flaky tests

**Total Duration:** ~3-4 hours
**Slides:** 44
**Target Audience:** QA Engineers, Developers, Test Automation Engineers

---

## Section 1: Introduction (Slides 1-5)

### Slide 1: Title Slide
**What to say:**
- Welcome everyone to the Playwright workshop
- Introduce yourself and your experience with Playwright
- Ask audience about their current experience level with Playwright

**Extra information:**
- Gauge the room - adjust depth based on experience
- Mention this is a hands-on workshop
- Ensure everyone has Playwright installed

### Slide 2: Workshop Agenda
**What to say:**
- Overview of three main sections: Reports, Debugging, and Stability
- Mention there will be hands-on exercises
- Set expectations for breaks and Q&A

**Extra information:**
- Share workshop repository/materials
- Mention prerequisites (Node.js, basic JS/TS knowledge)
- Note that examples will be shown in both JS and TS

### Slide 3: Why This Matters
**What to say:**
- Good reports save debugging time
- Effective debugging techniques reduce frustration
- Stable tests build confidence in your test suite
- These skills directly impact development velocity

**Extra information:**
- Share a personal story about flaky tests or hard-to-debug issues
- Mention cost of flaky tests (time, trust, CI/CD pipeline delays)

### Slide 4: Prerequisites Review
**What to say:**
- Quick check: Who has Playwright installed?
- Review basic Playwright concepts (browsers, pages, locators)
- Mention we'll be using the latest Playwright version

**Extra information:**
- Have installation instructions ready
- Share link to Playwright documentation
- Mention browser installation: `npx playwright install`

### Slide 5: Workshop Repository Setup
**What to say:**
- Walk through cloning the workshop repo
- Show the folder structure
- Quick demo of running a sample test

**Extra information:**
- Provide GitHub/repo URL
- Ensure everyone can run: `npx playwright test --ui`
- Troubleshoot common issues (firewall, permissions)

---

## Section 2: Playwright Reports (Slides 6-15)

### Slide 6: Introduction to Reporters
**What to say:**
- Reports are your window into test execution
- Playwright has multiple built-in reporters
- You can also create custom reporters
- Reports help with debugging and CI/CD integration

**Extra information:**
- Default reporter: `list` for terminal, `html` for CI
- Reports show: test status, duration, errors, screenshots
- Mention: reports are configured in playwright.config.ts

### Slide 7: Built-in Reporters Overview
**What to say:**
- List reporter: Real-time console output
- HTML reporter: Rich interactive web report
- JSON reporter: Machine-readable for CI/CD
- JUnit reporter: For Jenkins, Azure DevOps
- Dot reporter: Minimal console output
- Line reporter: Compact one-line per test

**Extra information:**
- Show examples of each reporter output
- Mention you can use multiple reporters simultaneously
- Different reporters for different environments (local vs CI)

### Slide 8: HTML Reporter Deep Dive
**What to say:**
- Most popular reporter for debugging
- Shows test hierarchy, timings, and screenshots
- Interactive filtering and searching
- Trace viewer integration

**Extra information:**
- Demo: `npx playwright show-report`
- Highlight features: test duration, retry attempts, attachments
- Show how to navigate between tests
- Mention: auto-opens after test run by default

### Slide 9: Configuring HTML Reporter
**What to say:**
```typescript
reporter: [
  ['html', { 
    open: 'never', // 'always', 'never', 'on-failure'
    outputFolder: 'playwright-report',
    host: 'localhost',
    port: 9223
  }]
]
```

**Extra information:**
- `open: 'never'` is good for CI
- `open: 'on-failure'` is useful for local development
- Custom output folder for organizing reports
- Port configuration matters in containerized environments

### Slide 10: Multiple Reporters Configuration
**What to say:**
- You can use multiple reporters simultaneously
- Example: HTML for humans, JSON for CI/CD
```typescript
reporter: [
  ['html'],
  ['json', { outputFile: 'results.json' }],
  ['junit', { outputFile: 'results.xml' }]
]
```

**Extra information:**
- HTML for local debugging
- JSON for custom dashboards or analytics
- JUnit for CI/CD platforms that need XML format
- Each reporter runs independently

### Slide 11: Custom Reporters
**What to say:**
- Create custom reporters for specific needs
- Examples: Slack notifications, database logging, custom dashboards
- Implement the Reporter interface

**Extra information:**
- Show basic custom reporter structure:
```typescript
class MyReporter {
  onBegin(config, suite) { }
  onTestBegin(test) { }
  onTestEnd(test, result) { }
  onEnd(result) { }
}
```
- Mention: useful for integrating with company-specific tools

### Slide 12: Report Artifacts
**What to say:**
- Screenshots: Captured on failure (or always)
- Videos: Full test execution recording
- Traces: Detailed timeline of test execution
- Logs: Console output and custom logs

**Extra information:**
- Configure in playwright.config.ts:
```typescript
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry'
}
```
- Balance between detail and storage space

### Slide 13: Screenshots Configuration
**What to say:**
- Three modes: `'off'`, `'on'`, `'only-on-failure'`
- Screenshots are automatically attached to reports
- Can take manual screenshots: `await page.screenshot()`

**Extra information:**
- `only-on-failure` is the recommended setting
- Screenshots include timestamp in filename
- Supports full page screenshots
- PNG format with good quality/size balance
```typescript
await page.screenshot({ fullPage: true, path: 'screenshot.png' });
```

### Slide 14: Video Recording
**What to say:**
- Videos help understand what happened during test execution
- Three modes: `'off'`, `'on'`, `'retain-on-failure'`, `'on-first-retry'`
- Videos are stored in test-results directory

**Extra information:**
- Videos can be large - use `retain-on-failure`
- Slower test execution due to recording overhead
- Good for debugging intermittent failures
```typescript
use: {
  video: {
    mode: 'retain-on-failure',
    size: { width: 1280, height: 720 }
  }
}
```

### Slide 15: Traces - The Ultimate Debug Tool
**What to say:**
- Traces are the most powerful debugging feature
- Shows: network requests, DOM snapshots, console logs, actions
- Minimal performance impact
- Recommended: `'on-first-retry'`

**Extra information:**
- Open traces: `npx playwright show-trace trace.zip`
- Traces include before/after screenshots for each action
- Can see selector strategy used
- Shows exact timing of each operation
- Essential for debugging flaky tests

---

## Section 3: Debugging Techniques (Slides 16-30)

### Slide 16: Introduction to Debugging
**What to say:**
- Debugging is inevitable in test automation
- Playwright provides excellent debugging tools
- Learn multiple debugging approaches
- Choose the right tool for the situation

**Extra information:**
- Common debugging scenarios: selector issues, timing problems, assertions
- Debugging is a skill that improves with practice
- Good debugging saves hours of frustration

### Slide 17: Playwright Inspector
**What to say:**
- Interactive debugging tool
- Run with: `npx playwright test --debug`
- Step through tests line by line
- Inspect elements in real-time

**Extra information:**
- Opens two windows: browser and inspector
- Can pause execution, step over/into
- Shows locators and highlights elements
- Great for developing new tests
- Use breakpoints in code with `await page.pause()`

### Slide 18: Using page.pause()
**What to say:**
```typescript
await page.pause();
```
- Programmatic breakpoint
- Opens Playwright Inspector
- Continue execution from inspector
- Remove before committing code

**Extra information:**
- Unlike debugger statements, pause() is Playwright-specific
- Safer than infinite timeouts
- Can inspect state at exact point in test
- Use strategically - don't leave in production code

### Slide 19: UI Mode
**What to say:**
- Run with: `npx playwright test --ui`
- Modern interactive interface
- Watch mode for test development
- Integrated trace viewer

**Extra information:**
- Better than inspector for iterative development
- Shows all tests in sidebar
- Time travel through test execution
- Can run single tests or suites
- Great for TDD workflow
- Automatically reruns tests on code changes

### Slide 20: Headed Mode vs Headless
**What to say:**
- Headless: Fast, good for CI (default)
- Headed: Visual feedback, good for debugging
- Run headed: `npx playwright test --headed`
- Slow-mo for detailed observation

**Extra information:**
```typescript
// In code
use: {
  headless: false,
  slowMo: 500 // milliseconds
}
```
- Slow-mo helps see fast operations
- Headed mode uses more resources
- Use headed locally, headless in CI

### Slide 21: Browser DevTools Integration
**What to say:**
- Use browser DevTools while testing
- Launch with DevTools: `npx playwright test --debug`
- Access console, network, elements
- Set breakpoints in page context

**Extra information:**
- DevTools shows page console.log()
- Network tab shows all requests
- Can modify page in real-time
- Useful for CSS selector development
- Remember: test context vs page context

### Slide 22: Logging and Verbose Mode
**What to say:**
- Add logging to understand test flow
```typescript
console.log('Before login:', await page.title());
```
- Verbose mode: `DEBUG=pw:api npx playwright test`
- See all Playwright API calls

**Extra information:**
- Different debug levels: `pw:api`, `pw:browser`, `pw:protocol`
- Custom logger: `test.info().attach()`
- Use structured logging in production tests
- Don't over-log - focus on decision points

### Slide 23: Debugging Selectors
**What to say:**
- Selectors are the #1 source of test issues
- Use Playwright Inspector to test selectors
- Try different selector strategies
- Use `getByRole`, `getByText` when possible

**Extra information:**
- Selector precedence: getByRole > getByLabel > getByTestId
- Test selectors in console:
```typescript
// In DevTools console
await page.locator('button').count()
```
- VS Code extension has selector generator
- Avoid: XPath, CSS with nth-child

### Slide 24: Common Debugging Patterns
**What to say:**
- Take screenshot before assertion
```typescript
await page.screenshot({ path: 'before-assert.png' });
await expect(page.locator('...')).toBeVisible();
```
- Check element state
```typescript
const isVisible = await locator.isVisible();
console.log('Element visible:', isVisible);
```
- Wait explicitly
```typescript
await page.waitForLoadState('networkidle');
```

**Extra information:**
- Screenshots help understand failures
- State checks reveal timing issues
- Explicit waits better than timeouts
- Log important values before assertions

### Slide 25: Debugging Network Issues
**What to say:**
- Network failures are common in tests
- Use network tab in DevTools
- Route and mock network calls for debugging
```typescript
page.route('**/api/data', route => {
  console.log('API called:', route.request().url());
  route.continue();
});
```

**Extra information:**
- Network mocking helps isolate issues
- Check request/response in trace viewer
- Look for CORS, 404, 500 errors
- Verify API response shape

### Slide 26: Debugging Timing Issues
**What to say:**
- Timing issues = flaky tests
- Symptoms: works locally, fails in CI
- Solutions:
  - Use auto-waiting locators
  - Add explicit waits
  - Check network state
  - Increase timeout for specific actions

**Extra information:**
```typescript
await expect(locator).toBeVisible({ timeout: 10000 });
await page.waitForResponse(resp => resp.url().includes('api'));
```
- Avoid: fixed timeouts, arbitrary waits
- CI often slower than local
- Check for race conditions

### Slide 27: Using Test Info for Debugging
**What to say:**
```typescript
test('example', async ({ page }, testInfo) => {
  console.log('Test name:', testInfo.title);
  console.log('Retry:', testInfo.retry);
  
  // Attach custom logs
  testInfo.attach('debug-info', {
    body: JSON.stringify({ customData: 'value' }),
    contentType: 'application/json'
  });
});
```

**Extra information:**
- testInfo provides context about current test
- Useful for conditional debugging logic
- Attach files/data to test report
- Check retry count for flaky test detection

### Slide 28: Debugging in CI/CD
**What to say:**
- CI failures are hardest to debug
- Always enable traces in CI
- Collect all artifacts
- Use video for visual debugging
- Check CI environment differences

**Extra information:**
```yaml
# GitHub Actions example
- uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
```
- Environment variables might differ
- Timezone issues
- Resource constraints (memory, CPU)
- Docker vs native execution

### Slide 29: VS Code Extension Benefits
**What to say:**
- Official Playwright extension for VS Code
- Run tests from editor
- Debug with breakpoints
- Generate tests with Codegen
- Pick locators visually

**Extra information:**
- Install: "Playwright Test for VSCode"
- Features: test runner, debugger, locator picker
- Run single test by clicking green arrow
- Set breakpoints in test code
- Shows test results inline

### Slide 30: Debugging Best Practices Summary
**What to say:**
- Use UI mode for development
- Enable traces on first retry
- Take screenshots before critical assertions
- Use meaningful test names
- Log important state changes
- Clean up debugging code before commit

**Extra information:**
- Create debugging checklist for your team
- Document common debugging scenarios
- Share debugging tips in team wiki
- Use code reviews to catch debugging code left in tests

---

## Section 4: Test Stability (Slides 31-44)

### Slide 31: Introduction to Test Stability
**What to say:**
- Stable tests = trustworthy tests
- Flaky tests destroy confidence
- Root causes: timing, environment, test design
- Stability should be a key metric

**Extra information:**
- Flaky test = non-deterministic failure
- One flaky test can fail entire suite
- Flakiness spreads: ignore one, ignore all
- Cost: wasted CI time, decreased productivity

### Slide 32: What Makes Tests Flaky?
**What to say:**
- Timing issues (race conditions)
- External dependencies
- Non-isolated tests (shared state)
- Insufficient waits
- Random data dependencies
- Environment differences

**Extra information:**
- Most common: timing issues (80%+)
- External dependencies: APIs, databases
- Test order dependencies are insidious
- Timezone, locale differences
- Browser or OS specific issues

### Slide 33: Playwright's Auto-Waiting
**What to say:**
- Playwright waits automatically before actions
- Waits for: actionability, element attached, visible, stable
- No need for manual waits in most cases
- Trust auto-waiting, avoid fixed timeouts

**Extra information:**
- Actionability checks:
  - Element is attached to DOM
  - Element is visible
  - Element is stable (not animating)
  - Element receives events (not obscured)
  - Element is enabled
```typescript
// Bad
await page.waitForTimeout(1000);
await page.click('button');

// Good
await page.click('button'); // Auto-waits
```

### Slide 34: Proper Wait Strategies
**What to say:**
- Wait for specific conditions, not time
- Use waitForSelector, waitForResponse, waitForLoadState
```typescript
await page.waitForSelector('.content', { state: 'visible' });
await page.waitForLoadState('networkidle');
await page.waitForResponse(resp => resp.url().includes('api'));
```

**Extra information:**
- `waitForLoadState` options: load, domcontentloaded, networkidle
- `waitForSelector` states: attached, detached, visible, hidden
- Combine waits with actions in expectations
- Set reasonable timeouts for each wait

### Slide 35: Stable Selectors
**What to say:**
- Selectors breaking = flaky tests
- Best to worst selector strategies:
  1. getByRole, getByLabel (semantic)
  2. data-testid attributes
  3. Stable CSS classes
  4. Never: generated classes, nth-child, text content

**Extra information:**
```typescript
// Best: Semantic
await page.getByRole('button', { name: 'Submit' }).click();

// Good: Test IDs
await page.getByTestId('submit-button').click();

// Bad: Fragile CSS
await page.locator('.btn-primary-xl-large').click();

// Worst: nth-child
await page.locator('div:nth-child(3) > button').click();
```

### Slide 36: Test Isolation
**What to say:**
- Each test should be independent
- No shared state between tests
- Use beforeEach, not beforeAll for setup
- Tests should run in any order

**Extra information:**
- Playwright provides isolation by default (new context per test)
- Don't rely on test execution order
- Clean up after tests (delete created data)
- Use `test.describe.serial()` only when truly necessary
```typescript
test.beforeEach(async ({ page }) => {
  // Fresh state for each test
  await page.goto('/login');
});
```

### Slide 37: Handling External Dependencies
**What to say:**
- Mock external APIs for unit-level tests
- Use contracts for integration tests
- Consider test data setup/teardown
- Network mocking with Playwright

**Extra information:**
```typescript
await page.route('**/api/**', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ data: 'mocked' })
  });
});
```
- Mock third-party services
- Use HAR files for recorded responses
- Consider dedicated test environments
- Database seeding strategies

### Slide 38: Retry Strategies
**What to say:**
- Retries mask flaky tests (but can help in transition)
- Configure in playwright.config.ts
```typescript
retries: process.env.CI ? 2 : 0
```
- Use retries as temporary measure
- Fix flaky tests, don't just retry them

**Extra information:**
- Retries in CI, not locally (find issues faster locally)
- Track retry counts: many retries = flaky test
- Retries increase CI time
- Goal: zero retries needed
- Use `test.only.fail()` to mark known flaky tests while fixing

### Slide 39: Test Data Management
**What to say:**
- Random test data can cause flakiness
- Use factories or fixtures for consistent data
- Consider data-driven tests
- Clean up test data after tests

**Extra information:**
```typescript
// Good: Consistent test data
test('user profile', async ({ page }) => {
  const testUser = {
    email: 'test@example.com',
    name: 'Test User'
  };
  // ...
});

// Consider: faker.js for realistic data
import { faker } from '@faker-js/faker';
const email = faker.internet.email();
```
- Use test data factories
- Consider unique IDs for parallel tests
- Database seeding/cleanup strategies

### Slide 40: Avoiding Race Conditions
**What to say:**
- Race conditions: timing-dependent bugs
- Common in async operations
- Solutions:
  - Wait for specific events
  - Use expect assertions (they auto-retry)
  - Check network state

**Extra information:**
```typescript
// Bad: Race condition
await page.click('button');
await expect(page.locator('.result')).toBeVisible(); // Might fail

// Good: Wait for response
const responsePromise = page.waitForResponse('**/api/result');
await page.click('button');
await responsePromise;
await expect(page.locator('.result')).toBeVisible();
```
- Promises should be awaited in correct order
- Use Promise.all() for parallel operations

### Slide 41: Parallelization Considerations
**What to say:**
- Playwright runs tests in parallel by default
- Ensure tests don't interfere with each other
- Use unique test data for each test
- Shared resources need coordination

**Extra information:**
```typescript
// Configure workers
workers: process.env.CI ? 2 : undefined

// Serial tests when needed
test.describe.serial('ordered tests', () => {
  test('test 1', async ({ page }) => { });
  test('test 2', async ({ page }) => { });
});
```
- Parallel = faster, but requires careful design
- Database conflicts in parallel tests
- Use worker-index for unique data

### Slide 42: Timeouts Configuration
**What to say:**
- Default timeout: 30 seconds
- Configure globally and per-test
```typescript
// Global
timeout: 60000

// Per test
test('slow test', async ({ page }) => {
  test.setTimeout(90000);
  // ...
});
```

**Extra information:**
- Navigation timeout: for page.goto()
- Action timeout: for clicks, fills
- Assertion timeout: for expect()
```typescript
use: {
  navigationTimeout: 30000,
  actionTimeout: 10000
},
expect: {
  timeout: 5000
}
```
- Increase timeouts for slow operations, not as band-aid for flakiness

### Slide 43: Monitoring Test Health
**What to say:**
- Track test metrics:
  - Pass/fail rate
  - Retry frequency
  - Test duration
  - Flaky test identification
- Regular review and refactoring

**Extra information:**
- Use custom reporters for metrics
- Create dashboard for test health
- Alert on flaky tests
- Example metrics:
  - Tests requiring 2+ retries = flaky
  - Tests taking > 2x average duration = slow
  - Regular test health review meetings

### Slide 44: Summary & Best Practices
**What to say:**
- Reports: Use HTML locally, JSON in CI
- Debugging: UI mode + traces = powerful combo
- Stability: Test isolation + auto-waiting + stable selectors
- Keep learning and improving

**Key takeaways:**
1. Enable traces on first retry
2. Use semantic selectors
3. Trust auto-waiting
4. Isolate your tests
5. Fix flaky tests immediately

**Extra information:**
- Share workshop repository with exercises
- Provide resources for continued learning
- Playwright Discord community
- Official documentation: playwright.dev
- Encourage questions and discussion

**Closing remarks:**
- Thank attendees for participation
- Share contact information for follow-up
- Encourage feedback on workshop
- Mention advanced topics for next workshop

---

## Additional Tips for Presenters

### Preparation
- Test all demos beforehand in a fresh environment
- Have backup slides/examples if demos fail
- Prepare exercise solutions in advance
- Set up screen recording in case you need to replay a demo

### During Workshop
- Check understanding with quick polls or questions
- Encourage questions throughout (not just at end)
- Use real-world examples from your experience
- Show failures too - not just successes
- Take breaks every 45-60 minutes

### Hands-on Exercises
- Provide starter code for exercises
- Walk around to help during exercises
- Review solutions together after each exercise
- Share common mistakes you observe

### Common Questions to Prepare For
1. "Which reporter should I use?" - HTML locally, multiple in CI
2. "How do I debug tests in CI?" - Traces and artifacts
3. "What causes most flaky tests?" - Timing issues (80%+)
4. "Should I use XPath?" - No, use semantic locators
5. "How many retries should I configure?" - 2 in CI, 0 locally
6. "What timeout should I use?" - Start with default 30s
7. "How do I handle flaky tests?" - Fix them, don't just retry
8. "Can I use Playwright with my framework?" - Yes, it's flexible

### Resources to Share
- [Playwright Documentation](https://playwright.dev)
- [Playwright Discord](https://discord.com/invite/playwright-807756831384403968)
- [GitHub Discussions](https://github.com/microsoft/playwright/discussions)
- [Example Projects](https://github.com/mxschmitt/awesome-playwright)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)

---

## Workshop Exercises (Optional)

### Exercise 1: Configure Reports
- Add HTML and JSON reporters
- Run tests and explore HTML report
- Configure screenshot and video settings

### Exercise 2: Debug a Failing Test
- Provided broken test with selector issue
- Use Inspector to find correct selector
- Fix and verify test passes

### Exercise 3: Stabilize a Flaky Test
- Provided intentionally flaky test
- Identify root cause (race condition)
- Apply proper wait strategy
- Verify stability by running 10 times

### Exercise 4: Add Trace on Failure
- Configure traces for CI environment
- Simulate failure
- Download and analyze trace file

---

## Post-Workshop Follow-up

### Suggested Actions
- Share recording and slides
- Provide certificate of completion
- Send survey for feedback
- Share additional resources
- Schedule follow-up Q&A session
- Create Slack/Teams channel for continued discussion

### Next Level Workshops
- Advanced Playwright: API testing, Visual regression
- CI/CD Integration: GitHub Actions, Jenkins, Azure
- Performance Testing with Playwright
- Custom Framework Development
- Mobile Testing with Playwright

---

**Note:** Adjust content and pacing based on:
- Audience experience level
- Available time
- Questions and discussion
- Exercise completion time
