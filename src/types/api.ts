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
