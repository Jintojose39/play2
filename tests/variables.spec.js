import {test, expect} from '@playwright/test'

test('Handling Mouse Hover', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator(".dropbtn").scrollIntoViewIfNeeded()
    await page.locator(".dropbtn").hover();
})

test('Handling Double Click', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator(`//button[text()="Copy Text"]`).scrollIntoViewIfNeeded()
    await page.locator(`//button[text()="Copy Text"]`).dblclick();
})
test('Handling Drag and Drop', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator(`//p[text()="Drag me to my target"]`).dragTo(await page.locator(`//p[text()="Drop here"]`));
})
test('Handling Keywords Actions', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator(`.wikipedia-search-input`).fill(`Google`);
    await page.keyboard.press('Enter'); 
})

test.only('Read data from text area', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForFunction(() => document.readyState === 'complete');
    await page.locator(`#name`).fill('Jinto');
    let inputText= await page.locator(`#name`).inputValue();
    console.log(inputText);
    
})
