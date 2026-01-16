# Ticket 1-3: Create ThemeToggle Component

Complexity level: low

Create a toggle button component for switching between light, dark, and system themes.

## Actions

### Action 1

Action type: create file

Path: `src/components/elements/ThemeToggle.tsx`

Action: Create theme toggle component

Description: Create a button component that:
- Shows sun icon for light mode, moon icon for dark mode
- Cycles through: light → dark → system → light
- Uses `useTheme` hook from ThemeContext
- Has smooth transition animation
- Works on both desktop and mobile
- Uses Lucide icons (Sun, Moon, Monitor)

Style with Tailwind:
- Rounded button with padding
- Hover state with subtle background
- Icon transitions with opacity/rotation

## Checks

- [x] Component renders correct icon based on theme
- [x] Clicking cycles through themes
- [x] Transitions are smooth
- [x] Accessible (has aria-label)

## Coding standards

N/A
