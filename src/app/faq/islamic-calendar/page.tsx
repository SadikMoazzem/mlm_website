'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Moon, Sunrise, Star } from 'lucide-react';
import { generateFAQSchema } from '@/lib/faq-schema';

const faqs = [
  {
    question: "When does the Islamic day change?",
    answer: "The Islamic day begins at Maghrib (sunset), not at midnight. This means Friday (Jumu'ah) begins on Thursday at Maghrib, the 15th of Sha'ban begins on the evening of the 14th, and Ramadan begins when the moon is sighted after Maghrib. Our app updates the Hijri date after Maghrib to reflect this Islamic tradition."
  },
  {
    question: "Why do Hijri dates differ between different sources?",
    answer: "Hijri dates may differ because of moon sighting versus calculation methods, regional differences (Saudi Arabia may be on a different date than Morocco or Pakistan), and different calculation algorithms. You can adjust the Hijri date by +1 or -1 day in Settings → Prayer Times → Hijri Date Adjustment to match your local community."
  },
  {
    question: "What are the recommended fasting days in Islam?",
    answer: "Recommended fasting days include Monday and Thursday (the Prophet used to fast these days), Ayyam al-Bid (13th, 14th, 15th of each Islamic month), Day of Arafah (9th Dhu al-Hijjah for non-pilgrims), Ashura (9th, 10th, 11th Muharram), and Six Days of Shawwal after Ramadan."
  },
  {
    question: "What are the major Islamic events highlighted in the calendar?",
    answer: "The app highlights Eid al-Fitr (1st Shawwal - fasting prohibited), Eid al-Adha (10th Dhu al-Hijjah - fasting prohibited on this day and 3 days after), and Day of Ashura (10th Muharram - highly recommended day to fast)."
  }
];

const faqSchema = generateFAQSchema(faqs);

export default function IslamicCalendarPage() {
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
            Islamic Calendar & Fasting Days
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Understanding the Hijri calendar, when the Islamic day changes, and recommended fasting days.
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
          {/* When Does the Day Change */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Sunrise size={24} className="text-primary-600" />
              When Does the Islamic Day Change?
            </h2>
            <div className="bg-primary-50 p-5 rounded-lg border border-primary-100 mb-4">
              <p className="text-gray-700">
                The Islamic day begins at <strong>Maghrib (sunset)</strong>, not at midnight.
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              This means:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Friday (Jumu&apos;ah) begins on Thursday at Maghrib</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>The 15th of Sha&apos;ban begins on the evening of the 14th</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Ramadan begins when the moon is sighted after Maghrib</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              Our app updates the Hijri date after Maghrib to reflect this Islamic tradition.
            </p>
          </section>

          {/* Why Dates May Differ */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Moon size={24} className="text-primary-600" />
              Why Hijri Dates May Differ
            </h2>
            <p className="text-gray-700 mb-4">
              You might notice the Hijri date in our app differs by a day from other sources. This happens because:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Moon sighting vs. calculation:</strong> Some follow local moon sighting, others use astronomical calculation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Regional differences:</strong> Saudi Arabia may be on a different date than Morocco or Pakistan</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Calculation methods:</strong> Different algorithms produce slightly different results</span>
              </li>
            </ul>
            <div className="bg-amber-50 p-5 rounded-lg border border-amber-200 mt-4">
              <p className="text-gray-700">
                <strong>Tip:</strong> You can adjust the Hijri date by +1 or -1 day in Settings → Prayer Times → Hijri Date Adjustment
                to match your local community.
              </p>
            </div>
          </section>

          {/* Sunnah Fasting Days */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Star size={24} className="text-primary-600" />
              Recommended Fasting Days
            </h2>
            <p className="text-gray-700 mb-4">
              The app highlights days when fasting is recommended (Sunnah):
            </p>

            <div className="space-y-4">
              <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                <h3 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Monday & Thursday
                </h3>
                <p className="text-gray-700 text-sm">
                  The Prophet (peace be upon him) used to fast on Mondays and Thursdays. He said: &quot;Deeds are
                  presented on Monday and Thursday, and I love that my deeds be presented while I am fasting.&quot;
                </p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                <h3 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Ayyam al-Bid (White Days)
                </h3>
                <p className="text-gray-700 text-sm">
                  The 13th, 14th, and 15th of each Islamic month. Called &quot;white days&quot; because of the full moon.
                  The Prophet (peace be upon him) encouraged fasting these three days each month.
                </p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                <h3 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Day of Arafah (9th Dhu al-Hijjah)
                </h3>
                <p className="text-gray-700 text-sm">
                  For those not performing Hajj. The Prophet (peace be upon him) said fasting this day expiates
                  sins of the previous year and the coming year.
                </p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                <h3 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Ashura (9th, 10th, 11th Muharram)
                </h3>
                <p className="text-gray-700 text-sm">
                  The 10th of Muharram (Ashura) is highly recommended. Adding the 9th or 11th is also Sunnah
                  to differ from other practices.
                </p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                <h3 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Six Days of Shawwal
                </h3>
                <p className="text-gray-700 text-sm">
                  Fasting six days in Shawwal after Ramadan. The Prophet (peace be upon him) said: &quot;Whoever
                  fasts Ramadan and follows it with six days of Shawwal, it is as if they fasted the whole year.&quot;
                </p>
              </div>
            </div>
          </section>

          {/* Major Islamic Events */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
              <Calendar size={24} className="text-primary-600" />
              Major Islamic Events
            </h2>
            <p className="text-gray-700 mb-4">
              The app highlights these major dates with a gold color:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="inline-block w-3 h-3 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong>Eid al-Fitr</strong> (1st Shawwal)
                  <p className="text-gray-600 text-sm">End of Ramadan. Fasting is prohibited on this day.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-3 h-3 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong>Eid al-Adha</strong> (10th Dhu al-Hijjah)
                  <p className="text-gray-600 text-sm">Festival of Sacrifice. Fasting is prohibited on this day and the 3 days after.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-3 h-3 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong>Day of Ashura</strong> (10th Muharram)
                  <p className="text-gray-600 text-sm">Highly recommended day to fast.</p>
                </div>
              </li>
            </ul>
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
