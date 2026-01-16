# Ticket 3-4: Create IntegrationOptions Component

Complexity level: medium

Create a section showing integration options, migrating content from `/how-we-integrate` page including the embed selector.

## Actions

### Action 1

Action type: create file

Path: `src/components/sections/IntegrationOptions.tsx`

Action: Create integration options component

Description: Create a section with:

**Section Header:**
- Title: "Flexible Integration Options"
- Subtitle: "Choose how to display your masjid information"

**Option 1 - Full Website:**
- Icon: Globe
- Title: "Dedicated Masjid Website"
- Description: "Get a beautiful, fully-managed website at yourmasjid.mylocalmasjid.com"
- CTA: "View Demo" → https://masjid-demo.mylocalmasjid.com

**Option 2 - Embed Widgets:**
- Icon: Code
- Title: "Embed on Your Existing Site"
- Description: "Add prayer times and announcements to your current website"
- Include the EmbedSelector component (imported from existing)
- Show code snippets for embedding

**Option 3 - Mobile App:**
- Icon: Smartphone
- Title: "MyLocalMasjid App"
- Description: "Your masjid automatically appears in our mobile app"
- Store buttons

**Layout:**
- Can be tabs or accordion for the 3 options
- Or vertical sections with visual separation

**Dark Mode:**
- Code snippet backgrounds adjust
- Card backgrounds adjust

## Checks

- [ ] All 3 options display
- [ ] EmbedSelector works (copy code)
- [ ] Demo link works
- [ ] Dark mode works
- [ ] Mobile responsive

## Coding standards

N/A
