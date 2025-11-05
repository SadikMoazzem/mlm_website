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

    // Parse the multipart form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const masjidId = formData.get('masjid_id') as string

    // Validate required fields
    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      )
    }

    if (!masjidId) {
      return NextResponse.json(
        { error: 'masjid_id is required' },
        { status: 400 }
      )
    }

    // Check file size (25MB limit)
    const maxSize = 25 * 1024 * 1024 // 25MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Maximum size is 25MB, received ${Math.round(file.size / 1024 / 1024 * 100) / 100}MB` },
        { status: 400 }
      )
    }

    // Create FormData for backend API
    const backendFormData = new FormData()
    backendFormData.append('file', file)

    // Forward to backend API with user_uploads category
    const backendUrl = `${apiBaseUrl}/files/${masjidId}/upload?category=user_uploads`
    
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
      },
      body: backendFormData,
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
      { error: 'Internal server error during file upload' },
      { status: 500 }
    )
  }
}
