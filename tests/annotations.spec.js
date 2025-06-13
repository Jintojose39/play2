import { test, expect, chromium } from "@playwright/test";
import { before } from "node:test";

test.describe("Verify the web page is launched correctly", async () => {
  test("Verify user is able to go to a website @smoke", async ({ page }) => {
    await page.goto("https://www.google.com");
    await expect.soft(page).toHaveURL("https://www.google.com");
    await expect(page).toHaveTitle("Google");

    console.log(await page.url());
    console.log(await page.title());
    expect(page).toHaveURL("https://www.google.com");

    //await page.close()
  });

  test.fixme("Verify user is able to go to a website", async ({ page }) => {
    await page.goto("https://www.google.com");

    await expect.soft(page).toHaveURL("https://www.google.com");
    await expect(page).not.toHaveTitle("Google");

    console.log(await page.url());
    console.log(await page.title());
    //expect().toHaveURL()

    await page.close();
  });
});
