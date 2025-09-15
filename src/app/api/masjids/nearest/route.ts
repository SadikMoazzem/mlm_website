import { NextRequest, NextResponse } from 'next/server'
import { getNearestMasajid } from '@/lib/api-client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract query parameters
    const latitude = searchParams.get('latitude')
    const longitude = searchParams.get('longitude')
    const radius_km = searchParams.get('radius_km') || '10'
    const page = parseInt(searchParams.get('page') || '1')
    const size = parseInt(searchParams.get('size') || '20')

    // Validate required parameters
    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      )
    }

    // Validate numeric parameters
    const lat = parseFloat(latitude)
    const lng = parseFloat(longitude)
    const radius = parseFloat(radius_km)

    if (isNaN(lat) || isNaN(lng) || isNaN(radius)) {
      return NextResponse.json(
        { error: 'Invalid latitude, longitude, or radius_km values' },
        { status: 400 }
      )
    }

    // Log the API request for debugging
    console.log('Nearest Masjids API Request:', {
      latitude: lat,
      longitude: lng,
      radius_km: radius,
      page,
      size,
      url: request.url
    })

    // Call the backend API
    const apiResponse = await getNearestMasajid({
      latitude: lat,
      longitude: lng,
      radius_km: radius,
      page,
      size
    })

    if (!apiResponse.success) {
      throw new Error(apiResponse.error || 'Failed to fetch nearest masjids')
    }

    const response = apiResponse.data

    if (!response) {
      throw new Error('No data received from API')
    }

    console.log('Nearest Masjids API Response:', {
      total_masjids: response.masjids?.length || 0,
      total: response.total,
      pages: response.pages,
      page: response.page
    })

    // Return the response in the expected format
    return NextResponse.json({
      masjids: response.masjids || [],
      total: response.total || 0,
      pages: response.pages || 1,
      page: response.page || 1,
      size: response.size || 20
    })

  } catch (error) {
    console.error('Error in nearest masjids API route:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch nearest masjids',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
