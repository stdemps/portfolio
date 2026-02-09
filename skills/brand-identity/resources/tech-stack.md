# Brand-Specific Tech Stack & Implementation Rules

This document defines **brand-specific customizations** to the tech stack. It complements (does not replace) the general patterns in `@coding-standards` and `@ui-design-guidelines`.

## Core Stack (Matches Project Defaults)

* **Framework:** React (TypeScript) - See `@coding-standards` for general patterns
* **Styling Engine:** Tailwind CSS - See `@ui-design-guidelines` for usage patterns
* **Component Library:** shadcn/ui - **Use as base, customize with brand tokens**
* **Icons:** Lucide React - See `@ui-design-guidelines` for icon usage

## Brand Customization Approach

**This skill customizes shadcn/ui themes**, not replaces the component library. Follow this approach:

1. **Use shadcn/ui components** as the foundation (per `@ui-design-guidelines`)
2. **Apply brand tokens** from `design-tokens.json` via CSS variables in `globals.css`
3. **Follow existing patterns** for mobile-first, accessibility, component usage
4. **Customize only brand-specific values** (colors, fonts, voice/tone)

## Implementation Guidelines

### 1. Tailwind Usage

* Use utility classes directly in JSX.
* Utilize the color tokens defined in `design-tokens.json` (e.g., use `bg-primary text-primary-foreground` instead of hardcoded hex values).
* **Dark Mode:** Support dark mode using Tailwind's `dark:` variant modifier.

### 2. Component Patterns

* **Buttons:** Primary actions must use the solid Primary color. Secondary actions should use the 'Ghost' or 'Outline' variants from shadcn/ui.
* **Forms:** Labels must always be placed *above* input fields. Use standard Tailwind spacing (e.g., `gap-4` between form items).
* **Layout:** Use Flexbox and CSS Grid via Tailwind utilities for all layout structures.

### 3. Forbidden Patterns

* Do NOT use jQuery.
* Do NOT use Bootstrap classes.
* Do NOT create new CSS files; keep styles located within component files via Tailwind.
