# Ticket 3: Create desktop side panel

Complexity level: medium

Create a fixed side panel for desktop that shows the list of nearby masjids.

## Actions

### Action 1: Create MasjidSidePanel component

Action type: create file

Path: `src/app/masjids/finder/components/MasjidSidePanel.tsx`

Description: Create a desktop side panel:

```tsx
'use client';

import { MasjidFeature, Coordinates } from '../types';
import MasjidListCard from './MasjidListCard';

interface MasjidSidePanelProps {
  masjids: MasjidFeature[];
  center: Coordinates | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onHover?: (id: string | null) => void;
}

export default function MasjidSidePanel({
  masjids,
  center,
  selectedId,
  onSelect,
  onHover,
}: MasjidSidePanelProps) {
  return (
    <div className="absolute top-0 right-0 bottom-0 w-[400px] bg-white border-l border-gray-200 flex flex-col z-10">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100 bg-white">
        <h2 className="text-lg font-semibold text-gray-900">
          {masjids.length} {masjids.length === 1 ? 'Masjid' : 'Masjids'} Nearby
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          In visible map area
        </p>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {masjids.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No masjids found in this area</p>
            <p className="text-sm mt-1">Try zooming out or searching a different location</p>
          </div>
        ) : (
          masjids.map((masjid) => (
            <MasjidListCard
              key={masjid.id}
              masjid={masjid}
              center={center}
              isSelected={masjid.id === selectedId}
              onClick={() => onSelect(masjid.id)}
              onMouseEnter={() => onHover?.(masjid.id)}
              onMouseLeave={() => onHover?.(null)}
            />
          ))
        )}
      </div>
    </div>
  );
}
```

**Layout notes:**
- Fixed 400px width on right side
- Full height minus any header space
- Separate scroll from main page
- Header stays fixed while list scrolls

### Action 2: Adjust map container for side panel

Action type: edit file

Path: `src/app/masjids/finder/page.tsx`

Description: Adjust the layout so the map takes remaining space when side panel is visible:

```tsx
// In FinderContent
return (
  <div className="h-full w-full relative">
    {/* Map - full width on mobile, account for panel on desktop */}
    <div className="h-full w-full lg:pr-[400px]">
      <MasjidFinderMap ... />
    </div>

    {/* Desktop side panel */}
    <div className="hidden lg:block">
      <MasjidSidePanel ... />
    </div>

    {/* Mobile bottom sheet */}
    <div className="lg:hidden">
      <MasjidBottomSheet ... />
    </div>
  </div>
);
```

## Checks

- Side panel only shows on desktop (lg breakpoint)
- Panel is 400px wide on right side
- List scrolls independently
- Map adjusts width to fit alongside panel
- Hover on card highlights marker (if implemented)
- Empty state displays correctly

## Coding standards

N/A
