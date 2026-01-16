# Ticket 3: Create MasjidFinderMap component with tileset rendering

Complexity level: high

Create the core map component that renders the Mapbox map with masjid markers from the tileset. This component handles map initialization, tileset layers, marker styling, and basic interactions.

## Actions

### Action 1: Create MasjidFinderMap component

Action type: create file

Path: `src/app/masjids/finder/components/MasjidFinderMap.tsx`

Description: Create the main map component using Mapbox GL JS. This component:
- Initializes Mapbox map with proper access token
- Adds vector source from tileset URL
- Renders CircleLayer for halls and SymbolLayer for masjids
- Handles marker click events
- Exposes flyTo method via ref
- Supports dynamic filter expressions

Key implementation details:
- Use `'use client'` directive
- Initialize map in useEffect with cleanup
- Add layers after map 'load' event
- Use mosque marker icon (can be inline SVG or loaded image)
- Support `filterExpression` prop for dynamic filtering
- Support `selectedMasjidId` prop for highlighting selected marker
- Call `onMarkerClick` when a marker is clicked
- Call `onMapMove` when map finishes moving (for updating visible masjids)

Reference the existing `src/components/map/MapboxMap.tsx` for patterns but extend significantly for tileset support.

### Action 2: Create map types file

Action type: create file

Path: `src/app/masjids/finder/types.ts`

Description: Create TypeScript types for the finder feature:

```typescript
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MasjidFeature {
  id: string;
  name: string;
  type: 'masjid' | 'hall' | 'musalla' | 'community_center';
  madhab?: 'hanafi' | 'shafi' | 'maliki' | 'hanbali';
  has_women_area?: boolean;
  has_parking?: boolean;
  address?: string;
  city?: string;
  coordinates: Coordinates;
}

export interface ActiveFilters {
  womensArea?: boolean;
  parking?: boolean;
  madhab?: string;
  type?: string;
}

export type FilterExpression = any[]; // Mapbox expression

export interface SearchedLocation {
  name: string;
  coordinates: Coordinates;
}
```

## Checks

- Component renders without errors
- Map displays with UK-centered view
- Tileset markers are visible when zoomed in
- No console errors related to Mapbox
- TypeScript compiles without errors

## Coding standards

N/A
