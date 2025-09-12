/**
 * Reusable API Client for MyLocalMasjid
 * Handles authentication, error handling, and type safety
 */

import { MasjidData, ApiResponse, ApiError } from '@/types/api'

/**
 * API Client Configuration
 */
class ApiClient {
  private baseUrl: string | null = null
  private apiKey: string | null = null

  private initialize() {
    if (this.baseUrl && this.apiKey) return

    this.baseUrl = process.env.API_BASE_URL || ''
    this.apiKey = process.env.API_KEY || ''

    if (!this.baseUrl) {
      throw new Error('API_BASE_URL environment variable is required')
    }
    if (!this.apiKey) {
      throw new Error('API_KEY environment variable is required')
    }
  }

  /**
   * Make authenticated API request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    this.initialize()
    const url = `${this.baseUrl}${endpoint}`
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey!,
          ...options.headers,
        },
      })

      // Handle non-200 responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error: ApiError = new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        )
        error.status = response.status
        error.code = errorData.code
        throw error
      }

      const data = await response.json()
      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error)
      
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        }
      }
      
      return {
        success: false,
        error: 'Unknown API error occurred',
      }
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  // Masjid-specific methods
  
  /**
   * Get masjid details by ID
   * Endpoint: GET /masjids/masjid/{masjid_id}
   */
  async getMasjid(id: string): Promise<ApiResponse<MasjidData>> {
    return this.get<MasjidData>(`/masjids/masjid/${id}`)
  }

  /**
   * Get multiple masajid (if endpoint exists)
   */
  async getMasajid(params?: {
    city?: string
    country?: string
    limit?: number
    offset?: number
  }): Promise<ApiResponse<MasjidData[]>> {
    const searchParams = new URLSearchParams()
    if (params?.city) searchParams.append('city', params.city)
    if (params?.country) searchParams.append('country', params.country)
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.offset) searchParams.append('offset', params.offset.toString())
    
    const queryString = searchParams.toString()
    return this.get<MasjidData[]>(`/masajids${queryString ? `?${queryString}` : ''}`)
  }

  /**
   * Search masajid by name (if endpoint exists)
   */
  async searchMasajid(query: string): Promise<ApiResponse<MasjidData[]>> {
    return this.get<MasjidData[]>(`/masajids/search?q=${encodeURIComponent(query)}`)
  }
}

// Create singleton instance
const apiClient = new ApiClient()

export default apiClient

// Export individual methods for convenience
export const {
  getMasjid,
  getMasajid,
  searchMasajid,
  get,
  post,
  put,
  delete: deleteRequest,
} = apiClient
