'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Clock, ExternalLink, ChevronLeft, ChevronRight, Car, User } from 'lucide-react'
import { MasjidData } from '@/types/api'
import { formatMasjidDisplayName, getDisplayAddress, getGoogleMapsUrl, formatMasjidUrlName } from '@/lib/masjid-service'
import Link from 'next/link'

interface MasjidLetterDirectoryProps {
  letter: string
  initialData: {
    data: MasjidData[]
    total: number
    page: number
    size: number
    pages: number
    letter: string
  } | null
  initialError: string | null
}

export function MasjidLetterDirectory({ letter, initialData, initialError }: MasjidLetterDirectoryProps) {
  const router = useRouter()
  const [masjids, setMasjids] = useState<MasjidData[]>(initialData?.data || [])
  const [pagination, setPagination] = useState({
    page: initialData?.page || 1,
    size: initialData?.size || 500,
    total: initialData?.total || 0,
    total_pages: initialData?.pages || 0
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(initialError)

  const loadMoreMasjids = useCallback(async (page: number) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams()
      params.set('starts_with', letter)
      params.set('page', page.toString())
      params.set('size', '200')

      const response = await fetch(`/api/masjids?${params.toString()}`)
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
        setError(data.error || `Failed to load more masjids for letter ${letter}`)
      }
    } catch (err) {
      setError('An error occurred while loading more masjids')
      console.error('Error loading more masjids:', err)
    } finally {
      setIsLoading(false)
    }
  }, [letter])

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-red-600">Error Loading Directory</h2>
        <p className="text-gray-600 mt-2">{error}</p>
        <button 
          onClick={() => loadMoreMasjids(1)}
          className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Alphabet Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Letter</h2>
        <div className="flex flex-wrap gap-2">
          {alphabet.map(alphabetLetter => (
            <Link
              key={alphabetLetter}
              href={`/masjid-directory/${alphabetLetter.toLowerCase()}`}
              className={`w-10 h-10 rounded-lg font-medium transition-colors flex items-center justify-center ${
                letter === alphabetLetter
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              {alphabetLetter}
            </Link>
          ))}
        </div>
      </div>

      {/* Back to Directory Link */}
      <div className="flex items-center">
        <Link
          href="/masjid-directory"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm hover:underline"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to A-Z Directory
        </Link>
      </div>

      {/* Masjids List for Selected Letter */}
      {masjids.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-emerald-800">
              {letter} ({pagination.total} masjids)
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing {masjids.length} of {pagination.total} masjids
              {pagination.total_pages > 1 && ` (Page ${pagination.page} of ${pagination.total_pages})`}
            </p>
          </div>
          <div className="divide-y divide-gray-200">
            {masjids.map((masjid) => (
              <MasjidListItem key={masjid.id} masjid={masjid} />
            ))}
          </div>
          
          {/* Load More / Pagination */}
          {pagination.total_pages > 1 && (
            <div className="p-6 border-t border-gray-200 text-center">
              {pagination.page < pagination.total_pages ? (
                <button
                  onClick={() => loadMoreMasjids(pagination.page + 1)}
                  disabled={isLoading}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-emerald-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Loading...' : `Load More (${pagination.total - masjids.length} remaining)`}
                </button>
              ) : (
                <p className="text-gray-600">All masjids loaded for letter "{letter}"</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No masjids found</h3>
          <p className="text-gray-600">No masjids starting with "{letter}" in our directory.</p>
          <Link
            href="/masjid-directory"
            className="mt-4 inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Browse other letters
          </Link>
        </div>
      )}

      {/* SEO Footer */}
      <div className="text-center text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
        <p>
          This page is pre-cached and updated weekly for optimal performance. 
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

interface MasjidListItemProps {
  masjid: MasjidData
}

function MasjidListItem({ masjid }: MasjidListItemProps) {
  const displayName = formatMasjidDisplayName(masjid)
  const address = getDisplayAddress(masjid)
  const mapsUrl = getGoogleMapsUrl(masjid)
  const masjidUrl = `/masjid/${masjid.id}/${formatMasjidUrlName(displayName)}`

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`text-lg font-semibold ${
              masjid.current_prayer_times 
                ? 'text-emerald-800' 
                : 'text-gray-500'
            }`}>
              <Link href={masjidUrl} className="hover:underline">
                {displayName}
              </Link>
            </h3>
            
            {/* Facilities Icons */}
            {masjid.facilities && masjid.facilities.length > 0 && (
              <div className="flex items-center gap-2 ml-4">
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
                        <Car 
                          className={`w-4 h-4 ${
                            parkingFacility.status === 'open' 
                              ? 'text-blue-600' 
                              : 'text-gray-400'
                          }`}
                          title={`Parking - ${parkingFacility.status}`}
                        />
                      )}
                      {womensPrayerFacility && (
                        <User 
                          className={`w-4 h-4 ${
                            womensPrayerFacility.status === 'open' 
                              ? 'text-pink-600' 
                              : 'text-gray-400'
                          }`}
                          title={`Women's Prayer Area - ${womensPrayerFacility.status}`}
                        />
                      )}
                      {otherFacilitiesCount > 0 && (
                        <span className="text-xs text-gray-500 font-medium">
                          +{otherFacilitiesCount}
                        </span>
                      )}
                    </>
                  )
                })()}
              </div>
            )}
          </div>
          
          {address && (
            <div className="flex items-start mb-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-600">{address}</p>
            </div>
          )}
          
          <div className="flex items-center space-x-4 text-sm">
            <div className={`flex items-center ${
              masjid.current_prayer_times 
                ? 'text-emerald-600' 
                : 'text-gray-400'
            }`}>
              <Clock className="w-4 h-4 mr-1" />
              <span>{masjid.current_prayer_times ? 'Prayer times available' : 'No prayer times'}</span>
            </div>
            
            {masjid.type && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 capitalize">{masjid.type}</span>
              </>
            )}
            
            {masjid.madhab && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 capitalize">{masjid.madhab}</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <Link
            href={masjidUrl}
            className="text-emerald-600 hover:text-emerald-700 font-medium text-sm hover:underline"
          >
            View Details
          </Link>
          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline flex items-center"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Directions
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
