#!/usr/bin/env node

/**
 * Template Customization Script
 * 
 * This script helps customize the workspace template for a new project.
 * Run with: node template.config.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function customize() {
  console.log('\n🚀 Workspace Template Customization\n');
  console.log('This script will help you customize the template for your project.\n');

  // Get project details
  const projectName = await question('Project name (kebab-case): ') || 'my-project';
  const projectDescription = await question('Project description: ') || 'A Next.js application';
  const projectVersion = await question('Version (default: 0.1.0): ') || '0.1.0';

  console.log('\n📝 Updating files...\n');

  // Update package.json
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = projectName;
  packageJson.version = projectVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✓ Updated package.json');

  // Update app/layout.tsx
  const layoutPath = path.join(__dirname, 'app', 'layout.tsx');
  let layoutContent = fs.readFileSync(layoutPath, 'utf8');
  layoutContent = layoutContent.replace(/title: "App Name"/, `title: "${projectName}"`);
  layoutContent = layoutContent.replace(/description: "App description"/, `description: "${projectDescription}"`);
  fs.writeFileSync(layoutPath, layoutContent);
  console.log('✓ Updated app/layout.tsx');

  // Update app/page.tsx
  const pagePath = path.join(__dirname, 'app', 'page.tsx');
  let pageContent = fs.readFileSync(pagePath, 'utf8');
  pageContent = pageContent.replace(/App Name/g, projectName);
  fs.writeFileSync(pagePath, pageContent);
  console.log('✓ Updated app/page.tsx');

  // Update components/topbar.tsx
  const topbarPath = path.join(__dirname, 'components', 'topbar.tsx');
  let topbarContent = fs.readFileSync(topbarPath, 'utf8');
  topbarContent = topbarContent.replace(/App Name/g, projectName);
  fs.writeFileSync(topbarPath, topbarContent);
  console.log('✓ Updated components/topbar.tsx');

  console.log('\n✨ Customization complete!\n');
  console.log('Next steps:');
  console.log('1. Update .cursor/rules/project-context.mdc with your project details');
  console.log('2. Add your PRD to docs/prds/');
  console.log('3. Run: npm install');
  console.log('4. Run: npm run dev');
  console.log('5. Open in Cursor and start coding!\n');

  rl.close();
}

customize().catch(console.error);

