'use client';

import dynamic from 'next/dynamic';
import { useRef, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MapLoadingSkeleton from './components/MapLoadingSkeleton';
import { BackButton } from './components/BackButton';
import { LocationSearch } from './components/LocationSearch';
import { FilterChips } from './components/FilterChips';
import { GPSButton } from './components/GPSButton';
import { MasjidListPanel } from './components/MasjidListPanel';
import { DesktopSidebar } from './components/DesktopSidebar';
import { useFinderStore } from './store/useFinderStore';
import type { MasjidFinderMapHandle } from './components/MasjidFinderMap';
import type { Coordinates, MasjidFeature } from './types';

const MasjidFinderMap = dynamic(
  () => import('./components/MasjidFinderMap'),
  {
    ssr: false,
    loading: () => <MapLoadingSkeleton />
  }
);

export default function MasjidFinderPage() {
  const mapRef = useRef<MasjidFinderMapHandle>(null);
  const searchParams = useSearchParams();

  // Get state from store
  const center = useFinderStore((state) => state.center);
  const zoom = useFinderStore((state) => state.zoom);
  const filterExpression = useFinderStore((state) => state.filterExpression);
  const selectedMasjidId = useFinderStore((state) => state.selectedMasjidId);
  const searchedLocation = useFinderStore((state) => state.searchedLocation);
  const visibleMasjids = useFinderStore((state) => state.visibleMasjids);

  // Get actions from store
  const setCenter = useFinderStore((state) => state.setCenter);
  const setSelectedMasjidId = useFinderStore((state) => state.setSelectedMasjidId);
  const setVisibleMasjids = useFinderStore((state) => state.setVisibleMasjids);

  // Initialize from URL params on mount
  useEffect(() => {
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const zoomParam = searchParams.get('zoom');

    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      const zoomLevel = zoomParam ? parseInt(zoomParam, 10) : 13;

      if (!isNaN(latitude) && !isNaN(longitude)) {
        setCenter({ latitude, longitude }, zoomLevel);
      }
    }
  }, [searchParams, setCenter]);

  // Handle marker click
  const handleMarkerClick = useCallback((masjidId: string) => {
    setSelectedMasjidId(masjidId);

    // Find the masjid in visible list and fly to it
    const masjid = visibleMasjids.find(m => m.id === masjidId);
    if (masjid && mapRef.current) {
      mapRef.current.flyTo(masjid.coordinates, 15);
    }
  }, [setSelectedMasjidId, visibleMasjids]);

  // Handle masjid selection from sidebar/list
  const handleMasjidSelect = useCallback((masjid: MasjidFeature) => {
    setSelectedMasjidId(masjid.id);
    if (mapRef.current) {
      mapRef.current.flyTo(masjid.coordinates, 15);
    }
  }, [setSelectedMasjidId]);

  // Handle map idle - update visible masjids
  const handleMapIdle = useCallback((newCenter: Coordinates, masjids: MasjidFeature[]) => {
    setCenter(newCenter);
    setVisibleMasjids(masjids);
  }, [setCenter, setVisibleMasjids]);

  // Handle map interaction (user pan/zoom)
  const handleMapInteraction = useCallback(() => {
    // Could clear searched location or show "search this area" button
  }, []);

  return (
    <div className="h-full w-full relative flex">
      {/* Desktop Sidebar - hidden on mobile */}
      <DesktopSidebar onMasjidSelect={handleMasjidSelect} />

      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Mobile Search Header - hidden on desktop */}
        <div className="lg:hidden absolute top-0 left-0 right-0 z-10 p-4 pt-safe">
          <div className="flex flex-col gap-3">
            {/* Top row: Back button + Search */}
            <div className="flex items-center gap-3">
              <BackButton />
              <LocationSearch />
            </div>
            {/* Filter chips */}
            <FilterChips />
          </div>
        </div>

        {/* Map */}
        <MasjidFinderMap
          ref={mapRef}
          center={center}
          zoom={zoom}
          filterExpression={filterExpression ?? undefined}
          selectedMasjidId={selectedMasjidId ?? undefined}
          searchedLocation={searchedLocation ?? undefined}
          onMarkerClick={handleMarkerClick}
          onMapIdle={handleMapIdle}
          onMapInteraction={handleMapInteraction}
        />

        {/* GPS Button - positioned above list panel on mobile, different on desktop */}
        <div className="absolute bottom-[220px] lg:bottom-4 right-4 z-10">
          <GPSButton />
        </div>

        {/* Mobile Masjid List Panel - hidden on desktop */}
        <div className="lg:hidden">
          <MasjidListPanel />
        </div>
      </div>
    </div>
  );
}
