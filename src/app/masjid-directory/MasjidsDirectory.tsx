'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, Clock, Users, ExternalLink, Car, User } from 'lucide-react'
import { MasjidData, ConvertedMasajidResponse } from '@/types/api'
import { formatMasjidDisplayName, getDisplayAddress, getGoogleMapsUrl, formatMasjidUrlName } from '@/lib/masjid-service'
import { Pagination } from './Pagination'

interface MasjidsDirectoryProps {
  initialPage: number
  initialSearch: string
  initialData: ConvertedMasajidResponse | null
  initialError: string | null
}

export function MasjidsDirectory({ initialPage, initialSearch, initialData, initialError }: MasjidsDirectoryProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Debug logging removed
  
  const [masjids, setMasjids] = useState<MasjidData[]>(initialData?.data || [])
  const [pagination, setPagination] = useState({
    page: initialData?.page || initialPage,
    size: initialData?.size || 20,
    total: initialData?.total || 0,
    total_pages: initialData?.pages || 0
  })
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(initialError)

  const loadMasjids = useCallback(async (page: number, search: string = '') => {
    setIsLoading(true)
    setError(null)
    
    try {
      // For client-side updates, we'll need to create an API route
      const params = new URLSearchParams()
      params.set('page', page.toString())
      params.set('size', '20')
      if (search) params.set('search', search)
      
      const apiUrl = `/api/masjids?${params.toString()}`
      
      const response = await fetch(apiUrl)
      const data = await response.json()
      
      if (data.success && data.data) {
        setMasjids(data.data.data)
        setPagination({
          page: data.data.page,
          size: data.data.size,
          total: data.data.total,
          total_pages: data.data.pages
        })
      } else {
        setError(data.error || 'Failed to load masjids')
      }
    } catch {
      setError('An error occurred while loading masjids')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Only load masjids if we don't have initial data
  useEffect(() => {
    if (!initialData) {
      loadMasjids(initialPage, initialSearch)
    }
  }, [initialPage, initialSearch, initialData, loadMasjids])

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim()
    const params = new URLSearchParams(searchParams)
    
    if (trimmedQuery) {
      params.set('search', trimmedQuery)
    } else {
      params.delete('search')
    }
    params.delete('page') // Reset to page 1 on search
    
    const browserUrl = `/masjids?${params.toString()}`
    
    router.push(browserUrl)
    // Load data immediately with loading state
    loadMasjids(1, trimmedQuery)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/masjids?${params.toString()}`)
    // Also load the data immediately for better UX
    loadMasjids(page, searchQuery)
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">Unable to load masjids</h3>
          <p className="text-gray-600">{error}</p>
        </div>
        <button
          onClick={() => loadMasjids(pagination.page, searchQuery)}
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Google-style Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative group">
          <div className="absolute inset-0 bg-white rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-200"></div>
          <div className="relative flex items-center">
            <Search className="absolute left-6 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for masjids, cities, or locations"
              className="w-full pl-14 pr-40 py-4 text-lg bg-transparent border-0 rounded-full focus:outline-none placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            />
            <div className="absolute right-2 flex items-center space-x-2">
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    handleSearch('')
                  }}
                  disabled={isLoading}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
              <button
                onClick={() => handleSearch(searchQuery)}
                disabled={isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-2 rounded-full transition-colors duration-200 text-sm font-medium disabled:cursor-not-allowed"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      {!isLoading && masjids.length > 0 && (
        <div className="mb-8">
          <p className="text-sm text-gray-600 font-medium">
            About {pagination.total.toLocaleString()} results
            {searchQuery && (
              <span className="ml-2">for <span className="font-semibold text-gray-900">"{searchQuery}"</span></span>
            )}
          </p>
        </div>
      )}

      {/* Masjids Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="relative bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-5 animate-pulse overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
              
              <div className="space-y-4">
                {/* Header skeleton */}
                <div>
                  <div className="h-6 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded-lg mb-4"></div>
                </div>
                
                {/* Address skeleton */}
                <div className="flex items-start">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg mr-3 flex-shrink-0"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                
                {/* Facilities skeleton */}
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-200 rounded"></div>
                  <div className="w-4 h-4 bg-pink-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
                
                {/* Stats skeleton */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200/60">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-100 rounded-lg mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="flex space-x-3">
                    <div className="h-4 bg-emerald-200 rounded w-12"></div>
                    <div className="h-4 bg-emerald-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : masjids.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {masjids.map((masjid) => (
            <MasjidCard key={masjid.id} masjid={masjid} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No masjids found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? `No masjids match your search for "${searchQuery}"`
              : 'No masjids are available at the moment'
            }
          </p>
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.total_pages}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

interface MasjidCardProps {
  masjid: MasjidData
}

function MasjidCard({ masjid }: MasjidCardProps) {
  const displayName = formatMasjidDisplayName(masjid)
  const address = getDisplayAddress(masjid)
  const mapsUrl = getGoogleMapsUrl(masjid)
  const masjidUrl = `/masjid/${masjid.id}/${formatMasjidUrlName(displayName)}`
  
  // Create variation in card heights
  const hasLongName = displayName.length > 25
  const hasLongAddress = address && address.length > 50

  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/60 hover:border-emerald-300/60 rounded-2xl p-5 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => window.location.href = masjidUrl}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-teal-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Modern glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
      
      <div className="relative space-y-4">
        {/* Header */}
        <div>
          <h3 className={`text-lg font-bold transition-all duration-300 mb-2 group-hover:scale-[1.02] origin-left ${hasLongName ? 'line-clamp-3' : 'line-clamp-2'} ${
            masjid.current_prayer_times 
              ? 'text-emerald-800 group-hover:text-emerald-600' 
              : 'text-gray-500 group-hover:text-gray-400'
          }`}>
            {displayName}
          </h3>
        </div>

        {/* Address */}
        {address && (
          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
            <div className="p-1.5 bg-gray-100 group-hover:bg-emerald-100 rounded-lg mr-3 transition-all duration-300 group-hover:scale-110">
              <MapPin className="w-3.5 h-3.5 text-gray-500 group-hover:text-emerald-600 transition-colors duration-300" />
            </div>
            <p className={`text-sm text-gray-600 group-hover:text-gray-800 leading-relaxed transition-colors duration-300 font-medium ${hasLongAddress ? 'line-clamp-3' : 'line-clamp-2'}`}>
              {address}
            </p>
          </div>
        )}

        {/* Facilities */}
        {masjid.facilities && masjid.facilities.length > 0 && (
          <div className="flex items-center gap-3">
            {(() => {
              const parkingFacility = masjid.facilities.find(f => 
                f.name.toLowerCase().includes('parking') || 
                f.name.toLowerCase().includes('car')
              )
              const womensPrayerFacility = masjid.facilities.find(f => 
                f.name.toLowerCase().includes('women') || 
                f.name.toLowerCase().includes('ladies') ||
                f.name.toLowerCase().includes('female')
              )
              const otherFacilitiesCount = masjid.facilities.length - 
                (parkingFacility ? 1 : 0) - (womensPrayerFacility ? 1 : 0)

              return (
                <>
                  {parkingFacility && (
                    <div className="flex items-center">
                      <Car 
                        className={`w-4 h-4 ${
                          parkingFacility.status === 'open' 
                            ? 'text-blue-600' 
                            : 'text-gray-400'
                        } transition-colors duration-300`}
                      />
                    </div>
                  )}
                  {womensPrayerFacility && (
                    <div className="flex items-center">
                      <User 
                        className={`w-4 h-4 ${
                          womensPrayerFacility.status === 'open' 
                            ? 'text-pink-600' 
                            : 'text-gray-400'
                        } transition-colors duration-300`}
                      />
                    </div>
                  )}
                  {otherFacilitiesCount > 0 && (
                    <span className="text-xs text-gray-500 font-medium">
                      +{otherFacilitiesCount} more
                    </span>
                  )}
                </>
              )
            })()}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-200/60 group-hover:border-gray-300/60 transition-colors duration-300">
          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
            <div className={`p-1 rounded-lg mr-2 transition-all duration-300 ${
              masjid.current_prayer_times 
                ? 'bg-emerald-50 group-hover:bg-emerald-100' 
                : 'bg-gray-50 group-hover:bg-gray-100'
            }`}>
              <Clock className={`w-3.5 h-3.5 transition-all duration-300 group-hover:rotate-12 ${
                masjid.current_prayer_times 
                  ? 'text-emerald-600' 
                  : 'text-gray-400'
              }`} />
            </div>
            <span className={`font-medium transition-colors duration-300 ${
              masjid.current_prayer_times 
                ? 'text-gray-600 group-hover:text-gray-800' 
                : 'text-gray-400 group-hover:text-gray-500'
            }`}>
              {masjid.current_prayer_times ? 'Prayer times' : 'No prayer times'}
            </span>
          </div>
          <div className="flex space-x-3">
            <button
              className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-all duration-200 hover:scale-105 active:scale-95 px-2 py-1 rounded-lg hover:bg-emerald-50"
              onClick={(e) => {
                e.stopPropagation()
                window.location.href = masjidUrl
              }}
            >
              View
            </button>
            {mapsUrl && (
              <button
                className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-all duration-200 hover:scale-105 active:scale-95 px-2 py-1 rounded-lg hover:bg-emerald-50 flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(mapsUrl, '_blank')
                }}
              >
                <ExternalLink className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300" />
                Directions
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Floating accent dots */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-emerald-400/30 rounded-full group-hover:animate-pulse"></div>
      <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-teal-400/40 rounded-full group-hover:animate-bounce" style={{ animationDelay: '0.3s' }}></div>
    </div>
  )
}
