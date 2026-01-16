# Ticket 2-2: Enhance City Page Metadata

Complexity level: medium

Improve city page metadata with more comprehensive keywords including all area names and prayer time related terms.

## Actions

### Action 1

Action type: edit file

Path: `src/app/masjids/[city]/page.tsx`

Action: Update generateMetadata function

Description: Enhance the metadata with additional keywords:

```typescript
// Current keywords are basic, enhance to include:
keywords: [
  // Primary location keywords
  `masjids in ${city.name}`,
  `mosques in ${city.name}`,
  `${city.name} mosques`,
  `${city.name} masjids`,

  // Prayer times keywords (high search volume)
  `prayer times ${city.name}`,
  `${city.name} prayer times`,
  `jamaat times ${city.name}`,
  `salah times ${city.name}`,

  // All area names (from cities.ts areas)
  ...city.areas.map(area => `masjids ${area.name}`),
  ...city.areas.map(area => `mosques ${area.name}`),
  ...city.areas.map(area => `${area.name} prayer times`),

  // Near me variations
  `masjids near ${city.name}`,
  `mosques near me ${city.name}`,
  `nearest mosque ${city.name}`,

  // Islamic center variations
  `islamic centers ${city.name}`,
  `muslim community ${city.name}`,
],
```

Also update description to be more SEO-friendly:
```typescript
description: `Find ${totalMasjids}+ masjids and Islamic centers across ${city.areas.length} areas in ${city.name}. Get prayer times, jamaat times, facilities info and directions.`
```

## Checks

- [x] Keywords include all area names
- [x] Keywords include prayer time variations
- [x] Description includes masjid count
- [x] Metadata compiles without errors

## Coding standards

N/A
