'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Users, Database } from 'lucide-react'

export function MasjidCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-primary-600 dark:bg-primary-700 py-20 md:py-24">
      {/* Subtle Pattern Overlay */}
      <div className="pattern-islamic absolute inset-0 opacity-10" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/50 via-transparent to-primary-700/50 dark:from-primary-700/50 dark:to-primary-800/50" />

      <div className="container relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-4 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            Ready to Digitize Your Masjid?
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 max-w-2xl text-xl text-white/90 md:text-2xl"
          >
            Join hundreds of masjids already using MyLocalMasjid
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-wrap items-center justify-center gap-6 md:gap-8"
          >
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-white" />
              <span className="text-lg font-semibold text-white md:text-xl">
                100+ masjids
              </span>
            </div>

            <div className="hidden h-8 w-px bg-white/30 md:block" />

            <div className="flex items-center gap-2">
              <Database className="h-6 w-6 text-white" />
              <span className="text-lg font-semibold text-white md:text-xl">
                2300+ prayer listings
              </span>
            </div>

            <div className="hidden h-8 w-px bg-white/30 md:block" />

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-white" />
              <span className="text-lg font-semibold text-white md:text-xl">
                Always free
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-primary-600 transition-all hover:bg-white/95 hover:shadow-2xl dark:bg-white dark:text-primary-700 dark:hover:bg-white/95"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10 hover:shadow-xl"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Additional Reassurance */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 text-sm text-white/80"
          >
            No credit card required · Setup in minutes · Free forever
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
