/**
 * Location Types and Interfaces for Unified Location Page
 *
 * These types distinguish between:
 * - KnownCity: Has areas breakdown from cities.ts
 * - KnownArea: Part of a city, has parent city reference
 * - DynamicLocation: Geocoded location, no area breakdown
 */

import type { Area } from '@/data/cities'

/**
 * Base location data shared by all location types
 */
export interface BaseLocation {
  slug: string
  name: string
  latitude: number
  longitude: number
  country: string
}

/**
 * Known city from cities.ts with area breakdown
 */
export interface KnownCity extends BaseLocation {
  type: 'city'
  areas: Area[]
  totalMasjids: number
}

/**
 * Known area from cities.ts
 */
export interface KnownArea extends BaseLocation {
  type: 'area'
  parentCity: { id: string; name: string }
  radiusKm: number
  description?: string
}

/**
 * Dynamic location resolved via geocoding
 */
export interface DynamicLocation extends BaseLocation {
  type: 'dynamic'
  region?: string
  fullAddress: string
}

/**
 * Union type for resolved locations
 */
export type ResolvedLocation = KnownCity | KnownArea | DynamicLocation

/**
 * Result type for location resolver
 */
export interface LocationResolverResult {
  success: boolean
  location?: ResolvedLocation
  error?: string
}
