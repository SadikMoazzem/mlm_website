# Phase 4: New /prayer-times and /download Pages

## Goals

Create two new dedicated pages: `/prayer-times` for quick prayer time lookup and `/download` for smart app download with device detection.

### Tickets

- [x] Create /prayer-times page with location search
- [x] Create /download page with device detection
- [x] Run quality checks (lint, build)
- [x] Verify UI with Playwright: check both new pages

### Dependencies

```
ticket-4-1 ─┬─► ticket-4-3 ─► ticket-4-4
ticket-4-2 ─┘
```

### Notes

- /prayer-times should allow searching by location and show results
- /download should detect device and auto-redirect or show both options
- Both pages need proper metadata for SEO
- Dark mode support required
