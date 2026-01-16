'use client'

import { MapPin, Users, Clock, Compass, Map } from 'lucide-react'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { ResolvedLocation } from '@/types/location'
import type { CalculatedPrayerTimes } from '@/lib/prayer-times-calculator'
import { formatTimeDisplay } from '@/lib/prayer-times-calculator'

export interface LocationHeaderProps {
  location: ResolvedLocation
  date: Date
  stats: {
    masjidCount?: number
    areaCount?: number
  }
  prayerTimes?: CalculatedPrayerTimes
}

type PrayerName = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'

/**
 * Convert a Gregorian date to Hijri using Intl API
 */
function getHijriDate(date: Date): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    return formatter.format(date)
  } catch {
    return ''
  }
}

/**
 * Parse time string (HH:mm) to minutes since midnight
 */
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

/**
 * Get the next prayer and time remaining
 */
function getNextPrayer(
  prayerTimes: CalculatedPrayerTimes,
  now: Date
): { name: string; key: PrayerName; timeRemaining: string } | null {
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const prayers: { name: string; key: PrayerName }[] = [
    { name: 'Fajr', key: 'fajr' },
    { name: 'Sunrise', key: 'sunrise' },
    { name: 'Dhuhr', key: 'dhuhr' },
    { name: 'Asr', key: 'asr' },
    { name: 'Maghrib', key: 'maghrib' },
    { name: 'Isha', key: 'isha' },
  ]

  for (const prayer of prayers) {
    const prayerMinutes = timeToMinutes(prayerTimes[prayer.key])
    if (prayerMinutes > currentMinutes) {
      const diff = prayerMinutes - currentMinutes
      const hours = Math.floor(diff / 60)
      const mins = diff % 60

      let timeRemaining: string
      if (hours > 0 && mins > 0) {
        timeRemaining = `${hours}h ${mins}m`
      } else if (hours > 0) {
        timeRemaining = `${hours}h`
      } else {
        timeRemaining = `${mins}m`
      }

      return { name: prayer.name, key: prayer.key, timeRemaining }
    }
  }

  // All prayers passed, next is Fajr tomorrow
  const fajrMinutes = timeToMinutes(prayerTimes.fajr)
  const minutesUntilMidnight = 24 * 60 - currentMinutes
  const totalMinutes = minutesUntilMidnight + fajrMinutes
  const hours = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60

  return {
    name: 'Fajr',
    key: 'fajr',
    timeRemaining: hours > 0 ? `${hours}h ${mins}m` : `${mins}m`,
  }
}

const PRAYER_ORDER: PrayerName[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']
const PRAYER_LABELS: Record<PrayerName, string> = {
  fajr: 'Fajr',
  sunrise: 'Sunrise',
  dhuhr: 'Dhuhr',
  asr: 'Asr',
  maghrib: 'Maghrib',
  isha: 'Isha',
}

/**
 * LocationHeader - Large desktop hero section for the location page
 *
 * Features:
 * - Full-width gradient background with Islamic pattern
 * - Location name, country, and dates
 * - Prayer times grid integrated into hero
 * - Next prayer countdown highlighted
 * - Stats bar with area count, masjid count
 * - "View Masjids on Map" CTA button
 */
export function LocationHeader({
  location,
  date,
  stats,
  prayerTimes,
}: LocationHeaderProps) {
  const [nextPrayer, setNextPrayer] = useState<{
    name: string
    key: PrayerName
    timeRemaining: string
  } | null>(null)

  // Update next prayer countdown every minute
  useEffect(() => {
    if (!prayerTimes) return

    const updateNextPrayer = () => {
      setNextPrayer(getNextPrayer(prayerTimes, new Date()))
    }

    updateNextPrayer()
    const interval = setInterval(updateNextPrayer, 60000)

    return () => clearInterval(interval)
  }, [prayerTimes])

  const subtitle =
    location.type === 'area'
      ? `${location.parentCity.name}, ${location.country}`
      : location.country

  const hijriDate = getHijriDate(date)

  // Build map link based on location type
  const mapLink =
    location.type === 'area'
      ? `/masjids/finder?lat=${location.latitude}&lng=${location.longitude}&zoom=13`
      : `/masjids/finder?lat=${location.latitude}&lng=${location.longitude}&zoom=11`

  return (
    <div className="mb-8">
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-600 to-primary-700">
        {/* Islamic Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 p-6 sm:p-8 lg:p-12">
          {/* Top Section: Location Info + CTA */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8 lg:mb-10">
            {/* Left: Location Info */}
            <div className="text-white">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 tracking-tight">
                {location.name}
              </h1>
              <p className="text-primary-100 text-lg sm:text-xl mb-3">
                {subtitle}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm sm:text-base text-primary-200">
                <span>{format(date, 'EEEE, d MMMM yyyy')}</span>
                {hijriDate && (
                  <>
                    <span className="hidden sm:inline text-primary-300">•</span>
                    <span>{hijriDate}</span>
                  </>
                )}
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 text-sm text-primary-100">
                {location.type === 'city' && stats.areaCount !== undefined && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{stats.areaCount} Areas</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>
                    {stats.masjidCount || 0}
                    {location.type === 'city' ? '+' : ''} Masjids
                  </span>
                </div>
                {location.type === 'area' && (
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4" />
                    <span>{location.radiusKm}km radius</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: CTA Button */}
            <div className="flex-shrink-0">
              <Link
                href={mapLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition-colors shadow-lg hover:shadow-xl"
              >
                <Map className="w-5 h-5" />
                <span>View Masjids on Map</span>
              </Link>
            </div>
          </div>

          {/* Prayer Times Grid */}
          {prayerTimes && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
              {/* Next Prayer Highlight */}
              {nextPrayer && (
                <div className="flex items-center justify-center gap-2 mb-4 text-white">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">
                    Next: <span className="font-semibold">{nextPrayer.name}</span> in{' '}
                    <span className="font-semibold text-primary-200">
                      {nextPrayer.timeRemaining}
                    </span>
                  </span>
                </div>
              )}

              {/* Prayer Times Row */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
                {PRAYER_ORDER.map((key) => {
                  const isNext = nextPrayer?.key === key
                  return (
                    <div
                      key={key}
                      className={`text-center p-3 sm:p-4 rounded-xl transition-colors ${
                        isNext
                          ? 'bg-white text-primary-700'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <p
                        className={`text-xs sm:text-sm mb-1 ${
                          isNext ? 'text-primary-600' : 'text-primary-200'
                        }`}
                      >
                        {PRAYER_LABELS[key]}
                      </p>
                      <p
                        className={`text-lg sm:text-xl lg:text-2xl font-bold ${
                          isNext ? 'text-primary-700' : 'text-white'
                        }`}
                      >
                        {formatTimeDisplay(prayerTimes[key])}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
