'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

export function ForMasjidsHero() {
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
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/30 px-4 py-2"
            >
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                Free for all masjids
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-5xl font-bold text-gray-900 dark:text-text-primary md:text-6xl lg:text-7xl"
            >
              The Complete{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent">
                Digital Solution
              </span>{' '}
              for Your Masjid
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-text-secondary lg:mx-0"
            >
              Focus on your community, we handle the tech. No technical skills needed.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 lg:justify-start"
            >
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-primary-600 dark:bg-btn-primary px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-700 dark:hover:bg-btn-primary-hover hover:shadow-lg"
              >
                Get Started Free
              </Link>

              <Link
                href="https://masjid-demo.mylocalmasjid.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-primary-600 dark:border-primary-400 bg-transparent px-8 py-4 text-lg font-semibold text-primary-600 dark:text-primary-400 transition-all hover:bg-primary-50 dark:hover:bg-primary-900/20"
              >
                View Demo
              </Link>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-text-secondary">
                  Always free
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-text-secondary">
                  Setup in minutes
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-text-secondary">
                  No technical skills needed
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Admin Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mx-auto w-full max-w-lg lg:mx-0"
          >
            {/* Desktop Admin Interface */}
            <div className="relative rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 p-1 shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-white dark:bg-bg-card">
                <div className="flex h-full flex-col md:flex-row">
                  {/* Sidebar */}
                  <div className="w-full border-b md:w-48 md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 bg-white dark:bg-bg-card p-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8">
                      <div className="h-8 w-8 rounded-lg bg-primary-100 dark:bg-primary-900/30"></div>
                      <div className="space-y-1">
                        <div className="h-2 w-24 rounded bg-gray-100 dark:bg-gray-700"></div>
                        <div className="h-2 w-16 rounded bg-gray-100 dark:bg-gray-700"></div>
                      </div>
                    </div>
                    {/* Nav Items */}
                    <div className="hidden md:block space-y-2">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <div className="h-4 w-4 rounded bg-gray-100 dark:bg-gray-700"></div>
                          <div className="h-2 w-20 rounded bg-gray-100 dark:bg-gray-700"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 bg-gray-50 dark:bg-bg-secondary p-4 overflow-auto">
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="h-6 w-32 rounded-lg bg-primary-100 dark:bg-primary-900/30"></div>
                      <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700"></div>
                    </div>

                    <div className="space-y-4">
                      {/* Prayer Times Preview */}
                      <div className="rounded-2xl bg-white dark:bg-bg-card p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="h-5 w-40 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-1"></div>
                            <div className="h-3 w-24 rounded-full bg-gray-100 dark:bg-gray-700"></div>
                          </div>
                          <div className="h-4 w-24 rounded-full bg-primary-100 dark:bg-primary-900/30"></div>
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                          {['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((_, i) => (
                            <div key={i} className="space-y-2">
                              <div className="h-3 w-12 rounded bg-gray-100 dark:bg-gray-700"></div>
                              <div className="space-y-1">
                                <div className="h-3 w-16 rounded bg-gray-100 dark:bg-gray-700"></div>
                                <div className="h-2 w-12 rounded bg-gray-100 dark:bg-gray-700 opacity-70"></div>
                                <div className="h-3 w-14 rounded bg-gray-100 dark:bg-gray-700"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Current Announcements */}
                        <div className="rounded-2xl bg-white dark:bg-bg-card p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="h-5 w-48 rounded-full bg-primary-100 dark:bg-primary-900/30"></div>
                            <div className="h-4 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30"></div>
                          </div>
                          <div className="space-y-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="space-y-2">
                                <div className="h-3 w-24 rounded bg-gray-100 dark:bg-gray-700 opacity-70"></div>
                                <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-700"></div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Special Prayers */}
                        <div className="rounded-2xl bg-white dark:bg-bg-card p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="h-5 w-44 rounded-full bg-primary-100 dark:bg-primary-900/30"></div>
                            <div className="h-4 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30"></div>
                          </div>
                          <div className="space-y-4">
                            {Array.from({ length: 2 }).map((_, i) => (
                              <div key={i} className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="h-5 w-16 rounded-lg bg-primary-100 dark:bg-primary-900/30 px-2"></div>
                                  <div className="h-3 w-24 rounded bg-gray-100 dark:bg-gray-700"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-14 rounded bg-gray-100 dark:bg-gray-700 opacity-70"></div>
                                  <div className="h-3 w-16 rounded bg-gray-100 dark:bg-gray-700"></div>
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

            {/* Floating Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -right-4 top-16 hidden lg:block"
            >
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 p-4 shadow-lg backdrop-blur-sm">
                <div className="h-full rounded-xl bg-white/80 dark:bg-bg-card/50"></div>
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
                  <Check className="h-8 w-8 text-primary-600 dark:text-primary-400" strokeWidth={2.5} />
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
