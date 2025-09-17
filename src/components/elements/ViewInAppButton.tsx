'use client'

import { useState, useEffect } from 'react'
import { Smartphone, Download, ExternalLink } from 'lucide-react'
import * as Sentry from "@sentry/nextjs"

const { logger } = Sentry

interface ViewInAppButtonProps {
  masjidId: string
  masjidName: string
  className?: string
  variant?: 'primary' | 'secondary' | 'compact'
}

export function ViewInAppButton({ 
  masjidId, 
  masjidName, 
  className = '', 
  variant = 'primary' 
}: ViewInAppButtonProps) {
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop'>('desktop')
  const [isAttempting, setIsAttempting] = useState(false)

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(userAgent)
    const isAndroid = /android/.test(userAgent)
    
    if (isIOS) {
      setDeviceType('ios')
    } else if (isAndroid) {
      setDeviceType('android')
    } else {
      setDeviceType('desktop')
    }
  }, [])

  const handleViewInApp = () => {
    Sentry.startSpan(
      {
        op: "ui.click",
        name: "View in App Button Click",
      },
      (span) => {
        setIsAttempting(true)
        
        const deepLinkUrl = `mylocalmasjid://modals/masjid-details?id=${masjidId}`
        
        // Add span attributes
        span.setAttribute("masjid.id", masjidId)
        span.setAttribute("masjid.name", masjidName)
        span.setAttribute("device.type", deviceType)
        span.setAttribute("deep_link.url", deepLinkUrl)
        
        logger.info("User clicked View in App button", {
          masjidId,
          masjidName,
          deviceType,
          deepLinkUrl
        })

        if (deviceType === 'desktop') {
          // Desktop: Show both app store options
          handleDesktopFallback()
          setIsAttempting(false)
          return
        }

        // Mobile: Try deep link first, then fallback to app store
        let hasAppOpened = false
        let fallbackTriggered = false

        // Create a fallback timer - redirect to app store after 2.5 seconds
        const fallbackTimer = setTimeout(() => {
          if (!hasAppOpened && !fallbackTriggered) {
            fallbackTriggered = true
            logger.info("Deep link timeout, redirecting to app store", {
              masjidId,
              deviceType,
              timeoutMs: 2500
            })
            
            span.setAttribute("deep_link.result", "timeout")
            handleAppStoreFallback()
          }
          setIsAttempting(false)
        }, 2500)

        // Listen for page visibility change (indicates app opened)
        const handleVisibilityChange = () => {
          if (document.hidden && !fallbackTriggered) {
            hasAppOpened = true
            clearTimeout(fallbackTimer)
            
            logger.info("Deep link successful - app opened", {
              masjidId,
              deviceType
            })
            
            span.setAttribute("deep_link.result", "success")
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            setIsAttempting(false)
          }
        }

        // Listen for blur event (also indicates app opened)
        const handleBlur = () => {
          if (!fallbackTriggered) {
            hasAppOpened = true
            clearTimeout(fallbackTimer)
            
            logger.info("Deep link successful - window blur detected", {
              masjidId,
              deviceType
            })
            
            span.setAttribute("deep_link.result", "success")
            window.removeEventListener('blur', handleBlur)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            setIsAttempting(false)
          }
        }

        // Add event listeners
        document.addEventListener('visibilitychange', handleVisibilityChange)
        window.addEventListener('blur', handleBlur)

        // Attempt the deep link
        try {
          if (deviceType === 'ios') {
            // iOS: Use window.location for better compatibility
            window.location.href = deepLinkUrl
          } else {
            // Android: Create a temporary link and click it
            const link = document.createElement('a')
            link.href = deepLinkUrl
            link.style.display = 'none'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }
          
          logger.debug("Deep link attempt initiated", {
            masjidId,
            deviceType,
            method: deviceType === 'ios' ? 'window.location' : 'temporary_link'
          })
          
        } catch (error) {
          logger.error("Deep link attempt failed", {
            masjidId,
            deviceType,
            error: error instanceof Error ? error.message : 'Unknown error'
          })
          
          Sentry.captureException(error, {
            tags: {
              component: 'ViewInAppButton',
              error_type: 'deep_link_error'
            },
            extra: {
              masjidId,
              masjidName,
              deviceType,
              deepLinkUrl
            }
          })
          
          // Immediate fallback on error
          if (!fallbackTriggered) {
            fallbackTriggered = true
            clearTimeout(fallbackTimer)
            span.setAttribute("deep_link.result", "error")
            handleAppStoreFallback()
            setIsAttempting(false)
          }
        }

        // Clean up after 5 seconds regardless
        setTimeout(() => {
          clearTimeout(fallbackTimer)
          document.removeEventListener('visibilitychange', handleVisibilityChange)
          window.removeEventListener('blur', handleBlur)
          setIsAttempting(false)
        }, 5000)
      }
    )
  }

  const handleAppStoreFallback = () => {
    const urls = {
      ios: 'https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734',
      android: 'https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid'
    }
    
    logger.info("Redirecting to app store", {
      masjidId,
      deviceType,
      storeUrl: urls[deviceType as keyof typeof urls]
    })
    
    window.open(urls[deviceType as keyof typeof urls], '_blank')
  }

  const handleDesktopFallback = () => {
    // For desktop, show a modal or redirect to a page with both app store links
    const iosUrl = 'https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734'
    const androidUrl = 'https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid'
    
    logger.info("Desktop user - showing app store options", {
      masjidId,
      deviceType: 'desktop'
    })
    
    // Create a simple modal-like experience
    const message = `Get the MyLocalMasjid app to view ${masjidName} and thousands more masajid:\n\niOS: ${iosUrl}\n\nAndroid: ${androidUrl}`
    
    if (confirm(message + '\n\nClick OK to open iOS App Store, Cancel for Android Play Store')) {
      window.open(iosUrl, '_blank')
    } else {
      window.open(androidUrl, '_blank')
    }
  }

  // Render different variants
  if (variant === 'compact') {
    return (
      <button
        onClick={handleViewInApp}
        disabled={isAttempting}
        className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 hover:border-emerald-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isAttempting ? (
          <>
            <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            Opening...
          </>
        ) : (
          <>
            <Smartphone className="w-4 h-4" />
            View in App
          </>
        )}
      </button>
    )
  }

  if (variant === 'secondary') {
    return (
      <button
        onClick={handleViewInApp}
        disabled={isAttempting}
        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isAttempting ? (
          <>
            <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
            {deviceType === 'desktop' ? 'Opening...' : 'Opening App...'}
          </>
        ) : (
          <>
            {deviceType === 'desktop' ? (
              <>
                <Download className="w-4 h-4" />
                Get App
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4" />
                View in App
              </>
            )}
          </>
        )}
      </button>
    )
  }

  // Primary variant (default)
  return (
    <button
      onClick={handleViewInApp}
      disabled={isAttempting}
      className={`inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md ${className}`}
    >
      {isAttempting ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          {deviceType === 'desktop' ? 'Opening App Stores...' : 'Opening App...'}
        </>
      ) : (
        <>
          {deviceType === 'desktop' ? (
            <>
              <Download className="w-5 h-5" />
              Get MyLocalMasjid App
            </>
          ) : (
            <>
              <Smartphone className="w-5 h-5" />
              View in App
              <ExternalLink className="w-4 h-4 opacity-75" />
            </>
          )}
        </>
      )}
    </button>
  )
}
