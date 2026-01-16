# Ticket 2-6: Update Homepage to Use New Components

Complexity level: medium

Replace the current homepage content with the new consumer-first components.

## Actions

### Action 1

Action type: edit file

Path: `src/app/page.tsx`

Action: Replace homepage content with new components

Description: Update the homepage to render:

1. `<ConsumerHero />` - Main hero section
2. `<QuickCityAccess />` - City shortcuts
3. `<FeatureHighlights />` - 3 key benefits
4. `<AppShowcase />` - App features with screenshots
5. `<ForMasjidsTeaser />` - B2B call-out

Remove imports for old `HeroSection` and `ComprehensiveSolutionSection`.

Keep the page as a client component if needed for any interactivity.

### Action 2

Action type: edit file

Path: `src/app/page.tsx`

Action: Update metadata

Description: Update page metadata to be consumer-focused:
- Title: "MyLocalMasjid - Prayer Times & Masjid Finder App"
- Description: "Find accurate prayer times and local masjids near you. Download the free MyLocalMasjid app for iOS and Android."

## Checks

- [x] Homepage renders all new sections
- [x] Old components removed
- [x] Page loads without errors
- [x] Metadata updated
- [x] Dark mode works on full page

## Coding standards

N/A
