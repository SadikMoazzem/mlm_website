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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-50/50 via-white to-white"></div>

        <div className="container relative mx-auto max-w-8xl px-6 py-12 sm:py-16">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600"
            >
              Always Free — Sustained by community support
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              We keep MyLocalMasjid free for masajid
            </motion.h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Our aim is simple: provide free, privacy-first tools for masajid — websites, widgets, screens and the app — and keep them free forever.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
              Currently the project is funded from personal funds. If you'd like to help cover hosting, development and upkeep so we can keep this service free, please consider supporting us.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="https://www.moazzemlabs.com/support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary-600 text-white px-6 py-3 font-semibold shadow-lg hover:bg-primary-700"
              >
                Support our mission
              </a>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary-600 text-primary-600 px-6 py-3 font-semibold bg-white hover:bg-primary-50"
              >
                Join now
              </Link>
            </div>
            <div className="mt-6 text-sm text-gray-500 max-w-2xl mx-auto">
              <em>“When a person dies, all their deeds end except three: a continuing charity (sadaqah jariyah), beneficial knowledge, or a righteous child who prays for them.” — Sahih Muslim</em>
            </div>
          </div>

          {/* Support & Funding */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Help keep MyLocalMasjid free</h2>
              <p className="text-gray-700 mb-4">
                MyLocalMasjid is offered to masajid completely free. These services are currently paid for personally to keep them ad-free and privacy-first. Your support helps cover the running costs so we can keep it that way.
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl bg-primary-50 p-4">
                  <h4 className="font-semibold text-gray-900">Where your support goes</h4>
                  <ul className="mt-3 text-sm text-gray-700 space-y-1">
                    <li>Server hosting & databases</li>
                    <li>Development & maintenance</li>
                    <li>App store fees & security</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-white p-4">
                  <h4 className="font-semibold text-gray-900">What your support enables</h4>
                  <ul className="mt-3 text-sm text-gray-700 space-y-1">
                    <li>No paywalls — always free</li>
                    <li>No ads — privacy-first</li>
                    <li>Reliable, well-maintained services</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-white p-4">
                  <h4 className="font-semibold text-gray-900">Our Sacred Promise</h4>
                  <p className="mt-3 text-sm text-gray-700">
                    We will never sell your data, show ads, or lock features behind paywalls. Your donations are used transparently to keep services running.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <a href="https://www.moazzemlabs.com/support" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary-600 text-white px-6 py-3 font-semibold shadow-lg hover:bg-primary-700">
                  Support our mission
                </a>
                <Link href="/register" className="inline-flex items-center gap-2 rounded-full border-2 border-primary-600 text-primary-600 px-6 py-3 font-semibold bg-white hover:bg-primary-50">
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
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              Why Join Early?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 grid gap-6 text-left sm:grid-cols-3"
            >
              <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
                <h3 className="font-semibold text-gray-900">Free Access</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Get complete access to all features at no cost during our beta period.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
                <h3 className="font-semibold text-gray-900">Shape the Future</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Your feedback will help us build the perfect solution for masajid worldwide.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
                <h3 className="font-semibold text-gray-900">Priority Support</h3>
                <p className="mt-2 text-sm text-gray-600">
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
            className="mx-auto mt-12 max-w-xl text-center text-sm text-gray-500"
          >
            <p>
              Join now as an early adopter to secure the best possible terms for your Masjid.
              Help us shape the future of Masjid management software.
            </p>
            <p className="mt-2">
              This platform is offered free to masajid and currently sustained from personal funds. If you appreciate this work and want to help keep it free, please consider supporting us: <a href="https://www.moazzemlabs.com/support" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">Moazzem Labs — Support</a>.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
} 