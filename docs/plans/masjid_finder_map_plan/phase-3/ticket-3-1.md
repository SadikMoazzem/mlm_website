# Ticket 1: Create MapHeader component with search trigger

Complexity level: medium

Create the header component that sits at the top of the map with a search bar trigger and space for filter chips. The search bar opens an overlay when clicked.

## Actions

### Action 1: Create MapHeader component

Action type: create file

Path: `src/app/masjids/finder/components/MapHeader.tsx`

Description: Create a header component with:
- Semi-transparent background with backdrop blur
- Search bar input (read-only, opens overlay on click)
- Placeholder for filter chips (added in Phase 4)
- Responsive padding for mobile/desktop
- Safe area handling for notched devices

```tsx
'use client';

import { Search } from 'lucide-react';

interface MapHeaderProps {
  searchValue?: string;
  onSearchClick: () => void;
  children?: React.ReactNode; // For filter chips
}

export default function MapHeader({
  searchValue,
  onSearchClick,
  children,
}: MapHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10">
      {/* Gradient background for readability */}
      <div className="bg-gradient-to-b from-white/90 to-white/0 backdrop-blur-sm pb-8 pt-4 px-4">
        {/* Search trigger */}
        <button
          onClick={onSearchClick}
          className="w-full flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:border-emerald-300 transition-colors"
        >
          <Search className="w-5 h-5 text-gray-400" />
          <span className="flex-1 text-left text-gray-500">
            {searchValue || 'Search for a location...'}
          </span>
        </button>

        {/* Filter chips container */}
        {children && (
          <div className="mt-3 overflow-x-auto scrollbar-hide">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
```

**Styling notes:**
- Use gradient from solid to transparent for smooth transition over map
- Shadow on search bar for depth
- Leave space for safe area at top (handled by parent layout)

## Checks

- Component renders without errors
- Search bar is clickable
- Styling looks good over map background
- Responsive on mobile and desktop

## Coding standards

N/A
