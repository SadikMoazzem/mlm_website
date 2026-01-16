# Ticket 1-3: Add Forward Geocoding API Route for Slug-to-Coordinates

Complexity level: medium

Create an API route that converts a location name/slug to coordinates using Mapbox forward geocoding. This is used for unknown locations not in `cities.ts`.

## Actions

### Action 1

Action type: create file

Path: `src/app/api/location/geocode/route.ts`

Description: Create a forward geocoding API route that:

- Accepts `GET /api/location/geocode?q={location_name}`
- Calls Mapbox geocoding API with UK country filter
- Returns the first matching result with coordinates
- Handles errors gracefully

Response format:
```typescript
interface GeocodeResponse {
  success: boolean
  data?: {
    name: string
    fullName: string
    latitude: number
    longitude: number
    country: string
    region?: string
    type: string  // 'place', 'locality', 'neighborhood'
  }
  error?: string
}
```

Implementation notes:
- Reuse the Mapbox types from existing `/api/search/locations/route.ts`
- Use `types: 'place,locality,neighborhood'` (exclude addresses for location pages)
- Limit to 1 result since we only need the best match
- Add caching headers for performance: `Cache-Control: public, s-maxage=86400`

## Checks

- [ ] `GET /api/location/geocode?q=bristol` returns coordinates for Bristol
- [ ] `GET /api/location/geocode?q=nonexistent123` returns success: false
- [ ] `GET /api/location/geocode` (no query) returns 400 error
- [ ] Response includes all required fields
- [ ] Caching headers are set correctly

## Coding standards

N/A - Follow patterns from existing `/api/search/locations/route.ts`
