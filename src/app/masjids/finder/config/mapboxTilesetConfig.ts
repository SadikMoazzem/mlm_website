/**
 * Mapbox Tileset Configuration
 *
 * Configuration for the UK masjids tileset used in the map finder.
 * Matches the app-v2 tileset setup for consistency.
 */

// Tileset identifiers
export const TILESET_ID = 'mlmadmin.uk-masjids';
export const TILESET_URL = `mapbox://${TILESET_ID}`;

// Layer IDs for Mapbox GL JS
export const LAYER_IDS = {
  SOURCE: 'masjids-source',
  SOURCE_LAYER: 'masjids',
  POINTS: 'masjid-points',      // CircleLayer for halls
  SYMBOLS: 'masjid-symbols',    // SymbolLayer for masjids
  LABELS: 'masjid-labels',      // Text labels for halls
} as const;

// Marker colors
export const MARKER_COLORS = {
  light: {
    circle: '#147e7b',           // teal-600
    circleStroke: '#ffffff',
    text: '#147e7b',
    textHalo: '#ffffff',
  },
  dark: {
    circle: '#ffffff',
    circleStroke: '#333333',
    text: '#ffffff',
    textHalo: '#1a1a1a',
  },
} as const;

// Default map settings
export const MAP_DEFAULTS = {
  center: [-2, 54.5] as [number, number],  // UK center [lng, lat]
  zoom: 6,
  minZoom: 5,
  maxZoom: 18,
  labelZoom: 14,  // Zoom level at which labels appear
} as const;
