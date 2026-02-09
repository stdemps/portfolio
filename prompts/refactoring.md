# Refactoring Prompts

Prompts for improving code quality, optimizing performance, and cleaning up code.

---

## Refactor Component for Better Structure

**Category:** Refactoring

**When to use:** When a component has grown too large or doesn't follow workspace standards

**Context needed:** The component file and any related files

---

## Prompt

```
Refactor [ComponentName] in [file-path] to:
- Follow workspace component structure guidelines (imports, types, hooks, effects, handlers, render)
- Extract complex logic into custom hooks if appropriate
- Improve TypeScript types (remove any, add proper interfaces)
- Enhance accessibility (add ARIA labels, keyboard navigation, focus management)
- Improve mobile responsiveness
- Optimize performance (use useCallback, useMemo where appropriate)
- Follow workspace naming conventions
- Maintain all existing functionality

Current code:
[Reference the component file]
```

## Example Usage

**Input:**
```
Refactor TaskList component in components/task-list.tsx to follow workspace standards and improve structure. The component currently works but doesn't follow our component structure guidelines and has some performance issues.

Current code:
```1:50:components/task-list.tsx
[component code]
```
```

**Expected Output:**
A refactored component following all workspace standards

---

## Extract Reusable Logic

**Category:** Refactoring

**When to use:** When you notice duplicated logic that should be extracted

**Context needed:** Files with duplicated logic

---

## Prompt

```
I've identified duplicated logic across these files:
- [file-path-1]
- [file-path-2]
- [file-path-3]

The duplicated logic: [describe what's duplicated]

Please:
1. Create a reusable utility function or hook
2. Refactor all instances to use the new utility
3. Place it in the appropriate location (lib/utils.ts or lib/hooks/)
4. Add proper TypeScript types
5. Include JSDoc comments
6. Ensure all existing functionality is preserved
```

## Example Usage

**Input:**
```
I've identified duplicated date formatting logic across:
- components/task-card.tsx
- components/task-list.tsx
- app/page.tsx

The duplicated logic: Formatting dates to "MMM DD, YYYY" format

Please extract this into a reusable utility function.
```

**Expected Output:**
A new utility function and refactored code using it

---

## Improve Performance

**Category:** Refactoring

**When to use:** When a component or feature has performance issues

**Context needed:** The component/feature and description of performance issues

---

## Prompt

```
Optimize [ComponentName/feature] in [file-path] for better performance:

**Current issues:**
- [Issue 1, e.g., unnecessary re-renders]
- [Issue 2, e.g., expensive computations on every render]
- [Issue 3, e.g., large bundle size]

**Requirements:**
- Maintain all existing functionality
- Follow React best practices (useCallback, useMemo, React.memo where appropriate)
- Optimize bundle size (code splitting, dynamic imports if needed)
- Ensure accessibility and mobile responsiveness are preserved
- Add performance optimizations without over-optimizing

Current code:
[Reference the code]
```

## Example Usage

**Input:**
```
Optimize TaskList component in components/task-list.tsx for better performance:

**Current issues:**
- Re-renders on every parent state change even when tasks haven't changed
- Filters tasks on every render without memoization
- Large list causes scroll performance issues

Please optimize while maintaining all functionality.
```

**Expected Output:**
Optimized component with performance improvements

---

## Modernize Legacy Code

**Category:** Refactoring

**When to use:** When updating old code to match current workspace standards

**Context needed:** The legacy code file

---

## Prompt

```
Modernize the code in [file-path] to match current workspace standards:

**Current issues:**
- [Issue 1, e.g., uses old patterns]
- [Issue 2, e.g., missing TypeScript types]
- [Issue 3, e.g., doesn't follow component structure]

**Requirements:**
- Update to current workspace standards
- Add proper TypeScript types
- Follow component structure guidelines
- Improve accessibility
- Ensure mobile responsiveness
- Maintain backward compatibility if needed
- Update to use latest shadcn/ui components if applicable

Current code:
[Reference the code]
```

## Example Usage

**Input:**
```
Modernize the UserProfile component in components/user-profile.tsx. It was created before we established our current standards and needs updating.

**Current issues:**
- Uses inline styles instead of Tailwind
- Missing TypeScript types for props
- Doesn't follow component structure guidelines
- Not fully accessible
- Not mobile responsive

Please modernize it to current standards.
```

**Expected Output:**
Modernized code following all current workspace standards

