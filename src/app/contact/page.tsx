'use client'

import { useState } from 'react'
import { Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Here you would typically send the form data to your backend
    // For now, we'll simulate a successful submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Get in Touch
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Have questions about MyLocalMasjid? We&apos;re here to help. Send us a message and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-x-8 gap-y-12 lg:grid-cols-2">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
          <dl className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <dt className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                <Mail className="h-5 w-5 text-primary-600" />
              </dt>
              <dd>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-gray-600">info@mylocalmasjid.com</p>
              </dd>
            </div>
            <div className="flex items-center gap-4">
              <dt className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                <MapPin className="h-5 w-5 text-primary-600" />
              </dt>
              <dd>
                <p className="font-medium text-gray-900">Location</p>
                <p className="text-gray-600">London, United Kingdom</p>
              </dd>
            </div>
          </dl>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-900">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <p className="text-center text-sm text-green-600">
              Thank you for your message! We&apos;ll get back to you soon.
            </p>
          )}

          {submitStatus === 'error' && (
            <p className="text-center text-sm text-red-600">
              Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </div>
    </main>
  )
} 