'use client'

import { motion } from 'framer-motion'
import { UserPlus, Clock, Rocket } from 'lucide-react'

interface Step {
  number: string
  icon: React.ElementType
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '1',
    icon: UserPlus,
    title: 'Register Your Masjid',
    description: 'Fill out a simple form with your masjid details',
  },
  {
    number: '2',
    icon: Clock,
    title: 'Add Prayer Times',
    description: "Enter your prayer schedule - we'll handle the rest",
  },
  {
    number: '3',
    icon: Rocket,
    title: 'Go Live',
    description: 'Your website and app listings are ready instantly',
  },
]

export function HowItWorks() {
  return (
    <section className="w-full px-4 py-16 md:py-24 bg-bg-secondary">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-4xl font-bold text-text-primary md:text-5xl">
            Get Started in Minutes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            Three simple steps to digitise your masjid
          </p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="absolute top-16 left-0 right-0 hidden h-0.5 md:block">
            <div className="mx-auto flex h-full max-w-4xl items-center justify-between px-12">
              <div className="h-full flex-1 bg-gradient-to-r from-primary-500/40 via-primary-500/40 to-transparent"></div>
              <div className="h-full flex-1 bg-gradient-to-r from-transparent via-primary-500/40 to-transparent"></div>
              <div className="h-full flex-1 bg-gradient-to-r from-transparent via-primary-500/40 to-primary-500/40"></div>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Numbered Circle with Icon */}
                  <div className="relative z-10 mb-6">
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon Circle */}
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary-500/20 bg-bg-card shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary-500/40 hover:shadow-2xl dark:border-primary-500/30 dark:hover:border-primary-500/50">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg">
                        <Icon className="h-10 w-10" strokeWidth={2} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl font-semibold text-text-primary md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="max-w-xs text-text-secondary leading-relaxed">
                    {step.description}
                  </p>

                  {/* Mobile Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="mt-8 h-12 w-0.5 bg-gradient-to-b from-primary-500/40 to-transparent md:hidden"></div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
            No technical skills needed • Setup takes less than 5 minutes
          </p>
        </motion.div>
      </div>
    </section>
  )
}
