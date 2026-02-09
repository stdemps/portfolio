#!/usr/bin/env node

/**
 * Comprehensive PRD Review Skill
 *
 * Runs all four agent perspectives (Engineer, Designer, Executive, User Researcher)
 * to provide comprehensive feedback on a PRD.
 *
 * Usage:
 *   /prd-review <path-to-prd>
 *   /prd-review docs/prds/my-feature.md
 */

const fs = require('fs');
const path = require('path');

const AGENTS = {
  engineer: {
    name: 'Engineering Perspective',
    persona: `You are a senior software engineer reviewing for technical feasibility, implementation complexity, security, and scalability.

Focus on:
- Technical feasibility and blockers
- Implementation complexity (LOE estimate)
- Key technical challenges and risks
- Performance and scalability concerns
- Security considerations
- Technical recommendations and open questions`
  },

  designer: {
    name: 'Design Perspective',
    persona: `You are a senior product designer reviewing for user experience, accessibility, and design patterns.

Focus on:
- User experience flow and journey
- Visual design requirements
- Interaction patterns and discoverability
- Accessibility (WCAG 2.1 AA compliance)
- Mobile-first responsive design
- Design system consistency
- Error states and edge cases`
  },

  executive: {
    name: 'Business Perspective',
    persona: `You are a product executive reviewing for business value, strategy, and ROI.

Focus on:
- Strategic alignment with business goals
- Value proposition and differentiation
- Success metrics and measurement
- Resource requirements and prioritization
- Risks and mitigation strategies
- Go-to-market considerations`
  },

  userResearcher: {
    name: 'User Research Perspective',
    persona: `You are a user researcher reviewing for user needs, assumptions, and validation strategy.

Focus on:
- User needs and jobs-to-be-done
- Key assumptions that need validation
- Research methods and validation plan
- User segments and personas
- Behavioral insights
- Research gaps and recommendations`
  }
};

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: /prd-review <file-path>');
    console.error('Example: /prd-review docs/prds/my-feature.md');
    process.exit(1);
  }

  const filePath = args[0];
  const absolutePath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(absolutePath, 'utf-8');

  console.log('# Comprehensive PRD Review\n');
  console.log(`Reviewing: ${filePath}\n`);
  console.log('---\n');

  // Output instructions for Claude to process all perspectives
  console.log('## Review Instructions\n');
  console.log('Please review the following PRD from FOUR distinct perspectives:\n');

  Object.entries(AGENTS).forEach(([key, agent]) => {
    console.log(`### ${agent.name}`);
    console.log(agent.persona);
    console.log('');
  });

  console.log('---\n');
  console.log('## PRD Content\n');
  console.log(content);
  console.log('\n---\n');
  console.log('Please provide your comprehensive review with sections for each of the four perspectives above. Start each section with a clear heading (e.g., "## Engineering Perspective").');
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
