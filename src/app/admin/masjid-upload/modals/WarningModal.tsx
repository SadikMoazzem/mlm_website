'use client'

import { memo } from 'react'

interface WarningModalProps {
  isOpen: boolean
  onContinue: () => void
  onCancel: () => void
}

const WarningModal = memo(function WarningModal({
  isOpen,
  onContinue,
  onCancel
}: WarningModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Incomplete Submission</h3>
        </div>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-700">
            Please fill out at least one section: prayer time files, Jummah times, or facilities information.
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={onContinue}
            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Continue Anyway
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
})

export default WarningModal


