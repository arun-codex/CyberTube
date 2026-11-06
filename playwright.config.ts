import { randomBytes } from 'node:crypto';
import { defineConfig, devices } from '@playwright/test';

// Generate a fresh secret for each local Playwright invocation. It is shared
// only between this test runner and the local webServer process.
const playwrightTestAuthSecret = randomBytes(32).toString('hex');
process.env.CYBERTUBE_ENABLE_TEST_AUTH = 'true';
process.env.CYBERTUBE_TEST_AUTH_SECRET = playwrightTestAuthSecret;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    // Do not reuse a separately started server with a different test secret.
    reuseExistingServer: false,
    timeout: 120000,
    env: {
      CYBERTUBE_ENABLE_TEST_AUTH: 'true',
      CYBERTUBE_TEST_AUTH_SECRET: playwrightTestAuthSecret,
    },
  },
});
