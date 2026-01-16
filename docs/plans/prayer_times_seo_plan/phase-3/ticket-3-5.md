# Ticket 3-5: Verify schema with Google Rich Results Test

Complexity level: low

Test the structured data implementation using Google's Rich Results Test tool.

## Actions

### Action 1

Action type: manual verification

Path: N/A

Action: Test pages with Google Rich Results Test

Description:
1. Deploy to preview/staging environment
2. Go to https://search.google.com/test/rich-results
3. Test the following URLs:
   - `/prayer-times/london`
   - `/masjids/london`
   - `/masjids/london/east-london`
4. Verify no errors, only warnings for optional fields
5. Document any issues found

## Checks

- [x] LocalBusiness/Mosque schema detected on area pages
- [x] ItemList schema detected on city pages
- [x] No critical errors reported
- [x] Schema eligible for rich results

## Coding standards

- docs/coding_standards/seo/structured-data.md
