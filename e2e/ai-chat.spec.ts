import { test, expect } from "@playwright/test"

test.describe("AI Chat", () => {
  test.beforeEach(async ({ page }) => {
    // Clear dismiss flag then load so chat trigger is visible
    await page.goto("/")
    await page.evaluate(() => localStorage.removeItem("ai-chat-dismissed"))
    await page.reload()
  })

  test("shows chat trigger on the page", async ({ page }) => {
    await page.goto("/")
    const trigger = page.getByRole("button", { name: /ask about steven/i })
    await expect(trigger).toBeVisible({ timeout: 10000 })
  })

  test("opens chat panel when trigger is clicked", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /ask about steven/i })
    await expect(trigger).toBeVisible({ timeout: 10000 })
    await trigger.click()

    const panel = page.getByRole("dialog", { name: /ask about steven/i })
    await expect(panel).toBeVisible()
    await expect(panel.getByText(/ask me anything/i)).toBeVisible()
    await expect(panel.getByText(/suggested/i)).toBeVisible()
  })

  test("closes panel when close button is clicked", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /ask about steven/i })
    await expect(trigger).toBeVisible({ timeout: 10000 })
    await trigger.click()

    const panel = page.getByRole("dialog", { name: /ask about steven/i })
    await expect(panel).toBeVisible()

    await panel.getByRole("button", { name: /close chat/i }).click()
    await expect(panel).not.toBeVisible()
  })

  test("suggestion chip sends a message when clicked", async ({ page }) => {
    await page.route("**/api/chat", async (route) => {
      await route.fulfill({
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        body: "Steven leads product design at KPMG UK.",
      })
    })

    const trigger = page.getByRole("button", { name: /ask about steven/i })
    await expect(trigger).toBeVisible({ timeout: 10000 })
    await trigger.click()

    const panel = page.getByRole("dialog", { name: /ask about steven/i })
    await expect(panel).toBeVisible()

    await panel.getByRole("button", { name: /what's your design process\?/i }).click()

    await expect(panel.getByText(/steven leads product design at kpmg uk/i)).toBeVisible({
      timeout: 10000,
    })
  })

  test("can type and send a message", async ({ page }) => {
    await page.route("**/api/chat", async (route) => {
      await route.fulfill({
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        body: "You can reach Steven at steven.dempster@hotmail.co.uk.",
      })
    })

    const trigger = page.getByRole("button", { name: /ask about steven/i })
    await expect(trigger).toBeVisible({ timeout: 10000 })
    await trigger.click()

    const panel = page.getByRole("dialog", { name: /ask about steven/i })
    await expect(panel).toBeVisible()

    const input = panel.getByRole("textbox", { name: /type your question/i })
    await input.fill("How do I contact Steven?")
    await input.press("Enter")

    await expect(panel.getByText(/steven\.dempster@hotmail\.co\.uk/i)).toBeVisible({
      timeout: 10000,
    })
  })

  test("dismissing hides trigger and persists across reload", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /ask about steven/i })
    await expect(trigger).toBeVisible({ timeout: 10000 })

    // Test persistence: set dismiss flag (same key the UI uses) and reload
    await page.evaluate(() => localStorage.setItem("ai-chat-dismissed", "true"))
    await page.reload()
    await expect(page.getByRole("button", { name: /ask about steven/i })).not.toBeVisible()
  })
})

test.describe("AI Chat - accessibility", () => {
  test("chat panel has accessible dialog and form controls", async ({ page }) => {
    await page.goto("/")
    await page.evaluate(() => localStorage.removeItem("ai-chat-dismissed"))
    await page.reload()

    const trigger = page.getByRole("button", { name: /ask about steven/i })
    await expect(trigger).toBeVisible({ timeout: 10000 })
    await trigger.click()

    const panel = page.getByRole("dialog", { name: /ask about steven/i })
    await expect(panel).toBeVisible()
    expect(await panel.getAttribute("aria-label")).toMatch(/chat with steven's ai assistant/i)
    await expect(panel.getByRole("textbox", { name: /type your question/i })).toBeVisible()
    await expect(panel.getByRole("button", { name: /send message/i })).toBeVisible()
  })
})
