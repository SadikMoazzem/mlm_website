# Ticket 1: Add deep linking support (URL params)

Complexity level: medium

Implement URL parameter handling for sharing specific locations, selected masjids, and filter states.

## Actions

### Action 1: Create useUrlParams hook

Action type: create file

Path: `src/app/masjids/finder/hooks/useUrlParams.ts`

Description: Create a hook to read and update URL parameters:

```typescript
'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Coordinates, ActiveFilters } from '../types';

interface UrlState {
  center: Coordinates | null;
  zoom: number | null;
  masjidId: string | null;
  filters: ActiveFilters;
}

export function useUrlParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse URL params
  const urlState = useMemo((): UrlState => {
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const zoom = searchParams.get('zoom');
    const masjidId = searchParams.get('masjid');
    const filterStr = searchParams.get('filters');

    let center: Coordinates | null = null;
    if (lat && lng) {
      center = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
      };
    }

    let filters: ActiveFilters = {};
    if (filterStr) {
      const filterList = filterStr.split(',');
      if (filterList.includes('womensArea')) filters.womensArea = true;
      if (filterList.includes('parking')) filters.parking = true;
      // Parse madhab and type if present
      const madhab = filterList.find(f => f.startsWith('madhab:'));
      if (madhab) filters.madhab = madhab.split(':')[1];
      const type = filterList.find(f => f.startsWith('type:'));
      if (type) filters.type = type.split(':')[1];
    }

    return {
      center,
      zoom: zoom ? parseInt(zoom) : null,
      masjidId,
      filters,
    };
  }, [searchParams]);

  // Update URL params
  const updateUrl = useCallback((updates: Partial<{
    center: Coordinates;
    zoom: number;
    masjidId: string | null;
    filters: ActiveFilters;
  }>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.center) {
      params.set('lat', updates.center.latitude.toFixed(4));
      params.set('lng', updates.center.longitude.toFixed(4));
    }

    if (updates.zoom !== undefined) {
      params.set('zoom', updates.zoom.toString());
    }

    if (updates.masjidId !== undefined) {
      if (updates.masjidId) {
        params.set('masjid', updates.masjidId);
      } else {
        params.delete('masjid');
      }
    }

    if (updates.filters !== undefined) {
      const filterParts: string[] = [];
      if (updates.filters.womensArea) filterParts.push('womensArea');
      if (updates.filters.parking) filterParts.push('parking');
      if (updates.filters.madhab) filterParts.push(`madhab:${updates.filters.madhab}`);
      if (updates.filters.type) filterParts.push(`type:${updates.filters.type}`);

      if (filterParts.length > 0) {
        params.set('filters', filterParts.join(','));
      } else {
        params.delete('filters');
      }
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  return { urlState, updateUrl };
}
```

### Action 2: Integrate URL params with context

Action type: edit file

Path: `src/app/masjids/finder/page.tsx`

Description: Add URL param initialization and synchronization:

```tsx
import { useUrlParams } from './hooks/useUrlParams';

function FinderContent() {
  const { urlState, updateUrl } = useUrlParams();

  // Initialize from URL on mount
  useEffect(() => {
    if (urlState.center) {
      setCenter(urlState.center);
    }
    if (urlState.masjidId) {
      selectMasjid(urlState.masjidId);
    }
    if (Object.keys(urlState.filters).length > 0) {
      // Apply filters from URL
      Object.entries(urlState.filters).forEach(([key, value]) => {
        setFilter(key as keyof ActiveFilters, value);
      });
    }
  }, []); // Only on mount

  // Update URL when selection changes (optional - for sharing)
  useEffect(() => {
    if (selectedMasjidId) {
      updateUrl({ masjidId: selectedMasjidId });
    }
  }, [selectedMasjidId]);

  // ... rest of component
}
```

## Checks

- URL params are read correctly on page load
- Map centers on lat/lng from URL
- Masjid is selected from URL param
- Filters are applied from URL
- URL updates when masjid is selected
- Sharing URL opens page with correct state
- Browser back/forward works correctly

## Coding standards

N/A
