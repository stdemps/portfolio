# Development Prompts

Prompts for code generation, feature implementation, and development tasks.

---

## Create a New Component

**Category:** Development

**When to use:** When you need to create a new React component following workspace standards

**Context needed:** Component name, purpose, and any specific requirements

---

## Prompt

```
Create a new [ComponentName] component in [file-path]. The component should:
- Follow TypeScript strict mode and workspace standards
- Use shadcn/ui components where appropriate
- Be fully accessible (WCAG 2.1 AA compliant)
- Be mobile responsive (mobile-first approach)
- Follow the component structure guidelines (imports, types, hooks, effects, handlers, render)
- Use Tailwind CSS for styling
- Include proper TypeScript types for props

[Add specific requirements here, e.g.:
- Accept props: [prop1: type, prop2: type]
- Display [specific content/functionality]
- Handle [specific interactions]
- Use [specific shadcn/ui components]
]

For forms, also specify:
- Validation timing: onBlur, onChange, or onSubmit
- Error display: inline below field, toast, or modal
- Loading states: button disabled, spinner, text change
- Success states: message, redirect, form reset
```

## Example Usage

**Input:**
```
Create a new TaskCard component in components/task-card.tsx. The component should:
- Accept props: task: Task, onComplete: (id: string) => void, onDelete: (id: string) => void
- Display task title, description, and status
- Show a checkbox for completion and a delete button
- Use the Card component from shadcn/ui
- Be fully accessible and mobile responsive
```

**Expected Output:**
A complete, production-ready component following all workspace standards

---

## Create a Form Component

**Category:** Development

**When to use:** When creating forms with validation, error handling, and user feedback

**Context needed:** Form fields, validation requirements, submission behavior, and UX patterns

---

## Prompt

```
Create a [FormName] component in [file-path] with the following requirements:

Fields:
- [Field 1]: [type, required/optional]
- [Field 2]: [type, required/optional]
- [Additional fields...]

Validation:
- Trigger on blur (when user leaves input field)
- Show error immediately below the field
- Use aria-describedby to link error to input
- Set aria-invalid='true' on invalid inputs
- Clear error when field becomes valid
- Validate all fields on submit before allowing submission

UX Patterns:
- Loading: Disable submit button, show "[Action]..." text
- Success: Show success message, [redirect/reset form/other]
- Errors: Inline below field with icon (use AlertCircle from lucide-react)
- Form reset: [specify behavior after success]

Components:
- Use [Card, CardHeader, CardTitle, CardContent] from shadcn/ui
- Use Input, Label, Button from shadcn/ui
- Use AlertCircle icon from lucide-react for errors

Accessibility:
- All inputs have associated labels (use htmlFor)
- Errors announced to screen readers via aria-describedby
- Keyboard navigation works properly
- Focus management on errors

Responsive:
- Mobile-first: p-4, gap-4
- Tablet: md:p-6, md:gap-5
- Desktop: lg:p-8, lg:gap-6

Before implementing, confirm this approach matches your understanding.
```

## Example Usage

**Input:**
```
Create a SignupForm component in components/signup-form.tsx with:

Fields:
- Email: type="email", required
- Password: type="password", required
- Confirm Password: type="password", required

Validation on blur, errors inline below fields, loading state on submit, success message after submission.
```

**Expected Output:**
A complete form component with proper validation timing, error handling, accessibility, and responsive design

---

## Request Approach Review Before Implementation

**Category:** Development

**When to use:** Before implementing complex features to ensure the approach matches your preferences

**Context needed:** What you're building and any specific UX or technical preferences

---

## Prompt

```
Before implementing [feature/component], describe your approach:

1. What validation timing will you use? (onBlur, onChange, onSubmit)
2. How will errors be displayed? (inline below field, toast, modal)
3. What accessibility features will you include? (ARIA labels, keyboard navigation, screen reader support)
4. What responsive breakpoints will you use? (mobile-first patterns)
5. How will loading states be handled? (button disabled, spinner, text change)
6. What will happen on success? (message, redirect, form reset)
7. How will errors be handled? (network errors, validation errors, edge cases)

Once confirmed, proceed with implementation.
```

## Example Usage

**Input:**
```
Before implementing the login form, describe your approach:
1. Validation timing?
2. Error display method?
3. Accessibility features?
4. Loading state handling?
5. Success behavior?
```

**Expected Output:**
A detailed description of the implementation approach, allowing you to confirm or adjust before coding begins

---

## Implement a Feature

**Category:** Development

**When to use:** When implementing a new feature that requires multiple files or components

**Context needed:** Feature description, requirements, and any existing related code

---

## Prompt

```
Implement [feature name] with the following requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Follow workspace standards:
- TypeScript strict mode
- Mobile-first responsive design
- WCAG 2.1 AA accessibility
- Use shadcn/ui components
- Follow file naming conventions (kebab-case)
- Include proper error handling
- Add loading states where appropriate

[Add any specific technical requirements or constraints]
```

## Example Usage

**Input:**
```
Implement a task management feature with the following requirements:
- Users can create, edit, and delete tasks
- Tasks have title, description, and status (pending/completed)
- Tasks are stored in localStorage
- Use a dialog for task creation/editing
- Show tasks in a responsive grid layout
- Include empty state when no tasks exist
```

**Expected Output:**
Complete feature implementation with all necessary components, hooks, and utilities

---

## Add a New API Route

**Category:** Development

**When to use:** When creating a new Next.js API route

**Context needed:** Route path, HTTP method, and functionality requirements

---

## Prompt

```
Create a new Next.js API route at [route-path] that:
- Handles [GET | POST | PUT | DELETE] requests
- [Describe functionality]
- Returns appropriate HTTP status codes
- Includes error handling with try-catch
- Validates request data
- Follows workspace error handling patterns

[Add specific requirements like:
- Accepts [request body structure]
- Returns [response structure]
- Validates [specific fields]
]
```

## Example Usage

**Input:**
```
Create a new Next.js API route at app/api/tasks/route.ts that:
- Handles GET requests to return all tasks
- Handles POST requests to create a new task
- Validates task data (title required, description optional)
- Returns 200 on success, 400 on validation error, 500 on server error
- Uses proper TypeScript types
```

**Expected Output:**
A complete API route with proper error handling and TypeScript types

---

## Create a Custom Hook

**Category:** Development

**When to use:** When you need to extract reusable logic into a custom React hook

**Context needed:** Hook purpose, functionality, and any dependencies

---

## Prompt

```
Create a custom React hook called [hookName] in [file-path] that:
- [Describe functionality]
- Returns [return value structure]
- Handles [specific edge cases]
- Uses [specific React hooks or dependencies]
- Follows workspace hook naming conventions (use prefix)
- Includes proper TypeScript types
- Handles errors appropriately

[Add specific requirements]
```

## Example Usage

**Input:**
```
Create a custom React hook called useDebounce in lib/hooks/use-debounce.ts that:
- Takes a value and delay (number of milliseconds)
- Returns the debounced value
- Cleans up the timeout on unmount
- Uses TypeScript generics to preserve value type
```

**Expected Output:**
A reusable hook with proper TypeScript types and cleanup logic

