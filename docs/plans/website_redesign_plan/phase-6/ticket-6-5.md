# Ticket 6-5: Run Quality Checks

Complexity level: low

Run all quality checks to ensure the codebase is clean.

## Actions

### Action 1

Action type: run script

Path: Project root

Action: Run lint checks

Description: Execute the following commands:

```bash
npm run lint
```

Fix any linting errors that arise.

### Action 2

Action type: run script

Path: Project root

Action: Run TypeScript type checking

Description: Execute:

```bash
npx tsc --noEmit
```

Fix any type errors.

### Action 3

Action type: run script

Path: Project root

Action: Run build

Description: Execute:

```bash
npm run build
```

Ensure the project builds without errors.

## Checks

- [x] `npm run lint` passes with no errors
- [x] `npx tsc --noEmit` passes with no errors
- [x] `npm run build` completes successfully

## Coding standards

N/A
