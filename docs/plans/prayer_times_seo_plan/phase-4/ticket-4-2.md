# Ticket 4-2: Handle ?search= query param on /masjids page for SearchAction

Complexity level: medium

Enable the /masjids page to handle incoming `?search=` query parameters from Google's SearchAction sitelinks search box.

## Actions

### Action 1

Action type: edit file

Path: src/components/search/LocationSearch.tsx

Description: Add prop to accept initial search value and auto-trigger search

```tsx
interface LocationSearchProps {
  placeholder?: string
  className?: string
  onSelect?: (result: LocationSearchResult) => void
  initialQuery?: string // NEW: for SearchAction support
}

// In component:
useEffect(() => {
  if (initialQuery && initialQuery.length >= 2) {
    setQuery(initialQuery)
    searchLocations(initialQuery)
  }
}, [initialQuery])
```

### Action 2

Action type: edit file

Path: src/app/masjids/page.tsx

Description: Convert to client component that reads search params, or create a wrapper

Option A - Client wrapper:
```tsx
// Create src/app/masjids/MasjidsPageContent.tsx (client component)
'use client'
import { useSearchParams } from 'next/navigation'

export default function MasjidsPageContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  return (
    // ... existing content
    <LocationSearch initialQuery={searchQuery} />
  )
}
```

Option B - Use Suspense boundary for searchParams (recommended for Next.js 15):
```tsx
import { Suspense } from 'react'
import MasjidsContent from './MasjidsContent'

export default function MasjidsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MasjidsContent />
    </Suspense>
  )
}
```

## Checks

- [ ] `/masjids?search=east+london` auto-populates search box
- [ ] Search results dropdown opens automatically
- [ ] Works with URL-encoded special characters
- [ ] Page still works without search param

## Coding standards

- docs/coding_standards/nextjs/app-router.md
- docs/coding_standards/react/hooks.md
