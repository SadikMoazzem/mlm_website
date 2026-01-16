# Unified Location Page Implementation Plan

## Overview

Create a universal `/location/[slug]` route that serves as the single destination for all city, town, and area pages. This page will display calculated prayer times and nearby masjids for any UK location, with pre-rendered pages for known cities and areas from `cities.ts`. The existing `/prayer-times/[city]` and `/masjids/[city]` routes will redirect to this unified page.

### Features

- Universal location page at `/location/[slug]` supporting cities, towns, and areas
- Calculated prayer times using UK Moonsighting Committee method
- Dynamic masjid fetching via API for any location
- Pre-rendered pages for known cities and areas (ISR)
- Dynamic rendering for unknown locations via Mapbox geocoding
- 301 redirects from legacy routes (`/prayer-times/[city]`, `/masjids/[city]`, `/masjids/[city]/[area]`)
- SEO-optimized metadata with location-specific keywords
- Conditional UI: full area breakdown for known cities, masjid list for others

## Assumptions

- Mapbox geocoding API will be used for unknown locations (already configured)
- The existing `/api/masjids/nearest` endpoint works for any coordinates
- Prayer times can be calculated for any UK coordinates using the existing `calculatePrayerTimes` function
- Area slugs are unique across all cities (e.g., `east-london` only exists in London)

## Dependencies

- `src/data/cities.ts` - City and area data
- `src/lib/prayer-times-calculator.ts` - Prayer time calculations
- `src/lib/api-client.ts` - `getNearestMasajid` function
- `src/app/api/search/locations/route.ts` - Mapbox forward geocoding
- `src/components/prayer-times/*` - Existing prayer time components
- `next.config.ts` - For redirect configuration

## Risks & Considerations

- **SEO Impact**: Redirects from existing indexed pages need to be 301 (permanent) to preserve SEO value
- **Geocoding Rate Limits**: Unknown locations trigger Mapbox API calls; may need caching
- **Slug Conflicts**: Need to handle case where area slug matches a city name
- **Performance**: Dynamic pages for unknown locations will be slower than pre-rendered

## Phases

- [x] Phase 1: Create location data utilities and types ✅
- [x] Phase 2: Build the unified LocationProfile component ✅
- [x] Phase 3: Create the /location/[slug] route with pre-rendering ✅
- [x] Phase 4: Configure redirects and cleanup legacy routes ✅
