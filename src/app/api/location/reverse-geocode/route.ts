import { NextRequest, NextResponse } from 'next/server'

/**
 * Mapbox reverse geocoding response types
 */
interface MapboxReverseGeocodeResponse {
  type: 'FeatureCollection'
  query: [number, number] // [longitude, latitude]
  features: MapboxFeature[]
  attribution: string
}

interface MapboxFeature {
  id: string
  type: 'Feature'
  place_type: string[]
  relevance: number
  properties: {
    accuracy?: string
    address?: string
    category?: string
    maki?: string
    wikidata?: string
    short_code?: string
  }
  text: string
  place_name: string
  center: [number, number] // [longitude, latitude]
  geometry: {
    type: 'Point'
    coordinates: [number, number] // [longitude, latitude]
  }
  context?: MapboxContext[]
}

interface MapboxContext {
  id: string
  text: string
  wikidata?: string
  short_code?: string
}

/**
 * Response format for reverse geocoding
 */
interface ReverseGeocodeResult {
  address: string
  placeName: string
  postcode?: string
}

/**
 * Reverse geocode coordinates to address using Mapbox API
 * Used in the Add Masjid flow when user clicks on the map to get the address
 *
 * Query parameters:
 * - latitude: number (required)
 * - longitude: number (required)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const latitude = searchParams.get('latitude')
    const longitude = searchParams.get('longitude')

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

    // Get Mapbox access token
    const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
    if (!mapboxToken) {
      console.error('MAPBOX_ACCESS_TOKEN environment variable is not set')
      return NextResponse.json(
        { error: 'Geocoding service is not configured' },
        { status: 500 }
      )
    }

    // Build Mapbox reverse geocoding API URL
    // Format: /geocoding/v5/{endpoint}/{longitude},{latitude}.json
    const mapboxUrl = new URL(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`
    )
    mapboxUrl.searchParams.set('access_token', mapboxToken)
    mapboxUrl.searchParams.set('types', 'address,place,locality,neighborhood')
    mapboxUrl.searchParams.set('limit', '1')
    mapboxUrl.searchParams.set('language', 'en')

    console.log('Mapbox Reverse Geocode Request:', {
      latitude: lat,
      longitude: lng,
      url: mapboxUrl.toString()
    })

    // Call Mapbox API
    const response = await fetch(mapboxUrl.toString())

    if (!response.ok) {
      console.error('Mapbox API error:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to reverse geocode location' },
        { status: 500 }
      )
    }

    const data: MapboxReverseGeocodeResponse = await response.json()

    // Check if we got any results
    if (!data.features || data.features.length === 0) {
      console.warn('No reverse geocoding results found for coordinates:', { lat, lng })
      return NextResponse.json(
        { error: 'No address found for the specified coordinates' },
        { status: 404 }
      )
    }

    // Extract the most relevant result (first feature)
    const feature = data.features[0]

    // Extract postcode from context
    const postcode = feature.context?.find(ctx => ctx.id.startsWith('postcode.'))?.text

    // Build response
    const result: ReverseGeocodeResult = {
      address: feature.place_name,
      placeName: feature.text,
      postcode
    }

    console.log('Reverse Geocode Result:', {
      latitude: lat,
      longitude: lng,
      address: result.address,
      placeName: result.placeName,
      postcode: result.postcode
    })

    return NextResponse.json(result)

  } catch (error) {
    console.error('Error in reverse-geocode API route:', error)

    return NextResponse.json(
      {
        error: 'Failed to reverse geocode location',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
