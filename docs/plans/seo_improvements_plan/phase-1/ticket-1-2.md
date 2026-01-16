# Ticket 1-2: Add Metadata Generation for Area Pages

Complexity level: medium

Create metadata generation for area pages to improve SEO with dynamic titles, descriptions, and keywords.

## Actions

### Action 1

Action type: create file

Path: `src/app/masjids/[city]/[area]/metadata.ts`

Description: Create metadata generation with the following structure:

```typescript
import { Metadata } from 'next'
import { cities } from '@/data/cities'

// generateMetadata function that:
// 1. Finds city and area from params
// 2. Returns metadata with:
//    - title: "Masjids in {AreaName}, {CityName} - Prayer Times & Islamic Centers"
//    - description: Dynamic with area description from cities.ts
//    - keywords: Area-specific keywords including:
//      - "masjids in {area}"
//      - "mosques {area}"
//      - "prayer times {area}"
//      - "{area} islamic center"
//      - "masjids near {area}"
//      - Sub-areas mentioned in area description
//    - openGraph: title, description, type: 'website'
//    - canonical: /masjids/{city}/{area}
```

Keywords should include variations:
- `masjids in east london`
- `mosques east london`
- `prayer times east london`
- `east london islamic center`
- `whitechapel mosque` (from area description)

## Checks

- [x] File compiles without TypeScript errors
- [x] Metadata appears correctly in page source
- [x] Title follows format: "Masjids in {Area}, {City} - Prayer Times & Islamic Centers"
- [x] Keywords include area-specific terms

## Coding standards

N/A
