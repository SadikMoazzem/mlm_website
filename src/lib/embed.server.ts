import { cache } from 'react'
import { get } from './api-client'
import { CurrentPrayerTimes, SpecialPrayer } from '@/types/api'

// Cache helper
export const getPrayerTimesForMasjid = cache(async (masjidId: string, date?: string): Promise<CurrentPrayerTimes | null> => {
  try {
    const today = date || new Date().toISOString().split('T')[0]
    const endpoint = `/masjids/masjid/${masjidId}/prayer-times?date=${encodeURIComponent(today)}`
    const response = await get<CurrentPrayerTimes[]>(endpoint)
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

// Fetch a range (defaults to 7 days: today + next 6 days).
// Note: API only supports limit=1, so we make parallel requests for each day
// The timeout fix in api-client.ts ensures requests fail fast instead of waiting 10s
export const getPrayerTimesRangeForMasjid = cache(async (masjidId: string, days = 7): Promise<CurrentPrayerTimes[]> => {
  const today = new Date()
  const dates: string[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push(d.toISOString().split('T')[0])
  }

  // Use the single-day cached helper for each date to take advantage of the cache key
  // All requests run in parallel with 5s timeout (configured in api-client.ts)
  const results = await Promise.all(dates.map(dt => getPrayerTimesForMasjid(masjidId, dt)))
  // Filter out nulls but keep ordering
  return results.filter(Boolean) as CurrentPrayerTimes[]
})

export async function getEmbedPrayerTimesData(masjidIdParam?: string | null) {
  if (!masjidIdParam) {
    return { prayerTimes: null, prayerTimesWeek: [], jumuahPrayers: [], masjidId: null }
  }

  const [prayerTimes, prayerTimesWeek, jumuahPrayers] = await Promise.all([
    getPrayerTimesForMasjid(masjidIdParam),
    getPrayerTimesRangeForMasjid(masjidIdParam, 7),
    getJumuahPrayersForMasjid(masjidIdParam),
  ])

  return { prayerTimes, prayerTimesWeek, jumuahPrayers, masjidId: masjidIdParam }
}


