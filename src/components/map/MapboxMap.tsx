'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import mapboxgl from 'mapbox-gl';
import type { NearbyMasjid } from '@/types/add-masjid';

// Initialize Mapbox access token
if (typeof window !== 'undefined') {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
}

/**
 * Types of markers supported by the map
 */
export type MarkerType = 'selected' | 'nearby';

/**
 * Marker data with position and type
 */
export interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  type: MarkerType;
  data?: NearbyMasjid;
}

/**
 * Props for the MapboxMap component
 */
export interface MapboxMapProps {
  /** Center coordinates of the map [longitude, latitude] */
  center?: [number, number];
  /** Zoom level of the map (0-22) */
  zoom?: number;
  /** Array of markers to display on the map */
  markers?: MapMarker[];
  /** ID of the currently selected location marker */
  selectedLocation?: string;
  /** Callback when user clicks on the map */
  onMapClick?: (coordinates: { latitude: number; longitude: number }) => void;
  /** Callback when user clicks on a marker */
  onMarkerClick?: (marker: MapMarker) => void;
  /** Whether the map is interactive (pan, zoom, etc.) */
  interactive?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * Methods exposed via ref for programmatic control
 */
export interface MapboxMapHandle {
  /** Fly to a specific location on the map */
  flyTo: (coordinates: [number, number], zoom?: number) => void;
}

/**
 * Reusable Mapbox GL JS map component for the Add Masjid flow
 *
 * Features:
 * - Interactive map with click handling
 * - Multiple marker types (selected location, nearby masjids)
 * - Programmatic pan/zoom via ref
 * - Responsive container with proper cleanup
 * - UK-centered default view
 */
const MapboxMap = forwardRef<MapboxMapHandle, MapboxMapProps>(
  (
    {
      center = [-2, 54.5], // UK center [lng, lat]
      zoom = 5,
      markers = [],
      selectedLocation,
      onMapClick,
      onMarkerClick,
      interactive = true,
      className = '',
    },
    ref
  ) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);

    // Expose flyTo method via ref
    useImperativeHandle(ref, () => ({
      flyTo: (coordinates: [number, number], zoomLevel?: number) => {
        if (mapRef.current) {
          mapRef.current.flyTo({
            center: coordinates,
            zoom: zoomLevel ?? mapRef.current.getZoom(),
            essential: true, // This animation is considered essential for accessibility
          });
        }
      },
    }));

    // Initialize map on mount
    useEffect(() => {
      if (!mapContainerRef.current || mapRef.current) return;

      // Create map instance
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center,
        zoom,
        interactive,
      });

      // Add navigation controls (zoom buttons)
      if (interactive) {
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      }

      // Handle map click events
      if (onMapClick && interactive) {
        map.on('click', (e) => {
          onMapClick({
            latitude: e.lngLat.lat,
            longitude: e.lngLat.lng,
          });
        });
      }

      // Wait for map to load
      map.on('load', () => {
        // Map is ready
      });

      mapRef.current = map;

      // Cleanup on unmount
      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Update center and zoom when props change
    useEffect(() => {
      if (mapRef.current && center) {
        mapRef.current.flyTo({
          center,
          zoom,
          essential: true,
        });
      }
    }, [center, zoom]);

    // Update markers when markers prop changes
    useEffect(() => {
      if (!mapRef.current) return;

      // Remove existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Add new markers
      markers.forEach((markerData) => {
        const el = document.createElement('div');
        el.className = `mapbox-marker mapbox-marker-${markerData.type}`;

        // Add ARIA attributes for accessibility
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');

        if (markerData.type === 'selected') {
          el.setAttribute('aria-label', 'Selected location marker');
        } else if (markerData.type === 'nearby' && markerData.data) {
          el.setAttribute('aria-label', `Nearby masjid: ${markerData.data.name}, ${markerData.data.distance.toFixed(2)} km away`);
        }

        // Add selected state if this is the selected location
        if (markerData.id === selectedLocation) {
          el.classList.add('mapbox-marker-selected');
          el.setAttribute('aria-pressed', 'true');
        } else {
          el.setAttribute('aria-pressed', 'false');
        }

        // Create marker
        const marker = new mapboxgl.Marker({
          element: el,
          anchor: 'bottom',
        })
          .setLngLat([markerData.longitude, markerData.latitude])
          .addTo(mapRef.current!);

        // Add click handler for marker
        if (onMarkerClick) {
          const handleClick = (e: Event) => {
            e.stopPropagation(); // Prevent map click event
            onMarkerClick(markerData);
          };

          el.addEventListener('click', handleClick);

          // Add keyboard support (Enter or Space to activate)
          el.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick(e);
            }
          });

          el.style.cursor = 'pointer';
        }

        // Add popup for nearby masjids
        if (markerData.type === 'nearby' && markerData.data) {
          const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            className: 'mapbox-popup',
          }).setHTML(`
            <div class="mapbox-popup-content">
              <strong>${markerData.data.name}</strong>
              <p>${markerData.data.address}</p>
              <p class="text-sm text-gray-600">${markerData.data.distance.toFixed(2)} km away</p>
            </div>
          `);
          marker.setPopup(popup);

          // Show popup on hover
          el.addEventListener('mouseenter', () => marker.togglePopup());
          el.addEventListener('mouseleave', () => marker.togglePopup());
        }

        markersRef.current.push(marker);
      });
    }, [markers, selectedLocation, onMarkerClick]);

    // Update interactivity when prop changes
    useEffect(() => {
      if (!mapRef.current) return;

      if (interactive) {
        mapRef.current.scrollZoom.enable();
        mapRef.current.boxZoom.enable();
        mapRef.current.dragRotate.enable();
        mapRef.current.dragPan.enable();
        mapRef.current.keyboard.enable();
        mapRef.current.doubleClickZoom.enable();
        mapRef.current.touchZoomRotate.enable();
      } else {
        mapRef.current.scrollZoom.disable();
        mapRef.current.boxZoom.disable();
        mapRef.current.dragRotate.disable();
        mapRef.current.dragPan.disable();
        mapRef.current.keyboard.disable();
        mapRef.current.doubleClickZoom.disable();
        mapRef.current.touchZoomRotate.disable();
      }
    }, [interactive]);

    return (
      <div
        ref={mapContainerRef}
        className={`mapbox-container ${className}`}
        style={{ width: '100%', height: '100%' }}
        role="application"
        aria-label="Interactive map for selecting masjid location"
      />
    );
  }
);

MapboxMap.displayName = 'MapboxMap';

export default MapboxMap;
