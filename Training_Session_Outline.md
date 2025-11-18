# Playwright Training Session Outline
## Reports, Debugging, and Stability

### 🎯 Session Information
- **Duration:** 3-4 hours (can be split into multiple sessions)
- **Audience:** QA Automation Engineers (Basic to Advanced)
- **Prerequisites:** Basic Playwright knowledge
- **Format:** Hands-on workshop with live coding

---

## Session 1: Reporting (60 minutes)

### Part 1: Built-in Reporters (20 minutes)

#### Introduction (5 min)
- Why reporting matters
- Different stakeholder needs
- Overview of Playwright reporting capabilities

#### Built-in Reporters Demo (15 min)
**Live Coding:**
1. HTML Reporter
   - Default setup
   - Customization options
   - Interactive features
   
2. JSON Reporter
   - Use cases
   - Structure exploration
   - Integration with other tools

3. JUnit Reporter
   - CI/CD integration
   - Jenkins/Azure DevOps examples

4. Multiple Reporters
   - Configuration
   - When to use multiple reporters

**Hands-on Exercise (5 min):**
- Students configure multiple reporters
- Run tests and explore outputs

---

### Part 2: Third-Party Reporters (25 minutes)

#### Free Reporters (15 min)
**Allure Reporter Demo:**
1. Installation and setup
2. Running tests
3. Generating report
4. Exploring features:
   - Timeline view
   - Test categories
   - Historical trends
   - Screenshots/videos

**Other Free Options Overview:**
- Monocart Reporter (coverage)
- ReportPortal (enterprise dashboard)
- Tesults (cloud-based)

**Hands-on Exercise (10 min):**
- Install Allure
- Run tests
- Generate and explore report
- Add custom attachments

#### Paid Reporters (10 min)
**Overview and Comparison:**
- TestRail integration
- Xray (Jira)
- Katalon TestOps
- LambdaTest
- BrowserStack

**When to use paid solutions:**
- Team size considerations
- Feature requirements
- Budget planning

---

### Part 3: Custom Reporters (15 minutes)

**Creating Custom Reporter:**
- Reporter API
- Use cases
- Live coding example

**Hands-on Exercise:**
- Create simple custom reporter
- Log test results to custom format

---

## Session 2: Results Analysis & Debugging (90 minutes)

### Part 1: VS Code Debugging (30 minutes)

#### Setup (10 min)
**Live Demo:**
1. Install Playwright extension
2. Configure launch.json
3. Overview of features

#### Debugging Techniques (20 min)
**Demonstrations:**
1. Using breakpoints
   - Setting breakpoints
   - Conditional breakpoints
   - Logpoints

2. Playwright Inspector
   - Step through tests
   - Record actions
   - Selector playground
   - Console logs

3. UI Mode
   - Running tests in UI mode
   - Watch mode
   - Time travel debugging

**Hands-on Exercise:**
- Debug a failing test
- Use inspector to find selector
- Step through test execution
- Fix the issue

---

### Part 2: Logging Strategies (30 minutes)

#### Terminal Logging (15 min)
**Live Coding:**
1. Console output in tests
   ```javascript
   console.log('Step 1: Navigate to page');
   ```

2. Browser console capture
   ```javascript
   page.on('console', msg => {
     console.log(`[${msg.type()}] ${msg.text()}`);
   });
   ```

3. Debug environment variables
   ```bash
   DEBUG=pw:* npx playwright test
   ```

**Hands-on Exercise:**
- Add console logging to test
- Capture browser console
- Run with debug flags

#### File Logging (15 min)
**Live Coding:**
1. Basic file logging
2. Logger class implementation
3. API request/response logging
4. Network monitoring

**Hands-on Exercise:**
- Implement logger in API test
- Save request/response to file
- Review log file structure

---

### Part 3: Advanced Debugging (30 minutes)

#### Traces (10 min)
**Demo:**
1. Enable traces in config
2. Generate trace on failure
3. View trace in Playwright Trace Viewer
4. Analyze network, console, screenshots

**Hands-on Exercise:**
- Run test with trace
- Open trace viewer
- Explore all features

#### Screenshots & Videos (10 min)
**Configuration:**
1. Automatic screenshots
2. Video recording
3. Attachment to reports
4. Custom screenshots

**Hands-on Exercise:**
- Configure screenshot/video
- Trigger failure
- Review captured media

#### Error Handling (10 min)
**Best Practices:**
1. Try-catch blocks
2. Soft assertions
3. Custom error messages
4. Debugging helper methods

**Hands-on Exercise:**
- Add error handling to test
- Implement soft assertions
- Create debugging helper

---

## Session 3: Test Stability (90 minutes)

### Part 1: Stability Best Practices (50 minutes)

#### Introduction (5 min)
- What makes tests flaky?
- Cost of instability
- Our goal: 99%+ reliability

#### 10 Stability Examples (45 min)

**Example 1: Wait Strategies (5 min)**
- Problems with fixed waits
- Auto-waiting in Playwright
- Custom wait strategies

**Live Coding & Exercise:**
```javascript
// Bad
await page.waitForTimeout(5000);

// Good
await page.waitForSelector('.element');
await page.waitForLoadState('networkidle');
```

**Example 2: Resilient Selectors (5 min)**
- CSS selector pitfalls
- Test IDs
- Role-based selectors
- Accessible names

**Live Coding & Exercise:**
```javascript
// Bad
await page.click('div > button:nth-child(3)');

// Good
await page.click('[data-testid="submit"]');
await page.getByRole('button', { name: 'Submit' }).click();
```

**Example 3: Network Handling (5 min)**
- Network timeouts
- Waiting for responses
- Handling slow connections

**Example 4: Test Isolation (5 min)**
- Avoiding test dependencies
- Proper cleanup
- Fixtures for setup

**Example 5: Test Fixtures (5 min)**
- Creating reusable fixtures
- Authentication fixture
- Data setup fixture

**Example 6: Race Conditions (5 min)**
- Identifying race conditions
- Sequential vs parallel execution
- Proper async/await usage

**Example 7: Dynamic Content (5 min)**
- Waiting for API responses
- Loading states
- Skeleton screens

**Example 8: Stable Test Data (5 min)**
- Creating test data
- Using test databases
- Data cleanup strategies

**Example 9: Error Handling (5 min)**
- Try-catch blocks
- Soft assertions
- Graceful degradation

**Example 10: Timeout Configuration (5 min)**
- Global timeouts
- Action timeouts
- Environment-specific timeouts

**Group Exercise (30 min total, distributed):**
- Students fix unstable tests
- Discussion of solutions
- Share learnings

---

### Part 2: Handling Flaky Tests (40 minutes)

#### Introduction (5 min)
- Flaky vs broken tests
- Why NOT to skip flaky tests
- Strategies to handle flakiness

#### 5 Flaky Test Solutions (35 min)

**Solution 1: Strategic Retries (7 min)**
- When to use retries
- Configuration options
- Custom retry logic
- Exponential backoff

**Live Coding:**
```javascript
// Config retries
retries: process.env.CI ? 2 : 0

// Per-test retries
test.describe.configure({ retries: 3 });
```

**Solution 2: Polling Strategies (7 min)**
- Wait with polling
- Custom polling utilities
- When to poll vs when to wait

**Live Coding:**
```javascript
await page.waitForFunction(() => {
  return document.querySelector('.result')?.textContent === 'Success';
}, { timeout: 10000, polling: 100 });
```

**Solution 3: Health Checks (7 min)**
- Pre-test validation
- System readiness checks
- Dependency verification

**Solution 4: Exponential Backoff (7 min)**
- Implementation
- Jitter addition
- Use cases

**Solution 5: Test Annotations (7 min)**
- Marking flaky tests
- Conditional execution
- Tracking and monitoring
- Quarantine strategy

**Hands-on Challenge (30 min total, distributed):**
- Fix 5 deliberately flaky tests
- Apply different solutions
- Measure improvements
- Present findings

---

## Session 4: Practical Workshop (60 minutes)

### Real-World Scenarios (60 min)

#### Scenario 1: Login Flow (15 min)
**Problem:** Flaky login test that sometimes fails
**Tasks:**
1. Identify the issues
2. Apply stability improvements
3. Add proper logging
4. Configure reporting

#### Scenario 2: E-commerce Checkout (15 min)
**Problem:** Checkout test fails intermittently
**Tasks:**
1. Handle loading states
2. Wait for API calls
3. Implement fixtures
4. Add trace debugging

#### Scenario 3: API Testing (15 min)
**Problem:** API tests fail due to timing
**Tasks:**
1. Implement exponential backoff
2. Add comprehensive logging
3. Health check integration
4. Result analysis

#### Scenario 4: CI/CD Integration (15 min)
**Problem:** Tests pass locally, fail in CI
**Tasks:**
1. Configure environment-specific settings
2. Set up appropriate reporters
3. Handle CI-specific issues
4. Analyze CI logs

---

## Post-Training Resources

### Provided Materials
1. ✅ Complete guide document
2. ✅ Quick reference cheat sheet
3. ✅ Sample test repository
4. ✅ Configuration templates
5. ✅ Logger utilities
6. ✅ Custom reporter examples

### Homework Assignments
1. **Week 1:** Set up Allure reporter on existing project
2. **Week 2:** Implement logging in 5 API tests
3. **Week 3:** Fix 3 flaky tests using learned techniques
4. **Week 4:** Create custom reporter for team needs

### Additional Learning
- Playwright documentation review
- Join Playwright Discord
- Watch Playwright conference talks
- Contribute to open-source Playwright projects

---

## Assessment Criteria

### Basic Level (Pass)
- ✓ Can configure multiple reporters
- ✓ Can debug tests in VS Code
- ✓ Understands basic wait strategies
- ✓ Can implement simple logging

### Intermediate Level (Good)
- ✓ Can create custom reporters
- ✓ Implements proper error handling
- ✓ Uses fixtures for test setup
- ✓ Can analyze traces effectively

### Advanced Level (Excellent)
- ✓ Designs comprehensive logging strategy
- ✓ Implements exponential backoff
- ✓ Creates reusable debugging utilities
- ✓ Achieves 99%+ test stability

---

## Tips for Trainers

### Preparation
1. Set up demo repository with examples
2. Prepare intentionally flaky tests for exercises
3. Have backup slides for complex topics
4. Test all code examples beforehand
5. Prepare environment setup guide

### During Training
1. Encourage questions throughout
2. Share real-world war stories
3. Live code as much as possible
4. Take breaks every 45 minutes
5. Adjust pace based on audience

### Common Questions
**Q: When should I use retries vs fixing the test?**
A: Always try to fix first. Retries are a safety net, not a solution.

**Q: Which reporter is best?**
A: Depends on team needs. Start with HTML, add others as needed.

**Q: How do I convince my team to invest time in stability?**
A: Show ROI: stable tests = faster releases = business value.

**Q: Should we skip flaky tests in production?**
A: No! Quarantine them, track them, fix them. Skipping hides problems.

---

## Session Materials Checklist

### Before Session
- [ ] Demo repository set up
- [ ] All dependencies installed
- [ ] Slide deck prepared
- [ ] Exercise solutions ready
- [ ] Student access to materials
- [ ] Backup examples prepared

### During Session
- [ ] Interactive coding sessions
- [ ] Regular check-ins with students
- [ ] Hands-on exercises completed
- [ ] Q&A time after each section
- [ ] Break times scheduled

### After Session
- [ ] Share all code examples
- [ ] Provide additional resources
- [ ] Schedule follow-up Q&A
- [ ] Collect feedback
- [ ] Send homework assignments

---

## Contact & Support

For questions or support:
- Schedule office hours
- Create Slack/Teams channel
- Share contact information
- Weekly check-in sessions

---

**Remember:** The goal is to build confident QA engineers who write stable, maintainable tests! 🎭✨
