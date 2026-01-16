'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, LayoutGrid, RefreshCw, Smartphone, Clock } from 'lucide-react';
import { generateFAQSchema } from '@/lib/faq-schema';

const faqs = [
  {
    question: "How do I force refresh my prayer time widget?",
    answer: "Open the MyLocalMasjid app, pull down on the main screen to refresh, and wait a few seconds for the widget to update."
  },
  {
    question: "How do I fix widget issues on iPhone?",
    answer: "Try these steps: 1) Remove and re-add the widget (long-press widget, tap Remove Widget, then long-press home screen and add it again), 2) Check that Background App Refresh is ON for MyLocalMasjid in Settings → General → Background App Refresh, 3) Check Low Power Mode (it can prevent widget updates), and 4) After app updates, iOS sometimes requires re-adding widgets."
  },
  {
    question: "How do I fix widget issues on Android?",
    answer: "The most common cause is battery optimization. Go to Settings → Apps → MyLocalMasjid → Battery and select Unrestricted or Don't optimize. You can also try: removing and re-adding the widget, checking Data Saver settings to ensure unrestricted data usage, and clearing app cache (Settings → Apps → MyLocalMasjid → Storage → Clear Cache)."
  },
  {
    question: "How far ahead do widgets show prayer times?",
    answer: "Widgets display data from the app's cache: location-based times show approximately 5 weeks of cached data, and masjid-based times show approximately 3 weeks of cached data. Open the app at least once a week to keep widget data fresh."
  },
  {
    question: "What should I do if my widget still won't update?",
    answer: "Try these final steps: 1) Restart your phone to reset widget processes, 2) Update the app to the latest version, and 3) If needed, uninstall and reinstall the app, then re-add the widget."
  }
];

const faqSchema = generateFAQSchema(faqs);

export default function WidgetsNotUpdatingPage() {
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
            Widgets Not Updating
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Troubleshooting guide for iOS and Android widget issues.
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
          {/* Quick Info */}
          <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
            <h2 className="text-lg font-semibold text-black mb-2 flex items-center gap-2">
              <Clock size={20} className="text-primary-600" />
              How Widgets Work
            </h2>
            <p className="text-gray-700">
              Widgets display cached prayer times stored on your device. They update automatically when
              the app refreshes data, but can sometimes get &quot;stuck&quot; due to system restrictions.
            </p>
          </div>

          {/* Force Refresh */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <RefreshCw size={24} className="text-primary-600" />
              Quick Fix: Force Refresh
            </h2>
            <p className="text-gray-700 mb-4">
              The fastest way to update your widget:
            </p>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">1</span>
                <span>Open the MyLocalMasjid app</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">2</span>
                <span>Pull down on the main screen to refresh</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">3</span>
                <span>Wait a few seconds for the widget to update</span>
              </li>
            </ol>
            <p className="text-gray-600 text-sm mt-4">
              If this doesn&apos;t work, try the platform-specific fixes below.
            </p>
          </section>

          {/* iOS Fixes */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <span className="text-2xl">🍎</span>
              iPhone Widget Fixes
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-black mb-2">1. Remove and Re-add Widget</h3>
                <ol className="text-gray-700 text-sm space-y-1">
                  <li>1. Long-press on the widget</li>
                  <li>2. Tap &quot;Remove Widget&quot;</li>
                  <li>3. Long-press on home screen → tap + (top left)</li>
                  <li>4. Search for MyLocalMasjid and add the widget again</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-black mb-2">2. Check Background App Refresh</h3>
                <ol className="text-gray-700 text-sm space-y-1">
                  <li>1. Go to Settings → General → Background App Refresh</li>
                  <li>2. Make sure it&apos;s ON for MyLocalMasjid</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-black mb-2">3. Check Low Power Mode</h3>
                <p className="text-gray-700 text-sm">
                  Low Power Mode can prevent widget updates. Go to Settings → Battery and disable it,
                  or add an exception for MyLocalMasjid.
                </p>
              </div>

              <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-black mb-2">After App Update</h3>
                <p className="text-gray-700 text-sm">
                  iOS sometimes requires re-adding widgets after app updates. If your widget stopped
                  working after an update, remove and re-add it.
                </p>
              </div>
            </div>
          </section>

          {/* Android Fixes */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              Android Widget Fixes
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-black mb-2">1. Disable Battery Optimization</h3>
                <ol className="text-gray-700 text-sm space-y-1">
                  <li>1. Go to Settings → Apps → MyLocalMasjid → Battery</li>
                  <li>2. Select &quot;Unrestricted&quot; or &quot;Don&apos;t optimize&quot;</li>
                </ol>
                <p className="text-gray-600 text-sm mt-2">
                  This is the most common cause of widget issues on Android.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-black mb-2">2. Remove and Re-add Widget</h3>
                <ol className="text-gray-700 text-sm space-y-1">
                  <li>1. Long-press on the widget → Remove</li>
                  <li>2. Long-press on home screen → Widgets</li>
                  <li>3. Find MyLocalMasjid and drag the widget to your home screen</li>
                </ol>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-black mb-2">3. Check Data Saver</h3>
                <p className="text-gray-700 text-sm">
                  Go to Settings → Network → Data Saver and make sure MyLocalMasjid has
                  &quot;Unrestricted data usage&quot; enabled.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-black mb-2">4. Clear App Cache</h3>
                <ol className="text-gray-700 text-sm space-y-1">
                  <li>1. Go to Settings → Apps → MyLocalMasjid → Storage</li>
                  <li>2. Tap &quot;Clear Cache&quot; (not Clear Data)</li>
                  <li>3. Open the app and let it refresh</li>
                </ol>
              </div>
            </div>
          </section>

          {/* How Far Ahead */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <LayoutGrid size={24} className="text-primary-600" />
              How Far Ahead Do Widgets Show?
            </h2>
            <p className="text-gray-700 mb-4">
              Widgets display data from the app&apos;s cache:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Location-based times:</strong> ~5 weeks of cached data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Masjid-based times:</strong> ~3 weeks of cached data</span>
              </li>
            </ul>
            <div className="bg-green-50 p-5 rounded-lg border border-green-100 mt-4">
              <p className="text-gray-700">
                <strong>Tip:</strong> Open the app at least once a week to keep widget data fresh.
                The app automatically fetches new prayer times when opened.
              </p>
            </div>
          </section>

          {/* Still Not Working */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Smartphone size={24} className="text-primary-600" />
              Still Not Working?
            </h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">1</span>
                <span><strong>Restart your phone</strong> - This resets widget processes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">2</span>
                <span><strong>Update the app</strong> - Make sure you have the latest version</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">3</span>
                <span><strong>Reinstall if needed</strong> - Uninstall and reinstall the app, then re-add the widget</span>
              </li>
            </ol>
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
