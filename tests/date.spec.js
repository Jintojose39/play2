import {test} from '@playwright/test'

test('Handling date', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    let sampleDate = '06/04/2025'
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()-1
    let datevalue = month + '/' + day + '/' + year
    await page.locator('[id="datepicker"]').fill(datevalue)
    await page.keyboard.press('Tab')
    await page.locator(`//input[@id="txtDate"]`).click();
    await page.locator(`.ui-datepicker-month`).selectOption({value:(month-2).toString()});
    await page.locator(`.ui-datepicker-year`).selectOption({value:year.toString()})
    await page.locator(`//a[@data-date="${day}"]`).click();
    await page.keyboard.press('Tab');
});

