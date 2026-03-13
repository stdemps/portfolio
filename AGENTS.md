# AGENTS.md

## Cursor Cloud specific instructions

### Services

This is a single Next.js 16 portfolio site — no databases, Docker, or background workers required.

| Service | Command | Port | Notes |
|---|---|---|---|
| Next.js dev server | `npm run dev` | 3000 | Only process needed for the full site |

### Lint / Test / Build

- **Lint:** `npm run lint` calls `next lint`, which was removed in Next.js 16. Use `npx eslint .` instead. Pre-existing lint errors exist in the codebase (unescaped entities, conditional hooks in `moog-playground.tsx`).
- **Unit tests:** `npm run test:unit` (Vitest). 7 tests in `ai-chat.test.tsx` fail due to a missing `window.matchMedia` mock in the jsdom environment — this is a pre-existing issue, not caused by code changes.
- **E2E tests:** `npm test` (Playwright, Chromium only is sufficient). Requires `npx playwright install --with-deps chromium` if browsers aren't installed.
- **Build:** `npm run build` — compiles without errors.
- **Dev server:** `npm run dev` — starts on port 3000.

### Gotchas

- The AI chat feature (`/api/chat` route) requires an `ANTHROPIC_API_KEY` env var. The rest of the site works fully without it.
- The AI chat trigger may be hidden if `localStorage` key `sd-chat-dismissed` is set to `"true"`. Clear it to re-enable: `localStorage.removeItem("sd-chat-dismissed")`.
- The `package.json` has `"type"` unset (defaults to CJS), but `eslint.config.js` uses ESM syntax. ESLint still works but emits a warning about module type detection. Adding `"type": "module"` to `package.json` would resolve the warning.
