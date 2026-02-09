# Portfolio improvements — multi-agent collab review

**Question:** What improvements could be made to this portfolio site (Next.js, Framer-inspired, product designer portfolio)?

Review uses the same lenses as [.claude/skills/collab.js](.claude/skills/collab.js): Engineer, Designer, PM, then synthesis.

---

## Engineer perspective

**Lens:** Technical feasibility, performance, robustness, maintainability, accessibility (technical side).

### What’s working

- Clear separation: `lib/portfolio-data.ts` for content, components for UI.
- Next.js App Router, server components by default, client only where needed (contact form, theme).
- Formspree and Fathom are optional via env; no script when IDs unset.
- Responsive layout and semantic HTML (sections, headings, landmarks).

### Improvements

1. **Contact form without Formspree**  
   When `NEXT_PUBLIC_FORMSPREE_FORM_ID` is unset, the button is disabled and error state is generic. Consider a clear message: “Contact form not configured” or fallback to `mailto:` so the CTA still works (e.g. “Email me” link).

2. **Images and Next/Image**  
   Project images use `alt=""` (decorative). Any project image that conveys info (e.g. client portal screenshot) should have a short `alt` from data (e.g. `project.imageAlt`). Also: client portal project references `/projects/client-portal-mockup.jpg` which may not exist — document required assets or handle 404 (placeholder/optional image).

3. **Performance**  
   Single page, minimal JS. Optional: add `priority` to hero or above-the-fold content if you introduce a hero image later. Tool icons currently use letter fallbacks; real SVGs in `public/icons/` would be small and cacheable.

4. **Error boundary**  
   No React error boundary. One option: a small `error.tsx` in `app/` so a component error shows a friendly message instead of a blank or dev error screen.

5. **Metadata and SEO**  
   `layout.tsx` has a generic title/description. Pull `site.name` and `site.tagline` (or a dedicated `site.metaDescription`) from `portfolio-data.ts` and use in `metadata` for better SEO and sharing.

6. **Type safety**  
   `portfolio-data.ts` is well-typed. Consider exporting a single `PortfolioData` type (or a Zod schema) if you later validate or load content from CMS/API.

---

## Designer perspective

**Lens:** User flows, visual hierarchy, accessibility (UX/a11y), consistency, responsiveness.

### What’s working

- Mobile-first spacing and typography scale.
- Hero headline colour (blue/pink) and “Let’s chat” CTA are clear.
- Section labels (01, 02, 03) create clear structure.
- Testimonial cards and project blocks have clear hierarchy.

### Improvements

1. **Focus and keyboard**  
   “Let’s chat” and section IDs support in-page navigation. Ensure all interactive elements (buttons, form fields, links) have visible focus (e.g. `focus-visible:ring-2`). Quick pass: tab through the whole page and confirm focus is obvious.

2. **Contact form UX**  
   When Formspree isn’t configured, the Send button is disabled with no explanation. Add a short line under the form: “Form not configured; use the Email link below” so users aren’t confused. On success, consider a clearer state (e.g. “Message sent” + checkmark) and optionally announce to screen readers (`aria-live`).

3. **Project phone mockups**  
   SDDesigns block uses two placeholder phone frames (grey inner area). As soon as you have real screens, add them (e.g. as images or embedded UI) so “Recent work” feels substantive. Same for browser mockup if the asset is missing — keep the frame but make the placeholder state obvious (“Screenshot coming soon” or similar).

4. **Testimonial contrast**  
   Quote text uses `text-foreground`; cards use `bg-card`. Ensure in both themes contrast meets WCAG AA (4.5:1 for body text). If you add more muted quote styling later, re-check.

5. **Skip link**  
   For keyboard and screen-reader users, add a “Skip to main content” link at the top (visible on focus) that targets `#work` or `main` so they can bypass the header/hero when revisiting.

6. **Heading hierarchy**  
   You have one `<h1>` (hero). Check that sections use a consistent pattern (e.g. section titles as `<h2>`, project titles as `<h3>`) so assistive tech and SEO get a clear outline.

---

## PM perspective

**Lens:** Goals, audience, success metrics, prioritization, scope.

### What’s working

- Single-page flow matches a portfolio “tell my story + show work + contact.”
- Clear narrative: who you are → tools → work → experience → proof (testimonials) → contact.
- Low scope: no auth, no CMS, Formspree/Fathom handle form and analytics.

### Improvements

1. **Define success**  
   Decide what “working” means: e.g. “Recruiters and hiring managers can see my work and contact me; I get X submissions per month.” That drives what to improve first (e.g. SEO, contact form clarity, or project depth).

2. **Prioritize improvements by impact**  
   - **High:** Real project visuals (phone/browser screens), Formspree configured and tested, SEO (title/description from data). These directly support “show work” and “contact me.”
   - **Medium:** Skip link, focus styles, contact form messaging when Formspree is unset. These improve access and clarity with limited effort.
   - **Lower (for later):** Error boundary, richer metadata, optional CMS. Ship when you have a concrete need.

3. **Avoid scope creep**  
   Resist adding blogs, filters, or project detail pages until the single page is strong and you have a clear reason (e.g. “I need long case studies”). One page is enough for a “fair start” baseline.

4. **Validate with real users**  
   Once the baseline is solid, ask 2–3 people (e.g. a recruiter, a peer designer) to find your contact and a specific project. Use their confusion to prioritise copy and layout tweaks.

5. **Content over chrome**  
   The biggest lever is content: replace placeholders with real project titles, subtitles, and (where possible) images. Then refine layout and micro-interactions.

---

## Synthesis

### Areas of agreement

- **Content and assets:** All three perspectives say: real project visuals and clear, real copy matter most.
- **Contact:** Form should work (Formspree configured) or fail clearly (message + fallback to email).
- **Accessibility and clarity:** Focus styles, skip link, and form feedback improve usability and inclusivity with small effort.
- **Scope:** Keep the single page; avoid extra features until the core is solid.

### Tensions / trade-offs

- **Engineer** might add an error boundary and more defensive handling; **PM** would ship without them until something breaks. **Trade-off:** Add a minimal `error.tsx`; skip heavier error handling for now.
- **Designer** wants perfect contrast and a11y; **PM** wants to ship and learn. **Trade-off:** Do one pass (focus, skip link, form message); schedule a full a11y audit when you’re ready to push the portfolio harder.

### Recommended order of work

1. **Quick wins (do first)**  
   - SEO: Use `site.name` and tagline (or meta description) in `layout.tsx` metadata.  
   - Contact: When Formspree ID is missing, show “Form not configured — use Email below” and keep Email link prominent.  
   - Focus: Ensure buttons and inputs have visible focus (e.g. `focus-visible:ring-2`).  
   - Add a skip link (“Skip to main content”) at the top, visible on focus.

2. **Content and assets**  
   - Add or document project images (SDDesigns screens, client portal screenshot, or placeholders with “Coming soon”).  
   - Ensure `portfolio-data.ts` has final copy and correct links (LinkedIn, email).

3. **Next layer**  
   - Optional `app/error.tsx` for graceful error state.  
   - Optional `imageAlt` (or similar) for project images and use in `ProjectBlock`.  
   - One full keyboard + screen-reader pass and fix any issues.

4. **Later**  
   - Deeper a11y audit (e.g. axe), analytics review (Fathom), and any A/B tests (e.g. CTA copy) once you have traffic and goals defined.

### Follow-up / validation

- After changes: run `npm run build` and click through the main path (hero → work → contact).  
- Manually test: submit the contact form (with Formspree configured) and confirm delivery.  
- Optional: share the URL with one recruiter or designer and ask: “Can you find how to contact me and one project?” and note where they hesitate.

---

*Generated from a collab-style review (Engineer, Designer, PM personas + synthesis). Use this as a living checklist; re-run the collab skill with a new question when the site or goals change.*
