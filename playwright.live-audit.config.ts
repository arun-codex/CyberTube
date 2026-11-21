import { defineConfig,devices } from '@playwright/test';

/**
 * Explicit, read-only LIVE browser audit. No webServer, no local test-user
 * override, and no credentials. Never use this for production mutations.
 */
export default defineConfig({
  testDir:'./audit/live',
  timeout:120000,
  expect:{timeout:15000},
  workers:2,
  retries:0,
  reporter:[['list'],['html',{outputFolder:'audit/live-report',open:'never'}]],
  use:{
    ...devices['Desktop Chrome'],
    baseURL:'https://cybertube-mu.vercel.app',
    screenshot:'only-on-failure',
    trace:'retain-on-failure',
    navigationTimeout:30000,
    actionTimeout:12000,
  },
  projects:[{name:'chromium-live',use:{...devices['Desktop Chrome']}}],
});
