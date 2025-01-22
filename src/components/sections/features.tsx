'use client'

import { FaClock, FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaHandshake } from 'react-icons/fa'
import { FeatureCard } from '@/components/ui/feature-card'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Prayer Times Management',
    description: 'Accurately manage and display prayer times with automatic adjustments for location and season.',
    icon: FaClock,
  },
  {
    title: 'Facility Management',
    description: 'Efficiently manage mosque facilities, maintenance schedules, and resource allocation.',
    icon: FaBuilding,
  },
  {
    title: 'Special Events Handling',
    description: 'Organize and promote special events, Jummah prayers, and community gatherings.',
    icon: FaCalendarAlt,
  },
  {
    title: 'Location Services',
    description: 'Help community members find your mosque with integrated maps and directions.',
    icon: FaMapMarkerAlt,
  },
  {
    title: 'Community Hub',
    description: 'Connect your community with announcements, events, and volunteer opportunities.',
    icon: FaUsers,
  },
  {
    title: 'Community Engagement',
    description: 'Foster community engagement with announcements, events, and volunteer coordination.',
    icon: FaHandshake,
  },
]

export function FeaturesSection() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-primary-50 px-4 py-20 dark:from-gray-900 dark:to-primary-900/20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-heading text-3xl font-bold text-primary-600 dark:text-primary-400 md:text-4xl">
            Comprehensive Mosque Management
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Everything you need to efficiently manage your mosque and engage with your community in one
            integrated platform.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 