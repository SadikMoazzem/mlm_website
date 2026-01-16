# Masjid Finder Map Interface - Implementation Plan

## Overview

Transform the current static masjids listing page into a Google Maps-like interactive map interface, similar to the app-v2 implementation. This will provide a location-based, visual discovery experience for finding masjids.

---

## Current State vs Target State

### Current Website (`/masjids`)
- Static grid of city cards
- Search redirects to `/masjids/near/{lat}/{lng}` (separate page)
- No interactive map visualization
- Browse by city only
- No real-time filtering

### Target State
- Full-screen interactive map with masjid markers
- Integrated location search (stays on same page)
- Side panel/bottom sheet for masjid list
- Real-time filtering (women's area, parking, madhab, etc.)
- Geolocation-based "find near me"
- Click marker → view details → get directions

---

## UI/UX Design

### Layout Options

#### Option A: Full-Screen Map (Recommended)
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] [Search Bar........................] [Filters] [GPS] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    Interactive Map                          │
│                    (Full viewport)                          │
│                                                             │
│   [Marker] [Marker]                                         │
│              [Marker]                                       │
│                        [Selected Marker - enlarged]         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Masjids Nearby (12)                              [^]    │ │
│ │ ─────────────────────────────────────────────────────── │ │
│ │ [Card] Abu Bakr Mosque        0.3 mi   Fajr: 5:30 AM   │ │
│ │ [Card] Islamic Centre         0.8 mi   Fajr: 5:25 AM   │ │
│ │ [Card] ...                                              │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### Option B: Split View (Desktop) / Stacked (Mobile)
```
Desktop:
┌──────────────────────────────────┬──────────────────────────┐
│                                  │ [Search]                 │
│                                  │ [Filters]                │
│         Interactive Map          │ ─────────────────────── │
│                                  │ [Masjid Card 1]          │
│                                  │ [Masjid Card 2]          │
│                                  │ [Masjid Card 3]          │
│                                  │ ...                      │
└──────────────────────────────────┴──────────────────────────┘

Mobile:
┌─────────────────────┐
│ [Search] [Filters]  │
├─────────────────────┤
│                     │
│   Interactive Map   │
│                     │
├─────────────────────┤
│ [Bottom Sheet]      │
│ Masjids (12)   [^]  │
│ ──────────────────  │
│ [Card] [Card]       │
└─────────────────────┘
```

### Responsive Breakpoints

| Breakpoint | Layout | List Panel |
|------------|--------|------------|
| Mobile (<768px) | Full-screen map | Draggable bottom sheet |
| Tablet (768-1024px) | Full-screen map | Expandable side panel |
| Desktop (>1024px) | Split view | Fixed right panel (400px) |

### Interactive States

1. **Initial Load**
   - Request location permission
   - If granted: Center on user, show nearby masjids
   - If denied: Show UK overview, prompt to search

2. **Location Search**
   - Click search bar → Full overlay with suggestions
   - Type → Debounced Mapbox geocoding results
   - Select → Map flies to location, drops pin, shows nearby

3. **Filter Interaction**
   - Horizontal scrollable chips below search
   - Tap chip → Toggle filter → Instant map update
   - Active filters highlighted
   - "Clear all" appears when filters active

4. **Marker Interaction**
   - Hover (desktop): Show tooltip with name
   - Click:
     - Marker grows/highlights
     - Map centers on marker
     - Detail card appears (floating or in panel)
     - Prayer times fetch asynchronously

5. **List Interaction**
   - Hover card → Highlight marker on map
   - Click card → Center map, show detail
   - Scroll list → No map movement
   - Pan map → List updates with visible masjids

---

## Technical Architecture

### Route Structure

```
/app/masjids/
├── page.tsx              # Keep existing (city directory)
├── finder/
│   ├── page.tsx          # New map finder page
│   ├── layout.tsx        # Full-screen layout (no footer)
│   └── components/
│       ├── MasjidFinderMap.tsx
│       ├── MapHeader.tsx
│       ├── LocationSearch.tsx
│       ├── FilterChips.tsx
│       ├── MasjidListPanel.tsx
│       ├── MasjidDetailCard.tsx
│       └── GPSButton.tsx
├── [city]/
│   └── ...               # Keep existing city pages
```

### Component Architecture

```tsx
// MasjidFinderPage (page.tsx)
<MasjidsMapProvider>
  <div className="h-screen flex flex-col">
    <MapHeader>
      <LocationSearch />
      <FilterChips />
    </MapHeader>

    <div className="flex-1 relative">
      <MasjidFinderMap />
      <GPSButton />

      {/* Desktop: Side panel */}
      <MasjidListPanel className="hidden lg:block" />

      {/* Mobile: Bottom sheet */}
      <MasjidBottomSheet className="lg:hidden" />

      {/* Floating detail card when marker selected */}
      <MasjidDetailCard />
    </div>
  </div>
</MasjidsMapProvider>
```

### State Management

```tsx
// MasjidsMapContext.tsx
interface MasjidsMapState {
  // Map state
  center: { lat: number; lng: number };
  zoom: number;
  bounds: LngLatBounds | null;

  // Location state
  userLocation: { lat: number; lng: number } | null;
  searchedLocation: { lat: number; lng: number; name: string } | null;
  locationPermission: 'granted' | 'denied' | 'prompt';

  // Selection state
  selectedMasjidId: string | null;
  hoveredMasjidId: string | null;

  // Filter state
  activeFilters: {
    womensArea: boolean;
    parking: boolean;
    madhab: 'hanafi' | 'shafi' | null;
    type: 'masjid' | 'hall' | null;
  };

  // Data state
  visibleMasjids: Masjid[];
  visibleCount: number;
  isLoading: boolean;
}

// Actions
- setCenter(lat, lng, zoom?)
- centerOnUser()
- setSearchedLocation(coords, name)
- clearSearchedLocation()
- selectMasjid(id)
- hoverMasjid(id)
- setFilter(key, value)
- clearFilters()
- updateVisibleMasjids(masjids)
```

### Mapbox GL JS Integration

```tsx
// MasjidFinderMap.tsx
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Use same tileset as app
const TILESET_ID = 'mlmadmin.uk-masjids';
const SOURCE_LAYER = 'masjids';

// Layer configuration (matching app)
const layers = {
  points: {
    id: 'masjid-points',
    type: 'circle',
    filter: ['==', ['get', 'type'], 'hall'],
    paint: {
      'circle-radius': 8,
      'circle-color': '#0d9488', // teal-600
    }
  },
  symbols: {
    id: 'masjid-symbols',
    type: 'symbol',
    filter: ['!=', ['get', 'type'], 'hall'],
    layout: {
      'icon-image': 'mosque-marker',
      'icon-size': 0.5,
      'text-field': ['get', 'name'],
      'text-offset': [0, 1.5],
    }
  }
};

// Dynamic filter expression (same as app)
function buildFilterExpression(filters: ActiveFilters) {
  const conditions = ['all'];

  if (filters.womensArea) {
    conditions.push(['==', ['coalesce', ['get', 'has_women_area'], false], true]);
  }
  if (filters.parking) {
    conditions.push(['==', ['coalesce', ['get', 'has_parking'], false], true]);
  }
  if (filters.madhab) {
    conditions.push(['==', ['coalesce', ['get', 'madhab'], ''], filters.madhab]);
  }

  return conditions.length > 1 ? conditions : null;
}
```

### Data Flow

```
User Opens /masjids/finder
        │
        ▼
Request Geolocation Permission
        │
   ┌────┴────┐
   │         │
Granted    Denied
   │         │
   ▼         ▼
Center on   Center on UK
User        (London default)
   │         │
   └────┬────┘
        │
        ▼
Load Mapbox Tileset (vector tiles)
        │
        ▼
Render Markers (efficient, 1000s supported)
        │
        ▼
Query Visible Features → Update List Panel
        │
        ▼
User Interacts (search/filter/click)
        │
        ▼
Update Map State → Re-render
```

---

## Feature Breakdown

### Phase 1: Core Map Experience (MVP)
- [ ] Full-screen Mapbox GL JS map
- [ ] Tileset rendering with masjid markers
- [ ] Basic click interaction (select marker)
- [ ] Visible masjids list (side panel)
- [ ] GPS button to center on user
- [ ] Responsive layout (mobile/desktop)

### Phase 2: Search & Discovery
- [ ] Location search with Mapbox geocoding
- [ ] Search suggestions dropdown
- [ ] Recent searches (localStorage)
- [ ] Search pin on map
- [ ] Fly-to animation

### Phase 3: Filtering
- [ ] Filter chips UI
- [ ] Women's area filter
- [ ] Parking filter
- [ ] Madhab filter
- [ ] Type filter (masjid/hall)
- [ ] Dynamic Mapbox expression filtering

### Phase 4: Detail & Information
- [ ] Masjid detail card on selection
- [ ] Prayer times fetching (async)
- [ ] Link to full masjid page
- [ ] Directions link (Google Maps/Apple Maps)
- [ ] Share functionality

### Phase 5: Polish & Enhancement
- [ ] Prayer-time based theming
- [ ] Marker clustering at low zoom
- [ ] Keyboard navigation
- [ ] Accessibility (ARIA labels)
- [ ] Loading states & skeletons
- [ ] Error handling & recovery

---

## Component Specifications

### 1. LocationSearch

```tsx
interface LocationSearchProps {
  onSelect: (location: SearchResult) => void;
  placeholder?: string;
}

// Features:
// - Full-width on mobile, constrained on desktop
// - Click to open overlay/dropdown
// - Mapbox geocoding with UK bias
// - Recent searches from localStorage
// - Keyboard navigation (arrow keys, enter, escape)
// - Clear button when has value
```

### 2. FilterChips

```tsx
interface FilterChipsProps {
  filters: ActiveFilters;
  onChange: (key: string, value: any) => void;
  onClear: () => void;
  visibleCount: number;
}

// Chips:
// - Women's Area (toggle)
// - Parking (toggle)
// - Madhab (dropdown: Hanafi, Shafi, All)
// - Open Now (toggle) - calculated from prayer times
// - Type (dropdown: Masjid, Hall, All)
```

### 3. MasjidListPanel

```tsx
interface MasjidListPanelProps {
  masjids: Masjid[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  isLoading: boolean;
}

// Features:
// - Virtualized list for performance
// - Compact card view
// - Distance from center/user
// - Current/next prayer time
// - Hover highlights marker
// - Click centers and selects
```

### 4. MasjidDetailCard

```tsx
interface MasjidDetailCardProps {
  masjid: Masjid | null;
  prayerTimes: PrayerTimes | null;
  isLoadingTimes: boolean;
  onClose: () => void;
  onViewFull: () => void;
}

// Features:
// - Floating card near marker (desktop)
// - Bottom card (mobile)
// - Basic info immediate
// - Prayer times async
// - Action buttons (directions, share, view)
// - Dismiss on click outside or X
```

### 5. MasjidBottomSheet (Mobile)

```tsx
interface MasjidBottomSheetProps {
  masjids: Masjid[];
  selectedMasjid: Masjid | null;
  // ... same as list panel
}

// Features:
// - Draggable height (collapsed, half, full)
// - Snap points
// - Pull indicator
// - Peek view shows count
// - Expanded shows list
// - Touch-friendly cards
```

---

## API Endpoints Needed

### Existing (Reuse)
- `GET /api/masjids/nearest` - Already exists
- `GET /api/search/locations` - Mapbox geocoding wrapper

### New (Optional)
- `GET /api/masjids/in-bounds` - Get masjids within map bounds
  - Params: `north, south, east, west, filters`
  - Alternative: Use tileset query (client-side)

---

## Performance Considerations

### Why Mapbox Tileset?
1. **Efficient rendering**: Vector tiles pre-computed server-side
2. **Scalability**: Handles 10,000+ markers without lag
3. **Dynamic styling**: Change colors/filters without re-fetching
4. **Built-in clustering**: Optional at low zoom levels

### Optimizations
1. **Debounced search**: 400ms delay before geocoding
2. **Virtualized list**: Only render visible cards
3. **Lazy prayer times**: Fetch only when card expanded
4. **Memoized filters**: Prevent unnecessary re-renders
5. **CSS containment**: Isolate repaint regions

---

## Dependencies

### Required
```json
{
  "mapbox-gl": "^3.x",
  "@mapbox/mapbox-gl-geocoder": "^5.x" // Optional, can use API directly
}
```

### Optional
```json
{
  "@radix-ui/react-dialog": "^1.x",      // Location search overlay
  "@radix-ui/react-popover": "^1.x",     // Detail card
  "vaul": "^0.x",                         // Bottom sheet (mobile)
  "react-window": "^1.x"                  // Virtualized list
}
```

---

## URL/Routing Strategy

### Options

#### Option A: Dedicated Route (Recommended)
```
/masjids/finder           # New map interface
/masjids                  # Keep existing directory
/masjids/near/:lat/:lng   # Keep existing nearby list
```

#### Option B: Query Parameter Toggle
```
/masjids?view=map         # Map view
/masjids?view=list        # Directory view (default)
```

#### Option C: Replace Main Page
```
/masjids                  # New map interface
/masjids/directory        # Move old page here
```

### Deep Linking Support
```
/masjids/finder?lat=51.5&lng=-0.1&zoom=12
/masjids/finder?search=Birmingham
/masjids/finder?masjid=abc123
/masjids/finder?filters=womensArea,parking
```

---

## Migration Path

### Step 1: Build in Parallel
- Create `/masjids/finder` without touching existing pages
- Link from main masjids page: "Try our new map view →"
- A/B test user preference

### Step 2: Iterate Based on Feedback
- Monitor usage analytics
- Gather user feedback
- Refine UX

### Step 3: Consider Replacement
- If map view preferred, make it default
- Keep directory as alternative view
- Update navigation

---

## Success Metrics

1. **Engagement**: Time on page, interactions per session
2. **Discovery**: Masjids viewed via map vs directory
3. **Conversion**: Click-through to full masjid page
4. **Performance**: Time to interactive, FPS during pan/zoom
5. **Accessibility**: Screen reader compatibility score

---

## Questions to Resolve

1. **Route decision**: Dedicated `/finder` route or replace main page?
2. **Mobile priority**: Bottom sheet or full-screen list toggle?
3. **Default location**: User location or UK overview on first visit?
4. **Filters priority**: Which filters matter most to users?
5. **Prayer times**: Show in list view or only on selection?

---

## Next Steps

1. Review and approve this plan
2. Set up Mapbox GL JS in the project
3. Create basic map component with tileset
4. Implement responsive layout
5. Add location search
6. Add filtering
7. Polish and test

---

## Appendix: App-v2 Reference Files

Key files to reference during implementation:
- `app-v2/screens/MasjidsScreen.tsx` - Main orchestration
- `app-v2/screens/MasjidsMapView.tsx` - Map rendering
- `app-v2/context/MasjidsMapContext.tsx` - State management
- `app-v2/services/mapboxTilesetConfig.ts` - Tileset configuration
- `app-v2/components/LocationSearchOverlay.tsx` - Search UX
