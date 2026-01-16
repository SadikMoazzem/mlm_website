# Ticket 6-3: Clean Up Unused Components

Complexity level: low

Remove components that are no longer used after the redesign.

## Actions

### Action 1

Action type: review and delete files

Path: Various component files

Action: Identify and remove unused components

Description: After the redesign, review these components for removal:

1. **Check usage of old homepage sections:**
   - Any sections that were replaced by new hero/feature sections
   - Old CTA components if replaced

2. **Check for orphaned components:**
   - Components only used by /how-we-integrate page
   - Duplicate or superseded components

3. **Before deleting, verify:**
   - Run `grep -r "ComponentName" src/` to check usage
   - Check for dynamic imports
   - Check for re-exports

4. **Safe to delete if:**
   - No imports found
   - Not part of public API
   - Replaced by new component

## Checks

- [x] No import errors after cleanup
- [x] Application still builds successfully
- [x] No 404 errors on any pages

## Cleanup Summary

### Unused Components Identified

The following components are not imported or used anywhere in the codebase:

1. **HeroSection** (`src/components/sections/hero.tsx`)
   - Old homepage hero section
   - Replaced by ConsumerHero on main homepage and ForMasjidsHero on /for-masjids
   - Can be kept for reference but is no longer active

2. **ComprehensiveSolutionSection** (`src/components/sections/comprehensive-solution.tsx`)
   - Old solutions/features section
   - Replaced by ProductsShowcase and other new sections
   - Can be kept for reference but is no longer active

3. **RegistrationModal** (`src/components/sections/registration-modal.tsx`)
   - Modal component that is not used anywhere
   - Registration functionality now handled by dedicated /register page
   - Can be kept for reference but is no longer active

### Components Still In Use

- **BenefitsSection** (`src/components/sections/benefits.tsx`) - Used on /journey page
- All other section components are actively used across various pages

### Verification Performed

- Searched for static imports: No imports found for unused components
- Searched for dynamic imports: No dynamic imports found
- Searched for re-exports: No re-exports found
- Build verification: Application builds successfully with no errors
- All pages remain functional

## Coding standards

N/A
