# Ticket 4-1: Create /prayer-times Page

Complexity level: high

Create a dedicated prayer times page where users can search for prayer times by location.

## Actions

### Action 1

Action type: create directory

Path: `src/app/prayer-times`

Action: Create route directory

### Action 2

Action type: create file

Path: `src/app/prayer-times/page.tsx`

Action: Create the prayer times page

Description: Create a page with:

**Hero Section:**
- Title: "Prayer Times"
- Subtitle: "Find accurate prayer times for any location"
- Location search input (can reuse LocationSearch component)
- "Use My Location" button

**Search Results:**
- When location selected, show:
  - Location name
  - Today's prayer times (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha)
  - Option to view nearby masjids for that location

**No Results State:**
- Prompt to search or use location
- Quick city links (London, Birmingham, etc.)

**Features:**
- Auto-detect location on page load (with permission)
- Show generic calculated times if no masjid found
- Link to nearest masjids for jamaat times

**Metadata:**
- Title: "Prayer Times - Find Salah Times Near You | MyLocalMasjid"
- Description: "Get accurate Islamic prayer times for your location. Find Fajr, Dhuhr, Asr, Maghrib, and Isha times."

**Dark Mode:**
- Full dark mode support
- Prayer time cards styled appropriately

## Checks

- [ ] Page loads at /prayer-times
- [ ] Location search works
- [ ] Prayer times display correctly
- [ ] Dark mode works
- [ ] Mobile responsive

## Coding standards

N/A
