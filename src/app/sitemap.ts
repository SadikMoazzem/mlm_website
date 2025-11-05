import { MetadataRoute } from 'next'
import { getMasajidPaginated } from '@/lib/api-client'
import { formatMasjidUrlName } from '@/lib/masjid-service'

const BASE_URL = 'https://mylocalmasjid.com'

// ISR Configuration - Weekly revalidation to keep sitemap fresh
export const revalidate = 604800 // 7 days

/**
 * Fetch all active masjids from the API by paginating through all pages
 */
async function getAllMasjids(): Promise<Array<{ id: string; name: string }>> {
  const masjids: Array<{ id: string; name: string }> = []
  let page = 1
  const pageSize = 100 // Large page size to minimize API calls
  let hasMore = true

  while (hasMore) {
    try {
      const response = await getMasajidPaginated(page, pageSize)
      
      if (response.success && response.data) {
        const { items, pages, page: currentPage } = response.data
        
        // Add masjids to the list
        for (const masjid of items) {
          if (masjid.active && masjid.id && masjid.name) {
            masjids.push({
              id: masjid.id,
              name: masjid.name
            })
          }
        }
        
        // Check if there are more pages
        hasMore = currentPage < pages
        page = currentPage + 1
        
        // Safety check to prevent infinite loops
        if (page > 1000) {
          console.warn('Sitemap generation: Stopped after 1000 pages to prevent infinite loop')
          break
        }
      } else {
        // If API call fails, break to avoid infinite loop
        console.error('Failed to fetch masjids for sitemap:', response.error)
        hasMore = false
      }
    } catch (error) {
      // If there's an error, log it and break
      console.error('Error fetching masjids for sitemap:', error)
      hasMore = false
    }
  }

  return masjids
}

/**
 * Generate sitemap with all static pages and masjid profile pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/masjids`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/masjid-directory`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Fetch all masjids
  let masjidPages: MetadataRoute.Sitemap = []
  try {
    const masjids = await getAllMasjids()
    
    // Generate sitemap entries for each masjid
    masjidPages = masjids.map((masjid) => ({
      url: `${BASE_URL}/masjid/${masjid.id}/${formatMasjidUrlName(masjid.name)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    // If fetching masjids fails, at least return static pages
    console.error('Error generating masjid pages for sitemap:', error)
  }

  // Combine static and masjid pages
  return [...staticPages, ...masjidPages]
}

