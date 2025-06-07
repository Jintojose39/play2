import {test} from '@playwright/test'

test(`Handling date picker 3`,async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

    await page.locator(`//p[text()="Date Picker 1 (mm/dd/yyyy): "]`).click();
    const prev = page.locator('[data-handler="prev"]');
    const next = page.locator('[data-handler = "next"]');
    const mm = page.locator('.ui-datepicker-month');
    const yy = page.locator(`.ui-datepicker-year`);
    let dateMonth = 'July'
    let yearMonth = '2023'

    while(await mm.textContent()!= dateMonth || await yy.textContent()!=yearMonth){
        await prev.click();
    }
    await page.locator(`[data-date="4"]`).click();
});