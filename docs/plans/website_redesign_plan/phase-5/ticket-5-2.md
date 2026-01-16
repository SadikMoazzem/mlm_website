# Ticket 5-2: Update Footer with Reorganized Links

Complexity level: medium

Restructure the footer to organize links by audience and purpose.

## Actions

### Action 1

Action type: edit file

Path: `src/components/sections/footer.tsx` (or wherever footer is)

Action: Reorganize footer links

Description: Update footer with new structure:

**Column 1 - For You (Consumer):**
- Find Masjids → /masjids
- Prayer Times → /prayer-times
- Download App → /download
- Masjid Directory → /masjid-directory
- FAQ → /faq

**Column 2 - For Masjids:**
- Get Started → /register
- Admin Portal → https://admin.mylocalmasjid.com
- For Masjids → /for-masjids
- Our Journey → /journey
- Pricing → /pricing

**Column 3 - Company:**
- Contact → /contact
- Privacy Policy → /privacy
- Terms of Service → /terms

**Column 4 - Connect:**
- App Store link
- Play Store link
- Social media links (if any)

**Bottom Bar:**
- Copyright: "© 2024 MyLocalMasjid. All rights reserved."
- Optional: "Made with ❤️ for the Ummah"

**Dark Mode:**
- Footer background adjusts
- Text colors adjust
- Link hover states work

## Checks

- [ ] All links work
- [ ] Columns display correctly
- [ ] Mobile stacking works
- [ ] Dark mode styling correct

## Coding standards

N/A
