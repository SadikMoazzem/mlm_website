# Ticket 3-8: Verify UI with Playwright (Phase 3)

Complexity level: low

Use Playwright to verify the /for-masjids page renders correctly.

## Actions

### Action 1

Action type: run Playwright MCP

Path: N/A

Action: Navigate to /for-masjids and verify sections

Description: Using Playwright MCP:
1. Navigate to `http://localhost:3000/for-masjids`
2. Take a snapshot of the full page
3. Verify ForMasjidsHero section is visible with CTAs
4. Verify ProductsShowcase shows 3 products
5. Verify HowItWorks shows 3 steps
6. Verify IntegrationOptions section appears
7. Verify MasjidCTA at bottom
8. Check for any console errors
9. Toggle dark mode and verify styling

## Checks

- [ ] Page loads without errors
- [ ] All sections visible
- [ ] CTAs clickable
- [ ] No console errors
- [ ] Dark mode works

## Coding standards

N/A
