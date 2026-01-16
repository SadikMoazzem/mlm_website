# Ticket 3-4: Add ItemList Schema to Area Pages

Complexity level: medium

Add ItemList structured data to area pages to help Google understand the list of masjids.

## Actions

### Action 1

Action type: edit file

Path: `src/app/masjids/[city]/[area]/page.tsx`

Action: Add ItemList JSON-LD script

Description: After fetching masjids, generate ItemList schema:

```typescript
import { generateItemListSchema } from '@/lib/schema-utils'

// After fetching masjids, create ItemList:
const masjidListItems = masjids.map((masjid, index) => ({
  name: masjid.name,
  url: `/masjid/${masjid.id}/${masjid.name.toLowerCase().replace(/\s+/g, '-')}`,
  position: index + 1
}))

const itemListData = generateItemListSchema(
  masjidListItems,
  `Masjids in ${area.name}, ${city.name}`
)

// Add script tag in JSX (alongside breadcrumb):
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }}
/>
```

The ItemList tells Google: "This page contains a list of {n} masjids in {area}"

## Checks

- [x] ItemList schema appears in page source
- [x] Each masjid is represented as a ListItem
- [x] Position numbers are sequential (1, 2, 3...)
- [x] Schema validates in Google's Rich Results Test

## Coding standards

N/A
