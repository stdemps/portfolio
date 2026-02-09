# Debugging Prompts

Prompts for diagnosing errors, troubleshooting issues, and fixing bugs.

---

## Diagnose an Error

**Category:** Debugging

**When to use:** When encountering an error and need help understanding what's wrong

**Context needed:** Error message, stack trace, relevant code, and what you were trying to do

---

## Prompt

```
I'm encountering an error in [file-path] at [line-number or function-name]:

[Paste error message and stack trace]

The code in question:
[Paste relevant code or reference with line numbers]

I was trying to [describe what you were doing].

Please:
1. Explain what the error means
2. Identify the root cause
3. Suggest a fix
4. Explain why the fix works
```

## Example Usage

**Input:**
```
I'm encountering an error in components/task-card.tsx:

TypeError: Cannot read property 'title' of undefined

The code in question:
```12:15:components/task-card.tsx
export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card>
      <CardTitle>{task.title}</CardTitle>
```

I was trying to render a task card but the task prop is undefined.

Please:
1. Explain what the error means
2. Identify the root cause
3. Suggest a fix
4. Explain why the fix works
```

**Expected Output:**
Clear explanation of the error, root cause analysis, and a fix with explanation

---

## Fix TypeScript Errors

**Category:** Debugging

**When to use:** When TypeScript is showing type errors that need resolution

**Context needed:** TypeScript error messages and the code causing them

---

## Prompt

```
I have TypeScript errors in [file-path]:

[Paste TypeScript error messages]

The relevant code:
[Paste code with errors]

Please:
1. Explain each error
2. Fix the type errors while maintaining type safety
3. Use proper TypeScript types (avoid `any`)
4. Follow workspace TypeScript standards
```

## Example Usage

**Input:**
```
I have TypeScript errors in components/task-list.tsx:

Error: Property 'id' does not exist on type 'unknown'.
Error: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.

The relevant code:
```5:10:components/task-list.tsx
export function TaskList({ tasks }: { tasks: unknown[] }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}
```

Please fix the type errors while maintaining type safety.
```

**Expected Output:**
Fixed code with proper TypeScript types

---

## Debug Runtime Issue

**Category:** Debugging

**When to use:** When something isn't working as expected at runtime

**Context needed:** What you expected, what actually happened, and relevant code

---

## Prompt

```
I'm debugging a runtime issue in [file-path]:

**Expected behavior:** [What should happen]
**Actual behavior:** [What actually happens]
**Steps to reproduce:** [How to trigger the issue]

Relevant code:
[Paste or reference relevant code]

Please:
1. Analyze the code to identify the issue
2. Explain why it's happening
3. Provide a fix
4. Suggest how to prevent similar issues
```

## Example Usage

**Input:**
```
I'm debugging a runtime issue in components/task-form.tsx:

**Expected behavior:** When I submit the form, a new task should be created and the form should reset
**Actual behavior:** The form submits but doesn't reset, and the task isn't added to the list
**Steps to reproduce:** Fill out the form, click submit

Relevant code:
```15:25:components/task-form.tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  onCreateTask({ title, description })
  setTitle('')
  setDescription('')
}
```

Please analyze and fix the issue.
```

**Expected Output:**
Analysis of the issue, explanation, and a fix

---

## Fix Build Errors

**Category:** Debugging

**When to use:** When the build is failing and you need help fixing it

**Context needed:** Build error messages and relevant configuration files

---

## Prompt

```
My build is failing with the following errors:

[Paste build error messages]

Relevant files:
[Reference or paste relevant code from config files, package.json, etc.]

Please:
1. Identify the cause of the build failure
2. Explain what's wrong
3. Provide a fix
4. Verify the fix won't break other parts of the build
```

## Example Usage

**Input:**
```
My build is failing with the following errors:

Error: Cannot find module '@/components/ui/button'
Module not found: Can't resolve '@/components/ui/button'

Relevant files:
- tsconfig.json has path alias: "@/*": ["./*"]
- components/ui/button.tsx exists

Please identify and fix the issue.
```

**Expected Output:**
Root cause analysis and fix for the build issue

