'use client'

import { memo } from 'react'

interface EditJummahModalProps {
  isOpen: boolean
  editingTime: string | null
  editingTimeHour: string
  editingTimeMinute: string
  editingTimePeriod: 'AM' | 'PM'
  editingJummahName: string
  onHourChange: (hour: string) => void
  onMinuteChange: (minute: string) => void
  onPeriodChange: (period: 'AM' | 'PM') => void
  onNameChange: (name: string) => void
  onSave: () => void
  onCancel: () => void
}

const EditJummahModal = memo(function EditJummahModal({
  isOpen,
  editingTime,
  editingTimeHour,
  editingTimeMinute,
  editingTimePeriod,
  editingJummahName,
  onHourChange,
  onMinuteChange,
  onPeriodChange,
  onNameChange,
  onSave,
  onCancel
}: EditJummahModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Edit Jummah Time</h3>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            Winter Times
          </span>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={editingJummahName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Jummah 1"
              className="w-full border-2 border-primary-300 rounded-xl px-4 py-3 text-lg font-medium focus:border-primary-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <div className="flex items-center space-x-3">
              <select
                value={editingTimeHour}
                onChange={(e) => onHourChange(e.target.value)}
                className="flex-1 border-2 border-primary-300 rounded-xl px-4 py-3 text-lg font-medium focus:border-primary-500 focus:outline-none transition-colors"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              <span className="text-gray-600 font-bold text-xl">:</span>
              <select
                value={editingTimeMinute}
                onChange={(e) => onMinuteChange(e.target.value)}
                className="flex-1 border-2 border-primary-300 rounded-xl px-4 py-3 text-lg font-medium focus:border-primary-500 focus:outline-none transition-colors"
              >
                {Array.from({ length: 60 }, (_, i) => i).map(m => (
                  <option key={m} value={m.toString().padStart(2, '0')}>
                    {m.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
              <select
                value={editingTimePeriod}
                onChange={(e) => onPeriodChange(e.target.value as 'AM' | 'PM')}
                className="flex-1 border-2 border-primary-300 rounded-xl px-4 py-3 text-lg font-medium focus:border-primary-500 focus:outline-none transition-colors"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onSave}
              className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Save Changes
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
    </div>
  )
})

export default EditJummahModal


