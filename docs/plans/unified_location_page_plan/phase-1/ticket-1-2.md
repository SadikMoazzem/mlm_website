# Ticket 1-2: Create Location Resolver Utility Functions

Complexity level: medium

Create utility functions to resolve a URL slug to location data. The resolver checks known cities and areas first, then falls back to geocoding for unknown locations.

## Actions

### Action 1

Action type: create file

Path: `src/lib/location-resolver.ts`

Description: Create the location resolver module with the following functions:

**`resolveLocationBySlug(slug: string): Promise<LocationResolverResult>`**
- Main entry point for resolving any location slug
- Priority order:
  1. Check `cities.ts` for matching city ID
  2. Check all areas in `cities.ts` for matching area ID
  3. Call geocoding API for unknown locations
- Returns `LocationResolverResult` with resolved location or error

**`findCityBySlug(slug: string): KnownCity | null`**
- Synchronous lookup in `cities.ts`
- Returns null if not found

**`findAreaBySlug(slug: string): KnownArea | null`**
- Iterates through all cities to find matching area
- Returns area with parent city reference if found

**`geocodeLocation(slug: string): Promise<DynamicLocation | null>`**
- Calls `/api/search/locations?q={slug}`
- Takes first UK result
- Returns null if no results or error

**`getAllStaticLocationSlugs(): string[]`**
- Returns array of all city IDs + all area IDs
- Used for `generateStaticParams` in the route

### Action 2

Action type: edit file

Path: `src/data/cities.ts`

Description: Add a helper function to get all area IDs across all cities:

```typescript
export function getAllAreaIds(): string[] {
  return cities.flatMap(city => city.areas.map(area => area.id))
}

export function getAllCityIds(): string[] {
  return cities.map(city => city.id)
}
```

## Checks

- [ ] `resolveLocationBySlug('london')` returns KnownCity
- [ ] `resolveLocationBySlug('east-london')` returns KnownArea with parent city
- [ ] `resolveLocationBySlug('unknown-place')` attempts geocoding
- [ ] `getAllStaticLocationSlugs()` returns correct count of cities + areas
- [ ] File compiles without TypeScript errors

## Coding standards

N/A - Standard TypeScript utilities
