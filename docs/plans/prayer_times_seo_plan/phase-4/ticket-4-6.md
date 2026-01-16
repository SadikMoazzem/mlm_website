# Ticket 4-6: Verify UI with Playwright - final checks

Complexity level: low

Use Playwright to verify all prayer times and area pages render correctly with new changes.

## Actions

### Action 1

Action type: run playwright

Path: N/A

Action: Final verification of prayer times pages and area pages

Description: Use Playwright MCP to verify:

1. **Prayer Times Pages:**
   - Navigate to `/prayer-times/london`
   - Verify H1 contains "Prayer Times" and "London"
   - Verify prayer times grid displays 6 prayers
   - Verify weekly table has 7 days
   - Check method disclaimer is present
   - Test dark mode toggle

2. **Area Pages:**
   - Navigate to `/masjids/london/east-london`
   - Verify H1 contains "Prayer Times" keyword
   - Verify masjid cards display
   - Check for console errors

3. **Homepage:**
   - Navigate to homepage
   - Verify page loads without errors
   - Check that SearchAction schema is in page source

## Checks

- [ ] All pages load without errors
- [ ] H1 tags contain correct keywords
- [ ] Prayer times display correctly
- [ ] Dark mode works on all pages
- [ ] No console errors

## Coding standards

N/A - UI verification task
