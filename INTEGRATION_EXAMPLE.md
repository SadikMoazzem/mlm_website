# API Client Integration Example

## Environment Setup

Create `.env.local` file in your project root:

```env
# MyLocalMasjid API Configuration
API_BASE_URL=https://your-api-domain.com/api/v1
API_KEY=your-actual-api-key-here
```

## How to Use the API Client

### 1. Basic Usage Anywhere in Your App

```typescript
import apiClient from '@/lib/api-client'

// Get a single masjid
const response = await apiClient.getMasjid('uuid-here')
if (response.success) {
  console.log('Masjid:', response.data)
} else {
  console.error('Error:', response.error)
}

// Search masajid
const searchResults = await apiClient.searchMasajid('Green Lane')

// Get multiple masajid with filters
const londonMasajid = await apiClient.getMasajid({
  city: 'London',
  limit: 10
})
```

### 2. Integration in Masjid Page (Server-Side Rendering)

```typescript
// src/app/masjid/[id]/[name]/page.tsx
import { getMasjidById } from '@/lib/masjid-service'

export default async function MasjidPage({ params }) {
  const { id } = await params
  
  // Server-side API call (hidden from client)
  const masjidData = await getMasjidById(id)
  
  if (!masjidData) {
    // Fallback to current behavior if API fails
    return <MasjidRedirectClient 
      masjidName={formatMasjidName(name)}
      masjidId={id}
      deepLinkUrl={`mylocalmasjid://modals/masjid-details?id=${id}`}
    />
  }
  
  // Enhanced experience with real data
  return <MasjidRedirectClient 
    masjidData={masjidData}
    masjidId={id}
    deepLinkUrl={`mylocalmasjid://modals/masjid-details?id=${id}`}
  />
}
```

### 3. Enhanced Component with Real Data

```typescript
// MasjidRedirectClient.tsx
interface Props {
  masjidData?: MasjidData  // Real API data
  masjidName?: string      // Fallback from URL
  masjidId: string
  deepLinkUrl: string
}

export function MasjidRedirectClient({ masjidData, masjidName, ... }) {
  const displayName = masjidData?.name || masjidName || 'Masjid'
  const address = masjidData ? getDisplayAddress(masjidData) : undefined
  const nextPrayer = masjidData ? getNextPrayer(masjidData) : undefined
  
  return (
    <div>
      <h1>{displayName}</h1>
      {address && <p>{address}</p>}
      {nextPrayer && (
        <div>Next Prayer: {nextPrayer.name} at {nextPrayer.time}</div>
      )}
      {/* Rest of component... */}
    </div>
  )
}
```

## Benefits

✅ **Security**: API key never exposed to client  
✅ **Performance**: Data fetched server-side  
✅ **SEO**: Real masjid data in meta tags  
✅ **Fallback**: Works even if API fails  
✅ **Reusable**: API client can be used anywhere  

## Production Deployment

Add environment variables to your hosting platform:
- **Netlify**: Site settings → Environment variables
- **Vercel**: Project settings → Environment Variables

```
API_BASE_URL=https://api.mylocalmasjid.com/v1
API_KEY=prod_your_production_key_here
```
