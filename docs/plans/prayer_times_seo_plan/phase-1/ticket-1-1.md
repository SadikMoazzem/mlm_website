# Ticket 1-1: Install adhan and date-fns-tz dependencies

Complexity level: low

Install the adhan npm package for prayer time calculations and date-fns-tz for timezone handling.

## Actions

### Action 1

Action type: run script

Path: /Users/sadik/Documents/projects/mylocalmasjid/mlm_website

Action: `npm install adhan date-fns-tz`

Description: Install adhan.js for astronomical prayer time calculations and date-fns-tz for Europe/London timezone handling. Adhan.js is a well-maintained library used by many Islamic apps for accurate prayer time calculations.

## Checks

- [ ] Verify packages are added to package.json
- [ ] Verify no peer dependency conflicts
- [ ] Run `npm run build` to ensure no type errors

## Coding standards

N/A - dependency installation only
