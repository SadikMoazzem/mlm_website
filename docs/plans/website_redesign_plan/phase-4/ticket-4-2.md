# Ticket 4-2: Create /download Page

Complexity level: medium

Create a download page with smart device detection that shows the appropriate app store or both options.

## Actions

### Action 1

Action type: create directory

Path: `src/app/download`

Action: Create route directory

### Action 2

Action type: create file

Path: `src/app/download/page.tsx`

Action: Create the download page

Description: Create a page with:

**Device Detection:**
- On mount, detect user's device/OS
- iOS → Show App Store prominently, Play Store secondary
- Android → Show Play Store prominently, App Store secondary
- Desktop/Unknown → Show both equally

**Page Content:**
- Hero with app icon/logo
- Title: "Download MyLocalMasjid"
- Subtitle: "Your all-in-one prayer times app"
- App features quick list:
  - ✓ Accurate prayer times
  - ✓ Find nearby masjids
  - ✓ Qibla compass
  - ✓ Works offline
  - ✓ No ads, no login
- Store buttons (StoreButton components)
- App screenshot/preview

**Optional Auto-Redirect:**
- If device is known and user agent matches mobile:
  - Show "Redirecting to store..." message
  - Auto-redirect after 2 seconds
  - "Click here if not redirected" fallback

**QR Code (Desktop):**
- Show QR code for mobile users to scan
- Links to appropriate store or universal link

**Metadata:**
- Title: "Download MyLocalMasjid App - iOS & Android | Free Prayer Times App"
- Description: "Download the free MyLocalMasjid app for iPhone and Android. Get accurate prayer times, find nearby masjids, and never miss salah."

**Dark Mode:**
- Full support with adjusted backgrounds

## Checks

- [x] Page loads at /download
- [x] Device detection works
- [x] Store buttons link correctly
- [x] Dark mode works
- [x] Mobile responsive

## Coding standards

N/A
