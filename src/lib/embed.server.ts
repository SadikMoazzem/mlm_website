import { cache } from 'react'
import { get } from './api-client'
import { PrayerTimesRead, SpecialPrayer } from '@/types/api'

// Cache helper
export const getPrayerTimesForMasjid = cache(async (masjidId: string, date?: string): Promise<PrayerTimesRead | null> => {
  try {
    const today = date || new Date().toISOString().split('T')[0]
    const endpoint = `/masjids/masjid/${masjidId}/prayer-times?date=${encodeURIComponent(today)}`
    const response = await get<PrayerTimesRead[]>(endpoint)
    if (!response.success || !response.data || response.data.length === 0) return null
    return response.data[0]
  } catch (error) {
    console.error('embed.server.getPrayerTimesForMasjid error', error)
    return null
  }
})

export const getJumuahPrayersForMasjid = cache(async (masjidId: string): Promise<SpecialPrayer[]> => {
  try {
    const endpoint = `/masjids/masjid/${masjidId}/special-prayers?prayer_type=jummuah&active=true`
    const response = await get<SpecialPrayer[]>(endpoint)
    if (!response.success || !response.data) return []
    return response.data
  } catch (error) {
    console.error('embed.server.getJumuahPrayersForMasjid error', error)
    return []
  }
})

export async function getEmbedPrayerTimesData(masjidIdParam?: string | null) {
  if (!masjidIdParam) {
    return { prayerTimes: null, jumuahPrayers: [], masjidId: null }
  }

  const [prayerTimes, jumuahPrayers] = await Promise.all([
    getPrayerTimesForMasjid(masjidIdParam),
    getJumuahPrayersForMasjid(masjidIdParam),
  ])

  return { prayerTimes, jumuahPrayers, masjidId: masjidIdParam }
}


