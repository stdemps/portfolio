# Quick Start: Using Claude Agents & Skills

**Get started with the workspace agent system in 5 minutes.**

---

## What You Get

This workspace includes:
- **3 Conversational Agents**: Engineer, Designer, PM
- **3 Designer Skills**: Brand identity, PRD-to-UX, file review
- **2 PM Skills**: Generate PRD, clarify PRD
- **1 Engineer Skill**: File review
- **2 Utility Skills**: PRD review (multi-perspective), UX-to-implementation-plan
- **1 Collaboration Skill**: Multi-agent synthesis (get all 3 perspectives at once)
- **Quality Gate Hook**: Pre-commit checks for TypeScript, ESLint, mobile-first patterns

---

## 5-Minute Setup

### 1. Test Agent Invocation

The agents are registered as skills, so you can invoke them using `/` commands:

```bash
# Test the engineer agent
/engineer "What's the best way to handle authentication in Next.js?"

# Test the designer agent
/designer "How should I structure a multi-step form?"

# Test the PM agent
/pm "What's the MVP for a user dashboard?"
```

### 2. Try Multi-Agent Collaboration

Get all three perspectives at once:

```bash
/collab "Should I use optimistic updates for the todo list?"
```

This will:
1. Run Engineer, Designer, and PM agents in parallel
2. Show all three perspectives
3. Ask Claude to synthesize them into a cohesive recommendation

### 3. Review a File

Use the review skills for file-specific analysis:

```bash
# Engineering perspective (architecture, complexity, risks)
/engineer-review components/dashboard.tsx

# Design perspective (UX, accessibility, responsive)
/designer-review components/signup-form.tsx

# Comprehensive review (all perspectives)
/prd-review docs/prds/user-auth.md
```

---

## Common Workflows

### Planning a New Feature

**Recommended approach:**
```bash
# 1. Frame the problem with PM
/pm "We need a way for users to share their projects. What's the MVP?"

# 2. Get design perspective
/designer "How should project sharing work from a UX perspective?"

# 3. Get technical feasibility
/engineer "What's the architecture for project sharing with permissions?"

# 4. Or get all at once
/collab "How should we implement project sharing?"
```

### Debugging an Issue

```bash
# Ask engineer with full error context
/engineer "Debug this error: [paste full stack trace and context]"
```

### Making a Design Decision

```bash
# Ask designer for UX guidance
/designer "Should I use a modal or slide-over for settings?"

# Or get multiple perspectives
/collab "Modal vs slide-over for settings panel?"
```

### Prioritizing Features

```bash
# Ask PM for prioritization help
/pm "I have 5 features to build: [list features]. How should I prioritize?"
```

### Reviewing Code Before PR

```bash
# Get engineering review
/engineer-review src/services/api.ts

# Get design review for UI components
/designer-review components/profile-card.tsx
```

### Building a Feature from Scratch (PRD Workflow)

The complete idea-to-build pipeline using agent-specific skills:

```bash
# 1. PM generates a PRD from your rough idea
/pm-generate-prd "A dashboard for monitoring API usage metrics"

# 2. PM clarifies the PRD through structured questioning
/pm-clarify-prd docs/prds/api-dashboard.md

# 3. Designer translates the PRD into UX specifications
/designer-prd-to-ux docs/prds/api-dashboard.md

# 4. Utility generates implementation plan with small, context-efficient chunks
/ux-to-implementation-plan docs/prds/api-dashboard-ux-spec.md
```

### Applying Brand Consistency (Designer Skill)

```bash
# Get brand-specific colors and styling
/designer-brand-identity "What colors should I use for the primary button?"

# Generate brand-consistent components
/designer-brand-identity "Create a login form following brand guidelines"

# Write copy that matches brand voice
/designer-brand-identity "Write error messages for form validation"
```

---

## Quality Gate Hook

The pre-commit hook runs automatically before every commit and checks:
1. **ESLint** - Code linting standards
2. **Mobile-first patterns** - Responsive design conventions
3. **TypeScript** - Type checking with `tsc --noEmit`

### Prototype Mode (Bypass Hook)

During rapid prototyping or A/B testing, you can run checks without blocking commits:

```bash
# Enable prototype mode for one commit
CLAUDE_PROTOTYPE_MODE=true git commit -m "Add feature prototype"

# Checks still run but won't fail the commit
# You'll see warnings instead of errors
```

**When to use prototype mode:**
- A/B testing experiments
- Rapid prototyping
- Quick demos
- Learning/exploration

**When NOT to use prototype mode:**
- Production code
- PR submissions
- Shared branches

---

## Agent Personas

### 👨‍💻 Engineer
- **Focus**: Technical architecture, scalability, performance, implementation
- **Best for**: System design, debugging, technology choices, technical trade-offs
- **Philosophy**: "Good enough to ship" beats "perfect but never ships"

### 🎨 Designer
- **Focus**: User experience, accessibility, visual design, interaction patterns
- **Best for**: User flows, component design, responsive patterns, accessibility
- **Philosophy**: "User needs first" — Design for real users, not edge cases

### 📊 PM
- **Focus**: Problem framing, prioritization, metrics, user value
- **Best for**: Feature scoping, prioritization, success metrics, trade-off analysis
- **Philosophy**: "Ship fast, learn faster" — Perfect is the enemy of shipped

---

## Troubleshooting

### Problem: `/engineer` says "Unknown skill"

**Fix**: The agents should be registered in `.claude/claude.json` under `"skills"`. Check that the file contains:

```json
{
  "skills": {
    "engineer": {
      "path": "./agents/engineer.js",
      "description": "💬 Conversational: Ask technical questions..."
    }
  }
}
```

### Problem: Quality gate fails on TypeScript errors

**Fix Option 1**: Fix the TypeScript errors (recommended)

**Fix Option 2**: Use prototype mode during rapid development:
```bash
CLAUDE_PROTOTYPE_MODE=true git commit -m "WIP: Feature prototype"
```

### Problem: Agent script isn't executable

**Fix**: Make the script executable:
```bash
chmod +x .claude/agents/engineer.js
chmod +x .claude/agents/designer.js
chmod +x .claude/agents/pm.js
```

### Problem: Mobile-first warnings in quality gate

**Fix**: Review the flagged files and ensure responsive patterns follow mobile-first approach:

```tsx
// ❌ Desktop-first (will trigger warning)
<div className="lg:w-1/2">

// ✅ Mobile-first (correct)
<div className="w-full lg:w-1/2">
```

---

## Tips for Better Results

### 1. Be Specific with Context

**Instead of:**
```bash
/engineer "How do I fix this error?"
```

**Do this:**
```bash
/engineer "Debug this error:
Error: Cannot read property 'user' of undefined
Location: src/components/profile.tsx:45
Context: Occurs after login when navigating to /profile
Stack trace: [paste full trace]"
```

### 2. Ask for Trade-offs

**Instead of:**
```bash
/engineer "Should I use PostgreSQL or MongoDB?"
```

**Do this:**
```bash
/engineer "Should I use PostgreSQL or MongoDB for user data?
Context: 10K users, need ACID transactions for billing, mostly relational queries
What are the trade-offs?"
```

### 3. Use Collab for Complex Decisions

When a decision has UX, technical, AND product implications:

```bash
/collab "Should we implement real-time updates or polling for the dashboard?
Context: 1000 active users, updates every 5-30 seconds, want to minimize server load"
```

### 4. Review Files Before Sharing

Before creating a PR or sharing code:

```bash
# Quick engineering check
/engineer-review src/services/auth.ts

# Full multi-perspective review
/prd-review docs/prds/new-feature.md
```

---

## Next Steps

1. **Try the agents**: Run `/engineer "your question"` right now
2. **Review a file**: Use `/engineer-review` on an existing file
3. **Plan a feature**: Use `/collab` for your next feature planning
4. **Read the README**: See `.claude/README.md` for full documentation

---

**Questions?** Check the main README or ask:
```bash
/pm "How should I use these agents effectively?"
```
