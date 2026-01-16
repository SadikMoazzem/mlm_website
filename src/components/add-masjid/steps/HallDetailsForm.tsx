'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Building2, MapPin, Tag, FileText, Mail } from 'lucide-react';
import type { HallDetails, LocationData } from '@/types/add-masjid';

/**
 * Props for the HallDetailsForm component
 */
export interface HallDetailsFormProps {
  /** Location data to auto-fill address */
  location: LocationData;
  /** Initial form data for editing */
  initialData?: HallDetails;
  /** Callback when form is submitted */
  onSubmit: (data: HallDetails) => void;
  /** Whether form is currently submitting */
  isSubmitting?: boolean;
}

/**
 * Form data structure for internal form state
 */
interface FormData {
  name: string;
  address: string;
  hallType: HallDetails['hallType'];
  availability: string;
  contactEmail: string;
}

/**
 * Hall type options for the dropdown
 * These match the mobile app enum for backend consistency
 */
const HALL_TYPE_OPTIONS: Array<{ value: HallDetails['hallType']; label: string }> = [
  { value: 'Community Centre', label: 'Community Centre' },
  { value: 'University', label: 'University' },
  { value: 'Workplace', label: 'Workplace' },
  { value: 'Sports Centre', label: 'Sports Centre' },
  { value: 'Other', label: 'Other' },
];

/**
 * Step 4: Hall Details Form
 *
 * Collects detailed information about the prayer hall being added:
 * - Name (required)
 * - Address (auto-filled from location step, editable)
 * - Hall type (required) - dropdown selection
 * - Availability description (optional) - textarea
 * - Contact email (optional) - email input
 *
 * Features:
 * - React Hook Form for validation
 * - Inline error messages
 * - Auto-filled address from previous location step
 * - Hall type dropdown with predefined options
 * - Submit button integrated with parent state
 */
const HallDetailsForm: React.FC<HallDetailsFormProps> = ({
  location,
  initialData,
  onSubmit,
  isSubmitting = false,
}) => {
  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: initialData?.name || '',
      address: initialData?.address || location.address,
      hallType: initialData?.hallType || 'Community Centre',
      availability: initialData?.availability || '',
      contactEmail: initialData?.contactEmail || '',
    },
  });

  /**
   * Handle form submission
   */
  const handleFormSubmit = (data: FormData) => {
    // Build HallDetails object
    const hallDetails: HallDetails = {
      name: data.name.trim(),
      address: data.address.trim(),
      coordinates: location.coordinates,
      hallType: data.hallType,
      // Only include availability if provided
      ...(data.availability.trim() && { availability: data.availability.trim() }),
      // Only include contact email if provided
      ...(data.contactEmail.trim() && { contactEmail: data.contactEmail.trim() }),
    };

    onSubmit(hallDetails);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Instructions */}
      <div className="text-center text-gray-600">
        <p className="text-sm">
          Provide details about the prayer hall. You can add more information later via the admin
          page.
        </p>
      </div>

      {/* Name Field (Required) */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-500" />
            <span>Hall Name</span>
            <span className="text-red-500">*</span>
          </div>
        </label>
        <input
          id="name"
          type="text"
          {...register('name', {
            required: 'Hall name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
            maxLength: {
              value: 100,
              message: 'Name must be less than 100 characters',
            },
          })}
          placeholder="e.g. Student Union Prayer Room, Community Centre Hall"
          disabled={isSubmitting}
          className={`
            w-full px-4 py-2.5 border rounded-lg transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary-500
            disabled:bg-gray-50 disabled:text-gray-500
            ${errors.name ? 'border-red-500' : 'border-gray-200'}
          `}
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Address Field (Required, Auto-filled) */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>Address</span>
            <span className="text-red-500">*</span>
          </div>
        </label>
        <input
          id="address"
          type="text"
          {...register('address', {
            required: 'Address is required',
            minLength: {
              value: 5,
              message: 'Address must be at least 5 characters',
            },
          })}
          placeholder="Full address of the prayer hall"
          disabled={isSubmitting}
          className={`
            w-full px-4 py-2.5 border rounded-lg transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary-500
            disabled:bg-gray-50 disabled:text-gray-500
            ${errors.address ? 'border-red-500' : 'border-gray-200'}
          `}
        />
        {errors.address && (
          <p className="mt-1.5 text-sm text-red-600">{errors.address.message}</p>
        )}
        <p className="mt-1.5 text-xs text-gray-500">
          Auto-filled from your selected location. You can edit if needed.
        </p>
      </div>

      {/* Hall Type Field (Required) */}
      <div>
        <label htmlFor="hallType" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <span>Hall Type</span>
            <span className="text-red-500">*</span>
          </div>
        </label>
        <select
          id="hallType"
          {...register('hallType', {
            required: 'Hall type is required',
          })}
          disabled={isSubmitting}
          className={`
            w-full px-4 py-2.5 border rounded-lg transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary-500
            disabled:bg-gray-50 disabled:text-gray-500
            ${errors.hallType ? 'border-red-500' : 'border-gray-200'}
          `}
        >
          {HALL_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.hallType && (
          <p className="mt-1.5 text-sm text-red-600">{errors.hallType.message}</p>
        )}
        <p className="mt-1.5 text-xs text-gray-500">
          Select the type of venue that best describes this prayer hall.
        </p>
      </div>

      {/* Availability Field (Optional) */}
      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <span>Availability</span>
            <span className="text-xs text-gray-500">(optional)</span>
          </div>
        </label>
        <textarea
          id="availability"
          {...register('availability', {
            maxLength: {
              value: 500,
              message: 'Availability description must be less than 500 characters',
            },
          })}
          rows={4}
          placeholder="e.g. Available for Jummah prayer every Friday at 1:30 PM. Open during term time only."
          disabled={isSubmitting}
          className={`
            w-full px-4 py-2.5 border rounded-lg transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary-500
            disabled:bg-gray-50 disabled:text-gray-500
            resize-none
            ${errors.availability ? 'border-red-500' : 'border-gray-200'}
          `}
        />
        {errors.availability && (
          <p className="mt-1.5 text-sm text-red-600">{errors.availability.message}</p>
        )}
        <p className="mt-1.5 text-xs text-gray-500">
          Describe when this prayer hall is available for use.
        </p>
      </div>

      {/* Contact Email Field (Optional) */}
      <div>
        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>Contact Email</span>
            <span className="text-xs text-gray-500">(optional)</span>
          </div>
        </label>
        <input
          id="contactEmail"
          type="email"
          {...register('contactEmail', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          })}
          placeholder="e.g. info@example.com"
          disabled={isSubmitting}
          className={`
            w-full px-4 py-2.5 border rounded-lg transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary-500
            disabled:bg-gray-50 disabled:text-gray-500
            ${errors.contactEmail ? 'border-red-500' : 'border-gray-200'}
          `}
        />
        {errors.contactEmail && (
          <p className="mt-1.5 text-sm text-red-600">{errors.contactEmail.message}</p>
        )}
        <p className="mt-1.5 text-xs text-gray-500">
          Contact email for inquiries about using this prayer hall.
        </p>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full py-3 px-6 rounded-lg font-medium transition-colors
            ${
              isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }
          `}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Prayer Hall'}
        </button>
      </div>

      {/* Additional Info */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Note:</strong> Your submission will be reviewed by our team before being added
          to the map. You will be able to claim and manage this prayer hall after it is approved.
        </p>
      </div>
    </form>
  );
};

export default HallDetailsForm;
