import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { cities } from '@/data/cities'

interface CityPageProps {
  params: Promise<{ city: string }>
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: cityId } = await params
  const city = cities.find(c => c.id === cityId)
  
  if (!city) {
    return {
      title: 'City Not Found',
    }
  }

  return {
    title: `Masjids in ${city.name} - Find Prayer Times & Islamic Centers`,
    description: `Discover masjids and Islamic centers in ${city.name}, ${city.country}. Browse ${city.areas.length} areas with prayer times, facilities, and community information.`,
    keywords: [
      `masjids ${city.name}`,
      `Islamic centers ${city.name}`,
      `prayer times ${city.name}`,
      `mosques ${city.name}`,
      `Muslim community ${city.name}`,
      ...city.areas.map(area => `${area.name} masjid`),
    ],
    openGraph: {
      title: `Masjids in ${city.name}`,
      description: `Find masjids and prayer times in ${city.name}`,
      type: 'website',
    },
    alternates: {
      canonical: `/masjids/${cityId}`,
    },
  }
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.id,
  }))
}

// Revalidate city pages weekly (7 days = 604800 seconds)
export const revalidate = 604800

export default async function CityPage({ params }: CityPageProps) {
  const { city: cityId } = await params
  const city = cities.find(c => c.id === cityId)

  if (!city) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/masjids" className="hover:text-emerald-600 transition-colors">
              Find Masjids
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{city.name}</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Masjids in {city.name}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Explore Islamic centers and masjids across different areas in {city.name}, {city.country}. 
              Find prayer times, facilities, and connect with your local community.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                <span>{city.areas.length} Areas</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-emerald-600" />
                <span>{city.country}</span>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/masjids"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Cities
            </Link>
          </div>

          {/* Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {city.areas.map((area) => (
              <AreaCard key={area.name} area={area} cityName={city.name} />
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">More Areas Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We're continuously expanding our coverage. Don't see your area listed? Help us grow by adding your local masjid.
            </p>
            <Link 
              href="/register"
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

interface AreaCardProps {
  area: {
    name: string
    latitude: number
    longitude: number
  }
  cityName: string
}

function AreaCard({ area, cityName }: AreaCardProps) {
  // Create search params for the near page with area context
  const searchParams = new URLSearchParams({
    area: area.name,
    city: cityName,
    source: 'area',
    radius: '10'
  })
  
  return (
    <Link href={`/masjids/near/${area.latitude}/${area.longitude}?${searchParams.toString()}`}>
      <div className="group bg-white border border-gray-200 hover:border-emerald-300 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-emerald-800 group-hover:text-emerald-600 transition-colors">
              {area.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{cityName}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1 text-emerald-600" />
            <span>View masjids in this area</span>
          </div>
          <div className="text-emerald-600 group-hover:text-emerald-700 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
