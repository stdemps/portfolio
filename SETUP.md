# Setup Guide

Step-by-step instructions to get your workspace up and running.

## Prerequisites

- Node.js 18+ and npm
- Git
- Cursor (recommended) or your preferred editor

## Initial Setup

### 1. Get the Template

**Option A: Use GitHub Template (Recommended)**

1. Click **"Use this template"** button on the GitHub repository page
2. Create a new repository from the template
3. Clone your new repository:
   ```bash
   git clone https://github.com/yourusername/your-project.git
   cd your-project
   ```

**Option B: Clone Directly**

```bash
git clone https://github.com/yourusername/workspace-template.git my-project
cd my-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Customize Project (Optional)

Run the customization script to update project name and metadata:

```bash
node template.config.js
```

Or manually update:
- `package.json` - Project name and version
- `app/layout.tsx` - App metadata
- `.cursor/rules/project-context.mdc` - Project context

### 4. Git Setup

If you used the GitHub template button, git is already initialized. If you cloned directly, you may want to:

```bash
# Update remote to point to your new repository
git remote set-url origin https://github.com/yourusername/your-project.git

# Or initialize a new repository
git init
git add .
git commit -m "Initial commit from workspace template"
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Playwright MCP (Cursor)

The template includes a project-level MCP config so Cursor can use the **Playwright MCP** server for browser automation (e.g. navigating, snapping the page, clicking). No extra setup needed: open the project in Cursor and the Playwright tools are available to the agent.

- Config: `.cursor/mcp.json` (runs `npx @playwright/mcp@latest`)
- Requires Node.js 18+ and an existing `npm install` so `npx` can run the package.
- To disable: remove or rename `.cursor/mcp.json`.

## First Steps

### 1. Update Project Context

Edit `.cursor/rules/project-context.mdc` with your project information:
- Project overview and goals
- Key terminology
- User personas (if applicable)
- Product philosophy

### 2. Add Your PRD

Create or copy your PRD to `docs/prds/`:
```bash
cp your-prd.md docs/prds/
```

Reference it in Cursor with:
```
@docs/prds/your-prd.md
```

### 3. Customize the Home Page

Edit `app/page.tsx` to match your project needs.

### 4. Add Additional Components

Install shadcn/ui components as needed:
```bash
npx shadcn@latest add [component-name]
```

## Environment Variables

Create a `.env.local` file for environment variables:

```bash
# Example: API keys, database URLs, etc.
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Development Workflow

1. **Write PRD** → Drop into `docs/prds/`
2. **Open in Cursor** → Context auto-loads from `.cursor/rules/`
3. **Reference PRD** → Use `@docs/prds/your-prd.md`
4. **Get Feedback** → Use reviewer personas: `@docs/reviewers/engineer.md`
5. **Build** → Start coding with all context available!

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### TypeScript Errors

Ensure all dependencies are installed:
```bash
npm install
```

### Build Errors

Clear Next.js cache:
```bash
rm -rf .next
npm run build
```

## Next Steps

- Read the [README.md](./README.md) for more information
- Check out the [PRD template](./docs/prds/template-prd.md)
- Explore the [reviewer personas](./docs/reviewers/)
- Customize the [UI guidelines](./.cursor/rules/ui-design-guidelines.mdc) if needed

## Getting Help

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [shadcn/ui Components](https://ui.shadcn.com)
- Consult [Cursor Documentation](https://cursor.sh/docs)

