# Ticket 5: Integrate list and detail with page

Complexity level: medium

Wire up the list panels and detail card with the main page, including responsive switching between mobile and desktop views.

## Actions

### Action 1: Update page layout with responsive panels

Action type: edit file

Path: `src/app/masjids/finder/page.tsx`

Description: Add the list panels and detail card to the page with responsive switching:

```tsx
'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { MasjidsMapProvider, useMasjidsMap } from './context/MasjidsMapContext';
import MapLoadingSkeleton from './components/MapLoadingSkeleton';
import MapHeader from './components/MapHeader';
import LocationSearchOverlay from './components/LocationSearchOverlay';
import GPSButton from './components/GPSButton';
import FilterChips from './components/FilterChips';
import MasjidBottomSheet from './components/MasjidBottomSheet';
import MasjidSidePanel from './components/MasjidSidePanel';
import MasjidDetailCard from './components/MasjidDetailCard';
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
    activeFilters,
    visibleMasjids,
    visibleCount,
    selectMasjid,
    setCenter,
    clearSearchedLocation,
    setFilter,
    clearFilters,
    updateVisibleMasjids,
  } = useMasjidsMap();

  // Find the selected masjid from visible masjids
  const selectedMasjid = useMemo(() => {
    if (!selectedMasjidId) return null;
    return visibleMasjids.find((m) => m.id === selectedMasjidId) || null;
  }, [selectedMasjidId, visibleMasjids]);

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
      clearSearchedLocation();
    }
  };

  const handleMarkerClick = (id: string) => {
    selectMasjid(id);
  };

  const handleCloseDetail = () => {
    selectMasjid(null);
  };

  return (
    <div className="h-full w-full relative">
      {/* Header with search and filters */}
      <MapHeader
        searchValue={searchedLocation?.name}
        onSearchClick={() => setIsSearchOpen(true)}
      >
        <FilterChips
          filters={activeFilters}
          onFilterChange={setFilter}
          onClearAll={clearFilters}
          visibleCount={visibleCount}
        />
      </MapHeader>

      {/* Map - adjust for side panel on desktop */}
      <div className="h-full w-full lg:pr-[400px]">
        <MasjidFinderMap
          center={center}
          filterExpression={filterExpression}
          selectedMasjidId={selectedMasjidId}
          searchedLocation={searchedLocation}
          onMarkerClick={handleMarkerClick}
          onMapIdle={(newCenter, masjids) => {
            updateVisibleMasjids(masjids);
          }}
          onMapInteraction={() => {
            // Optionally deselect when panning
          }}
        />
      </div>

      {/* GPS Button - position above bottom sheet on mobile */}
      <GPSButton
        onClick={handleGPSClick}
        isLoading={isGPSLoading}
        className="absolute bottom-36 right-4 z-10 lg:bottom-8 lg:right-[416px]"
      />

      {/* Desktop: Side panel */}
      <div className="hidden lg:block">
        <MasjidSidePanel
          masjids={visibleMasjids}
          center={center}
          selectedId={selectedMasjidId}
          onSelect={handleMarkerClick}
        />
      </div>

      {/* Mobile: Bottom sheet */}
      <div className="lg:hidden">
        <MasjidBottomSheet
          masjids={visibleMasjids}
          center={center}
          selectedId={selectedMasjidId}
          onSelect={handleMarkerClick}
        />
      </div>

      {/* Detail card - shows when masjid is selected */}
      {selectedMasjid && (
        <div className="absolute bottom-44 left-4 right-4 z-20 lg:bottom-auto lg:top-24 lg:left-4 lg:right-auto">
          <MasjidDetailCard
            masjid={selectedMasjid}
            center={center}
            onClose={handleCloseDetail}
          />
        </div>
      )}

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

### Action 2: Add page metadata

Action type: edit file

Path: `src/app/masjids/finder/page.tsx`

Description: Export metadata for SEO:

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Masjids Near You | My Local Masjid',
  description: 'Discover masjids, mosques, and prayer halls near your location with our interactive map. View prayer times, facilities, and get directions.',
  openGraph: {
    title: 'Find Masjids Near You | My Local Masjid',
    description: 'Discover masjids near your location with our interactive map.',
  },
};
```

Note: Since page uses 'use client', metadata needs to be in a separate route segment or layout.

## Checks

- Desktop shows side panel on right
- Mobile shows bottom sheet
- Clicking marker selects masjid and shows detail
- Detail card appears in correct position
- Closing detail card deselects masjid
- List updates when filters change
- GPS button positioned correctly on both layouts
- All components receive correct props from context

## Coding standards

N/A
