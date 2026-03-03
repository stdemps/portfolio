# Portfolio Quality Audit Report

**Date:** March 3, 2025  
**Scope:** Steven Dempster portfolio (Next.js)  
**Method:** Systematic scan across Accessibility, Performance, Theming, Responsive Design, and Anti-Patterns  
**Reference:** frontend-design skill, WCAG 2.1 AA, project UI guidelines

---

## Anti-Patterns Verdict

**Pass (with caveats).** The site does not read as generic AI output. It has a clear aesthetic point-of-view: a Framer-matched portfolio with a distinctive **Moog synthesizer playground mode** that creates strong differentiation. Specific observations:

**Avoids common AI tells:**
- No cyan-on-dark, purple-to-blue gradients, or neon accents as default aesthetic
- No Inter/Roboto (uses Inter Tight, Space Grotesk, Space Mono, VT323)
- No hero metric template (big number + small label + gradient accent)
- No identical card grids—bento layout, testimonials, and work sections vary
- No glassmorphism everywhere—backdrop blur used sparingly (header only)
- No bounce/elastic easing—animations use ease-out, ease-in-out

**Minor tells (acceptable in context):**
- Colored accent text in hero (heroBlue, heroPink)—intentional brand match to Framer, not decorative gradient text
- Moog Playground uses emerald/green accents on dark—intentional skeuomorphic VFD aesthetic, not generic “neon on dark”
- Some rounded cards with borders—but varied layouts (bento, timeline, testimonial cards) prevent monotony
- Moog Playground defaults to dark mode—contextual (synth hardware), not lazy “cool” default

**Conclusion:** The dual Simple/Playground modes and Moog hardware theme make this feel hand-crafted, not templated. Anti-patterns verdict: **pass**.

---

## Executive Summary

| Metric | Count |
|--------|-------|
| **Critical issues** | 2 |
| **High-severity issues** | 6 |
| **Medium-severity issues** | 12 |
| **Low-severity issues** | 8 |

**Overall quality score:** Good — solid accessibility baseline, distinctive design, and thoughtful implementation. Priority fixes: mobile navigation, KeyboardHint interaction, and touch target sizing.

**Top 5 critical/high issues:**
1. **Mobile navigation hidden** — Work, Experience, Testimonials, About, Contact links unavailable on mobile
2. **KeyboardHint non-functional** — `pointer-events-none` blocks click-to-dismiss
3. **Error page outside main landmark** — Skip link and semantic structure broken on error route
4. **Touch targets &lt; 44px** — Switch, Moog LED buttons, patch dots, ControlKnob
5. **Theme toggle redundant labels** — Potential double announcement in screen readers

**Recommended next steps:**
1. Add mobile navigation (Sheet/drawer or simplified nav bar)
2. Fix KeyboardHint so dismiss works (remove `pointer-events-none` or use a child button)
3. Align error page with layout landmarks
4. Increase touch target sizes for small controls
5. Use `/normalize` for theming consistency (hard-coded Moog colors → design tokens where possible)

---

## Detailed Findings by Severity

### Critical Issues

#### C1. Mobile navigation hidden — no access to section links on small screens

- **Location:** `components/portfolio/site-header.tsx` line 37: `<nav className="hidden md:block">`
- **Severity:** Critical
- **Category:** Responsive / Accessibility
- **Description:** Navigation to Work, Experience, Testimonials, About, and Contact is hidden below `md` (768px). On mobile, users cannot reach these sections except by scrolling.
- **Impact:** Violates "Don't hide critical functionality on mobile" (frontend-design skill). Recruiters and hiring managers on phones lose direct access to key content.
- **WCAG/Standard:** WCAG 2.1 2.1.1 (Keyboard), 2.4.1 (Bypass Blocks) — reduced ability to navigate efficiently.
- **Recommendation:** Add a mobile nav pattern: Sheet/drawer with section links, or a compact bottom/top bar with links. Ensure touch targets ≥ 44px.
- **Suggested command:** `/harden` (responsive + a11y)

---

#### C2. Error page outside main landmark — skip link and structure broken

- **Location:** `app/error.tsx` — content wrapped in `<div>`, layout provides skip link to `#main`
- **Severity:** Critical
- **Category:** Accessibility
- **Description:** Error route replaces children; the error content is rendered in place of `main` but may not be inside a landmark with `id="main"`. Skip link targets `#main`; if error bypasses layout or `main` is missing, skip link fails.
- **Impact:** Screen reader users and keyboard users may not reach error content or recover from errors.
- **WCAG/Standard:** WCAG 2.1 2.4.1 (Bypass Blocks), 4.1.2 (Name, Role, Value)
- **Recommendation:** Ensure error content lives inside `<main id="main">` (e.g. layout always wraps children in main, or error page includes `<main id="main" role="main">`). Verify skip link behavior on error route.
- **Suggested command:** `/harden`

---

### High-Severity Issues

#### H1. KeyboardHint has `pointer-events-none` but `onClick` — dismiss never fires

- **Location:** `components/portfolio/moog-playground.tsx` lines 454–457: `KeyboardHint` wrapper has `pointer-events-none` and `onClick={onDismiss}`
- **Severity:** High
- **Category:** Accessibility / Interaction
- **Description:** The hint is not dismissible by click because the container blocks pointer events.
- **Impact:** Users cannot dismiss the hint; only keyboard interaction or key press clears it.
- **Recommendation:** Remove `pointer-events-none` from the interactive wrapper, or add an inner `<button>` that receives `onDismiss` and is focusable. Ensure the hint remains non-blocking for piano interaction.
- **Suggested command:** Fix inline

---

#### H2. Touch targets below 44×44px on mobile

- **Location:** Multiple components
  - `components/ui/switch.tsx`: Switch `h-5 w-9` (20×36px)
  - `components/portfolio/moog-playground.tsx`: MoogLEDButton 52×22px (line 79), RockerToggle ~28×36px (line 144), patch dots 16×16px (line 401), ControlKnob 40×40px (line 490)
  - `components/ui/button.tsx`: default `h-9` (36px), `lg` `h-10` (40px)
- **Severity:** High
- **Category:** Responsive / Accessibility
- **Description:** Interactive elements are smaller than the 44×44px minimum recommended for touch (Apple HIG, Material).
- **Impact:** Harder to tap on mobile, risk of mis-taps and user frustration.
- **WCAG/Standard:** WCAG 2.5.5 Target Size (Level AAA, 44×44 CSS pixels)
- **Recommendation:** Use `min-h-[44px] min-w-[44px]` (or equivalent) for primary touch targets. Increase Switch to `h-11` (44px) where appropriate. Wrap small controls (dots, knobs) in larger hit areas with `p-2` or similar.
- **Suggested command:** `/normalize` for component sizing

---

#### H3. Theme toggle redundant labels — possible double announcement

- **Location:** `components/theme-toggle.tsx` lines 45–52: Button has `aria-label={ariaLabel}` and `<span className="sr-only">Toggle theme</span>`
- **Severity:** High
- **Category:** Accessibility
- **Description:** Two accessible names (aria-label and sr-only span) can cause duplicate announcements in some assistive tech.
- **Impact:** Annoying or confusing experience for screen reader users.
- **Recommendation:** Use one label. Keep `aria-label` with the descriptive string; remove the `sr-only` span.
- **Suggested command:** Fix inline

---

#### H4. Piano keys lack accessible names

- **Location:** `components/portfolio/moog-playground.tsx` `PianoKey` (lines 522–548): `motion.button` without `aria-label`
- **Severity:** High
- **Category:** Accessibility
- **Description:** Piano keys are interactive but have no accessible name. Screen readers announce generic "button" for 24 keys.
- **Impact:** Users who rely on assistive tech cannot identify which note each key plays.
- **Recommendation:** Add `aria-label={`Play note ${PIANO_NOTES[idx]}`}` (or equivalent) to each `PianoKey`. Ensure `PIANO_NOTES` is in scope.
- **Suggested command:** Fix inline

---

#### H5. Section labels not associated with content in Playground mode

- **Location:** `components/portfolio/section-label.tsx` — Playground mode returns `<span>` instead of `<h2>`
- **Severity:** High
- **Category:** Accessibility
- **Description:** In Playground mode, section labels are `<span>` with class `moog-category-label`, so heading hierarchy and landmarks are weaker.
- **Impact:** Screen reader users lose structural context when switching modes.
- **Recommendation:** Prefer a heading (`h2`, `h3`) with appropriate class for styling, or ensure `role="heading"` and `aria-level` if using spans. Maintain hierarchy across Simple and Playground.
- **Suggested command:** `/harden`

---

#### H6. Moog ControlKnob missing focus-visible ring

- **Location:** `components/portfolio/moog-playground.tsx` lines 490–504: `ControlKnob` has `tabIndex={0}` and keyboard handlers but no visible focus style
- **Severity:** High
- **Category:** Accessibility
- **Description:** Knob is keyboard-focusable but lacks a clear focus indicator (e.g. `focus-visible:ring-2 focus-visible:ring-[#e8650a]`).
- **Impact:** Keyboard users cannot see which control has focus.
- **Recommendation:** Add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8650a] focus-visible:ring-offset-2` (or equivalent) for consistency with other Moog controls.
- **Suggested command:** Fix inline

---

### Medium-Severity Issues

#### M1. Hard-coded colors in Moog Playground and globals.css

- **Location:** `components/portfolio/moog-playground.tsx` (50+ inline hex/rgba), `app/globals.css` (e.g. `.moog-wood`, `.moog-faceplate`, `.moog-white-key`, `.moog-black-key`)
- **Severity:** Medium
- **Category:** Theming
- **Description:** Moog components use raw hex/rgba instead of design tokens. Light/dark and future theme changes are harder.
- **Impact:** Theming inconsistencies and more maintenance when updating colors.
- **Recommendation:** Introduce CSS variables for Moog palette (e.g. `--moog-amber`, `--moog-wood`, `--moog-faceplate`) and reference them in components and globals.css.
- **Suggested command:** `/normalize` (design tokens)

---

#### M2. Moog screen bank links use hard-coded emerald

- **Location:** `app/globals.css` lines 390–422: `rgb(74 222 128)`, `rgba(74, 222, 128, …)`
- **Severity:** Medium
- **Category:** Theming
- **Description:** VFD-style links use fixed green; not derived from theme tokens.
- **Impact:** Less cohesion if brand or theme colors change.
- **Recommendation:** Use a token such as `--moog-vfd-link` or extend accent tokens for Moog mode.
- **Suggested command:** `/normalize`

---

#### M3. Hero avatar uses empty alt — acceptable but undocumented

- **Location:** `components/portfolio/hero.tsx` lines 22, 64; `components/portfolio/site-header.tsx` line 27; `components/portfolio/footer.tsx` line 14
- **Severity:** Medium
- **Category:** Accessibility
- **Description:** Avatar has `alt=""`; this is correct for decorative images when adjacent text provides the name.
- **Impact:** Fine as-is; risk if structure changes and avatar becomes sole identifier.
- **Recommendation:** Add a brief comment (e.g. `// Decorative — name in adjacent text`) or ensure avatar is consistently paired with visible name/context.
- **Suggested command:** Optional

---

#### M4. Project images with missing `imageAlt` fall back to empty string

- **Location:** `components/portfolio/project-block.tsx` lines 71, 109: `alt={project.imageAlt ?? ""}`
- **Severity:** Medium
- **Category:** Accessibility
- **Description:** When `imageAlt` is missing, images get no text alternative.
- **Impact:** Informative project screenshots may be inaccessible to screen reader users.
- **Recommendation:** Require `imageAlt` in data, or fall back to a generated description (e.g. `project.title` + "screenshot").
- **Suggested command:** `/harden` (data + components)

---

#### M5. ScrollReveal `asListItem` ref type mismatch

- **Location:** `components/scroll-reveal.tsx` line 56: `ref` cast between `HTMLElement` and `HTMLLIElement`
- **Severity:** Medium
- **Category:** Performance / Code quality
- **Description:** Ref typing is loose; runtime behavior is correct but types are inconsistent.
- **Impact:** Potential type errors in strict mode; harder maintenance.
- **Recommendation:** Use a generic or overloaded ref type for `asListItem` to avoid unsafe casts.
- **Suggested command:** Code cleanup

---

#### M6. Accordion keyframes animate height

- **Location:** `tailwind.config.ts` lines 77–92: `accordion-down` / `accordion-up` animate `height`
- **Severity:** Medium
- **Category:** Performance
- **Description:** Height animation can cause layout thrashing.
- **Impact:** Possible jank on low-end devices (Radix Accordion default behavior).
- **Recommendation:** Consider `grid-template-rows: 0fr` → `1fr` pattern for height transitions. Only change if accordion usage is confirmed and performance is an issue.
- **Suggested command:** `/optimize` (if accordion is used)

---

#### M7. Framer Motion `whileTap` animates layout properties

- **Location:** `components/portfolio/moog-playground.tsx` line 789: `whileTap={{ y: 4, borderBottomWidth: "2px", borderBottomColor: "#b0b0b0" }}` for white keys
- **Severity:** Medium
- **Category:** Performance
- **Description:** Animating `y` and `borderBottomWidth` can trigger layout.
- **Impact:** Minor; Framer Motion uses transforms where possible, but `borderBottomWidth` is layout.
- **Recommendation:** Prefer `transform: translateY()` for motion and avoid animating borders; use box-shadow or pseudo-elements for visual depth if needed.
- **Suggested command:** `/optimize`

---

#### M8. Piano keyboard height in vh — may be small on short viewports

- **Location:** `components/portfolio/moog-playground.tsx` line 700: `height: "28vh", minHeight: 160`
- **Severity:** Medium
- **Category:** Responsive
- **Description:** On short screens (e.g. landscape mobile), 28vh can make keys very small.
- **Impact:** Piano may feel cramped; keys harder to tap.
- **Recommendation:** Use `clamp(160px, 28vh, 220px)` or similar to bound height. Test on real devices.
- **Suggested command:** Manual tweak

---

#### M9. About bento carousel uses fixed grid columns

- **Location:** `components/portfolio/about-section.tsx` lines 43–48: `gridTemplateColumns: "repeat(4, 1fr)"` for 4-column bento
- **Severity:** Medium
- **Category:** Responsive
- **Description:** Four columns may be too dense on small screens.
- **Impact:** Tiles can feel cramped on narrow viewports.
- **Recommendation:** Use responsive `grid-template-columns` (e.g. 2 cols on mobile, 4 on larger).
- **Suggested command:** Manual tweak

---

#### M10. No `prefers-reduced-motion` for Moog CRT flicker

- **Location:** `app/globals.css` — `moog-crt-flicker` reduced in media query (lines 320–323), but `crt-flicker` keyframe still defined
- **Severity:** Medium
- **Category:** Accessibility
- **Description:** Reduced-motion handling exists; keyframe remains in stylesheet.
- **Impact:** Acceptable; animation is disabled when needed. No change required.
- **Recommendation:** None; current setup is fine.
- **Suggested command:** N/A

---

#### M11. ViewModeToggle Switch — small touch target

- **Location:** `components/portfolio/view-mode-toggle.tsx` — Switch from `components/ui/switch.tsx` (h-5 w-9)
- **Severity:** Medium
- **Category:** Responsive / Accessibility
- **Description:** Switch is below 44px touch target.
- **Impact:** Harder to toggle on mobile.
- **Recommendation:** Increase Switch size (e.g. `h-11`) or expand the toggle row’s tap area.
- **Suggested command:** `/normalize`

---

#### M12. Tool icons Image uses `alt=""` — OK when link has aria-label

- **Location:** `components/portfolio/tool-icons.tsx` line 23
- **Severity:** Medium
- **Category:** Accessibility
- **Description:** Image has `alt=""`; parent link has `aria-label={tool.name}` when `tool.link` exists.
- **Impact:** Fine when link exists; non-linked tools have no accessible name for the image.
- **Recommendation:** Ensure all tool icons that are interactive have `aria-label`. For non-linked icons, add `aria-label` or `title` on the wrapper.
- **Suggested command:** Review tool data

---

### Low-Severity Issues

#### L1. Button default size h-9 (36px)

- **Location:** `components/ui/button.tsx` line 24
- **Severity:** Low
- **Category:** Responsive
- **Recommendation:** Consider `h-10` or `min-h-[44px]` for primary actions on mobile.
- **Suggested command:** `/normalize`

---

#### L2. Duplicate/redundant ScrollReveal wrapper in ContactSection

- **Location:** `components/portfolio/contact-section.tsx` — `content` variable wraps sections; structure is a bit nested
- **Severity:** Low
- **Category:** Code quality
- **Recommendation:** Optional refactor for clarity.
- **Suggested command:** Optional

---

#### L3. MoogBankSelector buttons lack keyboard activation sound

- **Location:** `components/portfolio/moog-bank-selector.tsx` — `playClickSound()` called on click, but keyboard activation (Enter/Space) may not trigger it
- **Severity:** Low
- **Category:** UX consistency
- **Recommendation:** If other Moog controls play sound on activation, add keyboard handlers that also trigger sound.
- **Suggested command:** Optional

---

#### L4. TestimonialCard Avatar alt empty

- **Location:** `components/portfolio/testimonial-card.tsx` line 33: `AvatarImage src={...} alt=""`
- **Severity:** Low
- **Category:** Accessibility
- **Description:** Name is in heading; avatar is supplemental.
- **Recommendation:** Document that avatar is decorative, or use `alt={testimonial.name}` if avatar is primary identifier.
- **Suggested command:** Optional

---

#### L5. Agentation loaded in development only

- **Location:** `app/layout.tsx` line 62
- **Severity:** Low
- **Category:** Performance
- **Description:** Conditional load is correct.
- **Recommendation:** None.
- **Suggested command:** N/A

---

#### L6. No explicit `color-scheme` for dark mode

- **Location:** `app/globals.css` — `:root` and `.dark` define variables
- **Severity:** Low
- **Category:** Theming
- **Description:** `color-scheme: dark` can improve form controls and scrollbars in dark mode.
- **Recommendation:** Add `color-scheme: dark` to `.dark` if not already inherited from next-themes.
- **Suggested command:** Optional

---

#### L7. Footer year is client-rendered

- **Location:** `components/portfolio/footer.tsx` line 5: `new Date().getFullYear()`
- **Severity:** Low
- **Category:** Performance
- **Description:** Footer is server-rendered; year is deterministic per request.
- **Recommendation:** Acceptable; no change needed.
- **Suggested command:** N/A

---

#### L8. Hero button uses `hover:scale-[1.02]`

- **Location:** `components/portfolio/hero.tsx` line 43
- **Severity:** Low
- **Category:** Performance
- **Description:** Transform scale is performant.
- **Recommendation:** None.
- **Suggested command:** N/A

---

## Patterns & Systemic Issues

1. **Hard-coded colors:** Moog Playground and globals.css use 100+ raw hex/rgba values. Move to CSS variables for consistency and theme support.
2. **Touch targets:** Several controls (Switch, Moog LED buttons, patch dots, knobs) are below 44px. Standardize minimum sizes.
3. **Mobile navigation:** `hidden md:block` removes section nav on mobile. Add a mobile-friendly nav pattern.
4. **Focus indicators:** Most controls have focus styles; ControlKnob is the main exception.
5. **Decorative images:** Avatar and tool icons consistently use `alt=""`; structure is mostly correct but should be documented.

---

## Positive Findings

- **Skip link:** Present and correctly targets `#main`.
- **Focus visibility:** Global `focus-visible` ring on buttons, links, inputs (globals.css lines 81–86).
- **Reduced motion:** `prefers-reduced-motion` respected for scroll-reveal and Moog animations.
- **Scroll reveal:** Uses `transform` and `opacity` only; no layout thrashing.
- **Semantic HTML:** Main content in `<main>`, sections with ids, articles for projects/testimonials.
- **ARIA:** Tablists (Moog patch dots, bank selector) use `role="tablist"`, `role="tab"`, `aria-selected`.
- **External links:** `rel="noopener noreferrer"` and `aria-label` with “opens in new tab” where relevant.
- **Image optimization:** Next.js `Image` with `sizes` and `fill` where appropriate.
- **Typography:** Distinct fonts (Inter Tight, Space Grotesk, Space Mono, VT323).
- **Design tokens:** Core palette in CSS variables; `heroBlue`, `heroPink` for accent.

---

## Recommendations by Priority

### Immediate (this sprint)

1. Add mobile navigation (Sheet or compact nav).
2. Fix KeyboardHint so click-to-dismiss works.
3. Ensure error page is inside `main` and skip link works.
4. Add `aria-label` to PianoKey components.
5. Fix redundant theme toggle labels (remove sr-only span or aria-label).

### Short-term (next sprint)

6. Increase touch targets for Switch, Moog controls, patch dots.
7. Add focus-visible ring to ControlKnob.
8. Use headings (or `role="heading"`) for Playground section labels.
9. Improve project `imageAlt` handling (require or generate fallback).

### Medium-term

10. Extract Moog colors to CSS variables.
11. Add responsive grid for about bento (fewer columns on mobile).
12. Add `aria-label` (or equivalent) for non-linked tool icons.

### Long-term

13. Refine Piano keyboard height for short viewports.
14. Optionally add `color-scheme` for dark theme.
15. Consider grid-based height animation for accordions if used.

---

## Suggested Commands for Fixes

| Issue group | Command | Scope |
|-------------|---------|-------|
| Mobile nav, error page, section labels, ControlKnob focus | `/harden` | A11y + responsive |
| Touch targets, button sizes, Switch | `/normalize` | Component sizing |
| Moog colors, design tokens | `/normalize` | Theming |
| Accordion, motion, layout tweaks | `/optimize` | Performance |
| KeyboardHint, theme toggle, PianoKey labels | Manual fix | Specific components |

---

*Audit complete. Document issues only; no fixes applied. Use commands above to address.*
