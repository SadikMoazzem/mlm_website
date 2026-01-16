import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Users, Clock, ChevronRight, Building2, Map } from 'lucide-react'
import { cities } from '@/data/cities'
import LocationSearch from '@/components/search/LocationSearch'

export const metadata: Metadata = {
  title: 'Find Masjids by Location - UK Cities | MyLocalMasjid',
  description: 'Find masjids and Islamic centers in popular UK cities. Browse prayer times, facilities, and community information by location.',
  keywords: [
    'masjids by location',
    'UK masjids',
    'London masjids',
    'Birmingham masjids',
    'Manchester masjids',
    'mosque finder',
    'prayer times',
    'MyLocalMasjid',
  ],
  openGraph: {
    title: 'Find Masjids by Location - MyLocalMasjid',
    description: 'Find masjids and Islamic centers in popular UK cities. Browse prayer times, facilities, and community information by location.',
    type: 'website',
    images: [
      {
        url: '/images/preview.png',
        width: 1200,
        height: 630,
        alt: 'MyLocalMasjid - Find by Location',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Masjids by Location - MyLocalMasjid',
    description: 'Find masjids and Islamic centers in popular UK cities.',
    images: ['/images/preview.png'],
  },
  alternates: {
    canonical: '/masjids',
  },
}

// Use real cities data from our data file

// Revalidate main masjids page weekly (7 days = 604800 seconds)
export const revalidate = 604800

export default function MasjidsByLocationPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
              <Building2 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-text-primary mb-4 tracking-tight">
              Find Masjids
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
              Discover masjids and Islamic centers in popular UK cities. Find prayer times, facilities, and connect with your local Muslim community.
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)] mb-8">
            <LocationSearch
              placeholder="Search for a location to find nearby masjids..."
              className="w-full"
            />
            <p className="text-center text-text-muted text-sm mt-3">
              Search for any UK location to find masjids within 15km radius
            </p>

            {/* Quick Links */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
              <Link
                href="/masjids/finder"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
              >
                <Map className="w-5 h-5" />
                Map View
              </Link>
              <Link
                href="/masjid-directory"
                className="inline-flex items-center gap-2 px-6 py-3 bg-bg-primary hover:bg-bg-secondary text-text-primary rounded-xl font-medium transition-colors border border-[var(--border)]"
              >
                A-Z Directory
              </Link>
              <Link
                href="/add-masjid"
                className="inline-flex items-center gap-2 px-6 py-3 bg-bg-primary hover:bg-bg-secondary text-text-primary rounded-xl font-medium transition-colors border border-[var(--border)]"
              >
                Add a Masjid
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-bg-card rounded-2xl p-4 shadow-sm border border-[var(--border)] mb-8">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span>{cities.length} Cities</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span>England, Wales & Scotland</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span>Live Prayer Times</span>
              </div>
            </div>
          </div>

          {/* Cities Grid */}
          <div className="bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)] mb-8">
            <h3 className="font-medium text-text-primary mb-6 text-center">
              Browse by City
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cities.map((city) => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>
          </div>

          {/* Coming Soon CTA */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 sm:p-8 text-white text-center">
            <h3 className="text-xl font-semibold mb-2">
              More Cities Coming Soon
            </h3>
            <p className="text-primary-100 mb-6 max-w-md mx-auto">
              We&apos;re expanding our coverage across the UK and internationally. Help us grow by adding your local masjid.
            </p>
            <Link
              href="/add-masjid"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors"
            >
              Add a Masjid
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CityCardProps {
  city: {
    id: string
    name: string
    country: string
    areas: Array<{
      name: string
    }>
  }
}

function CityCard({ city }: CityCardProps) {
  return (
    <Link
      href={`/location/${city.id}`}
      className="flex items-center justify-between p-3 bg-bg-primary rounded-xl border border-[var(--border)] hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
          <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
            {city.name}
          </p>
          <p className="text-sm text-text-muted truncate">
            {city.areas.length} areas
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-shrink-0" />
    </Link>
  )
}