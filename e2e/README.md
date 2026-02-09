# End-to-End Tests

This directory contains E2E tests using Playwright with screenshot verification support.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode (interactive)
npx playwright test --ui

# Run specific test file
npx playwright test e2e/example.spec.ts

# Run tests for specific project (device)
npx playwright test --project="Mobile Chrome"

# Debug tests
npx playwright test --debug
```

## Screenshot Verification Workflow

Tests generate screenshots in the `screenshots/` directory for visual verification:

1. **Run tests** - Screenshots are generated automatically
2. **Review screenshots** - Check for UI correctness, accessibility, responsive design
3. **Rename verified screenshots** - Add `verified_` prefix when UI is correct:
   ```bash
   mv screenshots/homepage-mobile-375px.png screenshots/verified_homepage-mobile-375px.png
   ```
4. **Commit verified screenshots** - Track verified UI states in version control

## Test Structure

Each test file should follow this pattern:

```typescript
test('feature description', async ({ page }) => {
  // 1. Setup
  await page.goto('/');

  // 2. Test behavior
  const element = page.getByRole('button');
  await expect(element).toBeVisible();

  // 3. UI Verification (optional)
  await page.screenshot({
    path: 'screenshots/feature-name.png',
    fullPage: true,
  });
});
```

## Responsive Testing

Tests include three breakpoints matching workspace standards:

- **Mobile**: 375px width
- **Tablet**: 768px width
- **Desktop**: 1024px width

## Accessibility Testing

All tests verify:
- WCAG 2.1 AA compliance
- Keyboard navigation
- Proper ARIA attributes
- Focus management
- Screen reader compatibility

## TDD Workflow

1. **Write failing tests** - Define expected behavior before implementation
2. **Implement feature** - Write code to pass tests
3. **Run tests** - Verify functionality
4. **Review screenshots** - Check visual correctness
5. **Refactor** - Improve code while keeping tests green

## TDD + UI Verification Workflow

1. Write tests in `e2e/[feature].spec.ts`
2. Implement feature to pass tests
3. Generate screenshots during test runs
4. Review screenshots for UI correctness
5. Rename verified screenshots with `verified_` prefix
