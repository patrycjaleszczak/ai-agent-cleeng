# Playwright TodoMVC Automation Project

This is a comprehensive QA automation project for testing the TodoMVC application using Playwright with TypeScript.

## Project Structure

```
/workspace/
├── src/
│   ├── types/
│   │   └── todo.types.ts          # TypeScript interfaces for TodoItem
│   ├── pages/
│   │   └── TodoMvcPage.ts         # Page Object Model for TodoMVC
│   └── fixtures/
│       └── todoFixtures.ts        # Custom Playwright fixtures
├── tests/
│   └── todomvc.spec.ts            # Test specifications
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## Features

- ✅ **TypeScript Support**: Fully typed with custom interfaces
- ✅ **Page Object Model**: Clean, maintainable page objects
- ✅ **Custom Fixtures**: Reusable test fixtures for TodoMVC page
- ✅ **Chrome Browser**: Configured to run tests in Chromium
- ✅ **Proper Types & Interfaces**: TodoItem interface with all required fields
- ✅ **Helper Functions**: `readTodosFromUI()` to fetch tasks from the DOM

## Installation

```bash
npm install
npx playwright install chromium
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in UI mode
npm run test:ui

# Debug tests
npm run test:debug

# View test report
npm run report
```

## Test Scenarios

### Main Test: Todo Management with Filters
1. Adds three tasks: "Buy milk", "Clean house", "Do homework"
2. Verifies all tasks are visible in "All" filter
3. Marks "Buy milk" as completed (checkbox)
4. Changes filter to "Active" - verifies 2 tasks shown
5. Changes filter to "Completed" - verifies exactly 1 task shown
6. Uses `readTodosFromUI()` helper function to fetch tasks
7. Validates that the completed task has `completed === true`

### Additional Test: Filter Functionality
- Tests all three filter tabs (All, Active, Completed)
- Verifies correct task visibility based on filter

## TypeScript Interfaces

### TodoItem Interface
```typescript
interface TodoItem {
  id: string;
  string: string;        // Task description
  active: boolean;       // Is task active (not completed)
  completed: boolean;    // Is task completed (checkbox checked)
}
```

## Page Object Methods

- `goto()` - Navigate to TodoMVC app
- `addTodo(text)` - Add a single todo
- `addMultipleTodos(todos[])` - Add multiple todos
- `toggleTodoByText(text)` - Toggle todo by text
- `toggleTodoByIndex(index)` - Toggle todo by index
- `changeFilter(filter)` - Change filter (All/Active/Completed)
- `readTodosFromUI()` - Read all visible todos as TodoItem objects
- `getVisibleTodoCount()` - Get count of visible todos
- `getCompletedTodos()` - Get all completed todos
- `getActiveTodos()` - Get all active todos

## Configuration

The project is configured to:
- Run tests in Chromium (Desktop Chrome)
- Capture screenshots on failure
- Record video on failure
- Generate HTML reports
- Retry failed tests in CI environment

## Task Requirements Met

✅ TypeScript types defined (TodoItem interface)  
✅ Page Object Model implemented (TodoMvcPage)  
✅ Custom fixtures created (todoFixtures)  
✅ Chrome browser configured  
✅ Helper function `readTodosFromUI()` implemented  
✅ Test adds "Buy milk", "Clean house", "Do homework"  
✅ Test marks one task as completed  
✅ Test changes filter to "Completed"  
✅ Test verifies exactly one task is visible  
✅ Test validates `completed === true` in TodoItem object  
✅ All three tabs tested (All, Active, Completed)

## License

ISC
