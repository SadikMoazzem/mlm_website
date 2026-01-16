# Phase 5: Navigation Restructure

## Goals

Simplify the navigation from the current B2B-focused structure to a consumer-first layout with clear paths for both audiences.

### Tickets

- [x] Update Navbar component with new navigation structure
- [x] Update Footer component with reorganized links
- [x] Run quality checks (lint, build)
- [x] Verify UI with Playwright: check nav works on all pages

### Dependencies

```
ticket-5-1 ─► ticket-5-2 ─► ticket-5-3 ─► ticket-5-4
```

### Notes

**Current Navigation:**
- Solutions (dropdown: Admin, Website, App, Screen)
- Our Journey
- How we integrate
- Pricing
- Our Masjids
- Add a Masjid
- [Admin Portal button]
- [Get Started button]

**New Navigation:**
- Find Masjids → /masjids
- Prayer Times → /prayer-times
- Download App → /download
- For Masjids → /for-masjids
- [Theme Toggle]
- [Admin Portal button] (for returning admins)

**Footer restructure:**
- Consumer: Find Masjids, Prayer Times, Download App, FAQ
- For Masjids: Admin Portal, Register, Solutions, Our Journey
- Company: About, Contact, Privacy, Terms
