# Portfolio Quality Audit Report

**Date:** 2025-02-09  
**Scope:** Single-page portfolio (Hero, Tools, Exploring, Work, Experience, Testimonials, Contact, Footer)  
**Reference:** frontend-design skill (anti-patterns), WCAG 2.1 AA, project UI/coding rules

---

## Anti-Patterns Verdict

**Verdict: At risk.** The site avoids the worst AI slop (no gradient text, no hero metrics, no pure black/white, no cyan-on-dark) but still hits several DON'Ts from the frontend-design skill:

| Tell | Location | Skill DON'T |
|------|----------|-------------|
| **Inter_Tight** as display font | `app/layout.tsx` | "Use overused fonts—Inter, Roboto, Arial, Open Sans" |
| **Glassmorphism** | `site-header.tsx`: `backdrop-blur`, `bg-background/95` | "Use glassmorphism everywhere—blur effects, glass cards" |
| **Purple/blue gradient** | `project-block.tsx`: `from-violet-50/60 via-muted/50 to-blue-50/60` (and dark variants) | "Use the AI color palette: … purple-to-blue gradients" |
| **Uniform section spacing** | All sections: `py-12 md:py-16 lg:py-20`, `px-4 md:px-6 lg:px-8` | "Use the same spacing everywhere—without rhythm, layouts feel monotonous" |
| **Card-heavy layout** | Project cards, testimonial cards, Exploring template links as card-style blocks | "Wrap everything in cards"; "identical card grids" (testimonials) |

**What’s in good shape:** No gradient text, no hero-metric layout, no pure #000/#fff (tinted neutrals in CSS vars), no bounce/elastic easing (ticker uses linear), primary CTA is clear (hero button). Motion uses `transform` only (ticker).

---

## Executive Summary

- **Total issues:** 15 (2 Critical, 3 High, 6 Medium, 4 Low)
- **Most critical:** (1) Theme toggle touch target &lt; 44px; (2) External links missing “opens in new tab” for screen readers; (3) Hard-coded colors (browser dots, stars) bypass design tokens and can hurt dark mode/contrast.
- **Overall:** Strong base (semantic HTML, skip link, focus rings, form a11y, Next/Image). Main gaps: typography/font choice, a few a11y refinements, theming consistency, and reducing anti-patterns (glass, purple/blue, spacing rhythm).
- **Recommended next steps:** Fix Critical/High a11y and theming, then apply `/normalize` for tokens and `/polish` for spacing/typography.

---

## Detailed Findings by Severity

### Critical Issues

#### C1. Theme toggle touch target below 44px (WCAG 2.5.5)

- **Location:** `components/theme-toggle.tsx` (Button with `size="icon"`). `components/ui/button.tsx`: icon size is `h-9 w-9` (36px).
- **Severity:** Critical  
- **Category:** Accessibility (Responsive / Touch)  
- **Description:** Icon-only theme toggle is 36×36px. WCAG 2.5.5 (Target Size) recommends at least 44×44px for pointer inputs.
- **Impact:** Mobile and touch users may mis-tap or find the control hard to activate.
- **WCAG:** 2.5.5 Target Size (Level AAA); project rules require “Minimum 44x44px … for interactive elements.”
- **Recommendation:** Override size for this button so the hit area is at least 44×44px (e.g. `className="h-11 w-11"` or use a larger icon size variant) while keeping the icon visually unchanged.
- **Suggested command:** `/normalize` or manual fix for touch targets.

#### C2. External links not announcing “opens in new tab”

- **Location:** `components/portfolio/footer.tsx` (Built with Next.js); `components/portfolio/contact-section.tsx` (LinkedIn). Both use `target="_blank"` but only the Exploring section links expose “opens in new tab” in `aria-label`.
- **Severity:** Critical  
- **Category:** Accessibility  
- **Description:** Links that open in a new window/tab should be announced to screen reader users so they’re not surprised by a new tab.
- **Impact:** Screen reader users may not know the link opens in a new tab; some users prefer to know before activating.
- **WCAG:** 3.2.5 Change on Request (best practice to announce); G201.
- **Recommendation:** Add `aria-label` (or visually hidden text) that includes “(opens in new tab)” for Footer and Contact external links, or use a consistent pattern (e.g. `rel="noopener noreferrer"` plus `aria-label="… (opens in new tab)"`).
- **Suggested command:** `/normalize` or `/harden` for link a11y.

---

### High-Severity Issues

#### H1. Hard-coded colors for browser chrome and stars (not design tokens)

- **Location:** `components/portfolio/project-block.tsx` lines 57–59, 81–83: `bg-red-400`, `bg-amber-400`, `bg-green-400`. `components/portfolio/testimonial-card.tsx` line 48: `fill-amber-400 text-amber-400`.
- **Severity:** High  
- **Category:** Theming  
- **Description:** Decorative browser dots and star rating use raw Tailwind palette colors instead of CSS variables or semantic tokens.
- **Impact:** In dark mode or custom themes these won’t adapt; contrast and brand consistency are harder to control. Skill: “Use modern CSS color functions” and “tint your neutrals toward your brand hue.”
- **Recommendation:** Replace with semantic tokens (e.g. `destructive` for red, or new tokens like `chrome-red`, `chrome-amber`, `chrome-green`) or use `hsl(var(--…))` so dark mode and future themes stay consistent. Star color could use existing `--star-yellow` if defined in globals, or a token.
- **Suggested command:** `/normalize` to align with design tokens.

#### H2. Glassmorphism in header (decorative blur)

- **Location:** `components/portfolio/site-header.tsx`: `backdrop-blur`, `supports-[backdrop-filter]:bg-background/80`, `bg-background/95`.
- **Severity:** High  
- **Category:** Anti-pattern (Visual Details)  
- **Description:** Sticky header uses backdrop blur and semi-opaque background without a clear functional need (e.g. legibility over a busy background).
- **Impact:** Skill explicitly says “DON'T: Use glassmorphism everywhere—blur effects, glass cards, glow borders used decoratively rather than purposefully.” Reads as default “AI” styling.
- **Recommendation:** Prefer a solid header (`bg-background` with optional `border-b`) unless the design intentionally needs content to show through. If keeping blur, document the purpose (e.g. “content scrolls under hero image”).
- **Suggested command:** `/simplify` or `/quieter` on header.

#### H3. Testimonials grid uses equal row heights (`auto-rows-fr`)

- **Location:** `components/portfolio/testimonials-section.tsx` line 15: `lg:auto-rows-fr`.
- **Severity:** High  
- **Category:** Responsive / Layout  
- **Description:** Same pattern that was removed from Work section: all rows get equal height, so shorter testimonial cards are stretched to match the tallest.
- **Impact:** Empty vertical space in shorter cards; same “stretched cards” issue that was fixed for Recent work.
- **Recommendation:** Use `lg:auto-rows-auto` (or omit so rows size to content) so card height follows content; keep `h-full` on cards so multi-column rows still align.
- **Suggested command:** Manual fix (same approach as work section).

---

### Medium-Severity Issues

#### M1. Overused font (Inter family)

- **Location:** `app/layout.tsx`: `Inter_Tight` as `--font-display`.
- **Severity:** Medium  
- **Category:** Anti-pattern (Typography)  
- **Description:** Skill: “DON'T: Use overused fonts—Inter, Roboto, Arial, Open Sans.” Inter_Tight is in the Inter family and reads as generic.
- **Impact:** Typography is a strong “AI slop” signal; limits distinctiveness.
- **Recommendation:** Swap to a more distinctive display font (and optionally body); keep Space Grotesk only if it’s an intentional brand choice.
- **Suggested command:** `/polish` (typography pass) or design decision.

#### M2. Purple-to-blue gradient in project card backgrounds

- **Location:** `components/portfolio/project-block.tsx` line 25: `from-violet-50/60 … to-blue-50/60` and dark variants.
- **Severity:** Medium  
- **Category:** Anti-pattern (Color)  
- **Description:** Skill: “DON'T: Use the AI color palette: … purple-to-blue gradients.” Already toned down but direction is still violet→blue.
- **Impact:** Palette reads as default AI; doesn’t align with hero blue/pink brand.
- **Recommendation:** Drive from hero palette (e.g. blue/pink tint) or remove gradient and use solid muted/background; avoid violet–blue as primary accent.
- **Suggested command:** `/quieter` or color-alignment pass.

#### M3. Uniform section spacing (no rhythm)

- **Location:** All sections: same `py-12 md:py-16 lg:py-20` and container `px-4 md:px-6 lg:px-8`.
- **Severity:** Medium  
- **Category:** Anti-pattern (Layout & Space)  
- **Description:** Skill: “DON'T: Use the same spacing everywhere—without rhythm, layouts feel monotonous.”
- **Impact:** Page feels like one repeated block; no emphasis or breathing room between sections.
- **Recommendation:** Vary vertical padding (e.g. larger for hero/work, tighter for testimonials/contact) or use fluid spacing (e.g. clamp) to create rhythm.
- **Suggested command:** `/polish` with focus on spacing rhythm.

#### M4. Tool icon image uses empty `alt` when external/path

- **Location:** `components/portfolio/tool-icons.tsx` line 23: `alt=""` for Image when icon is URL or path.
- **Severity:** Medium  
- **Category:** Accessibility  
- **Description:** Decorative image with empty alt is correct when the parent `<a>` has `aria-label={tool.name}`. If the link ever didn’t have that label, the image would convey nothing.
- **Impact:** Currently OK because link has aria-label; fragile if structure changes.
- **Recommendation:** Keep `alt=""` and ensure every tool link has `aria-label`. Consider a comment that the image is decorative and the link label provides the name.
- **Suggested command:** Optional; low risk as-is.

#### M5. Work experience entries are not semantic headings

- **Location:** `components/portfolio/work-experience-section.tsx`: job title + employer rendered as `<p className="font-display … font-semibold">` instead of a heading.
- **Severity:** Medium  
- **Category:** Accessibility (Semantic HTML)  
- **Description:** Each role is a distinct “topic” but not marked as a heading; outline/headings users don’t get a clear structure.
- **Impact:** Headings hierarchy is h1 → h2 (section titles) only; experience items are not navigable as subheadings.
- **Recommendation:** Use `<h3>` (or appropriate level) for “Title, Employer” so the section has a clear outline (e.g. h2 “Work experience” → h3 per role).
- **Suggested command:** `/normalize` for semantics.

#### M6. Error page has no landmark or skip option

- **Location:** `app/error.tsx`: single `div` with no `<main>` or `role="main"`, and no skip link (layout skip link goes to `#main` which may not exist on error route).
- **Severity:** Medium  
- **Category:** Accessibility  
- **Description:** When the error boundary renders, the page may not have `main` or a way to skip to content; layout’s skip link targets `#main`.
- **Impact:** Screen reader and keyboard users may not land on the error content in a predictable way; depends on whether error view is inside root layout’s main.
- **Recommendation:** Ensure error content is inside a landmark (e.g. `<main id="main">` in layout so error is within it, or add `role="main"` and `id="main"` on the error wrapper). Verify skip link behavior when error is shown.
- **Suggested command:** `/harden` for error state.

---

### Low-Severity Issues

#### L1. Footer “Built with Next.js” has no visible focus ring on some browsers

- **Location:** `components/portfolio/footer.tsx`: link uses underline classes but no explicit `focus-visible:ring-*`. Global `a:focus-visible` in `globals.css` should apply.
- **Severity:** Low  
- **Category:** Accessibility  
- **Description:** If global focus style is ever overridden or not loaded, footer link could have no visible focus. Currently covered by base styles.
- **Impact:** Low; only if theming or scoped styles remove global focus.
- **Recommendation:** Rely on global focus is acceptable; optionally add explicit `focus-visible:ring-2 …` on footer links for consistency.
- **Suggested command:** Optional.

#### L2. Ticker animation has no reduced-motion alternative content

- **Location:** `components/portfolio/tool-icons.tsx`: `motion-reduce:animate-none` stops animation but leaves a long horizontal strip; no `prefers-reduced-motion` content variant.
- **Severity:** Low  
- **Category:** Accessibility (Motion)  
- **Description:** With `prefers-reduced-motion: reduce`, animation is disabled but the duplicated list is still present; users might scroll horizontally or see a clipped strip.
- **Impact:** Some users may see an odd static strip; not a critical failure.
- **Recommendation:** Consider showing a single row of tools (no duplicate) when `motion-reduce:animate-none` is active, or ensure overflow is hidden and the static view is still usable.
- **Suggested command:** Optional; `/adapt` if addressing.

#### L3. Contact form submit button when form is disabled (no Formspree)

- **Location:** `components/portfolio/contact-section.tsx`: when `!formId`, button is disabled and message says “use the Email link below.” No `aria-disabled` or explanation on the button itself.
- **Severity:** Low  
- **Category:** Accessibility  
- **Description:** Button is `disabled={status === "sending" || !formId}`. Screen readers will announce disabled; the status message explains the workaround. Could add `aria-describedby` to point to the message.
- **Impact:** Minor; current copy and disabled state are already clear.
- **Recommendation:** Optionally associate the “Form not configured” message with the submit button via `aria-describedby` so assistive tech can discover the reason.
- **Suggested command:** Optional.

#### L4. Duplicate/redundant theme button label

- **Location:** `components/theme-toggle.tsx`: Button has both `aria-label={`Toggle theme. Active: ${resolvedLabel}...`}` and `<span className="sr-only">Toggle theme</span>`.
- **Severity:** Low  
- **Category:** Accessibility  
- **Description:** Two labels (aria-label and sr-only span) may both be announced; aria-label usually wins but redundancy can cause double announcement in some AT.
- **Impact:** Possible duplicate “Toggle theme” in screen readers.
- **Recommendation:** Use one label. Prefer `aria-label` with the descriptive string and remove the sr-only span, or keep sr-only and remove aria-label if the descriptive text is not needed.
- **Suggested command:** Optional; `/normalize` for a11y.

---

## Patterns & Systemic Issues

1. **Section spacing is identical** — Every section uses the same vertical and horizontal padding scale. No rhythm or emphasis. Address with a spacing scale (e.g. hero/work larger, contact/footer tighter) or fluid values.
2. **Hard-coded palette in two components** — `project-block` (browser dots) and `testimonial-card` (stars) use raw Tailwind colors instead of design tokens. Establishes a pattern of bypassing the theme; fix these and add tokens for any future decorative colors.
3. **Focus and links are generally good** — Global `focus-visible` ring on buttons/links/inputs, skip link, and most external links have `rel="noopener noreferrer"`. Gaps: external link announcement (Critical C2) and theme toggle size (Critical C1).

---

## Positive Findings

- **Semantic structure:** Single h1 (Hero), section headings as h2 (SectionLabel or section titles), testimonial names as h3. Landmarks: header, main, footer, sections with ids for in-page links.
- **Skip link and focus:** Skip to main content is present and visible on focus; `globals.css` applies consistent `focus-visible` ring to buttons, links, and form controls.
- **Form accessibility:** Contact form has associated labels (`htmlFor`/id), `required` and `aria-required`, error/success with `role="alert"`/`role="status"` and `aria-live="polite"`, and disabled state during submit.
- **Images:** Next/Image used for project images with `fill` and `sizes`; `imageAlt` from data. Tool icons use `alt=""` where the link provides the name.
- **Motion:** Ticker uses `transform` only (no layout thrushing); `motion-reduce:animate-none` respects reduced motion. No bounce/elastic easing.
- **No pure black/white:** CSS variables use tinted neutrals (e.g. 98% background, 2.7% foreground); dark mode variables are defined.
- **Work section row height:** Uses `lg:auto-rows-auto` so cards don’t stretch; project cards have consistent height within the row.

---

## Recommendations by Priority

1. **Immediate:** Fix C1 (theme toggle 44px), C2 (external link “opens in new tab” announcement). Both are quick and close WCAG/project-rule gaps.
2. **Short-term:** H1 (design tokens for browser dots and stars), H2 (remove or justify header glassmorphism), H3 (testimonials `auto-rows-auto`). Improves theming and layout consistency.
3. **Medium-term:** M1 (font choice), M2 (project gradient palette), M3 (section spacing rhythm), M5 (work experience headings). Improves distinctiveness and semantics.
4. **Long-term:** M4, M6, L1–L4 as time allows; consider container queries and more fluid typography/spacing.

---

## Suggested Commands for Fixes

| Command | Use for |
|--------|---------|
| **/normalize** | Touch target (theme toggle), external link labels, semantic headings (work experience), design tokens (browser dots, stars), theme toggle duplicate label. |
| **/simplify** or **/quieter** | Header glassmorphism (H2). |
| **/polish** | Typography (font swap), section spacing rhythm, overall refinement. |
| **/quieter** | Purple/blue gradient in project cards (M2). |
| **/harden** | Error page landmark/skip (M6), link a11y (C2). |
| **Manual** | Testimonials `lg:auto-rows-fr` → `lg:auto-rows-auto` (H3). |

---

*End of audit. No fixes were applied; address via the commands and recommendations above.*
