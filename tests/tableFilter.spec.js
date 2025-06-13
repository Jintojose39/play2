import {test} from '@playwright/test'

test('Handling Web table', async ({page}) => {
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

    //const expectedRow = rows.filter({has:'',hasText:'Smartwatch'})
    const expectedRow = rows.filter({has:'',hasText:'Smartwatch'})
    await expectedRow.locator('[type="checkbox"]').check()

    await page.waitForTimeout(5000)

})