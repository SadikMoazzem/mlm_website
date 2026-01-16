# Masjid Finder Map Implementation Plan

## Overview

Build a Google Maps-like interactive masjid finder interface at `/masjids/finder`. This will provide a full-screen map experience with location search, filtering, and a responsive bottom sheet (mobile) / side panel (desktop) for browsing nearby masjids. The implementation leverages the existing Mapbox tileset (`mlmadmin.uk-masjids`) used in app-v2 for efficient rendering of thousands of markers.

### Features

- Full-screen interactive Mapbox GL JS map with masjid markers from tileset
- Location search with Mapbox geocoding (reuse existing `LocationSearch` component pattern)
- Filter chips for Women's Area, Parking, Madhab, and Type
- Responsive layout: bottom sheet on mobile, side panel on desktop
- GPS button to center on user location
- Masjid detail card with prayer times (on selection)
- Deep linking support for sharing locations

## Assumptions

- Mapbox tileset `mlmadmin.uk-masjids` is accessible and contains all required properties (`id`, `name`, `type`, `madhab`, `has_women_area`, `has_parking`, `address`, `city`)
- `mapbox-gl` v3.17.0 is already installed and working
- Browser geolocation API will be used for user location
- Prayer times will be fetched on-demand when a masjid is selected (not in list view)
- The existing `/api/search/locations` endpoint handles Mapbox geocoding

## Dependencies

- Existing: `mapbox-gl` (v3.17.0), `framer-motion`, `lucide-react`
- New: `vaul` (for mobile bottom sheet drawer)
- Existing components: `LocationSearch` pattern, `MapboxMap` patterns
- API: `/api/search/locations`, `/api/masjids/nearest`, existing prayer times endpoints
- Tileset: `mapbox://mlmadmin.uk-masjids` (source layer: `masjids`)

## Risks & Considerations

- **Tileset access**: Ensure Mapbox access token has permission to read the tileset. Mitigation: Test early in Phase 1.
- **Performance**: Querying visible features on every map move could be expensive. Mitigation: Debounce and limit queries.
- **Geolocation permissions**: Users may deny location access. Mitigation: Default to UK overview, prompt to search.
- **Mobile UX**: Bottom sheet interactions must feel native. Mitigation: Use Vaul library with proper snap points.
- **SSR compatibility**: Mapbox GL JS doesn't work server-side. Mitigation: Use dynamic imports with `ssr: false`.

## Phases

- [ ] Phase 1: Project Setup & Core Map
- [ ] Phase 2: State Management & Map Integration
- [ ] Phase 3: Location Search & GPS
- [ ] Phase 4: Filtering System
- [ ] Phase 5: Masjid List & Detail Cards
- [ ] Phase 6: Polish & Navigation Integration
