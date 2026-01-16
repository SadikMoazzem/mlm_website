# Ticket 3-3: Add BreadcrumbList to City and Area Pages

Complexity level: medium

Add BreadcrumbList structured data to city pages (`/masjids/[city]`) and area pages (`/masjids/[city]/[area]`).

## Actions

### Action 1

Action type: edit file

Path: `src/app/masjids/[city]/page.tsx`

Action: Add BreadcrumbList JSON-LD script

Description: Add breadcrumb schema for city pages:

```typescript
import { generateBreadcrumbSchema } from '@/lib/schema-utils'

// Generate breadcrumb:
const breadcrumbData = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Masjids', url: '/masjids' },
  { name: city.name, url: `/masjids/${city.id}` }
])

// Add script tag in JSX
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
/>
```

### Action 2

Action type: edit file

Path: `src/app/masjids/[city]/[area]/page.tsx`

Action: Add BreadcrumbList JSON-LD script

Description: Add breadcrumb schema for area pages:

```typescript
const breadcrumbData = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Masjids', url: '/masjids' },
  { name: city.name, url: `/masjids/${city.id}` },
  { name: area.name, url: `/masjids/${city.id}/${area.id}` }
])
```

## Checks

- [x] BreadcrumbList schema appears on city pages
- [x] BreadcrumbList schema appears on area pages
- [x] Schemas validate in Google's Rich Results Test
- [x] Breadcrumb hierarchy is correct (Home > Masjids > City > Area)

## Coding standards

N/A
