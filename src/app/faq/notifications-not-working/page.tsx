'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, BellOff, Settings, Battery, Smartphone, CheckCircle } from 'lucide-react';

export default function NotificationsNotWorkingPage() {
  return (
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
            Prayer Notifications Not Working
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Troubleshooting guide to fix notification issues on iOS and Android.
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
          {/* Quick Checklist */}
          <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
            <h2 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
              <CheckCircle size={20} className="text-primary-600" />
              Quick Checklist
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-600 rounded"></span>
                Notifications enabled in app settings
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-600 rounded"></span>
                Phone notification permission granted
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-600 rounded"></span>
                Do Not Disturb is off (or app is allowed)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-600 rounded"></span>
                Battery optimization disabled for app (Android)
              </li>
            </ul>
          </div>

          {/* Step 1: App Settings */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Bell size={24} className="text-primary-600" />
              Step 1: Check App Settings
            </h2>
            <p className="text-gray-700 mb-4">
              First, make sure notifications are enabled within the MyLocalMasjid app:
            </p>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">1</span>
                <span>Open the app and go to <strong>Settings</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">2</span>
                <span>Tap <strong>Notifications</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">3</span>
                <span>Ensure the <strong>main toggle</strong> is ON</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">4</span>
                <span>Check that individual prayers (Fajr, Dhuhr, etc.) are enabled</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">5</span>
                <span>Use the <strong>Test Notification</strong> button to verify</span>
              </li>
            </ol>
          </section>

          {/* Step 2: Phone Permissions */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Smartphone size={24} className="text-primary-600" />
              Step 2: Check Phone Permissions
            </h2>
            <p className="text-gray-700 mb-4">
              Your phone must allow MyLocalMasjid to send notifications:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
                  <span className="text-xl">🍎</span> iPhone
                </h3>
                <ol className="space-y-2 text-gray-700 text-sm">
                  <li>1. Open <strong>Settings</strong></li>
                  <li>2. Scroll to <strong>MyLocalMasjid</strong></li>
                  <li>3. Tap <strong>Notifications</strong></li>
                  <li>4. Enable <strong>Allow Notifications</strong></li>
                  <li>5. Enable <strong>Time Sensitive</strong> (if available)</li>
                </ol>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
                  <span className="text-xl">🤖</span> Android
                </h3>
                <ol className="space-y-2 text-gray-700 text-sm">
                  <li>1. Open <strong>Settings</strong></li>
                  <li>2. Tap <strong>Apps</strong> → <strong>MyLocalMasjid</strong></li>
                  <li>3. Tap <strong>Notifications</strong></li>
                  <li>4. Enable <strong>All notifications</strong></li>
                  <li>5. Set importance to <strong>High</strong> or <strong>Urgent</strong></li>
                </ol>
              </div>
            </div>
          </section>

          {/* Step 3: Battery Optimization (Android) */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Battery size={24} className="text-primary-600" />
              Step 3: Disable Battery Optimization (Android)
            </h2>
            <div className="bg-amber-50 p-5 rounded-lg border border-amber-200 mb-4">
              <p className="text-gray-700">
                <strong>This is the most common cause of missed notifications on Android.</strong> Battery
                optimization can prevent the app from running in the background.
              </p>
            </div>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">1</span>
                <span>Open <strong>Settings</strong> → <strong>Apps</strong> → <strong>MyLocalMasjid</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">2</span>
                <span>Tap <strong>Battery</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">3</span>
                <span>Select <strong>Unrestricted</strong> or <strong>Don&apos;t optimize</strong></span>
              </li>
            </ol>
            <p className="text-gray-600 text-sm mt-4">
              Note: The exact steps vary by phone manufacturer (Samsung, Xiaomi, OnePlus, etc.).
              Search your phone&apos;s settings for &quot;battery optimization&quot; if you can&apos;t find it.
            </p>
          </section>

          {/* Step 4: Do Not Disturb */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <BellOff size={24} className="text-primary-600" />
              Step 4: Check Do Not Disturb
            </h2>
            <p className="text-gray-700 mb-4">
              Do Not Disturb mode can block notifications, especially during Fajr time:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>iPhone:</strong> Go to Settings → Focus → Do Not Disturb → Apps → Add MyLocalMasjid to allowed apps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Android:</strong> Go to Settings → Sound → Do Not Disturb → Exceptions → Add MyLocalMasjid</span>
              </li>
            </ul>
          </section>

          {/* Step 5: Test */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Settings size={24} className="text-primary-600" />
              Step 5: Test Your Notifications
            </h2>
            <p className="text-gray-700 mb-4">
              After making changes, test that notifications work:
            </p>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">1</span>
                <span>Open the app and go to <strong>Settings → Notifications</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">2</span>
                <span>Tap <strong>Test Notification</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">3</span>
                <span>You should receive a test notification within a few seconds</span>
              </li>
            </ol>
            <div className="bg-green-50 p-5 rounded-lg border border-green-100 mt-4">
              <p className="text-gray-700">
                <strong>Still not working?</strong> Try restarting your phone after making these changes.
                This ensures all settings take effect properly.
              </p>
            </div>
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
  );
}
