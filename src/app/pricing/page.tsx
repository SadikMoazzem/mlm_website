'use client'

import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import Link from 'next/link'

const features = [
  'Prayer Times Management',
  'Digital Display System',
  'Event Management',
  'Community Announcements',
  'Mobile App Access',
  'Modern Masjid Website',
  'Priority Support',
  'Regular Updates',
]

export default function PricingPage() {
  return (
    <main className="flex flex-col">
      <div className="relative isolate">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-50/50 via-white to-white dark:from-primary-950/20 dark:via-gray-900 dark:to-gray-900"></div>

        <div className="container relative mx-auto max-w-8xl px-6 py-12 sm:py-16">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block rounded-full bg-primary-50 dark:bg-primary-950/50 px-3 py-1 text-xs font-semibold text-primary-600 dark:text-primary-400"
            >
              Always Free — Sustained by community support
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
            >
              We keep MyLocalMasjid free for masajid
            </motion.h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Our aim is simple: provide free, privacy-first tools for masajid — websites, widgets, screens and the app — and keep them free forever.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Currently the project is funded from personal funds. If you'd like to help cover hosting, development and upkeep so we can keep this service free, please consider supporting us.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="https://www.moazzemlabs.com/support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary-600 dark:bg-primary-700 text-white px-6 py-3 font-semibold shadow-lg hover:bg-primary-700 dark:hover:bg-primary-600"
              >
                Support our mission
              </a>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 px-6 py-3 font-semibold bg-white dark:bg-gray-900 hover:bg-primary-50 dark:hover:bg-gray-800"
              >
                Join now
              </Link>
            </div>
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              <em>"When a person dies, all their deeds end except three: a continuing charity (sadaqah jariyah), beneficial knowledge, or a righteous child who prays for them." — Sahih Muslim</em>
            </div>
          </div>

          {/* Support & Funding */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg ring-1 ring-gray-100 dark:ring-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Help keep MyLocalMasjid free</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                MyLocalMasjid is offered to masajid completely free. These services are currently paid for personally to keep them ad-free and privacy-first. Your support helps cover the running costs so we can keep it that way.
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl bg-primary-50 dark:bg-primary-950/30 p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Where your support goes</h4>
                  <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Server hosting & databases</li>
                    <li>Development & maintenance</li>
                    <li>App store fees & security</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-white dark:bg-gray-900 p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">What your support enables</h4>
                  <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>No paywalls — always free</li>
                    <li>No ads — privacy-first</li>
                    <li>Reliable, well-maintained services</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-white dark:bg-gray-900 p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Our Sacred Promise</h4>
                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                    We will never sell your data, show ads, or lock features behind paywalls. Your donations are used transparently to keep services running.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <a href="https://www.moazzemlabs.com/support" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary-600 dark:bg-primary-700 text-white px-6 py-3 font-semibold shadow-lg hover:bg-primary-700 dark:hover:bg-primary-600">
                  Support our mission
                </a>
                <Link href="/register" className="inline-flex items-center gap-2 rounded-full border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 px-6 py-3 font-semibold bg-white dark:bg-gray-900 hover:bg-primary-50 dark:hover:bg-gray-800">
                  Join now
                </Link>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Why Join Early?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 grid gap-6 text-left sm:grid-cols-3"
            >
              <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Free Access</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Get complete access to all features at no cost during our beta period.
                </p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Shape the Future</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Your feedback will help us build the perfect solution for masajid worldwide.
                </p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Priority Support</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Get dedicated support and training to help you make the most of the platform.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Early Adopter Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mx-auto mt-12 max-w-xl text-center text-sm text-gray-500 dark:text-gray-400"
          >
            <p>
              Join now as an early adopter to secure the best possible terms for your Masjid.
              Help us shape the future of Masjid management software.
            </p>
            <p className="mt-2">
              This platform is offered free to masajid and currently sustained from personal funds. If you appreciate this work and want to help keep it free, please consider supporting us: <a href="https://www.moazzemlabs.com/support" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">Moazzem Labs — Support</a>.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
} 