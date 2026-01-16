# Ticket 4-4: Verify UI with Playwright (Phase 4)

Complexity level: low

Use Playwright to verify both new pages work correctly.

## Actions

### Action 1

Action type: run Playwright MCP

Path: N/A

Action: Test /prayer-times and /download pages

Description: Using Playwright MCP:

**Test /prayer-times:**
1. Navigate to `http://localhost:3000/prayer-times`
2. Verify page loads with search input
3. Check city quick links are clickable
4. Verify dark mode works

**Test /download:**
1. Navigate to `http://localhost:3000/download`
2. Verify store buttons are visible
3. Check features list displays
4. Verify dark mode works

## Checks

- [ ] Both pages load without errors
- [ ] No console errors
- [ ] Dark mode works on both
- [ ] Interactive elements work

## Coding standards

N/A
