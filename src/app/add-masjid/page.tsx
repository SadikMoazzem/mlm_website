'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AddMasjidLayout } from '@/components/add-masjid/AddMasjidLayout';
import { StepPanel } from '@/components/add-masjid/StepPanel';
import LocationStep from '@/components/add-masjid/steps/LocationStep';
import NearbyCheckStep from '@/components/add-masjid/steps/NearbyCheckStep';
import TypeSelectionStep from '@/components/add-masjid/steps/TypeSelectionStep';
import MasjidDetailsForm from '@/components/add-masjid/steps/MasjidDetailsForm';
import HallDetailsForm from '@/components/add-masjid/steps/HallDetailsForm';
import SubmittingStep from '@/components/add-masjid/steps/SubmittingStep';
import SuccessStep from '@/components/add-masjid/steps/SuccessStep';
import ErrorStep from '@/components/add-masjid/steps/ErrorStep';
import { AddMasjidStep } from '@/types/add-masjid';
import type { LocationData, NearbyMasjid, VenueType, MasjidDetails, HallDetails } from '@/types/add-masjid';
import type { MapMarker, MapboxMapHandle } from '@/components/map';

/**
 * Metadata for the Add Masjid page
 * Note: Since this is a client component, metadata is set via layout.tsx
 */

/**
 * Add Masjid page - Full-page flow for adding a new masjid
 *
 * Features:
 * - Split-screen layout with map and form panel
 * - Responsive: side-by-side on desktop, stacked on mobile
 * - Interactive map for location selection
 * - Step-by-step wizard flow
 *
 * This page orchestrates the entire Add Masjid flow. Currently shows
 * a placeholder implementation to demonstrate the layout. Actual step
 * content will be added in later phases.
 */
export default function AddMasjidPage() {
  const router = useRouter();

  // Current step in the flow
  const [currentStep, setCurrentStep] = useState<AddMasjidStep>(AddMasjidStep.LOCATION);

  // Map state
  const [mapCenter, setMapCenter] = useState<[number, number]>([-2, 54.5]); // UK center
  const [mapZoom, setMapZoom] = useState(5);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | undefined>();

  // Selected location data
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  // Selected venue type
  const [selectedType, setSelectedType] = useState<VenueType | null>(null);

  // Masjid details
  const [masjidDetails, setMasjidDetails] = useState<MasjidDetails | null>(null);

  // Hall details
  const [hallDetails, setHallDetails] = useState<HallDetails | null>(null);

  // Highlighted masjid ID from map marker click
  const [highlightedMasjidId, setHighlightedMasjidId] = useState<string | undefined>();

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Map ref for programmatic control
  const mapRef = useRef<MapboxMapHandle>(null);

  // Keyboard navigation: Escape key to go back or exit
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Don't allow escape during submission or on success/error screens
        if (
          currentStep === AddMasjidStep.SUBMITTING ||
          currentStep === AddMasjidStep.SUCCESS ||
          currentStep === AddMasjidStep.ERROR
        ) {
          return;
        }

        // Go back if we're not on the first step
        if (currentStep !== AddMasjidStep.LOCATION) {
          event.preventDefault();
          goToPreviousStep();
        } else {
          // Exit the flow if on the first step
          event.preventDefault();
          router.push('/');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, router]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Handle map click - reverse geocode and update location
   */
  const handleMapClick = useCallback(async (coordinates: { latitude: number; longitude: number }) => {
    const markerId = 'selected-location';

    // Update markers with new selected location
    setMarkers([
      {
        id: markerId,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        type: 'selected',
      },
    ]);

    setSelectedLocationId(markerId);

    // Pan to clicked location
    setMapCenter([coordinates.longitude, coordinates.latitude]);
    setMapZoom(15);

    // Reverse geocode to get address
    try {
      const response = await fetch(
        `/api/location/reverse-geocode?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`
      );

      if (!response.ok) {
        console.error('Failed to reverse geocode location');
        // Set location with coordinates only
        setSelectedLocation({
          coordinates: {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          },
          address: `${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}`,
          placeName: 'Selected Location',
        });
        return;
      }

      const data = await response.json();

      setSelectedLocation({
        coordinates: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
        address: data.address || `${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}`,
        placeName: data.placeName || 'Selected Location',
      });
    } catch (error) {
      console.error('Reverse geocode error:', error);
      // Set location with coordinates only on error
      setSelectedLocation({
        coordinates: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
        address: `${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}`,
        placeName: 'Selected Location',
      });
    }
  }, []);

  /**
   * Handle marker click
   */
  const handleMarkerClick = useCallback((marker: MapMarker) => {
    // If it's a nearby masjid marker, highlight it in the list
    if (marker.type === 'nearby') {
      setHighlightedMasjidId(marker.id);
    }

    setSelectedLocationId(marker.id);
    if (mapRef.current) {
      mapRef.current.flyTo([marker.longitude, marker.latitude], 15);
    }
  }, []);

  /**
   * Handle location selection from search (should trigger map pan)
   */
  const handleSearchSelect = useCallback((location: LocationData) => {
    const markerId = 'selected-location';

    // Update markers with new selected location
    setMarkers([
      {
        id: markerId,
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
        type: 'selected',
      },
    ]);

    setSelectedLocationId(markerId);
    setSelectedLocation(location);

    // Pan to selected location
    if (mapRef.current) {
      mapRef.current.flyTo([location.coordinates.longitude, location.coordinates.latitude], 15);
    }
  }, []);

  /**
   * Handle location selection
   */
  const handleLocationSelect = useCallback((location: LocationData) => {
    setSelectedLocation(location);
  }, []);

  /**
   * Handle clearing selected location
   */
  const handleClearLocation = useCallback(() => {
    setSelectedLocation(null);
    setMarkers([]);
    setSelectedLocationId(undefined);
    setMapCenter([-2, 54.5]);
    setMapZoom(5);
  }, []);

  /**
   * Handle nearby masjids loaded - update map with markers
   */
  const handleNearbyMasjidsLoaded = useCallback((nearbyMasjids: NearbyMasjid[]) => {
    const selectedMarker: MapMarker = {
      id: 'selected-location',
      latitude: selectedLocation!.coordinates.latitude,
      longitude: selectedLocation!.coordinates.longitude,
      type: 'selected',
    };

    // Create markers for nearby masjids
    const nearbyMarkers: MapMarker[] = nearbyMasjids.map((masjid) => ({
      id: masjid.id,
      latitude: masjid.coordinates.latitude,
      longitude: masjid.coordinates.longitude,
      type: 'nearby',
      data: masjid,
    }));

    // Update markers to show both selected location and nearby masjids
    setMarkers([selectedMarker, ...nearbyMarkers]);
  }, [selectedLocation]);

  /**
   * Handle masjid selection - called when user clicks "This is my masjid"
   */
  const handleMasjidSelect = useCallback((masjid: NearbyMasjid) => {
    console.log('User selected existing masjid:', masjid);
    // Navigation is handled in the NearbyCheckStep component
  }, []);

  /**
   * Navigate to next step
   */
  const goToNextStep = useCallback(() => {
    const stepOrder: AddMasjidStep[] = [
      AddMasjidStep.LOCATION,
      AddMasjidStep.NEARBY_CHECK,
      AddMasjidStep.TYPE_SELECTION,
      AddMasjidStep.DETAILS,
      AddMasjidStep.SUBMITTING,
      AddMasjidStep.SUCCESS,
    ];

    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  }, [currentStep]);

  /**
   * Handle venue type selection - auto-advances to next step
   */
  const handleTypeSelect = useCallback((type: VenueType) => {
    setSelectedType(type);
    // Auto-advance to next step after a short delay for visual feedback
    const stepOrder: AddMasjidStep[] = [
      AddMasjidStep.LOCATION,
      AddMasjidStep.NEARBY_CHECK,
      AddMasjidStep.TYPE_SELECTION,
      AddMasjidStep.DETAILS,
      AddMasjidStep.SUBMITTING,
      AddMasjidStep.SUCCESS,
    ];

    const currentIndex = stepOrder.indexOf(currentStep);
    setTimeout(() => {
      if (currentIndex < stepOrder.length - 1) {
        setCurrentStep(stepOrder[currentIndex + 1]);
      }
    }, 300);
  }, [currentStep]);

  /**
   * Submit data to /api/feedback/submit endpoint
   */
  const submitToAPI = useCallback(async (formData: {
    location: LocationData;
    venueType: VenueType;
    details: MasjidDetails | HallDetails;
  }) => {
    try {
      const response = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'new_masjid_submission',
          data: {
            location: {
              latitude: formData.location.coordinates.latitude,
              longitude: formData.location.coordinates.longitude,
              address: formData.location.address,
              place_name: formData.location.placeName,
            },
            venue_type: formData.venueType,
            details: formData.details,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit data');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    }
  }, []);

  /**
   * Handle masjid details submission
   */
  const handleMasjidDetailsSubmit = useCallback(async (details: MasjidDetails) => {
    setMasjidDetails(details);
    setIsSubmitting(true);
    setSubmissionError(null);
    setCurrentStep(AddMasjidStep.SUBMITTING);

    try {
      if (!selectedLocation) {
        throw new Error('Location not selected');
      }

      await submitToAPI({
        location: selectedLocation,
        venueType: 'masjid',
        details,
      });

      setIsSubmitting(false);
      setCurrentStep(AddMasjidStep.SUCCESS);
    } catch (error) {
      setIsSubmitting(false);
      setSubmissionError(error instanceof Error ? error.message : 'An unknown error occurred');
      setCurrentStep(AddMasjidStep.ERROR);
    }
  }, [selectedLocation, submitToAPI]);

  /**
   * Handle hall details submission
   */
  const handleHallDetailsSubmit = useCallback(async (details: HallDetails) => {
    setHallDetails(details);
    setIsSubmitting(true);
    setSubmissionError(null);
    setCurrentStep(AddMasjidStep.SUBMITTING);

    try {
      if (!selectedLocation) {
        throw new Error('Location not selected');
      }

      await submitToAPI({
        location: selectedLocation,
        venueType: 'hall',
        details,
      });

      setIsSubmitting(false);
      setCurrentStep(AddMasjidStep.SUCCESS);
    } catch (error) {
      setIsSubmitting(false);
      setSubmissionError(error instanceof Error ? error.message : 'An unknown error occurred');
      setCurrentStep(AddMasjidStep.ERROR);
    }
  }, [selectedLocation, submitToAPI]);

  /**
   * Navigate to previous step
   */
  const goToPreviousStep = useCallback(() => {
    const stepOrder: AddMasjidStep[] = [
      AddMasjidStep.LOCATION,
      AddMasjidStep.NEARBY_CHECK,
      AddMasjidStep.TYPE_SELECTION,
      AddMasjidStep.DETAILS,
    ];

    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  }, [currentStep]);

  /**
   * Reset the flow to start adding another masjid
   */
  const handleAddAnother = useCallback(() => {
    setCurrentStep(AddMasjidStep.LOCATION);
    setMarkers([]);
    setSelectedLocation(null);
    setSelectedLocationId(undefined);
    setSelectedType(null);
    setMasjidDetails(null);
    setHallDetails(null);
    setSubmissionError(null);
    setMapCenter([-2, 54.5]);
    setMapZoom(5);
  }, []);

  /**
   * Retry submission after an error
   */
  const handleRetrySubmission = useCallback(() => {
    // Go back to the details step to retry
    setCurrentStep(AddMasjidStep.DETAILS);
    setSubmissionError(null);
  }, []);

  /**
   * Get step configuration based on current step
   */
  const getStepConfig = () => {
    switch (currentStep) {
      case AddMasjidStep.LOCATION:
        return {
          title: 'Where is your masjid?',
          subtitle: 'Search for an address or click on the map to set the location.',
          showBack: false,
          showNext: true,
          nextDisabled: !selectedLocation,
          nextLabel: 'Next',
        };
      case AddMasjidStep.NEARBY_CHECK:
        return {
          title: 'Nearby masjids',
          subtitle: 'We found some masjids near this location. Is yours listed?',
          showBack: true,
          showNext: true,
          nextDisabled: false,
          nextLabel: 'My masjid is not listed',
        };
      case AddMasjidStep.TYPE_SELECTION:
        return {
          title: 'What type of venue?',
          subtitle: 'Select the type of prayer space you want to add.',
          showBack: true,
          showNext: false,
          nextDisabled: true,
        };
      case AddMasjidStep.DETAILS:
        return {
          title: selectedType === 'masjid' ? 'Masjid details' : 'Hall details',
          subtitle: selectedType === 'masjid'
            ? 'Tell us more about this masjid.'
            : 'Tell us more about this prayer hall.',
          showBack: true,
          showNext: false, // Form has its own submit button
          nextDisabled: false,
          nextLabel: 'Submit',
        };
      case AddMasjidStep.SUBMITTING:
        return {
          title: 'Submitting...',
          subtitle: 'Please wait while we process your submission.',
          showBack: false,
          showNext: false,
        };
      case AddMasjidStep.SUCCESS:
        return {
          title: 'Thank you!',
          subtitle: 'Your submission has been received.',
          showBack: false,
          showNext: false,
        };
      case AddMasjidStep.ERROR:
        return {
          title: 'Submission Failed',
          subtitle: 'There was an error submitting your masjid.',
          showBack: false,
          showNext: false,
        };
      default:
        return {
          title: '',
          subtitle: '',
          showBack: false,
          showNext: false,
        };
    }
  };

  const stepConfig = getStepConfig();

  /**
   * Render step content
   */
  const renderStepContent = () => {
    switch (currentStep) {
      case AddMasjidStep.LOCATION:
        return (
          <LocationStep
            onSearchSelect={handleSearchSelect}
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
            onClearLocation={handleClearLocation}
          />
        );

      case AddMasjidStep.NEARBY_CHECK:
        if (!selectedLocation) {
          return (
            <div className="text-center text-gray-500 py-8">
              Please select a location first
            </div>
          );
        }
        return (
          <NearbyCheckStep
            location={selectedLocation}
            onNearbyMasjidsLoaded={handleNearbyMasjidsLoaded}
            onMasjidSelect={handleMasjidSelect}
            highlightedMasjidId={highlightedMasjidId}
          />
        );

      case AddMasjidStep.TYPE_SELECTION:
        return (
          <TypeSelectionStep
            selectedType={selectedType}
            onTypeSelect={handleTypeSelect}
          />
        );

      case AddMasjidStep.DETAILS:
        if (!selectedLocation) {
          return (
            <div className="text-center text-gray-500 py-8">
              Please select a location first
            </div>
          );
        }
        if (selectedType === 'masjid') {
          return (
            <MasjidDetailsForm
              location={selectedLocation}
              initialData={masjidDetails || undefined}
              onSubmit={handleMasjidDetailsSubmit}
              isSubmitting={isSubmitting}
            />
          );
        } else if (selectedType === 'hall') {
          return (
            <HallDetailsForm
              location={selectedLocation}
              initialData={hallDetails || undefined}
              onSubmit={handleHallDetailsSubmit}
              isSubmitting={isSubmitting}
            />
          );
        }
        // Fallback if no type selected
        return (
          <div className="space-y-4">
            <p className="text-gray-600 text-sm text-center py-8">
              Please select a venue type first.
            </p>
          </div>
        );

      case AddMasjidStep.SUBMITTING:
        return <SubmittingStep />;

      case AddMasjidStep.SUCCESS:
        return <SuccessStep onAddAnother={handleAddAnother} />;

      case AddMasjidStep.ERROR:
        return (
          <ErrorStep
            errorMessage={submissionError || undefined}
            onRetry={handleRetrySubmission}
          />
        );

      default:
        return null;
    }
  };

  return (
    <AddMasjidLayout
      mapCenter={mapCenter}
      mapZoom={mapZoom}
      mapMarkers={markers}
      selectedLocation={selectedLocationId}
      onMapClick={handleMapClick}
      onMarkerClick={handleMarkerClick}
      mapRef={mapRef}
    >
      <StepPanel
        currentStep={currentStep}
        title={stepConfig.title}
        subtitle={stepConfig.subtitle}
        showBack={stepConfig.showBack}
        showNext={stepConfig.showNext}
        nextDisabled={stepConfig.nextDisabled}
        nextLabel={stepConfig.nextLabel}
        onBack={goToPreviousStep}
        onNext={goToNextStep}
      >
        {renderStepContent()}
      </StepPanel>
    </AddMasjidLayout>
  );
}
