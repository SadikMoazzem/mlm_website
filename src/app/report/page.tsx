'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

// Add type declaration for window.jotformEmbedHandler
declare global {
  interface Window {
    jotformEmbedHandler: (selector: string, domain: string) => void;
  }
}

export default function ReportPage() {
  useEffect(() => {
    // Load JotForm script after component mounts
    const script = document.createElement('script')
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js'
    script.async = true
    script.onload = () => {
      // Run the JotForm handler script after the library loads
      window.jotformEmbedHandler(
        "iframe[id='JotFormIFrame-251053531218346']", 
        "https://form.jotform.com/"
      )
    }
    document.body.appendChild(script)

    return () => {
      // Clean up script on unmount
      document.body.removeChild(script)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl pt-24 pb-16"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            Report an Issue
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-lg text-gray-600"
          >
            Help us improve MyLocalMasjid by reporting any bugs or issues you encounter
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-xl p-6 md:p-8"
        >
          <iframe
            id="JotFormIFrame-251053531218346"
            title="MyLocalMasjid Report Bug Form"
            onLoad={() => window.parent.scrollTo(0, 0)}
            allowTransparency={true}
            allow="geolocation; microphone; camera; fullscreen"
            src="https://form.jotform.com/251053531218346"
            frameBorder="0"
            style={{ 
              minWidth: '100%',
              maxWidth: '100%',
              height: '539px',
              border: 'none'
            }}
            scrolling="no"
          />
        </motion.div>
      </motion.div>
    </main>
  )
} 