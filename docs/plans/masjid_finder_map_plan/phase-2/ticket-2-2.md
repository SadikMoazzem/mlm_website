# Ticket 2: Create useVisibleMasjids hook

Complexity level: medium

Create a custom hook that queries the map's rendered features to get the list of visible masjids. This hook updates when the map stops moving and provides the data for the list panel.

## Actions

### Action 1: Create useVisibleMasjids hook

Action type: create file

Path: `src/app/masjids/finder/hooks/useVisibleMasjids.ts`

Description: Create a hook that:
- Takes a Mapbox map instance ref as input
- Queries rendered features from the tileset layers when map becomes idle
- Converts GeoJSON features to MasjidFeature objects
- Sorts results by distance from map center
- Deduplicates by ID
- Returns `{ visibleMasjids, visibleCount, refreshVisibleMasjids, isLoading }`

Key implementation:

```typescript
import { useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MasjidFeature, Coordinates } from '../types';
import { LAYER_IDS } from '../config/mapboxTilesetConfig';

// Haversine distance calculation
function getDistance(a: Coordinates, b: Coordinates): number {
  // ... implementation
}

export function useVisibleMasjids(mapRef: React.RefObject<mapboxgl.Map | null>) {
  const [visibleMasjids, setVisibleMasjids] = useState<MasjidFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshVisibleMasjids = useCallback((center: Coordinates) => {
    const map = mapRef.current;
    if (!map) return;

    setIsLoading(true);

    try {
      // Query features from both POINTS and SYMBOLS layers
      const features = map.queryRenderedFeatures(undefined, {
        layers: [LAYER_IDS.POINTS, LAYER_IDS.SYMBOLS],
      });

      // Convert to MasjidFeature and dedupe
      const masjidMap = new Map<string, MasjidFeature>();

      features.forEach((feature) => {
        const props = feature.properties;
        if (!props?.id || masjidMap.has(props.id)) return;

        const coords = (feature.geometry as GeoJSON.Point).coordinates;
        masjidMap.set(props.id, {
          id: props.id,
          name: props.name || 'Unknown',
          type: props.type || 'masjid',
          madhab: props.madhab,
          has_women_area: props.has_women_area,
          has_parking: props.has_parking,
          address: props.address,
          city: props.city,
          coordinates: { latitude: coords[1], longitude: coords[0] },
        });
      });

      // Sort by distance from center
      const sorted = Array.from(masjidMap.values()).sort((a, b) => {
        return getDistance(center, a.coordinates) - getDistance(center, b.coordinates);
      });

      setVisibleMasjids(sorted);
    } finally {
      setIsLoading(false);
    }
  }, [mapRef]);

  return {
    visibleMasjids,
    visibleCount: visibleMasjids.length,
    refreshVisibleMasjids,
    isLoading,
  };
}
```

### Action 2: Add Haversine distance utility

Action type: create file

Path: `src/app/masjids/finder/utils/geo.ts`

Description: Create a utility file with geographic calculations:

```typescript
import { Coordinates } from '../types';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @returns Distance in kilometers
 */
export function getDistanceKm(a: Coordinates, b: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const x = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));

  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Format distance for display
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)}km`;
}
```

## Checks

- Hook compiles without TypeScript errors
- `refreshVisibleMasjids` queries map features correctly
- Results are sorted by distance
- No duplicate masjids in output
- Distance calculations are accurate

## Coding standards

N/A
