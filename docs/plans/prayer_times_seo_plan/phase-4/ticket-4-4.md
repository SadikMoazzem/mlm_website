# Ticket 4-4: Update sitemap to include city prayer times pages

Complexity level: low

Add the new city prayer times pages to the sitemap for search engine discovery.

## Actions

### Action 1

Action type: edit file

Path: src/app/sitemap.ts

Description: Add prayer times city pages to sitemap

```typescript
import { TOP_UK_CITIES } from '@/lib/prayer-times-calculator'

// In the sitemap generation function, add:
const prayerTimesCityPages = TOP_UK_CITIES.map((city) => ({
  url: `${baseUrl}/prayer-times/${city}`,
  lastModified: new Date(),
  changeFrequency: 'daily' as const,
  priority: 0.8,
}))

// Include in the final sitemap array
return [
  ...existingPages,
  ...prayerTimesCityPages,
]
```

## Checks

- [ ] Sitemap includes all 10 city prayer times pages
- [ ] changeFrequency is 'daily' (times update daily)
- [ ] Priority is appropriate (0.8)

## Coding standards

- docs/coding_standards/nextjs/sitemap.md
