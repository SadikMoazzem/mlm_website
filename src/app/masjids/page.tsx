import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Users, Clock, ChevronRight } from 'lucide-react'
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-light text-emerald-800 mb-6 tracking-tight">
              Find Masjids by Location
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Discover masjids and Islamic centers in popular UK cities. Find prayer times, facilities, and connect with your local Muslim community.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                <span>{cities.length} Cities</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-emerald-600" />
                <span>England, Wales & Scotland</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-emerald-600" />
                <span>Live Prayer Times</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto">
              <LocationSearch 
                placeholder="Search for a location to find nearby masjids..."
                className="w-full"
              />
              <p className="text-center text-gray-500 text-sm mt-3">
                Search for any UK location to find masjids within 15km radius
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center space-x-4 bg-emerald-50 rounded-full px-6 py-3">
              <span className="text-sm font-medium text-emerald-800">Quick Access:</span>
              <Link 
                href="/masjid-directory" 
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
              >
                A-Z Directory
              </Link>
              <span className="text-emerald-300">•</span>
              <Link 
                href="/add-prayer-times" 
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
              >
                Add Your Masjid
              </Link>
            </div>
          </div>

          {/* Cities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">More Cities Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We're expanding our coverage to include more cities across the UK and internationally. 
              Don't see your city? Help us grow by adding your local masjid.
            </p>
            <Link
              href="/add-prayer-times"
              className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Add Your Masjid
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
    <Link href={`/masjids/${city.id}`}>
      <div className="group bg-white border border-gray-200 hover:border-emerald-300 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-emerald-800 group-hover:text-emerald-600 transition-colors">
              {city.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{city.areas.length} areas • {city.country}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-emerald-600">{city.country}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1 text-emerald-600" />
            <span>Browse areas</span>
          </div>
          <div className="text-emerald-600 group-hover:text-emerald-700 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  )
}