import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get environment variables
    const apiBaseUrl = process.env.API_BASE_URL
    const apiKey = process.env.API_KEY

    if (!apiBaseUrl) {
      return NextResponse.json(
        { error: 'API_BASE_URL environment variable is required' },
        { status: 500 }
      )
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API_KEY environment variable is required' },
        { status: 500 }
      )
    }

    // Parse the request body
    const body = await request.json()
    const { type, data, masjid_id } = body

    // Validate required fields
    if (!type) {
      return NextResponse.json(
        { error: 'type is required' },
        { status: 400 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'data is required' },
        { status: 400 }
      )
    }

    // Prepare payload for backend
    const payload = {
      type,
      data,
      ...(masjid_id && { masjid_id })
    }

    // Forward to backend API
    const backendUrl = `${apiBaseUrl}/user-feedback/feedback`
    
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(payload),
    })

    // Handle backend response
    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}))
      return NextResponse.json(
        { 
          error: errorData.message || `Backend API error: ${backendResponse.status}` 
        },
        { status: backendResponse.status }
      )
    }

    const responseData = await backendResponse.json()
    
    return NextResponse.json(responseData)

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error during feedback submission' },
      { status: 500 }
    )
  }
}
