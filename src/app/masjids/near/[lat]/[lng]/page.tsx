'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Users, ChevronLeft, ChevronRight, Clock, Car, User, Plus, Loader2 } from 'lucide-react'
import { MasjidData } from '@/types/api'

interface NearPageProps {
  params: Promise<{ lat: string; lng: string }>
  searchParams: Promise<{ 
    radius?: string
    area?: string
    city?: string
    country?: string
    source?: string
    query?: string
  }>
}

export default function NearPage({ params, searchParams }: NearPageProps) {
  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)
  const [radius, setRadius] = useState<number>(10)
  const [locationInfo, setLocationInfo] = useState<{
    area?: string
    city?: string
    country?: string
    source?: string
    query?: string
  }>({})
  
  const [masjids, setMasjids] = useState<MasjidData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalMasjids, setTotalMasjids] = useState(0)

  useEffect(() => {
    async function loadParams() {
      const resolvedParams = await params
      const resolvedSearchParams = await searchParams
      
      const lat = parseFloat(resolvedParams.lat)
      const lng = parseFloat(resolvedParams.lng)
      
      if (isNaN(lat) || isNaN(lng)) {
        setError('Invalid coordinates provided')
        setLoading(false)
        return
      }
      
      setLatitude(lat)
      setLongitude(lng)
      setRadius(resolvedSearchParams.radius ? parseFloat(resolvedSearchParams.radius) : 10)
      setLocationInfo({
        area: resolvedSearchParams.area,
        city: resolvedSearchParams.city,
        country: resolvedSearchParams.country,
        source: resolvedSearchParams.source,
        query: resolvedSearchParams.query
      })
    }
    
    loadParams()
  }, [params, searchParams])

  useEffect(() => {
    if (latitude && longitude) {
      loadMasjids()
    }
  }, [latitude, longitude, radius, currentPage])

  const loadMasjids = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/masjids/nearest?latitude=${latitude}&longitude=${longitude}&radius_km=${radius}&page=${currentPage}&size=20`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch masjids')
      }
      
        const data = await response.json()
        
        // Transform the new API response structure
        const transformedMasjids = (data.masjids || []).map((item: any) => ({
          // Use the root-level masjid data as the base
          ...item.masjid,
          // Add distance from the root level
          distance_km: item.distance_km,
          // Use root-level data which might be more complete than nested data
          location: item.location || item.masjid.location,
          facilities: item.facilities || item.masjid.facilities,
          current_prayer_times: item.current_prayer_times || item.masjid.current_prayer_times,
          special_prayers: item.special_prayers || item.masjid.special_prayers || []
        }))
        
        setMasjids(transformedMasjids)
        setTotalPages(data.pages || 1)
        setTotalMasjids(data.total || 0)
    } catch {
      setError('Failed to load masjids. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getLocationTitle = () => {
    // Use query parameter first (from search or geolocation)
    if (locationInfo.query) {
      return locationInfo.query
    }
    
    // Then try structured location data
    if (locationInfo.area && locationInfo.city) {
      return `${locationInfo.area}, ${locationInfo.city}`
    } else if (locationInfo.city) {
      return locationInfo.city
    } else if (locationInfo.country) {
      return locationInfo.country
    }
    
    // Fallback to coordinates
    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
  }

  const getBackLink = () => {
    if (locationInfo.source === 'area' && locationInfo.city) {
      return `/masjids`
    }
    return `/masjids`
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
            {locationInfo.city && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">{locationInfo.city}</span>
              </>
            )}
            {locationInfo.area && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">{locationInfo.area}</span>
              </>
            )}
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Masjids near {getLocationTitle()}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Discover masjids and Islamic centers within {radius}km radius. 
              Find prayer times, facilities, and connect with your local community.
            </p>
            {!loading && (
              <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                  <span>Within {radius}km radius</span>
                </div>
                {totalMasjids > 0 && (
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-emerald-600" />
                    <span>{totalMasjids} masjids found</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Back Link */}
          <div className="mb-8">
            <Link 
              href={getBackLink()}
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Cities
            </Link>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-gray-600">Finding masjids near {getLocationTitle()}...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Unable to load masjids</h3>
                <p className="text-gray-600">{error}</p>
              </div>
              <button
                onClick={loadMasjids}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Masjids Grid */}
          {!loading && !error && (
            <>
              {masjids.length > 0 ? (
                <>
                  {/* Add Masjid Link - shown when results exist */}
                  <div className="mb-6 text-center">
                    <Link
                      href="/add-masjid"
                      className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Can&apos;t find your masjid? Add it here
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {masjids.map((masjid) => (
                      <div key={masjid.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                        <div className="p-6">
                          {/* Masjid Name */}
                          <div className="mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                              {masjid.name}
                            </h3>
                            {masjid.location && (
                              <div className="flex items-start text-gray-600">
                                <MapPin className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                                <p className="text-sm leading-relaxed">
                                  {masjid.location.full_address}
                                </p>
                              </div>
                            )}
                            {masjid.distance_km && (
                              <div className="mt-2 text-sm text-emerald-600 font-medium">
                                {masjid.distance_km.toFixed(1)}km away
                              </div>
                            )}
                          </div>

                          {/* Prayer Times Preview */}
                          {masjid.current_prayer_times && (
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center mb-2">
                                <Clock className="w-4 h-4 text-emerald-600 mr-2" />
                                <span className="text-sm font-medium text-gray-700">Today&apos;s Prayer Times</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Fajr:</span>
                                  <span className="font-medium">{masjid.current_prayer_times.fajr_start}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Dhuhr:</span>
                                  <span className="font-medium">{masjid.current_prayer_times.dhur_start}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Asr:</span>
                                  <span className="font-medium">{masjid.current_prayer_times.asr_start}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Maghrib:</span>
                                  <span className="font-medium">{masjid.current_prayer_times.magrib_start}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Facilities Preview */}
                          {masjid.facilities && masjid.facilities.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center mb-2">
                                <Users className="w-4 h-4 text-emerald-600 mr-2" />
                                <span className="text-sm font-medium text-gray-700">Facilities</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {masjid.facilities.slice(0, 3).map((facility) => (
                                  <span 
                                    key={facility.id}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700"
                                  >
                                    {facility.name}
                                  </span>
                                ))}
                                {masjid.facilities.length > 3 && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                                    +{masjid.facilities.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* View Details Button */}
                          <Link
                            href={`/masjid/${masjid.id}/${masjid.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                            className="block w-full bg-emerald-600 text-white text-center py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                      </button>
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-2 text-sm font-medium rounded-lg ${
                                currentPage === page
                                  ? 'bg-emerald-600 text-white'
                                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                              }`}
                            >
                              {page}
                            </button>
                          )
                        })}
                        {totalPages > 5 && (
                          <>
                            <span className="px-2 text-gray-500">...</span>
                            <button
                              onClick={() => handlePageChange(totalPages)}
                              className={`px-3 py-2 text-sm font-medium rounded-lg ${
                                currentPage === totalPages
                                  ? 'bg-emerald-600 text-white'
                                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                              }`}
                            >
                              {totalPages}
                            </button>
                          </>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No masjids found</h3>
                  <p className="text-gray-500 mb-6">
                    We couldn&apos;t find any masjids within {radius}km of {getLocationTitle()}.
                  </p>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        onClick={() => setRadius(radius + 5)}
                        className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Expand search to {radius + 5}km
                      </button>
                      <Link
                        href="/add-masjid"
                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                        Add Your Masjid
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/masjids"
                        className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Browse all cities
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
