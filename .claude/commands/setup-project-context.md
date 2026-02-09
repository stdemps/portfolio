---
name: setup-project-context
description: Capture project context by questioning the user (optionally pre-fill from a PRD), then write to .cursor/rules/project-context.mdc for consistent product context across sessions.
---

# Setup Project Context

Capture project context by questioning the user (and optionally pre-filling from a PRD), then write the result to `.cursor/rules/project-context.mdc` so the AI has consistent product context in every session. Uses the **AskUserQuestionTool** for structured questions.

## Step 1: Optional PRD Pre-fill

If the user provided a PRD path (e.g. "use docs/prds/feature.md" or "docs/prds/my-prd.md"), read that file first and extract:

- **From section 1 (What are we building?):** Project/feature name, one-line description of what is being built
- **From section 2 (Why are we building it?):** Problem statement, key pain points, business goals
- **From section 3 (Who are we building it for?):** Primary users, personas (names and short descriptions), accessibility considerations

Note any domain terms that appear (for Key Terminology). If no PRD path was provided, proceed with empty pre-fill and gather everything via questions.

## Step 2: Ask Depth Preference

Use the **AskUserQuestionTool** to let the user choose depth:

- **Quick (5–7 questions):** Project name, what it is, 1–2 goals, 1–2 priorities, one philosophy principle. Skip or shorten terminology and personas.
- **Full (10–15 questions):** Cover all sections below in depth—About, Terminology, Personas, Philosophy, Priorities.

Present these as clear options (e.g. 2–4 choices) so the user can pick one.

## Step 3: Question Flow

Ask questions to fill gaps and add product-level context. **ALWAYS use AskUserQuestionTool** for each question (provide 2–4 options where helpful). Map answers to the project-context structure:

### About
- Project/product name (if not from PRD)
- One-line "what it is" description
- 2–3 goals

### Key Terminology (Full only, or optional in Quick)
- 2–4 key terms and definitions (domain concepts, jargon). User can skip.

### User Personas
- Short names and one-line description each (can refine from PRD "who" if pre-filled)

### Product Philosophy
- 2–3 product principles (e.g. "ship fast," "mobile-first," "accessibility first")

### Current Priorities
- Top 2–3 current priorities or roadmap items

Skip questions already answered by the PRD pre-fill. Adapt later questions based on earlier answers.

## Step 4: Write project-context.mdc

Synthesize PRD pre-fill + all answers into a single markdown document and write it to **`.cursor/rules/project-context.mdc`**.

**Structure to write:**

1. **Frontmatter:** Set `alwaysApply: true` (so context is loaded every session).
2. **About [Project Name]:** What it is, Goals (bullets).
3. **Key Terminology:** Term → definition (or omit if skipped).
4. **User Personas:** Name, Role/Goals/Pain points (short).
5. **Product Philosophy:** Numbered principles.
6. **Current Priorities:** Numbered list.
7. **Design & Development Standards:** Copy the following block exactly (do not modify):

```markdown
## Design & Development Standards

### CRITICAL: Mobile-First Requirement
This project uses **mobile-first responsive design** for ALL features. Before starting any UI work:
- ✅ Review the [Responsive Design Checklist](../checklists/responsive-design-checklist.md)
- ✅ Start with mobile layout (no breakpoint prefix)
- ✅ Enhance for larger screens with `md:` and `lg:` prefixes
- ❌ NEVER build desktop-first and retrofit mobile

**Why this matters:** Building desktop-first and retrofitting mobile leads to significant rework, inconsistent patterns, and poor mobile user experience. The responsive design checklist and updated guidelines prevent this from happening.

## Resources

- **Responsive Design Checklist:** [.cursor/checklists/responsive-design-checklist.md](../checklists/responsive-design-checklist.md) ⭐ **READ THIS FIRST**
- [Link to documentation]
- [Link to design system]
```

Do not add the template "Instructions" or "Replace this file" text—only the sections above.

## Step 5: Completion

Tell the user:
- Project context has been saved to `.cursor/rules/project-context.mdc` with `alwaysApply: true`.
- They can edit the file anytime or re-run this command (e.g. `/setup-project-context docs/prds/other-prd.md`) to update context.
