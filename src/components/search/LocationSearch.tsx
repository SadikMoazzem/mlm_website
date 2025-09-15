'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Loader2, X } from 'lucide-react'

interface LocationSearchResult {
  id: string
  name: string
  fullName: string
  coordinates: {
    latitude: number
    longitude: number
  }
  type: string
  country?: string
  region?: string
}

interface LocationSearchProps {
  placeholder?: string
  className?: string
  onSelect?: (result: LocationSearchResult) => void
}

export default function LocationSearch({ 
  placeholder = "Search for a location...", 
  className = "",
  onSelect 
}: LocationSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<LocationSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0))
          break
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1))
          break
        case 'Enter':
          event.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            handleSelectResult(results[selectedIndex])
          }
          break
        case 'Escape':
          setIsOpen(false)
          setSelectedIndex(-1)
          inputRef.current?.blur()
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, results, selectedIndex])

  const searchLocations = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/search/locations?q=${encodeURIComponent(searchQuery)}`)
      
      if (!response.ok) {
        throw new Error('Failed to search locations')
      }

      const data = await response.json()
      setResults(data.results || [])
      setIsOpen(true)
      setSelectedIndex(-1)
    } catch {
      setResults([])
      setIsOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (value: string) => {
    setQuery(value)
    
    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // Debounce search
    debounceRef.current = setTimeout(() => {
      searchLocations(value)
    }, 300)
  }

  const handleSelectResult = (result: LocationSearchResult) => {
    setQuery(result.fullName)
    setIsOpen(false)
    setSelectedIndex(-1)
    
    if (onSelect) {
      onSelect(result)
    } else {
      // Default behavior: redirect to near page
      const searchParams = new URLSearchParams({
        query: result.fullName,
        source: 'search',
        radius: '15'
      })
      
      // Add location details for better display
      if (result.country) {
        searchParams.set('country', result.country)
      }
      if (result.region) {
        searchParams.set('city', result.region)
      }
      // Use the main name as area if it's different from region
      if (result.name !== result.region && result.name !== result.country) {
        searchParams.set('area', result.name)
      }
      
      router.push(`/masjids/near/${result.coordinates.latitude}/${result.coordinates.longitude}?${searchParams.toString()}`)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'place':
      case 'locality':
        return '🏙️'
      case 'neighborhood':
        return '🏘️'
      case 'address':
        return '📍'
      default:
        return '📍'
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-gray-400" />
          )}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (results.length > 0) {
              setIsOpen(true)
            }
          }}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm transition-all"
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={result.id}
              onClick={() => handleSelectResult(result)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl ${
                index === selectedIndex ? 'bg-emerald-50 border-emerald-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-lg">{getResultIcon(result.type)}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900 truncate">
                      {result.name}
                    </p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 capitalize">
                      {result.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                    <p className="truncate">{result.fullName}</p>
                  </div>
                  
                  {(result.region || result.country) && (
                    <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                      {result.region && <span>{result.region}</span>}
                      {result.region && result.country && <span>•</span>}
                      {result.country && <span>{result.country}</span>}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && !isLoading && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-6 text-center">
          <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 font-medium">No locations found</p>
          <p className="text-gray-400 text-sm mt-1">Try searching for a different location</p>
        </div>
      )}
    </div>
  )
}
