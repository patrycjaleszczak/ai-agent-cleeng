import { test, expect } from '../src/fixtures/todoFixtures';

test.describe('TodoMVC Application', () => {
  test('should add three tasks, mark one as completed, and verify completed filter shows only one task', async ({ todoPage }) => {
    // Add three tasks: "Buy milk", "Clean house", "Do homework"
    await todoPage.addTodo('Buy milk');
    await todoPage.addTodo('Clean house');
    await todoPage.addTodo('Do homework');

    // Verify all three tasks are visible in "All" filter
    await todoPage.changeFilter('All');
    let allTodos = await todoPage.readTodosFromUI();
    expect(allTodos).toHaveLength(3);
    expect(allTodos[0].string).toBe('Buy milk');
    expect(allTodos[1].string).toBe('Clean house');
    expect(allTodos[2].string).toBe('Do homework');

    // Verify all tasks are active initially
    expect(allTodos.every(todo => todo.active)).toBe(true);
    expect(allTodos.every(todo => !todo.completed)).toBe(true);

    // Mark the first task ("Buy milk") as completed
    await todoPage.toggleTodoByText('Buy milk');

    // Verify in "All" filter that one task is completed
    allTodos = await todoPage.readTodosFromUI();
    expect(allTodos[0].completed).toBe(true);
    expect(allTodos[0].string).toBe('Buy milk');
    expect(allTodos[1].completed).toBe(false);
    expect(allTodos[2].completed).toBe(false);

    // Change filter to "Active" - should show 2 tasks
    await todoPage.changeFilter('Active');
    const activeTodos = await todoPage.readTodosFromUI();
    expect(activeTodos).toHaveLength(2);
    expect(activeTodos[0].string).toBe('Clean house');
    expect(activeTodos[1].string).toBe('Do homework');
    expect(activeTodos.every(todo => todo.active)).toBe(true);

    // Change filter to "Completed" - should show exactly 1 task
    await todoPage.changeFilter('Completed');
    const completedTodos = await todoPage.readTodosFromUI();
    
    // Verify exactly one task is visible
    expect(completedTodos).toHaveLength(1);
    
    // Verify the task is "Buy milk" and has completed === true
    expect(completedTodos[0].string).toBe('Buy milk');
    expect(completedTodos[0].completed).toBe(true);
    expect(completedTodos[0].active).toBe(false);
  });

  test('should verify all three filter tabs work correctly', async ({ todoPage }) => {
    // Add test tasks
    await todoPage.addMultipleTodos(['Task 1', 'Task 2', 'Task 3']);

    // Mark one as completed
    await todoPage.toggleTodoByIndex(1);

    // Test "All" filter - should show all 3 tasks
    await todoPage.changeFilter('All');
    const allTodos = await todoPage.readTodosFromUI();
    expect(allTodos).toHaveLength(3);

    // Test "Active" filter - should show 2 tasks
    await todoPage.changeFilter('Active');
    const activeTodos = await todoPage.readTodosFromUI();
    expect(activeTodos).toHaveLength(2);
    expect(activeTodos.every(todo => !todo.completed)).toBe(true);

    // Test "Completed" filter - should show 1 task
    await todoPage.changeFilter('Completed');
    const completedTodos = await todoPage.readTodosFromUI();
    expect(completedTodos).toHaveLength(1);
    expect(completedTodos.every(todo => todo.completed)).toBe(true);
  });
});
