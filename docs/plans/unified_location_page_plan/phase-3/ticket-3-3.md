# Ticket 3-3: Add Static Params Generation and ISR Configuration

Complexity level: medium

Configure static generation for known cities and areas, and set up ISR (Incremental Static Regeneration) for the location pages.

## Actions

### Action 1

Action type: edit file

Path: `src/app/location/[slug]/page.tsx`

Description: Add static params generation and ISR configuration:

**Static Params:**
```typescript
export async function generateStaticParams() {
  const slugs = getAllStaticLocationSlugs()
  return slugs.map(slug => ({ slug }))
}
```

Where `getAllStaticLocationSlugs()` returns:
- All city IDs from `cities.ts`
- All area IDs from all cities in `cities.ts`

Example output: `['london', 'birmingham', 'east-london', 'west-london', 'small-heath', ...]`

**ISR Configuration:**
```typescript
// Revalidate weekly for known locations (604800 seconds = 7 days)
export const revalidate = 604800

// Allow dynamic params for unknown locations (geocoded)
export const dynamicParams = true
```

**Dynamic behavior:**
- Pre-rendered slugs (cities + areas): Served from cache, revalidated weekly
- Unknown slugs: Server-rendered on demand, triggers geocoding

### Action 2

Action type: verify

Description: Verify that `getAllStaticLocationSlugs()` in `src/lib/location-resolver.ts` returns correct slugs:
- Should include all 11 city IDs
- Should include all ~35 area IDs
- Total should be ~46 slugs

## Checks

- [ ] `generateStaticParams` returns all cities and areas
- [ ] Build generates static pages for known locations
- [ ] Unknown slugs trigger server-side rendering
- [ ] Revalidation is set to weekly
- [ ] `dynamicParams = true` allows geocoded locations
- [ ] No build errors

## Coding standards

N/A - Standard Next.js patterns
