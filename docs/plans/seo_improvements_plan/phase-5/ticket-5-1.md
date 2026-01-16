# Ticket 5-1: Update Sitemap to Include Area Pages

Complexity level: medium

Update the sitemap generator to include all area pages for better search engine discovery.

## Actions

### Action 1

Action type: edit file

Path: `src/app/sitemap.ts`

Action: Add area pages to sitemap generation

Description: Add a section to generate area page URLs:

```typescript
import { cities } from '@/data/cities'

// In the sitemap function, add area pages:

// Generate area page URLs
const areaPages: MetadataRoute.Sitemap = []
for (const city of cities) {
  for (const area of city.areas) {
    areaPages.push({
      url: `${baseUrl}/masjids/${city.id}/${area.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }
}

// Include in the returned array alongside existing pages:
return [
  ...staticPages,
  ...cityPages,
  ...areaPages,  // Add this
  ...masjidPages,
  // ...
]
```

This ensures Google discovers all area pages like:
- `/masjids/london/east-london`
- `/masjids/london/west-london`
- `/masjids/birmingham/birmingham-central`
- etc.

## Checks

- [ ] Area pages appear in sitemap.xml
- [ ] URLs follow correct format `/masjids/{city}/{area}`
- [ ] Priority is set to 0.8
- [ ] changeFrequency is 'weekly'
- [ ] Sitemap XML is valid

## Coding standards

N/A
