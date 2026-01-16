# Ticket 1: Install Vaul dependency and create route structure

Complexity level: low

Install the Vaul library for mobile bottom sheet functionality and create the basic route structure for the masjid finder page.

## Actions

### Action 1: Install Vaul

Action type: run script

Path: `/Users/sadik/Documents/projects/mylocalmasjid/mlm_website`

Action: `npm install vaul`

Description: Install Vaul library for the mobile bottom sheet drawer component. Vaul is a lightweight, accessible drawer component built on Radix primitives.

### Action 2: Create finder route directory

Action type: create directory

Path: `src/app/masjids/finder`

Description: Create the directory for the new finder route at `/masjids/finder`.

### Action 3: Create components directory

Action type: create directory

Path: `src/app/masjids/finder/components`

Description: Create a components directory for finder-specific components (map, header, list panel, etc.).

### Action 4: Create hooks directory

Action type: create directory

Path: `src/app/masjids/finder/hooks`

Description: Create a hooks directory for finder-specific hooks (useVisibleMasjids, useGeolocation, etc.).

### Action 5: Create context directory

Action type: create directory

Path: `src/app/masjids/finder/context`

Description: Create a context directory for the MasjidsMapContext.

## Checks

- Vaul is listed in package.json dependencies
- All directories exist: `src/app/masjids/finder`, `src/app/masjids/finder/components`, `src/app/masjids/finder/hooks`, `src/app/masjids/finder/context`
- `npm install` completes without errors

## Coding standards

N/A - infrastructure setup only
