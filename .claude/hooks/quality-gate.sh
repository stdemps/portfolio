#!/bin/bash

###
# Pre-commit Quality Gate Hook
#
# This hook runs before commits to enforce:
# 1. Linting standards
# 2. Mobile-first pattern validation (if UI files changed)
# 3. Type checking
# 4. Tests (optional, set RUN_TESTS=true)
#
# Prototype Mode:
# Set CLAUDE_PROTOTYPE_MODE=true to run checks without failing commit
# Example: CLAUDE_PROTOTYPE_MODE=true git commit -m "Add feature"
#
# Run Tests:
# Set RUN_TESTS=true to include test execution in quality gate
# Example: RUN_TESTS=true git commit -m "Add feature with tests"
###

set -e

echo "Running pre-commit quality gate..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check for prototype mode
PROTOTYPE_MODE=${CLAUDE_PROTOTYPE_MODE:-false}
RUN_TESTS=${RUN_TESTS:-false}

if [ "$PROTOTYPE_MODE" = "true" ]; then
  echo -e "${YELLOW}⚠ PROTOTYPE MODE ENABLED${NC}"
  echo -e "${YELLOW}  Checks will run but won't block commit${NC}\n"
fi

if [ "$RUN_TESTS" = "true" ]; then
  echo -e "${YELLOW}🧪 TEST MODE ENABLED${NC}"
  echo -e "${YELLOW}  Tests will be executed as part of quality gate${NC}\n"
fi

# Track if we should fail the commit
SHOULD_FAIL=0

# Determine number of checks
TOTAL_CHECKS=3
if [ "$RUN_TESTS" = "true" ]; then
  TOTAL_CHECKS=4
fi

# 1. Run ESLint
echo -e "\n${YELLOW}[1/$TOTAL_CHECKS] Running ESLint...${NC}"
if npm run lint --silent; then
  echo -e "${GREEN}✓ ESLint passed${NC}"
else
  echo -e "${RED}✗ ESLint failed${NC}"
  SHOULD_FAIL=1
fi

# 2. Check for mobile-first patterns in staged UI files
echo -e "\n${YELLOW}[2/$TOTAL_CHECKS] Checking mobile-first patterns...${NC}"

# Get list of staged TypeScript/TSX files in components or app directories
STAGED_UI_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(tsx|ts)$' | grep -E '(components/|app/)' || true)

if [ -n "$STAGED_UI_FILES" ]; then
  MOBILE_FIRST_VIOLATIONS=0

  for file in $STAGED_UI_FILES; do
    # Check for desktop-first breakpoint usage (lg: or md: without corresponding mobile-first base)
    # This is a simplified check - you may want to enhance this
    if git diff --cached "$file" | grep -E '^\+.*className.*=.*"[^"]*\b(lg:|md:)[^"]*"' > /dev/null; then
      # Check if the same line has mobile-first base classes
      if ! git diff --cached "$file" | grep -E '^\+.*className.*=.*"[^"]*(w-|h-|p-|m-|text-|flex|grid|block|hidden)[^"]*\b(lg:|md:)[^"]*"' > /dev/null; then
        echo -e "${YELLOW}  ⚠ Potential desktop-first pattern in: $file${NC}"
        echo -e "    Review: Does this component have mobile-first base classes?"
        MOBILE_FIRST_VIOLATIONS=$((MOBILE_FIRST_VIOLATIONS + 1))
      fi
    fi
  done

  if [ $MOBILE_FIRST_VIOLATIONS -eq 0 ]; then
    echo -e "${GREEN}✓ Mobile-first patterns look good${NC}"
  else
    echo -e "${YELLOW}⚠ Found $MOBILE_FIRST_VIOLATIONS potential mobile-first pattern issues${NC}"
    echo -e "${YELLOW}  This is a warning only - review your responsive patterns${NC}"
  fi
else
  echo -e "${GREEN}✓ No UI files to check${NC}"
fi

# 3. Run TypeScript type checking
echo -e "\n${YELLOW}[3/$TOTAL_CHECKS] Running TypeScript type check...${NC}"
if npx tsc --noEmit; then
  echo -e "${GREEN}✓ Type check passed${NC}"
else
  echo -e "${RED}✗ Type check failed${NC}"
  SHOULD_FAIL=1
fi

# 4. Run tests (if enabled)
if [ "$RUN_TESTS" = "true" ]; then
  echo -e "\n${YELLOW}[4/$TOTAL_CHECKS] Running tests...${NC}"
  if npm test -- --reporter=list; then
    echo -e "${GREEN}✓ Tests passed${NC}"
  else
    echo -e "${RED}✗ Tests failed${NC}"
    SHOULD_FAIL=1
  fi
fi

# Summary
echo -e "\n${YELLOW}========================================${NC}"
if [ $SHOULD_FAIL -eq 1 ]; then
  if [ "$PROTOTYPE_MODE" = "true" ]; then
    echo -e "${YELLOW}⚠ Quality gate FAILED (but allowing commit in prototype mode)${NC}"
    echo -e "${YELLOW}Please review and fix issues when moving to production${NC}"
    exit 0
  else
    echo -e "${RED}✗ Quality gate FAILED${NC}"
    echo -e "${RED}Please fix the errors above before committing${NC}"
    echo -e "${YELLOW}Tip: Use CLAUDE_PROTOTYPE_MODE=true to bypass during rapid prototyping${NC}"
    exit 1
  fi
else
  echo -e "${GREEN}✓ Quality gate PASSED${NC}"
  exit 0
fi
