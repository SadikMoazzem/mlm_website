# Ticket 1-1: Create Location Types and Interfaces

Complexity level: low

Define TypeScript types and interfaces for the unified location system. These types will be used throughout the location page and resolver utilities.

## Actions

### Action 1

Action type: create file

Path: `src/types/location.ts`

Description: Create a new types file for location-related interfaces. Include:

```typescript
// Base location data shared by all location types
interface BaseLocation {
  slug: string
  name: string
  latitude: number
  longitude: number
  country: string
}

// Known city from cities.ts with area breakdown
interface KnownCity extends BaseLocation {
  type: 'city'
  areas: Area[]  // From cities.ts
  totalMasjids: number
}

// Known area from cities.ts
interface KnownArea extends BaseLocation {
  type: 'area'
  parentCity: { id: string; name: string }
  radiusKm: number
  description?: string
}

// Dynamic location resolved via geocoding
interface DynamicLocation extends BaseLocation {
  type: 'dynamic'
  region?: string
  fullAddress: string
}

// Union type for resolved locations
type ResolvedLocation = KnownCity | KnownArea | DynamicLocation

// Result type for location resolver
interface LocationResolverResult {
  success: boolean
  location?: ResolvedLocation
  error?: string
}
```

## Checks

- [ ] File compiles without TypeScript errors
- [ ] Types are exported correctly
- [ ] No circular dependencies introduced

## Coding standards

N/A - New file with standard TypeScript patterns
