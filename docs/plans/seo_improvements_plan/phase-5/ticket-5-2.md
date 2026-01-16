# Ticket 5-2: Update robots.txt Allow List

Complexity level: low

Ensure robots.txt explicitly allows crawling of area pages.

## Actions

### Action 1

Action type: edit file

Path: `public/robots.txt`

Action: Verify area pages are allowed

Description: The robots.txt should allow `/masjids/` paths. Check current configuration and ensure it includes:

```
User-agent: *
Allow: /
Allow: /masjids
Allow: /masjids/*
Allow: /masjid
Allow: /masjid/*
Sitemap: https://www.mylocalmasjid.com/sitemap.xml
```

If area pages are already covered by `Allow: /masjids/*`, no changes needed. Just verify the pattern matches.

The existing robots.txt likely already allows these paths, but verify to be safe.

## Checks

- [ ] robots.txt allows `/masjids/*` paths
- [ ] No Disallow rules blocking area pages
- [ ] Sitemap URL is correct

## Coding standards

N/A
