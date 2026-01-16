# Phase 6: Polish & Navigation Integration

## Goals

Add finishing touches, improve user experience, integrate with site navigation, add deep linking support, and ensure accessibility. This phase makes the feature production-ready.

### Tickets

- [ ] Ticket 1: Add deep linking support (URL params)
- [ ] Ticket 2: Add navigation links and update masjids page
- [ ] Ticket 3: Add loading states and error handling
- [ ] Ticket 4: Accessibility improvements
- [ ] Run quality checks (lint, build)
- [ ] Verify UI with Playwright: test deep linking, navigation from /masjids

### Notes

**Deep Linking Support:**
- `/masjids/finder?lat=51.5&lng=-0.1&zoom=12` - Center on location
- `/masjids/finder?masjid=abc123` - Open with masjid selected
- `/masjids/finder?filters=womensArea,parking` - Apply filters

**Navigation Integration:**
- Add "Map View" link to `/masjids` page header
- Add to main site navigation (optional)
- Ensure back button works correctly

### Dependency Graph

```
Ticket 1 (deep linking) ─────┐
                             │
Ticket 2 (navigation) ───────┼──→ Quality checks
                             │
Ticket 3 (loading/errors) ───┤
                             │
Ticket 4 (accessibility) ────┘

All tickets can run in parallel
```
