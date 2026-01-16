'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Twitter, Instagram, Mail, MapPin } from 'lucide-react'

// Custom TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

const navigation = {
  forYou: [
    { name: 'Find Masjids', href: '/masjids' },
    { name: 'Prayer Times', href: '/prayer-times' },
    { name: 'Download App', href: '/download' },
    { name: 'Masjid Directory', href: '/masjid-directory' },
    { name: 'FAQ', href: '/faq' },
  ],
  forMasjids: [
    { name: 'Get Started', href: '/register' },
    { name: 'Admin Portal', href: 'https://admin.mylocalmasjid.com' },
    { name: 'For Masjids', href: '/for-masjids' },
    { name: 'Our Journey', href: '/journey' },
    { name: 'Pricing', href: '/pricing' },
  ],
  company: [
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  social: [
    { name: 'Twitter', href: 'https://twitter.com/mlmasjid', icon: Twitter },
    { name: 'Instagram', href: 'https://www.instagram.com/mylocalmasjidapp', icon: Instagram },
    { name: 'TikTok', href: 'https://www.tiktok.com/@mylocalmasjid', icon: TikTokIcon },
  ],
  contact: [
    { name: 'info@mylocalmasjid.com', href: 'mailto:info@mylocalmasjid.com', icon: Mail },
    { name: 'London, United Kingdom', href: '#', icon: MapPin },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto max-w-8xl px-6 py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="Mylocalmasjid"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                My<span className="text-primary-600 dark:text-primary-400">Local</span>Masjid
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Est. 2020</p>
            <p className="mt-4 max-w-md text-gray-600 dark:text-gray-300">
              Empowering Masjids with modern technology to better serve their communities
              and enhance the spiritual experience.
            </p>
          </div>

          {/* Navigation - Updated to 3 columns */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:col-span-3">
            {/* Column 1: For You */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">For You</h3>
              <ul className="mt-4 space-y-3">
                {navigation.forYou.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-base text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: For Masjids */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">For Masjids</h3>
              <ul className="mt-4 space-y-3">
                {navigation.forMasjids.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-base text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Company</h3>
              <ul className="mt-4 space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-base text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-100 pt-8 dark:border-gray-800">
          <div className="flex flex-col-reverse items-center justify-between gap-8 lg:flex-row">
            {/* Copyright & Company Number - moved to appear first in flex-col-reverse for small screens */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 lg:text-left">
              <p>&copy; {new Date().getFullYear()} MyLocalMasjid. All rights reserved.</p>
              <p className="mt-1">Company Number: 16453040</p>
            </div>

            {/* Contact Info & Social Media Icons */}
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
              {/* Contact Info */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:justify-start">
                {navigation.contact.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center justify-center space-x-5">
                {navigation.social.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-primary-600 transition-colors dark:text-gray-500 dark:hover:text-primary-400"
                    aria-label={item.name}
                  >
                    <item.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 