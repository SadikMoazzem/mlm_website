# Ticket 2-2: Create QuickCityAccess Component

Complexity level: medium

Create a section with quick-access city buttons for fast masjid browsing.

## Actions

### Action 1

Action type: create file

Path: `src/components/sections/QuickCityAccess.tsx`

Action: Create city quick access component

Description: Create a section that displays:

**Layout:**
- Section title: "Find masjids in your city"
- Horizontal scrollable row of city pills/buttons
- "View all cities" link at the end

**Cities to display (from cities.ts):**
- London, Birmingham, Manchester, Leeds, Bradford, Leicester, Glasgow, Edinburgh, Cardiff, Bristol
- Plus "More →" button linking to /masjids

**Styling:**
- Pills with subtle border and hover effect
- Primary color on hover
- Dark mode: darker background pills with lighter border

**Behavior:**
- Each city links to `/masjids/{city-id}`
- Horizontally scrollable on mobile
- Grid on desktop (2 rows of 5)

## Checks

- [x] Cities display correctly
- [x] Links work
- [x] Scroll works on mobile
- [x] Dark mode styling correct

## Coding standards

N/A
