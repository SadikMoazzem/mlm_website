'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUp, Shield, Lock, Users, Share2, Cookie, Server, UserCheck, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PrivacyPage() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Generate table of contents from headings
  const tableOfContents = [
    { id: "introduction", title: "INTRODUCTION", number: "1", icon: <Shield size={16} className="mr-1" /> },
    { id: "collect", title: "WHAT INFORMATION DO WE COLLECT?", number: "2", icon: <Lock size={16} className="mr-1" /> },
    { id: "use", title: "HOW DO WE USE YOUR INFORMATION?", number: "3", icon: <Users size={16} className="mr-1" /> },
    { id: "share", title: "DO WE SHARE YOUR INFORMATION?", number: "4", icon: <Share2 size={16} className="mr-1" /> },
    { id: "cookies", title: "DO WE USE COOKIES OR TRACKING TECHNOLOGIES?", number: "5", icon: <Cookie size={16} className="mr-1" /> },
    { id: "protection", title: "HOW IS YOUR DATA PROTECTED?", number: "6", icon: <Server size={16} className="mr-1" /> },
    { id: "feedback", title: "FEEDBACK SUBMISSIONS", number: "7", icon: <Users size={16} className="mr-1" /> },
    { id: "rights", title: "YOUR RIGHTS", number: "8", icon: <UserCheck size={16} className="mr-1" /> },
    { id: "contact", title: "CONTACT US", number: "9", icon: <Mail size={16} className="mr-1" /> },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl pt-24 pb-8"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-black"
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-lg text-gray-600"
          >
            Last updated September 10, 2025
          </motion.p>
        </div>
      </motion.div>

      {/* Main content with sidebar layout */}
      <div className="w-full max-w-6xl pb-16 flex flex-col md:flex-row gap-8">
        {/* Sidebar - Table of Contents */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="md:w-1/4 bg-white rounded-xl shadow-lg p-5 md:sticky md:top-24 h-fit"
        >
          <h3 className="text-lg font-semibold text-black mb-4 border-b pb-2">Table of Contents</h3>
          <nav className="space-y-1">
            {tableOfContents.map((item) => (
              <Link 
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center text-sm text-gray-700 hover:text-primary-600 transition-colors py-2 pl-2 border-l-2 border-transparent hover:border-primary-600 hover:bg-gray-50 rounded"
              >
                <span className="flex items-center w-6 h-6 justify-center bg-gray-100 rounded-full mr-2 text-xs font-medium">{item.number}</span>
                <span className="flex items-center">{item.icon} {item.title}</span>
              </Link>
            ))}
          </nav>
        </motion.aside>

        {/* Privacy Policy Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="md:w-3/4 bg-white rounded-xl shadow-xl p-6 md:p-8"
        >
          <div className="prose prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-16 prose-h2:pt-8 prose-h2:border-t prose-h2:border-gray-100 prose-h3:text-xl max-w-none prose-a:text-primary-600 text-black prose-p:text-black prose-li:text-black prose-ol:text-black prose-ul:text-black space-y-8">
            {/* Privacy Policy Content */}
            <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100">
              <p className="text-lg mb-0">
                At <strong>MyLocalMasjid</strong>, we are a privacy-first organisation. We collect minimal data and prioritize your privacy at every step.
              </p>
            </div>
            
            <h2 id="introduction" className="flex items-center flex-wrap text-3xl font-semibold text-black">
              <Shield className="mr-3 text-primary-600" size={32} />
              <span>1. INTRODUCTION</span>
            </h2>
            <p>
              At <strong>MyLocalMasjid</strong>, we are a <strong>privacy-first organisation</strong>. 
              We believe that your personal information should only be collected when absolutely necessary, 
              and only for clear, respectful purposes. We do <strong>not collect unnecessary data</strong>, 
              we do <strong>not track your activity</strong>, and we will <strong>never share or sell your information</strong>.
            </p>
            
            <p>
              This Privacy Policy explains how we handle any information you provide when using our services:
            </p>
            
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span><strong>MyLocalMasjid Website</strong> (for viewing prayer times)</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span><strong>Masjid Admin Portal</strong> (for masjids to manage their own data)</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span><strong>MyLocalMasjid App</strong> (for users to find masjids and prayer times)</span>
              </li>
            </ul>
            
            <p>
              By using our Services, you agree to the terms outlined below.
            </p>
            
            <h2 id="collect" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <Lock className="mr-3 text-primary-600" size={32} />
              <span>2. WHAT INFORMATION DO WE COLLECT?</span>
            </h2>
            
            <h3 className="text-2xl font-semibold mt-8">Website</h3>
            <p>
              We do <strong>not collect any personal information</strong> through our website.
            </p>
            
            <h3 className="text-2xl font-semibold mt-8">Masjid Admin Portal</h3>
            <p>
              We collect the following information when a masjid administrator creates an account:
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Name</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Email address</span>
              </li>
            </ul>
            <p>
              This information is used solely for account creation, support, and administrative purposes.
            </p>
            
            <h3 className="text-2xl font-semibold mt-8">MyLocalMasjid App</h3>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>The app requests access to your <strong>device&apos;s location</strong> in order to show nearby masjids and prayer times.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Location data is sent to our API to find nearby masjids. This data is used in real-time for this purpose only and is <strong>never stored or logged</strong> on our servers.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span><strong>Anonymous analytics:</strong> We collect anonymized usage data to understand masjid involvement and improve the app experience. This data is completely anonymous, cannot be linked to any individual user, and you can opt-out at any time in the app settings.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span><strong>Feedback device identifier:</strong> When you submit feedback about masjid data, we generate a random, anonymous device ID stored locally on your device. This ID is used solely to prevent duplicate feedback submissions and cannot be linked to your personal identity.</span>
              </li>
            </ul>
            
            <h2 id="use" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <Users className="mr-3 text-primary-600" size={32} />
              <span>3. HOW DO WE USE YOUR INFORMATION?</span>
            </h2>
            <p>
              We use the limited information we collect to:
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Enable masjid administrators to manage and update their own data.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Provide users with accurate, localised prayer time information.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Analyze anonymous usage patterns to understand masjid involvement and improve the app experience.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Manage feedback submissions to prevent duplicate entries and maintain data quality.</span>
              </li>
            </ul>
            
            <p>
              We do <strong>not</strong> use your data for advertising, commercial profiling, or any tracking that can identify individual users.
            </p>
            
            <h2 id="share" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <Share2 className="mr-3 text-primary-600" size={32} />
              <span>4. DO WE SHARE YOUR INFORMATION?</span>
            </h2>
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <p className="font-medium">
                We do <strong>not share</strong>, sell, or disclose your information with any third parties.
              </p>
              
              <p className="mt-4">
                There are:
              </p>
              <ul className="space-y-5 list-none pl-0 md:pl-6">
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span><strong>No third-party advertisers</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span>Optional, anonymized app analytics to help us improve user experience. You can opt-out of this in the app settings.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span><strong>No data monetisation partners</strong></span>
                </li>
              </ul>
            </div>
            
            <h2 id="cookies" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <Cookie className="mr-3 text-primary-600" size={32} />
              <span>5. DO WE USE COOKIES OR TRACKING TECHNOLOGIES?</span>
            </h2>
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <p className="text-lg font-medium mb-0">
                No. We do <strong>not use cookies</strong>, tracking pixels, or any form of tracking technologies on our website, app, or admin portal.
              </p>
            </div>
            
            <h2 id="protection" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <Server className="mr-3 text-primary-600" size={32} />
              <span>6. HOW IS YOUR DATA PROTECTED?</span>
            </h2>
            <p>
              We take data protection seriously. Any data we store (admin name and email for administrators, plus anonymous device identifiers for feedback management) is handled with standard security measures to prevent unauthorised access.
            </p>
            
            <h3 className="text-2xl font-semibold mt-8">Data Quality & Accuracy</h3>
            <p>
              We are committed to providing the highest quality masjid data possible. We achieve this through:
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span><strong>Direct masjid partnerships:</strong> We work directly with masjid administrators to ensure accurate and up-to-date information.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span><strong>Automated data gathering:</strong> We use automated processes to collect masjid information directly from users and masjids to ensure comprehensive coverage.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span><strong>Verification processes:</strong> All masjid data goes through our quality assurance processes to ensure accuracy.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span><strong>Community feedback:</strong> We encourage users to report any inaccuracies so we can maintain the best possible data quality.</span>
              </li>
            </ul>
            
            <h3 className="text-2xl font-semibold mt-8">Legal Protections</h3>
            <p>
              We operate without warrant protections and are committed to transparency. In the unlikely event of legal requests for data:
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>We collect minimal data, so there is very little information that could be requested.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Any anonymous analytics data cannot be linked to individual users.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>We do not store location data, so user location information is not available.</span>
              </li>
            </ul>
            
            <h2 id="feedback" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <Users className="mr-3 text-primary-600" size={32} />
              <span>7. FEEDBACK SUBMISSIONS</span>
            </h2>
            <p>
              Our app includes a feedback feature that allows users to confirm or suggest edits to masjid information to help us maintain accurate data.
            </p>
            
            <h3 className="text-2xl font-semibold mt-8">Device Identification for Feedback Management</h3>
            <p>
              To prevent multiple feedback submissions from the same user for the same masjid, we generate a unique device identifier when you first submit feedback through the app.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-4">
              <p className="font-medium mb-4">
                Important details about this identifier:
              </p>
              <ul className="space-y-3 list-none pl-0">
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span>It is a <strong>random, unique ID</strong> generated specifically for feedback management</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span>It is <strong>stored locally on your device</strong> and sent with feedback requests</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span>It is <strong>not linked to any personal information</strong> and cannot be used to identify you</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span>It is used <strong>only to manage feedback submissions</strong> and prevent duplicate entries</span>
                </li>
              </ul>
            </div>
            
            <p>
              This system helps us maintain data quality while ensuring your privacy is protected. The identifier cannot be traced back to you personally and serves solely as a technical tool to improve our feedback system.
            </p>
            
            <h2 id="rights" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <UserCheck className="mr-3 text-primary-600" size={32} />
              <span>8. YOUR RIGHTS</span>
            </h2>
            <p>
              If you are a registered masjid admin, you have the right to:
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Access the data we hold about you</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Request correction of inaccurate data</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Request deletion of your personal information</span>
              </li>
            </ul>
            
            <p>
              To exercise your rights, please contact us at: <a href="mailto:privacy@mylocalmasjid.com" className="text-primary-600 hover:underline font-medium">privacy@mylocalmasjid.com</a>
            </p>
            
            <h2 id="contact" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <Mail className="mr-3 text-primary-600" size={32} />
              <span>9. CONTACT US</span>
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-4">
              <p className="mb-2">
                <strong>Email:</strong> <a href="mailto:privacy@mylocalmasjid.com" className="text-primary-600 hover:underline">privacy@mylocalmasjid.com</a>
              </p>
              <p className="mb-2">
                <strong>Business Name:</strong> MyLocalMasjid
              </p>
              <p className="mb-2">
                <strong>Based in:</strong> United Kingdom
              </p>
            </div>
            
            <div className="mt-12 p-6 bg-primary-50 rounded-lg border border-primary-100 text-center">
              <p className="italic text-lg mb-0">
                Thank you for trusting MyLocalMasjid with your data. We&apos;re committed to respecting your privacy.
              </p>
            </div>
          </div>
        </motion.article>
      </div>

      {/* Back to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-all z-50"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </main>
  )
} 