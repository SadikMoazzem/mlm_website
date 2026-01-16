# Ticket 4-4: Add Deprecation Comments to Legacy Route Files

Complexity level: low

Add deprecation comments to the legacy route files. These files are kept temporarily to ensure any direct traffic is handled, but the redirects in next.config.ts will handle the actual routing.

## Actions

### Action 1

Action type: edit file

Path: `src/app/prayer-times/[city]/page.tsx`

Description: Add deprecation comment at the top of the file:

```typescript
/**
 * @deprecated This route is deprecated and redirects to /location/[city]
 *
 * The redirect is configured in next.config.ts:
 * /prayer-times/:city → /location/:city (301 permanent)
 *
 * This file is kept for reference and will be removed in a future cleanup.
 * All new links should use /location/[slug] directly.
 *
 * @see src/app/location/[slug]/page.tsx - The new unified location page
 */
```

### Action 2

Action type: edit file

Path: `src/app/masjids/[city]/page.tsx`

Description: Add similar deprecation comment:

```typescript
/**
 * @deprecated This route is deprecated and redirects to /location/[city]
 *
 * The redirect is configured in next.config.ts:
 * /masjids/:city → /location/:city (301 permanent)
 *
 * This file is kept for reference and will be removed in a future cleanup.
 * All new links should use /location/[slug] directly.
 *
 * @see src/app/location/[slug]/page.tsx - The new unified location page
 */
```

### Action 3

Action type: edit file

Path: `src/app/masjids/[city]/[area]/page.tsx`

Description: Add similar deprecation comment:

```typescript
/**
 * @deprecated This route is deprecated and redirects to /location/[area]
 *
 * The redirect is configured in next.config.ts:
 * /masjids/:city/:area → /location/:area (301 permanent)
 *
 * This file is kept for reference and will be removed in a future cleanup.
 * All new links should use /location/[slug] directly.
 *
 * @see src/app/location/[slug]/page.tsx - The new unified location page
 */
```

## Checks

- [ ] All three legacy route files have deprecation comments
- [ ] Comments reference the new location page
- [ ] Comments mention the redirect configuration
- [ ] Files still compile (comments don't break anything)

## Coding standards

N/A - Documentation comments only
