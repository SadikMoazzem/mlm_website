# Ticket 4: Integrate search and GPS with page

Complexity level: medium

Wire up the search overlay, GPS button, and header with the main page and context.

## Actions

### Action 1: Update page with search and GPS

Action type: edit file

Path: `src/app/masjids/finder/page.tsx`

Description: Update the finder page to include:
- MapHeader with search trigger
- LocationSearchOverlay (controlled open/close state)
- GPSButton with geolocation handling
- Context integration for setting center

```tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MasjidsMapProvider, useMasjidsMap } from './context/MasjidsMapContext';
import MapLoadingSkeleton from './components/MapLoadingSkeleton';
import MapHeader from './components/MapHeader';
import LocationSearchOverlay from './components/LocationSearchOverlay';
import GPSButton from './components/GPSButton';
import { useGeolocation } from './hooks/useGeolocation';

const MasjidFinderMap = dynamic(
  () => import('./components/MasjidFinderMap'),
  { ssr: false, loading: () => <MapLoadingSkeleton /> }
);

function FinderContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getCurrentPosition, isLoading: isGPSLoading } = useGeolocation();

  const {
    center,
    filterExpression,
    selectedMasjidId,
    searchedLocation,
    selectMasjid,
    setCenter,
    clearSearchedLocation,
    updateVisibleMasjids,
  } = useMasjidsMap();

  const handleSearchSelect = (location: {
    name: string;
    coordinates: { latitude: number; longitude: number };
  }) => {
    setCenter(location.coordinates, location.name);
    setIsSearchOpen(false);
  };

  const handleGPSClick = async () => {
    const coords = await getCurrentPosition();
    if (coords) {
      setCenter(coords);
      clearSearchedLocation(); // Remove any search pin
    }
  };

  return (
    <div className="h-full w-full relative">
      {/* Header */}
      <MapHeader
        searchValue={searchedLocation?.name}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Map */}
      <MasjidFinderMap
        center={center}
        filterExpression={filterExpression}
        selectedMasjidId={selectedMasjidId}
        searchedLocation={searchedLocation}
        onMarkerClick={selectMasjid}
        onMapIdle={(newCenter, visibleMasjids) => {
          updateVisibleMasjids(visibleMasjids);
        }}
      />

      {/* GPS Button */}
      <GPSButton
        onClick={handleGPSClick}
        isLoading={isGPSLoading}
        className="absolute bottom-24 right-4 z-10"
      />

      {/* Search Overlay */}
      <LocationSearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={handleSearchSelect}
      />
    </div>
  );
}

export default function MasjidFinderPage() {
  return (
    <MasjidsMapProvider>
      <FinderContent />
    </MasjidsMapProvider>
  );
}
```

### Action 2: Initialize map with user location on first visit

Action type: edit file

Path: `src/app/masjids/finder/context/MasjidsMapContext.tsx`

Description: Add initialization logic that:
- On first load, attempt to get user location
- If granted, center map on user
- If denied or unavailable, use UK default center
- Track initialization state

Add to context provider:
```typescript
// Auto-initialize with user location on mount
useEffect(() => {
  if (state.isInitialized) return;

  // Try to get location, fallback to UK center
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: 'SET_CENTER',
          payload: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
        dispatch({ type: 'SET_INITIALIZED', payload: true });
      },
      () => {
        // Permission denied or error - use default
        dispatch({ type: 'SET_INITIALIZED', payload: true });
      },
      { timeout: 5000 }
    );
  } else {
    dispatch({ type: 'SET_INITIALIZED', payload: true });
  }
}, [state.isInitialized]);
```

## Checks

- Search overlay opens when clicking search bar
- Search results are displayed and selectable
- Selecting search result centers map and shows pin
- GPS button triggers geolocation
- Map centers on user location after GPS click
- Default UK view shows if geolocation fails
- All interactions work on mobile

## Coding standards

N/A
