# Ticket 5-3: Verify Structured Data with Google Rich Results Test

Complexity level: low

Test representative pages with Google's Rich Results Test to ensure all structured data is valid.

## Actions

### Action 1

Action type: manual testing

Path: N/A

Action: Test pages with Google Rich Results Test

Description: Test the following pages at https://search.google.com/test/rich-results:

1. **Masjid page** (e.g., `/masjid/{id}/{name}`)
   - Verify: Mosque schema, BreadcrumbList schema
   - Check: No errors or warnings

2. **Area page** (e.g., `/masjids/london/east-london`)
   - Verify: BreadcrumbList schema, ItemList schema
   - Check: No errors or warnings

3. **City page** (e.g., `/masjids/london`)
   - Verify: BreadcrumbList schema
   - Check: No errors or warnings

4. **FAQ page** (e.g., `/faq/asr-calculation`)
   - Verify: FAQPage schema
   - Check: No errors or warnings

Document any issues found for fixing.

### Action 2

Action type: create file (if issues found)

Path: `docs/plans/seo_improvements_plan/schema-validation-results.md`

Action: Document validation results

Description: Create a document listing:
- Pages tested
- Schemas detected
- Any errors or warnings
- Required fixes

## Checks

- [ ] All tested pages pass validation
- [ ] No schema errors
- [ ] Rich results eligible where applicable
- [ ] Results documented

## Coding standards

N/A
