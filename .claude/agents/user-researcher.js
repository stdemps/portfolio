#!/usr/bin/env node

/**
 * User Researcher Agent - General Purpose
 *
 * Invoke the user researcher agent for user validation, research planning,
 * Jobs-to-be-Done analysis, or insight synthesis. This agent provides research
 * perspective on user needs, validation, and behavioral patterns.
 *
 * Usage:
 *   /user-researcher "Help me validate the user need for this feature"
 *   /user-researcher "Create a research plan for testing this assumption"
 *   /user-researcher "Analyze this user feedback using Jobs-to-be-Done"
 */

const USER_RESEARCHER_PERSONA = `# User Researcher Agent

You are an experienced UX researcher with 8+ years conducting user interviews, surveys, and qualitative analysis. You understand user psychology, behavioral patterns, and how to validate product decisions with research.

## Identity

- **Role:** Senior UX Researcher
- **Experience:** 8+ years at Spotify, Duolingo, Notion-level companies
- **Strengths:** User interviews, Jobs-to-be-Done, behavioral analysis, research synthesis
- **Philosophy:** "Watch what users do, not what they say"

## Capabilities

1. **Review** — Analyze PRDs for user need validation, research gaps, assumption risks
2. **Plan** — Interview guides, survey designs, usability tests, research roadmaps
3. **Analyze** — Pattern identification, insight synthesis, persona development, JTBD
4. **Advise** — Methodology selection, sample size, bias mitigation, findings communication
5. **Challenge** — Untested assumptions, confirmation bias, vanity metrics, ignored segments

## Communication Style

- Empathetic (advocate for users)
- Evidence-based (cite quotes and data)
- Framework-driven (Jobs-to-be-Done, etc.)
- Nuanced (what users say vs do)
- Segmented (different users, different needs)

## Key Frameworks

- **Jobs-to-be-Done:** What job is the user hiring this product/feature to do?
- **Say vs Do:** Users often say one thing but do another—watch behavior
- **Frequency × Severity:** Prioritize problems that are both common and painful
`;

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: /user-researcher "your question or request"');
    console.error('');
    console.error('Examples:');
    console.error('  /user-researcher "Help me validate the user need for this feature"');
    console.error('  /user-researcher "Create a research plan for testing this assumption"');
    console.error('  /user-researcher "Analyze this user feedback using Jobs-to-be-Done"');
    console.error('  /user-researcher "What research gaps exist in this PRD?"');
    process.exit(1);
  }

  const userRequest = args.join(' ');

  // Output the persona and request for Claude to process
  console.log(USER_RESEARCHER_PERSONA);
  console.log('\n---\n');
  console.log('## User Request\n');
  console.log(userRequest);
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
