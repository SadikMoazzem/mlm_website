'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { LocationData, NearbyMasjid } from '@/types/add-masjid';

/**
 * Props for the NearbyCheckStep component
 */
export interface NearbyCheckStepProps {
  /** Selected location from step 1 */
  location: LocationData;
  /** Callback when nearby masjids are loaded - updates map markers */
  onNearbyMasjidsLoaded: (masjids: NearbyMasjid[]) => void;
  /** Callback when user clicks "This is my masjid" - navigates to masjid page */
  onMasjidSelect: (masjid: NearbyMasjid) => void;
  /** ID of the highlighted masjid (from map marker click) */
  highlightedMasjidId?: string;
}

/**
 * Step 2: Nearby Masjids Check
 *
 * Shows a list of masjids near the selected location to prevent duplicates.
 * User can either:
 * - Click "This is my masjid" to navigate to the existing masjid page
 * - Click "My masjid is not listed" (via parent's next button) to continue
 *
 * Map shows both the selected location (primary marker) and nearby masjids (secondary markers).
 */
const NearbyCheckStep: React.FC<NearbyCheckStepProps> = ({
  location,
  onNearbyMasjidsLoaded,
  onMasjidSelect,
  highlightedMasjidId,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nearbyMasjids, setNearbyMasjids] = useState<NearbyMasjid[]>([]);
  const [hoveredMasjidId, setHoveredMasjidId] = useState<string | null>(null);

  // Countdown modal state
  const [selectedMasjidForRedirect, setSelectedMasjidForRedirect] = useState<NearbyMasjid | null>(null);
  const [countdown, setCountdown] = useState(3);

  /**
   * Fetch nearby masjids on mount
   */
  useEffect(() => {
    const fetchNearbyMasjids = async () => {
      try {
        setLoading(true);
        setError(null);

        const { latitude, longitude } = location.coordinates;
        const response = await fetch(
          `/api/masjid/check-nearby?latitude=${latitude}&longitude=${longitude}&radius_km=2`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch nearby masjids');
        }

        const data = await response.json();
        const masjids = data.masjids || [];

        setNearbyMasjids(masjids);
        onNearbyMasjidsLoaded(masjids);
      } catch (err) {
        console.error('Error fetching nearby masjids:', err);
        setError(err instanceof Error ? err.message : 'Failed to load nearby masjids');
        onNearbyMasjidsLoaded([]); // Still update map with empty array
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyMasjids();
  }, [location, onNearbyMasjidsLoaded]);

  /**
   * Countdown effect - runs when a masjid is selected for redirect
   */
  useEffect(() => {
    if (!selectedMasjidForRedirect) return;

    // Reset countdown when a new masjid is selected
    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedMasjidForRedirect]);

  /**
   * Navigate when countdown reaches 0
   */
  useEffect(() => {
    if (countdown === 0 && selectedMasjidForRedirect) {
      onMasjidSelect(selectedMasjidForRedirect);
      const slugName = encodeURIComponent(selectedMasjidForRedirect.name.toLowerCase().replace(/\s+/g, '-'));
      router.push(`/masjid/${selectedMasjidForRedirect.id}/${slugName}`);
    }
  }, [countdown, selectedMasjidForRedirect, onMasjidSelect, router]);

  /**
   * Handle masjid click - show countdown modal
   */
  const handleMasjidClick = useCallback((masjid: NearbyMasjid) => {
    setSelectedMasjidForRedirect(masjid);
  }, []);

  /**
   * Cancel redirect and close modal
   */
  const handleCancelRedirect = useCallback(() => {
    setSelectedMasjidForRedirect(null);
    setCountdown(3);
  }, []);

  /**
   * Loading state
   */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        <p className="mt-4 text-gray-600 text-sm">Checking for nearby masjids...</p>
      </div>
    );
  }

  /**
   * Error state - parent's next button will allow user to continue
   */
  if (error) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            Unable to check for nearby masjids. You can still continue with your submission using the button below.
          </p>
        </div>
      </div>
    );
  }

  /**
   * Empty state - no nearby masjids found - parent's next button will allow user to continue
   */
  if (nearbyMasjids.length === 0) {
    return (
      <div className="space-y-4">
        <div className="p-6 bg-primary-50 border border-primary-200 rounded-lg text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No nearby masjids found</h3>
          <p className="text-sm text-gray-600">
            Great! It looks like this will be a new addition to our database. Click the button below to continue.
          </p>
        </div>
      </div>
    );
  }

  /**
   * List of nearby masjids
   */
  return (
    <>
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>We found {nearbyMasjids.length} {nearbyMasjids.length === 1 ? 'masjid' : 'masjids'} nearby.</strong>{' '}
            If your masjid is listed below, please click on it instead of creating a duplicate entry.
          </p>
        </div>

        {/* List of nearby masjids */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {nearbyMasjids.map((masjid) => {
            const isHighlighted = masjid.id === highlightedMasjidId || masjid.id === hoveredMasjidId;

            return (
              <button
                key={masjid.id}
                type="button"
                className={`w-full p-4 border rounded-lg transition-all cursor-pointer text-left ${
                  isHighlighted
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm'
                }`}
                onMouseEnter={() => setHoveredMasjidId(masjid.id)}
                onMouseLeave={() => setHoveredMasjidId(null)}
                onClick={() => handleMasjidClick(masjid)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1">{masjid.name}</h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{masjid.address}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{masjid.distance.toFixed(2)} km away</span>
                    </div>
                  </div>
                  <span className="flex-shrink-0 px-3 py-2 text-xs font-medium text-primary-600 border border-primary-300 rounded-lg bg-white">
                    This is my masjid
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Countdown Modal */}
      <AnimatePresence>
        {selectedMasjidForRedirect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={handleCancelRedirect}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-sm mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Opening masjid profile
              </h3>
              <p className="text-gray-600 mb-1">
                {selectedMasjidForRedirect.name}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                {selectedMasjidForRedirect.address}
              </p>

              {/* Countdown number with animation */}
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={countdown}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-6xl font-bold text-primary-500"
                  >
                    {countdown}
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={handleCancelRedirect}
                className="px-6 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NearbyCheckStep;
