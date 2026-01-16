import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from 'adhan'
import { addDays, format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { cities } from '@/data/cities'

const UK_TIMEZONE = 'Europe/London'

export interface CalculatedPrayerTimes {
  date: string
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

/**
 * Calculate prayer times for a location using UK Moonsighting Committee method
 * and Shafi Asr (shadow length = 1x object height)
 */
export function calculatePrayerTimes(
  latitude: number,
  longitude: number,
  date: Date
): CalculatedPrayerTimes {
  const coordinates = new Coordinates(latitude, longitude)

  // UK Moonsighting Committee method - designed for UK high latitudes
  const params = CalculationMethod.MoonsightingCommittee()
  params.madhab = Madhab.Shafi // Mithl 1 (shadow = 1x object height)

  const prayerTimes = new PrayerTimes(coordinates, date, params)

  return {
    date: format(date, 'yyyy-MM-dd'),
    fajr: formatInTimeZone(prayerTimes.fajr, UK_TIMEZONE, 'HH:mm'),
    sunrise: formatInTimeZone(prayerTimes.sunrise, UK_TIMEZONE, 'HH:mm'),
    dhuhr: formatInTimeZone(prayerTimes.dhuhr, UK_TIMEZONE, 'HH:mm'),
    asr: formatInTimeZone(prayerTimes.asr, UK_TIMEZONE, 'HH:mm'),
    maghrib: formatInTimeZone(prayerTimes.maghrib, UK_TIMEZONE, 'HH:mm'),
    isha: formatInTimeZone(prayerTimes.isha, UK_TIMEZONE, 'HH:mm'),
  }
}

/**
 * Calculate prayer times for 7 days starting from a given date
 */
export function calculateWeeklyPrayerTimes(
  latitude: number,
  longitude: number,
  startDate: Date = new Date()
): CalculatedPrayerTimes[] {
  const weeklyTimes: CalculatedPrayerTimes[] = []

  for (let i = 0; i < 7; i++) {
    const date = addDays(startDate, i)
    weeklyTimes.push(calculatePrayerTimes(latitude, longitude, date))
  }

  return weeklyTimes
}

/**
 * Get prayer times for a city by its ID from cities.ts
 */
export function getPrayerTimesForCity(
  cityId: string,
  date: Date = new Date()
): CalculatedPrayerTimes | null {
  const city = cities.find((c) => c.id === cityId)
  if (!city) return null

  return calculatePrayerTimes(city.latitude, city.longitude, date)
}

/**
 * Get weekly prayer times for a city
 */
export function getWeeklyPrayerTimesForCity(
  cityId: string,
  startDate: Date = new Date()
): CalculatedPrayerTimes[] | null {
  const city = cities.find((c) => c.id === cityId)
  if (!city) return null

  return calculateWeeklyPrayerTimes(city.latitude, city.longitude, startDate)
}

/**
 * Format time from 24h (HH:mm) to 12h display (h:mm am/pm)
 */
export function formatTimeDisplay(time: string): string {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'pm' : 'am'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

/**
 * Top 10 UK cities for static generation
 */
export const TOP_UK_CITIES = [
  'london',
  'birmingham',
  'manchester',
  'bradford',
  'leicester',
  'glasgow',
  'edinburgh',
  'cardiff',
  'dundee',
  'swansea',
] as const

export type TopUKCity = (typeof TOP_UK_CITIES)[number]
