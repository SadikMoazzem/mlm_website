# Ticket 2-5: Create ForMasjidsTeaser Component

Complexity level: low

Create a compact section at the bottom of the homepage to direct masjid administrators to the B2B page.

## Actions

### Action 1

Action type: create file

Path: `src/components/sections/ForMasjidsTeaser.tsx`

Action: Create masjid admin teaser component

Description: Create a compact call-out section:

**Layout:**
- Full-width banner with distinct background (primary-50 in light, primary-900/20 in dark)
- Centered content with icon, text, and CTA

**Content:**
- Icon: Building2 or Mosque
- Title: "Manage Your Masjid Digitally"
- Subtitle: "Free admin portal, website, and digital displays for your masjid"
- CTA Button: "Learn More →" linking to `/for-masjids`

**Styling:**
- Rounded corners
- Subtle border
- Primary color accents
- Arrow icon on button

**Dark Mode:**
- Darker tinted background
- Adjusted text colors

## Checks

- [x] Section renders correctly
- [x] CTA links to /for-masjids
- [x] Dark mode styling works
- [x] Responsive on mobile

## Coding standards

N/A
