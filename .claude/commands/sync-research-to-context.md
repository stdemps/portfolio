---
name: sync-research-to-context
description: Update User Personas (and optionally Key Terminology) in project context from docs/research/ so the AI has research-backed personas.
---

# Sync Research to Project Context

Update the **User Personas** (and optionally **Key Terminology**) section of `.cursor/rules/project-context.mdc` from research in `docs/research/`. Does not change About, Philosophy, Priorities, or Design & Development Standards.

## Step 1: Locate research files

- If the user provided path(s), use those (e.g. `docs/research/user-personas.md`, `docs/research/pain-points-synthesis.md`).
- Otherwise, read from `docs/research/`: look for `user-personas.md`, `pain-points-synthesis.md`, and any file that looks like key terms (e.g. headings or "Term: definition" patterns).

Conventions for these files are in [docs/research/README.md](../../docs/research/README.md) under "File conventions (sync to project context)."

## Step 2: Parse research content

- **Personas:** From `user-personas.md` (or equivalent), extract each persona: name (from `## Name` or `### Name`), Role, Goals, Pain Points. Merge in any pain points from `pain-points-synthesis.md` if it makes sense (e.g. attach to a relevant persona or add as a short summary).
- **Terminology:** If you find a file or section with term/definition pairs, extract 2–4 key terms for **Key Terminology**.

Format the personas for project context as:

```markdown
### [Persona Name]
- Role: [one line]
- Goals: [one or two lines]
- Pain Points: [one or two lines]
```

## Step 3: Read current project-context.mdc

Read `.cursor/rules/project-context.mdc`. Note whether it already has a real **## User Personas** section (not inside a code block) and **## Key Terminology**.

## Step 4: Replace or insert sections

- **If "## User Personas" exists:** Replace that section (from the line `## User Personas` through the line before the next `##`) with the synced personas. Use the exact heading `## User Personas` and the persona format above.
- **If "## User Personas" does not exist:** Insert `## User Personas` and the persona content before `## Product Philosophy` if present, otherwise before `## Design & Development Standards`. Use a single newline between sections.
- **If you extracted terminology and "## Key Terminology" exists:** Replace that section with the synced terms (same way: from `## Key Terminology` to the next `##`).
- **If you extracted terminology and "## Key Terminology" does not exist:** Insert it before `## User Personas` (or before `## Product Philosophy` if no User Personas).

Do not change frontmatter, About, Product Philosophy, Current Priorities, Design & Development Standards, or Resources.

## Step 5: Write back

Write the updated content to `.cursor/rules/project-context.mdc`. Preserve the rest of the file exactly (line endings, spacing, other sections).

## Step 6: Confirm

Tell the user what was synced (e.g. "Updated User Personas from user-personas.md (3 personas); Key Terminology unchanged.") and that they can run this again whenever research is updated.
