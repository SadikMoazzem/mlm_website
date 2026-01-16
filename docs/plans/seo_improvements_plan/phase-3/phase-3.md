# Phase 3: Structured Data (BreadcrumbList, ItemList, FAQPage)

## Goals

Add structured data schemas to improve search result appearance and help Google understand page hierarchy and content structure.

### Tickets

- [x] Create BreadcrumbList schema utility function
- [x] Add BreadcrumbList to masjid pages
- [x] Add BreadcrumbList to city and area pages
- [x] Add ItemList schema to area pages
- [x] Add FAQPage schema to FAQ pages
- [x] Run quality checks (lint, build)

### Dependencies

```
ticket-3-1 ─► ticket-3-2 ─┐
             ticket-3-3 ─┼─► ticket-3-6
ticket-3-4 ─────────────┘
ticket-3-5 ─────────────┘
```

### Notes

- BreadcrumbList appears in Google as: Home > Masjids > London > East London
- ItemList helps Google understand listing pages with multiple items
- FAQPage schema can trigger FAQ rich results in Google
- All schemas should be valid JSON-LD
- Test with Google's Rich Results Test tool after implementation
