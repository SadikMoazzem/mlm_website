'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import StoreButton from '@/components/elements/StoreButton'

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const masjidName = searchParams.get('masjid') || 'your masjid'

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50/30">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Jazakallah Khair
          </h1>
          
            <p className="text-xl text-gray-700 mb-4">
              Your submission for <span className="text-primary-600 font-semibold">{masjidName}</span> has been received successfully!
          </p>
          
            <p className="text-lg text-gray-600">
            May Allah reward you for helping your community.
          </p>
        </div>

        {/* Solutions Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Our Solutions
            </h2>
            <p className="text-gray-600 mb-6">
              Here is what we can offer you for free. Feel free to{' '}
              <a 
                href="mailto:salaam@mylocalmasjid.com"
                className="underline hover:text-primary-600 transition-colors"
              >
                message us
              </a>
              {' '}if you have any questions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Admin Dashboard - First */}
              <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-primary-100/50 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Admin Dashboard</h3>
                <p className="text-gray-600 mb-3 text-sm">Manage your masjid's information and events</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• One place for everything</li>
                  <li>• Easy to use</li>
                  <li>• Update once, syncs everywhere</li>
                </ul>
                <a
                  href="/solutions/admin"
                  className="inline-block w-full bg-white text-primary-600 border-2 border-primary-300 hover:border-primary-500 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                >
                  Learn more
                </a>
              </div>

              {/* Website Solution - Second */}
              <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-primary-100/50 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Website Solution</h3>
                <p className="text-gray-600 mb-3 text-sm">Professional website for your masjid</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Free</li>
                  <li>• Fast & simple</li>
                  <li>• <span className="font-bold">Easy integration with your current website</span></li>
              </ul>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://masjid-demo.mylocalmasjid.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                  >
                    View Demo
                  </a>
                  <a
                    href="/solutions/website"
                    className="inline-block w-full bg-white text-primary-600 border-2 border-primary-300 hover:border-primary-500 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                  >
                    View how we can integrate
                  </a>
                </div>
            </div>

              {/* Masjid Screen - Third */}
              <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-primary-100/50 hover:shadow-2xl transition-all duration-300 relative">
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-300">
                    Coming soon
                  </span>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Masjid Screen</h3>
                <p className="text-gray-600 mb-3 text-sm">Digital display solution for your masjid</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Display prayer times & announcements</li>
                  <li>• Works offline (no internet needed)</li>
                  <li>• Free & easy setup</li>
              </ul>
                <a
                  href="/solutions/admin"
                  className="inline-block w-full bg-white text-primary-600 border-2 border-primary-300 hover:border-primary-500 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                >
                  Learn more
                </a>
            </div>

              {/* Mobile App - Last */}
              <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-primary-100/50 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile App</h3>
                <p className="text-gray-600 mb-3 text-sm">Nearby masjids and prayer times, wherever you are</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Privacy focused</li>
                  <li>• Connect with your local masjid</li>
                  <li>• Find nearby masjids & local prayer times</li>
              </ul>
                <div className="flex flex-col gap-2">
                  <StoreButton 
                    store="AppStore" 
                    href="https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734"
                    width={120}
                    height={36}
                  />
                  <StoreButton 
                    store="GooglePlay" 
                    href="https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid"
                    width={120}
                    height={36}
                  />
                </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
            <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-primary-100/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Enhance Your Masjid's Digital Presence?
            </h3>
              <p className="text-gray-700 mb-6 text-lg">
              Contact us to learn more about our solutions
            </p>
              <a 
                href="mailto:salaam@mylocalmasjid.com"
                className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
