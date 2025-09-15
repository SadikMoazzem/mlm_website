/**
 * Masjid Service - Business logic layer for masjid operations
 */

import apiClient from './api-client'
import { MasjidData, MasjidResponseItem } from '@/types/api'

/**
 * Format time from 24-hour to 12-hour format with AM/PM
 */
export function formatTime(time: string): string {
  if (!time) return ''
  
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

/**
 * Get masjid data by ID with error handling and fallbacks
 */
export async function getMasjidById(id: string): Promise<MasjidData | null> {
  try {
    const response = await apiClient.getMasjid(id)
    
    if (response.success && response.data) {
      return response.data
    }
    
    console.error('Failed to fetch masjid:', response.error)
    return null
  } catch (error) {
    console.error('Error fetching masjid:', error)
    return null
  }
}

/**
 * Get formatted masjid name for display
 */
export function formatMasjidDisplayName(masjid: MasjidData): string {
  if (masjid.location?.city) {
    return `${masjid.name}`
  }
  return masjid.name
}

/**
 * Get masjid address for display
 */
export function getDisplayAddress(masjid: MasjidData): string {
  if (masjid.location?.full_address) {
    return masjid.location.full_address
  }
  
  const parts = [masjid.location?.city, masjid.location?.country].filter(Boolean)
  return parts.join(', ')
}

/**
 * Get masjid coordinates for maps
 */
export function getMasjidCoordinates(masjid: MasjidData): { lat: number; lng: number } | null {
  if (masjid.location?.latitude && masjid.location?.longitude) {
    return {
      lat: masjid.location.latitude,
      lng: masjid.location.longitude
    }
  }
  return null
}

/**
 * Get Google Maps URL for the masjid
 */
export function getGoogleMapsUrl(masjid: MasjidData): string | null {
  const coords = getMasjidCoordinates(masjid)
  if (coords) {
    return `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
  }
  
  if (masjid.location?.full_address) {
    return `https://www.google.com/maps/search/${encodeURIComponent(masjid.location.full_address)}`
  }
  
  return null
}

/**
 * Format masjid type for display
 */
export function formatMasjidType(masjid: MasjidData): string {
  return masjid.type || 'Masjid'
}

/**
 * Get current prayer times for display
 */
export function getCurrentPrayerTimes(masjid: MasjidData) {
  if (!masjid.current_prayer_times) return null
  
  return {
    fajr: {
      start: masjid.current_prayer_times.fajr_start,
      jammat: masjid.current_prayer_times.fajr_jammat
    },
    dhuhr: {
      start: masjid.current_prayer_times.dhur_start,
      jammat: masjid.current_prayer_times.dhur_jammat
    },
    asr: {
      start: masjid.current_prayer_times.asr_start,
      start_1: masjid.current_prayer_times.asr_start_1,
      jammat: masjid.current_prayer_times.asr_jammat
    },
    maghrib: {
      start: masjid.current_prayer_times.magrib_start,
      jammat: masjid.current_prayer_times.magrib_jammat
    },
    isha: {
      start: masjid.current_prayer_times.isha_start,
      jammat: masjid.current_prayer_times.isha_jammat
    },
    sunrise: masjid.current_prayer_times.sunrise,
    date: masjid.current_prayer_times.date
  }
}

/**
 * Get next prayer time with enhanced display info
 */
export function getNextPrayer(masjid: MasjidData): { 
  name: string; 
  time: string; 
  type: 'start' | 'jammat';
  displayInfo?: {
    startTime?: string;
    jammatTime?: string;
    showBoth: boolean;
  }
} | null {
  const prayerTimes = getCurrentPrayerTimes(masjid)
  if (!prayerTimes) return null
  
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  
  const prayers = [
    { name: 'Fajr', start: prayerTimes.fajr.start, jammat: prayerTimes.fajr.jammat },
    { name: 'Dhuhr', start: prayerTimes.dhuhr.start, jammat: prayerTimes.dhuhr.jammat },
    { name: 'Asr', start: prayerTimes.asr.start, jammat: prayerTimes.asr.jammat },
    { name: 'Maghrib', start: prayerTimes.maghrib.start, jammat: prayerTimes.maghrib.jammat },
    { name: 'Isha', start: prayerTimes.isha.start, jammat: prayerTimes.isha.jammat }
  ]
  
  // Create timeline with both start and jammat times
  const timeline = []
  for (const prayer of prayers) {
    if (prayer.start) {
      timeline.push({
        name: prayer.name,
        time: prayer.start,
        type: 'start' as const,
        startTime: prayer.start,
        jammatTime: prayer.jammat
      })
    }
    if (prayer.jammat) {
      timeline.push({
        name: `${prayer.name} Jammat`,
        time: prayer.jammat,
        type: 'jammat' as const,
        startTime: prayer.start,
        jammatTime: prayer.jammat
      })
    }
  }
  
  // Add sunrise (no jammat)
  if (prayerTimes.sunrise) {
    timeline.push({
      name: 'Sunrise',
      time: prayerTimes.sunrise,
      type: 'start' as const,
      startTime: prayerTimes.sunrise,
      jammatTime: undefined
    })
  }
  
  // Sort by time
  timeline.sort((a, b) => {
    const timeA = a.time.split(':').map(Number)
    const timeB = b.time.split(':').map(Number)
    return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1])
  })
  
  // Find next prayer
  for (const prayer of timeline) {
    if (!prayer.time) continue
    
    const [hours, minutes] = prayer.time.split(':').map(Number)
    const prayerTime = hours * 60 + minutes
    
    if (prayerTime > currentTime) {
      return {
        name: prayer.name,
        time: prayer.time,
        type: prayer.type,
        displayInfo: {
          startTime: prayer.startTime,
          jammatTime: prayer.jammatTime,
          showBoth: prayer.name !== 'Sunrise' && !!prayer.startTime && !!prayer.jammatTime
        }
      }
    }
  }
  
  // If no prayer left today, return Fajr for tomorrow
  const fajrPrayer = prayers[0]
  return { 
    name: 'Fajr (Tomorrow)', 
    time: fajrPrayer.start, 
    type: 'start',
    displayInfo: {
      startTime: fajrPrayer.start,
      jammatTime: fajrPrayer.jammat,
      showBoth: true
    }
  }
}

/**
 * Get current prayer period (which prayer time we're currently in)
 */
export function getCurrentPrayerPeriod(masjid: MasjidData): string | null {
  const prayerTimes = getCurrentPrayerTimes(masjid)
  if (!prayerTimes) return null
  
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  
  const prayers = [
    { name: 'Fajr', start: prayerTimes.fajr.start },
    { name: 'Dhuhr', start: prayerTimes.dhuhr.start },
    { name: 'Asr', start: prayerTimes.asr.start },
    { name: 'Maghrib', start: prayerTimes.maghrib.start },
    { name: 'Isha', start: prayerTimes.isha.start }
  ]
  
  // Convert times to minutes for comparison
  const prayerMinutes = prayers.map(prayer => {
    if (!prayer.start) return null
    const [hours, minutes] = prayer.start.split(':').map(Number)
    return { name: prayer.name, minutes: hours * 60 + minutes }
  }).filter(p => p !== null)
  
  // Find current period
  for (let i = 0; i < prayerMinutes.length; i++) {
    const current = prayerMinutes[i]
    const next = prayerMinutes[i + 1]
    
    if (next) {
      // Between current and next prayer
      if (currentTime >= current.minutes && currentTime < next.minutes) {
        return current.name
      }
    } else {
      // After Isha until midnight, or after midnight until Fajr
      if (currentTime >= current.minutes || currentTime < prayerMinutes[0].minutes) {
        return current.name
      }
    }
  }
  
  return null
}

/**
 * Format masjid name for URL (convert spaces to hyphens, lowercase)
 */
export function formatMasjidUrlName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

/**
 * Convert API response item to internal MasjidData format
 */
export function convertApiResponseToMasjidData(item: MasjidResponseItem): MasjidData {
  return {
    id: item.masjid.name, // Using name as ID since no ID field provided
    name: item.masjid.name,
    type: item.masjid.type,
    madhab: item.masjid.madhab,
    locale: item.masjid.locale,
    active: item.masjid.active,
    logo_url: item.masjid.logo_url,
    data_source: item.masjid.data_source,
    capacity: 0, // Not provided in API response
    meta: item.masjid.meta,
    created_at: new Date().toISOString(), // Not provided in API response
    updated_at: new Date().toISOString(), // Not provided in API response
    location: {
      id: item.location.masjid_id,
      masjid_id: item.location.masjid_id,
      geoHash: item.location.geoHash,
      city: item.location.city,
      country: item.location.country,
      full_address: item.location.full_address,
      latitude: item.location.latitude,
      longitude: item.location.longitude
    },
    facilities: item.facilities.map(f => ({
      id: `${f.masjid_id}-${f.facility}`,
      masjid_id: f.masjid_id,
      name: f.facility,
      description: f.info,
      status: 'open', // Default status
      active: true
    })),
    current_prayer_times: {
      asr_jammat: item.current_prayer_times.asr_jammat,
      asr_start: item.current_prayer_times.asr_start,
      asr_start_1: item.current_prayer_times.asr_start_1,
      date: item.current_prayer_times.date,
      dhur_jammat: item.current_prayer_times.dhur_jammat,
      dhur_start: item.current_prayer_times.dhur_start,
      fajr_jammat: item.current_prayer_times.fajr_jammat,
      fajr_start: item.current_prayer_times.fajr_start,
      isha_jammat: item.current_prayer_times.isha_jammat,
      isha_start: item.current_prayer_times.isha_start,
      magrib_jammat: item.current_prayer_times.magrib_jammat,
      magrib_start: item.current_prayer_times.magrib_start,
      masjid_id: item.current_prayer_times.masjid_id,
      sunrise: item.current_prayer_times.sunrise
    }
  }
}
