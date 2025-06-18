import { test, expect, chromium, firefox } from "@playwright/test";

test("Handling multiple tabs/windows", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const newTabButton = page.locator('[onclick="myFunction()"]');
  const newWindowButton = page.locator('[id="PopUp"]');
  await newWindowButton.dblclick();
  //await newTabButton.click()
  await page.waitForTimeout(1000);
  const tabs = page.context().pages();
  await expect(tabs[0]).toHaveURL(/testautomationpractice/);
  await expect(tabs[1]).toHaveURL("https://www.selenium.dev/");
  await expect(tabs[2]).toHaveURL("https://playwright.dev/");
  await tabs[0].locator("").click();
  await tabs[0].close();
  await tabs[1].context().close();
});
//const browser = await chromium.launch() or firefox.launch() or webkit.launch()
//const context = await browser.newContext()
//const page1 = await context.newPage()
//page1.goto('https://testautomationpractice.blogspot.com/')
//const page2 = await context.newPage()
//page2.goto('https://www.google.com/')
//page1.locator()
//page2.locator()
test("Running in multiple tabs", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.goto("https://www.google.com/");
  await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/");
  await expect(page).toHaveURL("https://www.google.com/");
});

test("Running in multiple windows with multiple browsers like Chromium , Firefox", async () => {
  const browser1 = await chromium.launch();
  const browser2 = await firefox.launch();
  const context1 = await browser1.newContext();
  const context2 = await browser2.newContext();
  const page1 = await context1.newPage();
  await page1.goto("https://testautomationpractice.blogspot.com/");
  const page2 = await context2.newPage();
  await page2.goto("https://www.google.com/");
  await expect(page1).toHaveURL("https://testautomationpractice.blogspot.com/");
  await expect(page2).toHaveURL("https://www.google.com/");
  await page2.context().close();
});
