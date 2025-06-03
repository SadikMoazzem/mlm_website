'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
// import Image from 'next/image' // Removed as it's no longer directly used
import { 
  Clock, 
  MapPin, 
  Smartphone, 
  Calendar, 
  Moon, 
  Zap, 
  Users,
  ArrowRight,
  Home,
  Map,
  Sparkles,
  BackpackIcon,
  LayoutDashboard,
  User2,
  BookOpen,
  Shield,
  ShieldOff,
  UserX,
  Bell
} from 'lucide-react'
import StoreButton from '@/components/elements/StoreButton'

// Features organized by category
const featureCategories = [
  {
    id: 'privacy',
    title: 'Privacy Focused',
    icon: Shield,
    features: [
      {
        title: 'No Tracking or Ads',
        description: 'Your activity is not tracked, and there are no advertisements.',
        icon: ShieldOff
      },
      {
        title: 'No Data Collection',
        description: 'We do not collect your personal data through the app.',
        icon: ShieldOff
      },
      {
        title: 'No Login Required',
        description: 'Use the app freely without needing to create an account or log in.',
        icon: UserX
      }
    ]
  },
  {
    id: 'masjid',
    title: 'Find Your Local Masjid',
    icon: MapPin,
    features: [
      {
        title: 'Set a Home Masjid',
        description: 'Choose your regular mosque as your default, making it quick to access prayer times where you worship most. Stay connected with live updates (registered masjids only).',
        icon: Home
      },
      {
        title: 'Discover Nearby Masjids',
        description: 'Find mosques in your area when traveling or moving to a new neighborhood. Filter by whether it is open, it has parking or womens prayer space etc.',
        icon: Map
      },
      {
        title: 'Switch Between Masjids',
        description: 'Easily view information for different mosques with just a few taps',
        icon: Sparkles
      }
    ]
  },
  {
    id: 'prayer',
    title: 'Prayer Times at Your Fingertips',
    icon: Clock,
    features: [
      {
        title: 'Daily Prayer Schedule',
        description: 'Get accurate prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha',
        icon: Clock
      },
      {
        title: 'Offline Access',
        description: "View prayer times even when you don't have internet connection - perfect for travel!",
        icon: Smartphone
      },
      {
        title: 'Widgets',
        description: 'Easy access to prayer times directly from your home screen.',
        icon: Smartphone
      }
    ]
  },
  {
    id: 'location',
    title: 'Location Smart',
    icon: MapPin,
    features: [
      {
        title: 'Automatic Location',
        description: 'The app can automatically detect where you are and show relevant prayer times',
        icon: MapPin
      },
      {
        title: 'Manual Location',
        description: 'Prefer privacy? You can manually set your location instead',
        icon: User2
      },
      {
        title: 'Location-Based Times',
        description: "When you're away from a masjid, get prayer times calculated for your exact location",
        icon: Map
      }
    ]
  },
  {
    id: 'islamic',
    title: 'Islamic Calendar Integration',
    icon: Calendar,
    features: [
      {
        title: 'Hijri Date Display',
        description: 'See the current Islamic date alongside the Gregorian calendar',
        icon: Calendar
      },
      {
        title: 'Important Islamic Dates',
        description: 'Stay aware of significant days in the Islamic calendar',
        icon: BookOpen
      },
      {
        title: 'Reminders',
        description: 'Get reminders for important Islamic dates so you never miss them.',
        icon: Bell
      }
    ]
  },
  {
    id: 'experience',
    title: 'Personalized Experience',
    icon: Sparkles,
    features: [
      {
        title: 'Light & Dark Themes',
        description: 'Choose between light mode for daytime and dark mode for nighttime or personal preference',
        icon: Moon
      },
      {
        title: 'User-Friendly Interface',
        description: "Simple, clean design that's easy for everyone to use, regardless of tech experience. Beautiful UI made for users.",
        icon: LayoutDashboard
      }
    ]
  },
]

// Benefits for different user groups
const benefitsGroups = [
  {
    id: 'prayer',
    title: 'For Daily Prayer Management',
    icon: Clock,
    benefits: [
      'Helps never miss a prayer, provides confidence in accurate masjid times, and reduces anxiety when traveling.'
    ]
  },
  {
    id: 'busy',
    title: 'For Busy Lifestyles',
    icon: Zap,
    benefits: [
      'Saves time in finding prayer times, aids in daily planning, and offers on-the-go access.'
    ]
  },
  {
    id: 'family',
    title: 'For Families',
    icon: Users,
    benefits: [
      'On the go, find masjids for the whole family with womens prayer area filters.'
    ]
  },
  {
    id: 'travel',
    title: 'For Travelers',
    icon: BackpackIcon,
    benefits: [
      'Allows easy adjustment to new time zones, helps find local masjids, view prayer times wherever you are, and offers offline functionality for saved times.'
    ]
  }
]

export default function MobileAppPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-50/50 via-white to-white"></div>
        
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-block rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600"
              >
                Application
              </motion.span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl"
            >
              My Local Masjid App
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-gray-600"
            >
              MyLocalMasjid is a user-friendly mobile app designed to connect you with your local mosque (masjid) 
              and help you stay on top of your daily prayers. Whether you&apos;re at home, traveling, or visiting a 
              new area, this app makes it easy to find prayer times and stay connected to your faith.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 flex flex-wrap gap-4 justify-center"
            >
              <StoreButton store="GooglePlay" isComingSoon={true} />
              
              <StoreButton store="AppStore" href="https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Moved up */}
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
              Benefits <span className="text-primary-600">for You</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              MyLocalMasjid App is designed with your needs in mind
            </p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2">
            {benefitsGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-5 border-b border-gray-100 pb-3">
                  <div className="bg-primary-100 rounded-full p-2.5 text-primary-600 flex-shrink-0">
                    <group.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-black">
                    {group.title.includes(' ') 
                      ? group.title.split(' ').map((word, i) => 
                          i === 1 
                            ? <span key={i} className="text-primary-600">{word} </span> 
                            : <span key={i}>{word} </span>
                        )
                      : group.title
                    }
                  </h3>
                </div>

                <ul className="space-y-3 pl-4">
                  {group.benefits.map((benefit, i) => (
                    <li key={i} className="relative">
                      <div className="flex gap-3">
                        <span className="absolute left-[-1rem] top-[0.5rem] w-2 h-2 rounded-full bg-primary-600"></span>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Categories Section */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <span className="text-primary-600 text-5xl">📱</span> 
              App <span className="text-primary-600">Features</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Designed to enhance your spiritual journey and make daily prayers easier to manage
            </p>
          </motion.div>

          {/* Feature Categories */}
          <div className="space-y-16">
            {featureCategories.map((category, catIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="border-b border-gray-200 pb-16 last:border-0"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-primary-50 rounded-xl p-3">
                    <category.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.title.includes(' ') 
                      ? category.title.split(' ').map((word, i, arr) => 
                          i === arr.length - 1 
                            ? <span key={i} className="text-primary-600">{word}</span> 
                            : <span key={i}>{word} </span>
                        )
                      : category.title
                    }
                  </h3>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {category.features.map((feature, index) => (
                    <motion.div
                      key={`${category.id}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg p-2.5 bg-primary-50/80 flex-shrink-0">
                          <feature.icon className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-black mb-1">{feature.title}</h4>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
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
                <span className="text-4xl mr-2">✨</span> Join Our <span className="text-primary-100">Community</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-primary-100 text-lg max-w-3xl mx-auto mb-10"
              >
                MyLocalMasjid is more than just an app – it&apos;s a tool designed to strengthen your connection to your faith and local community. 
                Download today and experience a more organized approach to your daily prayers.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-8">
                  <p className="text-primary-100 italic">
                    &quot;Making daily prayers simpler, more accessible, and connected to your local community.&quot;
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