# Ticket 2-3: Create FeatureHighlights Component

Complexity level: medium

Create a 3-card section highlighting key app benefits for users.

## Actions

### Action 1

Action type: create file

Path: `src/components/sections/FeatureHighlights.tsx`

Action: Create feature highlights component

Description: Create a section with 3 feature cards:

**Card 1 - Real Jamaat Times:**
- Icon: Clock or Building2
- Title: "Real Jamaat Times"
- Description: "Live prayer times direct from your local masjid, not generic calculations"

**Card 2 - Privacy First:**
- Icon: Shield or Lock
- Title: "Privacy First"
- Description: "No ads, no login required, no tracking. Your data stays yours."

**Card 3 - Works Offline:**
- Icon: WifiOff or CloudOff
- Title: "Works Offline"
- Description: "Access prayer times anywhere, even without internet connection"

**Layout:**
- 3 columns on desktop, 1 column on mobile
- Cards with subtle shadow and border
- Icon in colored circle at top
- Hover effect with slight lift

**Dark Mode:**
- Card background: `--background-card`
- Border: `--border`
- Icon background: primary with transparency

## Checks

- [x] 3 cards display correctly
- [x] Responsive layout works
- [x] Dark mode styling correct
- [x] Icons render properly

## Coding standards

N/A
