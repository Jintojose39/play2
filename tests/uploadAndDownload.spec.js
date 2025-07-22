import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Equivalent of __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Excel workbook instance
const workbook = new ExcelJS.Workbook();

// Utility function to read and write Excel
async function readAndWriteExcel(filePath, searchValue, replaceValue) {
  let targetRow;
  let targetCol;

  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchValue) {
        targetRow = rowNumber;
        targetCol = colNumber;
        console.log('Match at row:', rowNumber, 'col:', colNumber);
      }
    });
  });

  const cell = worksheet.getCell(targetRow, targetCol);
  cell.value = replaceValue;

  await workbook.xlsx.writeFile(filePath);
}

test('Handling upload and download with Excel modification', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

  // Trigger download and wait for it
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Download' }).click(),
  ]);

  // Create downloads directory
  const downloadDir = path.join(__dirname, '..', 'downloads');
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  // Save downloaded file
  const savePath = path.join(downloadDir, await download.suggestedFilename());
  await download.saveAs(savePath);
  console.log('Downloaded file saved to:', savePath);

  // Modify Excel file
  await readAndWriteExcel(savePath, 'Mango', 'Melon');

  // Upload modified file
  const input = page.locator('input.upload[type="file"]');
  await input.setInputFiles(savePath);

  // Dispatch change event (to trigger UI update)
  await input.evaluate((el) => {
    const event = new Event('change', { bubbles: true });
    el.dispatchEvent(event);
  });

  // Verify the updated value appears
  await expect(page.getByText('Melon')).toHaveText('Melon');
});
