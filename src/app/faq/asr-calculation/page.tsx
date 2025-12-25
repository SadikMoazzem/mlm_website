'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Sun, BookOpen } from 'lucide-react';

export default function AsrCalculationPage() {
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
            Asr Time: Standard vs Hanafi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Understanding why Asr prayer time differs between calculation methods.
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
          {/* Quick Summary */}
          <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
            <h2 className="text-lg font-semibold text-black mb-2 flex items-center gap-2">
              <Clock size={20} className="text-primary-600" />
              Quick Summary
            </h2>
            <p className="text-gray-700">
              <strong>Standard (Shafi&apos;i/Maliki/Hanbali):</strong> Asr begins when an object&apos;s shadow equals its length.<br />
              <strong>Hanafi:</strong> Asr begins when an object&apos;s shadow is twice its length (about 45-60 minutes later).
            </p>
          </div>

          {/* The Difference */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Sun size={24} className="text-primary-600" />
              Why Are There Two Methods?
            </h2>
            <p className="text-gray-700 mb-4">
              Islamic scholars have different interpretations of when Asr prayer time begins, based on hadith
              about the Prophet&apos;s (peace be upon him) prayer times. Both interpretations are valid and have
              strong scholarly backing.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-black mb-2">Standard Method</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Used by: Shafi&apos;i, Maliki, and Hanbali schools
                </p>
                <p className="text-gray-700 text-sm">
                  Asr begins when the shadow of an object equals its own length (plus the shadow at noon).
                </p>
              </div>
              <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
                <h3 className="font-semibold text-black mb-2">Hanafi Method</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Used by: Hanafi school
                </p>
                <p className="text-gray-700 text-sm">
                  Asr begins when the shadow of an object is twice its length (plus the shadow at noon).
                </p>
              </div>
            </div>
          </section>

          {/* Practical Difference */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Clock size={24} className="text-primary-600" />
              What&apos;s the Practical Difference?
            </h2>
            <p className="text-gray-700 mb-4">
              The Hanafi Asr time is typically <strong>45 to 60 minutes later</strong> than the Standard time,
              depending on your location and the time of year.
            </p>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <p className="text-gray-700 mb-2"><strong>Example (London, Summer):</strong></p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Standard Asr: 5:15 PM</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Hanafi Asr: 6:05 PM</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Which to Choose */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <BookOpen size={24} className="text-primary-600" />
              Which Should I Choose?
            </h2>
            <p className="text-gray-700 mb-4">
              Choose the method that matches your <em>madhab</em> (school of thought) or what your local masjid follows:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>If you follow the <strong>Hanafi</strong> school, select &quot;Hanafi&quot; in settings</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>If you follow <strong>Shafi&apos;i, Maliki, or Hanbali</strong>, select &quot;Standard&quot;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>If unsure, check what your local masjid uses and follow that</span>
              </li>
            </ul>
            <div className="bg-green-50 p-5 rounded-lg border border-green-100 mt-4">
              <p className="text-gray-700">
                <strong>Tip:</strong> Both times are valid for prayer. The difference is about when Asr <em>begins</em>.
                Praying anytime within the Asr window (until Maghrib) is valid regardless of which method you follow.
              </p>
            </div>
          </section>

          {/* How to Change */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">How to Change in the App</h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">1</span>
                <span>Go to <strong>Settings</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">2</span>
                <span>Tap <strong>Prayer Times</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium flex-shrink-0">3</span>
                <span>Find <strong>Asr Calculation</strong> and select Standard or Hanafi</span>
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
  );
}
