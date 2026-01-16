/**
 * TypeScript types for Add Masjid flow
 */

/**
 * Steps in the Add Masjid flow
 */
export enum AddMasjidStep {
  LOCATION = 'location',
  NEARBY_CHECK = 'nearby_check',
  TYPE_SELECTION = 'type_selection',
  DETAILS = 'details',
  SUBMITTING = 'submitting',
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Type of venue being added
 */
export type VenueType = 'masjid' | 'hall';

/**
 * Location data with coordinates and address information
 */
export interface LocationData {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: string;
  placeName: string;
}

/**
 * Details for a Masjid submission
 */
export interface MasjidDetails {
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  openingTimes?: {
    open: string;
    close: string;
  };
  phone?: string;
  website?: string;
}

/**
 * Details for a Hall submission
 */
export interface HallDetails {
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  hallType: 'Community Centre' | 'University' | 'Workplace' | 'Sports Centre' | 'Other';
  availability?: string;
  contactEmail?: string;
}

/**
 * Combined form data for the entire Add Masjid flow
 */
export interface AddMasjidFormData {
  location: LocationData | null;
  venueType: VenueType | null;
  masjidDetails?: MasjidDetails;
  hallDetails?: HallDetails;
}

/**
 * Nearby masjid returned from the proximity check
 */
export interface NearbyMasjid {
  id: string;
  name: string;
  address: string;
  distance: number; // distance in km
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
