'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Building2, MapPin, Clock, Phone, Globe } from 'lucide-react';
import type { MasjidDetails, LocationData } from '@/types/add-masjid';

/**
 * Props for the MasjidDetailsForm component
 */
export interface MasjidDetailsFormProps {
  /** Location data to auto-fill address */
  location: LocationData;
  /** Initial form data for editing */
  initialData?: MasjidDetails;
  /** Callback when form is submitted */
  onSubmit: (data: MasjidDetails) => void;
  /** Whether form is currently submitting */
  isSubmitting?: boolean;
}

/**
 * Form data structure for internal form state
 */
interface FormData {
  name: string;
  address: string;
  hasOpeningTimes: boolean;
  openTime: string;
  closeTime: string;
  phone: string;
  website: string;
}

/**
 * Step 4: Masjid Details Form
 *
 * Collects detailed information about the masjid being added:
 * - Name (required)
 * - Address (auto-filled from location step, editable)
 * - Opening times toggle with time inputs (optional)
 * - Phone number (optional)
 * - Website (optional)
 *
 * Features:
 * - React Hook Form for validation
 * - Inline error messages
 * - Auto-filled address from previous location step
 * - Optional opening times with toggle
 * - Submit button integrated with parent state
 */
const MasjidDetailsForm: React.FC<MasjidDetailsFormProps> = ({
  location,
  initialData,
  onSubmit,
  isSubmitting = false,
}) => {
  // Opening times toggle state
  const [hasOpeningTimes, setHasOpeningTimes] = useState(
    !!initialData?.openingTimes || false
  );

  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: initialData?.name || '',
      address: initialData?.address || location.address,
      hasOpeningTimes: !!initialData?.openingTimes,
      openTime: initialData?.openingTimes?.open || '',
      closeTime: initialData?.openingTimes?.close || '',
      phone: initialData?.phone || '',
      website: initialData?.website || '',
    },
  });

  // Watch hasOpeningTimes to sync with toggle state
  const watchHasOpeningTimes = watch('hasOpeningTimes');

  /**
   * Handle form submission
   */
  const handleFormSubmit = (data: FormData) => {
    // Build MasjidDetails object
    const masjidDetails: MasjidDetails = {
      name: data.name.trim(),
      address: data.address.trim(),
      coordinates: location.coordinates,
      // Only include opening times if toggle is enabled and times are provided
      ...(data.hasOpeningTimes &&
        data.openTime &&
        data.closeTime && {
          openingTimes: {
            open: data.openTime,
            close: data.closeTime,
          },
        }),
      // Only include phone if provided
      ...(data.phone.trim() && { phone: data.phone.trim() }),
      // Only include website if provided
      ...(data.website.trim() && { website: data.website.trim() }),
    };

    onSubmit(masjidDetails);
  };

  /**
   * Handle opening times toggle
   */
  const handleToggleOpeningTimes = () => {
    setHasOpeningTimes(!hasOpeningTimes);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Instructions */}
      <div className="text-center text-gray-600">
        <p className="text-sm">
          Provide details about the masjid. You can add more information later via the masjid
          admin page.
        </p>
      </div>

      {/* Name Field (Required) */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-500" />
            <span>Masjid Name</span>
            <span className="text-red-500">*</span>
          </div>
        </label>
        <input
          id="name"
          type="text"
          {...register('name', {
            required: 'Masjid name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
            maxLength: {
              value: 100,
              message: 'Name must be less than 100 characters',
            },
          })}
          placeholder="e.g. Central Mosque, Green Lane Masjid"
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
          placeholder="Full address of the masjid"
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

      {/* Opening Times Toggle (Optional) */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('hasOpeningTimes')}
            checked={hasOpeningTimes}
            onChange={handleToggleOpeningTimes}
            disabled={isSubmitting}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 disabled:opacity-50"
          />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Add opening times</span>
            <span className="text-xs text-gray-500">(optional)</span>
          </div>
        </label>

        {/* Time Inputs - only shown if toggle is enabled */}
        {watchHasOpeningTimes && (
          <div className="grid grid-cols-2 gap-4 pl-6">
            {/* Open Time */}
            <div>
              <label htmlFor="openTime" className="block text-sm font-medium text-gray-700 mb-2">
                Open
              </label>
              <input
                id="openTime"
                type="time"
                {...register('openTime', {
                  required: watchHasOpeningTimes ? 'Opening time is required' : false,
                })}
                disabled={isSubmitting}
                className={`
                  w-full px-4 py-2.5 border rounded-lg transition-colors
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                  disabled:bg-gray-50 disabled:text-gray-500
                  ${errors.openTime ? 'border-red-500' : 'border-gray-200'}
                `}
              />
              {errors.openTime && (
                <p className="mt-1.5 text-sm text-red-600">{errors.openTime.message}</p>
              )}
            </div>

            {/* Close Time */}
            <div>
              <label htmlFor="closeTime" className="block text-sm font-medium text-gray-700 mb-2">
                Close
              </label>
              <input
                id="closeTime"
                type="time"
                {...register('closeTime', {
                  required: watchHasOpeningTimes ? 'Closing time is required' : false,
                })}
                disabled={isSubmitting}
                className={`
                  w-full px-4 py-2.5 border rounded-lg transition-colors
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                  disabled:bg-gray-50 disabled:text-gray-500
                  ${errors.closeTime ? 'border-red-500' : 'border-gray-200'}
                `}
              />
              {errors.closeTime && (
                <p className="mt-1.5 text-sm text-red-600">{errors.closeTime.message}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Phone Number (Optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>Phone Number</span>
            <span className="text-xs text-gray-500">(optional)</span>
          </div>
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone', {
            pattern: {
              value: /^[\d\s\-+()]+$/,
              message: 'Please enter a valid phone number',
            },
          })}
          placeholder="e.g. +44 20 1234 5678"
          disabled={isSubmitting}
          className={`
            w-full px-4 py-2.5 border rounded-lg transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary-500
            disabled:bg-gray-50 disabled:text-gray-500
            ${errors.phone ? 'border-red-500' : 'border-gray-200'}
          `}
        />
        {errors.phone && (
          <p className="mt-1.5 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Website (Optional) */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <span>Website</span>
            <span className="text-xs text-gray-500">(optional)</span>
          </div>
        </label>
        <input
          id="website"
          type="url"
          {...register('website', {
            pattern: {
              value: /^https?:\/\/.+\..+/,
              message: 'Please enter a valid URL (e.g. https://example.com)',
            },
          })}
          placeholder="e.g. https://example.com"
          disabled={isSubmitting}
          className={`
            w-full px-4 py-2.5 border rounded-lg transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary-500
            disabled:bg-gray-50 disabled:text-gray-500
            ${errors.website ? 'border-red-500' : 'border-gray-200'}
          `}
        />
        {errors.website && (
          <p className="mt-1.5 text-sm text-red-600">{errors.website.message}</p>
        )}
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
          {isSubmitting ? 'Submitting...' : 'Submit Masjid'}
        </button>
      </div>

      {/* Additional Info */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Note:</strong> Your submission will be reviewed by our team before being added
          to the map. You will be able to claim and manage this masjid after it is approved.
        </p>
      </div>
    </form>
  );
};

export default MasjidDetailsForm;
