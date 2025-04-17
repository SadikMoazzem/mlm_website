'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
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
    { id: "services", title: "OUR SERVICES", number: "1" },
    { id: "ip", title: "INTELLECTUAL PROPERTY RIGHTS", number: "2" },
    { id: "userreps", title: "USER REPRESENTATIONS", number: "3" },
    { id: "userreg", title: "USER REGISTRATION", number: "4" },
    { id: "prohibited", title: "PROHIBITED ACTIVITIES", number: "5" },
    { id: "ugc", title: "USER GENERATED CONTRIBUTIONS", number: "6" },
    { id: "license", title: "CONTRIBUTION LICENCE", number: "7" },
    { id: "mobile", title: "MOBILE APPLICATION LICENCE", number: "8" },
    { id: "sitemanage", title: "SERVICES MANAGEMENT", number: "9" },
    { id: "ppno", title: "PRIVACY POLICY", number: "10" },
    { id: "copyrightno", title: "COPYRIGHT INFRINGEMENTS", number: "11" },
    { id: "terms", title: "TERM AND TERMINATION", number: "12" },
    { id: "contact", title: "CONTACT US", number: "23" },
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
            className="text-4xl font-bold text-black"
          >
            Terms and Conditions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-lg text-gray-600"
          >
            Last updated April 16, 2025
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
          className="md:w-1/4 bg-white rounded-xl shadow-md p-5 md:sticky md:top-24 h-fit"
        >
          <h3 className="text-lg font-semibold text-black mb-4 border-b pb-2">Table of Contents</h3>
          <nav className="space-y-2">
            {tableOfContents.map((item) => (
              <Link 
                key={item.id}
                href={`#${item.id}`}
                className="block text-sm text-gray-700 hover:text-primary-600 transition-colors py-1 pl-2 border-l-2 border-transparent hover:border-primary-600"
              >
                {item.number}. {item.title}
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
          <div className="prose prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-8 prose-h2:pt-6 prose-h2:border-t prose-h2:border-gray-100 prose-h3:text-xl max-w-none prose-a:text-primary-600 text-black prose-p:text-black prose-li:text-black prose-ol:text-black prose-ul:text-black">
            {/* Terms and Conditions Content */}
            <h2 id="agreement">AGREEMENT TO OUR LEGAL TERMS</h2>
            <p>
              We are MyLocalMasjid (&apos;Company&apos;, &apos;we&apos;, &apos;us&apos;, or &apos;our&apos;).
            </p>
            
            <p>
              We operate the website <a href="http://www.mylocalmasjid.com" target="_blank" rel="noopener noreferrer">http://www.mylocalmasjid.com</a> (the &apos;Site&apos;), 
              the mobile application MyLocalMasjid App (the &apos;App&apos;), as well as any other related products and services that refer 
              or link to these legal terms (the &apos;Legal Terms&apos;) (collectively, the &apos;Services&apos;).
            </p>
            
            <p>
              MyLocalMasjid is a comprehensive Masjid management and community engagement platform designed to connect Masajid (mosques) with their local communities. Our platform offers various services including:
            </p>
            <ul>
              <li>A centralized admin portal for Masjid administrators to manage prayer times, announcements, events, and other administrative functions</li>
              <li>Custom-designed, SEO-optimized websites for Masajid to establish their digital presence and provide essential information to their communities</li>
              <li>A mobile application providing prayer times, event information, Masjid finder services, and push notifications</li>
              <li>Digital display solutions for in-Masjid prayer time displays and announcement boards</li>
            </ul>
            <p>
              By using MyLocalMasjid&apos;s services, you agree to these terms and conditions that govern your access to and use of our platform, including our website, mobile applications, admin portals, and any other related services. These terms outline your rights and responsibilities as well as our obligations to you, whether you are a Masjid administrator, community member, or casual visitor.
            </p>
            <p>
              These services are provided to strengthen the bond between Masajid and their communities by making Masjid services more accessible and keeping communities connected and informed about prayer times, events, classes, and important announcements.
            </p>
            
            <p>
              You can contact us by email at <a href="mailto:legal@mylocalmasjid.com">legal@mylocalmasjid.com</a> or by mail to __________, __________, __________.
            </p>
            
            <p>
              These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&apos;you&apos;), and MyLocalMasjid, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
            </p>
            
            <p>
              Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms from time to time. We will alert you about any changes by updating the &apos;Last updated&apos; date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
            </p>
            
            <p>
              The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
            </p>
            
            <p>
              We recommend that you print a copy of these Legal Terms for your records.
            </p>
            
            <h2 id="services">1. OUR SERVICES</h2>
            <p>
              The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
            </p>

            <h2 id="ip">2. INTELLECTUAL PROPERTY RIGHTS</h2>
            <h3>Our intellectual property</h3>
            <p>
              We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &apos;Content&apos;), as well as the trademarks, service marks, and logos contained therein (the &apos;Marks&apos;).
            </p>
            <p>
              Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties around the world.
            </p>
            <p>
              The Content and Marks are provided in or through the Services &apos;AS IS&apos; for your personal, non-commercial use or internal business purpose only.
            </p>
            
            <h3>Your use of our Services</h3>
            <p>
              Subject to your compliance with these Legal Terms, including the &apos;PROHIBITED ACTIVITIES&apos; section below, we grant you a non-exclusive, non-transferable, revocable licence to:
            </p>
            <ul>
              <li>access the Services; and</li>
              <li>download or print a copy of any portion of the Content to which you have properly gained access,</li>
            </ul>
            <p>
              solely for your personal, non-commercial use or internal business purpose.
            </p>
            <p>
              Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
            </p>
            <p>
              If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: legal@mylocalmasjid.com. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.
            </p>
            <p>
              We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
            </p>
            <p>
              Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.
            </p>
            
            <h3>Your submissions and contributions</h3>
            <p>
              Please review this section and the &apos;PROHIBITED ACTIVITIES&apos; section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.
            </p>
            <p>
              <strong>Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services (&apos;Submissions&apos;), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
            </p>
            <p>
              <strong>Contributions:</strong> The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, &apos;Contributions&apos;). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:
            </p>
            <ul>
              <li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</li>
              <li>You are the creator and owner of or have the necessary licences, rights, consents, releases, and permissions to use and to authorise us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.</li>
              <li>You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms.</li>
              <li>Your Contributions are not false, inaccurate, or misleading.</li>
              <li>Your Contributions are not unsolicited or unauthorised advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</li>
              <li>Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libellous, slanderous, or otherwise objectionable (as determined by us).</li>
              <li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
              <li>Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.</li>
              <li>Your Contributions do not violate any applicable law, regulation, or rule.</li>
              <li>Your Contributions do not violate the privacy or publicity rights of any third party.</li>
              <li>Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.</li>
              <li>Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.</li>
              <li>Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation.</li>
            </ul>
            
            <p>
              Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services.
            </p>

            <h2 id="license">7. CONTRIBUTION LICENCE</h2>
            <p>
              By posting your Contributions to any part of the Services, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and licence to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorise sublicences of the foregoing. The use and distribution may occur in any media formats and through any media channels.
            </p>
            <p>
              This licence will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.
            </p>
            <p>
              We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
            </p>
            <p>
              We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorise any Contributions to place them in more appropriate locations on the Services; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.
            </p>

            <h2 id="mobile">8. MOBILE APPLICATION LICENCE</h2>
            <h3>Use Licence</h3>
            <p>
              If you access the Services via the App, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the App on wireless electronic devices owned or controlled by you, and to access and use the App on such devices strictly in accordance with the terms and conditions of this mobile application licence contained in these Legal Terms. You shall not: (1) except as permitted by applicable law, decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the App; (2) make any modification, adaptation, improvement, enhancement, translation, or derivative work from the App; (3) violate any applicable laws, rules, or regulations in connection with your access or use of the App; (4) remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) posted by us or the licensors of the App; (5) use the App for any revenue-generating endeavour, commercial enterprise, or other purpose for which it is not designed or intended; (6) make the App available over a network or other environment permitting access or use by multiple devices or users at the same time; (7) use the App for creating a product, service, or software that is, directly or indirectly, competitive with or in any way a substitute for the App; (8) use the App to send automated queries to any website or to send any unsolicited commercial email; or (9) use any proprietary information or any of our interfaces or our other intellectual property in the design, development, manufacture, licensing, or distribution of any applications, accessories, or devices for use with the App.
            </p>

            <h3>Apple and Android Devices</h3>
            <p>
              The following terms apply when you use the App obtained from either the Apple Store or Google Play (each an &apos;App Distributor&apos;) to access the Services: (1) the licence granted to you for our App is limited to a non-transferable licence to use the application on a device that utilises the Apple iOS or Android operating systems, as applicable, and in accordance with the usage rules set forth in the applicable App Distributor&apos;s terms of service; (2) we are responsible for providing any maintenance and support services with respect to the App as specified in the terms and conditions of this mobile application licence contained in these Legal Terms or as otherwise required under applicable law, and you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support services with respect to the App; (3) in the event of any failure of the App to conform to any applicable warranty, you may notify the applicable App Distributor, and the App Distributor, in accordance with its terms and policies, may refund the purchase price, if any, paid for the App, and to the maximum extent permitted by applicable law, the App Distributor will have no other warranty obligation whatsoever with respect to the App; (4) you represent and warrant that (i) you are not located in a country that is subject to a US government embargo, or that has been designated by the US government as a &apos;terrorist supporting&apos; country and (ii) you are not listed on any US government list of prohibited or restricted parties; (5) you must comply with applicable third-party terms of agreement when using the App, e.g. if you have a VoIP application, then you must not be in violation of their wireless data service agreement when using the App; and (6) you acknowledge and agree that the App Distributors are third-party beneficiaries of the terms and conditions in this mobile application licence contained in these Legal Terms, and that each App Distributor will have the right (and will be deemed to have accepted the right) to enforce the terms and conditions in this mobile application licence contained in these Legal Terms against you as a third-party beneficiary thereof.
            </p>

            <h2 id="sitemanage">9. SERVICES MANAGEMENT</h2>
            <p>
              We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.
            </p>

            <h2 id="ppno">10. PRIVACY POLICY</h2>
            <p>
              We care about data privacy and security. By using the Services, you agree to be bound by our Privacy Policy posted on the Services, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the United Kingdom. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United Kingdom, then through your continued use of the Services, you are transferring your data to the United Kingdom, and you expressly consent to have your data transferred to and processed in the United Kingdom.
            </p>

            <h2 id="copyrightno">11. COPYRIGHT INFRINGEMENTS</h2>
            <p>
              We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately notify us using the contact information provided below (a &apos;Notification&apos;). A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification. Please be advised that pursuant to applicable law you may be held liable for damages if you make material misrepresentations in a Notification. Thus, if you are not sure that material located on or linked to by the Services infringes your copyright, you should consider first contacting an attorney.
            </p>

            <h2 id="terms">12. TERM AND TERMINATION</h2>
            <p>
              These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
            </p>
            <p>
              If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
            </p>

            <h2 id="contact">23. CONTACT US</h2>
            <p>
              In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
            </p>
            <p>
              <strong>MyLocalMasjid</strong><br />
              <a href="mailto:legal@mylocalmasjid.com">legal@mylocalmasjid.com</a>
            </p>
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