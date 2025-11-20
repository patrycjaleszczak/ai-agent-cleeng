# 🚀 Quick Start Guide

## Run Tests Immediately

### Option 1: Run All Tests (Recommended First Run)
```bash
npm test
```

### Option 2: Run Basic Login Tests Only
```bash
npm run test:basic
```
**Target Site**: https://www.saucedemo.com/  
**Tests**: 3 tests using simple login fixture

### Option 3: Run Advanced Worker Fixture Tests Only
```bash
npm run test:advanced
```
**Target Site**: https://the-internet.herokuapp.com/secure  
**Tests**: 4 tests using worker-scoped fixture with storageState

---

## 📋 What You'll See

### Total Tests: 21 (7 tests × 3 browsers)

**Basic Tests (9 runs)**:
- ✅ Verify user login and product view
- ✅ Add product to cart
- ✅ Access account menu

**Advanced Tests (12 runs)**:
- ✅ Access secure area with saved state
- ✅ Verify logout functionality
- ✅ Maintain auth state across navigation
- ✅ Verify secure area elements

---

## 🎯 Key Features Implemented

### 1️⃣ Basic Login Fixture
- **File**: `fixtures/basicLoginFixture.ts`
- **Usage**: Test-scoped, logs in before each test
- **Site**: SauceDemo
- **Performance**: Standard (login per test)

### 2️⃣ Advanced Worker Fixture  
- **File**: `fixtures/advancedWorkerFixture.ts`
- **Usage**: Worker-scoped, saves authentication state
- **Site**: The Internet (Heroku)
- **Performance**: Optimized (login once per worker)

---

## 📊 Test Results Location

After running tests, view results at:
- **HTML Report**: `playwright-report/index.html`
- **Test Results**: `test-results/`
- **Auth State**: `.auth/user.json` (for advanced tests)

---

## 🔍 View HTML Report

```bash
npm run test:report
```

---

## 🐛 Debug Mode

```bash
npm run test:debug
```

---

## 👀 Headed Mode (See Browser)

```bash
npm run test:headed
```

---

## 📚 Full Documentation

See `README_AUTOMATION.md` for comprehensive documentation.

---

**Ready to run! Just execute: `npm test`** 🎉
