/**
 * Types for the Masjid Finder feature
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MasjidFeature {
  id: string;
  name: string;
  type: 'masjid' | 'hall' | 'musalla' | 'community_center';
  madhab?: 'hanafi' | 'shafi' | 'maliki' | 'hanbali';
  has_women_area?: boolean;
  has_parking?: boolean;
  address?: string;
  city?: string;
  coordinates: Coordinates;
}

export interface ActiveFilters {
  womensArea?: boolean;
  parking?: boolean;
  madhab?: string;
  type?: string;
}

export type FilterExpression = any[]; // Mapbox expression

export interface SearchedLocation {
  name: string;
  coordinates: Coordinates;
}
