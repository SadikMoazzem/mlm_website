# Ticket 4-3: Update sitemap.ts for New Routes

Complexity level: medium

Update the sitemap generation to use the new `/location/[slug]` URLs instead of the legacy routes. This ensures search engines index the correct URLs.

## Actions

### Action 1

Action type: edit file

Path: `src/app/sitemap.ts`

Description: Update the sitemap generation to:

1. **Remove legacy route generation:**
   - Remove `/prayer-times/[city]` entries
   - Remove `/masjids/[city]` entries
   - Remove `/masjids/[city]/[area]` entries

2. **Add unified location route generation:**
```typescript
// Generate location pages for all cities
const cityPages = cities.map(city => ({
  url: `${baseUrl}/location/${city.id}`,
  lastModified: new Date(),
  changeFrequency: 'weekly' as const,
  priority: 0.8,
}))

// Generate location pages for all areas
const areaPages = cities.flatMap(city =>
  city.areas.map(area => ({
    url: `${baseUrl}/location/${area.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
)

// Combine in sitemap
return [
  ...staticPages,
  ...cityPages,
  ...areaPages,
  ...masjidPages,
]
```

3. **Update priorities:**
   - City location pages: 0.8 (high value)
   - Area location pages: 0.7 (medium-high value)
   - Individual masjid pages: 0.6 (existing)

## Checks

- [ ] Sitemap no longer includes `/prayer-times/` URLs
- [ ] Sitemap no longer includes `/masjids/[city]` URLs
- [ ] Sitemap includes `/location/[city]` URLs for all cities
- [ ] Sitemap includes `/location/[area]` URLs for all areas
- [ ] Priorities are set correctly
- [ ] No duplicate URLs
- [ ] Sitemap validates correctly

## Coding standards

N/A - Standard Next.js sitemap patterns
