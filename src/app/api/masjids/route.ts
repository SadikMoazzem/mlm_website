import { NextRequest, NextResponse } from 'next/server'
import { getMasajidPaginated, searchMasajid, getMasajidByLetter } from '@/lib/api-client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const size = parseInt(searchParams.get('size') || '20', 10)
    const searchQuery = searchParams.get('search')
    const startsWithLetter = searchParams.get('starts_with') // New parameter for letter filtering

    let response
    if (startsWithLetter) {
      response = await getMasajidByLetter(startsWithLetter, page, size)
    } else if (searchQuery) {
      response = await searchMasajid(searchQuery, page, size)
    } else {
      response = await getMasajidPaginated(page, size)
    }

    if (response.success && response.data) {
      // API response is already in the correct format, just restructure for consistency
      const convertedResponse = {
        success: true,
        data: {
          data: response.data.items,
          total: response.data.total,
          page: response.data.page,
          size: response.data.size,
          pages: response.data.pages
        }
      }
      
      return NextResponse.json(convertedResponse)
    } else {
      return NextResponse.json(
        { success: false, error: response.error || 'Failed to fetch masjids' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
