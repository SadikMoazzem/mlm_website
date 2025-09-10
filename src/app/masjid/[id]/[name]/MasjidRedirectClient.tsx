'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Smartphone, Download, Clock } from 'lucide-react'

interface MasjidRedirectClientProps {
  masjidName: string
  masjidId: string
  deepLinkUrl: string
}

export function MasjidRedirectClient({ 
  masjidName, 
  masjidId, 
  deepLinkUrl 
}: MasjidRedirectClientProps) {
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop'>('desktop')
  const [showFallback, setShowFallback] = useState(false)
  const [attemptedDeepLink, setAttemptedDeepLink] = useState(false)

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
      setShowFallback(true) // Desktop users see the download page immediately
      return
    }

    // For mobile devices, attempt deep link
    if (!attemptedDeepLink && (isIOS || isAndroid)) {
      setAttemptedDeepLink(true)
      attemptDeepLink()
    }
  }, [deepLinkUrl, attemptedDeepLink])

  const attemptDeepLink = () => {
    // Create a hidden iframe to attempt the deep link
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = deepLinkUrl
    document.body.appendChild(iframe)

    // Set a timer to show fallback after 2 seconds
    const fallbackTimer = setTimeout(() => {
      setShowFallback(true)
      document.body.removeChild(iframe)
    }, 2000)

    // Listen for page visibility change (indicates app opened)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(fallbackTimer)
        document.body.removeChild(iframe)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Clean up after 3 seconds regardless
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe)
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }, 3000)
  }

  const handleStoreRedirect = (store: 'ios' | 'android') => {
    const urls = {
      ios: 'https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734',
      android: 'https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid'
    }
    window.open(urls[store], '_blank')
  }

  if (!showFallback && (deviceType === 'ios' || deviceType === 'android')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="animate-pulse">
          <Smartphone className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Opening {masjidName}
          </h1>
          <p className="text-gray-600">
            Redirecting you to the MyLocalMasjid app...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="MyLocalMasjid"
            width={60}
            height={60}
            className="mr-3"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            MyLocalMasjid
          </h1>
        </div>
        <h2 className="text-xl md:text-2xl text-emerald-700 font-semibold mb-4">
          {masjidName}
        </h2>
        <p className="text-gray-600 text-lg">
          Get prayer times, jamaat times, and updates for this masjid
        </p>
      </div>

      {/* Mobile App Download Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center justify-center mb-6">
          <Download className="w-8 h-8 text-emerald-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-800">
            Download the App
          </h3>
        </div>
        
        <p className="text-gray-600 mb-8 text-lg">
          Access {masjidName} and thousands of other masajid worldwide
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          {/* iOS Download Button */}
          <button
            onClick={() => handleStoreRedirect('ios')}
            className="flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors min-w-[200px]"
          >
            <Image
              src="/Store=App Store, Type=Light, Language=English.svg"
              alt="Download on App Store"
              width={120}
              height={40}
            />
          </button>

          {/* Android Download Button */}
          <button
            onClick={() => handleStoreRedirect('android')}
            className="flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors min-w-[200px]"
          >
            <Image
              src="/Store=Google Play, Type=Light, Language=English.svg"
              alt="Get it on Google Play"
              width={120}
              height={40}
            />
          </button>
        </div>

        {/* App Features */}
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="flex items-start">
            <Clock className="w-6 h-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Accurate Prayer Times</h4>
              <p className="text-gray-600 text-sm">Get precise prayer and jamaat times for your location</p>
            </div>
          </div>
          <div className="flex items-start">
            <Smartphone className="w-6 h-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Nearby Masajid</h4>
              <p className="text-gray-600 text-sm">Find masajid wherever you are in the world</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-emerald-600 rounded-full mr-3 mt-1 flex-shrink-0 flex items-center justify-center">
              <span className="text-white text-xs font-bold">Q</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Qibla Compass</h4>
              <p className="text-gray-600 text-sm">Always know the direction to Makkah</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-2">Masjid Directory Platform</h3>
        <p className="text-emerald-100">
          A comprehensive web platform for masjid information is coming soon!
        </p>
      </div>

      {/* Debug Info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left">
          <h4 className="font-bold text-gray-700 mb-2">Debug Info:</h4>
          <p className="text-sm text-gray-600">Masjid ID: {masjidId}</p>
          <p className="text-sm text-gray-600">Deep Link: {deepLinkUrl}</p>
          <p className="text-sm text-gray-600">Device: {deviceType}</p>
        </div>
      )}
    </div>
  )
}
