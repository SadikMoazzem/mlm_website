'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Mail, MapPin } from 'lucide-react'

const navigation = {
  solutions: [
    { name: 'Admin Portal', href: '/solutions/admin' },
    { name: 'Masjid Website', href: '/solutions/website' },
    { name: 'Mobile App', href: '/solutions/app' },
  ],
  company: [
    { name: 'Our Journey', href: '/journey' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Register Your Masjid', href: '/register' },
  ],
  support: [
    { name: 'Contact', href: '/contact' },
    { name: 'Report an Issue', href: '/report' },
    { name: 'Submit Prayer Times', href: '/add-prayer-times' },
  ],
  legal: [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
  ],
  contact: [
    { name: 'info@mylocalmasjid.com', href: 'mailto:info@mylocalmasjid.com', icon: Mail },
    { name: 'London, United Kingdom', href: '#', icon: MapPin },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
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
              <span className="text-2xl font-bold text-gray-900">
                My<span className="text-primary-600">Local</span>Masjid
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">Est. 2020</p>
            <p className="mt-4 max-w-md text-gray-600">
              Empowering Masjids with modern technology to better serve their communities
              and enhance the spiritual experience.
            </p>
          </div>

          {/* Navigation - Updated to 3 columns */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:col-span-3">
            {/* Column 1: Solutions */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Solutions</h3>
              <ul className="mt-4 space-y-3">
                {navigation.solutions.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-sm leading-6 text-gray-600 hover:text-primary-600"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Company */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Company</h3>
              <ul className="mt-4 space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-base text-gray-600 transition-colors hover:text-primary-600">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Support & Legal */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Support</h3>
              <ul className="mt-4 space-y-3">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-base text-gray-600 transition-colors hover:text-primary-600">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-gray-500">Legal</h3>
              <ul className="mt-4 space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-base text-gray-600 transition-colors hover:text-primary-600">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Legal links will be removed from here */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <div className="flex flex-col-reverse items-center justify-between gap-8 lg:flex-row">
            {/* Copyright & Company Number - moved to appear first in flex-col-reverse for small screens */}
            <div className="text-center text-sm text-gray-500 lg:text-left">
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
                    className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600"
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
                    className="text-gray-400 hover:text-primary-600 transition-colors"
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