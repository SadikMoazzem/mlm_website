# Ticket 6-2: Update Sitemap with New Pages

Complexity level: low

Update the sitemap configuration to include new pages and remove old ones.

## Actions

### Action 1

Action type: edit file

Path: `src/app/sitemap.ts`

Action: Update sitemap with new page URLs

Description: Add new pages and remove old ones:

```typescript
// Add these new routes:
{ url: '/for-masjids', changeFrequency: 'monthly', priority: 0.8 },
{ url: '/prayer-times', changeFrequency: 'daily', priority: 0.9 },
{ url: '/download', changeFrequency: 'monthly', priority: 0.8 },

// Remove /how-we-integrate (now redirects to /for-masjids)
// Keep /solutions/* pages as they still exist
```

## Checks

- [ ] Sitemap includes /for-masjids
- [ ] Sitemap includes /prayer-times
- [ ] Sitemap includes /download
- [ ] Sitemap does NOT include /how-we-integrate
- [ ] All existing valid pages are still in sitemap

## Coding standards

N/A
