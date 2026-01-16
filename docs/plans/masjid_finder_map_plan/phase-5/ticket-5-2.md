# Ticket 2: Create mobile bottom sheet with Vaul

Complexity level: high

Create a mobile bottom sheet using Vaul that shows the list of nearby masjids with drag-to-expand functionality.

## Actions

### Action 1: Create MasjidBottomSheet component

Action type: create file

Path: `src/app/masjids/finder/components/MasjidBottomSheet.tsx`

Description: Create a bottom sheet using Vaul with:
- Collapsed state showing count
- Expanded state showing list
- Drag handle for resizing
- Snap points (collapsed, half, full)

```tsx
'use client';

import { Drawer } from 'vaul';
import { MasjidFeature, Coordinates } from '../types';
import MasjidListCard from './MasjidListCard';

interface MasjidBottomSheetProps {
  masjids: MasjidFeature[];
  center: Coordinates | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onHover?: (id: string | null) => void;
}

export default function MasjidBottomSheet({
  masjids,
  center,
  selectedId,
  onSelect,
  onHover,
}: MasjidBottomSheetProps) {
  return (
    <Drawer.Root
      open={true}
      modal={false}
      snapPoints={[0.15, 0.5, 0.9]}
      activeSnapPoint={0.15}
      setActiveSnapPoint={() => {}}
    >
      <Drawer.Portal>
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-20 flex flex-col bg-white rounded-t-2xl shadow-2xl"
          style={{ maxHeight: '90vh' }}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="px-4 pb-3 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              {masjids.length} {masjids.length === 1 ? 'Masjid' : 'Masjids'} Nearby
            </h2>
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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

**Vaul configuration notes:**
- `modal={false}` keeps the map interactive
- Snap points: 15% (collapsed), 50% (half), 90% (full)
- Non-dismissible (always open)
- Drag to expand/collapse

### Action 2: Handle snap point state

Action type: included in Action 1

Description: Implement controlled snap points:
- Store active snap point in local state
- Collapse when map is panned
- Expand to half when masjid is selected

## Checks

- Bottom sheet renders at bottom of screen
- Drag handle allows resizing
- Snap points work correctly
- List scrolls when expanded
- Selecting a masjid expands sheet
- Empty state shows when no masjids
- Does not block map interactions when collapsed

## Coding standards

N/A
