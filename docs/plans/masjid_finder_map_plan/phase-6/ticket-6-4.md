# Ticket 4: Accessibility improvements

Complexity level: medium

Ensure the finder feature is accessible to users with disabilities, including keyboard navigation, screen reader support, and proper ARIA attributes.

## Actions

### Action 1: Add ARIA labels to map components

Action type: edit file

Path: `src/app/masjids/finder/components/MasjidFinderMap.tsx`

Description: Add accessibility attributes to the map:

```tsx
<div
  ref={mapContainerRef}
  className="..."
  role="application"
  aria-label="Interactive map showing masjids in the area. Use the list panel to browse masjids."
  tabIndex={0}
/>
```

Also add visually hidden instructions:
```tsx
<div className="sr-only">
  This is an interactive map showing masjids.
  Use the search bar to find a location, or use the list panel to browse nearby masjids.
  Press Tab to move between interactive elements.
</div>
```

### Action 2: Improve keyboard navigation

Action type: edit multiple files

Description: Ensure all interactive elements are keyboard accessible:

**FilterChips - add keyboard navigation:**
```tsx
// Add onKeyDown handler for Enter/Space
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(!isActive);
    }
  }}
  ...
/>
```

**MasjidListCard - ensure focusable:**
```tsx
<button
  className="..."
  tabIndex={0}
  aria-pressed={isSelected}
  aria-label={`${masjid.name}, ${masjid.type}, ${distance ? formatDistance(distance) + ' away' : ''}`}
/>
```

**LocationSearchOverlay - trap focus:**
```tsx
// Add focus trap when overlay is open
useEffect(() => {
  if (isOpen) {
    inputRef.current?.focus();
  }
}, [isOpen]);

// Handle Tab key to trap focus within overlay
```

### Action 3: Add skip link for map

Action type: edit file

Path: `src/app/masjids/finder/page.tsx`

Description: Add a skip link for keyboard users to bypass the map:

```tsx
<div className="h-full w-full relative">
  {/* Skip link - visible on focus */}
  <a
    href="#masjid-list"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:rounded-lg focus:shadow-lg"
  >
    Skip to masjid list
  </a>

  {/* ... rest of content ... */}

  {/* Add id to list panel */}
  <div id="masjid-list">
    <MasjidSidePanel ... />
  </div>
</div>
```

### Action 4: Add live region for updates

Action type: edit file

Path: `src/app/masjids/finder/page.tsx`

Description: Add an ARIA live region to announce changes:

```tsx
// Add live region for screen reader announcements
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {/* Announce filter changes */}
  {filterChangeMessage && filterChangeMessage}

  {/* Announce visible count changes */}
  {`${visibleCount} masjids found in the current map area`}
</div>
```

### Action 5: Ensure color contrast

Action type: review and edit

Description: Review all color combinations for WCAG AA compliance:
- Text on backgrounds
- Button states (normal, hover, focus, active)
- Filter chips (active/inactive states)
- Error messages

Use tools like WebAIM contrast checker to verify.

## Checks

- All interactive elements are keyboard accessible
- Focus states are visible
- Screen reader announces relevant changes
- Skip link allows bypassing the map
- Color contrast meets WCAG AA standards
- Forms have proper labels
- Images have alt text
- ARIA attributes are correct

## Coding standards

N/A
