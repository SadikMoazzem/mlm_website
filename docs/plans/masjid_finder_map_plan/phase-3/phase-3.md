# Phase 3: Location Search & GPS

## Goals

Implement location search functionality and GPS-based user location. Users can search for any location in the UK and the map will fly to that location. The GPS button allows users to quickly center on their current location.

### Tickets

- [ ] Ticket 1: Create MapHeader component with search trigger
- [ ] Ticket 2: Create LocationSearchOverlay component
- [ ] Ticket 3: Create useGeolocation hook and GPS button
- [ ] Ticket 4: Integrate search and GPS with page
- [ ] Run quality checks (lint, build)
- [ ] Verify UI with Playwright: test search overlay opens, GPS button visible

### Notes

**Search Flow:**
1. User clicks search bar in header → overlay opens
2. User types → debounced geocoding via `/api/search/locations`
3. User selects result → map flies to location, pin appears, overlay closes

**GPS Flow:**
1. User clicks GPS button
2. Request geolocation permission if needed
3. Get current position
4. Map flies to user location

**Reuse existing LocationSearch component patterns** but adapt for overlay mode.

### Dependency Graph

```
Ticket 1 (header) ──────────┐
                            ├──→ Ticket 4 (integration)
Ticket 2 (search overlay) ──┤
                            │
Ticket 3 (geolocation) ─────┘

Ticket 1, 2, 3 can run in parallel
Ticket 4 depends on all three
```
