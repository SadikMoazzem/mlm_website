# Ticket 1-1: Update Tailwind Config with Dark Mode Colors

Complexity level: medium

Add dark mode color variables to the Tailwind configuration using CSS custom properties, matching the mobile app's dark theme.

## Actions

### Action 1

Action type: edit file

Path: `src/app/globals.css`

Action: Add CSS custom properties for light and dark themes

Description: Add `:root` and `.dark` CSS variable definitions for all theme colors:

```css
:root {
  --background-primary: #F5F5F5;
  --background-secondary: #E8E8E8;
  --background-card: #FFFFFF;
  --text-primary: #1D1D1D;
  --text-secondary: #4F4F4F;
  --text-muted: #757575;
  --text-accent: #D4AF37;
  --border: #D1D1D1;
  --button-primary: #147e7b;
  --button-primary-hover: #0f5a57;
}

.dark {
  --background-primary: #0A1A1F;
  --background-secondary: #153035;
  --background-card: #1A2A30;
  --text-primary: #F5F5F5;
  --text-secondary: #CCCCCC;
  --text-muted: #999999;
  --text-accent: #D4AF37;
  --border: #2A3A40;
  --button-primary: #147e7b;
  --button-primary-hover: #0f5a57;
}
```

### Action 2

Action type: edit file

Path: `tailwind.config.ts`

Action: Update colors to use CSS variables

Description: Extend the theme colors to reference CSS variables so they automatically switch with dark mode:

```typescript
colors: {
  background: {
    primary: 'var(--background-primary)',
    secondary: 'var(--background-secondary)',
    card: 'var(--background-card)',
  },
  // ... keep existing primary scale
}
```

## Checks

- [x] CSS variables defined in globals.css
- [x] Tailwind config references variables
- [x] No TypeScript errors
- [x] Build succeeds

## Coding standards

N/A - configuration files
