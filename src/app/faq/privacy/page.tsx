'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, MapPin, BarChart3, Database, Lock } from 'lucide-react';
import { generateFAQSchema } from '@/lib/faq-schema';

const faqs = [
  {
    question: "Is my location stored by MyLocalMasjid?",
    answer: "No. Your location is never stored on our servers. Location is used only on your device to calculate prayer times and find nearby masjids. When finding nearby masjids, we send coordinates to our API but don't log or store them. Background location (if enabled) stays on your device for widgets and notifications. You can use manual location or disable location entirely."
  },
  {
    question: "What analytics does MyLocalMasjid collect?",
    answer: "We collect optional, anonymous usage analytics to improve the app, including which screens are viewed, app crashes and errors, and general usage patterns. We do NOT collect your location, personal information, IP addresses, or device identifiers. You can disable analytics anytime in Settings → Privacy → Anonymous Usage Analytics, and the app works exactly the same with analytics off."
  },
  {
    question: "What data is stored on my phone by the app?",
    answer: "The app stores data locally on your device for offline access: prayer times (3-5 weeks of cached times), settings (your preferences like calculation method and notifications), masjid data (your selected home masjid and cached nearby masjids), and location (last known location if auto location enabled). All this data stays on your device and is never sent to our servers."
  },
  {
    question: "Do I need to create an account to use MyLocalMasjid?",
    answer: "No. The app works fully without any account or login. We don't collect your name, email, phone number, or any personal information. You're completely anonymous to us."
  },
  {
    question: "What is the feedback ID used for?",
    answer: "When you submit feedback about masjid data, we generate a random ID stored on your device to help prevent duplicate submissions. It's a random string with no personal information, cannot be used to identify you or track you, and is only used for feedback management."
  }
];

const faqSchema = generateFAQSchema(faqs);

export default function PrivacyFAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-50 to-white px-4">
        {/* Header */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl pt-24 pb-8"
      >
        <Link
          href="/faq"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to FAQ
        </Link>

        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-black mb-4"
          >
            Privacy & Data Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            How we protect your privacy and what data the app uses.
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-3xl pb-16"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-8">
          {/* Privacy First */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h2 className="text-lg font-semibold text-black mb-2 flex items-center gap-2">
              <Shield size={20} className="text-green-600" />
              Privacy-First Design
            </h2>
            <p className="text-gray-700">
              MyLocalMasjid is built with privacy as a core principle. We collect <strong>minimal data</strong>,
              store nothing on our servers that can identify you, and give you full control over what you share.
            </p>
          </div>

          {/* Location Data */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <MapPin size={24} className="text-primary-600" />
              Is My Location Stored?
            </h2>
            <div className="bg-primary-50 p-5 rounded-lg border border-primary-100 mb-4">
              <p className="text-gray-700 font-medium">
                No. Your location is <strong>never stored</strong> on our servers.
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              Here&apos;s how location works in the app:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Location is used <strong>only on your device</strong> to calculate prayer times and find nearby masjids</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>When finding nearby masjids, we send coordinates to our API but <strong>don&apos;t log or store them</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Background location (if enabled) stays on your device for widgets and notifications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>You can use manual location or disable location entirely</span>
              </li>
            </ul>
          </section>

          {/* Analytics */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <BarChart3 size={24} className="text-primary-600" />
              What Analytics Do You Collect?
            </h2>
            <p className="text-gray-700 mb-4">
              We collect <strong>optional, anonymous</strong> usage analytics to improve the app:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-semibold text-green-800 mb-2">What we collect</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Which screens are viewed</li>
                  <li>• App crashes and errors</li>
                  <li>• General usage patterns</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h3 className="font-semibold text-red-800 mb-2">What we DON&apos;T collect</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Your location</li>
                  <li>• Personal information</li>
                  <li>• IP addresses</li>
                  <li>• Device identifiers</li>
                </ul>
              </div>
            </div>
            <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
              <p className="text-gray-700">
                <strong>You can disable analytics</strong> anytime in Settings → Privacy → Anonymous Usage Analytics.
                The app works exactly the same with analytics off.
              </p>
            </div>
          </section>

          {/* Data Stored Locally */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Database size={24} className="text-primary-600" />
              What Data Is Stored on My Phone?
            </h2>
            <p className="text-gray-700 mb-4">
              The app stores data locally on your device for offline access:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Prayer times:</strong> 3-5 weeks of cached times for offline use</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Settings:</strong> Your preferences (calculation method, notifications, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Masjid data:</strong> Your selected home masjid and cached nearby masjids</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Location:</strong> Last known location (if auto location enabled)</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              All this data stays on your device and is never sent to our servers.
            </p>
          </section>

          {/* No Account Needed */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Lock size={24} className="text-primary-600" />
              Do I Need an Account?
            </h2>
            <div className="bg-green-50 p-5 rounded-lg border border-green-100">
              <p className="text-gray-700 font-medium mb-2">
                No. The app works fully without any account or login.
              </p>
              <p className="text-gray-700">
                We don&apos;t collect your name, email, phone number, or any personal information.
                You&apos;re completely anonymous to us.
              </p>
            </div>
          </section>

          {/* Feedback ID */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">What About the Feedback ID?</h2>
            <p className="text-gray-700 mb-4">
              When you submit feedback about masjid data, we generate a random ID stored on your device.
              This helps us prevent duplicate submissions.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>It&apos;s a random string with no personal information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>It cannot be used to identify you or track you</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>It&apos;s only used for feedback management</span>
              </li>
            </ul>
          </section>

          {/* Learn More */}
          <section className="border-t pt-6">
            <p className="text-gray-700">
              For complete details, read our{' '}
              <Link href="/privacy" className="text-primary-600 hover:underline font-medium">
                full Privacy Policy
              </Link>.
            </p>
          </section>
        </div>

        {/* Back to FAQ */}
        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to FAQ
          </Link>
        </div>
      </motion.article>
    </main>
    </>
  );
}
