'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
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
  BookOpen
} from 'lucide-react'

// Features organized by category
const featureCategories = [
  {
    id: 'masjid',
    title: 'Find Your Local Masjid',
    icon: MapPin,
    features: [
      {
        title: 'Set a Home Masjid',
        description: 'Choose your regular mosque as your default, making it quick to access prayer times where you worship most',
        icon: Home
      },
      {
        title: 'Discover Nearby Masjids',
        description: 'Find mosques in your area when traveling or moving to a new neighborhood',
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
        title: 'Weekly View',
        description: 'Plan ahead by seeing prayer times for the entire week',
        icon: Calendar
      },
      {
        title: 'Offline Access',
        description: 'View prayer times even when you don&apos;t have internet connection - perfect for travel!',
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
        description: 'When you&apos;re away from a masjid, get prayer times calculated for your exact location',
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
        description: 'Simple, clean design that&apos;s easy for everyone to use, regardless of tech experience',
        icon: LayoutDashboard
      }
    ]
  },
  {
    id: 'performance',
    title: 'Quick and Reliable',
    icon: Zap,
    features: [
      {
        title: 'Fast Loading',
        description: 'Prayer times load quickly, even on slower connections',
        icon: Zap
      },
      {
        title: 'Minimal Data Usage',
        description: 'The app is designed to use very little of your mobile data',
        icon: Smartphone
      },
      {
        title: 'Battery Friendly',
        description: 'Optimized to minimize battery consumption',
        icon: Zap
      }
    ]
  }
]

// Benefits for different user groups
const benefitsGroups = [
  {
    id: 'prayer',
    title: 'For Daily Prayer Management',
    icon: Clock,
    benefits: [
      'Never Miss a Prayer: Clear notifications and easy access to prayer times help you stay on schedule',
      'Prayer Time Confidence: Trust that you&apos;re getting accurate, verified times from your actual masjid',
      'Reduced Anxiety: No more wondering or searching for prayer times when traveling'
    ]
  },
  {
    id: 'busy',
    title: 'For Busy Lifestyles',
    icon: Zap,
    benefits: [
      'Time-Saving: Get prayer times instantly without having to search online or call your masjid',
      'Better Planning: Knowing prayer times in advance helps you schedule your day more effectively',
      'On-the-Go Access: Whether you&apos;re at work, shopping, or traveling, prayer times are always with you'
    ]
  },
  {
    id: 'family',
    title: 'For Families',
    icon: Users,
    benefits: [
      'Teach Children: Help children learn prayer schedules with an easy-to-read interface',
      'Family Prayer Coordination: Coordinate family prayer times more easily',
      'Peace of Mind for Parents: Know that your teenagers have access to accurate prayer times wherever they go'
    ]
  },
  {
    id: 'travel',
    title: 'For Travelers',
    icon: BackpackIcon,
    benefits: [
      'Easy Adjustment: Quickly adapt to new prayer times when crossing time zones',
      'Find Local Masjids: Discover places to pray in unfamiliar areas',
      'Offline Functionality: Access saved prayer times even without internet connection'
    ]
  }
]

export default function MobileAppPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-white pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-50/50 via-white to-white"></div>
        
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-block rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600"
              >
                MyLocalMasjid App
              </motion.span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl"
            >
              MyLocalMasjid Mobile App
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
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="https://play.google.com/store/apps/details?id=com.mylocalmasjid.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-play"
                >
                  <path d="m5 3 14 9-14 9V3z" />
                </svg>
                Google Play
              </Link>
              <Link
                href="https://apps.apple.com/app/mylocalmasjid/id1620390669"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-apple"
                >
                  <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                  <path d="M10 2c1 .5 2 2 2 5" />
                </svg>
                App Store
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Moved up */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black flex items-center justify-center gap-3">
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
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black flex items-center justify-center gap-3">
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
                  <h3 className="text-2xl font-bold text-black">
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
      <section className="py-20 bg-white">
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
                  Join Beta Programme
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