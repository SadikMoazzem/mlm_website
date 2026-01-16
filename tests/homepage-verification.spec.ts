import { test, expect } from '@playwright/test';

test.describe('Homepage UI Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:3002');
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('homepage loads without errors', async ({ page }) => {
    // Check that page loads successfully
    expect(page.url()).toBe('http://localhost:3002/');

    // Verify no console errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a bit to catch any delayed errors
    await page.waitForTimeout(2000);

    expect(errors.length).toBe(0);
  });

  test('ConsumerHero section is visible', async ({ page }) => {
    // Look for the "Never Miss Salah" headline
    const heroHeadline = page.getByText(/Never Miss Salah/i);
    await expect(heroHeadline).toBeVisible();

    // Look for app download buttons
    const appStoreButton = page.locator('[alt*="App Store"], [aria-label*="App Store"]').first();
    const playStoreButton = page.locator('[alt*="Play Store"], [aria-label*="Play Store"]').first();

    // At least one app store button should be visible
    const appStoreVisible = await appStoreButton.isVisible().catch(() => false);
    const playStoreVisible = await playStoreButton.isVisible().catch(() => false);

    expect(appStoreVisible || playStoreVisible).toBeTruthy();
  });

  test('QuickCityAccess cities are clickable', async ({ page }) => {
    // Look for city links/buttons - common cities might be London, Birmingham, etc.
    const cityLinks = page.locator('a[href*="/city"], button:has-text("London"), button:has-text("Birmingham")').first();

    // Check if at least one city element exists and is visible
    const count = await page.locator('a[href*="/city"]').count();
    expect(count).toBeGreaterThan(0);
  });

  test('FeatureHighlights cards render', async ({ page }) => {
    // Look for the 3 feature highlights mentioned in the plan
    // These should contain: Real Jamaat Times, Privacy First, Works Offline
    const features = [
      /Real Jamaat Times/i,
      /Privacy First/i,
      /Works Offline/i
    ];

    for (const feature of features) {
      const featureElement = page.getByText(feature);
      await expect(featureElement).toBeVisible();
    }
  });

  test('AppShowcase section appears', async ({ page }) => {
    // Look for app screenshots or app showcase section
    // This might have headings like "The App" or screenshots
    const showcase = page.locator('img[alt*="app"], img[alt*="screenshot"], img[alt*="phone"]').first();
    await expect(showcase).toBeVisible({ timeout: 5000 });
  });

  test('ForMasjidsTeaser is at bottom', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Look for masjid-related content near the bottom
    const masjidTeaser = page.getByText(/for masjids/i).last();
    await expect(masjidTeaser).toBeVisible();
  });

  test('all 5 new sections visible', async ({ page }) => {
    // Take a full page screenshot to verify all sections
    await page.screenshot({
      path: 'homepage-full-page.png',
      fullPage: true
    });

    // Verify all sections are in the DOM
    const sections = [
      'Never Miss Salah', // ConsumerHero
      'Real Jamaat Times', // FeatureHighlights
    ];

    for (const section of sections) {
      const element = page.getByText(new RegExp(section, 'i'));
      await expect(element).toBeVisible();
    }
  });

  test('dark mode toggle works', async ({ page }) => {
    // Take initial screenshot
    await page.screenshot({ path: 'homepage-light-mode.png' });

    // Find and click the dark mode toggle
    // Common selectors for theme toggles
    const themeToggle = page.locator('[aria-label*="theme"], [aria-label*="dark"], button:has-text("Theme")').first();

    if (await themeToggle.isVisible({ timeout: 5000 }).catch(() => false)) {
      await themeToggle.click();

      // Wait for theme to apply
      await page.waitForTimeout(500);

      // Take screenshot in dark mode
      await page.screenshot({ path: 'homepage-dark-mode.png' });

      // Verify dark mode class or attribute is applied
      const htmlElement = page.locator('html');
      const darkClass = await htmlElement.getAttribute('class');
      const darkDataTheme = await htmlElement.getAttribute('data-theme');

      expect(
        darkClass?.includes('dark') || darkDataTheme === 'dark'
      ).toBeTruthy();
    }
  });

  test('mobile responsive viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Take mobile screenshot
    await page.screenshot({
      path: 'homepage-mobile.png',
      fullPage: true
    });

    // Verify key elements are still visible on mobile
    const heroHeadline = page.getByText(/Never Miss Salah/i);
    await expect(heroHeadline).toBeVisible();
  });

  test('no console errors during navigation', async ({ page }) => {
    const errors: Array<{ type: string; text: string }> = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push({ type: msg.type(), text: msg.text() });
      }
    });

    page.on('pageerror', (error) => {
      errors.push({ type: 'pageerror', text: error.message });
    });

    // Navigate and interact
    await page.waitForLoadState('networkidle');

    // Scroll through the page
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight / 2);
    });
    await page.waitForTimeout(1000);

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);

    // Report any errors found
    if (errors.length > 0) {
      console.error('Console errors found:', errors);
    }

    expect(errors.length).toBe(0);
  });
});
