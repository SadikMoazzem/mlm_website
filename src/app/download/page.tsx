'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Smartphone, MapPin, Compass, Wifi, Bell } from 'lucide-react'
import StoreButton from '@/components/elements/StoreButton'
import Image from 'next/image'

type DeviceType = 'ios' | 'android' | 'unknown'

export default function DownloadPage() {
  const [deviceType, setDeviceType] = useState<DeviceType>('unknown')
  const [isRedirecting] = useState(false)

  // Store URLs
  const appStoreUrl = 'https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734'
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid'

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera: string }).opera

    let detectedDevice: DeviceType = 'unknown'

    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream) {
      detectedDevice = 'ios'
    }
    // Android detection
    else if (/android/i.test(userAgent)) {
      detectedDevice = 'android'
    }

    setDeviceType(detectedDevice)

    // Auto-redirect on mobile devices (optional - disabled by default)
    // Uncomment below to enable auto-redirect
    /*
    if (detectedDevice !== 'unknown') {
      setIsRedirecting(true)
      const redirectUrl = detectedDevice === 'ios' ? appStoreUrl : playStoreUrl

      setTimeout(() => {
        window.location.href = redirectUrl
      }, 2000)
    }
    */
  }, [])

  const features = [
    {
      icon: <Check className="h-5 w-5" />,
      text: 'Accurate prayer times',
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      text: 'Find nearby masjids',
    },
    {
      icon: <Compass className="h-5 w-5" />,
      text: 'Qibla compass',
    },
    {
      icon: <Wifi className="h-5 w-5" />,
      text: 'Works offline',
    },
    {
      icon: <Bell className="h-5 w-5" />,
      text: 'No ads, no login',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-bg-primary dark:to-bg-secondary">
      <div className="container mx-auto max-w-6xl px-4 py-16 lg:py-24">
        {/* Redirecting Message */}
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 p-4 text-center"
          >
            <p className="text-primary-700 dark:text-primary-300 font-medium">
              Redirecting to store...
            </p>
            <p className="mt-2 text-sm text-primary-600 dark:text-primary-400">
              <a
                href={deviceType === 'ios' ? appStoreUrl : playStoreUrl}
                className="underline hover:no-underline"
              >
                Click here if not redirected
              </a>
            </p>
          </motion.div>
        )}

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <div className="mb-4 flex justify-center lg:justify-start">
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-600 p-1 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-white dark:bg-bg-card">
                    <Smartphone className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
              </div>

              <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-text-primary md:text-5xl lg:text-6xl">
                Download{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent">
                  MyLocalMasjid
                </span>
              </h1>

              <p className="mt-4 text-xl text-gray-600 dark:text-text-secondary">
                Your all-in-one prayer times app
              </p>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 space-y-3"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3 lg:justify-start"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    {feature.icon}
                  </div>
                  <span className="text-lg font-medium text-gray-700 dark:text-text-secondary">
                    {feature.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Store Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Primary Store (based on device detection) */}
              {deviceType === 'ios' && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                    Download for iOS
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:justify-start">
                    <StoreButton
                      store="AppStore"
                      href={appStoreUrl}
                      width={180}
                      height={54}
                    />
                  </div>
                  <div className="pt-4">
                    <p className="mb-2 text-sm text-gray-500 dark:text-text-muted">
                      Also available on Android
                    </p>
                    <StoreButton
                      store="GooglePlay"
                      href={playStoreUrl}
                      width={160}
                      height={48}
                      className="opacity-75 hover:opacity-100"
                    />
                  </div>
                </div>
              )}

              {deviceType === 'android' && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                    Download for Android
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:justify-start">
                    <StoreButton
                      store="GooglePlay"
                      href={playStoreUrl}
                      width={180}
                      height={54}
                    />
                  </div>
                  <div className="pt-4">
                    <p className="mb-2 text-sm text-gray-500 dark:text-text-muted">
                      Also available on iOS
                    </p>
                    <StoreButton
                      store="AppStore"
                      href={appStoreUrl}
                      width={160}
                      height={48}
                      className="opacity-75 hover:opacity-100"
                    />
                  </div>
                </div>
              )}

              {deviceType === 'unknown' && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                    Available on
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:justify-start">
                    <StoreButton
                      store="AppStore"
                      href={appStoreUrl}
                      width={170}
                      height={51}
                    />
                    <StoreButton
                      store="GooglePlay"
                      href={playStoreUrl}
                      width={170}
                      height={51}
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* QR Code for Desktop (Optional) */}
            {deviceType === 'unknown' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 hidden lg:block"
              >
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-bg-card p-6 shadow-sm">
                  <p className="mb-4 text-sm font-medium text-gray-700 dark:text-text-secondary">
                    Scan QR code to download on your mobile device
                  </p>
                  <div className="flex justify-center">
                    <div className="rounded-xl bg-white p-4">
                      {/* QR Code placeholder - you can generate actual QR codes later */}
                      <div className="h-32 w-32 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                        <Smartphone className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* App Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center lg:text-left"
            >
              <p className="text-sm text-gray-600 dark:text-text-muted">
                100% free • Privacy-first • No account required
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Main Phone Container */}
            <div className="relative z-10 mx-auto w-72 sm:w-80">
              {/* iPhone Frame */}
              <div className="relative w-full aspect-[9/19] bg-gray-900 dark:bg-gray-800 rounded-[3rem] p-1.5 shadow-2xl">
                {/* Screen Container */}
                <div className="relative w-full h-full bg-black rounded-[2.7rem] overflow-hidden">
                  <Image
                    src="/images/preview_mobile.png"
                    alt="MyLocalMasjid Mobile App Screenshot"
                    width={320}
                    height={690}
                    className="w-full h-full object-cover rounded-[2.5rem]"
                    priority
                  />
                </div>

                {/* iPhone Camera Notch */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 dark:bg-gray-800 rounded-full"></div>

                {/* iPhone Side Buttons */}
                <div className="absolute right-0 top-24 w-1 h-10 bg-gray-700 dark:bg-gray-600 rounded-l-sm"></div>
                <div className="absolute right-0 top-40 w-1 h-14 bg-gray-700 dark:bg-gray-600 rounded-l-sm"></div>
                <div className="absolute right-0 top-60 w-1 h-14 bg-gray-700 dark:bg-gray-600 rounded-l-sm"></div>

                {/* iPhone Left Side Button */}
                <div className="absolute left-0 top-28 w-1 h-8 bg-gray-700 dark:bg-gray-600 rounded-r-sm"></div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -right-8 top-16 hidden lg:block"
            >
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 p-4 shadow-lg backdrop-blur-sm">
                <div className="h-full rounded-xl bg-white/80 dark:bg-bg-card/50 flex items-center justify-center">
                  <Bell className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute -left-8 bottom-24 hidden lg:block"
            >
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 p-3 shadow-lg backdrop-blur-sm">
                <div className="h-full rounded-xl bg-white/80 dark:bg-bg-card/50 flex items-center justify-center">
                  <Compass className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </motion.div>

            {/* Subtle accent circle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-primary-100/10 dark:from-primary-900/10 dark:to-primary-800/5 rounded-full blur-3xl"
            ></motion.div>
          </motion.div>
        </div>

        {/* App Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 lg:mt-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-text-primary md:text-4xl">
              Everything You Need for{' '}
              <span className="text-primary-600 dark:text-primary-400">Salah</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-text-secondary max-w-2xl mx-auto">
              Stay connected to your salah and local masjid, whether you&apos;re traveling, commuting, or at home.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Check className="h-6 w-6" />,
                title: 'Accurate Prayer Times',
                description: 'Get precise prayer times based on your location with multiple calculation methods.',
              },
              {
                icon: <MapPin className="h-6 w-6" />,
                title: 'Find Nearby Masjids',
                description: 'Discover local masjids with jamaat times, directions, and contact information.',
              },
              {
                icon: <Compass className="h-6 w-6" />,
                title: 'Qibla Compass',
                description: 'Never miss the direction of prayer with our accurate Qibla compass.',
              },
              {
                icon: <Wifi className="h-6 w-6" />,
                title: 'Works Offline',
                description: 'Access prayer times even without an internet connection.',
              },
              {
                icon: <Bell className="h-6 w-6" />,
                title: 'Smart Notifications',
                description: 'Receive timely reminders before each prayer time.',
              },
              {
                icon: <Smartphone className="h-6 w-6" />,
                title: 'Privacy First',
                description: 'No ads, no tracking, no login required. Your privacy matters.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-text-secondary">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="rounded-3xl bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-700 dark:to-primary-600 p-12 shadow-xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Download Now and Never Miss Salah
            </h3>
            <p className="text-primary-50 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of Muslims using MyLocalMasjid to stay connected to their prayers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <StoreButton
                store="AppStore"
                href={appStoreUrl}
                width={170}
                height={51}
              />
              <StoreButton
                store="GooglePlay"
                href={playStoreUrl}
                width={170}
                height={51}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
