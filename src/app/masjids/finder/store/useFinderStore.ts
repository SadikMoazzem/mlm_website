/**
 * Zustand Store for Masjid Finder
 *
 * Centralized state management for the finder interface.
 * Handles map state, filters, selected masjid, and visible masjids list.
 */

import { create } from 'zustand';
import type {
  Coordinates,
  MasjidFeature,
  ActiveFilters,
  FilterExpression,
  SearchedLocation,
} from '../types';
import { MAP_DEFAULTS } from '../config/mapboxTilesetConfig';

interface FinderState {
  // Map state
  center: Coordinates;
  zoom: number;
  searchedLocation: SearchedLocation | null;

  // Selection state
  selectedMasjidId: string | null;
  selectedMasjid: MasjidFeature | null;

  // Filter state
  filters: ActiveFilters;
  filterExpression: FilterExpression | null;

  // Visible masjids from map viewport
  visibleMasjids: MasjidFeature[];

  // UI state
  isListExpanded: boolean;
  isLoading: boolean;

  // Actions
  setCenter: (center: Coordinates, zoom?: number) => void;
  setSearchedLocation: (location: SearchedLocation | null) => void;
  setSelectedMasjid: (masjid: MasjidFeature | null) => void;
  setSelectedMasjidId: (id: string | null) => void;
  setFilters: (filters: ActiveFilters) => void;
  toggleFilter: (key: keyof ActiveFilters, value?: string | boolean) => void;
  clearFilters: () => void;
  setVisibleMasjids: (masjids: MasjidFeature[]) => void;
  setListExpanded: (expanded: boolean) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

/**
 * Build Mapbox filter expression from active filters
 */
function buildFilterExpression(filters: ActiveFilters): FilterExpression | null {
  const conditions: FilterExpression[] = [];

  if (filters.womensArea) {
    conditions.push(['==', ['get', 'has_women_area'], true]);
  }

  if (filters.parking) {
    conditions.push(['==', ['get', 'has_parking'], true]);
  }

  if (filters.madhab) {
    conditions.push(['==', ['get', 'madhab'], filters.madhab]);
  }

  if (filters.type) {
    conditions.push(['==', ['get', 'type'], filters.type]);
  }

  if (conditions.length === 0) return null;
  if (conditions.length === 1) return conditions[0];

  return ['all', ...conditions];
}

const initialState = {
  center: {
    latitude: MAP_DEFAULTS.center[1],
    longitude: MAP_DEFAULTS.center[0],
  },
  zoom: MAP_DEFAULTS.zoom,
  searchedLocation: null,
  selectedMasjidId: null,
  selectedMasjid: null,
  filters: {},
  filterExpression: null,
  visibleMasjids: [],
  isListExpanded: false,
  isLoading: false,
};

export const useFinderStore = create<FinderState>((set, get) => ({
  ...initialState,

  setCenter: (center, zoom) =>
    set({
      center,
      ...(zoom !== undefined ? { zoom } : {}),
    }),

  setSearchedLocation: (location) =>
    set({
      searchedLocation: location,
      ...(location
        ? {
            center: location.coordinates,
            zoom: 14,
          }
        : {}),
    }),

  setSelectedMasjid: (masjid) =>
    set({
      selectedMasjid: masjid,
      selectedMasjidId: masjid?.id ?? null,
    }),

  setSelectedMasjidId: (id) => {
    const { visibleMasjids } = get();
    const masjid = id ? visibleMasjids.find((m) => m.id === id) ?? null : null;
    set({
      selectedMasjidId: id,
      selectedMasjid: masjid,
    });
  },

  setFilters: (filters) =>
    set({
      filters,
      filterExpression: buildFilterExpression(filters),
    }),

  toggleFilter: (key, value) => {
    const { filters } = get();
    let newFilters: ActiveFilters;

    if (typeof value === 'boolean' || value === undefined) {
      // Toggle boolean filter
      newFilters = {
        ...filters,
        [key]: filters[key] ? undefined : true,
      };
    } else {
      // Toggle string filter (same value clears it)
      newFilters = {
        ...filters,
        [key]: filters[key] === value ? undefined : value,
      };
    }

    // Clean up undefined values
    Object.keys(newFilters).forEach((k) => {
      if (newFilters[k as keyof ActiveFilters] === undefined) {
        delete newFilters[k as keyof ActiveFilters];
      }
    });

    set({
      filters: newFilters,
      filterExpression: buildFilterExpression(newFilters),
    });
  },

  clearFilters: () =>
    set({
      filters: {},
      filterExpression: null,
    }),

  setVisibleMasjids: (masjids) => {
    const { selectedMasjidId } = get();
    // If selected masjid is in new visible list, update the full object
    const selectedMasjid = selectedMasjidId
      ? masjids.find((m) => m.id === selectedMasjidId) ?? null
      : null;

    set({
      visibleMasjids: masjids,
      selectedMasjid,
    });
  },

  setListExpanded: (expanded) =>
    set({
      isListExpanded: expanded,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  reset: () => set(initialState),
}));

// Selector hooks for common derived state
export const useActiveFilterCount = () =>
  useFinderStore((state) => Object.keys(state.filters).length);

export const useHasActiveFilters = () =>
  useFinderStore((state) => Object.keys(state.filters).length > 0);
