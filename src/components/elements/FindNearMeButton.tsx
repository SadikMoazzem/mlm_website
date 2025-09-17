'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Loader2 } from 'lucide-react'
import * as Sentry from "@sentry/nextjs"

const { logger } = Sentry

export function FindNearMeButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleFindNearMe = async () => {
    Sentry.startSpan(
      {
        op: "ui.click",
        name: "Find Masjids Near Me Button Click",
      },
      (span) => {
        setIsLoading(true)
        
        span.setAttribute("geolocation.supported", !!navigator.geolocation)
        logger.info("User clicked Find Masjids Near Me button", {
          geolocationSupported: !!navigator.geolocation
        })

        try {
          // Check if geolocation is supported
          if (!navigator.geolocation) {
            logger.warn("Geolocation not supported, redirecting to general masjids page")
            span.setAttribute("geolocation.fallback_reason", "not_supported")
            // Fallback to general masjids page
            router.push('/masjids')
            return
          }

          // Request user's location
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              
              span.setAttribute("geolocation.latitude", latitude)
              span.setAttribute("geolocation.longitude", longitude)
              span.setAttribute("geolocation.accuracy", position.coords.accuracy)
              
              logger.info("Geolocation successful", {
                latitude,
                longitude,
                accuracy: position.coords.accuracy
              })
              
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
              span.setAttribute("geolocation.error", error.message)
              span.setAttribute("geolocation.error_code", error.code)
              
              logger.warn("Geolocation error, falling back to general page", {
                error: error.message,
                errorCode: error.code
              })
              
              Sentry.captureException(error, {
                tags: {
                  component: 'FindNearMeButton',
                  error_type: 'geolocation_error'
                },
                extra: {
                  errorCode: error.code,
                  errorMessage: error.message
                }
              })
              
              router.push('/masjids')
              setIsLoading(false)
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 300000 // 5 minutes
            }
          )
        } catch (error) {
          // Fallback to general masjids page
          logger.error("Exception in geolocation handling", {
            error: error instanceof Error ? error.message : 'Unknown error'
          })
          
          Sentry.captureException(error, {
            tags: {
              component: 'FindNearMeButton',
              error_type: 'geolocation_exception'
            }
          })
          
          router.push('/masjids')
          setIsLoading(false)
        }
      }
    )
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
