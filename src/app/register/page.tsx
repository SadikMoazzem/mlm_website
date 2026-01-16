'use client'

import Script from 'next/script'
import { motion } from 'framer-motion'

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Register Your Masjid
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-lg text-gray-600 dark:text-gray-300"
          >
            Join our platform and enhance your Masjid&apos;s digital presence
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8"
        >
          {/* Use dangerouslySetInnerHTML for the iframe to keep exact attributes */}
          <div 
            dangerouslySetInnerHTML={{
              __html: `
                <iframe
                  id="JotFormIFrame-251052718610045"
                  title="MyLocalMasjid New Masjid Form"
                  onload="window.parent.scrollTo(0,0)"
                  allowtransparency="true"
                  allow="geolocation; microphone; camera; fullscreen"
                  src="https://form.jotform.com/251052718610045"
                  frameborder="0"
                  style="min-width:100%;max-width:100%;height:539px;border:none;"
                  scrolling="no"
                >
                </iframe>
              `
            }}
          />
          
          {/* Use Next.js Script component for scripts */}
          <Script src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js" />
          <Script id="jotform-handler">
            {`window.jotformEmbedHandler && window.jotformEmbedHandler("iframe[id='JotFormIFrame-251052718610045']", "https://form.jotform.com/")`}
          </Script>
        </motion.div>
      </motion.div>
    </main>
  )
} 