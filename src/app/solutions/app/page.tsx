import { Metadata } from 'next'
import { motion } from 'framer-motion'
import { 
  Clock, 
  MapPin, 
  Compass, 
  Shield, 
  Smartphone,
  Calendar,
  Eye
} from 'lucide-react'
import StoreButton from '@/components/elements/StoreButton'

export const metadata: Metadata = {
  title: 'MyLocalMasjid App - Your All-in-One Islamic App',
  description: 'Privacy First, Accurate prayer times and masjid info, wherever you go. Find Prayer Times. Nearby Masjids. Real Jamaat Info.',
}

export default function AppPage() {
  const features = [
    {
      icon: MapPin,
      title: 'Nearby Masjids & Live Jamaat Times',
      description: 'Discover masjids around you instantly with real-time jamaat times and announcements.',
      bullets: [
        'Discover masjids around you instantly',
        'View real-time jamaat (congregation) times for participating masjids',
        'See Jumu\'ah and Eid announcements',
        'Get directions and masjid details',
        'Save favorite masjids for quick access'
      ]
    },
    {
      icon: Clock,
      title: 'Precise Prayer Times',
      description: 'Automatically detects your location for accurate timings with real-time countdown.',
      bullets: [
        'Automatically detects your location for accurate timings',
        'Toggle between location-based and masjid-based times',
        'Real-time countdown to the next prayer',
        'Built-in prayer helpers and assistance tools',
        'Works offline for basic prayer time access'
      ]
    },
    {
      icon: Calendar,
      title: 'Ramadan & Fasting Support',
      description: 'Interactive fasting progress tracker with real-time countdown to breaking your fast.',
      bullets: [
        'Interactive fasting progress tracker for Suhoor and Iftar',
        'Real-time countdown to breaking your fast',
        'Dedicated Ramadan calendar and timing'
      ]
    },
    {
      icon: Compass,
      title: 'Qibla Compass',
      description: 'Instantly find the Qibla direction with simple, accurate, and easy-to-use interface.',
      bullets: [
        'Instantly find the Qibla direction',
        'Simple, accurate, and easy to use'
      ]
    },
    {
      icon: Smartphone,
      title: 'Widgets & Home Screen Access',
      description: 'Prayer time widgets for quick glances without opening the app.',
      bullets: [
        'Prayer time widgets for quick glances',
        'Fasting progress widgets during Ramadan',
        'See upcoming prayers without opening the app',
        'Light on battery and data usage'
      ]
    },
    {
      icon: Eye,
      title: 'Clean & Modern Design',
      description: 'Minimalist and distraction-free interface designed for speed and clarity.',
      bullets: [
        'Minimalist and distraction-free interface',
        'Easy to use, even in low signal areas',
        'Designed for speed, clarity, and ease of use'
      ]
    },
    {
      icon: Shield,
      title: 'Privacy You Can Trust',
      description: 'No tracking, no ads, no data selling. Full privacy controls in your hands.',
      bullets: [
        'No tracking, no ads, no data selling',
        'Optional anonymous analytics to improve the app (easily disabled)',
        'Full privacy controls in Settings - you decide what to share',
        'Location is only used for prayer times and masjid discovery'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-25"></div>
        <div className="container relative mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary-100 px-4 py-2 mb-6"
            >
              <Shield className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-600">Privacy First</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Accurate prayer times and masjid info,{' '}
              <span className="text-primary-600">wherever you go</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Find Prayer Times. Nearby Masjids. Real Jamaat Info.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              MyLocalMasjid gives you accurate prayer times no matter where you are — with no setup required. 
              Whether you&apos;re traveling, commuting, or at home, staying connected to your salah and local masjid has never been easier.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <StoreButton store="GooglePlay" href="https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid" />
              <StoreButton store="AppStore" href="https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 rounded-2xl bg-primary-100 p-4">
                    <feature.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-600 mt-2"></div>
                          <span className="text-gray-700">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Stay on top of your prayers. Stay connected to your masjid.
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              All in one place — with MyLocalMasjid.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <StoreButton store="GooglePlay" href="https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid" />
              <StoreButton store="AppStore" href="https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 