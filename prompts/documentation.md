# Documentation Prompts

Prompts for creating and improving code documentation, README files, and explanations.

---

## Document a Component

**Category:** Documentation

**When to use:** When you need to add comprehensive documentation to a component

**Context needed:** Component file

---

## Prompt

```
Add comprehensive documentation to [ComponentName] in [file-path]:

**Documentation requirements:**
- JSDoc comments for the component
- Document all props with types and descriptions
- Document component behavior and usage
- Include usage examples
- Document accessibility features
- Document any special considerations or edge cases
- Follow workspace documentation standards

**Component details:**
[Brief description of component purpose]

Component code:
[Reference the component file]
```

## Example Usage

**Input:**
```
Add comprehensive documentation to TaskCard component in components/task-card.tsx.

**Documentation requirements:**
- JSDoc for the component
- Document task, onComplete, and onDelete props
- Include usage example
- Document accessibility features (keyboard navigation, ARIA labels)

**Component details:**
Displays a task with title, description, and actions (complete/delete)

Component code:
```1:40:components/task-card.tsx
[component code]
```
```

**Expected Output:**
Component with comprehensive JSDoc documentation

---

## Update README

**Category:** Documentation

**When to use:** When you need to update project README with new features or information

**Context needed:** Current README and what needs to be added/updated

---

## Prompt

```
Update the README.md file to include:

**Additions/Updates:**
- [What to add or update, e.g., new feature documentation, setup instructions, etc.]

**Requirements:**
- Keep existing content unless explicitly replacing it
- Follow markdown best practices
- Include code examples where appropriate
- Keep it clear and concise
- Update table of contents if applicable

Current README:
[Reference the README file]
```

## Example Usage

**Input:**
```
Update the README.md file to include:
- Documentation for the new task management feature
- Updated setup instructions for the new dependencies
- Examples of using the TaskCard and TaskList components

Keep existing content and add these as new sections.
```

**Expected Output:**
Updated README with new content integrated appropriately

---

## Create API Documentation

**Category:** Documentation

**When to use:** When you need to document API routes

**Context needed:** API route files

---

## Prompt

```
Create API documentation for [route-path] in [documentation-file-path]:

**Documentation requirements:**
- Document all endpoints (GET, POST, PUT, DELETE)
- Document request formats (body, query params, headers)
- Document response formats (success and error responses)
- Include example requests and responses
- Document authentication requirements (if any)
- Document rate limiting (if any)
- Document error codes and meanings

**API details:**
[Brief description of API functionality]

API route code:
[Reference the route file(s)]
```

## Example Usage

**Input:**
```
Create API documentation for app/api/tasks/route.ts in docs/api/tasks.md.

**Documentation requirements:**
- Document GET /api/tasks (list all tasks)
- Document POST /api/tasks (create task)
- Include request/response examples
- Document validation rules
- Document error responses

**API details:**
Task management API for creating and retrieving tasks

API route code:
```1:50:app/api/tasks/route.ts
[route code]
```
```

**Expected Output:**
Complete API documentation file

---

## Explain Complex Code

**Category:** Documentation

**When to use:** When you need to understand or document complex logic

**Context needed:** The complex code file

---

## Prompt

```
Explain the code in [file-path], specifically [function/component/section]:

**Explanation requirements:**
- Explain what the code does
- Explain how it works (step by step)
- Explain why certain patterns or approaches were used
- Identify any potential issues or improvements
- Suggest documentation improvements if needed

**Code to explain:**
[Reference the specific code section]
```

## Example Usage

**Input:**
```
Explain the code in lib/utils/task-utils.ts, specifically the parseTask function:

**Explanation requirements:**
- Explain what it does
- Explain the parsing logic step by step
- Explain why it handles edge cases the way it does
- Suggest improvements if any

**Code to explain:**
```10:35:lib/utils/task-utils.ts
export function parseTask(data: unknown): Task {
  // complex parsing logic
}
```
```

**Expected Output:**
Clear explanation of the code with step-by-step breakdown

