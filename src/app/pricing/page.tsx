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
              className="mb-6 inline-block rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600"
            >
              Early Access Program
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              Join Now, Save Later
            </motion.h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Get early access to our complete platform and help shape the future of Masjid management.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Early Access */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative rounded-3xl bg-primary-600 p-8 text-white shadow-xl"
            >
              <div className="absolute -top-5 right-8 rounded-full bg-yellow-500 px-4 py-1 text-sm font-bold text-white shadow-lg">
                Available Now
              </div>
              <div className="flex items-baseline gap-x-4">
                <h2 className="text-lg font-semibold leading-8">Early Access</h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-100">
                Join our founding members and get complete access to all features
              </p>
              <div className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight">Free</span>
                <span className="text-sm font-semibold leading-6">during beta</span>
              </div>
              <Link
                href="/register"
                className="mt-6 block rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-primary-600 shadow-sm hover:bg-gray-50"
              >
                Get Started Now
              </Link>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-100">
                {features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-5 w-5 shrink-0" />
                    {feature}
                  </li>
                ))}
                <li className="flex gap-x-3 font-semibold">
                  <Zap className="h-5 w-5 shrink-0" />
                  Early Access to New Features
                </li>
              </ul>
            </motion.div>

            {/* Future Package */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-200"
            >
              <div className="absolute -top-5 right-8 rounded-full bg-gray-600 px-4 py-1 text-sm font-semibold text-white shadow-lg">
                Coming Soon
              </div>
              <div className="flex items-baseline gap-x-4">
                <h2 className="text-lg font-semibold leading-8 text-gray-900">Standard Package</h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Our full-featured package after the beta period
              </p>
              <div className="mt-6 flex items-baseline gap-x-1">
                <span className="text-lg font-semibold text-gray-900">Paid subscription</span>
              </div>
              <div className="mt-6 block rounded-full bg-gray-100 px-6 py-3 text-center text-sm font-semibold text-gray-400">
                Details Coming Soon
              </div>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-5 w-5 shrink-0 text-primary-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
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
          </motion.div>
        </div>
      </div>
    </main>
  )
} 