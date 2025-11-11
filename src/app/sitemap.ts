import { MetadataRoute } from 'next'
import { getMasajidPaginated } from '@/lib/api-client'
import { formatMasjidUrlName } from '@/lib/masjid-service'
import { cities } from '@/data/cities'

const BASE_URL = 'https://mylocalmasjid.com'

// ISR Configuration - Weekly revalidation to keep sitemap fresh
export const revalidate = 604800 // 7 days
/**
 * Escape XML special characters in a string so it can be safely inserted into XML content.
 */
function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

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

  // Generate city pages
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/masjids/${city.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Generate area/nearby pages for each area in each city
  const areaPages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    city.areas.map((area) => {
      // Create search params matching the AreaCard component format
      const searchParams = new URLSearchParams({
        area: area.name,
        city: city.name,
        source: 'area',
        radius: '10'
      })
      
      {
        // Build raw URL then encode and XML-escape it to avoid invalid XML (unescaped ampersands)
        const rawUrl = `${BASE_URL}/masjids/near/${area.latitude}/${area.longitude}?${searchParams.toString()}`
        return {
          url: escapeXml(encodeURI(rawUrl)),
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }
      }
    })
  )

  // Fetch all masjids
  let masjidPages: MetadataRoute.Sitemap = []
  try {
    const masjids = await getAllMasjids()
    
    // Generate sitemap entries for each masjid
    masjidPages = masjids.map((masjid) => {
      const rawUrl = `${BASE_URL}/masjid/${masjid.id}/${formatMasjidUrlName(masjid.name)}`
      return {
        url: escapeXml(encodeURI(rawUrl)),
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })
  } catch (error) {
    // If fetching masjids fails, at least return static pages
    console.error('Error generating masjid pages for sitemap:', error)
  }

  // Combine all pages: static, city, area, and masjid pages
  return [...staticPages, ...cityPages, ...areaPages, ...masjidPages]
}

