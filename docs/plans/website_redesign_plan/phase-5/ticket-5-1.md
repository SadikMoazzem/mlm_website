# Ticket 5-1: Update Navbar with New Navigation Structure

Complexity level: medium

Restructure the navbar to be consumer-first with simplified navigation.

## Actions

### Action 1

Action type: edit file

Path: `src/components/sections/navbar.tsx`

Action: Replace navigation structure

Description: Update the navbar with new structure:

**Remove:**
- Solutions dropdown entirely
- "Our Journey" from main nav
- "How we integrate" from main nav
- "Pricing" from main nav
- "Add a Masjid" from main nav

**New Main Nav Items:**
```typescript
const navItems = [
  { name: 'Find Masjids', href: '/masjids' },
  { name: 'Prayer Times', href: '/prayer-times' },
  { name: 'Download App', href: '/download' },
  { name: 'For Masjids', href: '/for-masjids' },
]
```

**Keep:**
- Logo linking to home
- ThemeToggle (from Phase 1)
- Admin Portal button (for returning admins)
- Remove "Get Started" button (moved to /for-masjids)

**Mobile Navigation:**
- Same simplified structure
- ThemeToggle in mobile menu
- Admin Portal button

**Styling:**
- Simpler horizontal nav without dropdown
- "For Masjids" can be slightly differentiated (e.g., different color)
- Dark mode support for all elements

## Checks

- [x] New nav items display correctly
- [x] All links work
- [x] Mobile menu works
- [x] Dark mode styling correct
- [x] No Solutions dropdown

## Coding standards

N/A
