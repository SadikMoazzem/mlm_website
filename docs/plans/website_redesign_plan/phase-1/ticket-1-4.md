# Ticket 1-4: Update Global CSS with Dark Mode Styles

Complexity level: low

Update global styles to support dark mode for base elements like body, scrollbars, and selection.

## Actions

### Action 1

Action type: edit file

Path: `src/app/globals.css`

Action: Add dark mode global styles

Description: Add dark mode variants for:
- Body background and text colors
- Scrollbar styling (webkit)
- Text selection colors
- Focus ring colors

Example additions:
```css
body {
  background-color: var(--background-primary);
  color: var(--text-primary);
}

::selection {
  background-color: var(--button-primary);
  color: white;
}

/* Scrollbar for dark mode */
.dark::-webkit-scrollbar-track {
  background: var(--background-secondary);
}

.dark::-webkit-scrollbar-thumb {
  background: var(--border);
}
```

## Checks

- [x] Body background changes with theme
- [x] Text color changes with theme
- [x] Scrollbar styled in dark mode
- [x] No visual glitches during transition

## Coding standards

N/A
