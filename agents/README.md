# Agents

AI agents with distinct perspectives, expertise, and capabilities. These agents can be invoked to review work, solve problems, or execute role-specific tasks.

## Available Agents

| Agent | Perspective | Best For |
|-------|-------------|----------|
| **Engineer** | Technical feasibility & architecture | Technical reviews, system design, debugging, implementation planning |
| **Designer** | User experience & visual design | UX reviews, user flows, accessibility, design system decisions |
| **Executive** | Strategic business & ROI | Business cases, prioritization, stakeholder alignment, go/no-go decisions |
| **User Researcher** | User needs & validation | User insights, research planning, assumption testing, Jobs-to-be-Done |

## How to Use

### In Cursor
Agents are available as Cursor rules. Reference them with `@` or ask them directly:
- "As the Engineer agent, review this PRD"
- "Designer, help me think through the mobile experience"
- "@engineer what are the technical risks here?"

### In Claude / Other Tools
Copy the agent definition and include it in your prompt:
```
[Paste agent definition]

Now, [your request]
```

### Invoking Multiple Agents
For comprehensive feedback, invoke multiple agents on the same problem:
```
Review this PRD from the perspectives of Engineer, Designer, and User Researcher agents.
```

## Agent Capabilities

Each agent can:

1. **Review** — Analyze PRDs, designs, code, or decisions from their perspective
2. **Advise** — Provide guidance on problems within their domain
3. **Create** — Generate artifacts (technical specs, user flows, research plans, etc.)
4. **Challenge** — Push back on assumptions and identify risks
5. **Collaborate** — Work through problems interactively

## When to Use Which Agent

| Situation | Agent(s) to Use |
|-----------|-----------------|
| PRD review | All four for comprehensive feedback |
| Technical architecture decision | Engineer |
| User flow design | Designer + User Researcher |
| Feature prioritization | Executive + User Researcher |
| Debugging a problem | Engineer |
| Accessibility review | Designer |
| Validating assumptions | User Researcher |
| Business case development | Executive |
| API design | Engineer |
| Onboarding flow | Designer + User Researcher |

## Customizing Agents

Feel free to modify agent definitions to match your team's needs:
- Add domain-specific expertise
- Adjust communication style
- Add new capabilities
- Create new agents for your context

## Files

- `engineer.md` — Engineering/Technical agent
- `designer.md` — Design/UX agent
- `executive.md` — Business/Strategy agent
- `user-researcher.md` — User Research agent

