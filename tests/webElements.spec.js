import {expect,test} from '@playwright/test'

test('Handling different web elements', async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    await page.locator('id=name').fill('abcd') //textbox
    await page.locator('[for="male"]').check() //radio button
    await page.locator('[for="sunday"]').check() //checkbox
    await page.waitForTimeout(2000)
    await page.locator('[for="sunday"]').uncheck() //checkbox
await page.locator('id=country').selectOption({label:'Canada'}) //dropdown
    await page.locator('id=country').selectOption('United Kingdom') //dropdown
    await page.locator('id=country').selectOption({'value':'germany'}) //dropdown
    await page.locator('id=country').selectOption({index:4}) //dropdown
    await page.selectOption('id=country','Australia') //dropdown

    await page.selectOption('id=animals',['Cat','Deer'])

    await page.locator('[name="start"]').click()
await page.locator('[id="apple"]').click()

    await page.waitForTimeout(5000)

})