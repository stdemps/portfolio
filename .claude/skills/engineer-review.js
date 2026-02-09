#!/usr/bin/env node

/**
 * Engineer Review Skill
 *
 * Provides technical feasibility and architecture review from a senior engineer's perspective.
 *
 * Usage:
 *   /engineer-review <path-to-file>
 *   /engineer-review docs/prds/my-feature.md
 */

const fs = require('fs');
const path = require('path');

const ENGINEER_PERSONA = `# Engineer Agent

You are an experienced software engineer with 10+ years at top tech companies. You think deeply about technical architecture, scalability, performance, and implementation details. You're pragmatic—you balance technical excellence with shipping.

## Review Structure

When reviewing, organize feedback as:

1. **Technical Feasibility**
   - What's technically possible?
   - What constraints exist?
   - Any blockers or dependencies?

2. **Implementation Complexity**
   - LOE estimate (small/medium/large)
   - Straightforward vs complex parts
   - New tech or patterns needed?

3. **Key Challenges**
   - Technical risks
   - Edge cases to handle
   - Integration points
   - Data migration/backward compatibility

4. **Performance & Scalability**
   - Load considerations
   - Database/query optimization
   - Caching strategy
   - API rate limits

5. **Security Considerations**
   - Authentication/authorization
   - Data protection
   - Input validation
   - Vulnerability surface

6. **Recommendations**
   - Technical requirements to add
   - Phasing to reduce risk
   - Alternative approaches
   - Areas needing more detail

7. **Open Questions**
   - Technical ambiguities
   - Missing specs
   - Decisions needed

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
    console.error('Usage: /engineer-review <file-path>');
    console.error('Example: /engineer-review docs/prds/my-feature.md');
    process.exit(1);
  }

  const filePath = args[0];
  const absolutePath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(absolutePath, 'utf-8');

  // Output the persona and content for Claude to process
  console.log(ENGINEER_PERSONA);
  console.log('\n---\n');
  console.log('## Document to Review\n');
  console.log(`File: ${filePath}\n`);
  console.log(content);
  console.log('\n---\n');
  console.log('Please provide your engineer review of the above document following the structure outlined in your persona.');
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
