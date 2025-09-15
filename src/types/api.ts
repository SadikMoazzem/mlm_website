/**
 * Shared API Types for MyLocalMasjid - Based on actual API response
 */

export interface MasjidLocation {
  id: string
  masjid_id: string
  geoHash: string
  city: string
  country: string
  full_address: string
  latitude: number
  longitude: number
}

export interface MasjidMeta {
  additionalProp1?: Record<string, unknown>
  [key: string]: unknown
}

export interface MasjidFacility {
  id: string
  masjid_id: string
  name: string
  description: string
  status: string
  active: boolean
}

export interface CurrentPrayerTimes {
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

export interface SpecialPrayer {
  id: string
  masjid_id: string
  type: string
  label: string
  start_time: string
  jammat_time: string
  imam: string
  info: string
  active: boolean
}

export interface MasjidData {
  id: string
  name: string
  type: string
  madhab: string
  locale: string
  active: boolean
  logo_url: string
  data_source: string
  capacity: number
  meta: MasjidMeta
  created_at: string
  updated_at: string
  location: MasjidLocation
  facilities: MasjidFacility[]
  current_prayer_times: CurrentPrayerTimes
  special_prayers?: SpecialPrayer[]
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError extends Error {
  status?: number
  code?: string
}

export interface MasjidResponseItem {
  masjid: {
    active: boolean
    data_source: string
    locale: string
    logo_url: string
    madhab: string
    meta: Record<string, any>
    name: string
    type: string
  }
  location: {
    city: string
    country: string
    full_address: string
    geoHash: string
    latitude: number
    longitude: number
    masjid_id: string
  }
  distance_km: number
  facilities: Array<{
    facility: string
    info: string
    masjid_id: string
  }>
  current_prayer_times: {
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

export interface PaginatedMasajidResponse {
  items: MasjidData[]
  total: number
  page: number
  size: number
  pages: number
}

export interface ConvertedMasajidResponse {
  data: MasjidData[]
  total: number
  page: number
  size: number
  pages: number
}
