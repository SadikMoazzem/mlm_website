/**
 * @deprecated This route is deprecated and redirects to /location/[city]
 *
 * The redirect is configured in next.config.ts:
 * /prayer-times/:city → /location/:city (301 permanent)
 *
 * This file is kept for reference and will be removed in a future cleanup.
 * All new links should use /location/[slug] directly.
 *
 * @see src/app/location/[slug]/page.tsx - The new unified location page
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Download, Building2 } from 'lucide-react'
import { getCityById } from '@/data/cities'
import { generateBreadcrumbSchema } from '@/lib/schema-utils'
import {
  calculatePrayerTimes,
  calculateWeeklyPrayerTimes,
  formatTimeDisplay,
  TOP_UK_CITIES,
} from '@/lib/prayer-times-calculator'
import { CityPrayerTimesHeader } from '@/components/prayer-times/CityPrayerTimesHeader'
import { TodayPrayerTimesGrid } from '@/components/prayer-times/TodayPrayerTimesGrid'
import { WeeklyPrayerTimesTable } from '@/components/prayer-times/WeeklyPrayerTimesTable'
import { MethodDisclaimer } from '@/components/prayer-times/MethodDisclaimer'

interface CityPrayerTimesPageProps {
  params: Promise<{ city: string }>
}

export async function generateMetadata({
  params,
}: CityPrayerTimesPageProps): Promise<Metadata> {
  const { city: cityId } = await params
  const city = getCityById(cityId)

  if (!city) {
    return {
      title: 'City Not Found',
    }
  }

  // Get today's prayer times for dynamic meta description
  const todayTimes = calculatePrayerTimes(
    city.latitude,
    city.longitude,
    new Date()
  )

  return {
    title: `Prayer Times in ${city.name} Today | Fajr, Dhuhr, Asr Times | MyLocalMasjid`,
    description: `Accurate prayer times for ${city.name} using UK Moonsighting Committee method. Today's Fajr is at ${formatTimeDisplay(todayTimes.fajr)}, Dhuhr at ${formatTimeDisplay(todayTimes.dhuhr)}, Asr at ${formatTimeDisplay(todayTimes.asr)}, Maghrib at ${formatTimeDisplay(todayTimes.maghrib)}, Isha at ${formatTimeDisplay(todayTimes.isha)}.`,
    keywords: [
      `prayer times ${city.name}`,
      `salah times ${city.name}`,
      `namaz times ${city.name}`,
      `fajr time ${city.name}`,
      `dhuhr time ${city.name}`,
      `asr time ${city.name}`,
      `maghrib time ${city.name}`,
      `isha time ${city.name}`,
      `${city.name} prayer times`,
      `${city.name} salah times`,
      `${city.name} mosque times`,
      `islamic prayer times ${city.name}`,
      `muslim prayer times ${city.name}`,
    ],
    openGraph: {
      title: `Prayer Times in ${city.name} Today | MyLocalMasjid`,
      description: `Accurate prayer times for ${city.name}. Fajr ${formatTimeDisplay(todayTimes.fajr)}, Dhuhr ${formatTimeDisplay(todayTimes.dhuhr)}, Asr ${formatTimeDisplay(todayTimes.asr)}, Maghrib ${formatTimeDisplay(todayTimes.maghrib)}, Isha ${formatTimeDisplay(todayTimes.isha)}.`,
      type: 'website',
      images: [
        {
          url: '/images/preview.png',
          width: 1200,
          height: 630,
          alt: `Prayer Times in ${city.name} - MyLocalMasjid`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Prayer Times in ${city.name} Today | MyLocalMasjid`,
      description: `Accurate prayer times for ${city.name}. Fajr ${formatTimeDisplay(todayTimes.fajr)}, Dhuhr ${formatTimeDisplay(todayTimes.dhuhr)}, Asr ${formatTimeDisplay(todayTimes.asr)}.`,
      images: ['/images/preview.png'],
    },
    alternates: {
      canonical: `/prayer-times/${cityId}`,
    },
  }
}

export async function generateStaticParams() {
  // Generate static pages for top 10 UK cities
  return TOP_UK_CITIES.map((cityId) => ({
    city: cityId,
  }))
}

// Revalidate daily (24 hours = 86400 seconds) for updated prayer times
export const revalidate = 86400

// Allow dynamic params for cities not in top 10
export const dynamicParams = true

export default async function CityPrayerTimesPage({
  params,
}: CityPrayerTimesPageProps) {
  const { city: cityId } = await params
  const city = getCityById(cityId)

  if (!city) {
    notFound()
  }

  const today = new Date()
  const todayTimes = calculatePrayerTimes(city.latitude, city.longitude, today)
  const weeklyTimes = calculateWeeklyPrayerTimes(
    city.latitude,
    city.longitude,
    today
  )

  // Calculate total masjids in city
  const totalMasjids = city.areas.reduce(
    (sum, area) => sum + area.masjid_count,
    0
  )

  // Generate breadcrumb schema
  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Prayer Times', url: '/prayer-times' },
    { name: city.name, url: `/prayer-times/${city.id}` },
  ])

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <div className="container mx-auto px-4 sm:px-6 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
            <Link
              href="/prayer-times"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Prayer Times
            </Link>
            <ChevronRight className="w-4 h-4 text-text-muted" />
            <span className="text-text-primary font-medium">{city.name}</span>
          </nav>

          {/* Hero Section */}
          <CityPrayerTimesHeader
            cityName={city.name}
            country={city.country}
            date={today}
          />

          {/* Today's Prayer Times Grid */}
          <TodayPrayerTimesGrid
            fajr={todayTimes.fajr}
            sunrise={todayTimes.sunrise}
            dhuhr={todayTimes.dhuhr}
            asr={todayTimes.asr}
            maghrib={todayTimes.maghrib}
            isha={todayTimes.isha}
          />

          {/* 7-Day Forecast Table */}
          <WeeklyPrayerTimesTable weeklyTimes={weeklyTimes} />

          {/* Nearby Masjids Section */}
          <div className="bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)] mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-text-primary">
                Masjids in {city.name}
              </h2>
              <Link
                href={`/masjids/${city.id}`}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-text-secondary mb-6">
              Find {totalMasjids}+ masjids across {city.areas.length} areas in{' '}
              {city.name}. Get accurate jamaat times, facilities information,
              and directions.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {city.areas.slice(0, 6).map((area) => (
                <Link
                  key={area.id}
                  href={`/masjids/${city.id}/${area.id}`}
                  className="flex items-center gap-3 p-3 bg-bg-primary rounded-xl border border-[var(--border)] hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate text-sm">
                      {area.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {area.masjid_count} masjids
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            {city.areas.length > 6 && (
              <div className="mt-4 text-center">
                <Link
                  href={`/masjids/${city.id}`}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  View all {city.areas.length} areas
                </Link>
              </div>
            )}
          </div>

          {/* Download App CTA */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 sm:p-8 text-white text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4">
              <Download className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Get Prayer Time Notifications
            </h2>
            <p className="text-primary-100 mb-6 max-w-md mx-auto">
              Download the MyLocalMasjid app for prayer reminders, Qibla
              compass, and find nearby masjids with live jamaat times.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://apps.apple.com/app/mylocalmasjid"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.mylocalmasjid"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31M6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
                </svg>
                Play Store
              </a>
            </div>
          </div>

          {/* Method Disclaimer */}
          <MethodDisclaimer />
        </div>
      </div>
    </div>
  )
}
