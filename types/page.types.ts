import { Page, Locator } from '@playwright/test';

/**
 * Base page configuration
 */
export interface PageConfig {
  page: Page;
  baseURL?: string;
}

/**
 * Common page elements
 */
export interface CommonElements {
  header: Locator;
  footer: Locator;
  navigation: Locator;
  logo: Locator;
  searchBar?: Locator;
  userAccount?: Locator;
  cart?: Locator;
}

/**
 * Cookie consent configuration
 */
export interface CookieConsent {
  banner: Locator;
  acceptButton: Locator;
  rejectButton?: Locator;
}
