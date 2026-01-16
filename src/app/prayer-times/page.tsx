import type { Metadata } from 'next'
import { Suspense } from 'react'
import PrayerTimesContent from './PrayerTimesContent'

export const metadata: Metadata = {
  title: 'Prayer Times - Find Salah Times Near You | MyLocalMasjid',
  description:
    'Get accurate Islamic prayer times for your location. Find Fajr, Dhuhr, Asr, Maghrib, and Isha times. Search by location or use geolocation for instant results.',
  keywords: [
    'prayer times',
    'salah times',
    'namaz times',
    'fajr time',
    'dhuhr time',
    'asr time',
    'maghrib time',
    'isha time',
    'UK prayer times',
    'Islamic prayer times',
    'MyLocalMasjid',
  ],
  openGraph: {
    title: 'Prayer Times - Find Salah Times Near You | MyLocalMasjid',
    description:
      'Get accurate Islamic prayer times for your location. Find Fajr, Dhuhr, Asr, Maghrib, and Isha times.',
    type: 'website',
    images: [
      {
        url: '/images/preview.png',
        width: 1200,
        height: 630,
        alt: 'MyLocalMasjid Prayer Times',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prayer Times - Find Salah Times Near You | MyLocalMasjid',
    description:
      'Get accurate Islamic prayer times for your location. Find Fajr, Dhuhr, Asr, Maghrib, and Isha times.',
    images: ['/images/preview.png'],
  },
  alternates: {
    canonical: '/prayer-times',
  },
}

export default function PrayerTimesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg-primary flex items-center justify-center">
          <div className="animate-pulse text-text-secondary">Loading...</div>
        </div>
      }
    >
      <PrayerTimesContent />
    </Suspense>
  )
}
