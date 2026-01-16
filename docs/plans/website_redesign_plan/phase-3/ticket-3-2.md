# Ticket 3-2: Create ProductsShowcase Component

Complexity level: high

Create a section showcasing the three products available to masjids: Admin Portal, Masjid Website, and Digital Screen.

## Actions

### Action 1

Action type: create file

Path: `src/components/sections/ProductsShowcase.tsx`

Action: Create products showcase component

Description: Create a section with 3 product cards:

**Section Header:**
- Title: "Everything Your Masjid Needs"
- Subtitle: "One platform, three powerful solutions"

**Product 1 - Admin Portal:**
- Icon: LayoutDashboard
- Title: "Admin Portal"
- Description: "Manage prayer times, announcements, and events from one intuitive dashboard"
- Features list (from /solutions/admin):
  - Dashboard overview
  - Prayer times management
  - Announcements & communication
  - Events management
- CTA: "Learn More" → /solutions/admin (keep existing page)
- Secondary: "Try Admin Portal" → https://admin.mylocalmasjid.com

**Product 2 - Masjid Website:**
- Icon: Globe
- Title: "Masjid Website"
- Description: "Beautiful, SEO-optimized website that updates automatically"
- Features list:
  - Mobile responsive design
  - SEO optimized for local search
  - Automatic prayer time updates
  - Events and announcements
- CTA: "Learn More" → /solutions/website
- Secondary: "View Demo" → https://masjid-demo.mylocalmasjid.com

**Product 3 - Digital Screen:**
- Icon: Monitor
- Title: "Masjid Screen"
- Badge: "Coming Soon"
- Description: "Digital displays for prayer times in your masjid"
- Features list:
  - Prayer hall display
  - Entrance screen
  - Auto-updating times
  - Announcement slides
- CTA: "Join Waitlist" (disabled or opens modal)

**Layout:**
- 3 columns on desktop
- Stacked cards on mobile
- Each card with consistent styling

**Dark Mode:**
- Card backgrounds use dark theme colors
- Proper contrast for text

## Checks

- [x] All 3 products display
- [x] Features lists render
- [x] CTAs work correctly
- [x] Coming Soon badge shows
- [x] Dark mode works
- [x] Responsive layout

## Coding standards

N/A
