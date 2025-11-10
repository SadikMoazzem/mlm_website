import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const apiBaseUrl = process.env.API_BASE_URL
    const apiKey = process.env.API_KEY

    if (!apiBaseUrl) {
      return NextResponse.json({ error: 'API_BASE_URL environment variable is required' }, { status: 500 })
    }
    if (!apiKey) {
      return NextResponse.json({ error: 'API_KEY environment variable is required' }, { status: 500 })
    }

    const body = await request.json().catch(() => ({}))
    const { masjid_id, filename, file_category, content_type, expires_in } = body

    if (!masjid_id || !filename) {
      return NextResponse.json({ error: 'masjid_id and filename are required' }, { status: 400 })
    }

    // Build backend URL
    const params = new URLSearchParams()
    params.append('filename', filename)
    if (file_category) params.append('file_category', file_category)
    if (content_type) params.append('content_type', content_type)
    if (expires_in) params.append('expires_in', String(expires_in))

    const backendUrl = `${apiBaseUrl}/files/${masjid_id}/presign?${params.toString()}`

    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'content-type': 'application/json'
      }
    })

    if (!backendResponse.ok) {
      const err = await backendResponse.json().catch(() => ({}))
      return NextResponse.json({ error: err.detail || `Backend error ${backendResponse.status}` }, { status: backendResponse.status })
    }

    const data = await backendResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error generating presign' }, { status: 500 })
  }
}


