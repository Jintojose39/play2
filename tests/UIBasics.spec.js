import { test, expect } from "@playwright/test";

test("Page playwright test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator(`//*[@id="username"]`).fill('rahulshettyacademy');
  await page.locator(`//*[@id="password"]`).fill('wrong');
  await page.locator(`#signInBtn`).click();
  console.log(await page.locator('[style*="block"]').textContent());
  await expect(page.locator('[style*="block"]')).toContainText('Incorrect username/password.');
});

test("Page playwright with browser", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://google.com");
  // Expect a title "to contain" a substring.
  let pageTitle = await page.title();
  await expect(page).toHaveTitle(pageTitle);
});
