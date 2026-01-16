'use client';

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Throttle helper to limit function calls
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): T {
  let inThrottle = false;
  return ((...args: unknown[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  }) as T;
}
import {
  TILESET_URL,
  LAYER_IDS,
  MARKER_COLORS,
  MAP_DEFAULTS,
} from '../config/mapboxTilesetConfig';
import type {
  Coordinates,
  MasjidFeature,
  FilterExpression,
  SearchedLocation,
} from '../types';

// Initialize Mapbox access token
if (typeof window !== 'undefined') {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
}

/**
 * Props for the MasjidFinderMap component
 */
export interface MasjidFinderMapProps {
  /** Center coordinates of the map */
  center?: Coordinates | null;
  /** Zoom level of the map */
  zoom?: number;
  /** Dynamic filter expression for masjid markers */
  filterExpression?: FilterExpression;
  /** ID of the currently selected masjid */
  selectedMasjidId?: string | null;
  /** Searched location to show a pin for */
  searchedLocation?: SearchedLocation | null;
  /** Callback when a marker is clicked */
  onMarkerClick?: (masjidId: string) => void;
  /** Callback when map stops moving */
  onMapIdle?: (center: Coordinates, visibleMasjids: MasjidFeature[]) => void;
  /** Callback when user interacts with the map (pan/zoom) */
  onMapInteraction?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Methods exposed via ref for programmatic control
 */
export interface MasjidFinderMapHandle {
  flyTo: (coordinates: Coordinates, zoom?: number) => void;
  getMap: () => mapboxgl.Map | null;
}

/**
 * MasjidFinderMap Component
 *
 * Full-screen interactive map with masjid markers rendered from Mapbox tileset.
 * Supports filtering, selection highlighting, and efficient rendering of thousands of markers.
 */
const MasjidFinderMap = forwardRef<MasjidFinderMapHandle, MasjidFinderMapProps>(
  (
    {
      center,
      zoom,
      filterExpression,
      selectedMasjidId,
      searchedLocation,
      onMarkerClick,
      onMapIdle,
      onMapInteraction,
      className = '',
    },
    ref
  ) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const searchPinRef = useRef<mapboxgl.Marker | null>(null);
    const isInitializedRef = useRef(false);

    // Throttled version of onMapIdle to prevent excessive calls
    const throttledOnMapIdle = useMemo(() => {
      if (!onMapIdle) return null;
      return throttle((mapCenter: Coordinates, masjids: MasjidFeature[]) => {
        onMapIdle(mapCenter, masjids);
      }, 300); // Only call at most every 300ms
    }, [onMapIdle]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      flyTo: (coordinates: Coordinates, zoomLevel?: number) => {
        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [coordinates.longitude, coordinates.latitude],
            zoom: zoomLevel ?? mapRef.current.getZoom(),
            essential: true,
          });
        }
      },
      getMap: () => mapRef.current,
    }));

    // Query visible masjids from rendered features
    const queryVisibleMasjids = useCallback((): MasjidFeature[] => {
      const map = mapRef.current;
      if (!map) return [];

      try {
        const features = map.queryRenderedFeatures({
          layers: [LAYER_IDS.POINTS, LAYER_IDS.SYMBOLS],
        });

        const masjidMap = new Map<string, MasjidFeature>();

        features.forEach((feature) => {
          const props = feature.properties;
          if (!props?.id || masjidMap.has(props.id)) return;

          const coords = (feature.geometry as GeoJSON.Point).coordinates;
          masjidMap.set(props.id, {
            id: props.id,
            name: props.name || 'Unknown',
            type: props.type || 'masjid',
            madhab: props.madhab,
            has_women_area: props.has_women_area,
            has_parking: props.has_parking,
            address: props.address,
            city: props.city,
            coordinates: { latitude: coords[1], longitude: coords[0] },
          });
        });

        return Array.from(masjidMap.values());
      } catch (error) {
        console.error('[MasjidFinderMap] Error querying features:', error);
        return [];
      }
    }, []);

    // Initialize map on mount
    useEffect(() => {
      if (!mapContainerRef.current || mapRef.current) return;

      const effectiveCenter = center
        ? [center.longitude, center.latitude]
        : MAP_DEFAULTS.center;
      const effectiveZoom = zoom ?? MAP_DEFAULTS.zoom;

      // Create map instance
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: effectiveCenter as [number, number],
        zoom: effectiveZoom,
        minZoom: MAP_DEFAULTS.minZoom,
        maxZoom: MAP_DEFAULTS.maxZoom,
      });

      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Wait for map to load before adding layers
      map.on('load', () => {
        // Load the mosque logo icon for markers
        map.loadImage('/logo.png', (error, image) => {
          if (error) {
            console.error('[MasjidFinderMap] Error loading logo:', error);
            return;
          }
          if (image) {
            map.addImage('mosque-icon', image, { sdf: false });
          }

          // Add vector source for masjid tileset
          map.addSource(LAYER_IDS.SOURCE, {
            type: 'vector',
            url: TILESET_URL,
          });

          // Symbol layer for all masjids with the mosque icon
          map.addLayer({
            id: LAYER_IDS.SYMBOLS,
            type: 'symbol',
            source: LAYER_IDS.SOURCE,
            'source-layer': LAYER_IDS.SOURCE_LAYER,
            layout: {
              'icon-image': 'mosque-icon',
              'icon-size': [
                'interpolate',
                ['linear'],
                ['zoom'],
                8, 0.03,
                12, 0.05,
                14, 0.07,
                16, 0.1,
              ],
              'icon-allow-overlap': true,
              'icon-ignore-placement': false,
            },
            paint: {
              'icon-opacity': 1,
            },
          });

          // Hidden layer for click detection and querying
          map.addLayer({
            id: LAYER_IDS.POINTS,
            type: 'circle',
            source: LAYER_IDS.SOURCE,
            'source-layer': LAYER_IDS.SOURCE_LAYER,
            paint: {
              'circle-radius': 15,
              'circle-opacity': 0, // Invisible, just for click detection
            },
          });

          // Text labels layer (visible at zoom 14+)
          map.addLayer({
            id: LAYER_IDS.LABELS,
            type: 'symbol',
            source: LAYER_IDS.SOURCE,
            'source-layer': LAYER_IDS.SOURCE_LAYER,
            minzoom: MAP_DEFAULTS.labelZoom,
            layout: {
              'text-field': ['get', 'name'],
              'text-size': 12,
              'text-offset': [0, 1.8],
              'text-anchor': 'top',
              'text-max-width': 10,
              'text-optional': true,
            },
            paint: {
              'text-color': MARKER_COLORS.light.text,
              'text-halo-color': MARKER_COLORS.light.textHalo,
              'text-halo-width': 2,
            },
          });

          isInitializedRef.current = true;

          // Initial callback with visible masjids (delayed to ensure tiles are loaded)
          setTimeout(() => {
            if (throttledOnMapIdle) {
              const mapCenter = map.getCenter();
              const visibleMasjids = queryVisibleMasjids();
              throttledOnMapIdle(
                { latitude: mapCenter.lat, longitude: mapCenter.lng },
                visibleMasjids
              );
            }
          }, 500);
        });
      });

      // Handle marker clicks
      map.on('click', LAYER_IDS.POINTS, (e) => {
        if (e.features && e.features[0]?.properties?.id && onMarkerClick) {
          onMarkerClick(e.features[0].properties.id);
        }
      });

      map.on('click', LAYER_IDS.SYMBOLS, (e) => {
        if (e.features && e.features[0]?.properties?.id && onMarkerClick) {
          onMarkerClick(e.features[0].properties.id);
        }
      });

      // Change cursor on marker hover
      map.on('mouseenter', LAYER_IDS.POINTS, () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', LAYER_IDS.POINTS, () => {
        map.getCanvas().style.cursor = '';
      });
      map.on('mouseenter', LAYER_IDS.SYMBOLS, () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', LAYER_IDS.SYMBOLS, () => {
        map.getCanvas().style.cursor = '';
      });

      // Handle map movement
      map.on('movestart', () => {
        if (onMapInteraction) {
          onMapInteraction();
        }
      });

      map.on('idle', () => {
        if (throttledOnMapIdle && isInitializedRef.current) {
          const mapCenter = map.getCenter();
          const visibleMasjids = queryVisibleMasjids();
          throttledOnMapIdle(
            { latitude: mapCenter.lat, longitude: mapCenter.lng },
            visibleMasjids
          );
        }
      });

      mapRef.current = map;

      // Cleanup on unmount
      return () => {
        if (searchPinRef.current) {
          searchPinRef.current.remove();
          searchPinRef.current = null;
        }
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Update center when prop changes
    useEffect(() => {
      if (mapRef.current && center && isInitializedRef.current) {
        mapRef.current.flyTo({
          center: [center.longitude, center.latitude],
          zoom: zoom ?? mapRef.current.getZoom(),
          essential: true,
        });
      }
    }, [center, zoom]);

    // Update filter expression when it changes
    useEffect(() => {
      const map = mapRef.current;
      if (!map || !isInitializedRef.current) return;

      // Apply filter to all layers
      const filter = filterExpression || ['literal', true];

      try {
        if (map.getLayer(LAYER_IDS.POINTS)) {
          map.setFilter(LAYER_IDS.POINTS, filter as mapboxgl.FilterSpecification);
        }
        if (map.getLayer(LAYER_IDS.SYMBOLS)) {
          map.setFilter(LAYER_IDS.SYMBOLS, filter as mapboxgl.FilterSpecification);
        }
        if (map.getLayer(LAYER_IDS.LABELS)) {
          map.setFilter(LAYER_IDS.LABELS, filter as mapboxgl.FilterSpecification);
        }
      } catch (error) {
        console.error('[MasjidFinderMap] Error applying filter:', error);
      }
    }, [filterExpression]);

    // Update selected marker highlighting
    useEffect(() => {
      const map = mapRef.current;
      if (!map || !isInitializedRef.current) return;

      try {
        // Update icon size based on selection (make selected marker larger)
        if (map.getLayer(LAYER_IDS.SYMBOLS)) {
          map.setLayoutProperty(LAYER_IDS.SYMBOLS, 'icon-size', [
            'case',
            ['==', ['get', 'id'], selectedMasjidId || ''],
            [
              'interpolate',
              ['linear'],
              ['zoom'],
              8, 0.05,
              12, 0.08,
              14, 0.11,
              16, 0.15,
            ],
            [
              'interpolate',
              ['linear'],
              ['zoom'],
              8, 0.03,
              12, 0.05,
              14, 0.07,
              16, 0.1,
            ],
          ]);
        }
      } catch (error) {
        console.error('[MasjidFinderMap] Error updating selection:', error);
      }
    }, [selectedMasjidId]);

    // Update searched location pin
    useEffect(() => {
      const map = mapRef.current;
      if (!map) return;

      // Remove existing pin
      if (searchPinRef.current) {
        searchPinRef.current.remove();
        searchPinRef.current = null;
      }

      // Add new pin if location is set
      if (searchedLocation) {
        const el = document.createElement('div');
        el.innerHTML = `
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#E53935"/>
            <circle cx="12" cy="9" r="2.5" fill="white"/>
          </svg>
        `;
        el.style.cursor = 'pointer';

        const marker = new mapboxgl.Marker({
          element: el,
          anchor: 'bottom',
        })
          .setLngLat([
            searchedLocation.coordinates.longitude,
            searchedLocation.coordinates.latitude,
          ])
          .addTo(map);

        searchPinRef.current = marker;
      }
    }, [searchedLocation]);

    return (
      <div
        ref={mapContainerRef}
        className={`w-full h-full ${className}`}
        role="application"
        aria-label="Interactive map showing masjids. Use the list panel to browse nearby masjids."
      />
    );
  }
);

MasjidFinderMap.displayName = 'MasjidFinderMap';

export default MasjidFinderMap;
