'use client';

import React, { useRef } from 'react';
import { MapboxMapLazy, MapMarker, MapboxMapHandle, MapErrorBoundary } from '@/components/map';

/**
 * Props for the AddMasjidLayout component
 */
export interface AddMasjidLayoutProps {
  /** Content for the right/bottom panel */
  children: React.ReactNode;
  /** Center coordinates for the map [longitude, latitude] */
  mapCenter?: [number, number];
  /** Zoom level for the map */
  mapZoom?: number;
  /** Markers to display on the map */
  mapMarkers?: MapMarker[];
  /** ID of the selected location marker */
  selectedLocation?: string;
  /** Callback when user clicks on the map */
  onMapClick?: (coordinates: { latitude: number; longitude: number }) => void;
  /** Callback when user clicks on a marker */
  onMarkerClick?: (marker: MapMarker) => void;
  /** Optional ref for programmatic map control */
  mapRef?: React.RefObject<MapboxMapHandle | null>;
}

/**
 * AddMasjidLayout provides a split-screen layout for the Add Masjid flow
 *
 * Desktop (>=768px):
 * - CSS Grid with 60% map (left) / 40% panel (right)
 *
 * Mobile (<768px):
 * - Flex column with map at 40vh (top) + panel fills remaining space
 *
 * Features:
 * - Full viewport height layout
 * - Integrated MapboxMap component
 * - Responsive breakpoint at 768px
 * - Map stays visible during all steps
 */
export function AddMasjidLayout({
  children,
  mapCenter = [-2, 54.5], // UK center
  mapZoom = 5,
  mapMarkers = [],
  selectedLocation,
  onMapClick,
  onMarkerClick,
  mapRef: externalMapRef,
}: AddMasjidLayoutProps) {
  // Internal ref if external not provided
  const internalMapRef = useRef<MapboxMapHandle>(null);
  const mapRef = externalMapRef || internalMapRef;

  return (
    <div className="add-masjid-layout" role="main" aria-label="Add masjid flow">
      {/* Map section - left on desktop, top on mobile */}
      <div className="add-masjid-map" role="region" aria-label="Map view">
        <MapErrorBoundary>
          <MapboxMapLazy
            ref={mapRef}
            center={mapCenter}
            zoom={mapZoom}
            markers={mapMarkers}
            selectedLocation={selectedLocation}
            onMapClick={onMapClick}
            onMarkerClick={onMarkerClick}
            interactive={true}
            className="w-full h-full"
          />
        </MapErrorBoundary>
      </div>

      {/* Panel section - right on desktop, bottom on mobile */}
      <div className="add-masjid-panel" role="region" aria-label="Form panel">
        {children}
      </div>

      {/* Scoped styles for the layout */}
      <style jsx>{`
        .add-masjid-layout {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: calc(100vh - 5rem); /* Account for navbar */
          overflow: hidden;
        }

        .add-masjid-map {
          flex-shrink: 0;
          width: 100%;
          height: 40vh;
          min-height: 200px;
        }

        .add-masjid-panel {
          flex: 1;
          width: 100%;
          overflow: hidden;
          background-color: white;
        }

        /* Desktop layout: side-by-side with CSS Grid */
        @media (min-width: 768px) {
          .add-masjid-layout {
            display: grid;
            grid-template-columns: 60% 40%;
            flex-direction: unset;
          }

          .add-masjid-map {
            height: 100%;
            min-height: unset;
          }

          .add-masjid-panel {
            height: 100%;
            border-left: 1px solid #e5e7eb;
          }
        }
      `}</style>
    </div>
  );
}

export default AddMasjidLayout;
