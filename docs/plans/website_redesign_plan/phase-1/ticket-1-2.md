# Ticket 1-2: Create ThemeContext and ThemeProvider

Complexity level: medium

Create a React context for managing dark mode state across the application with localStorage persistence and system preference detection.

## Actions

### Action 1

Action type: create file

Path: `src/contexts/ThemeContext.tsx`

Action: Create theme context with provider

Description: Create a context that:
- Manages theme state ('light' | 'dark' | 'system')
- Persists preference to localStorage
- Detects system preference using `prefers-color-scheme`
- Applies/removes `dark` class on `<html>` element
- Provides `theme`, `setTheme`, and `resolvedTheme` values

Key implementation points:
- Use `useEffect` to sync with localStorage on mount
- Use `matchMedia` to detect system preference
- Listen for system preference changes
- Export `useTheme` hook for easy access

### Action 2

Action type: edit file

Path: `src/app/layout.tsx`

Action: Wrap app with ThemeProvider

Description: Import and wrap the application with ThemeProvider, placing it inside the body but wrapping the main content. Add `suppressHydrationWarning` to html element to prevent hydration mismatch from dark class.

## Checks

- [x] ThemeContext exports `ThemeProvider` and `useTheme`
- [x] Theme persists across page reloads
- [x] System preference is detected on first visit
- [x] `dark` class is applied to `<html>` when in dark mode
- [x] No hydration warnings

## Coding standards

N/A
