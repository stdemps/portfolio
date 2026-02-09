import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Product Workspace
 *
 * Configured for TDD + UI verification workflows with screenshot support.
 * Optimized for mobile-first development with responsive breakpoints.
 */
export default defineConfig({
  testDir: './e2e',

  // Maximum time one test can run
  timeout: 30 * 1000,

  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html'],
    ['list'],
  ],

  // Shared settings for all projects
  use: {
    // Base URL for your development server
    baseURL: 'http://localhost:3000',

    // Screenshot settings for UI verification
    screenshot: 'only-on-failure',

    // Collect trace on first retry for debugging
    trace: 'on-first-retry',

    // Video recording
    video: 'retain-on-failure',
  },

  // Configure projects for major browsers and mobile viewports
  projects: [
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['iPhone 12 Pro'],
        viewport: { width: 375, height: 667 }, // Mobile-first: 375px
      },
    },
    {
      name: 'Tablet',
      use: {
        ...devices['iPad Pro'],
        viewport: { width: 768, height: 1024 }, // Tablet: 768px
      },
    },
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 768 }, // Desktop: 1024px
      },
    },
    {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1024, height: 768 },
      },
    },
    {
      name: 'Desktop Safari',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1024, height: 768 },
      },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
