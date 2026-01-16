# Website Redesign Implementation Plan

## Overview

Transform the MyLocalMasjid website from a B2B-focused platform to a consumer-first experience that prioritizes app users and prayer time seekers, while providing a clear dedicated path for masjid administrators. The redesign includes a new homepage, dedicated `/for-masjids` B2B landing page, `/prayer-times` page, `/download` page, restructured navigation, and dark mode support.

### Features

- Consumer-first homepage with app promotion, prayer times access, and masjid finder
- Dedicated `/for-masjids` B2B landing page consolidating admin/website/integration content
- New `/prayer-times` dedicated page for quick prayer time lookup
- New `/download` page with smart device detection for app store links
- Simplified navigation: Find Masjids | Prayer Times | Download App | For Masjids
- Dark mode toggle using existing brand colors from mobile app
- Responsive design maintaining existing Tailwind patterns

## Brand Colors

### Light Mode
- Primary Teal: `#1D8A77` (Tailwind primary-500)
- Button Primary: `#147e7b`
- Accent Gold: `#D4AF37`
- Background: `#F5F5F5`
- Card: `#FFFFFF`
- Text Primary: `#1D1D1D`
- Text Secondary: `#4F4F4F`
- Border: `#D1D1D1`

### Dark Mode
- Background Primary: `#0A1A1F`
- Background Secondary: `#153035`
- Card: `#1A2A30`
- Text Primary: `#F5F5F5`
- Text Secondary: `#CCCCCC`
- Border: `#2A3A40`
- Accent Gold: `#D4AF37` (same)
- Primary Teal: `#147e7b` (same)

## Assumptions

- Existing component library and Tailwind setup will be reused
- App store links and masjid count stats are available
- Dark mode preference can be stored in localStorage
- Existing `/solutions/*` pages will redirect to `/for-masjids`
- `/how-we-integrate` content merges into `/for-masjids`

## Dependencies

- Existing `tailwind.config.ts` with primary color scale
- Existing `cities.ts` for city quick links
- Existing `StoreButton` component for app downloads
- Existing `FindNearMeButton` component
- Framer Motion for animations
- Lucide React for icons

## Risks & Considerations

- **SEO Impact**: Changing homepage content may affect rankings; ensure proper metadata
- **Redirects**: Old `/solutions/*` URLs need proper 301 redirects
- **Dark Mode Consistency**: Ensure all components support both themes
- **Mobile Experience**: Test thoroughly on mobile devices
- **Existing Users**: Masjid admins may be confused by new layout initially

## Phases

- [x] Phase 1: Dark Mode Infrastructure & Theme Setup ✅
- [x] Phase 2: New Homepage (Consumer-First) ✅
- [x] Phase 3: New /for-masjids B2B Landing Page ✅
- [x] Phase 4: New /prayer-times and /download Pages ✅
- [x] Phase 5: Navigation Restructure ✅
- [x] Phase 6: Redirects, Cleanup & Final Polish ✅
