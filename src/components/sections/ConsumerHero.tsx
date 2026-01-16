'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, Users, Bell, Clock, Car, Navigation } from 'lucide-react'
import StoreButton from '@/components/elements/StoreButton'
import { FindNearMeButton } from '@/components/elements/FindNearMeButton'

export function ConsumerHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-bg-primary">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary-50/40 via-white to-white dark:from-primary-900/20 dark:via-bg-primary dark:to-bg-primary"></div>

      <div className="container relative mx-auto max-w-7xl px-4 pt-32 pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-5xl font-bold text-gray-900 dark:text-text-primary md:text-6xl lg:text-7xl"
            >
              Never Miss{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent">
                Salah
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-text-secondary lg:mx-0"
            >
              Find accurate prayer times and local masjids, instantly
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 lg:justify-start"
            >
              <Link
                href="/download"
                className="group inline-flex items-center gap-2 rounded-full bg-primary-600 dark:bg-btn-primary px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-700 dark:hover:bg-btn-primary-hover hover:shadow-lg"
              >
                Download App
              </Link>

              <FindNearMeButton />
            </motion.div>

            {/* Social Proof Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-semibold text-gray-700 dark:text-text-secondary">
                  2300+ masjids
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-primary-600 text-primary-600 dark:fill-primary-400 dark:text-primary-400" />
                <span className="text-sm font-semibold text-gray-700 dark:text-text-secondary">
                  4.8 rating
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-white text-xs font-bold">
                  ✓
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-text-secondary">
                  100% free
                </span>
              </div>
            </motion.div>

            {/* App Store Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <StoreButton
                store="GooglePlay"
                href="https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid"
                width={150}
                height={45}
              />
              <StoreButton
                store="AppStore"
                href="https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734"
                width={150}
                height={45}
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Phone Mockup with Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mx-auto w-full max-w-lg lg:mx-0"
          >
            {/* Main Phone Container */}
            <div className="relative z-10 mx-auto w-72 sm:w-80">
              {/* iPhone Frame */}
              <div className="relative w-full aspect-[9/19] bg-gray-900 dark:bg-gray-800 rounded-[3rem] p-1.5 shadow-2xl">
                {/* Screen Container */}
                <div className="relative w-full h-full bg-black rounded-[2.7rem] overflow-hidden">
                  <Image
                    src="/images/screenshots/main_asr.jpeg"
                    alt="MyLocalMasjid Mobile App"
                    width={320}
                    height={690}
                    className="w-full h-full object-cover rounded-[2.5rem]"
                    priority
                  />
                </div>

                {/* iPhone Side Buttons */}
                <div className="absolute right-0 top-24 w-1 h-10 bg-gray-700 dark:bg-gray-600 rounded-l-sm"></div>
                <div className="absolute right-0 top-40 w-1 h-14 bg-gray-700 dark:bg-gray-600 rounded-l-sm"></div>
                <div className="absolute right-0 top-60 w-1 h-14 bg-gray-700 dark:bg-gray-600 rounded-l-sm"></div>

                {/* iPhone Left Side Button */}
                <div className="absolute left-0 top-28 w-1 h-8 bg-gray-700 dark:bg-gray-600 rounded-r-sm"></div>
              </div>
            </div>

            {/* Floating Prayer Notification Card - Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -right-4 top-12 hidden lg:block z-20"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 w-64">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Asr Reminder</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Asr in 15 minutes</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed">
                    &quot;Guard the middle prayer and stand devoutly before Allah.&quot;
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">— Quran 2:238</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Masjid Card - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -left-8 bottom-16 hidden lg:block z-20"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 w-64">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Holborn Masjid</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">0.2 miles away</p>
                  </div>
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Facility Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">
                    <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>
                    Women&apos;s Area
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    <Car className="h-2.5 w-2.5" />
                    Parking
                  </span>
                </div>

                {/* Next Prayer */}
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">Next Jamaat</p>
                      <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">Asr - 15:00</p>
                    </div>
                    <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors">
                      <Navigation className="h-3 w-3" />
                      Directions
                    </button>
                  </div>
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
      </div>
    </section>
  )
}
