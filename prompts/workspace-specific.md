# Workspace-Specific Prompts

Prompts tailored to this workspace's specific processes, workflows, and tools.

---

## Create a PRD

**Category:** Workspace-Specific

**When to use:** When starting a new feature or product and need to create a Product Requirements Document

**Context needed:** Feature idea, user needs, business goals

---

## Prompt

```
Create a PRD for [feature name] using the workspace PRD template.

**Feature Overview:**
[Brief description of what you're building]

**Key Information:**
- Problem/User Pain Points: [What problem does this solve?]
- Target Users: [Who is this for?]
- Business Goals: [Why are we building this?]
- Success Metrics: [How will we measure success?]
- Key Requirements: [Must-have features for MVP]
- Timeline: [Expected timeline or phases]

**Additional Context:**
[Any other relevant information - user research, competitive analysis, technical constraints, etc.]

Please create a complete PRD following the template structure in docs/prds/template-prd.md, filling in all sections with detailed, actionable content.
```

## Example Usage

**Input:**
```
Create a PRD for a task management feature using the workspace PRD template.

**Feature Overview:**
A feature that allows users to create, organize, and track tasks with filtering and status management.

**Key Information:**
- Problem/User Pain Points: Users need a way to track their work items and see what's pending vs completed
- Target Users: Individual contributors and small teams managing their work
- Business Goals: Increase user engagement and provide core productivity functionality
- Success Metrics: 70% of users create at least one task within first week, 50% daily active usage
- Key Requirements: Create/edit/delete tasks, mark complete, filter by status, persist in localStorage
- Timeline: 2 weeks for MVP

Please create a complete PRD following the template.
```

**Expected Output:**
A complete PRD document following the template structure with all sections filled in

---

## Initiate PRD Review

**Category:** Workspace-Specific

**When to use:** When you have a draft PRD and want to get comprehensive feedback from different perspectives

**Context needed:** PRD file path and which agents you want feedback from

---

## Prompt

```
Review the PRD at [prd-file-path] using the following agents:

**Agents to include:**
- [ ] Engineer (technical feasibility)
- [ ] Designer (UX and visual design)
- [ ] Executive (strategic business)
- [ ] User Researcher (user needs and validation)

**Instructions:**
For each selected agent, provide feedback from their perspective using the agent definition in agents/[agent-name].md. Structure the feedback according to their review structure.

**PRD to review:**
[Reference the PRD file]

**Additional context:**
[Any specific areas you want agents to focus on, or questions you have]
```

## Example Usage

**Input:**
```
Review the PRD at docs/prds/task-management-prd.md using the following agents:

**Agents to include:**
- [x] Engineer (technical feasibility)
- [x] Designer (UX and visual design)
- [ ] Executive (strategic business)
- [x] User Researcher (user needs and validation)

Please provide comprehensive feedback from each selected agent's perspective.

**PRD to review:**
```1:135:docs/prds/task-management-prd.md
[PRD content]
```

**Additional context:**
I'm particularly concerned about the technical complexity of real-time updates and want to make sure the UX flow is intuitive for first-time users.
```

**Expected Output:**
Structured feedback from each selected agent following their review structure

---

## Get Engineering Review of PRD

**Category:** Workspace-Specific

**When to use:** When you need technical feasibility feedback on a PRD

**Context needed:** PRD file path

---

## Prompt

```
As the Engineer agent (see agents/engineer.md), review the PRD at [prd-file-path].

Provide feedback structured as:
1. Technical Feasibility
2. Implementation Complexity
3. Key Challenges
4. Performance & Scalability
5. Security Considerations
6. Recommendations
7. Open Questions

**PRD to review:**
[Reference the PRD file]

**Focus areas:**
[Any specific technical concerns or areas to focus on]
```

## Example Usage

**Input:**
```
As the Engineer agent, review the PRD at docs/prds/task-management-prd.md.

**PRD to review:**
```1:135:docs/prds/task-management-prd.md
[PRD content]
```

**Focus areas:**
I'm particularly concerned about the localStorage persistence approach and whether it will scale for users with many tasks.
```

**Expected Output:**
Engineering review with technical feasibility, complexity estimates, challenges, and recommendations

---

## Get Design Review of PRD

**Category:** Workspace-Specific

**When to use:** When you need UX and design feedback on a PRD

**Context needed:** PRD file path

---

## Prompt

```
As the Designer agent (see agents/designer.md), review the PRD at [prd-file-path].

Provide feedback structured as:
1. User Experience Flow
2. Visual Design Requirements
3. Interaction Design
4. Accessibility & Inclusion
5. Mobile vs Desktop
6. Design System & Consistency
7. Design Recommendations
8. Open Questions

**PRD to review:**
[Reference the PRD file]

**Focus areas:**
[Any specific UX concerns or areas to focus on]
```

## Example Usage

**Input:**
```
As the Designer agent, review the PRD at docs/prds/task-management-prd.md.

**PRD to review:**
```1:135:docs/prds/task-management-prd.md
[PRD content]
```

**Focus areas:**
I want to ensure the task creation flow is intuitive and the mobile experience is well thought out.
```

**Expected Output:**
Design review with user flows, UI requirements, accessibility considerations, and design recommendations

---

## Get Executive Review of PRD

**Category:** Workspace-Specific

**When to use:** When you need strategic business feedback on a PRD

**Context needed:** PRD file path

---

## Prompt

```
As the Executive agent (see agents/executive.md), review the PRD at [prd-file-path].

Provide feedback structured as:
1. Strategic Alignment
2. Business Impact
3. Resource Requirements
4. Risks & Mitigation
5. Stakeholder Considerations
6. Recommendations
7. Open Questions

**PRD to review:**
[Reference the PRD file]

**Business context:**
[Any relevant business context, OKRs, company goals, etc.]
```

## Example Usage

**Input:**
```
As the Executive agent, review the PRD at docs/prds/task-management-prd.md.

**PRD to review:**
```1:135:docs/prds/task-management-prd.md
[PRD content]
```

**Business context:**
This feature aligns with our Q1 OKR to increase user engagement by 30%. We're prioritizing features that drive daily active usage.
```

**Expected Output:**
Executive review with strategic alignment, business impact assessment, resource requirements, and recommendations

---

## Get User Research Review of PRD

**Category:** Workspace-Specific

**When to use:** When you need user validation and research perspective on a PRD

**Context needed:** PRD file path and any existing user research

---

## Prompt

```
As the User Researcher agent (see agents/user-researcher.md), review the PRD at [prd-file-path].

Provide feedback structured as:
1. User Need Validation
2. User Segments & Personas
3. Usability & Adoption
4. User Experience Concerns
5. Success Metrics Validation
6. Research Gaps
7. Recommendations
8. Open Questions

**PRD to review:**
[Reference the PRD file]

**Existing research:**
[Any user research, interviews, surveys, or data that supports this feature]
```

## Example Usage

**Input:**
```
As the User Researcher agent, review the PRD at docs/prds/task-management-prd.md.

**PRD to review:**
```1:135:docs/prds/task-management-prd.md
[PRD content]
```

**Existing research:**
We conducted 5 user interviews where 4/5 users mentioned needing a way to track their work items. Common pain point: "I forget what I need to do" and "I can't see what's done vs pending."
```

**Expected Output:**
User research review with need validation, usability concerns, research gaps, and recommendations

---

## Update PRD Based on Review Feedback

**Category:** Workspace-Specific

**When to use:** When you have review feedback and need to update the PRD

**Context needed:** PRD file and review feedback

---

## Prompt

```
Update the PRD at [prd-file-path] based on the following review feedback:

**Review Feedback:**
[Paste or reference the review feedback]

**Update requirements:**
- Address all actionable feedback
- Maintain PRD structure and format
- Keep existing good content unless explicitly replacing it
- Add new sections or details as recommended
- Update status, timeline, or requirements as needed
- Resolve open questions where possible

**PRD to update:**
[Reference the PRD file]
```

## Example Usage

**Input:**
```
Update the PRD at docs/prds/task-management-prd.md based on the following review feedback:

**Review Feedback:**
- Engineering: Add technical requirements for localStorage size limits and data migration strategy
- Design: Specify mobile-first responsive design requirements and accessibility standards
- User Research: Add user quotes and validate the Jobs-to-be-Done framework

Please address all feedback while maintaining the PRD structure.
```

**Expected Output:**
Updated PRD with all feedback incorporated

---

## Create Research Documentation

**Category:** Workspace-Specific

**When to use:** When you need to document user research findings

**Context needed:** Research data, interviews, surveys, or findings

---

## Prompt

```
Create research documentation in docs/research/ for [research topic]:

**Research Type:** [User Interviews | Survey | Competitive Analysis | Usability Testing | etc.]

**Research Data:**
[Paste research findings, interview transcripts, survey results, etc.]

**Key Findings:**
[Main insights or findings to highlight]

**Requirements:**
- Follow workspace research documentation structure (see docs/research/README.md)
- Date the document (YYYY-MM-DD format)
- Include research methodology
- Tag by user segment or persona if applicable
- Make insights actionable and specific
- Link to source materials if available

**File naming:** Use format from docs/research/README.md (e.g., user-interview-2024-01-15.md)
```

## Example Usage

**Input:**
```
Create research documentation in docs/research/ for task management user needs:

**Research Type:** User Interviews

**Research Data:**
Conducted 5 interviews with target users. Key quotes:
- "I need a simple way to track what I need to do"
- "I forget tasks if I don't write them down"
- "I want to see what's done vs what's pending"

**Key Findings:**
- 4/5 users need task tracking
- Primary pain point: forgetting tasks
- Users prefer simple, visual interfaces
- Mobile access is important

Please create the documentation following workspace standards.
```

**Expected Output:**
Research documentation file following workspace structure and standards

---

## Create Prototype Documentation

**Category:** Workspace-Specific

**When to use:** When you need to document a design prototype or mockup

**Context needed:** Prototype details, design decisions, user testing plans

---

## Prompt

```
Create prototype documentation in docs/prototypes/ for [prototype name]:

**Prototype Details:**
- Purpose: [What are you prototyping?]
- Design Decisions: [Key design choices and rationale]
- User Testing Plan: [How will you test this?]
- Design Files: [Links to Figma, etc.]

**Requirements:**
- Follow workspace prototype documentation structure (see docs/prototypes/README.md)
- Include design rationale
- Document user testing results (if available)
- Link to design files
- Include accessibility considerations
- Version control design decisions

**File naming:** Use format from docs/prototypes/README.md (e.g., prototype-01-task-management.md)
```

## Example Usage

**Input:**
```
Create prototype documentation in docs/prototypes/ for task management feature:

**Prototype Details:**
- Purpose: Prototype the task creation and list view flow
- Design Decisions: Using card-based layout, bottom sheet for mobile task creation, shadcn/ui components
- User Testing Plan: Test with 5 users, focus on task creation flow and mobile experience
- Design Files: https://figma.com/file/xyz

Please create the documentation following workspace standards.
```

**Expected Output:**
Prototype documentation file following workspace structure and standards

