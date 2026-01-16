# Phase 2: City-Specific Prayer Times Pages (Top 10)

## Goals

Create static prayer times pages for the top 10 UK cities with SEO-optimized metadata, calculated prayer times display, nearby masjids section, and download app CTA.

### Tickets

- [x] Create dynamic route `/prayer-times/[city]/page.tsx`
- [x] Create city prayer times metadata with SEO optimization
- [x] Add static params generation for top 10 cities
- [x] Create city prayer times components (header, times grid, nearby masjids)
- [x] Run quality checks (lint, build)
- [x] Verify UI with Playwright: check London prayer times page

### Dependencies

```
ticket-2-1 ─┬─► ticket-2-4 ─► ticket-2-5 ─► ticket-2-6
ticket-2-2 ─┤
ticket-2-3 ─┘
```

### Notes

**URL Structure:**
- `/prayer-times/london` - London Prayer Times
- `/prayer-times/birmingham` - Birmingham Prayer Times
- etc.

**Page Content:**
1. Hero with city name and today's date (Gregorian + Hijri)
2. Today's prayer times grid (6 prayers)
3. 7-day forecast table
4. Nearby masjids section (links to /masjids/[city])
5. Download app CTA
6. Method disclaimer (UK Moonsighting Committee, Shafi Asr)

**SEO Metadata:**
- Title: "Prayer Times in London Today | Fajr, Dhuhr, Asr Times | MyLocalMasjid"
- Description: "Accurate prayer times for London using UK Moonsighting Committee method. Today's Fajr is at 05:23, Dhuhr at 12:58..."
- Keywords: "prayer times london", "salah times london", "fajr time london"

**ISR Configuration:**
- `revalidate = 86400` (24 hours) for daily time updates
