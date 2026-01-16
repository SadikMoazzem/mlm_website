# Ticket 3-2: Add LocalBusiness schema to area pages

Complexity level: medium

Add LocalBusiness structured data for each masjid displayed on area pages (`/masjids/[city]/[area]`).

## Actions

### Action 1

Action type: edit file

Path: src/app/masjids/[city]/[area]/page.tsx

Description: Import and render MasjidLocalBusinessSchema for each masjid in the area

```tsx
import { MasjidLocalBusinessSchema } from '@/components/schema/MasjidLocalBusinessSchema'

// In the component render:
<>
  {/* Schema for each masjid */}
  {masjids.map((masjid) => (
    <MasjidLocalBusinessSchema key={`schema-${masjid.id}`} masjid={masjid} />
  ))}

  {/* Existing page content */}
  ...
</>
```

## Checks

- [ ] Each masjid on area page has LocalBusiness schema
- [ ] Schema renders in page source
- [ ] No duplicate schemas

## Coding standards

- docs/coding_standards/nextjs/app-router.md
- docs/coding_standards/seo/structured-data.md
