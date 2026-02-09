# Workspace Standards Reference

Common requirements and standards that apply across all prompts. Reference this when creating prompts or include these standards in your requests.

## Core Standards

### TypeScript
- Follow TypeScript strict mode
- Use proper types (avoid `any`)
- Define interfaces for complex objects
- Use type inference when possible

### Code Structure
- Follow workspace component structure guidelines (imports, types, hooks, effects, handlers, render)
- Use file naming conventions (kebab-case for files, PascalCase for components)
- Follow workspace import organization patterns

### Accessibility (WCAG 2.1 AA)
- All interactive elements keyboard accessible
- Proper ARIA labels and roles
- Keyboard navigation works properly
- Screen reader support (aria-describedby, aria-labelledby)
- Focus management (visible focus indicators, focus trap in modals)
- Form accessibility (labels with htmlFor, aria-invalid, error associations)
- Color contrast meets WCAG AA standards (4.5:1 for text, 3:1 for interactive)

### Responsive Design
- **Mobile-first approach** (no prefix = mobile, breakpoint prefixes for larger screens)
- Responsive spacing: `p-4 md:p-6 lg:p-8` pattern
- Responsive typography: `text-sm md:text-base lg:text-lg` pattern
- Touch targets minimum 44x44px on mobile
- Test at key breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop)

### Styling
- Use Tailwind CSS utility classes
- Use shadcn/ui components where appropriate
- Follow workspace color system and design tokens
- Support dark mode (when implemented)

### Performance
- Use React.memo for expensive components
- Use useCallback for event handlers passed to children
- Use useMemo for expensive computations (only when necessary)
- Optimize images with Next.js Image component

## Component-Specific Standards

### Form Components
- Validation timing: Specify onBlur, onChange, or onSubmit
- Error display: Inline below field (preferred), toast, or modal
- Error icons: Use AlertCircle from lucide-react
- Loading states: Disable submit button, show "[Action]..." text
- Success states: Specify (message, redirect, form reset, etc.)
- Accessibility: aria-describedby for errors, aria-invalid on invalid inputs

### API Routes
- Proper HTTP status codes (200, 201, 400, 404, 500)
- Error handling with try-catch
- Request validation
- TypeScript types for request/response
- Follow workspace error handling patterns

## Usage in Prompts

When creating prompts, you can reference these standards:

**Option 1: Reference this file**
```
Create a component following workspace standards (see prompts/STANDARDS.md)
```

**Option 2: Include specific standards**
```
Create a component that:
- Follows TypeScript strict mode and workspace standards
- Is fully accessible (WCAG 2.1 AA compliant)
- Is mobile responsive (mobile-first approach)
[Then add specific requirements]
```

**Option 3: Use snippet format**
For quick reference, common snippets:
- `STANDARDS.core` - TypeScript, code structure, styling basics
- `STANDARDS.accessibility` - Full accessibility requirements
- `STANDARDS.responsive` - Mobile-first responsive patterns
- `STANDARDS.forms` - Form-specific standards
- `STANDARDS.api` - API route standards

## Agent Integration

When using agents, they automatically know these standards:
- `@engineer` - Technical standards (TypeScript, structure, performance)
- `@designer` - UX standards (accessibility, responsive, styling)

You can say: "Create a component following workspace standards" and agents will apply these automatically.
