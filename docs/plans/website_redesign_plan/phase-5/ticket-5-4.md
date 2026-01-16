# Ticket 5-4: Verify UI with Playwright (Phase 5)

Complexity level: low

Use Playwright to verify navigation works correctly across the site.

## Actions

### Action 1

Action type: run Playwright MCP

Path: N/A

Action: Test navigation on multiple pages

Description: Using Playwright MCP:

1. Navigate to homepage
2. Verify new nav items are visible
3. Click each nav item and verify it navigates correctly:
   - Find Masjids → /masjids
   - Prayer Times → /prayer-times
   - Download App → /download
   - For Masjids → /for-masjids
4. Verify Admin Portal button links to admin site
5. Check mobile menu opens and works
6. Verify footer links work
7. Check dark mode toggle in nav
8. Test on a few different pages

## Checks

- [ ] All nav links work
- [ ] Mobile menu works
- [ ] Footer links work
- [ ] Theme toggle works
- [ ] No console errors

## Coding standards

N/A
