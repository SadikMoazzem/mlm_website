# Ticket 4-3: Run Quality Checks (Phase 4)

Complexity level: low

Run linting and build to ensure Phase 4 changes compile correctly.

## Actions

### Action 1

Action type: run script

Path: project root

Action: `npm run lint && npm run build`

Description: Verify:
- No TypeScript errors
- No linting issues
- Build succeeds
- New routes appear in build output

## Checks

- [x] `npm run lint` passes
- [x] `npm run build` succeeds
- [x] /prayer-times and /download in build output

## Coding standards

N/A
