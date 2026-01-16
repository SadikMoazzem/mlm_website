# Phase 1: Create Location Data Utilities and Types

## Goals

Create the foundational data layer for the unified location page. This includes helper functions to resolve location slugs to coordinates, types for location data, and utilities to determine if a location is a known city, area, or unknown location requiring geocoding.

### Tickets

- [x] Ticket 1-1: Create location types and interfaces
- [x] Ticket 1-2: Create location resolver utility functions
- [x] Ticket 1-3: Add forward geocoding API route for slug-to-coordinates
- [x] Run quality checks (lint, build)

### Notes

The location resolver should follow this priority:
1. Check if slug matches a city ID in `cities.ts`
2. Check if slug matches an area ID in any city
3. Fall back to Mapbox geocoding for unknown locations

Location types should distinguish between:
- `KnownCity` - Has areas breakdown
- `KnownArea` - Part of a city, has parent city reference
- `DynamicLocation` - Geocoded location, no area breakdown

### Dependency Diagram

```
ticket-1-1 (types)
    ↓
ticket-1-2 (resolver) ←── ticket-1-3 (geocoding API)
    ↓
quality checks
```

Tickets 1-1 must complete first. Tickets 1-2 and 1-3 can run in parallel after 1-1.
