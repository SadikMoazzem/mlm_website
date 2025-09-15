'use client'

import { useState, useEffect, useCallback } from 'react'
import { MapPin, Clock, ExternalLink, Car, User } from 'lucide-react'
import { MasjidData, ConvertedMasajidResponse } from '@/types/api'
import { formatMasjidDisplayName, getDisplayAddress, getGoogleMapsUrl, formatMasjidUrlName } from '@/lib/masjid-service'
import Link from 'next/link'

interface MasjidDirectoryAZProps {
  initialData: ConvertedMasajidResponse | null
  initialError: string | null
}

export function MasjidDirectoryAZ({ initialData, initialError }: MasjidDirectoryAZProps) {
  const [masjids, setMasjids] = useState<MasjidData[]>(initialData?.data || [])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(initialError)
  const [selectedLetter, setSelectedLetter] = useState<string>('A')

  const loadAllMasjids = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Load all masjids for A-Z directory
      const response = await fetch('/api/masjids?page=1&size=1000') // Get many masjids
      const data = await response.json()
      
      if (data.success && data.data) {
        setMasjids(data.data.data)
      } else {
        setError(data.error || 'Failed to load masjids')
      }
    } catch {
      setError('An error occurred while loading masjids')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!initialData) {
      loadAllMasjids()
    }
  }, [initialData, loadAllMasjids])

  // Group masjids by first letter
  const groupedMasjids = masjids.reduce((acc, masjid) => {
    const name = formatMasjidDisplayName(masjid)
    const firstLetter = name.charAt(0).toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(masjid)
    return acc
  }, {} as Record<string, MasjidData[]>)

  // Sort each group alphabetically
  Object.keys(groupedMasjids).forEach(letter => {
    groupedMasjids[letter].sort((a, b) => 
      formatMasjidDisplayName(a).localeCompare(formatMasjidDisplayName(b))
    )
  })

  const availableLetters = Object.keys(groupedMasjids).sort()
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-red-600">Error Loading Directory</h2>
        <p className="text-gray-600 mt-2">{error}</p>
        <button 
          onClick={loadAllMasjids}
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
          {alphabet.map(letter => {
            const hasData = availableLetters.includes(letter)
            return (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                disabled={!hasData}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  selectedLetter === letter
                    ? 'bg-emerald-600 text-white'
                    : hasData
                    ? 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                    : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                }`}
              >
                {letter}
              </button>
            )
          })}
        </div>
      </div>

      {/* Masjids List for Selected Letter */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
              <div className="h-5 bg-emerald-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : groupedMasjids[selectedLetter] ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-emerald-800">
              {selectedLetter} ({groupedMasjids[selectedLetter].length} masjids)
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {groupedMasjids[selectedLetter].map((masjid) => (
              <MasjidListItem key={masjid.id} masjid={masjid} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No masjids found</h3>
          <p className="text-gray-600">No masjids starting with "{selectedLetter}" in our directory.</p>
        </div>
      )}

      {/* Summary */}
      <div className="text-center text-sm text-gray-600">
        <p>Total: {masjids.length} masjids across {availableLetters.length} letters</p>
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
                        />
                      )}
                      {womensPrayerFacility && (
                        <User 
                          className={`w-4 h-4 ${
                            womensPrayerFacility.status === 'open' 
                              ? 'text-pink-600' 
                              : 'text-gray-400'
                          }`}
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
            
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{masjid.type}</span>
            
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{masjid.madhab}</span>
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
