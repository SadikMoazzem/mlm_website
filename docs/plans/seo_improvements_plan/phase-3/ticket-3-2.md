# Ticket 3-2: Add BreadcrumbList to Masjid Pages

Complexity level: medium

Add BreadcrumbList structured data to individual masjid pages for better search result display.

## Actions

### Action 1

Action type: edit file

Path: `src/app/masjid/[id]/[name]/page.tsx`

Action: Add BreadcrumbList JSON-LD script

Description: Import and use the schema utility to add breadcrumbs:

```typescript
import { generateBreadcrumbSchema } from '@/lib/schema-utils'

// In the component, generate breadcrumb data:
const breadcrumbData = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Masjids', url: '/masjids' },
  ...(masjidData?.location?.city ? [{
    name: masjidData.location.city,
    url: `/masjids/${masjidData.location.city.toLowerCase().replace(/\s+/g, '-')}`
  }] : []),
  { name: displayName, url: `/masjid/${id}/${name}` }
])

// Add to the page (alongside existing Mosque schema):
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
/>
```

The breadcrumb will show: Home > Masjids > {City} > {MasjidName}

## Checks

- [x] BreadcrumbList schema appears in page source
- [x] Schema validates in Google's Rich Results Test
- [x] Breadcrumb includes city when available
- [x] Existing Mosque schema is not affected

## Coding standards

N/A
