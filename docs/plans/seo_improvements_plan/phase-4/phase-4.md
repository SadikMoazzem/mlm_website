# Phase 4: Masjid Page Content Enhancement

## Goals

Add natural language content sections to individual masjid pages to improve content depth and match more search queries. These sections provide context that helps both users and search engines.

### Tickets

- [x] Create content generation utility functions
- [x] Add "About" section to masjid pages
- [x] Add "Prayer Times at {Masjid}" section
- [x] Add "Facilities & Services" section
- [x] Add "Getting There" section with location info
- [x] Run quality checks (lint, build)

### Dependencies

```
ticket-4-1 ─► ticket-4-2 ─┐
             ticket-4-3 ─┼─► ticket-4-6 ─► ticket-4-7
             ticket-4-4 ─┤
             ticket-4-5 ─┘
```

### Notes

- Content should be generated dynamically based on available masjid data
- Sections should only render if relevant data exists (e.g., no facilities section if no facilities)
- Language should be natural, not keyword-stuffed
- Use semantic HTML (h2, p, ul) for better SEO
- Keep styling consistent with existing page design
