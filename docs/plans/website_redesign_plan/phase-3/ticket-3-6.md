# Ticket 3-6: Create /for-masjids Page

Complexity level: medium

Create the new B2B landing page at `/for-masjids` assembling all the components.

## Actions

### Action 1

Action type: create directory

Path: `src/app/for-masjids`

Action: Create route directory

### Action 2

Action type: create file

Path: `src/app/for-masjids/page.tsx`

Action: Create the page component

Description: Create the page that:
- Imports and renders all B2B components in order:
  1. ForMasjidsHero
  2. ProductsShowcase
  3. HowItWorks
  4. IntegrationOptions
  5. MasjidCTA

- Sets proper metadata:
  - Title: "For Masjids - Free Digital Solutions | MyLocalMasjid"
  - Description: "Get a free admin portal, website, and app listing for your masjid. Manage prayer times, announcements, and events - no technical skills needed."

- Can be a server component (no client-side state at page level)

## Checks

- [x] Page accessible at /for-masjids
- [x] All sections render in correct order
- [x] Metadata is correct
- [x] Dark mode works on full page
- [x] Mobile responsive

## Coding standards

N/A
