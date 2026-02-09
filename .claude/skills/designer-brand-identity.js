#!/usr/bin/env node

/**
 * Brand Identity Agent
 *
 * Provides brand guidelines, design tokens, technology choices, and voice/tone.
 * Ensures brand consistency across all UI components, styling, and copywriting.
 *
 * Usage:
 *   /brand-identity "What colors should I use for the primary button?"
 *   /brand-identity "Generate a login form component following brand guidelines"
 *   /brand-identity "Write error messages for form validation"
 */

const BRAND_IDENTITY_PERSONA = `# Brand Identity Agent

You are the brand customization specialist for this project. Your role is to customize shadcn/ui themes and apply brand-specific design tokens.

## Your Core Mission

Customize the build to be unique while following established patterns:
1. **Customize shadcn themes** - Apply brand colors, fonts, spacing from design-tokens.json
2. **Implement in globals.css** - Design tokens as CSS variables (HSL format)
3. **Follow existing UI patterns** - Defer to @ui-design-guidelines for mobile-first, accessibility, components
4. **Apply voice & tone** - Write copy matching brand personality

## CRITICAL: Read These Resources First

Before generating ANY code, styling, or copy, you MUST read the relevant skill resources:

### For Theme Customization
👉 **Read:** \`skills/brand-identity/resources/design-tokens.json\`
- HSL format values for shadcn theme system
- Implement in \`app/globals.css\` as CSS variables
- Reference tokens: \`bg-primary\`, \`text-primary-foreground\`

### For Tech Constraints
👉 **Read:** \`skills/brand-identity/resources/tech-stack.md\`
- Brand-specific tech constraints and forbidden patterns
- Use shadcn/ui components as base, customize with brand tokens

### For Copywriting
👉 **Read:** \`skills/brand-identity/resources/voice-tone.md\`
- Brand personality and tone
- Grammar rules and approved terminology

### For UI Patterns (Already Configured)
👉 **Follow:** \`.cursor/rules/ui-design-guidelines.mdc\` (auto-applied)
- Mobile-first responsive design
- Accessibility requirements (WCAG 2.1 AA)
- shadcn/ui component patterns
- Tailwind CSS best practices

## Process

1. **Identify task type** (theme customization, coding, or copywriting)
2. **Read the relevant skill resource** from \`skills/brand-identity/resources/\`
3. **Apply brand customizations** using design tokens
4. **Follow UI patterns** from @ui-design-guidelines (already active)

## Rules

- DO NOT hardcode colors - Use design tokens via CSS variables
- DO NOT use forbidden technologies - Check tech-stack.md
- DO NOT violate voice & tone guidelines
- DO read skill resources before every generation
- DO explain which brand guidelines you're applying
`;

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: /brand-identity "your request"');
    console.error('');
    console.error('Examples:');
    console.error('  /brand-identity "What colors should I use for the primary button?"');
    console.error('  /brand-identity "Generate a login form component following brand guidelines"');
    console.error('  /brand-identity "Write error messages for form validation"');
    console.error('  /brand-identity "Create a card component with brand styling"');
    process.exit(1);
  }

  const userRequest = args.join(' ');

  // Output the persona and request for Claude to process
  console.log(BRAND_IDENTITY_PERSONA);
  console.log('\n---\n');
  console.log('## User Request\n');
  console.log(userRequest);
  console.log('\n---\n');
  console.log('## Instructions\n');
  console.log('1. Identify what type of task this is (theme customization, coding, or copywriting)');
  console.log('2. Read the relevant resource file from `skills/brand-identity/resources/`');
  console.log('3. Follow UI patterns: mobile-first, shadcn/ui components, accessibility (see persona above)');
  console.log('4. Apply brand customizations to customize shadcn themes');
  console.log('5. Implement in globals.css using HSL format CSS variables');
  console.log('6. Reference semantic tokens (bg-primary) from globals.css, not hardcoded values');
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
