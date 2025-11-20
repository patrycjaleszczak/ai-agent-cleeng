/**
 * TodoItem interface representing a single todo item
 */
export interface TodoItem {
  id: string;
  string: string;
  active: boolean;
  completed: boolean;
}

/**
 * Filter types for TodoMVC
 */
export type TodoFilter = 'All' | 'Active' | 'Completed';
