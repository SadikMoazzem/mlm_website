# Ticket 2-6: Verify UI with Playwright - check London prayer times page

Complexity level: low

Use Playwright to verify the London prayer times page renders correctly with all sections.

## Actions

### Action 1

Action type: run playwright

Path: N/A

Action: Navigate to `/prayer-times/london` and verify page content

Description: Use Playwright MCP to:
1. Navigate to http://localhost:3000/prayer-times/london
2. Take a snapshot to verify visual correctness
3. Check for console errors
4. Verify H1 contains "London" and "Prayer Times"
5. Verify 6 prayer time cards are displayed
6. Verify weekly table has 7 rows
7. Verify method disclaimer is present

## Checks

- [x] Page loads without errors
- [x] Prayer times are displayed
- [x] Weekly forecast table visible
- [x] Dark mode toggle works
- [x] No console errors

## Coding standards

N/A - UI verification task
