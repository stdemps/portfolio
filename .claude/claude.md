1. First think through the problem, read the codebase for relevant files.
2. Before you make any major changes, check in with me and I will verify the plan. Exception: clear single-cause bugs (e.g. a console error with an obvious fix) can be resolved autonomously — just explain what was fixed and why.
3. Please every step of the way just give me a high level explanation of what changes you made
4. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
5. Maintain a documentation file that describes how the architecture of the app works inside and out.
6. Never speculate about code you have not opened. If the user references a specific file, you MUST read the file before answering. Make sure to investigate and read relevant files BEFORE answering questions about the codebase. Never make any claims about code before investigating unless you are certain of the correct answer - give grounded and hallucination-free answers.

## Self-Improvement

After any correction from the user, log the pattern to `tasks/lessons.md`:
- What went wrong
- Why it happened
- The rule that prevents it repeating

Review `tasks/lessons.md` at the start of each session for relevant patterns.

## Development Workflows

- **TDD + UI Verification**: See `e2e/README.md` and `screenshots/README.md` for the test-driven development workflow with visual verification.