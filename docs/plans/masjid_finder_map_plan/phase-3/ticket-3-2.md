# Ticket 2: Create LocationSearchOverlay component

Complexity level: high

Create a full-screen overlay for location search. This overlay provides the search input, recent searches, and search results in an immersive interface.

## Actions

### Action 1: Create LocationSearchOverlay component

Action type: create file

Path: `src/app/masjids/finder/components/LocationSearchOverlay.tsx`

Description: Create a full-screen overlay component that:
- Slides up from bottom (mobile) or fades in (desktop)
- Has a focused search input at the top
- Shows recent searches from localStorage
- Shows search results with debounced geocoding
- Calls `onSelect` with coordinates when result is chosen
- Has close/back button to dismiss

Key features:
- Use Framer Motion for enter/exit animations
- Auto-focus input on open
- Keyboard navigation (arrow keys, enter, escape)
- Recent searches stored in localStorage (`masjid-finder-recent-searches`)
- Clear recent searches option
- Loading state during search

```tsx
interface LocationSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: {
    name: string;
    coordinates: { latitude: number; longitude: number };
  }) => void;
}
```

**Recent searches structure:**
```typescript
interface RecentSearch {
  id: string;
  name: string;
  fullName: string;
  coordinates: { latitude: number; longitude: number };
  timestamp: number;
}
```

**Implementation notes:**
- Reuse the search API call pattern from `src/components/search/LocationSearch.tsx`
- Limit recent searches to 5 items
- Add new searches to front of list
- Remove duplicates by ID

### Action 2: Create useRecentSearches hook

Action type: create file

Path: `src/app/masjids/finder/hooks/useRecentSearches.ts`

Description: Create a hook to manage recent searches in localStorage:

```typescript
const STORAGE_KEY = 'masjid-finder-recent-searches';
const MAX_RECENT = 5;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const addRecentSearch = useCallback((search: Omit<RecentSearch, 'timestamp'>) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.id !== search.id);
      const updated = [{ ...search, timestamp: Date.now() }, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentSearches([]);
  }, []);

  return { recentSearches, addRecentSearch, clearRecentSearches };
}
```

## Checks

- Overlay opens and closes with animation
- Search input auto-focuses on open
- Typing triggers debounced search
- Results display correctly
- Selecting result calls onSelect and closes overlay
- Recent searches persist across page loads
- Escape key closes overlay
- Component is accessible (focus trap, ARIA labels)

## Coding standards

N/A
