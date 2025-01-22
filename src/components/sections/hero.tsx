'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface HeroSectionProps {
  onOpenRegistration: () => void
}

export function HeroSection({ onOpenRegistration }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4 py-32 dark:from-primary-900 dark:via-gray-900 dark:to-primary-800">
      <div className="pattern-islamic absolute inset-0 opacity-5" />
      <div className="container relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Bringing Your{' '}
              <span className="text-primary-600 dark:text-primary-400">Masjid</span> Closer to the
              Community
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Making mosque services more accessible and keeping your community connected and informed.
              From prayer times to events, we help strengthen the bond between masjids and their
              communities.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onOpenRegistration}
                className="rounded-lg bg-primary-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-primary-600"
              >
                Get Started
              </button>
              <div className="relative">
                <button
                  disabled
                  className="rounded-lg border border-gray-300 px-6 py-3 text-lg font-semibold text-gray-400 opacity-80 dark:border-gray-600 dark:text-gray-500"
                >
                  View Demo
                </button>
                <div className="absolute -right-2 -top-2 rounded-full bg-primary-500/20 px-2 py-1 text-xs font-medium text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
                  Coming Soon
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto aspect-square w-full max-w-lg"
          >
            <Image
              src="/images/logo.png"
              alt="MyLocalMasjid"
              width={600}
              height={600}
              className="h-full w-full object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
} 