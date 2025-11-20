/**
 * Product interface representing a product on the inventory page
 */
export interface Product {
  name: string;
  description: string;
  image: string;
  price?: number;
}

/**
 * Expected product order configuration for testing sort functionality
 */
export interface ExpectedProductOrder {
  sortSetting: string;
  expectedFirst: string;
}

/**
 * Sort option values available on the inventory page
 */
export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

/**
 * Login credentials interface
 */
export interface Credentials {
  username: string;
  password: string;
}
