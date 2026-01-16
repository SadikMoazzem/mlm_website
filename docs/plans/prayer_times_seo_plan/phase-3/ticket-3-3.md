# Ticket 3-3: Add ItemList schema with LocalBusiness items to city pages

Complexity level: medium

Add ItemList structured data wrapping LocalBusiness items on city pages for better SEO organization.

## Actions

### Action 1

Action type: create file

Path: src/components/schema/MasjidItemListSchema.tsx

Description: Create component that generates ItemList schema containing multiple masjids

```tsx
import { MasjidData } from '@/types/api'

interface MasjidItemListSchemaProps {
  masjids: MasjidData[]
  listName: string
  listUrl: string
}

export function MasjidItemListSchema({ masjids, listName, listUrl }: MasjidItemListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    url: listUrl,
    numberOfItems: masjids.length,
    itemListElement: masjids.map((masjid, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Mosque',
        '@id': `https://mylocalmasjid.com/masjid/${masjid.id}`,
        name: masjid.name,
        url: `https://mylocalmasjid.com/masjid/${masjid.id}/${encodeURIComponent(masjid.name.toLowerCase().replace(/\s+/g, '-'))}`,
        address: masjid.location ? {
          '@type': 'PostalAddress',
          addressLocality: masjid.location.city,
          addressCountry: 'GB',
        } : undefined,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Action 2

Action type: edit file

Path: src/app/masjids/[city]/page.tsx

Description: Add MasjidItemListSchema to city pages

## Checks

- [x] ItemList schema validates
- [x] Contains correct number of items
- [x] Each item has required Mosque properties

## Coding standards

- docs/coding_standards/react/components.md
- docs/coding_standards/seo/structured-data.md
