import { expect, test } from "@playwright/test";
import fs from 'fs';

test("Handling download file", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo"
  );
  await page.locator(`#textbox`).fill("download");
  await page.keyboard.press("ArrowRight");
  await page.locator(`#create`).click();

  const download = await Promise.all([
    page.waitForEvent("download"),
    page.locator(`#link-to-download`).click(),
  ]);
  const fileName = download[0].suggestedFilename();
  await download[0].saveAs(fileName);
  const fileExists = fs.existsSync(fileName);
  expect(fileExists).toBe(true);

  if (fileExists) {
     fs.unlinkSync(fileName);
     console.log(`🧹 Cleaned up downloaded file: ${fileName}`);
   }
});
