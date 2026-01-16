import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  resolveLocationBySlug,
  getAllStaticLocationSlugs,
} from '@/lib/location-resolver'
import {
  calculatePrayerTimes,
  calculateWeeklyPrayerTimes,
  formatTimeDisplay,
} from '@/lib/prayer-times-calculator'
import { getNearestMasajid } from '@/lib/api-client'
import type { MasjidData } from '@/types/api'
import type { ResolvedLocation } from '@/types/location'
import { LocationProfile } from '@/components/location/LocationProfile'

/**
 * Response item type to handle API response structure from getNearestMasajid.
 * The API returns items with nested masjid, location, facilities, etc.
 */
interface NearestMasjidItem {
  masjid?: {
    id?: string
    active?: boolean
    data_source?: string
    locale?: string
    logo_url?: string
    madhab?: string
    meta?: Record<string, unknown>
    name?: string
    type?: string
  }
  location?: {
    city: string
    country: string
    full_address: string
    geoHash: string
    latitude: number
    longitude: number
    masjid_id: string
  }
  distance_km?: number
  facilities?: Array<{
    id?: string
    masjid_id?: string
    name?: string
    description?: string
    status?: string
    active?: boolean
    facility?: string
    info?: string
  }>
  current_prayer_times?: {
    asr_jammat: string
    asr_start: string
    asr_start_1: string
    date: string
    dhur_jammat: string
    dhur_start: string
    fajr_jammat: string
    fajr_start: string
    isha_jammat: string
    isha_start: string
    magrib_jammat: string
    magrib_start: string
    masjid_id: string
    sunrise: string
  }
}

interface LocationPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate location-specific keywords for SEO
 * Includes variations based on location type (city, area, or dynamic)
 */
function generateLocationKeywords(location: ResolvedLocation): string[] {
  const base = [
    `prayer times ${location.name}`,
    `masjids in ${location.name}`,
    `mosques in ${location.name}`,
    `${location.name} prayer times`,
    `${location.name} masjids`,
    `fajr time ${location.name}`,
    `salah times ${location.name}`,
    `namaz times ${location.name}`,
    `islamic prayer times ${location.name}`,
    `muslim prayer times ${location.name}`,
  ]

  if (location.type === 'city') {
    // Add area-specific keywords for cities
    const areaKeywords = location.areas
      .slice(0, 10)
      .flatMap((area) => [
        `masjids ${area.name}`,
        `prayer times ${area.name}`,
        `${area.name} masjids`,
      ])
    base.push(...areaKeywords)
  }

  if (location.type === 'area') {
    // Add parent city keywords for areas
    base.push(
      `${location.parentCity.name} ${location.name} masjids`,
      `${location.name} ${location.parentCity.name}`,
      `prayer times ${location.name} ${location.parentCity.name}`
    )
  }

  return base
}

/**
 * Generate metadata for location pages with dynamic content for SEO
 * Includes actual prayer times in description for better search relevance
 */
export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await resolveLocationBySlug(slug)

  if (!result.success || !result.location) {
    return {
      title: 'Location Not Found',
    }
  }

  const location = result.location
  const todayTimes = calculatePrayerTimes(
    location.latitude,
    location.longitude,
    new Date()
  )

  // Generate title based on location type
  let title = `Prayer Times & Masjids in ${location.name}`
  if (location.type === 'city') {
    title = `Prayer Times & Masjids in ${location.name} - ${location.areas.length} Areas`
  } else if (location.type === 'area') {
    title = `Prayer Times & Masjids in ${location.name}, ${location.parentCity.name}`
  }
  title += ' | MyLocalMasjid'

  // Generate description with actual prayer times
  let description = `Find prayer times and masjids in ${location.name}. `
  if (location.type === 'city') {
    description += `Explore ${location.areas.length} areas with ${location.totalMasjids}+ masjids. `
  } else if (location.type === 'area') {
    description += `Part of ${location.parentCity.name}. `
  }
  description += `Today's Fajr at ${formatTimeDisplay(todayTimes.fajr)}, Dhuhr at ${formatTimeDisplay(todayTimes.dhuhr)}, Asr at ${formatTimeDisplay(todayTimes.asr)}, Maghrib at ${formatTimeDisplay(todayTimes.maghrib)}, Isha at ${formatTimeDisplay(todayTimes.isha)}.`

  return {
    title,
    description,
    keywords: generateLocationKeywords(location),
    openGraph: {
      title: `Prayer Times & Masjids in ${location.name} | MyLocalMasjid`,
      description: `Find prayer times and masjids in ${location.name}. Fajr ${formatTimeDisplay(todayTimes.fajr)}, Dhuhr ${formatTimeDisplay(todayTimes.dhuhr)}, Asr ${formatTimeDisplay(todayTimes.asr)}, Maghrib ${formatTimeDisplay(todayTimes.maghrib)}, Isha ${formatTimeDisplay(todayTimes.isha)}.`,
      type: 'website',
      images: [
        {
          url: '/images/preview.png',
          width: 1200,
          height: 630,
          alt: `Prayer Times & Masjids in ${location.name} - MyLocalMasjid`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Prayer Times & Masjids in ${location.name} | MyLocalMasjid`,
      description: `Find prayer times and masjids in ${location.name}. Today's Fajr ${formatTimeDisplay(todayTimes.fajr)}, Dhuhr ${formatTimeDisplay(todayTimes.dhuhr)}, Asr ${formatTimeDisplay(todayTimes.asr)}.`,
      images: ['/images/preview.png'],
    },
    alternates: {
      canonical: `/location/${slug}`,
    },
  }
}

/**
 * Transform API response items to MasjidData format.
 * The getNearestMasajid API returns items with nested structure that needs flattening.
 */
function transformMasjidsResponse(items: NearestMasjidItem[]): MasjidData[] {
  return items.map((item) => ({
    id: item.masjid?.id || item.location?.masjid_id || '',
    name: item.masjid?.name || '',
    type: item.masjid?.type || '',
    madhab: item.masjid?.madhab || '',
    locale: item.masjid?.locale || '',
    active: item.masjid?.active ?? true,
    logo_url: item.masjid?.logo_url || '',
    data_source: item.masjid?.data_source || '',
    capacity: 0,
    meta: item.masjid?.meta || {},
    created_at: '',
    updated_at: '',
    distance_km: item.distance_km,
    location: item.location as MasjidData['location'],
    facilities: (item.facilities || []) as MasjidData['facilities'],
    current_prayer_times: item.current_prayer_times as MasjidData['current_prayer_times'],
  }))
}

/**
 * Fetch masjids for a location based on its coordinates and radius.
 */
async function fetchMasjidsForLocation(
  latitude: number,
  longitude: number,
  radiusKm: number
): Promise<MasjidData[]> {
  try {
    const response = await getNearestMasajid({
      latitude,
      longitude,
      radius_km: radiusKm,
      page: 1,
      size: 15,
    })

    if (response.success && response.data?.masjids) {
      // Transform the API response to MasjidData format
      return transformMasjidsResponse(
        response.data.masjids as unknown as NearestMasjidItem[]
      )
    }

    return []
  } catch (error) {
    console.error('Error fetching masjids for location:', error)
    return []
  }
}

/**
 * Location Page - Unified route for cities, areas, and dynamic locations
 *
 * Behaviour by location type:
 * - KnownCity (e.g., /location/london): Shows areas grid, no masjids fetched
 * - KnownArea (e.g., /location/east-london): Fetches and shows masjids within area radius
 * - DynamicLocation (e.g., /location/bristol): Geocodes + fetches masjids within 5km
 */
export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params
  const result = await resolveLocationBySlug(slug)

  if (!result.success || !result.location) {
    notFound()
  }

  const location = result.location
  const today = new Date()

  // Calculate prayer times for the location
  const prayerTimes = calculatePrayerTimes(
    location.latitude,
    location.longitude,
    today
  )
  const weeklyPrayerTimes = calculateWeeklyPrayerTimes(
    location.latitude,
    location.longitude,
    today
  )

  // Fetch masjids for areas and dynamic locations (cities show areas grid instead)
  let masjids: MasjidData[] = []
  if (location.type !== 'city') {
    const radius = location.type === 'area' ? location.radiusKm : 5
    masjids = await fetchMasjidsForLocation(
      location.latitude,
      location.longitude,
      radius
    )
  }

  return (
    <LocationProfile
      location={location}
      prayerTimes={prayerTimes}
      weeklyPrayerTimes={weeklyPrayerTimes}
      masjids={masjids}
    />
  )
}

/**
 * Generate static params for all known cities and areas
 * Returns all city IDs + all area IDs from cities.ts for pre-rendering
 */
export async function generateStaticParams() {
  const slugs = getAllStaticLocationSlugs()
  return slugs.map((slug) => ({ slug }))
}

/**
 * ISR Configuration: Revalidate weekly for known locations
 * 604800 seconds = 7 days
 */
export const revalidate = 604800

/**
 * Allow dynamic params for unknown locations (geocoded)
 * This enables server-side rendering for locations not in cities.ts
 */
export const dynamicParams = true
