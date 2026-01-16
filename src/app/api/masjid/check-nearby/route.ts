import { NextRequest, NextResponse } from 'next/server'
import apiClient from '@/lib/api-client'
import { NearbyMasjid } from '@/types/add-masjid'

/**
 * Check for nearby masjids within a specified radius
 * Used in the Add Masjid flow to detect existing masjids near the proposed location
 *
 * Query parameters:
 * - latitude: number (required)
 * - longitude: number (required)
 * - radius_km: number (optional, default: 2)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const latitude = searchParams.get('latitude')
    const longitude = searchParams.get('longitude')
    const radiusKm = searchParams.get('radius_km')

    // Validate required parameters
    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      )
    }

    // Parse and validate coordinates
    const lat = parseFloat(latitude)
    const lng = parseFloat(longitude)

    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json(
        { error: 'Invalid latitude or longitude values' },
        { status: 400 }
      )
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return NextResponse.json(
        { error: 'Latitude must be between -90 and 90, longitude must be between -180 and 180' },
        { status: 400 }
      )
    }

    // Parse radius (default to 2km if not provided)
    const radius = radiusKm ? parseFloat(radiusKm) : 2

    if (isNaN(radius) || radius <= 0 || radius > 100) {
      return NextResponse.json(
        { error: 'Radius must be a positive number between 0 and 100 km' },
        { status: 400 }
      )
    }

    console.log('Checking for nearby masjids:', {
      latitude: lat,
      longitude: lng,
      radius_km: radius
    })

    // Call backend API to get nearest masjids
    const response = await apiClient.getNearestMasajid({
      latitude: lat,
      longitude: lng,
      radius_km: radius,
      page: 1,
      size: 10 // Limit to 10 nearby masjids for the check
    })

    if (!response.success || !response.data) {
      console.error('Failed to fetch nearby masjids:', response.error)
      return NextResponse.json(
        { error: response.error || 'Failed to check for nearby masjids' },
        { status: 500 }
      )
    }

    // Transform backend response to expected format
    // Backend returns nested structure: { masjid: {...}, location: {...}, distance_km: ... }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nearbyMasjids: NearbyMasjid[] = response.data.masjids.map((item: any) => ({
      id: item.masjid?.id || item.id,
      name: item.masjid?.name || item.name,
      address: item.location?.full_address || item.masjid?.location?.full_address || '',
      distance: item.distance_km || 0,
      coordinates: {
        latitude: item.location?.latitude || item.masjid?.location?.latitude || 0,
        longitude: item.location?.longitude || item.masjid?.location?.longitude || 0
      }
    }))

    console.log('Found nearby masjids:', {
      count: nearbyMasjids.length,
      masjids: nearbyMasjids.map(m => ({ name: m.name, distance: m.distance }))
    })

    return NextResponse.json({
      masjids: nearbyMasjids,
      total: response.data.total
    })

  } catch (error) {
    console.error('Error in check-nearby API route:', error)

    return NextResponse.json(
      {
        error: 'Failed to check for nearby masjids',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
