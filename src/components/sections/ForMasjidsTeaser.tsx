'use client'

import { motion } from 'framer-motion'
import { Building2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function ForMasjidsTeaser() {
  return (
    <section className="relative w-full overflow-hidden bg-primary-50 py-16 dark:bg-primary-900/20">
      <div className="container relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-primary-100 bg-white p-8 shadow-lg dark:border-primary-800 dark:bg-primary-900/40 lg:flex-row lg:gap-8 lg:p-10"
        >
          {/* Icon and Text Content */}
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-800">
              <Building2 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl">
                Manage Your Masjid Digitally
              </h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Free admin portal, website, and digital displays for your masjid
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <Link
              href="/for-masjids"
              className="group inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg dark:bg-primary-500 dark:hover:bg-primary-600"
            >
              Learn More
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
