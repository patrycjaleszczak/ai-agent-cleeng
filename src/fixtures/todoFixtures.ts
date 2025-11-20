import { test as base } from '@playwright/test';
import { TodoMvcPage } from '../pages/TodoMvcPage';

/**
 * Extended test fixtures with TodoMvcPage
 */
type TodoFixtures = {
  todoPage: TodoMvcPage;
};

/**
 * Custom fixtures that provide a TodoMvcPage instance
 */
export const test = base.extend<TodoFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoMvcPage(page);
    await todoPage.goto();
    await use(todoPage);
  },
});

export { expect } from '@playwright/test';
