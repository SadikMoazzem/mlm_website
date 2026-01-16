# Ticket 2-8: Verify UI with Playwright

Complexity level: low

Use Playwright to verify the new homepage renders correctly.

## Actions

### Action 1

Action type: run Playwright MCP

Path: N/A

Action: Navigate to homepage and verify sections

Description: Using Playwright MCP:
1. Navigate to `http://localhost:3000`
2. Take a snapshot of the full page
3. Verify ConsumerHero section is visible
4. Verify QuickCityAccess cities are clickable
5. Verify FeatureHighlights cards render
6. Verify AppShowcase section appears
7. Verify ForMasjidsTeaser is at bottom
8. Check for any console errors
9. Toggle dark mode and verify styling changes

## Checks

- [ ] Homepage loads without errors
- [ ] All 5 new sections visible
- [ ] No console errors
- [ ] Dark mode toggle works
- [ ] Mobile responsive (check viewport)

## Coding standards

N/A
