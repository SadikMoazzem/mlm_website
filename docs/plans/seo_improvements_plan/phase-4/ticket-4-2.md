# Ticket 4-2: Add "About" Section to Masjid Pages

Complexity level: medium

Add an "About" content section to masjid pages with dynamically generated natural language content.

## Actions

### Action 1

Action type: edit file

Path: `src/app/masjid/[id]/[name]/MasjidRedirectClient.tsx`

Action: Add About section component

Description: Import content generator and add About section in the SEO content area:

```typescript
import { generateAboutContent } from '@/lib/content-generators'

// In the component, generate content:
const aboutContent = masjidData ? generateAboutContent(masjidData) : null

// Add section in the SEO Content area (near existing content):
{aboutContent && (
  <section className="mt-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">
      About {displayName}
    </h2>
    <p className="text-gray-600 text-sm leading-relaxed">
      {aboutContent}
    </p>
  </section>
)}
```

Place this section in the existing "SEO Content Section" area of the page, before or after the current content blocks.

## Checks

- [ ] About section renders when masjid data is available
- [ ] Section does not render if no data
- [ ] Content is readable and natural
- [ ] H2 heading is used for SEO
- [ ] Styling matches existing page design

## Coding standards

N/A
