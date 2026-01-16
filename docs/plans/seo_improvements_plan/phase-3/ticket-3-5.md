# Ticket 3-5: Add FAQPage Schema to FAQ Pages

Complexity level: medium

Add FAQPage structured data to FAQ pages to enable FAQ rich results in Google Search.

## Actions

### Action 1

Action type: create file

Path: `src/lib/faq-schema.ts`

Description: Create FAQ schema generator:

```typescript
interface FAQItem {
  question: string
  answer: string
}

export function generateFAQSchema(faqs: FAQItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}
```

### Action 2

Action type: edit file

Path: `src/app/faq/page.tsx` (and individual FAQ pages)

Action: Add FAQPage JSON-LD script

Description: Each FAQ page should include the FAQPage schema with its questions and answers:

```typescript
import { generateFAQSchema } from '@/lib/faq-schema'

// Define FAQs for this page
const faqs = [
  {
    question: "How do I calibrate my compass?",
    answer: "To calibrate your compass, go to Settings > Compass and follow the on-screen instructions..."
  },
  // ... more FAQs
]

const faqSchema = generateFAQSchema(faqs)

// Add in JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
```

Apply to each FAQ page:
- `/faq/asr-calculation`
- `/faq/compass-calibration`
- `/faq/islamic-calendar`
- `/faq/london-fajr-times`
- `/faq/notifications-not-working`
- `/faq/privacy`
- `/faq/widgets-not-updating`

## Checks

- [x] FAQPage schema appears on FAQ pages
- [x] Questions and answers match page content
- [ ] Schema validates in Google's Rich Results Test
- [ ] FAQ rich results eligible (test with Google tool)

## Coding standards

N/A
