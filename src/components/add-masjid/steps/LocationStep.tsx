'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MapPin, Search, Loader2, X, AlertCircle } from 'lucide-react';
import type { LocationData } from '@/types/add-masjid';

/**
 * LocationSearch result type from the existing API
 */
interface LocationSearchResult {
  id: string;
  name: string;
  fullName: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: string;
  country?: string;
  region?: string;
}

/**
 * Props for LocationStep component
 */
interface LocationStepProps {
  /**
   * Callback when user selects a location from search
   * This should trigger map pan to the selected location
   */
  onSearchSelect?: (location: LocationData) => void;

  /**
   * Callback when user selects a location (from any method)
   */
  onLocationSelect?: (location: LocationData) => void;

  /**
   * Currently selected location
   */
  selectedLocation: LocationData | null;

  /**
   * Callback to clear the selected location
   */
  onClearLocation?: () => void;
}

/**
 * LocationStep - First step in Add Masjid flow
 *
 * Features:
 * - Location search using existing LocationSearch pattern
 * - "Use my current location" button with Geolocation API
 * - Display selected address when location chosen
 * - Clear/reset button if location selected
 * - Instructions for users
 *
 * The parent component manages map state. This component emits location
 * selection events via callbacks.
 */
export default function LocationStep({
  onSearchSelect,
  onLocationSelect,
  selectedLocation,
  onClearLocation,
}: LocationStepProps) {
  // Search state
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Geolocation state
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Refs
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Handle selection from search results
   */
  const handleSelectResult = useCallback(
    (result: LocationSearchResult) => {
      setQuery(result.fullName);
      setIsOpen(false);
      setSelectedIndex(-1);

      const location: LocationData = {
        coordinates: {
          latitude: result.coordinates.latitude,
          longitude: result.coordinates.longitude,
        },
        address: result.fullName,
        placeName: result.name,
      };

      // Emit search select event (for map pan)
      if (onSearchSelect) {
        onSearchSelect(location);
      }

      // Emit location select event
      if (onLocationSelect) {
        onLocationSelect(location);
      }
    },
    [onSearchSelect, onLocationSelect]
  );

  /**
   * Handle keyboard navigation
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            handleSelectResult(results[selectedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, results, selectedIndex, handleSelectResult]);

  /**
   * Search locations using the existing API
   */
  const searchLocations = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(`/api/search/locations?q=${encodeURIComponent(searchQuery)}`);

      if (!response.ok) {
        throw new Error('Failed to search locations');
      }

      const data = await response.json();
      setResults(data.results || []);
      setIsOpen(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Location search error:', error);
      setResults([]);
      setIsOpen(false);
    } finally {
      setIsSearching(false);
    }
  }, []);

  /**
   * Handle search input change with debouncing
   */
  const handleInputChange = (value: string) => {
    setQuery(value);

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce search
    debounceRef.current = setTimeout(() => {
      searchLocations(value);
    }, 300);
  };

  /**
   * Clear search input
   */
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  /**
   * Handle "Use my current location" button
   */
  const handleCurrentLocation = useCallback(async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      // Get current position
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;

      // Reverse geocode to get address
      const response = await fetch(
        `/api/location/reverse-geocode?latitude=${latitude}&longitude=${longitude}`
      );

      if (!response.ok) {
        throw new Error('Failed to get address for your location');
      }

      const data = await response.json();

      const location: LocationData = {
        coordinates: {
          latitude,
          longitude,
        },
        address: data.address || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        placeName: data.placeName || 'Current Location',
      };

      // Update search input with address
      setQuery(location.address);

      // Emit search select event (for map pan)
      if (onSearchSelect) {
        onSearchSelect(location);
      }

      // Emit location select event
      if (onLocationSelect) {
        onLocationSelect(location);
      }
    } catch (error) {
      console.error('Geolocation error:', error);

      // Handle different error types
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(
              'Location permission denied. Please enable location access in your browser settings.'
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable. Please try again later.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please try again.');
            break;
          default:
            setLocationError('Failed to get your location. Please try again.');
        }
      } else if (error instanceof Error) {
        setLocationError(error.message);
      } else {
        setLocationError('Failed to get your location. Please try again.');
      }
    } finally {
      setIsLoadingLocation(false);
    }
  }, [onSearchSelect, onLocationSelect]);

  /**
   * Clear selected location
   */
  const handleClearLocation = () => {
    if (onClearLocation) {
      onClearLocation();
    }
    setQuery('');
    setLocationError(null);
  };

  /**
   * Get icon for search result type
   */
  const getResultIcon = (type: string) => {
    switch (type) {
      case 'place':
      case 'locality':
        return '🏙️';
      case 'neighborhood':
        return '🏘️';
      case 'address':
        return '📍';
      default:
        return '📍';
    }
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="text-center text-gray-600">
        <p className="text-sm">Search for an address or click on the map to select a location</p>
      </div>

      {/* Search Input */}
      <div ref={searchRef} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {isSearching ? (
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-gray-400" />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => {
              if (results.length > 0) {
                setIsOpen(true);
              }
            }}
            placeholder="Search for an address..."
            className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm transition-all"
            disabled={isLoadingLocation}
          />

          {query && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
            {results.map((result, index) => (
              <button
                key={result.id}
                onClick={() => handleSelectResult(result)}
                type="button"
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 first:rounded-t-lg last:rounded-b-lg ${
                  index === selectedIndex ? 'bg-primary-50 border-primary-200' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <span className="text-lg">{getResultIcon(result.type)}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900 truncate">{result.name}</p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 capitalize">
                        {result.type}
                      </span>
                    </div>

                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                      <p className="truncate">{result.fullName}</p>
                    </div>

                    {(result.region || result.country) && (
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                        {result.region && <span>{result.region}</span>}
                        {result.region && result.country && <span>•</span>}
                        {result.country && <span>{result.country}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* No Results */}
        {isOpen && !isSearching && query.length >= 2 && results.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-6 text-center">
            <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 font-medium">No locations found</p>
            <p className="text-gray-400 text-sm mt-1">Try searching for a different location</p>
          </div>
        )}
      </div>

      {/* Use Current Location Button */}
      <button
        type="button"
        onClick={handleCurrentLocation}
        disabled={isLoadingLocation}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoadingLocation ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Getting your location...</span>
          </>
        ) : (
          <>
            <MapPin className="w-5 h-5" />
            <span>Use my current location</span>
          </>
        )}
      </button>

      {/* Location Error Message */}
      {locationError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-900">Location Error</p>
              <p className="text-sm text-red-700 mt-1">{locationError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Selected Location Display */}
      {selectedLocation && (
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-primary-900">{selectedLocation.placeName}</p>
                <p className="text-sm text-primary-700 mt-1 break-words">
                  {selectedLocation.address}
                </p>
                <p className="text-xs text-primary-600 mt-2">
                  {selectedLocation.coordinates.latitude.toFixed(6)},{' '}
                  {selectedLocation.coordinates.longitude.toFixed(6)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClearLocation}
              className="flex-shrink-0 text-primary-600 hover:text-primary-700 transition-colors"
              aria-label="Clear location"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Map Click Instructions */}
      {!selectedLocation && (
        <div className="text-center py-8 text-gray-500">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <p className="font-medium">Or click on the map</p>
          <p className="text-sm mt-1">Select your location directly from the map</p>
        </div>
      )}
    </div>
  );
}
