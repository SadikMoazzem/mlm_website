'use client'

import { useState, useRef, useCallback, useMemo, lazy, Suspense, memo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MasjidData } from '@/types/api'
import LoadingModal from '@/components/ui/loading-modal'

// Lazy load modals for code splitting
const EditJummahModal = lazy(() => import('./modals/EditJummahModal'))
const AddJummahModal = lazy(() => import('./modals/AddJummahModal'))
const EmailModal = lazy(() => import('./modals/EmailModal'))
const WarningModal = lazy(() => import('./modals/WarningModal'))

interface UploadedFile {
  name: string
  size: number
  type: string
  id: string // Unique ID to reference file in Map
  uploadedUrl?: string
  uploadedFileKey?: string
}

// File type validation constants
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB (frontend limit)
const MAX_FILE_COUNT = 5

const SUPPORTED_EXTENSIONS = [
  // Images
  '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg',
  // Documents
  '.pdf', '.doc', '.docx', '.txt',
  // Spreadsheets
  '.csv', '.xlsx', '.xls'
]

const SUPPORTED_MIME_TYPES = [
  // Images
  'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml',
  // Documents
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  // Spreadsheets
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

const UNSUPPORTED_EXTENSIONS = [
  '.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz'
]

interface JummahTime {
  id: string
  time: string
  name: string
  deleted?: boolean
}

type FacilityStatus = 'available' | 'not_available' | 'sometimes' | null

interface UploadFormData {
  masjid_id: string
  files: {
    name: string
    size: number
    type: string
    url?: string
    file_key?: string
  }[]
  winter_jummah_times: string[]
  facilities: {
    parking: FacilityStatus
    womens_prayer_area: FacilityStatus
  }
  facility_comments: {
    parking: string
    womens_prayer_area: string
  }
}

interface UploadFormProps {
  masjidData: MasjidData
}

const UploadForm = memo(function UploadForm({ masjidData }: UploadFormProps) {
  const router = useRouter()
  
  // File storage outside React state (prevents memory issues)
  const fileMapRef = useRef<Map<string, File>>(new Map())
  const fileIdCounterRef = useRef(0)
  
  // State management
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [jummahTimes, setJummahTimes] = useState<JummahTime[]>([])
  const [facilities, setFacilities] = useState({
    parking: null as FacilityStatus,
    womens_prayer_area: null as FacilityStatus
  })
  const [facilityComments, setFacilityComments] = useState({
    parking: '',
    womens_prayer_area: ''
  })
  const [isDragOver, setIsDragOver] = useState(false)
  const [editingTime, setEditingTime] = useState<string | null>(null)
  const [editingTimeValue, setEditingTimeValue] = useState('')
  const [newTime, setNewTime] = useState('')
  const [newTimeHour, setNewTimeHour] = useState('12')
  const [newTimeMinute, setNewTimeMinute] = useState('00')
  const [newTimePeriod, setNewTimePeriod] = useState<'AM' | 'PM'>('PM')
  const [editingTimeHour, setEditingTimeHour] = useState('12')
  const [editingTimeMinute, setEditingTimeMinute] = useState('00')
  const [editingTimePeriod, setEditingTimePeriod] = useState<'AM' | 'PM'>('PM')
  const [editingJummahName, setEditingJummahName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddJummahModal, setShowAddJummahModal] = useState(false)
  const [showLoadingModal, setShowLoadingModal] = useState(false)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 })
  const [modalStatus, setModalStatus] = useState<'uploading' | 'success' | 'error' | 'completion'>('uploading')
  const [modalMessage, setModalMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [newJummahName, setNewJummahName] = useState('')
  const [unsupportedFileForEmail, setUnsupportedFileForEmail] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear all File objects from memory
      fileMapRef.current.clear()
    }
  }, [])

  // Format time from 24-hour to 12-hour format with AM/PM
  const formatTime = (time: string): string => {
    if (!time) return ''
    
    const [hours, minutes] = time.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
    
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
  }

  // Convert 12-hour format to 24-hour format
  const convertTo24Hour = (hour: string, minute: string, period: 'AM' | 'PM'): string => {
    let hour24 = parseInt(hour)
    if (period === 'PM' && hour24 !== 12) {
      hour24 += 12
    } else if (period === 'AM' && hour24 === 12) {
      hour24 = 0
    }
    return `${hour24.toString().padStart(2, '0')}:${minute}`
  }

  // Parse 24-hour time into 12-hour components
  const parseTimeToComponents = (time24: string): { hour: string, minute: string, period: 'AM' | 'PM' } => {
    const [hours, minutes] = time24.split(':').map(Number)
    const period: 'AM' | 'PM' = hours >= 12 ? 'PM' : 'AM'
    const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
    return {
      hour: hour12.toString(),
      minute: minutes.toString().padStart(2, '0'),
      period
    }
  }

  // Get file extension from filename
  const getFileExtension = (filename: string): string => {
    const lastDot = filename.lastIndexOf('.')
    return lastDot >= 0 ? filename.substring(lastDot).toLowerCase() : ''
  }

  // Validate file type
  const isFileTypeSupported = (file: File): boolean => {
    const extension = getFileExtension(file.name)
    const mimeType = file.type.toLowerCase()
    
    // Check if extension is in unsupported list
    if (UNSUPPORTED_EXTENSIONS.includes(extension)) {
      return false
    }
    
    // Check if extension is in supported list
    if (SUPPORTED_EXTENSIONS.includes(extension)) {
      return true
    }
    
    // Check if MIME type is supported
    if (SUPPORTED_MIME_TYPES.includes(mimeType)) {
      return true
    }
    
    // Special case: if it's an image type but extension not listed, allow it
    if (mimeType.startsWith('image/')) {
      return true
    }
    
    return false
  }

  // Validate file
  const validateFile = (file: File, currentFileCount: number): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      // For files larger than the frontend limit, ask user to email the file instead
      return {
        valid: false,
        error: 'TOO_LARGE'
      }
    }

    // Check file count
    if (currentFileCount >= MAX_FILE_COUNT) {
      return {
        valid: false,
        error: `Maximum ${MAX_FILE_COUNT} files allowed. Please remove a file first.`
      }
    }

    // Check file type
    if (!isFileTypeSupported(file)) {
      const extension = getFileExtension(file.name)
      if (UNSUPPORTED_EXTENSIONS.includes(extension)) {
        return {
          valid: false,
          error: 'UNSUPPORTED' // Special flag for unsupported files
        }
      }
      return {
        valid: false,
        error: `${file.name} has an unsupported file type. Supported types: images, PDFs, Word documents, Excel files, CSV, and text files.`
      }
    }

    return { valid: true }
  }

  // File upload handlers
  const handleFileUpload = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const currentFileCount = uploadedFiles.length
    const validFiles: UploadedFile[] = []
    const validationErrors: string[] = []
    let unsupportedFile: File | null = null

    for (const file of fileArray) {
      const validation = validateFile(file, currentFileCount + validFiles.length)
      
      if (!validation.valid) {
        // If file is unsupported or too large, prompt user to email it
        if (validation.error === 'UNSUPPORTED' || validation.error === 'TOO_LARGE') {
          if (!unsupportedFile) {
            unsupportedFile = file
          }
        } else if (validation.error) {
          validationErrors.push(validation.error)
        }
        continue
      }

      // Generate unique ID for this file
      const fileId = `file_${Date.now()}_${fileIdCounterRef.current++}`
      
      // Store File object in Map (outside React state)
      fileMapRef.current.set(fileId, file)
      
      // Store only metadata in state
      validFiles.push({
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type
      })
    }

    // Show errors if any
    if (validationErrors.length > 0) {
      setErrorMessage(validationErrors.join('\n'))
      setModalStatus('error')
      setModalMessage('File validation failed')
      setShowLoadingModal(true)
      setTimeout(() => {
        setShowLoadingModal(false)
        setErrorMessage('')
      }, 3000)
    }

    // Handle unsupported file (zip, etc.)
    if (unsupportedFile) {
      setUnsupportedFileForEmail(unsupportedFile)
      setShowEmailModal(true)
    }

    // Add valid files to state
    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles])
    }
  }, [uploadedFiles.length])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    handleFileUpload(files)
  }, [handleFileUpload])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      handleFileUpload(files)
    }
  }, [handleFileUpload])

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev[index]
      if (fileToRemove) {
        // Remove File object from Map to free memory
        fileMapRef.current.delete(fileToRemove.id)
      }
      return prev.filter((_, i) => i !== index)
    })
  }, [])

  // Jummah times handlers
  const addJummahTime = useCallback(() => {
    const time24 = convertTo24Hour(newTimeHour, newTimeMinute, newTimePeriod)
    if (time24) {
      const name = newJummahName.trim() || `Jummah ${jummahTimes.length + 1}`
      const newJummahTime: JummahTime = {
        id: Date.now().toString(),
        time: time24,
        name: name
      }
      setJummahTimes(prev => [...prev, newJummahTime])
      setNewTimeHour('12')
      setNewTimeMinute('00')
      setNewTimePeriod('PM')
      setNewJummahName('')
      setShowAddJummahModal(false)
    }
  }, [newTimeHour, newTimeMinute, newTimePeriod, newJummahName, jummahTimes])
  
  const openAddJummahModal = useCallback(() => {
    setNewJummahName(`Jummah ${jummahTimes.length + 1}`)
    setNewTimeHour('12')
    setNewTimeMinute('00')
    setNewTimePeriod('PM')
    setShowAddJummahModal(true)
  }, [jummahTimes.length])

  const editJummahTime = useCallback((id: string) => {
    const time24 = convertTo24Hour(editingTimeHour, editingTimeMinute, editingTimePeriod)
    setJummahTimes(prev => prev.map(t => 
      t.id === id ? { ...t, time: time24, name: editingJummahName.trim() || t.name } : t
    ))
    setEditingTime(null)
    setEditingTimeHour('12')
    setEditingTimeMinute('00')
    setEditingTimePeriod('PM')
    setEditingJummahName('')
    setShowEditModal(false)
  }, [editingTimeHour, editingTimeMinute, editingTimePeriod, editingJummahName])

  const deleteJummahTime = useCallback((id: string) => {
    setJummahTimes(prev => prev.map(t => 
      t.id === id ? { ...t, deleted: true } : t
    ))
  }, [])

  const restoreJummahTime = useCallback((id: string) => {
    setJummahTimes(prev => prev.map(t => 
      t.id === id ? { ...t, deleted: false } : t
    ))
  }, [])

  const openEditModal = useCallback((id: string, currentTime: string) => {
    const jummahTime = jummahTimes.find(t => t.id === id)
    const { hour, minute, period } = parseTimeToComponents(currentTime)
    setEditingTime(id)
    setEditingTimeHour(hour)
    setEditingTimeMinute(minute)
    setEditingTimePeriod(period)
    setEditingJummahName(jummahTime?.name || '')
    setShowEditModal(true)
  }, [jummahTimes])

  /**
   * DATA TRANSFORMATION PIPELINE
   * 
   * This upload form collects data in a user-friendly format and transforms it
   * into the backend API structure. Below are the key transformations:
   * 
   * 1. JUMMAH TIMES (Winter Jummah Times → Special Prayers)
   *    Input: Array of time strings in 24-hour format ["13:30", "14:00"]
   *    Output: Array of special_prayers objects with structure:
   *    {
   *      label: "Jummah" or "Jummah 1", "Jummah 2" (if multiple),
   *      type: "jummuah",
   *      jammat_time: "13:30",
   *      active: true
   *    }
   * 
   * 2. FACILITIES (Form Status → Backend Status)
   *    Input: FacilityStatus enum: 'available' | 'not_available' | 'sometimes'
   *    Output: Backend status strings:
   *      - 'available' → 'open'
   *      - 'not_available' → 'closed'
   *      - 'sometimes' → 'partially_open'
   *    
   *    Structure:
   *    {
   *      name: "Parking" or "Women's Prayer Area",
   *      description: string (from comments field),
   *      status: 'open' | 'closed' | 'partially_open',
   *      active: true
   *    }
   * 
   * 3. FILES
   *    Input: File objects with browser metadata
   *    Process: Upload to /api/files/upload which forwards to backend
   *    Output: 
   *    {
   *      name: string,
   *      size: number,
   *      type: string (mime type),
   *      url: string (CDN/storage URL),
   *      file_key: string (backend file identifier)
   *    }
   * 
   * 4. FINAL SUBMISSION PAYLOAD
   *    Sent to /api/feedback/submit endpoint:
   *    {
   *      type: 'masjid_admin_submission',
   *      masjid_id: string,
   *      data: {
   *        files: Array<FileMetadata>,
   *        special_prayers: Array<SpecialPrayer>,
   *        facilities: Array<Facility>
   *      }
   *    }
   */

  // Transform Jummah times to special prayers format
  const transformJummahTimes = useCallback((jummahTimesList: JummahTime[]) => {
    return jummahTimesList.map((jummah) => ({
      label: jummah.name,
      type: "jummuah",
      jammat_time: jummah.time,
      active: true
    }))
  }, [])

  /**
   * Transform facility form data to backend API format
   * Maps user-friendly status terms to backend status strings
   */
  const transformFacilities = useCallback((facilitiesData: typeof facilities, facilityCommentsData: typeof facilityComments) => {
    const facilityList = []
    
    // Add parking facility only if it's been set
    if (facilitiesData.parking !== null) {
      facilityList.push({
        name: "Parking",
        description: facilityCommentsData.parking || "",
        status: facilitiesData.parking === 'available' ? 'open' : 
                facilitiesData.parking === 'not_available' ? 'closed' : 'partially_open',
        active: true
      })
    }
    
    // Add women's prayer area facility only if it's been set
    if (facilitiesData.womens_prayer_area !== null) {
      facilityList.push({
        name: "Women's Prayer Area",
        description: facilityCommentsData.womens_prayer_area || "",
        status: facilitiesData.womens_prayer_area === 'available' ? 'open' : 
                facilitiesData.womens_prayer_area === 'not_available' ? 'closed' : 'partially_open',
        active: true
      })
    }
    
    return facilityList
  }, [])

  // Memoize computed values to avoid recalculating on every render
  const activeJummahTimes = useMemo(() => 
    jummahTimes.filter(t => !t.deleted), 
    [jummahTimes]
  )

  const hasFiles = useMemo(() => uploadedFiles.length > 0, [uploadedFiles.length])
  const hasJummahTimes = useMemo(() => activeJummahTimes.length > 0, [activeJummahTimes.length])
  const hasFacilities = useMemo(() => 
    facilities.parking !== null || facilities.womens_prayer_area !== null,
    [facilities.parking, facilities.womens_prayer_area]
  )
  const isReady = useMemo(() => hasFiles || hasJummahTimes || hasFacilities, [hasFiles, hasJummahTimes, hasFacilities])

  // Actual submission logic
  const proceedWithSubmission = useCallback(async () => {
    setShowWarningModal(false)

    setIsSubmitting(true)
    setShowLoadingModal(true)
    setModalStatus('uploading')
    setModalMessage('Starting submission...')

    try {
      // Upload each file if any exist
      const updatedFiles = [...uploadedFiles]
      
      if (uploadedFiles.length > 0) {
        setUploadProgress({ current: 0, total: uploadedFiles.length })
        
        for (let i = 0; i < uploadedFiles.length; i++) {
          const fileMetadata = uploadedFiles[i]
          
          // Retrieve File object from Map
          const file = fileMapRef.current.get(fileMetadata.id)
          if (!file) {
            throw new Error(`File ${fileMetadata.name} not found`)
          }
          
          // Update progress
          setUploadProgress({ current: i + 1, total: uploadedFiles.length })
          setModalMessage(`Uploading file ${i + 1} of ${uploadedFiles.length}...`)
          
          try {
            // 1) Request presigned POST data from our proxy endpoint
            const presignResp = await fetch('/api/files/presign', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                masjid_id: masjidData.id,
                filename: file.name,
                file_category: 'user_uploads',
                content_type: file.type || undefined
              })
            })

            if (!presignResp.ok) {
              const err = await presignResp.json().catch(() => ({}))
              throw new Error(err.error || `Failed to get presign for ${fileMetadata.name}`)
            }

            const presignData = await presignResp.json()

            // 2) Build FormData with returned fields and append the file
            const s3Form = new FormData()
            const fields = presignData.fields || {}
            Object.entries(fields).forEach(([k, v]) => {
              // Fields values are expected to be strings
              if (typeof v === 'string') s3Form.append(k, v)
            })
            s3Form.append('file', file)

            // 3) POST directly to S3
            const s3Response = await fetch(presignData.url, {
              method: 'POST',
              body: s3Form
            })

            if (!s3Response.ok) {
              const text = await s3Response.text().catch(() => '')
              throw new Error(`S3 upload failed: ${s3Response.status} ${text}`)
            }

            // 4) Update file metadata with canonical URL and key returned from presign
            updatedFiles[i] = {
              ...fileMetadata,
              uploadedUrl: presignData.public_url || presignData.url,
              uploadedFileKey: presignData.file_key
            }

            // Clean up File object from Map after successful upload
            fileMapRef.current.delete(fileMetadata.id)

          } catch (error) {
            setModalStatus('error')
            setModalMessage('Upload failed')
            setErrorMessage(`Failed to upload ${fileMetadata.name}: ${error instanceof Error ? error.message : 'Unknown error'}`)
            throw error
          }
        }

        // Update state with uploaded files
        setUploadedFiles(updatedFiles)
      }

      // Transform data for backend submission
      const winterJummahTimes = activeJummahTimes.map(t => t.time)
      const specialPrayers = transformJummahTimes(activeJummahTimes)
      const facilitiesList = transformFacilities(facilities, facilityComments)
      
      const submissionData = {
        files: updatedFiles.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type,
          url: f.uploadedUrl,
          file_key: f.uploadedFileKey
        })),
        special_prayers: specialPrayers,
        facilities: facilitiesList
      }

      // Update modal for submission step
      setModalMessage('Submitting your data...')

      // Submit to feedback endpoint
      const submissionResponse = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'masjid_admin_submission',
          data: submissionData,
          masjid_id: masjidData.id
        }),
      })

      if (!submissionResponse.ok) {
        const errorData = await submissionResponse.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to submit data')
      }

      const submissionResult = await submissionResponse.json()

      // Create final form data with URLs for console logging
      const formData: UploadFormData = {
        masjid_id: masjidData.id,
        files: updatedFiles.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type,
          url: f.uploadedUrl,
          file_key: f.uploadedFileKey
        })),
        winter_jummah_times: winterJummahTimes,
        facilities,
        facility_comments: facilityComments
      }

      // Print JSON to console as requested
      console.log('=== MASJID UPLOAD DATA ===')
      console.log(JSON.stringify(formData, null, 2))
      console.log('=== SUBMISSION RESULT ===')
      console.log(JSON.stringify(submissionResult, null, 2))

      // Redirect to success page
      const successUrl = `/admin/masjid-upload/success?masjid=${encodeURIComponent(masjidData.name)}&submission=${submissionResult.feedback_id || 'success'}`
      router.push(successUrl)

    } catch (error) {
      setModalStatus('error')
      setModalMessage('Process failed')
      setErrorMessage(error instanceof Error ? error.message : 'Please try again or contact support if the problem persists.')
    } finally {
      setIsSubmitting(false)
      // Keep modal open to show error message if there's an error
    }
  }, [uploadedFiles, activeJummahTimes, facilities, facilityComments, masjidData.id, masjidData.name, transformJummahTimes, transformFacilities, router])

  // Submit handler
  const handleSubmit = useCallback(async () => {
    // Check if at least one section has data
    if (!isReady) {
      setShowWarningModal(true)
      return
    }

    // Proceed with submission
    await proceedWithSubmission()
  }, [isReady, proceedWithSubmission])

  // Memoize formatFileSize to avoid recreating on each render
  const formatFileSize = useCallback((bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }, [])

  const updateFacilityComment = useCallback((facility: 'parking' | 'womens_prayer_area', comment: string) => {
    setFacilityComments(prev => ({ ...prev, [facility]: comment }))
  }, [])

  const closeModal = useCallback(() => {
    setShowLoadingModal(false)
    setModalStatus('uploading')
    setModalMessage('')
    setErrorMessage('')
    setUploadProgress({ current: 0, total: 0 })
  }, [])

  const handleEmailUpload = useCallback(() => {
    setShowEmailModal(true)
  }, [])

  const openEmailClient = useCallback(() => {
    setShowEmailModal(false)
    const masjidName = masjidData.name || 'Masjid'
    const masjidId = masjidData.id || ''
    const masjidAddress = masjidData.location?.full_address || 'Address not available'
    
    let subject = `Prayer Times for ${masjidName}`
    let body = `Assalamu Alaikum,

Please find attached the prayer times for ${masjidName}.

Jazakallah Khair.

Masjid Details:
- Masjid ID: ${masjidId}
- Address: ${masjidAddress}`

    // If there's an unsupported file, mention it in the email
    if (unsupportedFileForEmail) {
      subject = `Unsupported File Upload for ${masjidName}`
      body = `Assalamu Alaikum,

Please find attached the unsupported file (${unsupportedFileForEmail.name}) for ${masjidName}.

Please note: This file type is not supported for direct upload. Please attach it to this email.

Jazakallah Khair.

Masjid Details:
- Masjid ID: ${masjidId}
- Address: ${masjidAddress}
- File: ${unsupportedFileForEmail.name} (${(unsupportedFileForEmail.size / 1024 / 1024).toFixed(2)}MB)`
    }
    
    const mailtoLink = `mailto:admin@mylocalmasjid.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, '_blank')
    
    // Clear unsupported file after opening email
    setUnsupportedFileForEmail(null)
  }, [masjidData, unsupportedFileForEmail])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50/30">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section with Profile Card */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Assalamu Alaikum <span className="text-primary-600">{masjidData.name}</span>
            </h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Thank you for helping us serve your community
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mb-4">
              Please upload your prayer times and winter Jummah times for 2025/2026
            </p>
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 max-w-3xl">
              <div className="flex items-center">
                <svg className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-sm text-yellow-800">This form is for masjid administrators and authorized personnel only</p>
              </div>
            </div>
          </div>

          {/* Masjid Profile Card - Right Side */}
          <div className="bg-gradient-to-br from-primary-100 to-primary-200/80 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-primary-200/50 hover:shadow-2xl transition-all duration-300 lg:w-80 lg:flex-shrink-0">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                {/* <h3 className="text-xl font-bold text-gray-900 mb-2">{masjidData.name}</h3> */}
                <div className="flex items-start space-x-2">
                  {/* <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg> */}
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {masjidData.location?.full_address || 'Address not available'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">

          {/* File Upload Section - Full Width */}
          <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-primary-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Upload Prayer Time Files
                  </h3>
                </div>
                <button
                  onClick={handleEmailUpload}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium underline"
                >
                  Having issues upload here
                </button>
              </div>
              
              {/* Dropzone */}
              <div
                className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
                  isDragOver 
                    ? 'border-primary-400 bg-primary-50 scale-105' 
                    : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-primary-100 to-primary-200 mb-6 shadow-sm">
                  <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-xl font-semibold text-gray-900 mb-3">
                  Drop files here or click to browse
                </p>
                <p className="text-gray-500 mb-6">
                  Support for images, PDFs, documents, Excel, and CSV files (max 5 files, 25MB each)
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Choose Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileInputChange}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.xls"
                  title="Select up to 5 files, 25MB each. Supported: images, PDFs, Word, Excel, CSV, text files"
                />
              </div>

              {/* File List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-primary-100 rounded-xl flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Uploaded Files
                  </h4>
                  <div className="space-y-3">
                    {uploadedFiles.map((file, index) => (
                      <div key={file.id} className="flex items-center justify-between bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-4 border border-primary-200/50">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-xl transition-all duration-200"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          {/* Jummah Times and Facilities Section - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Jummah Times Card */}
            <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-primary-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Jummah Times
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Optional</p>
                </div>
              </div>
            </div>
          
              {/* Current Jummah Times */}
              <div className="max-h-80 overflow-y-auto space-y-4 mb-6 pr-2">
                {activeJummahTimes.map((jummahTime) => (
                  <div 
                    key={jummahTime.id} 
                    className="flex items-center justify-between bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-4 border border-primary-200/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <svg className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{jummahTime.name}</div>
                        <div className="text-sm text-gray-600">{formatTime(jummahTime.time)}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                          <button
                            onClick={() => openEditModal(jummahTime.id, jummahTime.time)}
                            className="text-primary-600 hover:text-primary-800 p-2 hover:bg-primary-50 rounded-xl transition-all duration-200"
                            title="Edit time"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteJummahTime(jummahTime.id)}
                            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-xl transition-all duration-200"
                            title="Delete time"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Button */}
              <button
                onClick={openAddJummahModal}
                className="w-full bg-primary-500/20 hover:bg-primary-500/30 text-primary-600 border-2 border-primary-300 rounded-xl px-6 py-3 font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add</span>
              </button>
              </div>
              {/* Women's Prayer Area */}
              <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-primary-100/50 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Women's Prayer Area</h4>
                    <p className="text-xs text-gray-500 mt-1">Optional</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => setFacilities(prev => ({ ...prev, womens_prayer_area: 'available' }))}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                      facilities.womens_prayer_area === 'available'
                        ? 'bg-green-50 border-green-300 text-green-800 shadow-lg'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        facilities.womens_prayer_area === 'available'
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                      }`}>
                        {facilities.womens_prayer_area === 'available' && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="font-semibold text-lg">✓ Available</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setFacilities(prev => ({ ...prev, womens_prayer_area: 'sometimes' }))}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                      facilities.womens_prayer_area === 'sometimes'
                        ? 'bg-yellow-50 border-yellow-300 text-yellow-800 shadow-lg'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        facilities.womens_prayer_area === 'sometimes'
                          ? 'bg-yellow-500 border-yellow-500'
                          : 'border-gray-300'
                      }`}>
                        {facilities.womens_prayer_area === 'sometimes' && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="font-semibold text-lg">⚠ Sometimes Available</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setFacilities(prev => ({ ...prev, womens_prayer_area: 'not_available' }))}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                      facilities.womens_prayer_area === 'not_available'
                        ? 'bg-red-50 border-red-300 text-red-800 shadow-lg'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        facilities.womens_prayer_area === 'not_available'
                          ? 'bg-red-500 border-red-500'
                          : 'border-gray-300'
                      }`}>
                        {facilities.womens_prayer_area === 'not_available' && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="font-semibold text-lg">✗ Not Available</span>
                    </div>
                  </button>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comments:</label>
                  <textarea
                    value={facilityComments.womens_prayer_area}
                    onChange={(e) => updateFacilityComment('womens_prayer_area', e.target.value)}
                    placeholder="Any details about women's prayer area..."
                    className="w-full border-2 border-primary-200 rounded-xl px-3 py-2 text-sm resize-none h-16 focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Parking */}
              <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-primary-100/50 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Parking</h4>
                    <p className="text-xs text-gray-500 mt-1">Optional</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => setFacilities(prev => ({ ...prev, parking: 'available' }))}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                      facilities.parking === 'available'
                        ? 'bg-green-50 border-green-300 text-green-800 shadow-lg'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        facilities.parking === 'available'
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                      }`}>
                        {facilities.parking === 'available' && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="font-semibold text-lg">✓ Available</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setFacilities(prev => ({ ...prev, parking: 'sometimes' }))}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                      facilities.parking === 'sometimes'
                        ? 'bg-yellow-50 border-yellow-300 text-yellow-800 shadow-lg'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        facilities.parking === 'sometimes'
                          ? 'bg-yellow-500 border-yellow-500'
                          : 'border-gray-300'
                      }`}>
                        {facilities.parking === 'sometimes' && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="font-semibold text-lg">⚠ Sometimes Available</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setFacilities(prev => ({ ...prev, parking: 'not_available' }))}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                      facilities.parking === 'not_available'
                        ? 'bg-red-50 border-red-300 text-red-800 shadow-lg'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        facilities.parking === 'not_available'
                          ? 'bg-red-500 border-red-500'
                          : 'border-gray-300'
                      }`}>
                        {facilities.parking === 'not_available' && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="font-semibold text-lg">✗ Not Available</span>
                    </div>
                  </button>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comments:</label>
                  <textarea
                    value={facilityComments.parking}
                    onChange={(e) => updateFacilityComment('parking', e.target.value)}
                    placeholder="Any details about parking..."
                    className="w-full border-2 border-primary-200 rounded-xl px-3 py-2 text-sm resize-none h-16 focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      {/* Floating Submit Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-primary-200/50 p-6 shadow-2xl z-40">
        <div className="px-2 sm:px-4 lg:px-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isReady ? (
                  <>
                    <div className="w-8 h-8 bg-primary-100 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-primary-600 font-semibold text-lg">✓ Ready to submit</span>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <span className="text-gray-600 font-medium">Please fill out at least one section</span>
                  </>
                )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !isReady}
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:transform-none disabled:shadow-none flex items-center space-x-3"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom padding to account for fixed submit bar */}
        <div className="h-20"></div>

        {/* Edit Time Modal */}
        {showEditModal && (
          <Suspense fallback={null}>
            <EditJummahModal
              isOpen={showEditModal}
              editingTime={editingTime}
              editingTimeHour={editingTimeHour}
              editingTimeMinute={editingTimeMinute}
              editingTimePeriod={editingTimePeriod}
              editingJummahName={editingJummahName}
              onHourChange={setEditingTimeHour}
              onMinuteChange={setEditingTimeMinute}
              onPeriodChange={setEditingTimePeriod}
              onNameChange={setEditingJummahName}
              onSave={() => {
                      if (editingTime) {
                        editJummahTime(editingTime)
                      }
                    }}
              onCancel={() => {
                      setShowEditModal(false)
                      setEditingTime(null)
                      setEditingTimeHour('12')
                      setEditingTimeMinute('00')
                      setEditingTimePeriod('PM')
                      setEditingJummahName('')
                    }}
            />
          </Suspense>
        )}

        {/* Loading Modal */}
        <LoadingModal 
          isOpen={showLoadingModal}
          message={modalMessage}
          progress={uploadProgress}
          status={modalStatus}
          errorMessage={errorMessage}
          onClose={closeModal}
        />

        {/* Add Jummah Modal */}
        {showAddJummahModal && (
          <Suspense fallback={null}>
            <AddJummahModal
              isOpen={showAddJummahModal}
              newJummahName={newJummahName}
              newTimeHour={newTimeHour}
              newTimeMinute={newTimeMinute}
              newTimePeriod={newTimePeriod}
              onNameChange={setNewJummahName}
              onHourChange={setNewTimeHour}
              onMinuteChange={setNewTimeMinute}
              onPeriodChange={setNewTimePeriod}
              onAdd={addJummahTime}
              onCancel={() => {
                      setShowAddJummahModal(false)
                      setNewJummahName('')
                      setNewTimeHour('12')
                      setNewTimeMinute('00')
                      setNewTimePeriod('PM')
                    }}
            />
          </Suspense>
        )}

        {/* Email Upload Modal */}
        {showEmailModal && (
          <Suspense fallback={null}>
            <EmailModal
              isOpen={showEmailModal}
              masjidName={masjidData.name || 'Masjid'}
              masjidId={masjidData.id || ''}
              masjidAddress={masjidData.location?.full_address || 'Address not available'}
              onOpenEmail={openEmailClient}
              onCancel={() => {
                setShowEmailModal(false)
                setUnsupportedFileForEmail(null)
              }}
            />
          </Suspense>
        )}

        {/* Warning Modal for No Files */}
        {showWarningModal && (
          <Suspense fallback={null}>
            <WarningModal
              isOpen={showWarningModal}
              onContinue={proceedWithSubmission}
              onCancel={() => setShowWarningModal(false)}
            />
          </Suspense>
        )}
    </div>
  )
})

export default UploadForm
