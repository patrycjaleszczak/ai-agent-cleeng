import { defineConfig } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Load env first from .env, then override with .env.staging if present
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const envStagingPath = path.resolve(process.cwd(), '.env.staging');
if (fs.existsSync(envStagingPath)) {
  dotenv.config({ path: envStagingPath, override: true });
}

// Base URL precedence: BASE_URL > PW_BASE_URL > schema default
const defaultBaseUrlFromSchema = 'https://api.staging.stardustlab.com';
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

