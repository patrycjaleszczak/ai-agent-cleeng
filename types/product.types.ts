/**
 * Product-related types and interfaces
 */

export interface Product {
  name: string;
  price?: string;
  imageUrl?: string;
  description?: string;
  availability?: string;
}

export interface ProductCard {
  name: string;
  price: string;
  imageUrl: string;
  link: string;
}

export interface NavigationItem {
  name: string;
  link: string;
  isVisible: boolean;
}

export interface PageValidation {
  url: string;
  title: string;
  isLoaded: boolean;
}

export interface FilterOption {
  name: string;
  count?: number;
  isSelected: boolean;
}

export interface BreadcrumbItem {
  text: string;
  link?: string;
  isActive: boolean;
}
