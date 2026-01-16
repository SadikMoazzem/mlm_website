'use client'

import { motion } from 'framer-motion'
import { Clock, Shield, WifiOff, Heart } from 'lucide-react'

interface TrustSignal {
  icon: React.ElementType
  title: string
  description: string
}

const trustSignals: TrustSignal[] = [
  {
    icon: Clock,
    title: 'Real Jamaat Times',
    description: 'Live prayer times direct from your local masjid, not generic calculations',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'No ads, no login required, no tracking. Your data stays yours.',
  },
  {
    icon: WifiOff,
    title: 'Works Offline',
    description: 'Access prayer times anywhere, even without internet connection',
  },
  {
    icon: Heart,
    title: 'Free Forever',
    description: 'Built by Muslims, for Muslims. No premium tiers, no hidden costs.',
  },
]

export function FeatureHighlights() {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900/50 px-4 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Why MyLocalMasjid?
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustSignals.map((signal, index) => {
            const Icon = signal.icon
            return (
              <motion.div
                key={signal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-start gap-4 rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md"
              >
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {signal.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {signal.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
