# Ticket 2: Add navigation links and update masjids page

Complexity level: low

Add links to the finder from the masjids directory page and ensure navigation flows smoothly.

## Actions

### Action 1: Update masjids directory page

Action type: edit file

Path: `src/app/masjids/page.tsx`

Description: Add a prominent link/button to the map finder in the hero section:

```tsx
// In the hero/header section, add:
<div className="flex flex-wrap gap-4 justify-center mt-6">
  <Link
    href="/masjids/finder"
    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg"
  >
    <Map className="w-5 h-5" />
    Find on Map
  </Link>

  {/* Existing search or other buttons */}
</div>
```

Also add a smaller link in the stats bar or near the search:
```tsx
<Link
  href="/masjids/finder"
  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
>
  <MapPin className="w-4 h-4" />
  Try our interactive map
</Link>
```

### Action 2: Add back link to finder page

Action type: edit file

Path: `src/app/masjids/finder/components/MapHeader.tsx`

Description: Add a back/home button to navigate back to the directory:

```tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// In MapHeader, add before or after search bar:
<Link
  href="/masjids"
  className="p-2 bg-white/90 rounded-full shadow hover:bg-white transition-colors"
  aria-label="Back to directory"
>
  <ArrowLeft className="w-5 h-5 text-gray-600" />
</Link>
```

Or add the logo that links back:
```tsx
<Link href="/" className="flex-shrink-0">
  {/* Logo or icon */}
</Link>
```

### Action 3: Update site navigation (optional)

Action type: edit file

Path: Site navigation component (if exists)

Description: Optionally add "Find Masjids" link to main site navigation that goes to `/masjids/finder`.

## Checks

- "Find on Map" button visible on /masjids page
- Link navigates to /masjids/finder
- Back button on finder returns to /masjids or home
- Navigation works on mobile
- Links are accessible with keyboard

## Coding standards

N/A
