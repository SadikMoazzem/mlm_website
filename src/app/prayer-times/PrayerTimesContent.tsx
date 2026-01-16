'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Search,
  MapPin,
  Loader2,
  X,
  Clock,
  Compass,
  Navigation,
  Building2,
  Download,
  Sun,
  Moon,
  Sunrise,
  Sunset,
} from 'lucide-react'
import { cities } from '@/data/cities'
import { MasjidData, CurrentPrayerTimes } from '@/types/api'

interface LocationSearchResult {
  id: string
  name: string
  fullName: string
  coordinates: {
    latitude: number
    longitude: number
  }
  type: string
  country?: string
  region?: string
}

interface SelectedLocation {
  name: string
  latitude: number
  longitude: number
}

// Prayer time calculation using basic astronomical formula
// This provides calculated times when no masjid data is available
function calculatePrayerTimes(
  latitude: number,
  longitude: number,
  date: Date
): CurrentPrayerTimes {
  // Simplified calculation - in production this would use a proper library like adhan-js
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  )

  // Very simplified calculation - adjust times based on latitude and season
  const baseOffset = (latitude - 51.5) * 4 // Offset from London in minutes
  const seasonalOffset = Math.sin((dayOfYear / 365) * 2 * Math.PI) * 60 // +/- 1 hour seasonal variation

  const formatTime = (hours: number, minutes: number): string => {
    const h = Math.floor(hours + minutes / 60) % 24
    const m = Math.floor(minutes) % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
  }

  // Base times for London at equinox
  const baseTimes = {
    fajr: { h: 5, m: 30 },
    sunrise: { h: 6, m: 45 },
    dhuhr: { h: 12, m: 30 },
    asr: { h: 15, m: 30 },
    maghrib: { h: 18, m: 30 },
    isha: { h: 20, m: 0 },
  }

  // Apply offsets (simplified)
  const adjustMinutes = (
    base: { h: number; m: number },
    offset: number
  ): string => {
    const totalMinutes = base.h * 60 + base.m + offset
    return formatTime(Math.floor(totalMinutes / 60), totalMinutes % 60)
  }

  const offset = baseOffset + seasonalOffset * 0.5

  return {
    date: date.toISOString().split('T')[0],
    masjid_id: 'calculated',
    fajr_start: adjustMinutes(baseTimes.fajr, -offset * 0.8),
    fajr_jammat: adjustMinutes(baseTimes.fajr, -offset * 0.8 + 15),
    sunrise: adjustMinutes(baseTimes.sunrise, -offset * 0.6),
    dhur_start: adjustMinutes(baseTimes.dhuhr, 0),
    dhur_jammat: adjustMinutes(baseTimes.dhuhr, 15),
    asr_start: adjustMinutes(baseTimes.asr, offset * 0.4),
    asr_start_1: adjustMinutes(baseTimes.asr, offset * 0.4 + 30),
    asr_jammat: adjustMinutes(baseTimes.asr, offset * 0.4 + 15),
    magrib_start: adjustMinutes(baseTimes.maghrib, offset * 0.6),
    magrib_jammat: adjustMinutes(baseTimes.maghrib, offset * 0.6 + 5),
    isha_start: adjustMinutes(baseTimes.isha, offset * 0.8),
    isha_jammat: adjustMinutes(baseTimes.isha, offset * 0.8 + 15),
    hijri_date: undefined,
  }
}

function formatPrayerTime(time?: string | null): string {
  if (!time) return '-'
  try {
    const [hours, minutes] = time.split(':').map(Number)
    let hours12 = hours % 12
    hours12 = hours12 === 0 ? 12 : hours12
    const ampm = hours >= 12 ? 'pm' : 'am'
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`
  } catch {
    return '-'
  }
}

function getPrayerIcon(name: string) {
  switch (name.toLowerCase()) {
    case 'fajr':
      return <Moon className="w-5 h-5" />
    case 'sunrise':
      return <Sunrise className="w-5 h-5" />
    case 'dhuhr':
    case 'zuhr':
      return <Sun className="w-5 h-5" />
    case 'asr':
      return <Sun className="w-5 h-5" />
    case 'maghrib':
      return <Sunset className="w-5 h-5" />
    case 'isha':
      return <Moon className="w-5 h-5" />
    default:
      return <Clock className="w-5 h-5" />
  }
}

export default function PrayerTimesContent() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<LocationSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLocating, setIsLocating] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null)
  const [prayerTimes, setPrayerTimes] = useState<CurrentPrayerTimes | null>(
    null
  )
  const [nearbyMasjids, setNearbyMasjids] = useState<MasjidData[]>([])
  const [isLoadingTimes, setIsLoadingTimes] = useState(false)
  const [timesSource, setTimesSource] = useState<'masjid' | 'calculated'>(
    'calculated'
  )

  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
          break
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
          break
        case 'Enter':
          event.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            handleSelectResult(results[selectedIndex])
          }
          break
        case 'Escape':
          setIsOpen(false)
          setSelectedIndex(-1)
          inputRef.current?.blur()
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, results, selectedIndex])

  const searchLocations = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        `/api/search/locations?q=${encodeURIComponent(searchQuery)}`
      )

      if (!response.ok) {
        throw new Error('Failed to search locations')
      }

      const data = await response.json()
      setResults(data.results || [])
      setIsOpen(true)
      setSelectedIndex(-1)
    } catch {
      setResults([])
      setIsOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (value: string) => {
    setQuery(value)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      searchLocations(value)
    }, 300)
  }

  const handleSelectResult = (result: LocationSearchResult) => {
    setQuery(result.fullName)
    setIsOpen(false)
    setSelectedIndex(-1)

    setSelectedLocation({
      name: result.fullName,
      latitude: result.coordinates.latitude,
      longitude: result.coordinates.longitude,
    })
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const handleUseMyLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocationError(
        'Geolocation is not supported by your browser. Please search for a location instead.'
      )
      return
    }

    setIsLocating(true)
    setLocationError(null)

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000,
          })
        }
      )

      const { latitude, longitude } = position.coords

      // Reverse geocode to get location name
      try {
        const response = await fetch(
          `/api/location/reverse-geocode?latitude=${latitude}&longitude=${longitude}`
        )
        if (response.ok) {
          const data = await response.json()
          setQuery(data.address || 'Your Location')
          setSelectedLocation({
            name: data.address || 'Your Location',
            latitude,
            longitude,
          })
        } else {
          setSelectedLocation({
            name: 'Your Location',
            latitude,
            longitude,
          })
        }
      } catch {
        setSelectedLocation({
          name: 'Your Location',
          latitude,
          longitude,
        })
      }
    } catch (error) {
      const geoError = error as GeolocationPositionError
      switch (geoError.code) {
        case geoError.PERMISSION_DENIED:
          setLocationError(
            'Location access was denied. Please enable location services or search manually.'
          )
          break
        case geoError.POSITION_UNAVAILABLE:
          setLocationError(
            'Location information is unavailable. Please try again or search manually.'
          )
          break
        case geoError.TIMEOUT:
          setLocationError(
            'Location request timed out. Please try again or search manually.'
          )
          break
        default:
          setLocationError(
            'Unable to get your location. Please search manually.'
          )
      }
    } finally {
      setIsLocating(false)
    }
  }, [])

  // Fetch prayer times when location is selected
  useEffect(() => {
    if (!selectedLocation) return

    const fetchPrayerTimes = async () => {
      setIsLoadingTimes(true)

      try {
        // Try to get prayer times from nearest masjids
        const response = await fetch(
          `/api/masjids/nearest?latitude=${selectedLocation.latitude}&longitude=${selectedLocation.longitude}&radius_km=5&size=5`
        )

        if (response.ok) {
          const data = await response.json()
          if (data.masjids && data.masjids.length > 0) {
            setNearbyMasjids(data.masjids)

            // Use the first masjid's prayer times if available
            const firstMasjid = data.masjids[0]
            if (firstMasjid.current_prayer_times) {
              setPrayerTimes(firstMasjid.current_prayer_times)
              setTimesSource('masjid')
            } else {
              // Calculate if no masjid times
              const calculated = calculatePrayerTimes(
                selectedLocation.latitude,
                selectedLocation.longitude,
                new Date()
              )
              setPrayerTimes(calculated)
              setTimesSource('calculated')
            }
          } else {
            // No masjids found, calculate times
            const calculated = calculatePrayerTimes(
              selectedLocation.latitude,
              selectedLocation.longitude,
              new Date()
            )
            setPrayerTimes(calculated)
            setTimesSource('calculated')
            setNearbyMasjids([])
          }
        } else {
          // API error, calculate times
          const calculated = calculatePrayerTimes(
            selectedLocation.latitude,
            selectedLocation.longitude,
            new Date()
          )
          setPrayerTimes(calculated)
          setTimesSource('calculated')
        }
      } catch (error) {
        console.error('Error fetching prayer times:', error)
        // Fallback to calculated times
        const calculated = calculatePrayerTimes(
          selectedLocation.latitude,
          selectedLocation.longitude,
          new Date()
        )
        setPrayerTimes(calculated)
        setTimesSource('calculated')
      } finally {
        setIsLoadingTimes(false)
      }
    }

    fetchPrayerTimes()
  }, [selectedLocation])

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'place':
      case 'locality':
        return <Building2 className="w-4 h-4" />
      case 'neighborhood':
        return <MapPin className="w-4 h-4" />
      case 'address':
        return <Navigation className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  // Quick city links
  const quickCities = cities.slice(0, 6)

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
              <Clock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-text-primary mb-4 tracking-tight">
              Prayer Times
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
              Find accurate prayer times for any location. Search by city or
              use your current location for instant results.
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)] mb-8">
            <div ref={searchRef} className="relative mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-text-muted animate-spin" />
                  ) : (
                    <Search className="w-5 h-5 text-text-muted" />
                  )}
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => {
                    if (results.length > 0) {
                      setIsOpen(true)
                    }
                  }}
                  placeholder="Search for a location..."
                  className="w-full pl-12 pr-12 py-4 text-lg border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-bg-primary text-text-primary placeholder:text-text-muted transition-all"
                />

                {query && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-secondary transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-bg-card border border-[var(--border)] rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelectResult(result)}
                      className={`w-full px-4 py-3 text-left hover:bg-bg-secondary transition-colors border-b border-[var(--border)] last:border-b-0 first:rounded-t-xl last:rounded-b-xl ${
                        index === selectedIndex
                          ? 'bg-primary-50 dark:bg-primary-900/20'
                          : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1 text-primary-600 dark:text-primary-400">
                          {getResultIcon(result.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-text-primary truncate">
                            {result.name}
                          </p>
                          <p className="text-sm text-text-secondary truncate">
                            {result.fullName}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Use My Location Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={handleUseMyLocation}
                disabled={isLocating}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLocating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Compass className="w-5 h-5" />
                )}
                {isLocating ? 'Locating...' : 'Use My Location'}
              </button>
            </div>

            {/* Location Error */}
            {locationError && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
                {locationError}
              </div>
            )}
          </div>

          {/* Prayer Times Display */}
          {isLoadingTimes && (
            <div className="bg-bg-card rounded-2xl p-8 shadow-sm border border-[var(--border)] mb-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
              <p className="text-text-secondary">Loading prayer times...</p>
            </div>
          )}

          {!isLoadingTimes && prayerTimes && selectedLocation && (
            <div className="bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)] mb-8">
              {/* Location Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">{selectedLocation.name}</span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {new Date().toLocaleDateString('en-GB', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                    {prayerTimes.hijri_date && ` | ${prayerTimes.hijri_date}`}
                  </p>
                </div>
                {timesSource === 'calculated' && (
                  <div className="text-xs text-text-muted bg-bg-secondary px-3 py-1 rounded-full">
                    Calculated times
                  </div>
                )}
              </div>

              {/* Prayer Times Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Fajr', time: prayerTimes.fajr_start },
                  { name: 'Sunrise', time: prayerTimes.sunrise },
                  { name: 'Dhuhr', time: prayerTimes.dhur_start },
                  { name: 'Asr', time: prayerTimes.asr_start },
                  { name: 'Maghrib', time: prayerTimes.magrib_start },
                  { name: 'Isha', time: prayerTimes.isha_start },
                ].map((prayer) => (
                  <div
                    key={prayer.name}
                    className="bg-bg-primary rounded-xl p-4 text-center border border-[var(--border)] hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                  >
                    <div className="flex items-center justify-center text-primary-600 dark:text-primary-400 mb-2">
                      {getPrayerIcon(prayer.name)}
                    </div>
                    <p className="text-sm text-text-secondary mb-1">
                      {prayer.name}
                    </p>
                    <p className="text-xl font-semibold text-text-primary">
                      {formatPrayerTime(prayer.time)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Nearby Masjids Link */}
              {nearbyMasjids.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[var(--border)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-text-primary">
                      Nearby Masjids
                    </h3>
                    <Link
                      href={`/masjids/near/${selectedLocation.latitude}/${selectedLocation.longitude}?query=${encodeURIComponent(selectedLocation.name)}&source=prayer-times&radius=5`}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {nearbyMasjids.slice(0, 3).map((masjid) => (
                      <Link
                        key={masjid.id}
                        href={`/masjid/${masjid.id}/${encodeURIComponent((masjid.name || 'masjid').toLowerCase().replace(/\s+/g, '-'))}`}
                        className="flex items-center justify-between p-3 bg-bg-primary rounded-xl border border-[var(--border)] hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {masjid.name}
                            </p>
                            <p className="text-sm text-text-muted">
                              {masjid.distance_km
                                ? `${masjid.distance_km.toFixed(1)} km away`
                                : masjid.location?.city || ''}
                            </p>
                          </div>
                        </div>
                        <span className="text-text-muted group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* No Results State / Quick City Links */}
          {!selectedLocation && !isLoadingTimes && (
            <div className="bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)] mb-8">
              <h3 className="font-medium text-text-primary mb-4 text-center">
                Quick Access
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {quickCities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      setQuery(city.name)
                      setSelectedLocation({
                        name: `${city.name}, ${city.country}`,
                        latitude: city.latitude,
                        longitude: city.longitude,
                      })
                    }}
                    className="flex items-center gap-2 p-3 bg-bg-primary rounded-xl border border-[var(--border)] hover:border-primary-300 dark:hover:border-primary-700 transition-colors text-left group"
                  >
                    <MapPin className="w-4 h-4 text-text-muted group-hover:text-primary-600 dark:group-hover:text-primary-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">
                      {city.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* App Download CTA */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 sm:p-8 text-white text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Get Prayer Time Notifications
            </h3>
            <p className="text-primary-100 mb-6 max-w-md mx-auto">
              Download the MyLocalMasjid app for prayer reminders, Qibla
              compass, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://apps.apple.com/app/mylocalmasjid"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.mylocalmasjid"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31M6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
                </svg>
                Play Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
