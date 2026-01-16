# Ticket 1-6: Run Quality Checks (Phase 1)

Complexity level: low

Run linting and build to ensure all Phase 1 changes compile correctly.

## Actions

### Action 1

Action type: run script

Path: project root

Action: `npm run lint && npm run build`

Description: Run ESLint and Next.js build to verify:
- No TypeScript errors
- No linting issues
- Build completes successfully
- Dark mode works in production build

## Checks

- [x] `npm run lint` passes
- [x] `npm run build` succeeds
- [x] No console errors in browser
- [x] Dark mode toggles correctly in dev server

## Coding standards

N/A
