/**
 * Map components for the Add Masjid flow
 */

// Lazy-loaded map component (recommended for production use)
export { default as MapboxMapLazy } from './MapboxMapLazy';

// Direct map component (use only if SSR is not a concern)
export { default as MapboxMap } from './MapboxMap';

// Error boundary for map component
export { MapErrorBoundary } from './MapErrorBoundary';

// Types
export type { MapboxMapProps, MapboxMapHandle, MapMarker, MarkerType } from './MapboxMap';
