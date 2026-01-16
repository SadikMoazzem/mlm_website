'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cities } from '@/data/cities'
import { ArrowRight } from 'lucide-react'

export function QuickCityAccess() {
  // Select the top 10 cities as specified in the ticket
  // Using available cities from cities.ts (Leeds and Bristol not yet added)
  const featuredCities = [
    'london',
    'birmingham',
    'manchester',
    'bradford',
    'leicester',
    'glasgow',
    'edinburgh',
    'cardiff',
    'swansea',
    'newport',
  ]

  // Filter cities data to get only the featured ones that exist
  const displayCities = cities.filter(city =>
    featuredCities.includes(city.id)
  )

  // Sort them according to the featuredCities order
  const sortedCities = featuredCities
    .map(id => displayCities.find(city => city.id === id))
    .filter((city): city is NonNullable<typeof city> => city !== undefined)

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#0A1A1F] px-4 py-16">
      <div className="container relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Find masjids in your city
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            Quick access to prayer times and masjids in major UK cities
          </p>
        </motion.div>

        {/* Desktop: Grid layout (2 rows of 5) */}
        <div className="hidden md:grid md:grid-cols-5 gap-4 mb-6">
          {sortedCities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/location/${city.id}`}
                className="group block rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A2A30] px-6 py-4 text-center transition-all hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-lg"
              >
                <div className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {city.name}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {city.areas.reduce((sum, area) => sum + area.masjid_count, 0)} masjids
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Horizontal scrollable */}
        <div className="md:hidden mb-6 -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {sortedCities.map((city, index) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="snap-start"
              >
                <Link
                  href={`/location/${city.id}`}
                  className="group flex flex-col min-w-[160px] rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A2A30] px-5 py-4 transition-all hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-lg"
                >
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {city.name}
                  </div>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {city.areas.reduce((sum, area) => sum + area.masjid_count, 0)} masjids
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View all cities link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-start"
        >
          <Link
            href="/masjids"
            className="group inline-flex items-center gap-2 rounded-full bg-primary-600 dark:bg-primary-500 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-primary-700 dark:hover:bg-primary-600 hover:shadow-lg"
          >
            View all cities
            <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
