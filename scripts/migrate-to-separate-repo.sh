#!/bin/bash

# Migration Script: Move Template to Separate Repository
# 
# This script helps migrate the workspace template to its own repository.
# Usage: ./migrate-to-separate-repo.sh [repository-url]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🚀 Workspace Template Migration Script"
echo "======================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "📦 Initializing git repository..."
  git init
  echo "✓ Git initialized"
fi

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD -- 2>/dev/null || [ -n "$(git status --porcelain)" ]; then
  echo ""
  echo "⚠️  You have uncommitted changes."
  read -p "Do you want to commit them now? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add .
    git commit -m "Initial commit: Workspace template"
    echo "✓ Changes committed"
  else
    echo "⚠️  Please commit or stash your changes before continuing."
    exit 1
  fi
fi

# Get repository URL
if [ -z "$1" ]; then
  echo ""
  echo "📝 Repository Setup"
  echo "-------------------"
  echo ""
  read -p "GitHub repository URL (e.g., https://github.com/username/workspace-template.git): " REPO_URL
else
  REPO_URL=$1
fi

if [ -z "$REPO_URL" ]; then
  echo "❌ Repository URL is required"
  exit 1
fi

# Check if remote already exists
if git remote get-url origin >/dev/null 2>&1; then
  echo ""
  echo "⚠️  Remote 'origin' already exists: $(git remote get-url origin)"
  read -p "Do you want to update it? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git remote set-url origin "$REPO_URL"
    echo "✓ Remote updated"
  else
    echo "Skipping remote setup"
  fi
else
  echo ""
  echo "🔗 Adding remote repository..."
  git remote add origin "$REPO_URL"
  echo "✓ Remote added"
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

# Create initial commit if needed
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
  echo ""
  echo "📝 Creating initial commit..."
  git add .
  git commit -m "Initial commit: Workspace template"
  echo "✓ Initial commit created"
fi

# Push to remote
echo ""
echo "📤 Pushing to remote repository..."
read -p "Do you want to push now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git push -u origin "$CURRENT_BRANCH"
  echo "✓ Pushed to remote"
else
  echo "⏭️  Skipping push. You can push later with:"
  echo "   git push -u origin $CURRENT_BRANCH"
fi

echo ""
echo "✨ Migration complete!"
echo ""
echo "Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Click Settings → Template repository"
echo "3. Check 'Template repository' checkbox"
echo "4. Save changes"
echo ""
echo "Your template is now ready to use!"
echo "Users can clone it with:"
echo "   git clone $REPO_URL my-project"
echo ""

