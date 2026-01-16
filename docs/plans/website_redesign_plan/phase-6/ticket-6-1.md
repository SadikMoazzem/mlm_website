# Ticket 6-1: Add Redirects for Old URLs

Complexity level: low

Set up 301 redirects for URLs that have moved.

## Actions

### Action 1

Action type: edit file

Path: `next.config.js` or `next.config.mjs`

Action: Add redirects configuration

Description: Add redirects for moved pages:

```javascript
async redirects() {
  return [
    {
      source: '/how-we-integrate',
      destination: '/for-masjids',
      permanent: true, // 301 redirect
    },
    // Keep /solutions/* pages - they're still valid
    // but add a redirect for anyone going to /solutions directly
    {
      source: '/solutions',
      destination: '/for-masjids',
      permanent: true,
    },
  ]
}
```

### Action 2

Action type: delete file (optional)

Path: `src/app/how-we-integrate/page.tsx`

Action: Remove the how-we-integrate page

Description: Since content is now in /for-masjids, remove the old page file. The redirect in next.config will handle old links.

## Checks

- [ ] /how-we-integrate redirects to /for-masjids
- [ ] /solutions redirects to /for-masjids
- [ ] /solutions/admin still works (not redirected)
- [ ] /solutions/website still works
- [ ] /solutions/app still works

## Coding standards

N/A
