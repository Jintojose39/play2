import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const ExcelJs = require("exceljs");
const workbook = new ExcelJs.Workbook();

async function readAndWriteExcel(filePath, searchValue, replaceValue) {
  let targetRow;
  let targetCol;
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchValue) {
        targetRow = rowNumber;
        targetCol = colNumber;
        console.log(rowNumber);
        console.log(colNumber);
      }
      //console.log(cell.value);
    });
  });
  const cell = worksheet.getCell(targetRow, targetCol);
  cell.value = replaceValue;
  await workbook.xlsx.writeFile(filePath);
}

test("Handling upload and Download", async ({ page }) => {
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );
  // Wait for the download to start
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Download" }).click(),
  ]);

  // Create download folder if not exists
  const downloadDir = path.join(__dirname, "..", "downloads");
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
  }

  // Save file to your framework folder
  const savePath = path.join(downloadDir, await download.suggestedFilename());
  await download.saveAs(savePath);
  console.log("Downloaded file saved to:", savePath);
  await readAndWriteExcel(savePath, "Mango", "Melon");
  const input = page.locator('input.upload[type="file"]');
  await input.setInputFiles(savePath);

  // If nothing reflects, try forcing a change event
  await input.evaluate((el) => {
    const event = new Event("change", { bubbles: true });
    el.dispatchEvent(event);
  });
  await expect(page.getByText("Melon")).toHaveText("Melon");
});
