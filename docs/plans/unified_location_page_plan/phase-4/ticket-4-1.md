# Ticket 4-1: Add Redirects in next.config.ts

Complexity level: medium

Configure 301 permanent redirects from legacy routes to the new unified `/location/[slug]` route.

## Actions

### Action 1

Action type: edit file

Path: `next.config.ts`

Description: Add redirects to the existing `redirects()` function:

```typescript
async redirects() {
  return [
    // Existing redirects...
    {
      source: '/how-we-integrate',
      destination: '/for-masjids',
      permanent: true,
    },
    {
      source: '/solutions',
      destination: '/for-masjids',
      permanent: true,
    },

    // NEW: Legacy route redirects to unified location page
    {
      source: '/prayer-times/:city',
      destination: '/location/:city',
      permanent: true, // 301 redirect for SEO
    },
    {
      source: '/masjids/:city',
      destination: '/location/:city',
      permanent: true,
    },
    {
      source: '/masjids/:city/:area',
      destination: '/location/:area',
      permanent: true,
    },
  ];
},
```

**Notes:**
- The `:city` and `:area` are Next.js path parameters that get forwarded
- `/masjids/:city/:area` redirects to `/location/:area` (not `/location/:city/:area`) because areas have unique slugs
- Order matters: more specific routes should come before general ones

## Checks

- [ ] `/prayer-times/london` redirects to `/location/london` with 301
- [ ] `/masjids/london` redirects to `/location/london` with 301
- [ ] `/masjids/london/east-london` redirects to `/location/east-london` with 301
- [ ] Existing redirects still work
- [ ] No redirect loops
- [ ] Build succeeds

## Coding standards

N/A - Standard Next.js configuration
