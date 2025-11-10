'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import EmbedSelector from '@/components/EmbedSelector'
import { 
  Clock, 
  Calendar, 
  Megaphone, 
  Building, 
  Smartphone, 
  HeartHandshake, 
  Phone,
  Target,
  Users,
  UserPlus,
  Home,
  BookOpen,
  ArrowRight
} from 'lucide-react'

// Features data
const features = [
  {
    id: 'prayer',
    title: 'Prayer Times',
    subtitle: 'Never miss a prayer again!',
    icon: Clock,
    description: 'Access up-to-date prayer times for all daily prayers with monthly and weekly views.',
    benefits: "Plan your day around prayer times with ease, whether you're at home or on the go.",
    details: [
      'Accurate Prayer Timetable for Fajr, Dhuhr, Asr, Maghrib, and Isha',
      'Monthly View to plan ahead',
      'Week View for the coming week',
      'Special Prayer Times for Jumuah, Eid, Taraweeh, and Tahajjud',
      'Active Prayer Highlighting',
      'Hijri Date integration'
    ]
  },
  {
    id: 'announcements',
    title: 'Announcements',
    subtitle: 'Stay informed about important masjid updates',
    icon: Megaphone,
    description: 'View critical announcements and news from the masjid administration.',
    benefits: 'Never miss important community news, upcoming events, or administrative updates.',
    details: [
      'Latest News from masjid administration',
      'Date-Organized Updates',
      'Archived Announcements for reference'
    ]
  },
  {
    id: 'events',
    title: 'Events Calendar',
    subtitle: 'Be part of the vibrant masjid community',
    icon: Calendar,
    description: 'Find and participate in masjid events with our comprehensive calendar.',
    benefits: 'Find events that interest you and your family, plan your participation, and never miss important community gatherings.',
    details: [
      'Upcoming Events listing',
      'Event Categories for Youth, Sisters, Family Events, Lectures, Workshops',
      'Calendar View (weekly or monthly)',
      'Event Details including time, location, and description',
      'Add to Calendar functionality'
    ]
  },
  {
    id: 'facilities',
    title: 'Facilities Information',
    subtitle: 'Discover what our masjid has to offer',
    icon: Building,
    description: 'Learn about the various facilities available at the masjid.',
    benefits: 'Make the most of all resources and spaces available at the masjid.',
    details: [
      'Facility Details for prayer halls, classrooms, libraries',
      'Visual Information with photos',
      'Usage Guidelines for different spaces'
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile-Friendly Design',
    subtitle: 'Access from anywhere, anytime',
    icon: Smartphone,
    description: 'Our responsive design ensures a perfect experience on all devices.',
    benefits: "Stay connected to the masjid whether you're at home, work, or traveling.",
    details: [
      'Responsive Layout for phones, tablets, and desktops',
      'Fast Loading even on slower connections',
      'Easy Navigation with simple menus'
    ]
  },
  {
    id: 'donations',
    title: 'Donations',
    subtitle: 'Support your masjid with ease',
    icon: HeartHandshake,
    description: 'Find out how to support your masjid with clear donation details provided by the administration.',
    benefits: 'Easily access information on how to contribute to your community, including bank details and donation instructions.',
    details: [
      'Donation Details (bank account, reference, etc.)',
      'Categories for different initiatives',
      'Contact information for donation queries'
    ]
  },
  {
    id: 'contact',
    title: 'Contact Information',
    subtitle: 'Reach out when you need to',
    icon: Phone,
    description: 'Find all necessary contact information and connect with masjid administration.',
    benefits: 'Get the information you need and communicate with masjid administration easily.',
    details: [
      'Contact Details (phone, email, location)',
      'Contact Form for direct messages',
      'Location Map and directions'
    ]
  }
]

// Audience groups
const audienceGroups = [
  {
    title: 'For Newcomers',
    icon: UserPlus,
    description: 'Learn about our masjid, find prayer times, and get directions'
  },
  {
    title: 'For Regular Attendees',
    icon: Home,
    description: 'Stay updated on prayer times, announcements, and events'
  },
  {
    title: 'For Families',
    icon: Users,
    description: 'Find family-friendly events and youth programs'
  },
  {
    title: 'For Sisters',
    icon: Users,
    description: 'Discover programs specifically designed for women'
  },
  {
    title: 'For Youth',
    icon: Target,
    description: 'Engage with youth-focused activities and educational opportunities'
  },
  {
    title: 'For Elderly',
    icon: BookOpen,
    description: 'Easy-to-read interface with important information readily accessible'
  }
]

export default function MasjidWebsitePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-50/50 via-white to-white"></div>
        
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-block rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600"
            >
              MLM Masjid Website
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl"
            >
              Your Digital Connection to the{' '}
              <span className="text-primary-600">Masjid Community</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-gray-600"
            >
              Welcome to the MLM Masjid Website - your all-in-one platform designed to strengthen 
              the connection between our masjid and its community. This user-friendly website brings 
              the masjid experience to your digital devices, making it easier for everyone to stay engaged, 
              informed, and involved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex justify-center"
            >
              <Link
                href="https://masjid-demo.mylocalmasjid.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
              >
                View Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section - PRIMARY */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <span className="text-primary-600 text-5xl">🕌</span> 
              Key Features
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive website includes everything your masjid needs to create a powerful digital presence
            </p>
          </motion.div>

          {/* Primary Features (3 most important) */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {features.slice(0, 3).map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="bg-primary-50 rounded-xl p-3 inline-block mb-4">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm font-medium text-primary-600 mb-3">{feature.subtitle}</p>
                  
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  
                  <div className="mt-4">
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Feature Highlights:</h4>
                      <ul className="space-y-2">
                        {feature.details.slice(0, 3).map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary-600 mr-2 mt-1">•</span>
                            <span className="text-sm text-gray-600">{detail}</span>
                          </li>
                        ))}
                        {feature.details.length > 3 && (
                          <li className="text-sm text-primary-600 font-medium">+ {feature.details.length - 3} more features</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-50/50 p-4 border-t border-gray-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <span className="text-xs font-semibold text-primary-600 uppercase bg-primary-100 rounded-full px-2 py-1">Benefit</span>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">{feature.benefits}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Everyone Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <span className="text-primary-600 text-4xl">👨‍👩‍👧‍👦</span> 
              For Everyone in the Community
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our website caters to all members of the community, ensuring everyone can benefit
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {audienceGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 flex items-start space-x-4 hover:bg-primary-50 transition-colors"
              >
                <div className="rounded-full bg-primary-100 p-3 text-primary-600">
                  <group.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{group.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{group.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section - SECONDARY */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              Additional Features
            </h3>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our masjid websites come packed with everything you need for a complete online presence
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.slice(3).map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow p-5 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="bg-primary-50 rounded-lg p-2.5 flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-xs font-medium text-primary-600">{feature.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                
                <div className="border-t border-gray-100 pt-3 mt-auto">
                  <div>
                    <span className="text-xs font-semibold text-primary-600 uppercase bg-primary-50 rounded-full px-2 py-0.5 inline-block mb-1.5">Key Benefit</span>
                    <p className="text-sm text-gray-700">{feature.benefits}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-primary-600 rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="p-12 md:p-16 text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                <span className="text-4xl mr-2">💬</span> Join Our Digital Community Today!
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-primary-100 text-lg max-w-3xl mx-auto mb-10"
              >
                The MLM Masjid Website brings our community together in the digital space, making it easier for everyone to participate in masjid activities and stay connected with their faith. Whether you visit the masjid daily or occasionally, our website ensures you never miss important information or opportunities to engage with the community.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-8">
                  <p className="text-primary-100 italic">
                    Building bridges, strengthening faith, and connecting communities - digitally.
                  </p>
                </div>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-primary-600 transition-all hover:bg-primary-50 hover:shadow-lg"
                >
                  Register Your Masjid
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Embed & Screens Section */}
      <section id="embed" className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-2xl bg-primary-50 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Embed & Widgets</h3>
            <p className="text-gray-700 mb-4">
              Use our lightweight script or iframe widgets to show live prayer times, Jummah notices and announcements directly on your existing website or masjid screens.
            </p>
            <div id="screens" className="text-sm text-gray-600">
              <strong>Masjid Screens:</strong> We support deploying widgets to digital displays in your masjid — simple iframe or full-screen layouts are available.
            </div>
            <div className="mt-6">
              <EmbedSelector baseUrl="https://mylocalmasjid.com" masjidId="6a75d794-ce79-405f-922d-c28197f57098" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 