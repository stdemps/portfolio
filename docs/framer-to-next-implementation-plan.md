# Implementation Plan: Match Framer Portfolio (stevendempster.framer.website)

This document captures the structure, content, and styling of [Steven Dempster’s Framer portfolio](https://stevendempster.framer.website) and turns it into a concrete plan to update the Next.js build.

---

## 1. Site structure (top to bottom)

| Order | Section | Framer behaviour |
|-------|---------|-------------------|
| 1 | Sticky header | Name + emoji only (no nav links in header) |
| 2 | Hero | Greeting, coloured headline, “Let’s chat →” CTA |
| 3 | Tool icons | Horizontal row of 4–5 app icons in rounded squares |
| 4 | **01 Recent work** | Section label then project blocks |
| 5 | Project: SDDesigns | Two phone mockups on purple/blue gradient; optional “Coming Soon” |
| 6 | Project: Client portal | “Transforming the client experience…”, KPMG, “Coming Soon” pill, browser mockup |
| 7 | Project: AI expense | Gradient bar, title, “AI Expense Categorisation” |
| 8 | **02 Work experience** | “Product Designer, KPMG UK” (and any other roles) |
| 9 | Testimonials | Multiple cards: name, role, quote, 5 stars, avatar |
| 10 | Contact | Form (name, email, message) + “Send” + LinkedIn / Email links |
| 11 | Footer | Name + emoji, “© Steven Dempster 2025” |

---

## 2. Per-section spec

### 2.1 Header

- **Content:** “Steven Dempster” + one emoji (e.g. 👋). No Work / About / Contact in header on Framer.
- **Layout:** Sticky, top-left; minimal.
- **Behaviour:** Optional: keep anchor links for in-page nav on desktop and/or a simple menu on mobile, or remove nav entirely to match Framer 1:1.
- **Tasks:**
  - Change header to name + emoji only (or add a small “Menu” that scrolls to sections).
  - Remove or simplify nav to match Framer.
  - Ensure sticky header and spacing match (padding, font size).

### 2.2 Hero

- **Line 1:** “Hey! 👋 I’m Steven.” (muted colour).
- **Line 2 (headline):** “A **creative thinker** and **product design lead** growing a design team at KPMG UK.”
  - **Colours:** “creative thinker” = blue; “product” and “design lead” = pink/magenta; rest = default (black/dark).
- **CTA:** “Let’s chat →” — outline button (border, no fill), left-aligned.
- **Tasks:**
  - Replace current hero copy with the above.
  - Implement inline colour spans for the headline (blue and pink).
  - Add “Let’s chat” button linking to `#contact` or `mailto:`.
  - Typography: large display headline, mobile-first scale.

### 2.3 Tool icons

- **Content:** 4–5 icons in a row (e.g. Procreate, Framer, Figma, Adobe Ps). Each in a rounded, light-background “card”.
- **Layout:** Horizontal row, centred or left-aligned; wrap on small screens.
- **Tasks:**
  - Add a `tools` or `skills` array in `lib/portfolio-data.ts` (name, icon path or SVG, optional link).
  - New component: `ToolIcons` or `SkillsStrip` — row of icon cards.
  - Style: soft shadow/border, rounded corners, consistent size; responsive (e.g. 2–3 per row on mobile, 4–5 on desktop).

### 2.4 Section labels (01 Recent work, 02 Work experience)

- **Pattern:** “01” in light grey, “Recent work” in bold dark; same for “02 Work experience”.
- **Tasks:**
  - Introduce a reusable “SectionLabel” (e.g. `number` + `title`).
  - Use for “01 Recent work” and “02 Work experience”.
  - Optional: use same pattern for “03 Testimonials” if we add that label on Framer.

### 2.5 Projects (work)

- **Project 1 – SDDesigns**
  - Visual: two phone mockups side-by-side on a purple/blue gradient background.
  - Optional “Coming Soon” badge.
  - Tasks: Add project with `image` or mockup component; support gradient background and optional badge.
- **Project 2 – Client portal**
  - Title: “Transforming the client experience by creating a single access point for all their interactions”.
  - Subtitle: “KPMG Digital Delivery Platform (Client Portal)”.
  - “Coming Soon” purple pill; browser/window mockup.
  - Tasks: Add to `projects` in data; optional “Coming Soon” flag; optional browser frame around image.
- **Project 3 – AI expense**
  - Decorative: horizontal gradient bar (purple → blue).
  - Title: “How we increased productivity using AI to categorise corporate expense data”.
  - Subtitle: “AI Expense Categorisation”.
  - Tasks: Add project; optional “gradient bar” variant above title; support subtitle.

**Data model (extend `lib/portfolio-data.ts`):**

- Add optional: `subtitle`, `comingSoon`, `gradientBar`, `mockupType: 'phones' | 'browser' | 'image'`, `backgroundGradient`.

### 2.6 Work experience block

- **Content:** “02 Work experience” then e.g. “Product Designer, KPMG UK” (and any other roles).
- **Style:** Role text can be subtle (lighter) so section feels minimal.
- **Tasks:**
  - Add `workExperience` array in data (title, employer, optional period/url).
  - New component: “Work experience” section that renders list or single line.
  - Use SectionLabel “02 Work experience”.

### 2.7 Testimonials

- **Content:** Multiple cards. Each: name, role (e.g. “Partner Tax Tech & Innovation”), quote (one or more paragraphs), 5 stars, optional circular avatar.
  - Examples from review: Oli Dockray, Jamie Richards, Siva Kumar Pandurao (and possibly others).
- **Layout:** Vertical stack of cards; optional grid on large screens.
- **Style:** White/light card, rounded corners, subtle shadow; avatar right-aligned or above text on small screens.
- **Tasks:**
  - Add `testimonials` array (name, role, quote, avatar url, optional link).
  - New component: `TestimonialCard` (name, role, quote, stars, avatar).
  - Section wrapper with optional “03 Testimonials” label if desired.
  - Ensure contrast for quote text (avoid very light grey on white).

### 2.8 Contact

- **Form:** Name, Email (placeholder e.g. jane@example.com), “Your message” textarea, primary “Send” button (blue).
- **Backend:** Use **Formspree** for form submission (no custom server/API required; configurable via `NEXT_PUBLIC_FORMSPREE_FORM_ID`).
- **Links:** “LinkedIn” and “Email” below or beside form (text links).
- **Tasks:**
  - Contact form submits to Formspree (POST to `https://formspree.io/f/{formId}`); show success/error in place.
  - Inputs: light grey background, rounded, labels above; blue “Send” button.
  - Add LinkedIn and Email links from `site` in data.
  - Accessibility: labels, error states, success message.

### 2.9 Footer

- **Content:** “Steven Dempster 👋” (or same as header); “© Steven Dempster 2025”; no “Made in Framer” (use “Built with Next.js” or omit).
- **Tasks:**
  - Footer component: name + emoji, copyright with current year, optional small “Built with Next.js” link.
  - Match spacing and typography to Framer.

### 2.10 Site analytics

- **Provider:** **Fathom Analytics** (privacy-focused, no cookie banner required in many jurisdictions).
- **Tasks:**
  - Add Fathom script to the site (e.g. in root layout or a dedicated analytics component).
  - Use `NEXT_PUBLIC_FATHOM_SITE_ID` (and optional `NEXT_PUBLIC_FATHOM_SCRIPT_URL`) so the script loads only when configured; no script when ID is missing (e.g. local dev).

---

## 3. Global styling alignment

- **Typography:** Sans-serif; match relative sizes (hero headline largest, section titles, body, labels). Keep or adjust Syne + DM Sans to match Framer’s look.
- **Colours:**
  - Headline accents: blue (`creative thinker`), pink/magenta (`product`, `design lead`). Define in CSS variables.
  - Buttons: “Let’s chat” = outline; “Send” = solid blue.
  - Backgrounds: white/light grey; cards and form inputs slightly off-white where Framer uses them.
- **Spacing:** Match vertical rhythm (hero, sections, cards) and horizontal padding to Framer at key breakpoints.
- **Components:** Rounded corners on cards, buttons, inputs; subtle shadows where Framer uses them.

---

## 4. Integrations

- **Contact form:** Formspree. Set `NEXT_PUBLIC_FORMSPREE_FORM_ID` in `.env.local` (get the ID from [Formspree](https://formspree.io)). If unset, the Send button is disabled and submissions are no-ops.
- **Analytics:** Fathom. Set `NEXT_PUBLIC_FATHOM_SITE_ID` in `.env.local` (from your [Fathom](https://usefathom.com) dashboard). If unset, no analytics script is loaded.

---

## 5. Data and content (lib/portfolio-data.ts)

- **site:** name, tagline (for meta), hero greeting, headline (and which phrases are blue/pink), email, linkedIn, resumeUrl (optional).
- **tools:** list of { name, icon, link? } for the icon row.
- **projects:** extend with subtitle, comingSoon, gradientBar, mockupType, backgroundGradient, and any image paths.
- **workExperience:** list of { title, employer, period?, url? }.
- **testimonials:** list of { name, role, quote, avatar?, link? }.

---

## 6. Implementation order (recommended)

1. **Content and data**  
   Update `lib/portfolio-data.ts` with real copy, projects, work experience, testimonials, and tools. Add any new fields needed for the Framer behaviour.

2. **Header and hero**  
   Simplify header to name + emoji; rebuild hero with coloured headline and “Let’s chat →” CTA.

3. **Tool icons**  
   Add data and `ToolIcons` (or `SkillsStrip`) component; place below hero.

4. **Section labels and work section**  
   Add SectionLabel; refactor work section to use “01 Recent work” and support new project variants (gradient bg, “Coming Soon”, browser/phone mockups, gradient bar).

5. **Work experience**  
   Add “02 Work experience” block and component.

6. **Testimonials**  
   Add testimonials data and `TestimonialCard` + section.

7. **Contact form and footer**  
   Replace contact with form (name, email, message, Send); wire form to **Formspree** via `NEXT_PUBLIC_FORMSPREE_FORM_ID`; add LinkedIn/Email links; align footer with Framer (name, © year).

8. **Site analytics**  
   Add **Fathom Analytics** via `NEXT_PUBLIC_FATHOM_SITE_ID`; load script in layout only when ID is set.

9. **Polish**  
   Colours (blue/pink), spacing, shadows, and responsive behaviour; remove or replace “Made in Framer” with “Built with Next.js” or omit.

---

## 7. Out of scope / optional

- “Made in Framer” badge: omit or replace.
- Exact Framer emoji rotation (e.g. random per load): optional; can fix to 👋.
- Form backend: **Formspree** (see §2.8 and §5 step 7).
- Project detail pages: Framer may use anchors or single-page only; keep single-page unless you add routes later.

---

## 8. Acceptance criteria

- [ ] Header shows “Steven Dempster” + emoji only (or minimal nav).
- [ ] Hero shows “Hey! 👋 I’m Steven.” and the coloured headline with blue/pink phrases and “Let’s chat →”.
- [ ] Tool icons row appears below hero with 4–5 icons in rounded cards.
- [ ] “01 Recent work” and “02 Work experience” use the number + title pattern.
- [ ] All three projects (SDDesigns, Client portal, AI expense) present with correct titles, optional “Coming Soon”, and mockups/gradient where specified.
- [ ] Work experience lists “Product Designer, KPMG UK” (and any other roles).
- [ ] Testimonials section shows multiple cards with name, role, quote, stars, avatar.
- [ ] Contact has form (name, email, message, Send) submitting via **Formspree** and LinkedIn + Email links.
- [ ] Footer shows name and “© Steven Dempster 2025”.
- [ ] **Fathom Analytics** loads when `NEXT_PUBLIC_FATHOM_SITE_ID` is set; no script when unset.
- [ ] Layout is mobile-first and matches Framer at 375px, 768px, 1024px within reason.
- [ ] No “Made in Framer”; optional “Built with Next.js” in footer.

Once this plan is agreed, implementation can proceed section by section in the repo.
