import { Page, Locator } from '@playwright/test';
import { TodoItem, TodoFilter } from '../types/todo.types';

/**
 * Page Object for TodoMVC application
 */
export class TodoMvcPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoList: Locator;
  readonly todoItems: Locator;
  readonly filterAll: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;
  readonly todoCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.locator('.new-todo');
    this.todoList = page.locator('.todo-list');
    this.todoItems = page.locator('.todo-list li');
    this.filterAll = page.locator('a[href="#/"]');
    this.filterActive = page.locator('a[href="#/active"]');
    this.filterCompleted = page.locator('a[href="#/completed"]');
    this.todoCount = page.locator('.todo-count');
  }

  /**
   * Navigate to the TodoMVC application
   */
  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  /**
   * Add a new todo item
   * @param todoText - The text of the todo to add
   */
  async addTodo(todoText: string) {
    await this.newTodoInput.fill(todoText);
    await this.newTodoInput.press('Enter');
  }

  /**
   * Add multiple todo items
   * @param todos - Array of todo texts to add
   */
  async addMultipleTodos(todos: string[]) {
    for (const todo of todos) {
      await this.addTodo(todo);
    }
  }

  /**
   * Toggle a todo item's completed status by its text
   * @param todoText - The text of the todo to toggle
   */
  async toggleTodoByText(todoText: string) {
    const todoItem = this.page.locator('.todo-list li', { hasText: todoText });
    await todoItem.locator('.toggle').check();
  }

  /**
   * Toggle a todo item's completed status by its index
   * @param index - The index of the todo to toggle (0-based)
   */
  async toggleTodoByIndex(index: number) {
    await this.todoItems.nth(index).locator('.toggle').click();
  }

  /**
   * Change the filter
   * @param filter - The filter to apply ('All', 'Active', or 'Completed')
   */
  async changeFilter(filter: TodoFilter) {
    switch (filter) {
      case 'All':
        await this.filterAll.click();
        break;
      case 'Active':
        await this.filterActive.click();
        break;
      case 'Completed':
        await this.filterCompleted.click();
        break;
    }
  }

  /**
   * Read all visible todos from the UI and return as TodoItem objects
   * @returns Promise<TodoItem[]> - Array of visible todo items
   */
  async readTodosFromUI(): Promise<TodoItem[]> {
    const visibleTodos = await this.todoItems.all();
    const todos: TodoItem[] = [];

    for (let i = 0; i < visibleTodos.length; i++) {
      const todoItem = visibleTodos[i];
      const isVisible = await todoItem.isVisible();
      
      if (isVisible) {
        const text = await todoItem.locator('label').textContent();
        const isCompleted = await todoItem.locator('.toggle').isChecked();
        const classes = await todoItem.getAttribute('class');
        
        todos.push({
          id: `todo-${i}`,
          string: text?.trim() || '',
          active: !isCompleted,
          completed: isCompleted
        });
      }
    }

    return todos;
  }

  /**
   * Get the count of visible todo items
   * @returns Promise<number> - Number of visible todo items
   */
  async getVisibleTodoCount(): Promise<number> {
    const todos = await this.readTodosFromUI();
    return todos.length;
  }

  /**
   * Get all completed todos
   * @returns Promise<TodoItem[]> - Array of completed todo items
   */
  async getCompletedTodos(): Promise<TodoItem[]> {
    const todos = await this.readTodosFromUI();
    return todos.filter(todo => todo.completed);
  }

  /**
   * Get all active todos
   * @returns Promise<TodoItem[]> - Array of active todo items
   */
  async getActiveTodos(): Promise<TodoItem[]> {
    const todos = await this.readTodosFromUI();
    return todos.filter(todo => todo.active);
  }
}
