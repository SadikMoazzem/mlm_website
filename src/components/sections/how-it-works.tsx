'use client'

import { motion } from 'framer-motion'
import { FaUserPlus, FaCog, FaMosque } from 'react-icons/fa'

interface HowItWorksSectionProps {
  onOpenRegistration: () => void
}

const steps = [
  {
    title: 'Quick Registration',
    description:
      'Sign up in minutes with your mosque details. Our streamlined process gets you started quickly and securely.',
    icon: FaUserPlus,
  },
  {
    title: 'Easy Setup',
    description:
      'Configure your prayer times, facilities, and community settings with our guided setup process.',
    icon: FaCog,
  },
  {
    title: 'Start Managing',
    description:
      'Begin managing your mosque efficiently with our comprehensive suite of tools and features.',
    icon: FaMosque,
  },
]

export function HowItWorksSection({ onOpenRegistration }: HowItWorksSectionProps) {
  return (
    <section className="w-full bg-white px-4 py-20 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-heading text-3xl font-bold text-primary-600 dark:text-primary-400 md:text-4xl">
            Get Started in Minutes
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Our simple three-step process gets your mosque up and running on our platform quickly and
            efficiently.
          </p>
        </motion.div>

        <div className="relative mt-20">
          {/* Connection Line */}
          <div className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 transform bg-primary-200 dark:bg-primary-800 md:block" />

          <div className="relative z-10 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg">
                  <step.icon className="h-8 w-8" />
                  <div className="absolute -right-7 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {step.title}
                </h3>
                <p className="mx-auto max-w-sm text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button
            onClick={onOpenRegistration}
            className="rounded-lg bg-primary-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-primary-600"
          >
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  )
} 