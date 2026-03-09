# AI Chat Panel — Implementation Plan

> **Based on:** `mockups/ai-chat-mockup.html` · Trigger: bottom-right pill (auto-collapse + dismiss)
> **For:** UI designer / front-end implementation
> **Scope:** UI only — no backend, no LLM wiring. Static responses acceptable as stubs.

---

## Design decisions (locked)

| Decision | Value |
|---|---|
| Trigger | Bottom-right floating pill → collapses to icon after 4 s |
| Desktop chat | shadcn `Sheet` sliding in from the right, ~400 px |
| Mobile chat | Full-screen overlay (same `Sheet`, `side="bottom"` or full-screen class) |
| Dismiss | ✕ on pill → `localStorage` flag, never shown again |
| Empty state | Welcome line + 3 suggestion chips |
| Design system | Existing tokens from `globals.css` — no new colours or fonts |

---

## Visual system (from the existing site)

These are already defined in `globals.css` — use them, don't invent new values.

```
Spacing scale (8pt grid): 4 8 12 16 24 32 48 64px
Touch targets: min 44 × 44px (all interactive elements)
Border radius: --radius = 0.625rem (10px) — use consistently
Font display: "Inter Tight" (var(--font-display)) — headings, panel title
Font body: "Space Grotesk" (var(--font-body)) — body text, inputs, chips
Primary blue: hsl(227 77.2% 50.2%) — pill background, send button, user bubble
Foreground dark: hsl(240 14.3% 2.7%) — collapsed pill icon
Border: hsl(0 0% 90%) — panel dividers, input border, chip border
Muted bg: hsl(0 0% 96%) — AI message bubble background
```

**Elevation for the panel:**
```
box-shadow: -4px 0 24px rgba(0,0,0,0.08), -1px 0 4px rgba(0,0,0,0.04)
```
(Left-edge shadow only — panel slides in from the right.)

**Pill shadow (coloured, not neutral):**
```
box-shadow: 0 4px 16px hsl(227 77.2% 50.2% / 0.3)
```
Tinted with the primary blue so it feels connected to the brand.

---

## Component map

```
app/layout.tsx                     ← mount <AiChatTrigger /> globally here
components/ai-chat/
  trigger.tsx                      ← floating pill (expanded ↔ collapsed ↔ dismissed)
  panel.tsx                        ← Sheet wrapper, desktop + mobile layout
  messages.tsx                     ← message list, AI + user bubbles
  empty-state.tsx                  ← welcome + suggestion chips
  input-bar.tsx                    ← text input + send button
  use-chat-state.ts                ← open/collapsed/dismissed state + localStorage
```

Mount order: `<AiChatTrigger />` goes inside `<ThemeProvider>` in `layout.tsx`, after `{children}`, so it floats above every page.

---

## Step-by-step build order

### Step 1 — State hook (`use-chat-state.ts`)

A single hook manages everything to keep components thin.

```ts
type ChatState = "dismissed" | "collapsed" | "expanded-pill" | "open"
```

- On mount: read `localStorage.getItem("ai-chat-dismissed")`. If `"true"` → `"dismissed"`.
- Otherwise start at `"expanded-pill"`, set a 4 s timeout → `"collapsed"`.
- `open()` → `"open"` (clears timeout)
- `dismiss()` → `"dismissed"`, write `localStorage.setItem("ai-chat-dismissed", "true")`
- `close()` → `"collapsed"` (panel closes, pill returns)

No other component should touch `localStorage` directly.

---

### Step 2 — Pill trigger (`trigger.tsx`)

Three visual states driven by the hook:

**① Expanded pill** (state: `expanded-pill`)
```
background: var(--foreground)           dark, not primary blue
color: #fff
border-radius: 999px
padding: 10px 16px                      (8pt grid: 10 ≈ 12px fine-tuned, 16px)
gap: 8px
font-size: 13px, font-weight: 500
box-shadow: 0 4px 16px rgba(0,0,0,0.18)
```
Contents: `✦` spark icon · "Questions about Steven? Ask the AI" · `✕` dismiss

The `✕` is a 16×16 circle button (`background: rgba(255,255,255,0.15)`) inside the pill — not a separate element floating next to it.

**② Collapsed icon** (state: `collapsed`)
```
width: 44px; height: 44px              exact touch target
border-radius: 50%
background: var(--foreground)
box-shadow: 0 4px 16px rgba(0,0,0,0.18)
```
Contents: `✦` spark icon, centred. Tooltip on hover: "Ask about Steven".

**Transition between ① and ②:**
Animate `max-width` (9999px → 44px) + `opacity` of the label text. Use `overflow: hidden` on the pill. Duration: 300ms, `ease-in-out`. Do NOT animate `width` directly (causes layout reflow) — use `max-width` trick.

```css
.pill-label {
  overflow: hidden;
  max-width: 240px;           /* expanded */
  opacity: 1;
  transition: max-width 300ms ease-in-out, opacity 200ms ease-in-out;
  white-space: nowrap;
}
.pill-label.collapsed {
  max-width: 0;
  opacity: 0;
}
```

**③ Dismissed** (state: `dismissed`): render `null` — nothing in the DOM.

**Position:** `fixed`, `bottom: 24px`, `right: 24px`, `z-index: 50`
On mobile: `bottom: 24px` + `padding-bottom: env(safe-area-inset-bottom)` for notched devices.

---

### Step 3 — Chat panel (`panel.tsx`)

Reuse the existing shadcn `Sheet` already imported in `site-header.tsx`.

```tsx
<Sheet open={state === "open"} onOpenChange={(o) => !o && close()}>
  <SheetContent
    side="right"
    className="w-full sm:w-[400px] p-0 flex flex-col"
  >
    <PanelHeader />
    {hasMessages ? <Messages /> : <EmptyState />}
    <InputBar />
  </SheetContent>
</Sheet>
```

- `p-0` removes default Sheet padding — the panel manages its own internal spacing.
- `flex flex-col` + `flex: 1` on the message area makes the input stick to the bottom.
- On mobile (`< sm`), `w-full` gives full-screen automatically.
- The Sheet already handles: slide-in animation, focus trap, Escape to close, overlay.

**Panel header:**
```
height: 56px (matches site header)
padding: 0 16px
border-bottom: 1px solid var(--border)
```
Left: gradient avatar circle (16×16, blue→pink) + "Ask about Steven" in Inter Tight 14px/600
Right: close `✕` button (28×28, ghost, border: 1px solid border)

---

### Step 4 — Empty state (`empty-state.tsx`)

Shown when `messages.length === 0`.

```
Padding: 32px 24px
```

Layout (top-to-bottom, left-aligned):
1. Gradient avatar circle, 36×36
2. `"Ask me anything"` — Inter Tight, 16px, font-weight 600, mt: 12px
3. `"I can answer questions about Steven's experience, projects, and design process."` — Space Grotesk, 13px, muted-fg colour, mt: 4px, line-height: 1.5
4. Chip row — `flex-wrap`, gap: 8px, mt: 16px

**Suggestion chips:**
```
border: 1px solid var(--border)
border-radius: 999px
padding: 6px 12px              (6 fine-tuned from 8, 12 on grid)
font-size: 12px
background: var(--background)
color: var(--foreground)
min-height: 32px               touch target met when row-stacked on mobile
```
Hover: `border-color: var(--primary)`, `color: var(--primary)` — no background fill (keeps it light).

Default chips:
- "What's your design process?"
- "Recent projects"
- "How to contact?"

Clicking a chip populates the input and submits.

---

### Step 5 — Message bubbles (`messages.tsx`)

```
Message list: padding 16px, gap 12px, flex-col, overflow-y auto
```

**AI bubble:**
```
background: var(--muted)               hsl(0 0% 96%)
color: var(--foreground)
border-radius: 10px 10px 10px 2px     top-left corner flattened = "speaking left"
padding: 8px 12px
max-width: 88%
align-self: flex-start
font-size: 13px, line-height: 1.5
```

**User bubble:**
```
background: var(--primary)             blue
color: #fff
border-radius: 10px 10px 2px 10px     bottom-right corner flattened = "speaking right"
padding: 8px 12px
max-width: 88%
align-self: flex-end
font-size: 13px, line-height: 1.5
```

**Thinking indicator** (while AI is "typing"):
Three dots animating with staggered `opacity` pulses — use `animation-delay: 0ms / 150ms / 300ms`. Same bubble style as AI, contents are three `•` spans.

---

### Step 6 — Input bar (`input-bar.tsx`)

```
padding: 12px 16px
border-top: 1px solid var(--border)
display: flex, gap: 8px, align-items: center
padding-bottom: calc(12px + env(safe-area-inset-bottom))   safe area for mobile
```

**Text input:**
```
flex: 1
height: 36px
border: 1px solid var(--border)
border-radius: var(--radius)      10px
padding: 0 12px
font-family: var(--font-body), 13px
background: var(--background)
```
Focus ring: `ring-2 ring-ring ring-offset-2` (matches existing site focus pattern from `globals.css`).

**Send button:**
```
width: 36px; height: 36px          matches input height — shared size class
border-radius: var(--radius)
background: var(--primary)
color: #fff
icon: arrow-up (lucide ArrowUp, 16px)
```
Disabled state when input is empty: `opacity: 0.4`, `cursor: not-allowed`.

---

## Motion spec

| Element | Property | Duration | Easing |
|---|---|---|---|
| Pill label collapse | `max-width`, `opacity` | 300ms | `ease-in-out` |
| Pill → dismissed | `opacity`, `transform: scale(0.8)` | 200ms | `ease-in` |
| Chat panel slide-in | handled by shadcn Sheet | 300ms | shadcn default |
| Message bubble appear | `opacity: 0→1`, `translateY(4px→0)` | 200ms | `ease-out` |
| Chip hover | `border-color`, `color` | 150ms | `ease-out` |

**Rules:**
- Only animate `transform` and `opacity` (GPU-accelerated, no layout reflow)
- Respect `prefers-reduced-motion`: wrap animations in `@media (prefers-reduced-motion: no-preference)` — `globals.css` already has a pattern for this

---

## Accessibility checklist

- [ ] Pill button has `aria-label="Ask about Steven"`
- [ ] Collapsed icon has `title="Ask about Steven"` + `aria-label`
- [ ] `Sheet` already provides focus trap and `role="dialog"` via shadcn
- [ ] Chat panel has `aria-label="Chat with Steven's AI assistant"`
- [ ] Input has `aria-label="Type your question"` (no visible label — label is implicit from context)
- [ ] Send button has `aria-label="Send message"`
- [ ] Message list has `role="log"` + `aria-live="polite"` so screen readers announce new messages
- [ ] All interactive elements: min 44×44px touch target
- [ ] Colour contrast: primary blue on white = 4.6:1 ✓ (passes WCAG AA)
- [ ] Dismiss ✕ inside pill: `aria-label="Dismiss chat prompt"`

---

## Dark mode

The site's existing dark tokens handle most of this automatically. Two chat-specific additions needed in `globals.css`:

```css
.dark {
  --chat-bubble-ai: hsl(240 6% 14%);      /* matches --muted dark */
  --chat-bubble-ai-fg: hsl(0 0% 95%);     /* matches --foreground dark */
}
```

The pill uses `var(--foreground)` as its background — in dark mode this becomes near-white, so the pill flips to a light pill with dark text. Test both.

---

## What's out of scope (for later)

- API route + LLM integration
- Curated "about Steven" context document
- Rate limiting
- Message persistence across sessions
- Logging / analytics on chat interactions

Stub the response for now: clicking send or a chip adds the user message, then after 800ms adds a hardcoded AI reply ("Thanks for asking! This is a placeholder response while the AI is being wired up.").
