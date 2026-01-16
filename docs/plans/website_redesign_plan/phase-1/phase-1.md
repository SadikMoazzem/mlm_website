# Phase 1: Dark Mode Infrastructure & Theme Setup ✅

## Goals

Set up dark mode infrastructure including theme context, CSS variables, toggle component, and update Tailwind config to support dark mode with the brand colors from the mobile app.

### Tickets

- [x] Update Tailwind config with dark mode CSS variables
- [x] Create ThemeContext and ThemeProvider for dark mode state
- [x] Create ThemeToggle component
- [x] Update global CSS with dark mode variables
- [x] Update Navbar to include theme toggle
- [x] Run quality checks (lint, build)

### Dependencies

```
ticket-1-1 ─► ticket-1-2 ─► ticket-1-3 ─► ticket-1-5
             ticket-1-4 ─┘
                         └─► ticket-1-6
```

### Notes

- Use `class` strategy for dark mode (already set in tailwind.config.ts)
- Store theme preference in localStorage with key `theme`
- Default to system preference using `prefers-color-scheme`
- Theme toggle should be in navbar (desktop and mobile)
- Use existing brand colors from mobile app theme
