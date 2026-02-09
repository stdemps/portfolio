# Prompt Library

A curated collection of useful prompts for AI-assisted development in this workspace.

## Purpose

This library contains reusable prompts that have proven effective for:
- Code generation and refactoring
- Debugging and troubleshooting
- Code review and quality assurance
- Documentation and explanation
- Architecture and design decisions
- Testing and validation

## Structure

Prompts are organized by category:
- **Development:** Code generation, implementation, and feature development
- **Debugging:** Error diagnosis, troubleshooting, and bug fixes
- **Refactoring:** Code improvement, optimization, and cleanup
- **Testing:** Test creation, test improvement, and test debugging
- **Documentation:** Code documentation, README updates, and explanations
- **Code Review:** Quality checks, best practices, and improvements
- **Architecture:** System design, patterns, and technical decisions
- **Workspace-Specific:** PRD creation, reviews, research documentation, and workspace workflows

## Usage

Prompts can be used in several ways depending on your tool:

### In Cursor (Recommended)

**Using Agent @ Mentions:**
Cursor agents are automatically available. Enhance prompts by referencing agents:
```
@engineer Create a new TaskCard component in components/task-card.tsx...
@designer How should I structure this login form with validation?
@pm What's the MVP for this feature?
```

**Available Cursor Agents:**
- `@engineer` - Technical feasibility, architecture, debugging
- `@designer` - UX, accessibility, visual design
- `@executive` - Strategic business, prioritization
- `@user-researcher` - User needs, validation, research

**Multi-Agent Collaboration:**
Use `/collab` skill to get multiple perspectives at once:
```bash
/collab "How should we implement project sharing with permissions?"
```

**Direct Usage:**
You can also use prompts directly in Cursor chat without agents. The workspace rules (coding standards, UI guidelines, etc.) are automatically loaded.

### With Claude Code Skills

**Using Slash Commands:**
This workspace includes Engineer, Designer, and PM skills:
```bash
/engineer "How should I structure authentication for this Next.js app?"
/designer "What's the best mobile navigation pattern?"
/pm "What's the MVP for user dashboard?"
```

**Multi-Agent Collaboration:**
Use `/collab` to get all three perspectives synthesized:
```bash
/collab "Should we use optimistic updates for the todo list?"
```

**Combining with Prompts:**
Use prompts from this library with skills:
```bash
/engineer "Create a new API route at app/api/tasks/route.ts that handles GET and POST requests..."
```

**Available Skills:**
- `/engineer` - Technical questions and architecture
- `/designer` - UX and design guidance
- `/pm` - Product strategy and prioritization
- `/collab` - Multi-agent synthesis (Engineer + Designer + PM)

### In Standalone Claude Chat

**Using Agent Personas:**
Copy agent definitions from `agents/` and combine with prompts:
1. Copy agent definition (e.g., `agents/engineer.md`)
2. Copy prompt from this library
3. Combine in your chat

**Example:**
```
[Paste agent definition from agents/engineer.md]

[Paste prompt from prompts/development.md]

[Add your specific context]
```

### In Other AI Assistants (ChatGPT, etc.)

Prompts work directly. Copy, customize with your context, and use:
1. Browse prompts by category
2. Copy the prompt that matches your need
3. Customize with your specific context (file paths, feature names, etc.)
4. Paste into your AI assistant

## Contributing

When you discover a useful prompt:
1. Use the `template.md` as a starting point
2. Add it to the appropriate category
3. Include context about when to use it
4. Update this README if adding a new category

## Best Practices

- **Be specific:** Include file paths, component names, and relevant context
- **Provide examples:** Show what good output looks like
- **Include constraints:** Mention workspace rules, patterns, or limitations
- **Leverage agents:** Use `@engineer`, `@designer`, `@pm` in Cursor, or `/engineer`, `/designer`, `/pm` skills for specialized perspectives
- **Use multi-agent collaboration:** Use `/collab` for complex decisions requiring multiple perspectives
- **Combine approaches:** Use prompts with agent personas for more focused results
- **Test prompts:** Verify they produce useful results before adding
- **Keep updated:** Remove outdated prompts, update as patterns evolve

## Enhancing Prompts with Agents

For better results, combine prompts with agent perspectives:

**For Technical Tasks:**
- Use `@engineer` in Cursor or `/engineer` skill with development prompts
- Agents provide technical feasibility and architecture guidance

**For UX/Design Tasks:**
- Use `@designer` in Cursor or `/designer` skill with component creation prompts
- Agents ensure accessibility, responsive design, and UX best practices

**For Product/Strategy Tasks:**
- Use `@pm` in Cursor or `/pm` skill for MVP scoping and prioritization
- Combine with architecture or workspace-specific prompts

**For Complex Decisions:**
- Use `/collab` to get synthesized feedback from Engineer + Designer + PM
- Perfect for features requiring technical, UX, and product alignment

**Example - Creating a Component with Agent:**
```
@designer Create a new SignupForm component in components/signup-form.tsx with:
- Email field (required)
- Password field (required)
- Validation on blur, errors inline below fields
- Follow workspace standards for accessibility and responsive design
```

This gives you both the structured prompt AND the designer's UX expertise.

## Categories

- [Development Prompts](./development.md)
- [Debugging Prompts](./debugging.md)
- [Refactoring Prompts](./refactoring.md)
- [Testing Prompts](./testing.md)
- [Documentation Prompts](./documentation.md)
- [Code Review Prompts](./code-review.md)
- [Architecture Prompts](./architecture.md)
- [Workspace-Specific Prompts](./workspace-specific.md)

## Reference- [Workspace Standards](./STANDARDS.md) - Common requirements (accessibility, responsive design, TypeScript, etc.) referenced by all prompts
