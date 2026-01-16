import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

import type { ResolvedLocation } from '@/types/location'
import type { CalculatedPrayerTimes } from '@/lib/prayer-times-calculator'
import type { MasjidData } from '@/types/api'

import { WeeklyPrayerTimesTable } from '@/components/prayer-times/WeeklyPrayerTimesTable'
import { MethodDisclaimer } from '@/components/prayer-times/MethodDisclaimer'
import { LocationHeader } from './LocationHeader'
import { AreasGrid } from './AreasGrid'
import { MasjidsList } from './MasjidsList'
import { LocationComingSoon } from './LocationComingSoon'
import { DownloadAppCTA } from './DownloadAppCTA'

export interface LocationProfileProps {
  location: ResolvedLocation
  prayerTimes: CalculatedPrayerTimes
  weeklyPrayerTimes: CalculatedPrayerTimes[]
  masjids?: MasjidData[]
}

/**
 * Generate BreadcrumbList JSON-LD schema for SEO
 */
function generateBreadcrumbSchema(location: ResolvedLocation) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://mylocalmasjid.com',
    },
  ]

  // Add parent city for areas
  if (location.type === 'area') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: location.parentCity.name,
      item: `https://mylocalmasjid.com/location/${location.parentCity.id}`,
    })
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: location.name,
      item: `https://mylocalmasjid.com/location/${location.slug}`,
    })
  } else {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: location.name,
      item: `https://mylocalmasjid.com/location/${location.slug}`,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

/**
 * Generate LocalBusiness JSON-LD schema for SEO
 */
function generateLocalBusinessSchema(location: ResolvedLocation) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: location.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.name,
      addressCountry: location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.latitude,
      longitude: location.longitude,
    },
  }
}

/**
 * LocationProfile - Main component for the unified location page
 *
 * Renders the complete location page with:
 * - Breadcrumb navigation
 * - Location header with stats
 * - Today's prayer times
 * - Weekly prayer times forecast
 * - Conditional content based on location type:
 *   - KnownCity: AreasGrid showing all areas
 *   - KnownArea: MasjidsList showing masjids in area
 *   - DynamicLocation: MasjidsList or LocationComingSoon
 * - Download App CTA
 * - Method disclaimer
 */
export function LocationProfile({
  location,
  prayerTimes,
  weeklyPrayerTimes,
  masjids = [],
}: LocationProfileProps) {
  const breadcrumbSchema = generateBreadcrumbSchema(location)
  const localBusinessSchema = generateLocalBusinessSchema(location)

  // Determine what content to show based on location type
  const showAreasGrid = location.type === 'city' && location.areas.length > 0
  const showMasjidsList =
    (location.type === 'area' || location.type === 'dynamic') &&
    masjids.length > 0
  const showComingSoon =
    (location.type === 'area' || location.type === 'dynamic') &&
    masjids.length === 0

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <div className="min-h-screen bg-bg-primary">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-sm text-text-secondary"
          >
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            {location.type === 'area' && (
              <>
                <ChevronRight className="h-4 w-4" />
                <Link
                  href={`/location/${location.parentCity.id}`}
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {location.parentCity.name}
                </Link>
              </>
            )}

            <ChevronRight className="h-4 w-4" />
            <span className="text-text-primary font-medium">
              {location.name}
            </span>
          </nav>

          {/* Location Header with integrated prayer times */}
          <LocationHeader
            location={location}
            date={new Date()}
            stats={{
              masjidCount:
                location.type === 'city' ? location.totalMasjids : masjids.length,
              areaCount: location.type === 'city' ? location.areas.length : undefined,
            }}
            prayerTimes={prayerTimes}
          />

          {/* Weekly Prayer Times */}
          <WeeklyPrayerTimesTable weeklyTimes={weeklyPrayerTimes} />

          {/* Conditional Content Based on Location Type */}
          {showAreasGrid && location.type === 'city' && (
            <AreasGrid areas={location.areas} cityName={location.name} />
          )}

          {showMasjidsList && (
            <MasjidsList locationName={location.name} masjids={masjids} />
          )}

          {showComingSoon && <LocationComingSoon locationName={location.name} />}

          {/* Download App CTA */}
          <DownloadAppCTA />

          {/* Method Disclaimer */}
          <MethodDisclaimer />
        </div>
      </div>
    </>
  )
}
