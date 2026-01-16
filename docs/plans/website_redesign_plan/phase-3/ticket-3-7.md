# Ticket 3-7: Run Quality Checks (Phase 3)

Complexity level: low

Run linting and build to ensure all Phase 3 changes compile correctly.

## Actions

### Action 1

Action type: run script

Path: project root

Action: `npm run lint && npm run build`

Description: Verify:
- No TypeScript errors in new components
- No linting issues
- Build completes successfully
- /for-masjids route is generated

## Checks

- [x] `npm run lint` passes
- [x] `npm run build` succeeds
- [x] /for-masjids appears in build output

## Coding standards

N/A
