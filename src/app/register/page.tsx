'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, User, Globe, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const router = useRouter()

  const [formData, setFormData] = useState({
    masjidName: '',
    contactName: '',
    email: '',
    address: '',
    website: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('https://formspree.io/f/mdkanqla', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'Masjid Name': formData.masjidName,
          'Contact Name': formData.contactName,
          'Email': formData.email,
          'Address': formData.address,
          'Website': formData.website,
        }),
      })

      if (response.ok) {
        router.push('/register/success')
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = (fieldName: string) => `
    block w-full rounded-lg border pl-10 px-3 py-3 
    ${focusedField === fieldName 
      ? 'border-primary-500 ring-1 ring-primary-500 shadow-lg' 
      : 'border-gray-300 shadow-sm'
    }
    transition-all duration-200
    focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
    ${formData[fieldName as keyof typeof formData] ? 'bg-white' : 'bg-gray-50'}
  `

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            Register Your Masjid
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-lg text-gray-600"
          >
            Join our platform and enhance your Masjid&apos;s digital presence
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-xl p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700">
                Masjid Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building2 className={`h-5 w-5 transition-colors duration-200 ${
                    focusedField === 'masjidName' ? 'text-primary-500' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  type="text"
                  value={formData.masjidName}
                  onChange={(e) => setFormData({ ...formData, masjidName: e.target.value })}
                  onFocus={() => setFocusedField('masjidName')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('masjidName')}
                  placeholder="Masjid as-Salam"
                  required
                />
                {formData.masjidName && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700">
                Contact Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className={`h-5 w-5 transition-colors duration-200 ${
                    focusedField === 'contactName' ? 'text-primary-500' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  onFocus={() => setFocusedField('contactName')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('contactName')}
                  placeholder="John Doe"
                  required
                />
                {formData.contactName && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative group">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`block w-full rounded-lg border px-3 py-3 
                    ${focusedField === 'email' 
                      ? 'border-primary-500 ring-1 ring-primary-500 shadow-lg' 
                      : 'border-gray-300 shadow-sm'
                    }
                    transition-all duration-200
                    focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                    ${formData.email ? 'bg-white' : 'bg-gray-50'}
                  `}
                  placeholder="john@example.com"
                  required
                />
                {formData.email && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-gray-700">
                Address <span className="text-gray-400">(Optional)</span>
              </label>
              <div className="mt-1 relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPin className={`h-5 w-5 transition-colors duration-200 ${
                    focusedField === 'address' ? 'text-primary-500' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  onFocus={() => setFocusedField('address')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('address')}
                  placeholder="123 Main St, City, Postcode"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <label className="block text-sm font-medium text-gray-700">
                Website <span className="text-gray-400">(Optional)</span>
              </label>
              <div className="mt-1 relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Globe className={`h-5 w-5 transition-colors duration-200 ${
                    focusedField === 'website' ? 'text-primary-500' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  onFocus={() => setFocusedField('website')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('website')}
                  placeholder="https://www.example.com"
                />
              </div>
            </motion.div>

            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-red-50 p-4 text-sm text-red-500"
              >
                {submitError}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full rounded-lg bg-primary-600 py-3 text-white transition-all duration-200 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="flex items-center justify-center">
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Submit Registration
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </main>
  )
} 