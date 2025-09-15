'use client'

import { Modal } from '@/components/ui/modal'
import { RegistrationForm } from '@/components/forms/registration-form'
import { useState } from 'react'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (data: {
    masjidName: string
    address: string
    email: string
    message: string
  }) => {
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('https://formspree.io/f/mdkanqla', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'Masjid Name': data.masjidName,
          'Address': data.address,
          'Email': data.email,
          'Message': data.message,
        }),
      })

      if (response.ok) {
        onClose()
      } else {
        throw new Error('Failed to submit form')
      }
    } catch {
      setSubmitError('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Your Masjid">
      {submitError && <p className="mb-4 text-sm text-red-500">{submitError}</p>}
      <RegistrationForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </Modal>
  )
} 