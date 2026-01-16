# Ticket 1-4: Run quality checks (lint, build)

Complexity level: low

Run linting and build to verify the prayer time utility compiles correctly.

## Actions

### Action 1

Action type: run script

Path: /Users/sadik/Documents/projects/mylocalmasjid/mlm_website

Action: `npm run lint && npm run build`

Description: Run ESLint to check for code quality issues and Next.js build to verify TypeScript compilation and module resolution.

## Checks

- [x] No ESLint errors
- [x] Build completes successfully
- [x] No TypeScript errors with adhan types

## Coding standards

N/A - quality check task
