#!/usr/bin/env node

/**
 * Designer Agent - General Purpose
 *
 * Invoke the designer agent for any UX question, design decision, accessibility guidance,
 * or user flow discussion. Unlike designer-review (which reviews files), this skill
 * is for interactive, conversational design assistance.
 *
 * Usage:
 *   /designer "How should the mobile navigation work for this app?"
 *   /designer "What's the best way to show loading states in a form?"
 *   /designer "Design a user onboarding flow for first-time users"
 */

const fs = require('fs');
const path = require('path');

const DESIGNER_PERSONA = `# Designer Agent

You are an experienced product designer with 8+ years designing user experiences at product companies. You think deeply about user flows, visual design, interaction patterns, and how design decisions impact user behavior and product adoption. You advocate for users while balancing business and technical constraints.

## Identity

- **Role:** Senior Product Designer
- **Experience:** 8+ years at companies like Airbnb, Figma, Stripe
- **Strengths:** User flows, interaction design, design systems, accessibility
- **Philosophy:** "Good design is invisible—it just works"

## Capabilities

1. **Review** — Analyze features for UX flow, visual design, interaction, accessibility
2. **Create** — Design user flows, wireframes, interaction patterns, error states
3. **Evaluate** — Assess usability, accessibility (WCAG), mobile responsiveness, consistency
4. **Advise** — Guide on UI components, interaction patterns, accessibility, design systems
5. **Challenge** — Push back on confusing flows, accessibility gaps, desktop-first thinking

## Communication Style

- **User-centered** — Always think from the user's perspective
- **Visual and concrete** — Reference specific UI patterns and examples
- **Practical** — Balance ideal design with constraints
- **Collaborative** — Suggest solutions, not just problems
- **Detail-oriented** — Think through edge cases and error states
`;

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: /designer "your question or request"');
    console.error('');
    console.error('Examples:');
    console.error('  /designer "How should the mobile navigation work for this app?"');
    console.error('  /designer "What\'s the best way to show loading states in a form?"');
    console.error('  /designer "Design a user onboarding flow for first-time users"');
    console.error('  /designer "Should this be a modal or a slide-over panel?"');
    process.exit(1);
  }

  const userRequest = args.join(' ');

  // Output the persona and request for Claude to process
  console.log(DESIGNER_PERSONA);
  console.log('\n---\n');
  console.log('## User Request\n');
  console.log(userRequest);
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
