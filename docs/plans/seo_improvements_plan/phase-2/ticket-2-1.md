# Ticket 2-1: Update City Page to Link to Area Pages

Complexity level: medium

Update the city page component to link area cards to the new server-rendered area pages instead of the client-rendered `/masjids/near/...` pages.

## Actions

### Action 1

Action type: edit file

Path: `src/app/masjids/[city]/page.tsx`

Action: Update area card links

Description: Change the Link href from:
```typescript
// Before
href={`/masjids/near/${area.latitude}/${area.longitude}?area=${encodeURIComponent(area.name)}&city=${encodeURIComponent(city.name)}&country=${encodeURIComponent(city.country)}&source=area`}

// After
href={`/masjids/${city.id}/${area.id}`}
```

This simplifies the URL structure and points to the pre-rendered area pages.

### Action 2

Action type: edit file

Path: `src/app/masjids/[city]/page.tsx`

Action: Update "View all masjids" link if present

Description: If there's a "view all" link at the city level, it should link to the client-rendered nearby page with city coordinates:
```typescript
href={`/masjids/near/${city.latitude}/${city.longitude}?city=${encodeURIComponent(city.name)}&source=city`}
```

## Checks

- [x] Area cards link to `/masjids/{city}/{area}` format
- [x] Links work correctly and navigate to area pages
- [x] No broken links on city page

## Coding standards

N/A
