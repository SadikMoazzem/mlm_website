'use client'

import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Clock,
  Megaphone,
  Calendar,
  Globe,
  Search,
  Laptop,
  Smartphone,
  Navigation,
  ArrowRight,
  Building2,
  Users,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import StoreButton from '@/components/elements/StoreButton'

export function ComprehensiveSolutionSection() {
  const solutions = [
    {
      icon: LayoutDashboard,
      title: 'Admin Portal',
      link: 'https://admin.mylocalmasjid.com',
      externalLink: true,
      subtitle: 'Complete management platform for your masjid',
      description: 'Streamline your masjid administration with our intuitive platform designed for ease of use.',
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
      link: 'https://masjid-demo.mylocalmasjid.com',
      externalLink: true,
      subtitle: 'Beautiful, responsive web presence',
      description: 'Provide your community with a modern, mobile-friendly website featuring essential information and services.',
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
      title: 'All-in-One MyLocalMasjid App',
      link: '/download',
      subtitle: 'Connect with your masjid on mobile',
      description: 'Access prayer times, events, and masjid information conveniently from your smartphone.',
      isCommunityOnly: true,
      forMasjid: [],
      forCommunity: [
        {
          icon: Shield,
          title: 'Privacy-First Design',
          description: 'Enjoy a secure experience with no tracking, no ads, and no login required.',
        },
        {
          icon: Navigation,
          title: 'Smart Masjid Finder',
          description: "Discover masjids with filters (parking, women\'s space) & get live updates from your home masjid.",
        },
        {
          icon: Clock,
          title: 'Complete Prayer Times',
          description: 'Accurate daily schedules, offline access, and convenient home screen widgets.',
        },
        {
          icon: Calendar,
          title: 'Islamic Calendar & Reminders',
          description: 'Stay on top of Hijri dates and get timely reminders for important Islamic events.',
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

              {/* Solution description and links */}
              <div className="mt-12 mb-8">
                <h3 className="text-xl font-bold text-gray-900">{solution.subtitle}</h3>
                <p className="mt-2 text-gray-600">{solution.description}</p>
                
                <div className="mt-6 flex flex-wrap gap-4">
                  {solution.link && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link
                        href={solution.link}
                        target={solution.externalLink ? '_blank' : undefined}
                        rel={solution.externalLink ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
                      >
                        {solution.externalLink ? (solution.title === 'Admin Portal' ? 'Try Admin Portal' : 'View Demo') : 'Learn More'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </motion.div>
                  )}

                  {solution.title === 'All-in-One MyLocalMasjid App' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-4 items-start"
                    >
                      <StoreButton store="GooglePlay" href="https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid" />
                      <StoreButton store="AppStore" href="https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734" />
                    </motion.div>
                  )}
                </div>
              </div>

              <div className={`grid gap-12 ${solution.isCommunityOnly ? '' : 'lg:grid-cols-2'}`}>
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