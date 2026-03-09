// e2e/ui-accessibility.spec.ts
import { test, expect } from "@playwright/test";

test.describe("UI Accessibility", () => {
  test("navigation links have aria-labels", async ({ page }) => {
    await page.goto("/");
    const navLinks = page.locator("nav[aria-label='Main navigation'] a");
    const count = await navLinks.count();
    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      await expect(link).toHaveAttribute("aria-label");
    }
  });

  test("menu button has correct aria attributes", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "Mobile Chrome",
      "Menu button is only visible on mobile (md:hidden)",
    );
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: /open menu/i });
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute("aria-expanded");
  });

  test("hover animation does not cause layout shift", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name === "Mobile Chrome",
      "Desktop nav links are hidden on mobile; hover test needs visible links",
    );
    await page.goto("/");
    const firstLink = page
      .locator("nav[aria-label='Main navigation'] a")
      .first();
    const before = await firstLink.boundingBox();
    await firstLink.hover();
    const after = await firstLink.boundingBox();
    // Ensure position and size remain the same (allow small tolerance)
    expect(Math.abs((before?.x ?? 0) - (after?.x ?? 0))).toBeLessThanOrEqual(1);
    expect(Math.abs((before?.y ?? 0) - (after?.y ?? 0))).toBeLessThanOrEqual(1);
    expect(
      Math.abs((before?.width ?? 0) - (after?.width ?? 0)),
    ).toBeLessThanOrEqual(1);
    expect(
      Math.abs((before?.height ?? 0) - (after?.height ?? 0)),
    ).toBeLessThanOrEqual(1);
  });
});
