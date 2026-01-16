# Ticket 1-1: Create Area Page Route and Component

Complexity level: high

Create the server-rendered area page at `/masjids/[city]/[area]/page.tsx` that fetches and displays masjids for a specific area.

## Actions

### Action 1

Action type: create file

Path: `src/app/masjids/[city]/[area]/page.tsx`

Description: Create the area page component with the following structure:

```typescript
// Key elements to implement:
// 1. Import cities data and api-client
// 2. Validate city and area exist in cities.ts
// 3. Fetch masjids using getNearestMasajid with area coordinates
// 4. Render page with:
//    - Breadcrumb navigation (Find Masjids > City > Area)
//    - H1: "Masjids in {AreaName}, {CityName}"
//    - Description paragraph with area context
//    - List of masjids (top 15) with name, address, distance
//    - "View all masjids" link to /masjids/near/[lat]/[lng]
// 5. ISR: export const revalidate = 604800 (7 days)
// 6. export const dynamicParams = false (only pre-defined areas)
```

Key imports:
- `cities` from `@/data/cities`
- `apiClient` from `@/lib/api-client`
- `notFound` from `next/navigation`
- `Link` from `next/link`
- Icons from `lucide-react`

## Checks

- [x] File compiles without TypeScript errors
- [x] Route is accessible at `/masjids/london/east-london`
- [x] Page renders masjid list from API
- [x] 404 returned for invalid city/area combinations
- [x] Breadcrumb navigation works

## Coding standards

N/A - No coding standards directory found
