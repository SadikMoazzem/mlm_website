'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const navigation = {
  solutions: [
    { name: 'Admin Portal', href: '/solutions/admin' },
    { name: 'Masjid Website', href: '/solutions/website' },
    { name: 'Mobile App', href: '/solutions/app' },
  ],
  company: [
    { name: 'Our Journey', href: '/journey' },
    { name: 'Pricing', href: '/pricing' },
  ],
  support: [
    { name: 'Contact', href: '/contact' },
    { name: 'Help Center', href: '/help' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
  ],
  contact: [
    { name: 'info@mylocalmasjid.com', href: 'mailto:info@mylocalmasjid.com', icon: Mail },
    { name: '+1 (555) 123-4567', href: 'tel:+15551234567', icon: Phone },
    { name: 'London, United Kingdom', href: '#', icon: MapPin },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container mx-auto max-w-8xl px-6 py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-4">
              <img
                src="/logo.png"
                alt="Mylocalmasjid"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-gray-900">
                My<span className="text-primary-600">Local</span>Masjid
              </span>
            </Link>
            <p className="mt-4 max-w-md text-gray-600">
              Empowering Masjids with modern technology to better serve their communities
              and enhance the spiritual experience.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Solutions</h3>
              <ul className="mt-4 space-y-3">
                {navigation.solutions.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-base text-gray-600 transition-colors hover:text-primary-600">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-gray-500">Support</h3>
              <ul className="mt-4 space-y-3">
                {navigation.support.map((item) => (
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

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-6">
              {navigation.contact.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} MyLocalMasjid. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
} 