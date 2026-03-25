# Product Marketing Context

*Last updated: 2026-03-25*

> **Scope:** This document describes the *marketable professional offering* behind [stevendempster.framer.website](https://stevendempster.framer.website) and its Next.js rebuild — Steven Dempster as a product design lead — plus the portfolio site’s role as the primary discovery and conversion surface.

## Product Overview

**One-liner:** Product design lead building and scaling a design practice at KPMG UK — shipping real products with AI-assisted development.

**What it does:** Presents Steven’s work history, selected projects (corporate and personal prototypes), tools, testimonials, and a path to contact — aimed at recruiters and peers evaluating fit for senior IC or leadership design roles.

**Product category:** Personal portfolio / professional brand site (career marketing).

**Product type:** Static marketing site with light interactivity (Next.js); contact via Formspree; optional AI chat when configured.

**Business model:** N/A (personal brand). No pricing; “conversion” is inbound conversation (email, LinkedIn).

## Target Audience

**Target companies:** Mid-to-large organisations with product and engineering teams — especially professional services, fintech-adjacent, or complex B2B/B2E domains where design systems and stakeholder alignment matter.

**Decision-makers:** Hiring managers and recruiters for product design roles; design directors evaluating senior/lead candidates; occasionally engineering leaders assessing design–dev collaboration.

**Primary use case:** Quickly answer “Who is Steven, what has he shipped, how does he work with eng and AI, and can I trust the craft?”

**Jobs to be done:**

- Screen a senior/lead product designer with evidence of practice leadership, not only screens.
- See proof of modern tooling (Figma, design systems) and velocity (AI-assisted development, prototypes).
- Decide whether to book a conversation or request private portfolio access for NDA work.

**Use cases:**

- Recruiter skimming before a phone screen.
- Hiring manager comparing finalists on systems thinking and delivery.
- Peer designer reviewing side projects and open-source/template work.

## Personas

| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Recruiter / HM | Clear title trajectory, impact metrics, culture fit signals | Too many similar portfolios; hard to verify depth | Concrete role arc (KPMG), named outcomes (e.g. design system, launch speed), testimonials |
| Peer / collaborator | Craft, process, how prototypes are built | Wants specificity, not buzzwords | Honest split of public vs NDA work; side projects with live links; tools and repos |
| Engineering partner | Handoff quality, pragmatism, AI-era workflow | Designers who don’t speak delivery | Copy emphasises embedding design in engineering workflows and AI-assisted development |

## Problems & Pain Points

**Core problem:** Stakeholders need to assess a senior designer’s ability to lead practice, align complex stakeholders, and ship — from a short site visit.

**Why alternatives fall short:**

- Resume-only or LinkedIn-only: no visual or narrative proof.
- Generic portfolios: pretty mocks without business or delivery context.
- Fully public case studies: often impossible under client NDA.

**What it costs them:** Wasted interviews, mis-hires, or passing on a strong candidate who didn’t surface evidence quickly enough.

**Emotional tension:** Fear of another “pixel pusher”; doubt that corporate work can be as rigorous as startup portfolios.

## Competitive Landscape

**Direct:** Other senior product designers’ personal sites — vary widely in depth; many lack leadership narrative or metrics.

**Secondary:** LinkedIn profiles, PDF portfolios, Framer/Webflow template sites — faster to ship but often interchangeable visually.

**Indirect:** Agency case study pages — polished but not comparable to in-house lead experience.

**How each falls short for customers (of the portfolio):** They rarely combine practice leadership at scale, explicit AI-assisted delivery story, and a clear contact path with third-party proof (testimonials).

## Differentiation

**Key differentiators:**

- Product Design Lead at KPMG UK — scaling a practice inside a large, regulated context.
- Quantified outcomes in experience copy (e.g. design system reducing handoff time; launch acceleration).
- Transparent split: corporate work summarised with “get in touch for secure sharing” where public detail isn’t possible.
- Personal prototypes shipped with Cursor/Claude/Next.js — demonstrates AI-native workflow.

**How we do it differently:** Lead with role and impact, not only gallery tiles; side projects prove execution speed; testimonials reinforce collaboration and methodology.

**Why that’s better:** Reduces guesswork for hiring teams evaluating seniority and trust.

**Why customers choose us:** Credible blend of enterprise scale and hands-on modern tooling.

## Objections

| Objection | Response |
|-----------|----------|
| “I can’t see your best work publicly.” | Corporate work is NDA-bound; copy invites secure sharing on request; public prototypes show craft and velocity. |
| “Another corporate designer — is he hands-on?” | Side projects, GitHub template repos, and explicit AI-assisted build narrative. |
| “Is AI-assisted dev just hype?” | Concrete artefacts: live prototypes, starter repos, and integration in professional narrative. |

**Anti-persona:** Teams wanting only consumer-app visual flair with no interest in complex domains, governance, or design-system-led delivery.

## Switching Dynamics

**Push:** Frustration with thin portfolios; need to fill a lead role quickly with someone who can embed with engineering.

**Pull:** Clear leadership story, metrics, testimonials, and working prototype links.

**Habit:** Default reliance on LinkedIn keyword search or agency referrals.

**Anxiety:** That NDA work means “nothing to show”; mitigated by private review offer and public prototypes.

## Customer Language

**How they describe the problem (inferred / to validate):**

- “We need someone who’s done design systems at scale.”
- “Can they work with engineers and actually ship?”

**How they describe us (from on-site copy and testimonials):**

- “User-centric,” “consistent experience across our product suite,” “creative force,” “rare blend of creativity and structure.”

**Words to use:** Product design lead, design practice, design system, AI-assisted development, ship, embed, clear plan, user-centric.

**Words to avoid:** Overclaiming unavailable case studies; vague “innovation” without proof.

**Glossary:**

| Term | Meaning |
|------|---------|
| Framer site | Legacy portfolio at stevendempster.framer.website; visual reference for the Next.js rebuild |
| Corporate vs side projects | NDA client/internal work vs public prototypes |

## Brand Voice

**Tone:** Professional, approachable, confident without hype.

**Style:** Direct sentences; specifics over adjectives; honest about constraints (NDA).

**Personality:** Pragmatic, collaborative, systems-minded, curious (AI and tooling).

## Proof Points

**Metrics (from experience copy — verify before external use):** e.g. design system reducing handoff time by ~66%; ~75% improvement in launch speed (stated in `workExperience` for prior role).

**Customers:** KPMG UK (employer); peer validation via testimonials (Partner/Director Tax Tech, Product Owner, engineers, BA).

**Testimonials:**

> “The design/UX work you've done during your time with us is fantastic, enabling us to build a consistent experience across our product suite.” — Partner, Tax Tech & Innovation (initials OD)

> “Steven brings a rare blend of creativity and structure… deeply considered from a user and business perspective.” — Product Owner (initials SK)

**Value themes:**

| Theme | Proof |
|-------|-------|
| Practice leadership | Current title; team growth narrative |
| Systems & consistency | Design system outcomes; testimonial on suite-wide experience |
| Collaboration | Multiple eng/BA quotes; “approachable,” “bridging business and development” |
| Modern delivery | AI-assisted dev, Cursor/Claude, live prototype URLs |

## Goals

**Business goal:** Secure relevant inbound conversations for senior/lead product design opportunities (and selective collaboration).

**Conversion action:** Contact (email) and/or LinkedIn; optional resume download when `resumeUrl` is set.

**Current metrics:** Not captured in repo (add if you track Fathom/Analytics goals).

---

*Drafted from codebase (`lib/portfolio-data.ts`, metadata, workspace project context). Replace inferred recruiter language with verbatim phrases from real conversations when you have them.*
