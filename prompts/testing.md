# Testing Prompts

Prompts for creating tests, improving test coverage, and debugging test failures.

---

## Create Component Tests

**Category:** Testing

**When to use:** When you need to write tests for a React component

**Context needed:** Component file and testing requirements

---

## Prompt

```
Create comprehensive tests for [ComponentName] in [file-path] using React Testing Library.

**Test requirements:**
- Test component rendering
- Test user interactions (clicks, form submissions, etc.)
- Test accessibility (keyboard navigation, ARIA attributes)
- Test edge cases (empty states, error states, loading states)
- Test props variations
- Follow workspace testing standards
- Use descriptive test names
- Ensure tests are maintainable

**Component details:**
[Describe component functionality, props, and key interactions]

Component code:
[Reference the component file]
```

## Example Usage

**Input:**
```
Create comprehensive tests for TaskCard component in components/task-card.tsx.

**Test requirements:**
- Test rendering with task data
- Test checkbox interaction (marking task as complete)
- Test delete button functionality
- Test keyboard accessibility
- Test with different task states (pending, completed)
- Test with missing optional props

**Component details:**
- Accepts task prop with title, description, status
- Has onComplete and onDelete callbacks
- Shows checkbox and delete button
- Uses Card component from shadcn/ui

Component code:
```1:30:components/task-card.tsx
[component code]
```
```

**Expected Output:**
Complete test suite with all required test cases

---

## Create Hook Tests

**Category:** Testing

**When to use:** When you need to test a custom React hook

**Context needed:** Hook file and hook functionality

---

## Prompt

```
Create tests for the [hookName] hook in [file-path] using React Testing Library and @testing-library/react-hooks.

**Test requirements:**
- Test hook return values
- Test hook behavior with different inputs
- Test side effects (if any)
- Test cleanup (if applicable)
- Test error cases
- Test edge cases
- Follow workspace testing standards

**Hook details:**
[Describe hook functionality, parameters, return values, and side effects]

Hook code:
[Reference the hook file]
```

## Example Usage

**Input:**
```
Create tests for the useDebounce hook in lib/hooks/use-debounce.ts.

**Test requirements:**
- Test debounced value updates after delay
- Test cleanup on unmount
- Test with different delay values
- Test with rapid value changes
- Test TypeScript type preservation

**Hook details:**
- Takes value and delay (milliseconds)
- Returns debounced value
- Cleans up timeout on unmount
- Uses TypeScript generics

Hook code:
```1:15:lib/hooks/use-debounce.ts
[hook code]
```
```

**Expected Output:**
Complete test suite for the hook

---

## Create API Route Tests

**Category:** Testing

**When to use:** When you need to test a Next.js API route

**Context needed:** API route file and route functionality

---

## Prompt

```
Create tests for the API route at [route-path] using Jest and appropriate testing utilities.

**Test requirements:**
- Test all HTTP methods (GET, POST, PUT, DELETE as applicable)
- Test request validation
- Test success responses
- Test error responses (400, 404, 500)
- Test edge cases
- Test authentication/authorization (if applicable)
- Follow workspace testing standards

**Route details:**
[Describe route functionality, request/response formats, and validation rules]

Route code:
[Reference the route file]
```

## Example Usage

**Input:**
```
Create tests for the API route at app/api/tasks/route.ts.

**Test requirements:**
- Test GET requests (return all tasks)
- Test POST requests (create task)
- Test validation (title required, description optional)
- Test 200 success responses
- Test 400 validation errors
- Test 500 server errors

**Route details:**
- GET: Returns array of tasks
- POST: Accepts { title: string, description?: string }, returns created task
- Validates title is required and non-empty

Route code:
```1:40:app/api/tasks/route.ts
[route code]
```
```

**Expected Output:**
Complete test suite for the API route

---

## Debug Test Failures

**Category:** Testing

**When to use:** When tests are failing and you need help fixing them

**Context needed:** Failing test code and error messages

---

## Prompt

```
I have failing tests in [test-file-path]:

**Error messages:**
[Paste test failure messages and stack traces]

**Failing tests:**
[Reference or paste the failing test code]

**Component/Hook/Code being tested:**
[Reference the code being tested]

Please:
1. Identify why the tests are failing
2. Fix the tests
3. Ensure tests are still comprehensive
4. Explain what was wrong and how the fix works
```

## Example Usage

**Input:**
```
I have failing tests in components/__tests__/task-card.test.tsx:

**Error messages:**
```
Error: Unable to find an element with the text: "Complete task"
```

**Failing tests:**
```15:20:components/__tests__/task-card.test.tsx
it('should call onComplete when checkbox is clicked', () => {
  render(<TaskCard task={mockTask} onComplete={mockOnComplete} />)
  const checkbox = screen.getByText('Complete task')
  fireEvent.click(checkbox)
  expect(mockOnComplete).toHaveBeenCalled()
})
```

**Component being tested:**
```1:30:components/task-card.tsx
[component code]
```

Please identify and fix the issue.
```

**Expected Output:**
Fixed tests with explanation of the issue and solution

