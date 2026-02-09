# Agent System Comparison

This repository has three different ways to invoke agents, each serving different purposes. Here's how they compare:

## Quick Reference

| Use Case | Tool | Syntax |
|----------|------|--------|
| **Coding in Cursor** | Cursor Rules | `@engineer` in Cursor chat |
| **CLI questions** | Claude Code Skills | `/engineer "question"` |
| **File reviews** | Claude Code Skills | `/engineer-review file.md` |
| **Any LLM** | Agent Definitions | Copy `agents/engineer.md` into prompt |

## The Three Systems

### 1. Cursor Rules (`.cursor/rules/agents/*.mdc`)

**What:** Markdown files with frontmatter that Cursor automatically loads
**Where:** `.cursor/rules/agents/engineer.mdc`, etc.
**How to use:** `@engineer` in Cursor chat
**Best for:** Interactive coding sessions in Cursor IDE

**Pros:**
- Automatically available in Cursor
- Concise versions of full agent definitions
- Integrated into your coding workflow

**Cons:**
- Cursor-specific (doesn't work elsewhere)
- Conversational only (not for batch processing)

**Example:**
```
# In Cursor chat
@engineer How should I structure this authentication middleware?
```

---

### 2. Claude Code Skills (`.claude/skills/*.js`)

**What:** Executable JavaScript files that invoke agents via CLI
**Where:** `.claude/skills/engineer.js`, `.claude/skills/engineer-review.js`, etc.
**How to use:** `/engineer "question"` or `/engineer-review file.md`
**Best for:** CLI workflows, automation, CI/CD, batch processing

**Two types:**

#### General Purpose (`/engineer`, `/designer`)
For questions, debugging, discussions:
```bash
/engineer "How should I handle authentication in Next.js?"
/designer "What's the best loading state pattern for forms?"
```

#### File Reviews (`/engineer-review`, `/designer-review`, `/prd-review`)
For reviewing documents:
```bash
/engineer-review docs/prds/my-feature.md
/prd-review docs/prds/my-feature.md  # All four perspectives
```

**Pros:**
- Works from command line
- Can be automated/scripted
- Can be integrated into CI/CD pipelines
- Batch process multiple files

**Cons:**
- Requires Claude Code CLI
- Not available in Cursor chat

---

### 3. Agent Definitions (`agents/*.md`)

**What:** Complete, detailed agent specifications (source of truth)
**Where:** `agents/engineer.md`, `agents/designer.md`, etc.
**How to use:** Copy content into any LLM prompt
**Best for:** Universal portability, reference documentation

**Pros:**
- Works with ANY LLM (ChatGPT, Claude web, etc.)
- Most detailed and complete
- Single source of truth
- Great documentation

**Cons:**
- Manual copy/paste required
- More verbose

**Example:**
```bash
# Copy agents/engineer.md content, then:

[Pasted agent definition]

Now, review this authentication implementation...
```

---

## When to Use What

### Coding in Cursor
**Use:** Cursor Rules (`@engineer`)
```
@engineer Review this function for performance issues
```

### Command Line Workflows
**Use:** Claude Code Skills
```bash
# Questions
/engineer "Should I use REST or GraphQL for this API?"

# File reviews
/engineer-review docs/api-spec.md
```

### CI/CD Pipelines
**Use:** Claude Code Skills (scriptable)
```bash
# In .github/workflows/prd-review.yml
- run: claude-code /prd-review docs/prds/${{ github.event.pull_request.title }}.md
```

### Other LLMs (ChatGPT, Claude Web, etc.)
**Use:** Agent Definitions
1. Copy `agents/engineer.md`
2. Paste into prompt
3. Ask your question

---

## Maintaining Consistency

All three systems derive from the same agent definitions:

```
agents/engineer.md (source of truth)
    ├── .cursor/rules/agents/engineer.mdc (concise for Cursor)
    ├── .claude/agents/engineer.js (conversational CLI wrapper)
    └── .claude/skills/engineer-review.js (file review skill)
```

**When updating agents:**
1. Update the source in `agents/*.md`
2. Update Cursor rule in `.cursor/rules/agents/*.mdc` if needed
3. Update CLI agent in `.claude/agents/*.js`
4. Update any related skills in `.claude/skills/` if they embed the persona

**Utility skills (no persona in `agents/`):** Some skills are task-only and don’t have an `agents/*.md` definition. Examples: `ux-to-implementation-plan` (UX spec → implementation plan), `prd-review` (multi-perspective review). For these, keep `.cursor/rules/agents/*.mdc` and `.claude/skills/*.js` in sync; the CLI command is defined in `.claude/claude.json` (e.g. `ux-to-implementation-plan` → `skills/ux-to-implementation-plan.js`).

---

## Summary Table

| Feature | Cursor Rules | Claude Agents | Claude Skills | Agent Definitions |
|---------|-------------|---------------|---------------|-------------------|
| **Format** | `.mdc` | `.js` | `.js` | `.md` |
| **Location** | `.cursor/rules/agents/` | `.claude/agents/` | `.claude/skills/` | `agents/` |
| **Invocation** | `@engineer` | `/engineer "..."` | `/engineer-review file.md` | Copy/paste |
| **Purpose** | Persona in IDE | Persona in CLI | Tasks/actions | Documentation |
| **Environment** | Cursor only | Claude Code CLI | Claude Code CLI | Any LLM |
| **Automation** | No | Limited | Yes | Manual |
| **Complexity** | Concise | Simple wrapper | Full logic | Complete |
| **Best for** | Interactive coding | CLI questions | Batch tasks | Universal use |

---

## Recommendation

**Use all of them!** They complement each other:

- **Cursor Rules** for day-to-day coding in Cursor
- **Claude Code Agents** for CLI conversations (`/engineer "question"`)
- **Claude Code Skills** for automated tasks (`/engineer-review file.md`)
- **Agent Definitions** as documentation and for portability

The clear separation between agents (personas) and skills (tasks) makes the system more maintainable and easier to understand.
