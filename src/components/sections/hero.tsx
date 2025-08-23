'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Building2, Users, Smartphone } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import StoreButton from '@/components/elements/StoreButton'

export function HeroSection() {
  /* Keep this for later when we have masajids onboard
  const trustedBy = [
    'UK Islamic Mission',
    'East London Masjid',
    'Green Lane Masjid',
    'Manchester Central Masjid',
  ]
  */

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-50/50 via-white to-white"></div>
      
      <div className="container relative mx-auto max-w-7xl px-4 pt-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 flex flex-wrap gap-2 lg:justify-start"
            >
              <div className="flex-shrink-0 rounded-2xl bg-[#E6F4F1] p-4 self-start">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium text-primary-600">For Masajids</span>
                </div>
              </div>
              <div className="flex-shrink-0 rounded-2xl bg-[#E6F4F1] p-4 self-start">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium text-primary-600">For Community</span>
                </div>
              </div>
              <div className="flex-shrink-0 rounded-2xl bg-[#E6F4F1] p-4 self-start">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium text-primary-600">One Platform</span>
                </div>
              </div>
              {/* <div className="flex-shrink-0 rounded-full bg-yellow-100 px-4 py-2 self-start">
                <span className="text-sm font-medium text-yellow-700">Beta Launch</span>
              </div> */}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl"
            >
              The Complete{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                Digital Solution
              </span>{' '}
              for Masajid
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 lg:mx-0"
            >
              Strengthening the bond between masajid and their communities through modern technology.
              From <span className="font-semibold text-primary-600">prayer times</span> to{' '}
              <span className="font-semibold text-primary-600">announcements</span> and{' '}
              <span className="font-semibold text-primary-600">special events</span>, we help keep your community connected and informed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
              >
                Get Started
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>



            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center lg:text-left"
            >
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Your All-in-One Prayer Times App
              </h3>
                
              <div className="flex flex-wrap gap-4 mb-4">
                <StoreButton store="GooglePlay" href="https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid" />
                <StoreButton store="AppStore" href="https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734" />
              </div>
              
              <p className="text-gray-600 max-w-2xl lg:max-w-none">
                Privacy first, accurate prayer times and masjid info, wherever you go. Find prayer times, nearby masjids, qibla direction and real jamaat times - all in one place. Whether you're traveling, commuting, or at home, staying connected to your salah and local masjid has never been easier.
              </p>
            </motion.div>


            {/* Comment out the trusted by section for now
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Trusted by Leading Masajids
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                {trustedBy.map((Masjid) => (
                  <span
                    key={Masjid}
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600"
                  >
                    {Masjid}
                  </span>
                ))}
              </div>
            </motion.div>
            */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg lg:mx-0"
          >
            {/* Desktop Admin Interface */}
            <div className="relative rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 p-1 shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-white">
                <div className="flex h-full flex-col md:flex-row">
                  {/* Sidebar */}
                  <div className="w-full border-b md:w-48 md:border-b-0 md:border-r border-gray-100 bg-white p-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8">
                      <div className="h-8 w-8 rounded-lg bg-primary-100"></div>
                      <div className="space-y-1">
                        <div className="h-2 w-24 rounded bg-gray-100"></div>
                        <div className="h-2 w-16 rounded bg-gray-100"></div>
                      </div>
                    </div>
                    {/* Nav Items */}
                    <div className="hidden md:block space-y-2">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50">
                          <div className="h-4 w-4 rounded bg-gray-100"></div>
                          <div className="h-2 w-20 rounded bg-gray-100"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 bg-gray-50 p-4 overflow-auto">
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="h-6 w-32 rounded-lg bg-primary-100"></div>
                      <div className="h-8 w-8 rounded-full bg-gray-100"></div>
                    </div>

                    <div className="space-y-4">
                      {/* Prayer Times Preview */}
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="h-5 w-40 rounded-full bg-primary-100 mb-1"></div>
                            <div className="h-3 w-24 rounded-full bg-gray-100"></div>
                          </div>
                          <div className="h-4 w-24 rounded-full bg-primary-100"></div>
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                          {['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((_, i) => (
                            <div key={i} className="space-y-2">
                              <div className="h-3 w-12 rounded bg-gray-100"></div>
                              <div className="space-y-1">
                                <div className="h-3 w-16 rounded bg-gray-100"></div>
                                <div className="h-2 w-12 rounded bg-gray-100 opacity-70"></div>
                                <div className="h-3 w-14 rounded bg-gray-100"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Current Announcements */}
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="h-5 w-48 rounded-full bg-primary-100"></div>
                            <div className="h-4 w-16 rounded-full bg-primary-100"></div>
                          </div>
                          <div className="space-y-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="space-y-2">
                                <div className="h-3 w-24 rounded bg-gray-100 opacity-70"></div>
                                <div className="h-4 w-full rounded bg-gray-100"></div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Special Prayers */}
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="h-5 w-44 rounded-full bg-primary-100"></div>
                            <div className="h-4 w-16 rounded-full bg-primary-100"></div>
                          </div>
                          <div className="space-y-4">
                            {Array.from({ length: 2 }).map((_, i) => (
                              <div key={i} className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="h-5 w-16 rounded-lg bg-primary-100/30 px-2"></div>
                                  <div className="h-3 w-24 rounded bg-gray-100"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-14 rounded bg-gray-100 opacity-70"></div>
                                  <div className="h-3 w-16 rounded bg-gray-100"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Phone Screenshot - Positioned over bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-12 -right-16 z-10"
            >
              {/* iPhone Frame */}
              <div className="relative w-48 h-96 bg-gray-900 rounded-[2rem] p-1 shadow-2xl">
                {/* Screen Container */}
                <div className="relative w-full h-full bg-black rounded-[1.7rem] overflow-hidden">
                  <Image
                    src="/images/preview_mobile.png"
                    alt="MyLocalMasjid Mobile App"
                    width={192}
                    height={384}
                    className="w-full h-full object-cover rounded-[1.5rem]"
                    priority
                  />
                </div>
                
                {/* iPhone Camera Notch */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-5 bg-gray-900 rounded-full"></div>
                
                {/* iPhone Side Button */}
                <div className="absolute right-0 top-20 w-1 h-8 bg-gray-700 rounded-l-sm"></div>
                <div className="absolute right-0 top-32 w-1 h-12 bg-gray-700 rounded-l-sm"></div>
                <div className="absolute right-0 top-48 w-1 h-12 bg-gray-700 rounded-l-sm"></div>
                
                {/* iPhone Left Side Button */}
                <div className="absolute left-0 top-24 w-1 h-6 bg-gray-700 rounded-r-sm"></div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 p-4 shadow-lg">
              <div className="h-full rounded-xl bg-white"></div>
            </div>
            <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 p-4 shadow-lg">
              <div className="h-full rounded-xl bg-white"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 