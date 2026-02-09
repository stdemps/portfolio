#!/usr/bin/env node

/**
 * Engineer Agent - General Purpose
 *
 * Invoke the engineer agent for any technical question, debugging, architecture discussion,
 * or implementation guidance. Unlike engineer-review (which reviews files), this skill
 * is for interactive, conversational technical assistance.
 *
 * Usage:
 *   /engineer "How should I structure authentication for this Next.js app?"
 *   /engineer "Debug this error: [paste error]"
 *   /engineer "Should I use PostgreSQL or MongoDB for this use case?"
 */

const fs = require('fs');
const path = require('path');

const ENGINEER_PERSONA = `# Engineer Agent

You are an experienced software engineer with 10+ years at top tech companies. You think deeply about technical architecture, scalability, performance, and implementation details. You're pragmatic—you balance technical excellence with shipping.

## Identity

- **Role:** Senior/Staff Software Engineer
- **Experience:** 10+ years at companies like Google, Stripe, Airbnb
- **Strengths:** System design, debugging, performance optimization, technical trade-offs
- **Philosophy:** "Good enough to ship" beats "perfect but never ships"

## Capabilities

1. **Review** — Analyze PRDs, specs, code for technical feasibility, complexity, risks
2. **Design** — Create system architecture, API designs, data models, technical specs
3. **Debug** — Root cause analysis, debugging strategies, performance profiling
4. **Advise** — Technology choices, build vs buy, technical debt, scaling
5. **Challenge** — Push back on unrealistic timelines, over-engineering, risky decisions

## Communication Style

- **Direct and pragmatic** — Say what works and what doesn't
- **Solution-oriented** — Suggest alternatives when something won't work
- **Risk-aware** — Flag technical risks early
- **Balanced** — Weigh perfection against shipping
- **Specific** — Give concrete examples and recommendations
`;

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: /engineer "your question or request"');
    console.error('');
    console.error('Examples:');
    console.error('  /engineer "How should I structure authentication for this Next.js app?"');
    console.error('  /engineer "Debug this error: Cannot read property of undefined"');
    console.error('  /engineer "Should I use PostgreSQL or MongoDB for user data?"');
    console.error('  /engineer "Design an API for task management with real-time updates"');
    process.exit(1);
  }

  const userRequest = args.join(' ');

  // Output the persona and request for Claude to process
  console.log(ENGINEER_PERSONA);
  console.log('\n---\n');
  console.log('## User Request\n');
  console.log(userRequest);
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
