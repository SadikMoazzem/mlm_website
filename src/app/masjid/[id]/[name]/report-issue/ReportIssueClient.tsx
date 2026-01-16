'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  X,
  MapPinOff,
  MapPin,
  Clock,
  Calendar,
  ChevronRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react'
import { MasjidData } from '@/types/api'

interface ReportIssueClientProps {
  masjid: MasjidData
}

type IssueType = 'doesnt_exist' | 'wrong_location' | 'wrong_prayer_times' | 'wrong_jummah_times'

interface IssueCardProps {
  id: IssueType
  title: string
  description: string
  icon: React.ReactNode
  iconBgColor: string
  onClick: () => void
}

function IssueCard({ title, description, icon, iconBgColor, onClick }: IssueCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:border-red-200 hover:shadow-md transition-all text-left group"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center`}>
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>

        {/* Chevron */}
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-red-500 transition-colors" />
      </div>
    </button>
  )
}

export function ReportIssueClient({ masjid }: ReportIssueClientProps) {
  const router = useRouter()
  const [currentIssue, setCurrentIssue] = useState<IssueType | null>(null)

  // Build masjid URL slug
  const masjidSlug = encodeURIComponent(masjid.name.toLowerCase().replace(/\s+/g, '-'))
  const masjidUrl = `/masjid/${masjid.id}/${masjidSlug}`

  const handleIssueClick = (issue: IssueType) => {
    setCurrentIssue(issue)
  }

  const handleBack = () => {
    if (currentIssue) {
      setCurrentIssue(null)
    } else {
      router.back()
    }
  }

  // Render issue-specific form
  const renderIssueForm = () => {
    switch (currentIssue) {
      case 'doesnt_exist':
        return <DoesntExistForm masjidName={masjid.name} masjidId={masjid.id} onBack={() => setCurrentIssue(null)} />
      case 'wrong_location':
        return <WrongLocationForm masjidName={masjid.name} masjidId={masjid.id} onBack={() => setCurrentIssue(null)} />
      case 'wrong_prayer_times':
        return <WrongPrayerTimesForm masjidName={masjid.name} masjidId={masjid.id} onBack={() => setCurrentIssue(null)} />
      case 'wrong_jummah_times':
        return <WrongJummahTimesForm masjidName={masjid.name} masjidId={masjid.id} onBack={() => setCurrentIssue(null)} />
      default:
        return null
    }
  }

  // If viewing an issue form
  if (currentIssue) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex-1 flex flex-col md:items-center md:justify-center md:py-8">
          <div className="flex-1 md:flex-initial w-full md:max-w-xl md:min-h-[600px] bg-white md:rounded-xl md:shadow-lg flex flex-col overflow-hidden">
            {renderIssueForm()}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Desktop: Centered panel layout */}
      <div className="flex-1 flex flex-col md:items-center md:justify-center md:py-8">
        {/* Panel container */}
        <div className="flex-1 md:flex-initial w-full md:max-w-xl md:min-h-[600px] bg-white md:rounded-xl md:shadow-lg flex flex-col overflow-hidden">

          {/* Exit link - desktop only */}
          <div className="hidden md:flex justify-end px-4 pt-3">
            <Link
              href={masjidUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Exit</span>
            </Link>
          </div>

          {/* Mobile header */}
          <header className="md:hidden bg-red-500 text-white px-4 py-4 flex items-center justify-between shadow-sm">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 hover:bg-red-600 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-semibold text-lg">Report Issue</h1>
            <div className="w-10" />
          </header>

          {/* Desktop header */}
          <div className="hidden md:block px-6 pt-2 pb-4">
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={handleBack}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Report Issue</h1>
            </div>
            <p className="text-gray-600 text-sm">{masjid.name}</p>
          </div>

          {/* Main content */}
          <div className="flex-1 px-4 md:px-6 py-6">
            {/* Intro text */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2 md:hidden">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-gray-900">
                  What&apos;s wrong?
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                Select the type of issue you&apos;d like to report. Your feedback helps us maintain accurate information.
              </p>
            </div>

            {/* Issue cards */}
            <div className="space-y-3">
              <IssueCard
                id="doesnt_exist"
                title="Masjid Doesn't Exist"
                description="This masjid has closed or never existed at this location"
                icon={<MapPinOff className="w-6 h-6 text-red-500" />}
                iconBgColor="bg-red-50"
                onClick={() => handleIssueClick('doesnt_exist')}
              />

              <IssueCard
                id="wrong_location"
                title="Wrong Location"
                description="The map marker is in the wrong place"
                icon={<MapPin className="w-6 h-6 text-orange-500" />}
                iconBgColor="bg-orange-50"
                onClick={() => handleIssueClick('wrong_location')}
              />

              <IssueCard
                id="wrong_prayer_times"
                title="Wrong Prayer Times"
                description="The daily prayer times shown are incorrect"
                icon={<Clock className="w-6 h-6 text-amber-500" />}
                iconBgColor="bg-amber-50"
                onClick={() => handleIssueClick('wrong_prayer_times')}
              />

              <IssueCard
                id="wrong_jummah_times"
                title="Wrong Jummah Times"
                description="The Friday prayer times shown are incorrect"
                icon={<Calendar className="w-6 h-6 text-blue-500" />}
                iconBgColor="bg-blue-50"
                onClick={() => handleIssueClick('wrong_jummah_times')}
              />
            </div>

            {/* Help text */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 text-center">
                All reports are reviewed by our team. Thank you for helping keep our data accurate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Issue form components
interface IssueFormProps {
  masjidName: string
  masjidId: string
  onBack: () => void
}

function DoesntExistForm({ masjidName, onBack }: IssueFormProps) {
  const [reason, setReason] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const reasons = [
    { id: 'closed', label: 'Masjid has permanently closed' },
    { id: 'moved', label: 'Masjid has moved to a different location' },
    { id: 'never_existed', label: 'This masjid never existed here' },
    { id: 'duplicate', label: 'This is a duplicate listing' }
  ]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // TODO: Implement actual submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Report Submitted</h2>
        <p className="text-gray-600 mb-6">Thank you! We&apos;ll review your report and take appropriate action.</p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
        >
          Done
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">Masjid Doesn&apos;t Exist</h2>
            <p className="text-sm text-gray-500">{masjidName}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Why do you believe this masjid doesn&apos;t exist?
          </label>
          <div className="space-y-2">
            {reasons.map((r) => (
              <button
                key={r.id}
                onClick={() => setReason(r.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  reason === r.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    reason === r.id
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}>
                    {reason === r.id && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className={`text-sm ${reason === r.id ? 'text-primary-700 font-medium' : 'text-gray-700'}`}>
                    {r.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Additional Information (optional)
          </label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Please provide any additional details..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={4}
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !reason}
          className="w-full py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </div>
    </div>
  )
}

function WrongLocationForm({ masjidName, onBack }: IssueFormProps) {
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Report Submitted</h2>
        <p className="text-gray-600 mb-6">Thank you! We&apos;ll review and correct the location.</p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
        >
          Done
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">Wrong Location</h2>
            <p className="text-sm text-gray-500">{masjidName}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 p-4 bg-orange-50 rounded-xl">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-orange-800 mb-1">Location Issue</h3>
              <p className="text-sm text-orange-700">
                Please describe where the masjid is actually located, or what&apos;s wrong with the current pin.
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Describe the correct location
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., The masjid is on the opposite side of the street, near the supermarket..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={6}
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !description.trim()}
          className="w-full py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </div>
    </div>
  )
}

function WrongPrayerTimesForm({ masjidName, onBack }: IssueFormProps) {
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Report Submitted</h2>
        <p className="text-gray-600 mb-6">Thank you! We&apos;ll review and update the prayer times.</p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
        >
          Done
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">Wrong Prayer Times</h2>
            <p className="text-sm text-gray-500">{masjidName}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 p-4 bg-amber-50 rounded-xl">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800 mb-1">Prayer Times Issue</h3>
              <p className="text-sm text-amber-700">
                Please describe which prayer times are incorrect and what the correct times should be.
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Describe the issue
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Fajr jamaat is at 6:00 AM not 5:30 AM, Isha jamaat is at 9:30 PM..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={6}
          />
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-700">
            <strong>Tip:</strong> If you have a photo of the prayer timetable, you can use the &quot;Submit Data&quot; feature to upload it directly.
          </p>
        </div>
      </div>

      {/* Submit button */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !description.trim()}
          className="w-full py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </div>
    </div>
  )
}

function WrongJummahTimesForm({ masjidName, onBack }: IssueFormProps) {
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Report Submitted</h2>
        <p className="text-gray-600 mb-6">Thank you! We&apos;ll review and update the Jummah times.</p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
        >
          Done
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">Wrong Jummah Times</h2>
            <p className="text-sm text-gray-500">{masjidName}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800 mb-1">Jummah Times Issue</h3>
              <p className="text-sm text-blue-700">
                Please describe which Jummah times are incorrect and what the correct times should be.
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Describe the issue
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., First Jummah is at 1:00 PM not 12:30 PM, there is also a second Jummah at 2:00 PM..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={6}
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !description.trim()}
          className="w-full py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </div>
    </div>
  )
}
