# Ticket 6-4: Update All Pages for Dark Mode Consistency

Complexity level: medium

Audit all pages and ensure dark mode works consistently across the site.

## Actions

### Action 1

Action type: audit and edit files

Path: `src/app/**/page.tsx` and all component files

Action: Ensure dark mode classes are applied everywhere

Description: Systematically check each page and component:

1. **Pages to audit:**
   - `/` (homepage) - should be done
   - `/for-masjids` - should be done
   - `/prayer-times` - should be done
   - `/download` - should be done
   - `/solutions/admin`
   - `/solutions/website`
   - `/solutions/app`
   - `/journey`
   - `/pricing`
   - `/masjids`
   - `/masjids/[city]/[area]`
   - `/add-masjid`
   - `/register`

2. **For each page, check:**
   - Background colors use dark mode variants
   - Text colors use dark mode variants
   - Border colors use dark mode variants
   - Card backgrounds use dark mode variants
   - Images/icons have appropriate contrast

3. **Common patterns to apply:**
   ```
   bg-white → bg-white dark:bg-gray-900
   text-gray-900 → text-gray-900 dark:text-white
   text-gray-600 → text-gray-600 dark:text-gray-300
   border-gray-200 → border-gray-200 dark:border-gray-700
   ```

4. **Special attention:**
   - Form inputs and buttons
   - Cards and modals
   - Tables if any
   - Footer content

## Checks

- [ ] Toggle dark mode and visually check each page
- [ ] No white backgrounds visible in dark mode
- [ ] Text is readable in both modes
- [ ] Interactive elements are visible

## Coding standards

- `docs/coding_standards/next-react/styling.md`
