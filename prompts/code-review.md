# Code Review Prompts

Prompts for reviewing code quality, checking standards compliance, and suggesting improvements.

---

## Review Code for Standards Compliance

**Category:** Code Review

**When to use:** When you want to ensure code follows workspace standards

**Context needed:** Code file(s) to review

---

## Prompt

```
Review [file-path] for compliance with workspace standards:

**Check for:**
- TypeScript strict mode compliance (no `any`, proper types)
- Component structure guidelines (imports, types, hooks, effects, handlers, render)
- File naming conventions (kebab-case)
- Import organization (React, third-party, internal, utilities, styles)
- Accessibility (WCAG 2.1 AA - keyboard navigation, ARIA labels, focus management)
- Mobile responsiveness (mobile-first, proper breakpoints)
- Styling (Tailwind utilities, no inline styles, semantic colors)
- Error handling (try-catch, user-friendly messages)
- Performance (useCallback, useMemo, React.memo where appropriate)
- Code quality (naming, comments, formatting)

**Code to review:**
[Reference the file(s)]
```

## Example Usage

**Input:**
```
Review components/task-card.tsx for compliance with workspace standards.

Check all aspects: TypeScript, component structure, accessibility, mobile responsiveness, styling, error handling, and performance.

Code to review:
```1:50:components/task-card.tsx
[component code]
```
```

**Expected Output:**
Detailed review with specific issues and suggestions for improvement

---

## Review for Accessibility

**Category:** Code Review

**When to use:** When you want to ensure code meets accessibility standards

**Context needed:** Component or page file

---

## Prompt

```
Review [file-path] for WCAG 2.1 AA accessibility compliance:

**Check for:**
- Keyboard navigation (all interactive elements accessible via keyboard)
- Focus indicators (visible focus states)
- ARIA labels and roles (proper semantic HTML and ARIA attributes)
- Color contrast (meets 4.5:1 for text, 3:1 for interactive elements)
- Screen reader support (proper heading hierarchy, alt text, labels)
- Form accessibility (labels, error messages, required fields)
- Focus management (focus trap in modals, focus restoration)
- Touch targets (minimum 44x44px on mobile)

**Code to review:**
[Reference the file]
```

## Example Usage

**Input:**
```
Review components/task-form.tsx for WCAG 2.1 AA accessibility compliance.

Check all accessibility aspects: keyboard navigation, ARIA, color contrast, screen reader support, form accessibility, and focus management.

Code to review:
```1:60:components/task-form.tsx
[form code]
```
```

**Expected Output:**
Accessibility review with specific issues and fixes

---

## Review for Performance

**Category:** Code Review

**When to use:** When you want to identify performance issues and optimizations

**Context needed:** Component or feature code

---

## Prompt

```
Review [file-path] for performance issues and optimization opportunities:

**Check for:**
- Unnecessary re-renders (missing useCallback, useMemo, React.memo)
- Expensive computations on every render
- Large bundle size (unused imports, missing code splitting)
- Image optimization (using Next.js Image component)
- Unnecessary API calls or data fetching
- Memory leaks (missing cleanup in useEffect)
- Inefficient algorithms or data structures

**Code to review:**
[Reference the file(s)]
```

## Example Usage

**Input:**
```
Review components/task-list.tsx for performance issues.

The component renders a large list of tasks and seems to have performance issues when scrolling.

Code to review:
```1:80:components/task-list.tsx
[component code]
```
```

**Expected Output:**
Performance review with specific issues and optimization suggestions

---

## Review for Security

**Category:** Code Review

**When to use:** When you want to check for security vulnerabilities

**Context needed:** Code file(s), especially API routes and forms

---

## Prompt

```
Review [file-path] for security vulnerabilities:

**Check for:**
- Input validation and sanitization
- XSS vulnerabilities (user input in JSX)
- CSRF protection (if applicable)
- Authentication and authorization
- Sensitive data exposure
- SQL injection (if using raw queries)
- API security (rate limiting, validation)
- Dependency vulnerabilities

**Code to review:**
[Reference the file(s)]
```

## Example Usage

**Input:**
```
Review app/api/tasks/route.ts for security vulnerabilities.

Check input validation, authentication, and any potential security issues.

Code to review:
```1:50:app/api/tasks/route.ts
[route code]
```
```

**Expected Output:**
Security review with identified vulnerabilities and fixes

