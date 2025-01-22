'use client'

import { motion } from 'framer-motion'
import { FaCheck, FaMapMarkedAlt, FaDesktop, FaGlobe, FaMobileAlt, FaTv } from 'react-icons/fa'

const completedPhases = [
  {
    title: 'UK Masjid Database',
    description: 'Comprehensive database of all masjids across the United Kingdom.',
    icon: FaMapMarkedAlt,
  },
  {
    title: 'Admin Dashboard',
    description: 'Powerful management platform for mosque administrators.',
    icon: FaDesktop,
  },
  {
    title: 'Masjid Websites',
    description: 'Beautiful, modern websites for every mosque.',
    icon: FaGlobe,
  },
]

const currentPhase = {
  title: 'Alpha Testing',
  description: 'Onboarding initial mosques for testing and feedback.',
  icon: FaCheck,
}

const upcomingPhases = [
  {
    title: 'Masjid TV View',
    description: 'Digital displays for prayer times and announcements.',
    icon: FaTv,
  },
  {
    title: 'Mobile App',
    description: 'MyLocalMasjid app for the community.',
    icon: FaMobileAlt,
  },
  {
    title: 'UK Expansion',
    description: 'Expanding services across the United Kingdom.',
    icon: FaMapMarkedAlt,
  },
]

export function BenefitsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4 py-20 dark:from-primary-900 dark:via-gray-900 dark:to-primary-800">
      <div className="pattern-islamic absolute inset-0 opacity-5" />
      <div className="container relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-heading text-3xl font-bold text-primary-600 dark:text-primary-400 md:text-4xl">
            Our Journey
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Building the future of mosque management, one step at a time.
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Completed Phases */}
          <div>
            <h3 className="mb-6 text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
              Completed
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              {completedPhases.map((phase, index) => (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/80"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                    <phase.icon className="h-6 w-6" />
                  </div>
                  <h4 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {phase.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">{phase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Current Phase */}
          <div>
            <h3 className="mb-6 text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
              Current Phase
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mx-auto max-w-md rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/80"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500">
                <currentPhase.icon className="h-6 w-6" />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-primary-700 dark:text-primary-300">
                {currentPhase.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">{currentPhase.description}</p>
            </motion.div>
          </div>

          {/* Upcoming Phases */}
          <div>
            <h3 className="mb-6 text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
              Coming Soon
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              {upcomingPhases.map((phase, index) => (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative rounded-lg bg-white/60 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/60"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-500/10 text-gray-500">
                    <phase.icon className="h-6 w-6" />
                  </div>
                  <h4 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
                    {phase.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">{phase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 