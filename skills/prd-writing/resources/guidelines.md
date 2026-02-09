# PRD Writing Guidelines

## Philosophy

**Goal:** Decision clarity, not enterprise ceremony.

A builder should be able to read the PRD and build without guessing.

## Section-by-Section Guidelines

### 1. What are we building?

**DO:**
- Write a sharp, concise description
- Be specific about core functionality
- Keep to one paragraph

**DON'T:**
- Include architecture or tech stack
- List every feature
- Be vague or aspirational

### 2. Why are we building it?

**DO:**
- Start with problem statement: "[User] struggles to [X] because [Y], resulting in [Z]"
- List 2-3 concrete pain points
- Focus on demo goals

**DON'T:**
- Use enterprise metrics (CAC, LTV, etc.) for demos
- Be generic ("improve user experience")
- Skip the problem statement

### 3. Who are we building it for?

**DO:**
- Define ONE primary user role
- Include: Role/context, skill level, key constraint
- Keep it actionable

**DON'T:**
- Write demographic personas ("Sarah, 32, lives in...")
- List multiple equal-priority users
- Be too abstract

### 4. How will we measure success?

**DO:**
- Focus on observable outcomes for demos
- Include failure criteria
- Be specific and measurable

**DON'T:**
- Use KPIs for MVP/demos (save for production)
- Set unrealistic targets
- Skip failure criteria

### 5. What are the key requirements?

**DO:**
- Ruthlessly prioritize Must-Have
- Define the single happy path
- Include minimum viable error handling

**DON'T:**
- Put Nice-to-Haves in Must-Have
- Over-engineer error handling
- Skip entry points

### 6. What are the risks and unknowns?

**DO:**
- Be honest about technical, UX, and execution risks
- Include "How to resolve" for each
- Capture genuine unknowns

**DON'T:**
- Skip this section
- Be overly optimistic
- Leave unknowns unaddressed

### 7. What's the timeline?

**DO:**
- Keep phases simple (Build → Test → Demo)
- List hard dependencies only
- Be realistic

**DON'T:**
- Create elaborate Gantt charts
- Add soft dependencies
- Promise specific dates for demos

### 8. Open Questions

**DO:**
- Capture anything still unclear
- These become clarification candidates
- Keep updating as questions arise

**DON'T:**
- Leave this empty
- Include questions you can answer yourself
- Forget to revisit and resolve

## Handling Vague Input

When the user provides vague ideas:

1. **Make reasonable assumptions** - Don't ask endless questions
2. **Label assumptions clearly** - Use `[Assumption: ...]`
3. **Optimize for believable demo** - Not production scale
4. **Ask ONE clarifying question max** - Then proceed

## Demo-Grade vs Enterprise

| Aspect | Demo-Grade | Enterprise |
|--------|------------|------------|
| Success metrics | Observable outcomes | KPIs, dashboards |
| Error handling | Minimum viable | Comprehensive |
| Timeline | Build → Test → Demo | Discovery → Design → Dev → QA → Launch |
| Users | Primary user only | Full persona research |
| Risks | Technical & UX | Business, legal, compliance |

## Anti-Patterns to Avoid

- **Kitchen sink PRD** - Everything including the kitchen sink
- **Vaporware PRD** - No concrete requirements, all vision
- **Novel PRD** - 20+ pages no one will read
- **Copy-paste PRD** - Template brackets left in place
- **No-decision PRD** - Everything is "TBD"
