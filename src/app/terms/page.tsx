'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp, Shield, User, AlertTriangle, FileText, Smartphone, MapPin, Clock, Copyright, Lock, Scale, RefreshCw, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function TermsPage() {
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
    { id: "about", title: "ABOUT US", number: "1", icon: <Shield size={16} className="mr-1" /> },
    { id: "eligibility", title: "USER ELIGIBILITY AND RESPONSIBILITIES", number: "2", icon: <User size={16} className="mr-1" /> },
    { id: "admin", title: "MASJID ADMIN ACCOUNTS", number: "3", icon: <User size={16} className="mr-1" /> },
    { id: "prohibited", title: "PROHIBITED ACTIVITIES", number: "4", icon: <AlertTriangle size={16} className="mr-1" /> },
    { id: "content", title: "CONTENT OWNERSHIP AND USE", number: "5", icon: <FileText size={16} className="mr-1" /> },
    { id: "ugc", title: "USER GENERATED CONTRIBUTIONS", number: "6", icon: <FileText size={16} className="mr-1" /> },
    { id: "mobile", title: "MOBILE APPLICATION LICENSE", number: "7", icon: <Smartphone size={16} className="mr-1" /> },
    { id: "location", title: "LOCATION DATA USAGE", number: "8", icon: <MapPin size={16} className="mr-1" /> },
    { id: "availability", title: "SERVICE AVAILABILITY", number: "9", icon: <Clock size={16} className="mr-1" /> },
    { id: "copyright", title: "COPYRIGHT INFRINGEMENTS", number: "10", icon: <Copyright size={16} className="mr-1" /> },
    { id: "privacy", title: "PRIVACY POLICY", number: "11", icon: <Lock size={16} className="mr-1" /> },
    { id: "termination", title: "TERMINATION", number: "12", icon: <AlertTriangle size={16} className="mr-1" /> },
    { id: "liability", title: "LIMITATION OF LIABILITY", number: "13", icon: <AlertTriangle size={16} className="mr-1" /> },
    { id: "jurisdiction", title: "LEGAL JURISDICTION", number: "14", icon: <Scale size={16} className="mr-1" /> },
    { id: "updates", title: "UPDATES TO THESE TERMS", number: "15", icon: <RefreshCw size={16} className="mr-1" /> },
    { id: "contact", title: "CONTACT US", number: "16", icon: <Mail size={16} className="mr-1" /> },
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
            Terms and Conditions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-lg text-gray-600"
          >
            Effective Date: April 18, 2025
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

        {/* Terms and Conditions Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="md:w-3/4 bg-white rounded-xl shadow-xl p-6 md:p-8"
        >
          <div className="prose prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-16 prose-h2:pt-8 prose-h2:border-t prose-h2:border-gray-100 prose-h3:text-xl max-w-none prose-a:text-primary-600 text-black prose-p:text-black prose-li:text-black prose-ol:text-black prose-ul:text-black space-y-8">
            {/* Terms and Conditions Content */}
            <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100">
              <p className="text-lg mb-0">
                Welcome to <strong>MyLocalMasjid</strong>. These Terms and Conditions govern your access to and use of our services, including our website, admin portal, and mobile application. By using any part of our services, you agree to these terms.
              </p>
            </div>
            
            <h2 id="about" className="flex items-center flex-wrap text-3xl font-semibold text-black">
              <Shield className="mr-3 text-primary-600" size={32} />
              <span>1. ABOUT US</span>
            </h2>
            <p className="text-lg">
              MyLocalMasjid is a UK-based platform designed to support Muslim communities by making local Masjid data accessible, including prayer times, events, and contact information.
            </p>
            
            <p>
              Our service includes:
            </p>
            
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>A <strong>public-facing website</strong> for viewing prayer times and Masjid details</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>A <strong>Masjid admin portal</strong> to manage individual Masjid information</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>A <strong>mobile app</strong> for users to locate nearby Masajid and prayer times</span>
              </li>
            </ul>
            
            <h2 id="eligibility" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <User className="mr-3 text-primary-600" size={32} />
              <span>2. USER ELIGIBILITY AND RESPONSIBILITIES</span>
            </h2>
            <p>
              You agree that:
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>You are at least 18 years old or are using the service under adult supervision</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>All data you provide is accurate and up-to-date</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>You will not use the platform for any unlawful or harmful purpose</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>You will respect the rights of others and avoid submitting false, harmful, or abusive content</span>
              </li>
            </ul>
            
            <h2 id="admin" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <User className="mr-3 text-primary-600" size={32} />
              <span>3. MASJID ADMIN ACCOUNTS</span>
            </h2>
            <p>
              If you register a Masjid via our admin portal, you:
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Must provide a valid name and email address</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Are responsible for safeguarding your login credentials</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Agree not to impersonate others or misuse the platform</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Understand your Masjid&apos;s public data will be visible to users via the app and website</span>
              </li>
            </ul>
            
            <h2 id="prohibited" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <AlertTriangle className="mr-3 text-orange-500" size={32} />
              <span>4. PROHIBITED ACTIVITIES</span>
            </h2>
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
              <p>
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="space-y-5 list-none pl-0 md:pl-6">
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span>Using the services for any illegal purpose or in violation of any local, national, or international law</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span>Violating the rights of others, including privacy rights or intellectual property rights</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span>Uploading or transmitting viruses, malware, or any other type of malicious code</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span>Impersonating another person or entity, or falsely stating or misrepresenting your affiliation</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span>Interfering with or disrupting the services, servers, or networks connected to the services</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span>Attempting to bypass any measures designed to prevent or restrict access to the services</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span>Engaging in any automated use of the system, such as scraping or data mining</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span>Posting any content that is obscene, lewd, lascivious, defamatory, or otherwise objectionable</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span>Harassing, intimidating, or threatening other users</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span>Using the services in any way that could disable, overburden, damage, or impair the site</span>
                </li>
              </ul>
              <p className="mt-6 font-semibold">
                Violation of these prohibitions may result in termination of your access to the services.
              </p>
            </div>
            
            <h2 id="content" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <FileText className="mr-3 text-primary-600" size={32} />
              <span>5. CONTENT OWNERSHIP AND USE</span>
            </h2>
            <p>
              All intellectual property—website content, design, branding, and source code—is owned by MyLocalMasjid or its licensors.
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>You may <strong>view and use</strong> the content for personal, non-commercial purposes</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>You may <strong>not copy, redistribute, modify</strong>, or commercially exploit any part of the platform without permission</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>You retain rights to any content you submit but grant us a license to display it publicly via our services</span>
              </li>
            </ul>
            
            <h2 id="ugc" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <FileText className="mr-3 text-primary-600" size={32} />
              <span>6. USER GENERATED CONTRIBUTIONS</span>
            </h2>
            <p>
              When you submit content to our platform (such as Masjid information), you represent and warrant that:
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>You are the creator and owner of the content or have necessary permissions to submit it</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Your content does not violate the rights of any third party</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Your content is accurate and not misleading</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Your content is not obscene, lewd, violent, harassing, or otherwise objectionable</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Your content does not violate any applicable laws or regulations</span>
              </li>
            </ul>
            <p>
              By submitting content, you grant us a non-exclusive, royalty-free license to use, modify, reproduce, and display that content in connection with our services. We may edit, remove, or refuse to post any user content at our discretion.
            </p>
            
            <h2 id="mobile" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <Smartphone className="mr-3 text-primary-600" size={32} />
              <span>7. MOBILE APPLICATION LICENSE</span>
            </h2>
            <p>
              If you use our mobile application, we grant you a limited, non-transferable, revocable license to install and use the app on devices you own or control. You may not:
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Decompile, reverse engineer, or attempt to access the source code</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Modify or create derivative works based on the app</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Remove copyright or proprietary notices</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Use the app for any commercial purpose not expressly permitted</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Use the app in any way that violates these terms</span>
              </li>
            </ul>
            <div className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-100">
              <p className="text-sm mb-0">
                Additional terms may apply when you download the app from Apple App Store or Google Play Store. Those platforms are not sponsors of our app and have no responsibility for its content or functionality.
              </p>
            </div>
            
            <h2 id="location" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <MapPin className="mr-3 text-primary-600" size={32} />
              <span>8. LOCATION DATA USAGE</span>
            </h2>
            <p>
              Our app may request access to your device&apos;s location in order to show nearby Masajid. Location data is:
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-green-500 rounded-full flex-shrink-0"></span>
                <span>Used in real-time only</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-green-500 rounded-full flex-shrink-0"></span>
                <span>Not stored, tracked, or transmitted</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-green-500 rounded-full flex-shrink-0"></span>
                <span>Not associated with your identity</span>
              </li>
            </ul>
            
            <h2 id="availability" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <Clock className="mr-3 text-primary-600" size={32} />
              <span>9. SERVICE AVAILABILITY</span>
            </h2>
            <p>
              We strive to maintain uninterrupted service, but:
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Access may occasionally be suspended for maintenance or updates</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>We may update, modify, or remove features at our discretion without notice</span>
              </li>
            </ul>
            
            <h2 id="copyright" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <Copyright className="mr-3 text-primary-600" size={32} />
              <span>10. COPYRIGHT INFRINGEMENTS</span>
            </h2>
            <p>
              We respect intellectual property rights. If you believe content on our platform infringes your copyright, please contact us with the following information:
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>An electronic or physical signature of the copyright owner or authorized representative</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Identification of the copyrighted work claimed to be infringed</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Description of where the infringing material is located on our services</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>Your contact information</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>A statement that you have a good faith belief that the disputed use is not authorized</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-primary-600 rounded-full flex-shrink-0"></span>
                <span>A statement that your notification is accurate and that you are authorized to act on behalf of the copyright owner</span>
              </li>
            </ul>
            
            <h2 id="privacy" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <Lock className="mr-3 text-primary-600" size={32} />
              <span>11. PRIVACY POLICY</span>
            </h2>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <p className="mb-0">
                Your privacy is important to us. Our <Link href="/privacy" className="text-primary-600 hover:underline font-medium">Privacy Policy</Link> explains how we collect, use, and protect your personal information. By using our services, you agree to our Privacy Policy.
              </p>
            </div>
            
            <h2 id="termination" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <AlertTriangle className="mr-3 text-orange-500" size={32} />
              <span>12. TERMINATION</span>
            </h2>
            <p>
              We may suspend or terminate your access if:
            </p>
            <ul className="space-y-5 list-none pl-0 md:pl-6">
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                <span>You breach these Terms</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                <span>You misuse the service</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                <span>Continued access is no longer viable for technical or legal reasons</span>
              </li>
            </ul>
            <p>
              You may also request account termination at any time.
            </p>
            
            <h2 id="liability" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <AlertTriangle className="mr-3 text-orange-500" size={32} />
              <span>13. LIMITATION OF LIABILITY</span>
            </h2>
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
              <p>
                To the extent permitted by law, MyLocalMasjid is not liable for:
              </p>
              <ul className="space-y-5 list-none pl-0 md:pl-6">
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span>Losses or damages arising from your use of or inability to use the service</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span>Any user-generated content or data inaccuracies</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block mr-4 mt-1 min-w-[20px] h-5 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span>Any indirect, incidental, or consequential damages</span>
                </li>
              </ul>
              <p className="mt-6 font-semibold">
                Use of the platform is <strong>at your own risk</strong>.
              </p>
            </div>
            
            <h2 id="jurisdiction" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <Scale className="mr-3 text-primary-600" size={32} />
              <span>14. LEGAL JURISDICTION</span>
            </h2>
            <p>
              These Terms are governed by the laws of <strong>England and Wales</strong>. Any disputes will be handled exclusively in the courts of this jurisdiction.
            </p>
            
            <h2 id="updates" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <RefreshCw className="mr-3 text-primary-600" size={32} />
              <span>15. UPDATES TO THESE TERMS</span>
            </h2>
            <p>
              We may update these Terms from time to time. Significant changes will be posted on our website. Continued use of the service after updates constitutes your agreement to the new terms.
            </p>
            
            <h2 id="contact" className="flex items-center flex-wrap text-3xl font-semibold text-black mt-12">
              <Mail className="mr-3 text-primary-600" size={32} />
              <span>16. CONTACT US</span>
            </h2>
            <p>
              For any questions about these Terms, reach out to:
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
              <p className="mb-2">
                <strong>Website:</strong> <a href="https://www.mylocalmasjid.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">https://www.mylocalmasjid.com</a>
              </p>
            </div>
            
            <div className="mt-12 p-6 bg-primary-50 rounded-lg border border-primary-100 text-center">
              <p className="italic text-lg mb-0">
                Thank you for using MyLocalMasjid. We&apos;re honoured to serve your local community.
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