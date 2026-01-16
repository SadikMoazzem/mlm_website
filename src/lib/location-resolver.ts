/**
 * Location Resolver Utility
 *
 * Resolves URL slugs to location data by checking:
 * 1. Known cities from cities.ts
 * 2. Known areas within cities
 * 3. Unknown locations via geocoding API
 */

import { cities, type City, type Area } from '@/data/cities'
import type {
  KnownCity,
  KnownArea,
  DynamicLocation,
  LocationResolverResult,
} from '@/types/location'

/**
 * Main entry point for resolving any location slug
 * Priority order:
 * 1. Check cities.ts for matching city ID
 * 2. Check all areas in cities.ts for matching area ID
 * 3. Call geocoding API for unknown locations
 */
export async function resolveLocationBySlug(
  slug: string
): Promise<LocationResolverResult> {
  try {
    // Check if it's a known city
    const city = findCityBySlug(slug)
    if (city) {
      return {
        success: true,
        location: city,
      }
    }

    // Check if it's a known area
    const area = findAreaBySlug(slug)
    if (area) {
      return {
        success: true,
        location: area,
      }
    }

    // Fall back to geocoding for unknown locations
    const dynamicLocation = await geocodeLocation(slug)
    if (dynamicLocation) {
      return {
        success: true,
        location: dynamicLocation,
      }
    }

    return {
      success: false,
      error: `Location not found: ${slug}`,
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Synchronous lookup in cities.ts
 * Returns null if not found
 */
export function findCityBySlug(slug: string): KnownCity | null {
  const city = cities.find((c) => c.id === slug)
  if (!city) {
    return null
  }

  return cityToKnownCity(city)
}

/**
 * Iterates through all cities to find matching area
 * Returns area with parent city reference if found
 */
export function findAreaBySlug(slug: string): KnownArea | null {
  for (const city of cities) {
    const area = city.areas.find((a) => a.id === slug)
    if (area) {
      return areaToKnownArea(area, city)
    }
  }
  return null
}

/**
 * Calls geocoding API for unknown locations
 * Takes first UK result
 * Returns null if no results or error
 */
export async function geocodeLocation(
  slug: string
): Promise<DynamicLocation | null> {
  try {
    const response = await fetch(`/api/search/locations?q=${encodeURIComponent(slug)}`)

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    // Look for first UK result
    const ukResult = data.results?.find(
      (result: any) => result.country === 'United Kingdom' || result.country === 'UK'
    )

    if (!ukResult) {
      return null
    }

    return {
      type: 'dynamic',
      slug,
      name: ukResult.name || slug,
      latitude: ukResult.latitude,
      longitude: ukResult.longitude,
      country: ukResult.country,
      region: ukResult.region,
      fullAddress: ukResult.fullAddress || ukResult.name || slug,
    }
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}

/**
 * Returns array of all city IDs + all area IDs
 * Used for generateStaticParams in the route
 */
export function getAllStaticLocationSlugs(): string[] {
  const cityIds = cities.map((city) => city.id)
  const areaIds = cities.flatMap((city) => city.areas.map((area) => area.id))
  return [...cityIds, ...areaIds]
}

/**
 * Helper: Convert City to KnownCity
 */
function cityToKnownCity(city: City): KnownCity {
  const totalMasjids = city.areas.reduce(
    (sum, area) => sum + area.masjid_count,
    0
  )

  return {
    type: 'city',
    slug: city.id,
    name: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
    country: city.country,
    areas: city.areas,
    totalMasjids,
  }
}

/**
 * Helper: Convert Area to KnownArea
 */
function areaToKnownArea(area: Area, city: City): KnownArea {
  return {
    type: 'area',
    slug: area.id,
    name: area.name,
    latitude: area.latitude,
    longitude: area.longitude,
    country: city.country,
    parentCity: {
      id: city.id,
      name: city.name,
    },
    radiusKm: area.radius_km,
    description: area.description,
  }
}
