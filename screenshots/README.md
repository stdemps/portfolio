# Screenshots Directory

This directory stores screenshots generated during E2E testing for visual UI verification.

## Workflow

### 1. Generate Screenshots

Tests automatically generate screenshots in this directory:

```typescript
await page.screenshot({
  path: 'screenshots/feature-name.png',
  fullPage: true,
});
```

### 2. Review for Correctness

Check each screenshot for:
- ✅ Accessibility (contrast ratios, readable text)
- ✅ Responsive design (no horizontal scroll, proper layout)
- ✅ Component styling (shadcn/ui components render correctly)
- ✅ Alignment (elements properly positioned)
- ✅ Theme (light/dark mode works)

### 3. Verify and Rename

When a screenshot shows correct UI, add `verified_` prefix:

```bash
mv screenshots/feature-mobile.png screenshots/verified_feature-mobile.png
```

### 4. Git Tracking

- **Unverified screenshots** (`*.png`) - Ignored by git (not tracked)
- **Verified screenshots** (`verified_*.png`) - Tracked in version control

This ensures only approved UI states are committed.

## TDD + UI Verification Workflow

1. Tests generate screenshots automatically
2. Review screenshots for UI correctness
3. Rename correct screenshots with `verified_` prefix
4. Only verified screenshots are tracked in git

## Naming Convention

Use descriptive names indicating what's being shown:

**Good examples:**
- `feature-mobile-375px.png` → `verified_feature-mobile-375px.png`
- `button-hover-state.png` → `verified_button-hover-state.png`
- `dark-mode-homepage.png` → `verified_dark-mode-homepage.png`

**Include in name:**
- Feature/component name
- State being shown (default, hover, error, etc.)
- Viewport size if responsive (mobile, tablet, desktop OR 375px, 768px, 1024px)
- Theme if applicable (light, dark)

## Cleaning Up

Periodically remove old unverified screenshots:

```bash
# Remove all unverified screenshots (be careful!)
rm screenshots/*.png

# Keep verified screenshots
ls screenshots/verified_*.png
```

## Integration with Quality Gates

Screenshots are reviewed manually or by Claude during development.

They are NOT automatically checked by pre-commit hooks - verification is a human or agent review process.
