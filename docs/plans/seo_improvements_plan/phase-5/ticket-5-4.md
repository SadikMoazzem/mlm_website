# Ticket 5-4: Run Full Build and Verify No Errors

Complexity level: low

Run a complete production build to ensure all changes work together without errors.

## Actions

### Action 1

Action type: run script

Path: N/A

Action: Run production build

Description: Execute the following commands:

```bash
# Run lint
npm run lint

# Run type check
npx tsc --noEmit

# Run production build
npm run build
```

Verify:
- No TypeScript errors
- No ESLint errors
- Build completes successfully
- Static pages are generated for all areas

### Action 2

Action type: verification

Path: `.next/` directory

Action: Verify static generation

Description: Check that area pages were pre-rendered:
- Look for generated HTML in `.next/server/app/masjids/[city]/[area]/`
- Verify ISR revalidation is configured

## Checks

- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` completes successfully
- [ ] Area pages are statically generated
- [ ] No console warnings about missing data

## Coding standards

N/A
