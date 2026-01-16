import { NextRequest, NextResponse } from 'next/server'

/**
 * Mapbox forward geocoding response types
 */
interface MapboxForwardGeocodeResponse {
  type: 'FeatureCollection'
  query: string[]
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
 * Response format for forward geocoding
 */
interface GeocodeResponse {
  success: boolean
  data?: {
    name: string
    fullName: string
    latitude: number
    longitude: number
    country: string
    region?: string
    type: string
  }
  error?: string
}

/**
 * Forward geocode location name to coordinates using Mapbox API
 * Used to resolve unknown location slugs to coordinates for the unified location page
 *
 * Query parameters:
 * - q: string (required) - Location name or slug to geocode
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    // Validate required parameter
    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query parameter "q" is required' },
        { status: 400 }
      )
    }

    if (query.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Query cannot be empty' },
        { status: 400 }
      )
    }

    // Get Mapbox access token
    const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
    if (!mapboxToken) {
      console.error('MAPBOX_ACCESS_TOKEN environment variable is not set')
      return NextResponse.json(
        { success: false, error: 'Geocoding service is not configured' },
        { status: 500 }
      )
    }

    // Build Mapbox forward geocoding API URL
    // Format: /geocoding/v5/{endpoint}/{query}.json
    const mapboxUrl = new URL(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`
    )
    mapboxUrl.searchParams.set('access_token', mapboxToken)
    mapboxUrl.searchParams.set('types', 'place,locality,neighborhood') // Exclude addresses for location pages
    mapboxUrl.searchParams.set('limit', '1') // Only need the best match
    mapboxUrl.searchParams.set('country', 'gb') // UK country filter
    mapboxUrl.searchParams.set('language', 'en')

    console.log('Mapbox Forward Geocode Request:', {
      query,
      url: mapboxUrl.toString()
    })

    // Call Mapbox API
    const response = await fetch(mapboxUrl.toString())

    if (!response.ok) {
      console.error('Mapbox API error:', response.status, response.statusText)
      return NextResponse.json(
        { success: false, error: 'Failed to geocode location' },
        { status: 500 }
      )
    }

    const data: MapboxForwardGeocodeResponse = await response.json()

    // Check if we got any results
    if (!data.features || data.features.length === 0) {
      console.warn('No geocoding results found for query:', query)
      return NextResponse.json(
        { success: false, error: 'No location found for the specified query' },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=86400'
          }
        }
      )
    }

    // Extract the most relevant result (first feature)
    const feature = data.features[0]

    // Extract country and region from context
    const country = feature.context?.find(ctx => ctx.id.startsWith('country.'))?.text || 'United Kingdom'
    const region = feature.context?.find(ctx => ctx.id.startsWith('region.'))?.text

    // Build successful response
    const result: GeocodeResponse = {
      success: true,
      data: {
        name: feature.text,
        fullName: feature.place_name,
        latitude: feature.center[1],
        longitude: feature.center[0],
        country,
        region,
        type: feature.place_type[0] || 'place'
      }
    }

    console.log('Forward Geocode Result:', {
      query,
      name: result.data?.name,
      fullName: result.data?.fullName,
      coordinates: {
        latitude: result.data?.latitude,
        longitude: result.data?.longitude
      },
      type: result.data?.type
    })

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400'
      }
    })

  } catch (error) {
    console.error('Error in geocode API route:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to geocode location',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
