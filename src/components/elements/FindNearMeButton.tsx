'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Loader2 } from 'lucide-react'

export function FindNearMeButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleFindNearMe = async () => {
    setIsLoading(true)

    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        // Fallback to general masjids page
        router.push('/masjids')
        return
      }

      // Request user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          
          // Navigate to near page with coordinates
          const searchParams = new URLSearchParams({
            query: 'you',
            source: 'geolocation',
            radius: '15'
          })
          
          router.push(`/masjids/near/${latitude}/${longitude}?${searchParams.toString()}`)
          setIsLoading(false)
        },
        (error) => {
          // Handle geolocation errors - fallback to general page
          console.warn('Geolocation error:', error.message)
          router.push('/masjids')
          setIsLoading(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      )
    } catch {
      // Fallback to general masjids page
      router.push('/masjids')
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleFindNearMe}
      disabled={isLoading}
      className="group inline-flex items-center gap-2 rounded-full border-2 border-primary-600 px-8 py-4 text-lg font-semibold text-primary-600 transition-all hover:bg-primary-50 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <MapPin className="w-5 h-5 transition-transform group-hover:scale-110" />
      )}
      {isLoading ? 'Finding Location...' : 'Find Masjids Near Me'}
    </button>
  )
}
