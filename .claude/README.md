# Claude Code Integration

This directory contains Claude Code configuration, skills, and hooks for enhanced development workflows.

## Quick Start

**New here?** → See [QUICKSTART.md](QUICKSTART.md) for a 5-minute getting started guide.

## Directory Structure

```
.claude/
├── claude.json          # Claude Code configuration
├── QUICKSTART.md        # 5-minute getting started guide
├── agents/              # Conversational agents (persona wrappers)
│   ├── engineer.js      # Technical/architecture agent
│   ├── designer.js      # UX/design agent
│   └── pm.js            # Product management agent
├── skills/              # Functional skills (tasks and actions)
│   ├── engineer-review.js        # Engineer file review
│   ├── designer-review.js        # Designer file review
│   ├── designer-brand-identity.js # Designer: Brand tokens & styling
│   ├── designer-prd-to-ux.js     # Designer: Translate PRDs to UX specs
│   ├── pm-generate-prd.js        # PM: Generate PRDs from ideas
│   ├── pm-clarify-prd.js         # PM: Refine PRDs through questioning
│   ├── prd-review.js             # Multi-perspective PRD review
│   ├── collab.js                 # Multi-agent collaboration
│   └── ux-to-implementation-plan.js  # Utility: Generate implementation plan
└── hooks/               # Event hooks
    └── quality-gate.sh  # Pre-commit quality enforcement
```

## Agents vs Skills

This directory contains two types of commands:

- **Agents** (`.claude/agents/`) - Conversational persona wrappers. These load an agent persona for interactive questions.
- **Skills** (`.claude/skills/`) - Functional tasks. These perform specific actions like reviewing files or initializing projects.

## Agents (Conversational)

Agents are simple persona loaders for interactive conversations. Invoke these to ask questions or get advice:

#### Engineer (`/engineer`)

Get technical guidance, debug issues, or discuss architecture.

**Usage:**
```bash
/engineer "How should I structure authentication for this Next.js app?"
/engineer "Debug this error: Cannot read property of undefined"
/engineer "Should I use PostgreSQL or MongoDB for user data?"
```

#### Designer (`/designer`)

Get UX guidance, design decisions, or accessibility advice.

**Usage:**
```bash
/designer "How should the mobile navigation work?"
/designer "What's the best way to show loading states in a form?"
/designer "Should this be a modal or a slide-over panel?"
```

#### PM (`/pm`)

Get product strategy, prioritization, and problem framing guidance.

**Usage:**
```bash
/pm "What's the MVP for user notifications?"
/pm "How should we prioritize these 5 features?"
/pm "What problem are we actually solving here?"
```

#### Collab (`/collab`)

Get all three perspectives (Engineer + Designer + PM) with synthesis.

**Usage:**
```bash
/collab "Should we use modals or slide-overs for settings?"
/collab "How should we implement real-time dashboard updates?"
```

**What it does:**
- Runs engineer, designer, and PM agents in parallel
- Shows all three perspectives
- Asks Claude to synthesize into one recommendation

## Skills (Functional Tasks)

Skills perform specific actions and tasks. They have logic beyond just loading a persona:

#### Engineer Review (`/engineer-review`)

Review a file from an engineering perspective.

**Usage:**
```bash
/engineer-review docs/prds/my-feature.md
```

**What it reviews:**
- Technical feasibility and blockers
- Implementation complexity and LOE
- Performance and scalability
- Security considerations
- Technical risks and recommendations

#### Designer Review (`/designer-review`)

Review a file from a design perspective.

**Usage:**
```bash
/designer-review docs/prds/my-feature.md
```

**What it reviews:**
- User experience flows
- Visual design requirements
- Accessibility (WCAG 2.1 AA)
- Mobile-first responsive patterns
- Interaction patterns and error states

#### Designer: Brand Identity (`/designer-brand-identity`)

Apply brand consistency across UI components, styling, and copywriting (Designer skill).

**Usage:**
```bash
/designer-brand-identity "What colors should I use for the primary button?"
/designer-brand-identity "Generate a login form component following brand guidelines"
/designer-brand-identity "Write error messages for form validation"
```

**What it does:**
- Reads brand tokens from `skills/brand-identity/resources/`
- Applies design tokens (colors, fonts, spacing) to shadcn/ui components
- Ensures voice & tone consistency in copywriting

#### PRD Review (`/prd-review`)

Comprehensive file review from all four perspectives.

**Usage:**
```bash
/prd-review docs/prds/my-feature.md
```

**What it includes:**
- Engineering: Technical feasibility and implementation
- Design: UX flows and accessibility
- Executive: Business value and strategy
- User Research: User needs and validation

### PRD Workflow Skills

These skills form a pipeline for turning ideas into buildable specifications:

```
Rough idea → /pm-generate-prd → /pm-clarify-prd → /designer-prd-to-ux → /ux-to-implementation-plan → Build
```

#### PM: Generate PRD (`/pm-generate-prd`)

Convert rough MVP ideas into structured PRDs (PM skill).

**Usage:**
```bash
/pm-generate-prd "An app that helps users track their daily water intake"
/pm-generate-prd "A dashboard for monitoring API usage metrics"
```

**What it does:**
- Takes a rough idea or description
- Generates a complete 8-section PRD
- Labels assumptions clearly
- Optimizes for demo-grade clarity

#### PM: Clarify PRD (`/pm-clarify-prd`)

Refine and clarify PRDs through structured questioning (PM skill).

**Usage:**
```bash
/pm-clarify-prd docs/prds/my-feature.md
```

**What it does:**
- Reads an existing PRD
- Asks clarifying questions (5-35 based on depth preference)
- Creates a tracking document with Q&A
- Identifies and resolves ambiguities

#### Designer: PRD to UX (`/designer-prd-to-ux`)

Translate PRDs into UX specifications using a 6-pass framework (Designer skill).

**Usage:**
```bash
/designer-prd-to-ux docs/prds/my-feature.md
```

**What it does (6 passes):**
1. Mental Model - User intent alignment
2. Information Architecture - Concept groupings
3. Affordances - Visual/interaction signals
4. Cognitive Load - Friction reduction
5. State Design - All UI states
6. Flow Integrity - Risk and visibility decisions

**Output:** `{prd-basename}-ux-spec.md`

#### UX to Implementation Plan (`/ux-to-implementation-plan`)

Transform UX specs into structured implementation plans with small, context-efficient chunks (Utility skill).

**Usage:**
```bash
/ux-to-implementation-plan docs/prds/my-feature-ux-spec.md
```

**What it does:**
- Creates a high-level implementation plan with phases
- Breaks down into small, focused tasks (30-60 minute implementations)
- Extracts only relevant context for each task
- Ensures each task is self-contained and implementable without full spec

**Output:** `{ux-basename}-implementation-plan.md`

**Why this approach:**
- Tasks are small enough for agents to implement without overwhelming context
- Each task includes just enough information to implement
- Clear dependencies and acceptance criteria
- Can be worked on incrementally

## Hooks

Hooks are scripts that run automatically in response to events.

### Pre-commit Quality Gate

The `quality-gate.sh` hook runs before every git commit to enforce quality standards:

1. **ESLint** - Ensures code quality
2. **TypeScript** - Type checking
3. **Mobile-first validation** - Warns about desktop-first patterns in UI files

**Configuration:**

The hook is referenced in `claude.json`:
```json
{
  "hooks": {
    "pre-commit": "./hooks/quality-gate.sh"
  }
}
```

To bypass the hook temporarily (not recommended):
```bash
git commit --no-verify -m "message"
```

## Configuration

The `claude.json` file configures Claude Code behavior:

```json
{
  "skills": {
    "engineer-review": {
      "path": "./skills/engineer-review.js",
      "description": "Technical feasibility and architecture review"
    }
  },
  "hooks": {
    "pre-commit": "./hooks/quality-gate.sh"
  },
  "settings": {
    "autoLoadAgents": true,
    "mobileFirstEnforcement": true
  }
}
```

## Creating Custom Agents and Skills

### Creating a New Agent

To create a new conversational agent:

1. Create a new JavaScript file in `agents/`:
   ```javascript
   #!/usr/bin/env node

   const PERSONA = `Your agent persona definition here`;
   const userRequest = process.argv.slice(2).join(' ');

   console.log(PERSONA);
   console.log('\n---\n');
   console.log('## User Request\n');
   console.log(userRequest);
   ```

2. Make it executable:
   ```bash
   chmod +x .claude/agents/your-agent.js
   ```

3. Add it to `claude.json`:
   ```json
   {
     "agents": {
       "your-agent": {
         "path": "./agents/your-agent.js",
         "description": "What your agent does"
       }
     }
   }
   ```

4. Invoke with `/your-agent "question"`

### Creating a New Skill

To create a new functional skill:

1. Create a new JavaScript file in `skills/`:
   ```javascript
   #!/usr/bin/env node

   // Your skill logic here
   ```

2. Make it executable:
   ```bash
   chmod +x .claude/skills/your-skill.js
   ```

3. Register it in the `skills` section of `claude.json`:
   ```json
   {
     "skills": {
       "your-skill": {
         "path": "./skills/your-skill.js",
         "description": "What your skill does"
       }
     }
   }
   ```

4. Invoke with `/your-skill`

## Best Practices

### Agents
- Keep agents simple - they just load personas
- Focus on communication style and expertise
- Don't add complex logic - use skills for that

### Skills
- Keep skills focused on a single purpose
- Provide clear error messages
- Include usage examples in comments
- Make skills composable when possible

### Hooks
- Keep hooks fast (< 10 seconds)
- Provide clear output about what's being checked
- Use color coding for readability
- Allow bypassing for emergency situations

### Configuration
- Document all settings in this README
- Version control all configuration
- Keep sensitive data out of config files

