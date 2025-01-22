'use client'

import { useState } from 'react'
import { FaMosque, FaMapMarkerAlt, FaEnvelope, FaCommentAlt, FaSpinner } from 'react-icons/fa'

interface RegistrationFormProps {
  onSubmit: (data: {
    masjidName: string
    address: string
    email: string
    message: string
  }) => void
  isSubmitting?: boolean
}

export function RegistrationForm({ onSubmit, isSubmitting = false }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    masjidName: '',
    address: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({
    masjidName: '',
    address: '',
    email: '',
  })

  const validateForm = () => {
    const newErrors = {
      masjidName: '',
      address: '',
      email: '',
    }

    if (!formData.masjidName) {
      newErrors.masjidName = 'Masjid name is required'
    }

    if (!formData.address) {
      newErrors.address = 'Address is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="relative block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <FaMosque className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Masjid Name"
            value={formData.masjidName}
            onChange={(e) => setFormData({ ...formData, masjidName: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-base placeholder-gray-500 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            disabled={isSubmitting}
          />
        </label>
        {errors.masjidName && <p className="mt-2 text-sm text-red-500">{errors.masjidName}</p>}
      </div>

      <div>
        <label className="relative block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <FaMapMarkerAlt className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-base placeholder-gray-500 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            disabled={isSubmitting}
          />
        </label>
        {errors.address && <p className="mt-2 text-sm text-red-500">{errors.address}</p>}
      </div>

      <div>
        <label className="relative block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <FaEnvelope className="h-5 w-5" />
          </span>
          <input
            type="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-base placeholder-gray-500 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            disabled={isSubmitting}
          />
        </label>
        {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label className="relative block">
          <span className="absolute top-3 left-0 flex items-center pl-3 text-gray-500">
            <FaCommentAlt className="h-5 w-5" />
          </span>
          <textarea
            placeholder="Message (Optional)"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-base placeholder-gray-500 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            rows={3}
            disabled={isSubmitting}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-lg bg-primary-500 px-4 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 sm:text-lg"
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Registration'
        )}
      </button>
    </form>
  )
} 