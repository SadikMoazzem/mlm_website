'use client'

import { memo } from 'react'

interface EmailModalProps {
  isOpen: boolean
  masjidName: string
  masjidId: string
  masjidAddress: string
  onOpenEmail: () => void
  onCancel: () => void
}

const EmailModal = memo(function EmailModal({
  isOpen,
  masjidName,
  masjidId,
  masjidAddress,
  onOpenEmail,
  onCancel
}: EmailModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Email Upload</h3>
        </div>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-700">
            Please attach the files or zip files to the email. Jazakallah Khair.
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={onOpenEmail}
            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Open Email
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
})

export default EmailModal

