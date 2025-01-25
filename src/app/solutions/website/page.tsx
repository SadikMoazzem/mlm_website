'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Globe, Smartphone, Sparkles, Rocket } from 'lucide-react'

const features = [
  {
    icon: Globe,
    title: 'Modern Design',
    description: 'Beautiful, responsive website that reflects your Masjid\'s unique character.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First',
    description: 'Perfect experience on all devices, from smartphones to desktops.',
  },
  {
    icon: Sparkles,
    title: 'Easy Updates',
    description: 'Simple content management system to keep your website up to date.',
  },
  {
    icon: Rocket,
    title: 'Fast Performance',
    description: 'Lightning-fast loading times and optimized for search engines.',
  },
]

export default function MasjidWebsitePage() {
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
              Masjid Website
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl"
            >
              Beautiful{' '}
              <span className="text-primary-600">Modern Websites</span>
              {' '}for Every Masjid
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-gray-600"
            >
              Establish your Masjid&apos;s online presence with a stunning website that engages
              your community and showcases your services.
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
              Create Your Website
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Launch your Masjid website in minutes.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 