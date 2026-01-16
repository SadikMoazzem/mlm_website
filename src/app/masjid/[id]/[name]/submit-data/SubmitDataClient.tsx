'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  X,
  Clock,
  Calendar,
  Building2,
  Info,
  ChevronRight,
  CheckCircle2
} from 'lucide-react'
import { MasjidData } from '@/types/api'

interface SubmitDataClientProps {
  masjid: MasjidData
}

type DataCategory = 'jummah' | 'prayer_times' | 'facilities' | 'masjid_info'

interface CategoryCardProps {
  id: DataCategory
  title: string
  description: string
  icon: React.ReactNode
  status?: 'submitted' | 'pending' | null
  onClick: () => void
}

function CategoryCard({ title, description, icon, status, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-md transition-all text-left group"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {status === 'submitted' && (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            )}
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>

        {/* Chevron */}
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-primary-500 transition-colors" />
      </div>
    </button>
  )
}

export function SubmitDataClient({ masjid }: SubmitDataClientProps) {
  const router = useRouter()
  const [currentCategory, setCurrentCategory] = useState<DataCategory | null>(null)

  // Build masjid URL slug
  const masjidSlug = encodeURIComponent(masjid.name.toLowerCase().replace(/\s+/g, '-'))
  const masjidUrl = `/masjid/${masjid.id}/${masjidSlug}`

  const handleCategoryClick = (category: DataCategory) => {
    if (category === 'prayer_times') {
      // Navigate to existing prayer times submission flow
      router.push(`${masjidUrl}/submit-prayer-times`)
    } else {
      // For other categories, show the form within this page
      setCurrentCategory(category)
    }
  }

  const handleBack = () => {
    if (currentCategory) {
      setCurrentCategory(null)
    } else {
      router.back()
    }
  }

  // Render category-specific form
  const renderCategoryForm = () => {
    switch (currentCategory) {
      case 'jummah':
        return <JummahForm masjidId={masjid.id} onBack={() => setCurrentCategory(null)} />
      case 'facilities':
        return <FacilitiesForm masjidId={masjid.id} onBack={() => setCurrentCategory(null)} />
      case 'masjid_info':
        return <MasjidInfoForm masjidId={masjid.id} onBack={() => setCurrentCategory(null)} />
      default:
        return null
    }
  }

  // If viewing a category form
  if (currentCategory) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex-1 flex flex-col md:items-center md:justify-center md:py-8">
          <div className="flex-1 md:flex-initial w-full md:max-w-xl md:min-h-[600px] bg-white md:rounded-xl md:shadow-lg flex flex-col overflow-hidden">
            {renderCategoryForm()}
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
          <header className="md:hidden bg-primary-500 text-white px-4 py-4 flex items-center justify-between shadow-sm">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 hover:bg-primary-600 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-semibold text-lg">Submit Data</h1>
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
              <h1 className="text-xl font-semibold text-gray-900">Submit Data</h1>
            </div>
            <p className="text-gray-600 text-sm">{masjid.name}</p>
          </div>

          {/* Main content */}
          <div className="flex-1 px-4 md:px-6 py-6">
            {/* Intro text */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 md:hidden">
                Help keep {masjid.name} up to date
              </h2>
              <p className="text-sm text-gray-600">
                Choose a category below to submit information. Your contributions help the community stay informed.
              </p>
            </div>

            {/* Category cards */}
            <div className="space-y-3">
              <CategoryCard
                id="jummah"
                title="Jummah Times"
                description="Submit Friday prayer times and khutbah schedules"
                icon={<Calendar className="w-6 h-6 text-primary-500" />}
                onClick={() => handleCategoryClick('jummah')}
              />

              <CategoryCard
                id="prayer_times"
                title="Daily Prayer Times"
                description="Upload the prayer timetable"
                icon={<Clock className="w-6 h-6 text-primary-500" />}
                onClick={() => handleCategoryClick('prayer_times')}
              />

              <CategoryCard
                id="facilities"
                title="Facilities"
                description="Update information about masjid facilities and amenities"
                icon={<Building2 className="w-6 h-6 text-primary-500" />}
                onClick={() => handleCategoryClick('facilities')}
              />

              <CategoryCard
                id="masjid_info"
                title="Masjid Information"
                description="Update contact details, address, or opening hours"
                icon={<Info className="w-6 h-6 text-primary-500" />}
                onClick={() => handleCategoryClick('masjid_info')}
              />
            </div>

            {/* Help text */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 text-center">
                All submissions are reviewed before being published. Thank you for helping keep our community informed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Placeholder form components - these will be expanded later
interface FormProps {
  masjidId: string
  onBack: () => void
}

function JummahForm({ onBack }: FormProps) {
  const [jummahTimes, setJummahTimes] = useState([{ label: 'Jummah 1', time: '' }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const addJummahTime = () => {
    const nextNum = jummahTimes.length + 1
    setJummahTimes([...jummahTimes, { label: `Jummah ${nextNum}`, time: '' }])
  }

  const updateJummahTime = (index: number, field: 'label' | 'time', value: string) => {
    const updated = [...jummahTimes]
    updated[index][field] = value
    setJummahTimes(updated)
  }

  const removeJummahTime = (index: number) => {
    if (jummahTimes.length > 1) {
      setJummahTimes(jummahTimes.filter((_, i) => i !== index))
    }
  }

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
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Submitted Successfully</h2>
        <p className="text-gray-600 mb-6">Thank you! Your Jummah times submission is being reviewed.</p>
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
            <h2 className="font-semibold text-gray-900">Jummah Times</h2>
            <p className="text-sm text-gray-500">Submit Friday prayer schedule</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {jummahTimes.map((jummah, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  value={jummah.label}
                  onChange={(e) => updateJummahTime(index, 'label', e.target.value)}
                  className="font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                  placeholder="Jummah label"
                />
                {jummahTimes.length > 1 && (
                  <button
                    onClick={() => removeJummahTime(index)}
                    className="text-red-500 text-sm hover:text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Jamaat Time</label>
                <input
                  type="time"
                  value={jummah.time}
                  onChange={(e) => updateJummahTime(index, 'time', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          ))}

          <button
            onClick={addJummahTime}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-colors"
          >
            + Add Another Jummah Time
          </button>
        </div>
      </div>

      {/* Submit button */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || jummahTimes.every(j => !j.time)}
          className="w-full py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Jummah Times'}
        </button>
      </div>
    </div>
  )
}

// Types for facilities
type WomensPrayerAvailability = 'always' | 'prayer_times_only' | null
type ParkingType = 'dedicated' | 'curbside' | 'none' | null

interface FacilitiesState {
  // Women's Prayer Area
  hasWomensPrayerArea: boolean | null
  womensPrayerAvailability: WomensPrayerAvailability
  womensPrayerComment: string
  // Parking
  parkingType: ParkingType
  parkingComment: string
  // Optional facilities
  optionalFacilities: Record<string, boolean>
}

interface OptionButtonProps {
  selected: boolean
  onClick: () => void
  label: string
  color: 'green' | 'red' | 'amber' | 'gray' | 'primary'
}

function OptionButton({ selected, onClick, label, color }: OptionButtonProps) {
  const colorClasses = {
    green: selected ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 text-gray-700 hover:border-green-300',
    red: selected ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 text-gray-700 hover:border-red-300',
    amber: selected ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-200 text-gray-700 hover:border-amber-300',
    gray: selected ? 'bg-gray-500 border-gray-500 text-white' : 'border-gray-200 text-gray-700 hover:border-gray-300',
    primary: selected ? 'bg-primary-500 border-primary-500 text-white' : 'border-gray-200 text-gray-700 hover:border-primary-300',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 rounded-lg border-2 font-medium text-sm transition-all ${colorClasses[color]}`}
    >
      {label}
    </button>
  )
}

function FacilitiesForm({ onBack }: FormProps) {
  const [state, setState] = useState<FacilitiesState>({
    hasWomensPrayerArea: null,
    womensPrayerAvailability: null,
    womensPrayerComment: '',
    parkingType: null,
    parkingComment: '',
    optionalFacilities: {}
  })
  const [showComments, setShowComments] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const optionalFacilityOptions = [
    { id: 'wudu', label: 'Wudu Facilities' },
    { id: 'bathroom', label: 'Bathroom' },
    { id: 'wheelchair', label: 'Wheelchair Access' },
    { id: 'children_area', label: 'Children Area' },
    { id: 'wifi', label: 'Free WiFi' },
    { id: 'library', label: 'Library' },
    { id: 'cafe', label: 'Café/Kitchen' }
  ]

  const toggleOptionalFacility = (id: string) => {
    setState(prev => ({
      ...prev,
      optionalFacilities: { ...prev.optionalFacilities, [id]: !prev.optionalFacilities[id] }
    }))
  }

  const toggleComment = (key: string) => {
    setShowComments(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // TODO: Implement actual submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  // Check if any main facility has been answered
  const hasMainFacilityData =
    state.hasWomensPrayerArea !== null ||
    state.parkingType !== null ||
    Object.values(state.optionalFacilities).some(v => v)

  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Submitted Successfully</h2>
        <p className="text-gray-600 mb-6">Thank you! Your facilities update is being reviewed.</p>
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
            <h2 className="font-semibold text-gray-900">Facilities</h2>
            <p className="text-sm text-gray-500">Confirm what&apos;s available</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Women's Prayer Area */}
        <div className="border border-gray-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Women&apos;s Prayer Area</h3>

          <p className="text-sm text-gray-500 mb-3">Do they have one?</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <OptionButton
              selected={state.hasWomensPrayerArea === true}
              onClick={() => setState(prev => ({ ...prev, hasWomensPrayerArea: true }))}
              label="Yes"
              color="green"
            />
            <OptionButton
              selected={state.hasWomensPrayerArea === false}
              onClick={() => setState(prev => ({ ...prev, hasWomensPrayerArea: false, womensPrayerAvailability: null }))}
              label="No"
              color="red"
            />
            <OptionButton
              selected={state.hasWomensPrayerArea === null}
              onClick={() => setState(prev => ({ ...prev, hasWomensPrayerArea: null, womensPrayerAvailability: null }))}
              label="Not sure"
              color="gray"
            />
          </div>

          {/* Conditional: When is it available? */}
          {state.hasWomensPrayerArea === true && (
            <>
              <p className="text-sm text-gray-500 mb-3">When is it available?</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <OptionButton
                  selected={state.womensPrayerAvailability === 'always'}
                  onClick={() => setState(prev => ({ ...prev, womensPrayerAvailability: 'always' }))}
                  label="Always"
                  color="primary"
                />
                <OptionButton
                  selected={state.womensPrayerAvailability === 'prayer_times_only'}
                  onClick={() => setState(prev => ({ ...prev, womensPrayerAvailability: 'prayer_times_only' }))}
                  label="Prayer times only"
                  color="amber"
                />
              </div>
            </>
          )}

          {/* Comment toggle */}
          {showComments.womensPrayer ? (
            <textarea
              value={state.womensPrayerComment}
              onChange={(e) => setState(prev => ({ ...prev, womensPrayerComment: e.target.value }))}
              placeholder="Notes (optional)"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows={2}
            />
          ) : (
            <button
              type="button"
              onClick={() => toggleComment('womensPrayer')}
              className="text-sm text-gray-500 hover:text-primary-600"
            >
              + Add a comment
            </button>
          )}
        </div>

        {/* Parking */}
        <div className="border border-gray-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Parking</h3>

          <p className="text-sm text-gray-500 mb-3">What&apos;s available?</p>
          <div className="flex flex-wrap gap-2 mb-2">
            <OptionButton
              selected={state.parkingType === 'dedicated'}
              onClick={() => setState(prev => ({ ...prev, parkingType: 'dedicated' }))}
              label="Dedicated"
              color="green"
            />
            <OptionButton
              selected={state.parkingType === 'curbside'}
              onClick={() => setState(prev => ({ ...prev, parkingType: 'curbside' }))}
              label="Curbside"
              color="amber"
            />
            <OptionButton
              selected={state.parkingType === 'none'}
              onClick={() => setState(prev => ({ ...prev, parkingType: 'none' }))}
              label="None"
              color="red"
            />
          </div>
          <div className="flex gap-2 mb-4">
            <OptionButton
              selected={state.parkingType === null}
              onClick={() => setState(prev => ({ ...prev, parkingType: null }))}
              label="Not sure"
              color="gray"
            />
          </div>

          {/* Comment toggle */}
          {showComments.parking ? (
            <textarea
              value={state.parkingComment}
              onChange={(e) => setState(prev => ({ ...prev, parkingComment: e.target.value }))}
              placeholder="Notes (optional)"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows={2}
            />
          ) : (
            <button
              type="button"
              onClick={() => toggleComment('parking')}
              className="text-sm text-gray-500 hover:text-primary-600"
            >
              + Add a comment
            </button>
          )}
        </div>

        {/* Optional Facilities */}
        <div className="border border-gray-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-1">Other Facilities</h3>
          <p className="text-sm text-gray-500 mb-4">Select any additional facilities available (optional)</p>

          <div className="flex flex-wrap gap-2">
            {optionalFacilityOptions.map((facility) => (
              <button
                key={facility.id}
                type="button"
                onClick={() => toggleOptionalFacility(facility.id)}
                className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                  state.optionalFacilities[facility.id]
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {state.optionalFacilities[facility.id] && (
                  <CheckCircle2 className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                )}
                {facility.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !hasMainFacilityData}
          className="w-full py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Facilities'}
        </button>
      </div>
    </div>
  )
}

function MasjidInfoForm({ onBack }: FormProps) {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    website: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const hasData = Object.values(formData).some(v => v.trim())

  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Submitted Successfully</h2>
        <p className="text-gray-600 mb-6">Thank you! Your information update is being reviewed.</p>
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
            <h2 className="font-semibold text-gray-900">Masjid Information</h2>
            <p className="text-sm text-gray-500">Update contact details</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="e.g., 020 1234 5678"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="e.g., info@masjid.org"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Website
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            placeholder="e.g., https://masjid.org"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Additional Information
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Any other updates or corrections..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={4}
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !hasData}
          className="w-full py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Information'}
        </button>
      </div>
    </div>
  )
}
