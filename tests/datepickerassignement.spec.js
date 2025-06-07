import { test } from "@playwright/test";

test("Handling date", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  let sampleDate = "06/04/2025";
  let sampledate = "06/April/2025";
  let dateMonthYear = sampleDate.split("/"); // split the string into multiple strings
  let date = parseInt(dateMonthYear[0]); //to convert string to number. '06' to '6'
  let month = parseInt(dateMonthYear[1]); //to convert string to number. '04' to '4'
  let year = parseInt(dateMonthYear[2]);
  await page.locator('[id="txtDate"]').click();
  let monthdropdown = page.locator('[class="ui-datepicker-month"]');
  await monthdropdown.selectOption({ value: (month - 1).toString() }); //convert number '4' to string '4'
  let yeardropdown = page.locator('[class="ui-datepicker-year"]');
  await yeardropdown.selectOption({ value: year.toString() }); //convert number '2025' to string '2025'
  await page.locator('[data-date="' + date + '"]').click();
  await page.waitForTimeout(10000);
});
