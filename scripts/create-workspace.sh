#!/bin/bash

# Create Workspace Script
# 
# This script creates a new workspace from the template.
# Usage: ./create-workspace.sh <project-name>

set -e

if [ -z "$1" ]; then
  echo "Usage: ./create-workspace.sh <project-name>"
  exit 1
fi

PROJECT_NAME=$1
TEMPLATE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$TEMPLATE_DIR")/$PROJECT_NAME"

echo "🚀 Creating workspace: $PROJECT_NAME"
echo ""

# Copy template
echo "📦 Copying template files..."
cp -r "$TEMPLATE_DIR" "$PROJECT_DIR"

# Remove template-specific files
cd "$PROJECT_DIR"
rm -f create-workspace.sh
rm -f template.config.js

# Update package.json
echo "📝 Updating package.json..."
sed -i '' "s/\"name\": \"workspace-template\"/\"name\": \"$PROJECT_NAME\"/" package.json

# Initialize git
echo "🔧 Initializing git repository..."
git init
git add .
git commit -m "Initial commit from workspace template" || true

# Install dependencies
echo "📥 Installing dependencies..."
npm install

echo ""
echo "✨ Workspace created successfully!"
echo ""
echo "Next steps:"
echo "  cd $PROJECT_NAME"
echo "  npm run dev"
echo "  # Open in Cursor and start coding!"
echo ""

