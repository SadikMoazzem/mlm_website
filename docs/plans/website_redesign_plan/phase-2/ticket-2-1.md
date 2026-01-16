# Ticket 2-1: Create ConsumerHero Component

Complexity level: high

Create the main hero section for the consumer-first homepage with app promotion, CTAs, and social proof.

## Actions

### Action 1

Action type: create file

Path: `src/components/sections/ConsumerHero.tsx`

Action: Create consumer-focused hero component

Description: Create a full-viewport hero section with:

**Layout:**
- Two-column layout on desktop (text left, phone mockup right)
- Single column on mobile (text, then phone below)
- Gradient background (subtle primary-50 radial)

**Content - Left Side:**
- Headline: "Never Miss Salah" (large, bold)
- Subheadline: "Find accurate prayer times and local masjids, instantly"
- Two CTAs side by side:
  - Primary: Download App (links to /download)
  - Secondary: Find Near Me (use existing FindNearMeButton)
- Social proof bar below CTAs:
  - "2300+ masjids"
  - "⭐ 4.8 rating"
  - "100% free"

**Content - Right Side:**
- Phone mockup with app screenshot (reuse existing preview_mobile.png)
- Floating decorative elements (subtle)

**Dark Mode:**
- Background changes to dark gradient
- Text colors invert appropriately
- Phone mockup frame changes to lighter border

Use Framer Motion for entrance animations.

## Checks

- [x] Hero renders correctly on desktop
- [x] Hero renders correctly on mobile
- [x] CTAs are clickable and properly linked
- [x] Dark mode styling works
- [x] Animations are smooth

## Coding standards

N/A
