import { test, expect } from '@playwright/test';

/**
 * Example E2E Test with Screenshot Verification
 *
 * This test demonstrates TDD + UI verification workflow:
 * 1. Write tests that define expected behavior
 * 2. Implement features to pass tests
 * 3. Generate screenshots for visual verification
 * 4. Verify UI correctness across responsive breakpoints
 */

test.describe('Homepage', () => {
  test('should display welcome message and be accessible', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Test: Verify page title
    await expect(page).toHaveTitle(/App Name/);

    // Test: Verify welcome message is visible
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    // Test: Verify theme toggle button exists (accessibility)
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();

    // UI Verification: Take screenshot for visual review
    await page.screenshot({
      path: 'screenshots/homepage-default.png',
      fullPage: true,
    });
  });

  test('should toggle dark mode correctly', async ({ page }) => {
    await page.goto('/');

    // Get theme toggle button
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });

    // UI Verification: Screenshot before toggle
    await page.screenshot({
      path: 'screenshots/homepage-light-mode.png',
      fullPage: true,
    });

    // Test: Click theme toggle
    await themeToggle.click();

    // Wait for theme transition
    await page.waitForTimeout(300);

    // UI Verification: Screenshot after toggle
    await page.screenshot({
      path: 'screenshots/homepage-dark-mode.png',
      fullPage: true,
    });

    // Test: Verify dark mode class applied
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Test: Tab navigation works
    await page.keyboard.press('Tab');

    // Test: Theme toggle is focusable
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await expect(themeToggle).toBeFocused();

    // Test: Enter key activates toggle
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    // Verify theme switched via keyboard
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // UI Verification: Screenshot of keyboard navigation state
    await page.screenshot({
      path: 'screenshots/homepage-keyboard-nav.png',
      fullPage: true,
    });
  });
});

test.describe('Responsive Design', () => {
  test('should render correctly on mobile (375px)', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Test: Content is visible
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    // Test: No horizontal scroll
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // Allow 1px tolerance

    // UI Verification: Mobile screenshot
    await page.screenshot({
      path: 'screenshots/homepage-mobile-375px.png',
      fullPage: true,
    });
  });

  test('should render correctly on tablet (768px)', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Test: Layout adjusts for tablet
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    // UI Verification: Tablet screenshot
    await page.screenshot({
      path: 'screenshots/homepage-tablet-768px.png',
      fullPage: true,
    });
  });

  test('should render correctly on desktop (1024px)', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');

    // Test: Full layout visible
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    // UI Verification: Desktop screenshot
    await page.screenshot({
      path: 'screenshots/homepage-desktop-1024px.png',
      fullPage: true,
    });
  });
});

test.describe('Accessibility', () => {
  test('should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/');

    // Test: Theme toggle has accessible name
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await expect(themeToggle).toHaveAccessibleName();

    // Test: Main landmark exists
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // UI Verification: Screenshot with accessibility tree
    await page.screenshot({
      path: 'screenshots/homepage-accessibility.png',
      fullPage: true,
    });
  });
});
