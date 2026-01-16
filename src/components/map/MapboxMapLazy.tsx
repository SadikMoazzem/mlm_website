'use client';

import dynamic from 'next/dynamic';
import type { MapboxMapProps, MapboxMapHandle } from './MapboxMap';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Loading fallback component while map loads
 * Uses a skeleton UI to prevent layout shift
 */
const MapLoadingFallback = () => (
  <div
    className="w-full h-full relative bg-gray-100 dark:bg-gray-800 overflow-hidden"
    role="status"
    aria-label="Loading map"
  >
    {/* Skeleton pattern to mimic map tiles */}
    <div className="absolute inset-0">
      {/* Grid pattern */}
      <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Pulsing overlay for loading effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-300/50 animate-pulse" />
    </div>

    {/* Loading indicator */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center bg-white/90 dark:bg-gray-900/90 px-6 py-4 rounded-lg shadow-lg">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
        <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">Loading map...</p>
      </div>
    </div>

    {/* Mock zoom controls position to maintain layout */}
    <div className="absolute top-3 right-3 bg-white dark:bg-gray-700 rounded shadow-sm w-8 h-20 animate-pulse" />
  </div>
);

/**
 * Lazy-loaded Mapbox map component with SSR disabled
 *
 * This wrapper uses Next.js dynamic import with ssr: false to prevent
 * Mapbox GL JS from being rendered on the server (as it requires window object).
 *
 * Usage:
 * ```tsx
 * import MapboxMapLazy from '@/components/map/MapboxMapLazy';
 *
 * <MapboxMapLazy
 *   center={[-2, 54.5]}
 *   zoom={10}
 *   markers={markers}
 *   onMapClick={handleMapClick}
 * />
 * ```
 */
const MapboxMapLazy = dynamic(
  () => import('./MapboxMap'),
  {
    ssr: false,
    loading: () => <MapLoadingFallback />,
  }
) as ForwardRefExoticComponent<MapboxMapProps & RefAttributes<MapboxMapHandle>>;

export default MapboxMapLazy;
