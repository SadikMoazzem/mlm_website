'use client'

import { motion } from 'framer-motion'
import {
  Building2,
  Users,
  Smartphone,
  Clock,
  Calendar,
  Megaphone,
  Globe,
  LayoutDashboard,
  Search,
  Navigation,
  Laptop,
} from 'lucide-react'

export function ComprehensiveSolutionSection() {
  const solutions = [
    {
      icon: LayoutDashboard,
      title: 'Admin Platform',
      forMasjid: [
        {
          icon: Clock,
          title: 'Prayer Times Management',
          description: 'Easily manage daily prayers, Jummah, Eid, and Ramadan prayer times',
        },
        {
          icon: Megaphone,
          title: 'Announcements',
          description: 'Keep your community informed with digital displays and notifications',
        },
        {
          icon: Calendar,
          title: 'Events Management',
          description: 'Organize and promote Islamic classes, events, and special occasions',
        },
      ],
      forCommunity: [
        {
          icon: Clock,
          title: 'Accurate Prayer Times',
          description: 'Always know the correct prayer times for your Masjid',
        },
        {
          icon: Megaphone,
          title: 'Important Updates',
          description: 'Stay informed about Masjid announcements and changes',
        },
      ],
    },
    {
      icon: Globe,
      title: 'Masjid Website',
      forMasjid: [
        {
          icon: Globe,
          title: 'SEO-Optimized Website',
          description: 'Increase your Masjid\'s visibility online with modern design',
        },
        {
          icon: Search,
          title: 'Local Discovery',
          description: 'Help worshippers find your Masjid with optimized local search',
        },
        {
          icon: Laptop,
          title: 'Digital Presence',
          description: 'Professional online presence with all essential information',
        },
      ],
      forCommunity: [
        {
          icon: Globe,
          title: 'Easy Access',
          description: 'Beautiful, mobile-friendly website for Masjid information',
        },
        {
          icon: Calendar,
          title: 'Event Information',
          description: 'Browse and register for Masjid events and classes',
        },
      ],
    },
    {
      icon: Smartphone,
      title: 'All-in-One Mylocalmasjid App',
      isCommunityOnly: true,
      forMasjid: [],
      forCommunity: [
        {
          icon: Clock,
          title: 'Prayer Times on the Go',
          description: 'Access accurate prayer times for your Masjid wherever you are',
        },
        {
          icon: Navigation,
          title: 'Nearby Masjids',
          description: 'Find Masjids and prayer times in any location',
        },
        {
          icon: Calendar,
          title: 'Events & Classes',
          description: 'Browse and register for Masjid events directly from your phone',
        },
        {
          icon: Megaphone,
          title: 'Push Notifications',
          description: 'Get instant updates from your Masjid when it matters',
        },
      ],
    },
  ]

  return (
    <section className="relative w-full overflow-hidden bg-white py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-50/50 via-white to-white"></div>
      
      <div className="container relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-block rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600"
          >
            Our Solutions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl font-bold text-gray-900 md:text-5xl"
          >
            Focus on your community,{' '}
            <span className="block text-primary-600">we handle the tech</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-gray-600"
          >
            Our mission is to help you go digital with as little work on your part as possible.
            No technical skills needed — that&apos;s our job.
          </motion.p>
        </div>

        <div className="mt-24 space-y-24">
          {solutions.map((solution, solutionIndex) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: solutionIndex * 0.2 }}
              className="relative rounded-[2rem] bg-gradient-to-br from-primary-50/50 to-white p-8 shadow-xl lg:p-12"
            >
              <div className="absolute -top-6 left-8 inline-flex h-12 items-center gap-3 rounded-full bg-primary-600 px-6 text-white shadow-lg">
                <solution.icon className="h-6 w-6" />
                <span className="text-lg font-semibold">{solution.title}</span>
              </div>

              <div className={`mt-12 grid gap-12 ${solution.isCommunityOnly ? '' : 'lg:grid-cols-2'}`}>
                {/* Masjid Benefits */}
                {!solution.isCommunityOnly && (
                  <div>
                    <div className="mb-8 flex items-center gap-3">
                      <span className="rounded-full bg-primary-100 p-2">
                        <Building2 className="h-6 w-6 text-primary-600" />
                      </span>
                      <h4 className="text-xl font-bold text-gray-900">For Masjids</h4>
                    </div>
                    <div className="grid gap-6">
                      {solution.forMasjid.map((feature, index) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative rounded-2xl bg-white p-6 shadow-md transition-all hover:shadow-lg hover:bg-primary-50/5"
                        >
                          <div className="flex gap-4">
                            <div className="flex-shrink-0 rounded-2xl bg-[#E6F4F1] p-4 self-start">
                              <feature.icon className="h-6 w-6 text-primary-600" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900">{feature.title}</h5>
                              <p className="mt-2 text-gray-600">{feature.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Community Benefits */}
                <div className={solution.isCommunityOnly ? 'mx-auto max-w-2xl w-full' : ''}>
                  <div className="mb-8 flex items-center gap-3">
                    <span className="rounded-full bg-primary-100 p-2">
                      <Users className="h-6 w-6 text-primary-600" />
                    </span>
                    <h4 className="text-xl font-bold text-gray-900">
                      {solution.isCommunityOnly ? 'Community Features' : 'For Community'}
                    </h4>
                    {solution.title === 'All-in-One Mylocalmasjid App' && (
                      <span className="ml-2 rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-600">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <div className="space-y-6">
                    {solution.forCommunity.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative rounded-2xl bg-white p-6 shadow-md transition-all hover:shadow-lg hover:bg-primary-50/5"
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 rounded-2xl bg-[#E6F4F1] p-4 self-start">
                            <feature.icon className="h-6 w-6 text-primary-600" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">{feature.title}</h5>
                            <p className="mt-2 text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 