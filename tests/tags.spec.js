import {expect, test} from '@playwright/test'


test('@smoke Handling Web table', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    const table = page.locator('[id="productTable"]')
    //const rows = table.locator('//tr') //array of rows in the table
    const rows = page.locator('//table[@id="productTable"]//tr')
    const columns = table.locator('//thead/tr/th')
    const firstColumnHeader = await columns.nth(0).textContent()
    console.log(firstColumnHeader)

    //console.log(rows)
    console.log(await rows.count())
    console.log(columns.count())

    await selectItem(page,rows,'Smartwatch')
    await selectItem(page,rows,'Smartphone')



    await page.waitForTimeout(5000)

})
async function selectItem(browser,row,a) {

    let expectedRow = row.filter({has: browser.locator('td'),hasText:a})
    await expectedRow.locator('[type="checkbox"]').check()

}

//npx playwright test tag.spec.js --project=chromium --headed --grep @smoke