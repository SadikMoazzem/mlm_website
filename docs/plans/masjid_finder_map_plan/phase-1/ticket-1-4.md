# Ticket 4: Create finder page with full-screen layout

Complexity level: medium

Create the main finder page at `/masjids/finder` with a full-screen layout. This page renders the map component and sets up the basic structure for the header, list panel, and other UI elements to be added in later phases.

## Actions

### Action 1: Create page layout

Action type: create file

Path: `src/app/masjids/finder/layout.tsx`

Description: Create a layout file that removes the standard header/footer for a full-screen map experience:

```typescript
export default function FinderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      {children}
    </div>
  );
}
```

### Action 2: Create finder page

Action type: create file

Path: `src/app/masjids/finder/page.tsx`

Description: Create the main finder page that:
- Uses dynamic import for MasjidFinderMap (SSR disabled)
- Shows a loading state while map loads
- Sets up the basic page structure with placeholder areas for header and list panel
- Adds metadata for SEO

Key structure:
```tsx
'use client';

import dynamic from 'next/dynamic';

const MasjidFinderMap = dynamic(
  () => import('./components/MasjidFinderMap'),
  {
    ssr: false,
    loading: () => <MapLoadingSkeleton />
  }
);

export default function MasjidFinderPage() {
  return (
    <div className="h-full w-full relative">
      {/* Header placeholder - Phase 3 */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        {/* LocationSearch and FilterChips go here */}
      </div>

      {/* Map */}
      <MasjidFinderMap />

      {/* List panel placeholder - Phase 5 */}
      {/* GPS button placeholder - Phase 3 */}
    </div>
  );
}
```

### Action 3: Create loading skeleton

Action type: create file

Path: `src/app/masjids/finder/components/MapLoadingSkeleton.tsx`

Description: Create a loading skeleton component shown while the map is loading:

```tsx
export default function MapLoadingSkeleton() {
  return (
    <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  );
}
```

### Action 4: Add link from masjids directory page

Action type: edit file

Path: `src/app/masjids/page.tsx`

Description: Add a prominent link/button to the new finder page from the existing masjids directory. Add a "Try Map View" or "Find on Map" button near the search bar or in the hero section.

## Checks

- Page loads at `/masjids/finder` without errors
- Loading skeleton appears briefly before map renders
- Map renders full-screen with no scrollbars
- No SSR errors in console
- Link to finder is visible on `/masjids` page
- Build completes successfully

## Coding standards

N/A
