import {test, expect} from '@playwright/test'

test('Handling uploading single file', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator(`#singleFileInput`).scrollIntoViewIfNeeded();
    //await page.locator(`#singleFileInput`).click();
    await page.locator(`#singleFileInput`).setInputFiles('tests/upload/upload_file.txt');
    await page.waitForTimeout(5000)
})
test('Handling uploading multiple files', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator(`#multipleFilesInput`).scrollIntoViewIfNeeded();
    //await page.locator(`#singleFileInput`).click();
    await page.locator(`#multipleFilesInput`).setInputFiles([`tests/upload/upload_file.txt`,`tests/upload/upload_file1.txt`]);
    await page.waitForTimeout(5000)

    
    })

   