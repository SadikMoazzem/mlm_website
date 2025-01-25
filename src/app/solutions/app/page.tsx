'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Bell, Users, Calendar, Smartphone } from 'lucide-react'

const features = [
  {
    icon: Bell,
    title: 'Push Notifications',
    description: 'Keep your community informed with instant prayer time and event notifications.',
  },
  {
    icon: Users,
    title: 'Community Hub',
    description: 'Connect with your Masjid community through announcements and discussions.',
  },
  {
    icon: Calendar,
    title: 'Events & Classes',
    description: 'Browse and register for upcoming events and Islamic classes.',
  },
  {
    icon: Smartphone,
    title: 'Digital Services',
    description: 'Access prayer times, Qibla direction, and other Islamic resources on the go.',
  },
]

export default function MobileAppPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-white pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-50/50 via-white to-white"></div>
        
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-block rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600"
            >
              Mobile App
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl"
            >
              Stay Connected with Your{' '}
              <span className="text-primary-600">Masjid Community</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-gray-600"
            >
              Empower your community with a modern mobile app that brings your Masjid&apos;s
              services and updates right to their fingertips.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="group rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary-50 p-3 text-primary-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mx-auto mt-20 max-w-xl text-center"
          >
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-primary-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
            >
              Get the App
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Available for iOS and Android devices.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 