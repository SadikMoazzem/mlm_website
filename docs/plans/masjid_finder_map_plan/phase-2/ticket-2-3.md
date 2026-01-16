# Ticket 3: Integrate context with map component

Complexity level: medium

Connect the MasjidsMapContext to the map component and page, establishing the data flow between state and UI.

## Actions

### Action 1: Wrap page with MasjidsMapProvider

Action type: edit file

Path: `src/app/masjids/finder/page.tsx`

Description: Update the finder page to:
- Wrap content with `MasjidsMapProvider`
- Pass context values to map component
- Handle map events and update context

```tsx
'use client';

import dynamic from 'next/dynamic';
import { MasjidsMapProvider, useMasjidsMap } from './context/MasjidsMapContext';
import MapLoadingSkeleton from './components/MapLoadingSkeleton';

const MasjidFinderMap = dynamic(
  () => import('./components/MasjidFinderMap'),
  { ssr: false, loading: () => <MapLoadingSkeleton /> }
);

function FinderContent() {
  const {
    center,
    filterExpression,
    selectedMasjidId,
    searchedLocation,
    selectMasjid,
    setCenter,
    updateVisibleMasjids,
  } = useMasjidsMap();

  return (
    <div className="h-full w-full relative">
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

### Action 2: Update MasjidFinderMap props and callbacks

Action type: edit file

Path: `src/app/masjids/finder/components/MasjidFinderMap.tsx`

Description: Update the map component to:
- Accept `center`, `filterExpression`, `selectedMasjidId`, `searchedLocation` props
- Apply filter expression to layers when it changes
- Highlight selected marker (larger size, different color)
- Show search pin when `searchedLocation` is set
- Call `onMapIdle` callback when map stops moving
- Use `useVisibleMasjids` hook to query features and pass to callback

Key updates:
- Add useEffect to update layer filters when `filterExpression` changes
- Add useEffect to fly to `center` when it changes
- Update layer paint for selected state
- Add marker for searched location

### Action 3: Test integration

Action type: manual verification

Description: Verify:
- Map renders with default UK center
- Clicking a marker updates `selectedMasjidId` in context
- Changing filters updates markers on map
- Map idle event updates visible masjids list

## Checks

- Page renders without errors
- Context values flow to map component
- Marker click updates selection state
- Filter expression applies to map layers
- Console shows no errors

## Coding standards

N/A
