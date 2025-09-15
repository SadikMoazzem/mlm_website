import { NextRequest, NextResponse } from 'next/server'

interface MapboxAutocompleteResponse {
  type: "FeatureCollection"
  query: string[]
  features: MapboxFeature[]
  attribution: string
}

interface MapboxFeature {
  id: string
  type: "Feature"
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
    type: "Point"
    coordinates: [number, number] // [longitude, latitude]
  }
  context?: MapboxContext[]
  bbox?: [number, number, number, number] // [minLng, minLat, maxLng, maxLat]
}

interface MapboxContext {
  id: string
  text: string
  wikidata?: string
  short_code?: string
}

interface LocationSearchResult {
  id: string
  name: string
  fullName: string
  coordinates: {
    latitude: number
    longitude: number
  }
  type: string
  country?: string
  region?: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters long' },
        { status: 400 }
      )
    }

    const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
    if (!mapboxToken) {
      console.error('MAPBOX_ACCESS_TOKEN environment variable is not set')
      return NextResponse.json(
        { error: 'Search service is not configured' },
        { status: 500 }
      )
    }

    // Build Mapbox API URL
    const mapboxUrl = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`)
    mapboxUrl.searchParams.set('access_token', mapboxToken)
    mapboxUrl.searchParams.set('autocomplete', 'true')
    mapboxUrl.searchParams.set('limit', '8')
    mapboxUrl.searchParams.set('country', 'gb') // Focus on UK
    mapboxUrl.searchParams.set('types', 'place,locality,neighborhood,address')
    mapboxUrl.searchParams.set('language', 'en')

    console.log('Mapbox Search Request:', {
      query,
      url: mapboxUrl.toString()
    })

    // Call Mapbox API
    const response = await fetch(mapboxUrl.toString())
    
    if (!response.ok) {
      console.error('Mapbox API error:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to search locations' },
        { status: 500 }
      )
    }

    const data: MapboxAutocompleteResponse = await response.json()

    // Transform Mapbox results to our format
    const results: LocationSearchResult[] = data.features.map(feature => {
      // Extract country and region from context
      const country = feature.context?.find(ctx => ctx.id.startsWith('country.'))?.text
      const region = feature.context?.find(ctx => ctx.id.startsWith('region.'))?.text

      return {
        id: feature.id,
        name: feature.text,
        fullName: feature.place_name,
        coordinates: {
          latitude: feature.center[1],
          longitude: feature.center[0]
        },
        type: feature.place_type[0] || 'place',
        country,
        region
      }
    })

    console.log('Location Search Results:', {
      query,
      resultCount: results.length,
      results: results.map(r => ({ name: r.name, fullName: r.fullName, type: r.type }))
    })

    return NextResponse.json({
      query,
      results
    })

  } catch (error) {
    console.error('Error in location search API route:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to search locations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
