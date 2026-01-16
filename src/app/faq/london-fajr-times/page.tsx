'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, ExternalLink, Sun, Moon, Building2 } from 'lucide-react';
import { generateFAQSchema } from '@/lib/faq-schema';

const faqs = [
  {
    question: "Why do Fajr times differ in London?",
    answer: "Fajr begins at true dawn when light first appears on the horizon. Different calculation methods use different angles to determine when this occurs, leading to variations of up to 20-30 minutes. In London, many masjids follow the times set by Hizbul Ulama, which are based on careful observation and scholarly consensus. These may differ from times calculated by apps using standard astronomical formulas."
  },
  {
    question: "What is the London Unified Prayer Timetable?",
    answer: "The London Unified Prayer Timetable is a common timetable agreed upon by several mosques and Islamic centres in London for prayer start times. This ensures Muslims across London can pray together at consistent times. Fajr is based on Hizbul Ulama's work reflecting local observation, Sunrise is from the Nautical Almanac Office with 3 minutes taken off for safety, and other prayers are standardised across participating masjids."
  },
  {
    question: "Should I follow my app or my local masjid for Fajr time?",
    answer: "We recommend following your local masjid. Unity in prayer is important in Islam. When your community prays together at the same time, you strengthen the bonds of brotherhood and sisterhood. The scholarly difference in calculating Fajr is valid - both times fall within acceptable Islamic parameters - but choosing to pray with your community demonstrates the importance of jamaa'ah (congregational prayer) and unity."
  },
  {
    question: "How does MyLocalMasjid help with London Fajr times?",
    answer: "When you're in London around Fajr time, our app will prompt you with the option to switch to East London Mosque times, which follow the London Unified Timetable. This means your Fajr time will match most London masjids, you can wake up knowing you're praying with your community, and your fasting times will align with local announcements."
  }
];

const faqSchema = generateFAQSchema(faqs);

export default function LondonFajrTimesPage() {
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
        {/* Back link */}
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
            London Fajr Times Explained
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Understanding why Fajr times may differ in London and how to pray together as one community.
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
              Many London masjids use the <strong>London Unified Prayer Timetable</strong> which shows Fajr slightly earlier
              than calculation-based apps. To pray together as one community, we recommend following your local masjid&apos;s times.
            </p>
          </div>

          {/* Why the difference? */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Sun size={24} className="text-primary-600" />
              Why Do Fajr Times Differ?
            </h2>
            <p className="text-gray-700 mb-4">
              Fajr begins at true dawn (when light first appears on the horizon). Different calculation methods
              use different angles to determine when this occurs, leading to variations of up to 20-30 minutes.
            </p>
            <p className="text-gray-700">
              In London, many masjids follow the times set by <strong>Hizbul Ulama</strong>, which are based on
              careful observation and scholarly consensus. These may differ from times calculated by apps using
              standard astronomical formulas.
            </p>
          </section>

          {/* London Unified Timetable */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Building2 size={24} className="text-primary-600" />
              The London Unified Prayer Timetable
            </h2>
            <p className="text-gray-700 mb-4">
              Several mosques and Islamic centres in London agreed to a common timetable for prayer start times,
              known as the <strong>London Unified Prayer Timetable</strong>. This ensures Muslims across London
              can pray together at consistent times.
            </p>
            <p className="text-gray-700 mb-4">
              Key features of this timetable:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Fajr:</strong> Based on the work of Hizbul Ulama, reflecting local observation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Sunrise:</strong> From the Nautical Almanac Office, with 3 minutes taken off for safety</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Other prayers:</strong> Standardised across participating masjids</span>
              </li>
            </ul>
          </section>

          {/* Community Unity */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Users size={24} className="text-primary-600" />
              Praying Together as One Ummah
            </h2>
            <p className="text-gray-700 mb-4">
              When your app shows a different Fajr time than your local masjid, it can be confusing. Should you
              follow the app or the masjid?
            </p>
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-4">
              <p className="text-gray-800 font-medium mb-2">Our recommendation:</p>
              <p className="text-gray-700">
                <strong>Follow your local masjid.</strong> Unity in prayer is important in Islam. When your community
                prays together at the same time, you strengthen the bonds of brotherhood and sisterhood.
              </p>
            </div>
            <p className="text-gray-700">
              The scholarly difference in calculating Fajr is valid - both times fall within acceptable Islamic
              parameters. But choosing to pray with your community demonstrates the importance of <em>jamaa&apos;ah</em>
              (congregational prayer) and unity.
            </p>
          </section>

          {/* What we do */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Moon size={24} className="text-primary-600" />
              How MyLocalMasjid Helps
            </h2>
            <p className="text-gray-700 mb-4">
              When you&apos;re in London around Fajr time, our app will prompt you with the option to switch to
              <strong> East London Mosque times</strong>, which follow the London Unified Timetable.
            </p>
            <p className="text-gray-700 mb-4">
              This means:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Your Fajr time will match most London masjids</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>You can wake up knowing you&apos;re praying with your community</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Your fasting times will align with local announcements</span>
              </li>
            </ul>
          </section>

          {/* Learn more */}
          <section className="border-t pt-8">
            <h2 className="text-xl font-semibold text-black mb-4">Learn More</h2>
            <p className="text-gray-700 mb-4">
              For a detailed explanation of how prayer times are calculated, including the Islamic calendar and
              the methodology used, see the excellent resource from East London Mosque:
            </p>
            <a
              href="https://www.eastlondonmosque.org.uk/prayer-times-and-calendar-explained"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              Prayer Times and Calendar Explained - East London Mosque
              <ExternalLink size={16} />
            </a>
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
