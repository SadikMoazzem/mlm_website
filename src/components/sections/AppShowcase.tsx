'use client'

import { motion } from 'framer-motion'
import { Clock, MapPin, Home, Bell, Calendar, Navigation, Car, Moon, Megaphone } from 'lucide-react'
import Image from 'next/image'
import StoreButton from '@/components/elements/StoreButton'

const features = [
  {
    id: 1,
    title: 'Prayer Times Wherever You Are',
    description: 'Accurate prayer times based on your location using the UK Moonsighting Committee method. Works offline, displays Hijri dates, and keeps you connected to your salah no matter where you are.',
    icon: Clock,
    image: '/images/screenshots/main_asr.jpeg',
    highlights: ['Location-based times', 'Works offline', 'Hijri calendar'],
  },
  {
    id: 2,
    title: 'Always Find a Nearby Masjid',
    description: 'Interactive map showing masjids around you with live jamaat times. Filter by facilities like parking and women\'s prayer areas. Get directions instantly and never miss a congregation.',
    icon: MapPin,
    image: '/images/screenshots/basic_map_card.jpeg',
    highlights: ['Filter by facilities', 'Live jamaat times', 'Parking & women\'s areas'],
  },
  {
    id: 3,
    title: 'Stay in Sync with Your Home Masjid',
    description: 'Set your local masjid as home and get jamaat times directly from them. Receive announcements, Jummah updates, and stay connected with your community.',
    icon: Home,
    image: '/images/screenshots/masjid_asr.jpeg',
    highlights: ['Home masjid sync', 'Jummah updates', 'Community announcements'],
  },
  {
    id: 4,
    title: 'Easy Access When You Need It',
    description: 'Smart notifications before each prayer, home screen widgets for a quick glance, and Apple Watch support. No login required - just download and use.',
    icon: Bell,
    image: '/images/screenshots/main_widget.jpeg',
    highlights: ['Prayer notifications', 'Home screen widgets', 'Apple Watch'],
    isWidgetShowcase: true,
    widgetImages: [
      '/images/screenshots/main_widget.jpeg',
      '/images/screenshots/lock_screen_on.jpeg',
      '/images/screenshots/smll_wdget.jpeg',
    ],
  },
  {
    id: 5,
    title: 'Plan Ahead',
    description: 'Search any location for prayer times before you travel. View the prayer times calendar for future dates and get Ramadan support with Suhoor and Iftar countdown.',
    icon: Calendar,
    image: '/images/screenshots/main_asr.jpeg',
    highlights: ['Search any location', 'Future prayer times', 'Ramadan support'],
  },
]

export function AppShowcase() {
  return (
    <section className="relative w-full overflow-hidden bg-bg-primary py-24 md:py-32">
      <div className="pattern-islamic absolute inset-0 opacity-5" />

      <div className="container relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-primary-50 dark:bg-primary-900/30 px-4 py-2 text-sm font-semibold text-primary-600 dark:text-primary-400"
          >
            Mobile App
          </motion.span>
          <h2 className="mb-4 font-heading text-4xl font-bold text-text-primary md:text-5xl">
            Your All-in-One{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              Prayer Companion
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Prayer times wherever you are. Nearby masjids at your fingertips. Privacy-first, no login required, free forever.
          </p>
        </motion.div>

        {/* Features */}
        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
                index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
              }`}
            >
              {/* Feature Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-900/30 p-4">
                  <feature.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>

                <h3 className="font-heading text-3xl font-bold text-text-primary md:text-4xl">
                  {feature.title}
                </h3>

                <p className="text-lg leading-relaxed text-text-secondary">
                  {feature.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-3">
                  {feature.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="rounded-full bg-bg-card dark:bg-bg-secondary border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-text-primary"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone Screenshot or Widget Showcase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative mx-auto"
              >
                {/* Widget Showcase for Feature 4 */}
                {feature.isWidgetShowcase ? (
                  <div className="relative flex items-end justify-center gap-4">
                    {/* Decorative Background Glow */}
                    <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-primary-200/50 via-primary-100/30 to-transparent dark:from-primary-900/30 dark:via-primary-800/20 blur-2xl" />

                    {/* Main Widget - larger */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <Image
                        src="/images/screenshots/main_widget.jpeg"
                        alt="Home Screen Widget"
                        width={180}
                        height={180}
                        className="rounded-3xl shadow-2xl"
                        loading="lazy"
                      />
                      <p className="text-center text-xs text-text-secondary mt-2">Home Widget</p>
                    </motion.div>

                    {/* Lock Screen Widget - medium */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <Image
                        src="/images/screenshots/lock_screen_on.jpeg"
                        alt="Lock Screen Widget"
                        width={160}
                        height={160}
                        className="rounded-3xl shadow-2xl"
                        loading="lazy"
                      />
                      <p className="text-center text-xs text-text-secondary mt-2">Lock Screen</p>
                    </motion.div>

                    {/* Small Widget */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <Image
                        src="/images/screenshots/smll_wdget.jpeg"
                        alt="Small Widget"
                        width={120}
                        height={120}
                        className="rounded-2xl shadow-2xl"
                        loading="lazy"
                      />
                      <p className="text-center text-xs text-text-secondary mt-2">Small Widget</p>
                    </motion.div>
                  </div>
                ) : (
                <div className="relative">
                  {/* Decorative Background Glow */}
                  <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-primary-200/50 via-primary-100/30 to-transparent dark:from-primary-900/30 dark:via-primary-800/20 blur-2xl" />

                  {/* Phone Frame */}
                  <div className="relative w-72 h-[580px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                    {/* Screen Container */}
                    <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={288}
                        height={576}
                        className="w-full h-full object-cover rounded-[2.3rem]"
                        loading="lazy"
                      />
                    </div>

                    {/* iPhone Side Buttons */}
                    <div className="absolute right-0 top-24 w-1 h-10 bg-gray-700 rounded-l-sm" />
                    <div className="absolute right-0 top-40 w-1 h-14 bg-gray-700 rounded-l-sm" />
                    <div className="absolute right-0 top-60 w-1 h-14 bg-gray-700 rounded-l-sm" />

                    {/* iPhone Left Side Button */}
                    <div className="absolute left-0 top-28 w-1 h-8 bg-gray-700 rounded-r-sm" />
                  </div>

                  {/* Feature 1: Prayer Times - Hijri Date & Current Time */}
                  {feature.id === 1 && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, x: 20, y: -10 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="absolute -right-8 top-16 hidden lg:block z-20"
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 w-48">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                              <Moon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Hijri Date</p>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">15 Rajab 1446</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20, y: 10 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        viewport={{ once: true }}
                        className="absolute -left-6 bottom-24 hidden lg:block z-20"
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4">
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Next Prayer</p>
                          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">Asr</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">in 47 minutes</p>
                        </div>
                      </motion.div>
                    </>
                  )}

                  {/* Feature 2: Nearby Masjid - No floating card needed, screenshot already shows one */}

                  {/* Feature 3: Home Masjid - Announcement Notification */}
                  {feature.id === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20, y: 10 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="absolute -right-6 bottom-20 hidden lg:block z-20"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 w-56">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                            <Megaphone className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Holborn Masjid</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">New Announcement</p>
                          </div>
                        </div>
                        <p className="mt-3 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          Jummah khutbah will begin at 1:15pm this week due to maintenance.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Feature 4: Widgets shown separately above, no floating card needed */}

                  {/* Feature 5: Plan Ahead - Ramadan Countdown */}
                  {feature.id === 5 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20, y: 10 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="absolute -left-6 bottom-24 hidden lg:block z-20"
                    >
                      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-xl p-4 w-48">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-white/80" />
                          <p className="text-xs text-white/80 font-medium">Ramadan</p>
                        </div>
                        <p className="text-3xl font-bold text-white">42</p>
                        <p className="text-sm text-white/80">days to go</p>
                        <div className="mt-3 pt-3 border-t border-white/20">
                          <p className="text-xs text-white/70">Starts 1st March 2025</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block rounded-3xl bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-primary-900/20 dark:via-bg-card dark:to-primary-900/20 p-8 md:p-12 shadow-xl border border-primary-100 dark:border-primary-900/50">
            <h3 className="mb-4 font-heading text-2xl font-bold text-text-primary md:text-3xl">
              Available on iOS and Android
            </h3>
            <p className="mb-6 text-text-secondary">
              Download now and never miss a prayer
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <StoreButton
                store="AppStore"
                href="https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734"
                width={160}
                height={48}
              />
              <StoreButton
                store="GooglePlay"
                href="https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid"
                width={160}
                height={48}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
