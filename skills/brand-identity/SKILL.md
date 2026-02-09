---
name: brand-identity
description: Customize shadcn/ui themes and brand-specific design tokens. Use this skill to personalize your build beyond out-of-the-box shadcn defaults while complementing existing UI patterns.
---

# Brand Identity & Theme Customization

**Brand Name:** [INSERT BRAND NAME HERE]

This skill provides **custom brand-specific values** that customize the shadcn/ui theme system. It complements the existing UI patterns and guidelines—use it to make your build unique while following established patterns.

## Purpose

- **Customize shadcn themes** - Override default shadcn colors, fonts, and spacing
- **Brand-specific tokens** - Define your unique brand colors, typography, and voice
- **Complement existing patterns** - Works alongside UI Guidelines, not replaces them
- **Implementation in globals.css** - Design tokens here should be implemented as CSS variables in `app/globals.css`

## Relationship to Existing Patterns

This skill **complements** (does not replace) the patterns in:
- `@ui-design-guidelines` - Mobile-first, accessibility, component patterns
- `@coding-standards` - TypeScript, React, code quality standards
- shadcn/ui defaults - Base component library patterns

**Use brand-identity for:**
- Customizing colors away from shadcn defaults
- Brand-specific typography choices
- Custom voice and tone for copywriting
- Brand-specific tech constraints

**Use existing patterns for:**
- General UI patterns (mobile-first, accessibility)
- Component usage (shadcn/ui components)
- Code quality standards

## Reference Documentation

Depending on the task you are performing, consult the specific resource files below. Do not guess brand elements; always read the corresponding file.

### For Visual Design & UI Styling

If you need exact colors, fonts, border radii, or spacing values, read:

👉 **[`resources/design-tokens.json`](resources/design-tokens.json)**

### For Coding & Component Implementation

If you are generating code, choosing libraries, or structuring UI components, read the technical constraints here:

👉 **[`resources/tech-stack.md`](resources/tech-stack.md)**

### For Copywriting & Content Generation

If you are writing marketing copy, error messages, documentation, or user-facing text, read the persona guidelines here:

👉 **[`resources/voice-tone.md`](resources/voice-tone.md)**
