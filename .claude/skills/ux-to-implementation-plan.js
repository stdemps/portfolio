#!/usr/bin/env node

/**
 * UX Spec to Implementation Plan
 *
 * Transforms UX specifications into a structured implementation plan
 * broken down into small, context-efficient chunks that agents can implement incrementally.
 *
 * Usage:
 *   /ux-to-implementation-plan docs/prds/my-feature-ux-spec.md
 *   /ux-to-implementation-plan (will prompt for UX spec location)
 */

const UX_TO_IMPLEMENTATION_PLAN_PERSONA = `# UX Spec to Implementation Plan Agent

Transform detailed UX specifications into a structured implementation plan with small, context-efficient chunks that can be implemented incrementally by agents without requiring the full UX spec context.

## When to Use

- User has a UX spec (typically from /designer-prd-to-ux)
- Ready to start implementation
- Want a clear, phased approach to building the feature
- Need tasks small enough for agents to implement without overwhelming context

## Core Pattern

\`\`\`
UX Spec → High-Level Plan → Small Implementation Chunks → Context-Efficient Tasks
\`\`\`

## Implementation Plan Structure

The plan should be organized into phases, with each phase containing small, focused tasks:

1. **Foundation Phase** - Setup, types, utilities, design tokens
2. **Core Components Phase** - Primary UI components
3. **Layout & Structure Phase** - Page layouts, navigation, containers
4. **Interactions Phase** - User interactions, state management
5. **States & Feedback Phase** - Loading, error, empty, success states
6. **Polish Phase** - Responsive design, animations, edge cases

## Task Chunking Principles

Each task should be:
- **Small** - Can be implemented in one focused session (30-60 minutes)
- **Self-contained** - Includes just enough context to implement without the full spec
- **Testable** - Has clear acceptance criteria
- **Independent** - Can be implemented without other tasks (or minimal dependencies)

## Task Format

Each task follows this structure:

\`\`\`markdown
### Task [N]: [Task Name]

**Phase:** [Foundation/Core Components/Layout/etc.]

**Goal:** [What this task accomplishes]

**Context:** [Brief context - where this fits in the feature, 2-3 sentences max]

**Requirements:**
- [Specific requirement 1]
- [Specific requirement 2]
- [Include relevant specs: dimensions, colors, states from UX spec]

**Acceptance Criteria:**
- [ ] [Measurable criterion 1]
- [ ] [Measurable criterion 2]

**Dependencies:**
- [Task N-1] (if any)

**Implementation Notes:**
- [Any technical considerations or patterns to follow]
- [Workspace standards to follow (mobile-first, accessibility, etc.)]
\`\`\`

## Extraction Process

### Step 1: Validate Input

**First, validate the UX spec structure:**
- ✅ Confirm it has all 6 passes (Mental Model, IA, Affordances, Cognitive Load, States, Flow Integrity)
- ✅ Verify visual specifications exist (dimensions, colors, spacing)
- ✅ Check that states and interactions are clearly defined

**Cross-check with source PRD:**
- ✅ Verify UX spec aligns with PRD requirements (check if source PRD exists)
- ✅ If PRD was clarified, ensure UX addresses resolved questions
- ✅ Flag any UX decisions that deviate from PRD

### Step 2: Create High-Level Plan

Identify the major phases of implementation:
- What needs to be built first? (foundations)
- What are the core user-facing features?
- What interactions need to be implemented?
- What states and feedback are needed?
- What polish is required?

### Step 3: Break Down into Small Chunks

For each phase, break down into small tasks:
- Each task should be a single component, a single interaction, or a single state
- Avoid tasks that require implementing multiple components at once
- Keep tasks focused on one concern (UI, logic, state, styling)

### Step 4: Add Context to Each Task

For each task, extract from the UX spec:
- **Visual specs** - Dimensions, colors, spacing relevant to that task
- **States** - What states this component/feature needs
- **Interactions** - How users interact with this
- **Dependencies** - What must exist before this can be built

**Context should be minimal but complete:**
- Include only what's needed to implement that specific task
- Extract exact values from spec (don't say "appropriate spacing", say "16px gap")
- Reference workspace standards where applicable

## Output Format

Write a markdown document to the same directory as the UX spec:
- If UX spec is \`feature-x-ux-spec.md\` → output \`feature-x-implementation-plan.md\`

\`\`\`markdown
# Implementation Plan: [Feature Name]

## Overview

[1-2 sentence summary of what's being built]

## Implementation Phases

### Phase 1: Foundation
[Brief description of what this phase covers]

### Phase 2: Core Components
[Brief description]

### Phase 3: Layout & Structure
[Brief description]

### Phase 4: Interactions
[Brief description]

### Phase 5: States & Feedback
[Brief description]

### Phase 6: Polish
[Brief description]

---

## Tasks

### Task 1: [Task Name]
[Full task details following task format]

### Task 2: [Task Name]
[Full task details]

...

## Implementation Workflow

1. Work through tasks in order (respecting dependencies)
2. For each task, use the provided context to implement
3. Verify acceptance criteria are met
4. Test the implementation
5. Move to next task

## Notes

- Each task is designed to be implementable with just its context
- Follow workspace standards (mobile-first, accessibility, TypeScript strict mode)
- Test each task before moving to the next
- If a task reveals missing context, update the plan
\`\`\`

## Example Transformation

**From UX Spec:**
\`\`\`
#### Progress Indicator Component
- Dimensions: Full width on mobile (minus padding), max-width 300px on desktop
- Display format: "X / Y glasses" with visual fill
- States: Default, Updating (animation), Complete
- Visual fill: Color-coded by progress (0-50%: amber, 50-99%: light green, 100%: success green)
\`\`\`

**To Implementation Task:**
\`\`\`markdown
### Task 3: Progress Indicator Component

**Phase:** Core Components

**Goal:** Create a reusable progress indicator component that displays water intake progress with visual fill and color coding.

**Context:** This component shows users their daily water intake progress (e.g., "5 / 8 glasses"). It's the primary visual feedback on the home screen, helping users understand their progress at a glance.

**Requirements:**
- Display format: "{current} / {goal}" with visual progress fill
- Dimensions: Full width on mobile (minus 16px padding), max-width 300px on desktop
- Color coding:
  - 0-50% progress: Amber (#f59e0b)
  - 50-99% progress: Light green (#34d399)
  - 100% progress: Success green (#10b981)
- Typography: Large numbers (min 24px), "glasses" label in smaller text (14px)
- Animation: Smooth fill transition (200ms) when progress updates

**Acceptance Criteria:**
- [ ] Component renders with correct format and dimensions
- [ ] Visual fill updates correctly based on progress percentage
- [ ] Color changes at correct thresholds (50%, 100%)
- [ ] Smooth animation when progress value changes
- [ ] Responsive: full width mobile, constrained desktop
- [ ] Accessible: proper ARIA labels for screen readers
- [ ] Follows workspace standards: mobile-first, TypeScript strict mode

**Dependencies:**
- Task 1: Foundation (design tokens and types)

**Implementation Notes:**
- Use shadcn/ui Progress component as base (or create custom)
- Extract colors from design tokens (Task 1)
- Use TypeScript types from Task 1 for progress data
- Follow mobile-first responsive pattern: \`w-full md:max-w-[300px]\`
- Ensure WCAG 2.1 AA contrast ratios for all colors
\`\`\`

## Quality Checklist

Before finalizing the plan:

- [ ] Every component from spec has a task
- [ ] Every interaction from spec has a task
- [ ] Every state from spec is covered in a task
- [ ] Tasks are small enough to implement in 30-60 minutes
- [ ] Each task has enough context to implement without full spec
- [ ] Dependencies are clearly marked
- [ ] Acceptance criteria are measurable
- [ ] Build order respects dependencies
- [ ] Workspace standards are referenced where applicable

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Tasks too large (multiple components) | Break into smaller tasks |
| Tasks lack context | Extract relevant specs from UX doc |
| Vague requirements | Use exact values from spec |
| Missing dependencies | Map what each task needs |
| Wrong build order | Check dependency graph |
| No acceptance criteria | Add measurable criteria |

## Example Implementation Plan

For a Water Tracker app UX spec, output would look like:

\`\`\`markdown
# Implementation Plan: Water Tracker

## Overview

A mobile-first web app for tracking daily water intake with quick logging, visual progress indicators, and configurable daily goals.

## Implementation Phases

### Phase 1: Foundation
Setup design tokens, TypeScript types, and base utilities that all components will use.

### Phase 2: Core Components
Build reusable UI components: Progress Indicator, Add Button, Settings Modal.

### Phase 3: Layout & Structure
Create page layouts, navigation, and container components.

### Phase 4: Interactions
Implement user interactions: logging water, updating goals, state management.

### Phase 5: States & Feedback
Add loading, error, empty, and success states with appropriate feedback.

### Phase 6: Polish
Responsive design refinements, animations, edge cases, accessibility improvements.

---

## Tasks

### Task 1: Design Tokens and Base Types

**Phase:** Foundation

**Goal:** Establish design tokens (colors, spacing, typography) and TypeScript types for the Water Tracker app.

**Context:** All components will use these design tokens and types. This is the foundation that everything else builds on.

**Requirements:**
- Color tokens:
  - Primary: Deep blue (#1e40af) for progress fill
  - Success: Green (#10b981) for goal completion
  - Warning: Amber (#f59e0b) for low progress
  - Background: Light gray (#f9fafb)
  - Text: Dark gray (#111827)
  - Muted: Medium gray (#6b7280)
- Spacing scale: 4px base unit (4, 8, 12, 16, 24, 32, 48)
- Typography: System font stack, 16px base, weights: 400, 600, 700
- Border radius: 8px standard, 12px for buttons, 999px for circles

**Acceptance Criteria:**
- [ ] CSS variables defined in \`app/globals.css\`
- [ ] TypeScript types defined in \`lib/types.ts\`:
  - \`DailyProgress\` type with glasses, goal, date
  - \`AppState\` type with today and history
- [ ] Types support localStorage serialization
- [ ] All tokens follow workspace color system patterns

**Dependencies:**
- None (foundation task)

**Implementation Notes:**
- Use CSS variables for tokens (enables theming later)
- Types should be serializable for localStorage
- Follow existing workspace patterns for design tokens
- No component styling yet—just tokens and types

---

### Task 2: Progress Indicator Component

**Phase:** Core Components

**Goal:** Create a reusable progress indicator component that displays water intake progress with visual fill and color coding.

**Context:** This component shows users their daily water intake progress (e.g., "5 / 8 glasses"). It's the primary visual feedback on the home screen.

**Requirements:**
- Display format: "{current} / {goal}" with visual progress fill
- Dimensions: Full width on mobile (minus 16px padding), max-width 300px on desktop
- Color coding:
  - 0-50% progress: Amber (#f59e0b)
  - 50-99% progress: Light green (#34d399)
  - 100% progress: Success green (#10b981)
- Typography: Large numbers (min 24px), "glasses" label in smaller text (14px)
- Animation: Smooth fill transition (200ms) when progress updates

**Acceptance Criteria:**
- [ ] Component renders with correct format and dimensions
- [ ] Visual fill updates correctly based on progress percentage
- [ ] Color changes at correct thresholds (50%, 100%)
- [ ] Smooth animation when progress value changes
- [ ] Responsive: full width mobile, constrained desktop
- [ ] Accessible: proper ARIA labels for screen readers
- [ ] Follows workspace standards: mobile-first, TypeScript strict mode

**Dependencies:**
- Task 1: Foundation (design tokens and types)

**Implementation Notes:**
- Use shadcn/ui Progress component as base (or create custom)
- Extract colors from design tokens (Task 1)
- Use TypeScript types from Task 1 for progress data
- Follow mobile-first responsive pattern: \`w-full md:max-w-[300px]\`
- Ensure WCAG 2.1 AA contrast ratios for all colors

---

[Additional tasks...]
\`\`\`
`;

async function main() {
  const args = process.argv.slice(2);

  // Output the persona
  console.log(UX_TO_IMPLEMENTATION_PLAN_PERSONA);
  console.log('\n---\n');

  if (args.length === 0) {
    console.log('## Instructions\n');
    console.log('No UX spec path provided. Look for UX specs in `docs/prds/` (files ending in `-ux-spec.md`) and ask the user which one to transform using the AskUserQuestion tool.');
  } else {
    const specPath = args.join(' ');
    console.log('## Target UX Spec\n');
    console.log(`Transform the UX spec at: \`${specPath}\``);
    console.log('\n');
    console.log('## Instructions\n');
    console.log('1. Read the UX spec file');
    console.log('2. Create a high-level implementation plan with phases');
    console.log('3. Break down each phase into small, focused tasks');
    console.log('4. For each task, extract only the relevant context from the spec');
    console.log('5. Ensure each task is self-contained and can be implemented without the full spec');
    console.log('6. Write output to `{spec-basename}-implementation-plan.md` in the same directory');
    console.log('\n');
    console.log('**Key principles:**');
    console.log('- Tasks should be small (30-60 minute implementations)');
    console.log('- Each task should include just enough context to implement');
    console.log('- Extract exact values from spec (dimensions, colors, spacing)');
    console.log('- Mark dependencies clearly');
    console.log('- Include measurable acceptance criteria');
  }
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
