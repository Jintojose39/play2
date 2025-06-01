// @ts-check
import { test, expect } from '@playwright/test';

test('To click gmail link from google', async ({ page }) => {
  await page.goto('https://www.google.com');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Google/);
});

