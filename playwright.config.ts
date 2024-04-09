import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    launchOptions: {
      slowMo: 50,
    },
    actionTimeout: 0,
    trace: 'on-all-retries',
    screenshot: 'only-on-failure',
    video: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        headless: false,
        ...devices['Desktop Chrome'],
      },
    },

  ],

  outputDir: 'test-results/',
};

export default config;
