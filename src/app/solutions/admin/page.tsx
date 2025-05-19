'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Clock, 
  Megaphone, 
  Calendar, 
  Building, 
  Moon,
  Building2,
  Briefcase,
  Handshake,
  RefreshCw,
  ArrowRight
} from 'lucide-react'

// Primary Features
const primaryFeatures = [
  {
    id: 'dashboard',
    title: 'Complete Masjid Management in One Place',
    subtitle: 'Everything you need in a single platform',
    icon: LayoutDashboard,
    description: 'Manage all aspects of your masjid from one intuitive, mobile-responsive platform.',
    benefits: "Get a quick snapshot of your masjid's key information and manage everything on the go.",
    details: [
      'Dashboard Overview with key information',
      'User-Friendly Interface for all technical abilities',
      'Mobile Responsive design for management on any device'
    ]
  },
  {
    id: 'prayer',
    title: 'Prayer Times Management',
    subtitle: 'Simplified scheduling for all prayers',
    icon: Clock,
    description: 'Set and manage all prayer times with ease, including special religious events.',
    benefits: 'Keep your community informed with accurate, up-to-date prayer schedules.',
    details: [
      'Easy Scheduling with just a few clicks',
      'Special Prayer Events like Ramadan and Eid',
      'Automated Updates to community-facing platforms'
    ]
  },
  {
    id: 'announcements',
    title: 'Announcements & Communication',
    subtitle: 'Keep your community informed',
    icon: Megaphone,
    description: 'Share important news and updates directly with your masjid community.',
    benefits: 'Ensure timely and effective communication with your entire community.',
    details: [
      'Community Updates with important news',
      'Rich Content Editor with images and formatting',
      'Targeted Messaging to reach the right people'
    ]
  },
  {
    id: 'events',
    title: 'Events Calendar',
    subtitle: 'Comprehensive event management',
    icon: Calendar,
    description: 'Create, edit, and manage all masjid events in one centralized calendar.',
    benefits: 'Organize and promote all community activities efficiently.',
    details: [
      'Comprehensive Event Management in one place',
      'Detailed Event Information with all necessary details',
      'Event Categories for better organization'
    ]
  }
]

// Secondary Features
const secondaryFeatures = [
  {
    id: 'facilities',
    title: 'Facilities Management',
    subtitle: 'Manage masjid spaces efficiently',
    icon: Building,
    description: "Coordinate the use of your masjid's spaces and facilities with an intuitive booking system.",
    benefits: "Maximize the use of your masjid's physical resources and avoid scheduling conflicts.",
    details: [
      'Room Booking System',
      'Availability Calendar',
      'Booking Rules'
    ]
  },
  {
    id: 'religious',
    title: 'Special Religious Observances',
    subtitle: 'Streamlined management of special events',
    icon: Moon,
    description: 'Easily manage Ramadan, Eid, and other important religious events and schedules.',
    benefits: 'Ensure smooth planning and execution of special religious observances.',
    details: [
      'Ramadan Planning',
      'Eid Preparations',
      'Other Religious Events'
    ]
  },
  {
    id: 'profile',
    title: 'Masjid Profile Management',
    subtitle: 'Complete control of your digital presence',
    icon: Building2,
    description: "Update your masjid's information, branding, and location services.",
    benefits: "Maintain accurate, up-to-date information about your masjid for the community.",
    details: [
      'Complete Profile Control',
      'Custom Branding',
      'Location Services'
    ]
  }
]

// Benefits for Masjids
const benefitsGroups = [
  {
    title: 'Administrative Efficiency',
    icon: Briefcase,
    description: 'Streamline your masjid administration with our intuitive platform'
  },
  {
    title: 'Enhanced Community Engagement',
    icon: Handshake,
    description: 'Keep your community informed and engaged with modern digital experiences'
  },
  {
    title: 'Continuous Improvement',
    icon: RefreshCw,
    description: 'Benefit from regular updates and features based on real masjid needs'
  }
]

export default function AdminPlatformPage() {
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
              MyLocalMasjid Admin Portal
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl"
            >
              Empowering Masjid Management in the{' '}
              <span className="text-primary-600">Digital Age</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-gray-600"
            >
              Welcome to the MyLocalMasjid Admin Portal - a comprehensive solution designed to streamline 
              mosque administration and enhance community engagement. This user-friendly platform provides 
              everything you need to manage your masjid&apos;s digital presence with ease, no technical 
              expertise required!
            </motion.p>
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
              <span className="text-primary-600 text-5xl">🔧</span> 
              Key Features
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive admin portal includes everything you need to manage your masjid efficiently
            </p>
          </motion.div>

          {/* Primary Features (4 most important) */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-16">
            {primaryFeatures.map((feature, index) => (
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
                        {feature.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary-600 mr-2 mt-1">•</span>
                            <span className="text-sm text-gray-600">{detail}</span>
                          </li>
                        ))}
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

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <span className="text-primary-600 text-4xl">💎</span> 
              Benefits for Your Masjid
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              The MyLocalMasjid Admin Portal delivers multiple benefits to help your masjid thrive
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefitsGroups.map((group, index) => (
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
              Our admin portal comes packed with everything you need for comprehensive masjid management
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {secondaryFeatures.map((feature, index) => (
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
                <span className="text-4xl mr-2">✨</span> Modernize Your Masjid Management Today
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-primary-100 text-lg max-w-3xl mx-auto mb-10"
              >
                Join hundreds of masajid who are streamlining their administration and enhancing community 
                engagement with MyLocalMasjid Admin Portal. Our platform helps you focus on what matters most - 
                serving your community and preserving Islamic traditions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-8">
                  <p className="text-primary-100 italic">
                    MyLocalMasjid Admin Portal - Modernizing masjid management while preserving tradition
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
    </main>
  )
} 