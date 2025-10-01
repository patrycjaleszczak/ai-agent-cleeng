import { defineConfig } from '@playwright/test';

// Base URL precedence: BASE_URL > PW_BASE_URL > schema default
const defaultBaseUrlFromSchema = 'https://api.cleeng.com/3.1';
const baseURL = process.env.BASE_URL || process.env.PW_BASE_URL || defaultBaseUrlFromSchema;

export default defineConfig({
  testDir: 'tests',
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  reporter: [['list']],
  use: {
    baseURL,
  },
  projects: [
    {
      name: 'api',
      use: {
        baseURL,
      },
    },
  ],
});

