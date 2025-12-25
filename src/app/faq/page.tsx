'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HelpCircle, Clock, Bell, Compass, Calendar, Shield, LayoutGrid, ChevronRight } from 'lucide-react';

interface FAQArticle {
  slug: string;
  title: string;
  summary: string;
}

interface FAQCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articles: FAQArticle[];
}

const faqCategories: FAQCategory[] = [
  {
    id: 'prayer-times',
    title: 'Prayer Times',
    description: 'Understanding how prayer times are calculated and displayed',
    icon: <Clock size={24} className="text-primary-600" />,
    articles: [
      {
        slug: 'london-fajr-times',
        title: 'London Fajr Times Explained',
        summary: 'Why Fajr times may differ between masjids in London and how to stay in sync with your community.',
      },
      {
        slug: 'asr-calculation',
        title: 'Asr Time: Standard vs Hanafi',
        summary: 'Understanding the difference between Standard and Hanafi Asr prayer time calculations.',
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Setting up and troubleshooting prayer time notifications',
    icon: <Bell size={24} className="text-primary-600" />,
    articles: [
      {
        slug: 'notifications-not-working',
        title: 'Prayer Notifications Not Working',
        summary: 'Step-by-step troubleshooting guide for iOS and Android notification issues.',
      },
    ],
  },
  {
    id: 'qibla',
    title: 'Qibla Compass',
    description: 'Using and calibrating the Qibla direction finder',
    icon: <Compass size={24} className="text-primary-600" />,
    articles: [
      {
        slug: 'compass-calibration',
        title: 'Compass Calibration Guide',
        summary: 'How to calibrate your compass for accurate Qibla direction and what accuracy levels mean.',
      },
    ],
  },
  {
    id: 'calendar',
    title: 'Islamic Calendar',
    description: 'Hijri dates, fasting days, and Islamic events',
    icon: <Calendar size={24} className="text-primary-600" />,
    articles: [
      {
        slug: 'islamic-calendar',
        title: 'Islamic Calendar & Fasting Days',
        summary: 'When the Islamic day changes, why Hijri dates differ, and recommended Sunnah fasting days.',
      },
    ],
  },
  {
    id: 'widgets',
    title: 'Widgets',
    description: 'Home screen widget setup and troubleshooting',
    icon: <LayoutGrid size={24} className="text-primary-600" />,
    articles: [
      {
        slug: 'widgets-not-updating',
        title: 'Widgets Not Updating',
        summary: 'How to fix prayer times widgets that are stuck or not refreshing on iOS and Android.',
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy & Data',
    description: 'How we protect your privacy and handle your data',
    icon: <Shield size={24} className="text-primary-600" />,
    articles: [
      {
        slug: 'privacy',
        title: 'Privacy & Data Collection',
        summary: 'What data we collect (minimal!), how location works, and your privacy controls.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-50 to-white px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl pt-24 pb-8"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6"
          >
            <HelpCircle size={32} className="text-primary-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-black"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Find answers to common questions about MyLocalMasjid, prayer times, and Islamic practices.
          </motion.p>
        </div>
      </motion.div>

      {/* FAQ Categories */}
      <div className="w-full max-w-4xl pb-16 space-y-8">
        {faqCategories.map((category, categoryIndex) => (
          <motion.section
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + categoryIndex * 0.05 }}
          >
            <div className="flex items-center gap-3 mb-3">
              {category.icon}
              <h2 className="text-xl font-semibold text-black">{category.title}</h2>
            </div>
            <p className="text-gray-600 mb-4 text-sm">{category.description}</p>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {category.articles.map((article, articleIndex) => (
                <Link
                  key={article.slug}
                  href={`/faq/${article.slug}`}
                  className={`flex items-center justify-between p-5 hover:bg-gray-50 transition-colors ${
                    articleIndex !== category.articles.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-black mb-1">{article.title}</h3>
                    <p className="text-gray-600 text-sm">{article.summary}</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 flex-shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* Contact section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-4xl pb-16"
      >
        <div className="bg-primary-50 rounded-xl p-8 text-center border border-primary-100">
          <h2 className="text-xl font-semibold text-black mb-2">Still have questions?</h2>
          <p className="text-gray-600 mb-4">
            We&apos;re here to help. Reach out to us and we&apos;ll get back to you as soon as possible.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
