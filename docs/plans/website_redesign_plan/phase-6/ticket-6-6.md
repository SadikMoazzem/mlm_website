# Ticket 6-6: Final Playwright Verification

Complexity level: low

Comprehensive visual verification of the entire redesigned site.

## Actions

### Action 1

Action type: Playwright verification

Path: All pages

Action: Navigate through entire site and verify

Description: Use Playwright MCP to verify each page:

1. **Homepage (`/`)**
   - Hero renders with app download CTA
   - Prayer times preview section works
   - Feature cards display correctly
   - Dark mode toggle works
   - No console errors

2. **For Masjids (`/for-masjids`)**
   - B2B content displays
   - Integration steps section
   - Pricing information
   - CTA buttons work

3. **Prayer Times (`/prayer-times`)**
   - Location search works
   - Prayer times display
   - Responsive layout

4. **Download (`/download`)**
   - App store badges visible
   - QR code displays (if implemented)
   - Responsive on mobile

5. **Navigation**
   - All nav links work
   - Mobile menu functions
   - Dark mode persists across pages

6. **Redirects**
   - `/how-we-integrate` → `/for-masjids`
   - `/solutions` → `/for-masjids`

7. **Dark Mode**
   - Toggle to dark mode
   - Check all pages render correctly
   - Check contrast and readability

## Checks

- [ ] All pages render without errors
- [ ] No console errors on any page
- [ ] Dark mode works on all pages
- [ ] Redirects function correctly
- [ ] Mobile responsive on all pages
- [ ] All CTAs and links work

## Coding standards

N/A
