/**
 * @deprecated This route is deprecated and redirects to /location/[area]
 *
 * The redirect is configured in next.config.ts:
 * /masjids/:city/:area → /location/:area (301 permanent)
 *
 * This file is kept for reference and will be removed in a future cleanup.
 * All new links should use /location/[slug] directly.
 *
 * @see src/app/location/[slug]/page.tsx - The new unified location page
 */

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Users, ChevronRight, Clock, ExternalLink, Building2 } from 'lucide-react'
import { cities, getCityById, getAreaById, Area } from '@/data/cities'
import { getNearestMasajid } from '@/lib/api-client'
import { MasjidData } from '@/types/api'
import { generateItemListSchema, generateBreadcrumbSchema } from '@/lib/schema-utils'
import { MasjidLocalBusinessSchema } from '@/components/schema/MasjidLocalBusinessSchema'

// Re-export metadata from the dedicated metadata file
export { generateMetadata } from './metadata'

// ISR: Revalidate area pages weekly (7 days = 604800 seconds)
export const revalidate = 604800

// Only allow pre-defined city/area combinations
export const dynamicParams = false

interface AreaPageProps {
  params: Promise<{ city: string; area: string }>
}

export async function generateStaticParams() {
  const params: { city: string; area: string }[] = []

  for (const city of cities) {
    for (const area of city.areas) {
      params.push({
        city: city.id,
        area: area.id,
      })
    }
  }

  return params
}

// Response item type to handle API response structure
interface NearestMasjidItem {
  masjid?: {
    id?: string
    active?: boolean
    data_source?: string
    locale?: string
    logo_url?: string
    madhab?: string
    meta?: Record<string, unknown>
    name?: string
    type?: string
  }
  location?: {
    city: string
    country: string
    full_address: string
    geoHash: string
    latitude: number
    longitude: number
    masjid_id: string
  }
  distance_km?: number
  facilities?: Array<{ id?: string; masjid_id?: string; name?: string; description?: string; status?: string; active?: boolean; facility?: string; info?: string }>
  current_prayer_times?: {
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
}

async function fetchMasjidsForArea(area: Area): Promise<MasjidData[]> {
  try {
    const response = await getNearestMasajid({
      latitude: area.latitude,
      longitude: area.longitude,
      radius_km: area.radius_km,
      page: 1,
      size: 15, // Top 15 masjids
    })

    if (response.success && response.data?.masjids) {
      // Transform the API response to include distance
      // The API returns an array where each item has masjid, location, facilities, etc.
      return response.data.masjids.map((item: NearestMasjidItem) => ({
        ...item.masjid,
        id: item.masjid?.id || item.location?.masjid_id || '',
        name: item.masjid?.name || '',
        type: item.masjid?.type || '',
        madhab: item.masjid?.madhab || '',
        locale: item.masjid?.locale || '',
        active: item.masjid?.active ?? true,
        logo_url: item.masjid?.logo_url || '',
        data_source: item.masjid?.data_source || '',
        capacity: 0,
        meta: item.masjid?.meta || {},
        created_at: '',
        updated_at: '',
        distance_km: item.distance_km,
        location: item.location as MasjidData['location'],
        facilities: (item.facilities || []) as MasjidData['facilities'],
        current_prayer_times: item.current_prayer_times as MasjidData['current_prayer_times'],
      })) as MasjidData[]
    }

    return []
  } catch (error) {
    console.error('Error fetching masjids for area:', error)
    return []
  }
}

function formatMasjidSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { city: cityId, area: areaId } = await params
  const city = getCityById(cityId)
  const area = city ? getAreaById(cityId, areaId) : undefined

  if (!city || !area) {
    notFound()
  }

  const masjids = await fetchMasjidsForArea(area)

  // Generate BreadcrumbList schema
  const breadcrumbData = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Masjids", url: "/masjids" },
    { name: city.name, url: `/masjids/${city.id}` },
    { name: area.name, url: `/masjids/${city.id}/${area.id}` },
  ])

  // Generate ItemList schema for masjids
  const masjidListItems = masjids.map((masjid, index) => ({
    name: masjid.name,
    url: `/masjid/${masjid.id}/${formatMasjidSlug(masjid.name)}`,
    position: index + 1
  }))

  const itemListData = generateItemListSchema(
    masjidListItems,
    `Masjids in ${area.name}, ${city.name}`
  )

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* BreadcrumbList Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
          />

          {/* ItemList Schema */}
          {masjids.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }}
            />
          )}

          {/* LocalBusiness Schema for each masjid */}
          {masjids.map((masjid) => (
            <MasjidLocalBusinessSchema key={`schema-${masjid.id}`} masjid={masjid} />
          ))}

          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
            <Link href="/masjids" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Find Masjids
            </Link>
            <ChevronRight className="w-4 h-4 text-text-muted" />
            <Link
              href={`/masjids/${city.id}`}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {city.name}
            </Link>
            <ChevronRight className="w-4 h-4 text-text-muted" />
            <span className="text-text-primary font-medium">{area.name}</span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
              <Building2 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-text-primary mb-4 tracking-tight">
              Masjids in {area.name}
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
              {area.description
                ? `Discover masjids and Islamic centres across ${area.description.toLowerCase()}. `
                : `Explore masjids and Islamic centres in ${area.name}. `}
              Find prayer times, facilities, and connect with your local Muslim community.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="bg-bg-card rounded-2xl p-4 shadow-sm border border-[var(--border)] mb-8">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span>Within {area.radius_km}km radius</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span>{masjids.length} masjids found</span>
              </div>
            </div>
          </div>

          {/* Masjids List */}
          {masjids.length > 0 ? (
            <>
              <div className="bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)] mb-8">
                <h3 className="font-medium text-text-primary mb-6 text-center">
                  Masjids in {area.name}
                </h3>
                <div className="space-y-3">
                  {masjids.map((masjid) => (
                    <MasjidCard key={masjid.id} masjid={masjid} />
                  ))}
                </div>

                {/* View All Link */}
                <div className="mt-6 pt-6 border-t border-[var(--border)] text-center">
                  <Link
                    href={`/masjids/near/${area.latitude}/${area.longitude}?area=${encodeURIComponent(area.name)}&city=${encodeURIComponent(city.name)}&radius=${area.radius_km}&source=area`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
                  >
                    View all masjids in {area.name}
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)] mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bg-secondary mb-4">
                <Users className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-xl font-medium text-text-primary mb-2">No masjids found</h3>
              <p className="text-text-secondary mb-6">
                We couldn&apos;t find any masjids in {area.name} at the moment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Link
                  href="/add-masjid"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
                >
                  Add Your Masjid
                </Link>
                <Link
                  href={`/masjids/${city.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-bg-primary hover:bg-bg-secondary text-text-primary rounded-xl font-medium transition-colors border border-[var(--border)]"
                >
                  Back to {city.name} areas
                </Link>
              </div>
            </div>
          )}

          {/* Add Masjid CTA */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 sm:p-8 text-white text-center">
            <h3 className="text-xl font-semibold mb-2">
              Know a masjid in {area.name}?
            </h3>
            <p className="text-primary-100 mb-6 max-w-md mx-auto">
              Help the Muslim community by adding masjids to our directory.
              Your contribution helps others find places to pray.
            </p>
            <Link
              href="/add-masjid"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors"
            >
              Add Your Masjid
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MasjidCardProps {
  masjid: MasjidData
}

function MasjidCard({ masjid }: MasjidCardProps) {
  const masjidUrl = `/masjid/${masjid.id}/${formatMasjidSlug(masjid.name)}`

  return (
    <Link
      href={masjidUrl}
      className="flex items-center justify-between p-3 bg-bg-primary rounded-xl border border-[var(--border)] hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
          <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
            {masjid.name}
          </p>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            {masjid.distance_km !== undefined && (
              <span className="text-primary-600 dark:text-primary-400 font-medium">
                {masjid.distance_km.toFixed(1)}km
              </span>
            )}
            {masjid.location && (
              <span className="truncate">{masjid.location.full_address}</span>
            )}
          </div>
        </div>
        {/* Prayer Times Preview */}
        {masjid.current_prayer_times && (
          <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted flex-shrink-0">
            <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>Fajr {masjid.current_prayer_times.fajr_start}</span>
          </div>
        )}
      </div>
      <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-shrink-0 ml-2" />
    </Link>
  )
}
