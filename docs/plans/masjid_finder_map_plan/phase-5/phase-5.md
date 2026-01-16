# Phase 5: Masjid List & Detail Cards

## Goals

Implement the responsive list panel (bottom sheet on mobile, side panel on desktop) and the masjid detail card that appears when a marker is selected. Prayer times are fetched on selection.

### Tickets

- [ ] Ticket 1: Create MasjidListCard component
- [ ] Ticket 2: Create mobile bottom sheet with Vaul
- [ ] Ticket 3: Create desktop side panel
- [ ] Ticket 4: Create MasjidDetailCard with prayer times
- [ ] Ticket 5: Integrate list and detail with page
- [ ] Run quality checks (lint, build)
- [ ] Verify UI with Playwright: test bottom sheet drag, side panel visibility, detail card display

### Notes

**Responsive Strategy:**
- Mobile (<1024px): Vaul bottom sheet drawer
- Desktop (>=1024px): Fixed right side panel (400px width)

**List Card Features:**
- Masjid name, type badge
- Address/city
- Distance from map center
- Click to select and center map

**Detail Card Features:**
- All list card info
- Prayer times (fetched on selection)
- Action buttons: Directions, View Page, Share
- Close button

### Dependency Graph

```
Ticket 1 (list card) ──────────────────────┐
                                            │
Ticket 2 (bottom sheet) ──→ ─┐              │
                             ├──→ Ticket 5 (integration)
Ticket 3 (side panel) ──────→┘              │
                                            │
Ticket 4 (detail card) ────────────────────┘

Tickets 1-4 can run in parallel
Ticket 5 depends on all
```
