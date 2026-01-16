# SEO Improvements Implementation Plan

## Overview

Improve website SEO to rank for masjid name searches (e.g., "Holborn Masjid") and location-based searches (e.g., "masjids near London"). This plan implements server-rendered area pages, enhanced metadata/keywords, structured data improvements (BreadcrumbList, FAQPage, ItemList schemas), and content enhancements for individual masjid pages.

### Features

- Server-rendered area pages (`/masjids/[city]/[area]`) with real masjid data from API
- Enhanced city pages with improved metadata and ItemList schema
- BreadcrumbList structured data across all pages
- FAQPage schema on FAQ pages
- ItemList schema on listing pages (city, area, directory)
- Content enhancement sections on masjid pages (About, Prayer Times, Facilities, Getting There)
- Sitemap updates to include all area pages

## Assumptions

- The backend API (`/api/masjids/nearest`) supports server-side fetching during SSR/ISR
- The `cities.ts` file contains all cities and areas that need dedicated pages
- Weekly ISR revalidation (7 days) is acceptable for area pages
- Top 10-15 masjids per area page is sufficient for SEO content

## Dependencies

- Existing `cities.ts` data structure with areas
- Existing `api-client.ts` for API calls
- Existing `masjid-service.ts` for formatting utilities
- Backend API endpoints for nearest masjids

## Risks & Considerations

- **API Rate Limits**: Area pages make API calls during build/revalidation; monitor API usage
- **Build Time**: Adding many area pages may increase build time; ISR mitigates this
- **Content Generation**: Auto-generated content must sound natural, not spammy
- **Schema Validation**: Test structured data with Google's Rich Results Test tool

## Phases

- [x] Phase 1: Server-Rendered Area Pages ✅
- [x] Phase 2: Enhanced City Pages & Metadata ✅
- [x] Phase 3: Structured Data (BreadcrumbList, ItemList, FAQPage) ✅
- [x] Phase 4: Masjid Page Content Enhancement ✅
- [x] Phase 5: Sitemap & Final Integration ✅
