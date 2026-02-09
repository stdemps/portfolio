# Architecture Prompts

Prompts for system design, architectural decisions, and technical planning.

---

## Design a Feature Architecture

**Category:** Architecture

**When to use:** When planning a new feature and need to design its architecture

**Context needed:** Feature requirements and existing codebase structure

---

## Prompt

```
Design the architecture for [feature name] with the following requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

**Considerations:**
- Follow Next.js App Router patterns
- Use React Server Components where appropriate
- Consider state management needs
- Plan for scalability
- Ensure maintainability
- Follow workspace file structure conventions
- Consider mobile responsiveness
- Plan for accessibility

**Existing codebase context:**
[Describe relevant existing patterns, components, or utilities]

**Deliverables:**
- File structure (what files/components are needed)
- Component hierarchy
- Data flow
- State management approach
- API design (if needed)
- Any architectural decisions and rationale
```

## Example Usage

**Input:**
```
Design the architecture for a task management feature with:
- Users can create, edit, delete, and complete tasks
- Tasks persist in localStorage (client-side)
- Tasks are displayed in a list with filtering
- Tasks can be organized by status

Consider Next.js App Router, React patterns, and workspace conventions.

Existing codebase uses shadcn/ui components and follows the component structure guidelines.
```

**Expected Output:**
Complete architectural design with file structure, component hierarchy, and implementation plan

---

## Evaluate Technical Approach

**Category:** Architecture

**When to use:** When you need to evaluate different technical approaches for a problem

**Context needed:** Problem description and context

---

## Prompt

```
Evaluate different technical approaches for [problem/feature]:

**Problem/Feature:**
[Describe what you're trying to solve or build]

**Context:**
- Current tech stack: [Next.js, React, TypeScript, etc.]
- Constraints: [Any technical constraints]
- Requirements: [Key requirements]

**Please evaluate:**
- Approach 1: [First approach]
- Approach 2: [Second approach]
- Approach 3: [Third approach, if applicable]

**Evaluation criteria:**
- Performance
- Maintainability
- Scalability
- Developer experience
- Alignment with workspace standards
- Implementation complexity
- Long-term viability

**Recommendation:**
Provide a recommendation with rationale.
```

## Example Usage

**Input:**
```
Evaluate different technical approaches for state management in a task management feature:

**Problem/Feature:**
Need to manage task state across multiple components (task list, task form, task filters)

**Context:**
- Current tech stack: Next.js 14 App Router, React, TypeScript
- Constraints: Client-side only, no backend
- Requirements: Tasks persist in localStorage, real-time updates across components

**Please evaluate:**
- Approach 1: React Context API
- Approach 2: Zustand
- Approach 3: Local component state with prop drilling

Evaluate based on performance, maintainability, scalability, and alignment with workspace standards.
```

**Expected Output:**
Evaluation of each approach with pros/cons and a recommendation

---

## Plan Migration or Refactor

**Category:** Architecture

**When to use:** When planning a large-scale refactor or migration

**Context needed:** Current state and target state

---

## Prompt

```
Plan a migration/refactor from [current state] to [target state]:

**Current state:**
[Describe current implementation, patterns, or structure]

**Target state:**
[Describe desired implementation, patterns, or structure]

**Requirements:**
- Minimize breaking changes
- Maintain backward compatibility where possible
- Plan for gradual migration if needed
- Ensure no functionality is lost
- Follow workspace standards in new implementation
- Plan for testing and validation

**Deliverables:**
- Migration strategy (big bang vs. gradual)
- Step-by-step migration plan
- Risk assessment
- Testing strategy
- Rollback plan
- Timeline estimate
```

## Example Usage

**Input:**
```
Plan a migration from Pages Router to App Router for this Next.js application:

**Current state:**
- Using Pages Router with pages/ directory
- API routes in pages/api/
- getServerSideProps for data fetching
- Custom _app.tsx and _document.tsx

**Target state:**
- App Router with app/ directory
- API routes in app/api/
- React Server Components for data fetching
- New layout structure

Plan a gradual migration that minimizes breaking changes.
```

**Expected Output:**
Complete migration plan with strategy, steps, risks, and timeline

---

## Design API Structure

**Category:** Architecture

**When to use:** When designing API routes and data structures

**Context needed:** Feature requirements and data model

---

## Prompt

```
Design the API structure for [feature/system]:

**Requirements:**
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

**Data model:**
[Describe the data entities and relationships]

**Considerations:**
- RESTful principles
- Error handling patterns
- Request/response formats
- Authentication/authorization
- Rate limiting
- Validation
- Follow Next.js API route patterns
- TypeScript types for all requests/responses

**Deliverables:**
- API endpoint structure (routes, methods)
- Request/response schemas
- Error response format
- TypeScript type definitions
- Validation rules
- Example requests and responses
```

## Example Usage

**Input:**
```
Design the API structure for a task management system:

**Requirements:**
- Create, read, update, delete tasks
- Filter tasks by status
- Search tasks by title/description
- Pagination for large lists

**Data model:**
- Task: { id: string, title: string, description?: string, status: 'pending' | 'completed', createdAt: Date, updatedAt: Date }

**Considerations:**
- RESTful design
- Proper error handling
- TypeScript types
- Input validation

Design the complete API structure.
```

**Expected Output:**
Complete API design with routes, schemas, types, and examples

