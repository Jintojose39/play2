
import {test,expect,chromium} from '@playwright/test'

test.describe.serial('Tab and Window Handling', async () => {

test('Handling multiple tabs', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    test.step('Click the Start button', async () => {
    await page.locator('[onclick="myFunction()"]').click()
    })

    await page.waitForTimeout(2000)
    const tabs = await page.context().pages()
await expect(tabs[1]).toHaveURL('https://www.pavantestingtools.com/')
})

test('Creating new tabs', async () => {
    const mybrowser = await chromium.launch()
    const mycontext1 = await mybrowser.newContext()
    const mycontext2 = await mybrowser.newContext()
    const mybrowser1Tab = await mycontext1.newPage()
    const mybrowser2Tab = await mycontext2.newPage()
    await mybrowser1Tab.goto('https://testautomationpractice.blogspot.com/')
    await mybrowser2Tab.goto('https://www.saucedemo.com/')

})
test('Creating new tabs with multiple users', async () => {
    const mybrowser = await chromium.launch()
    const mycontext = await mybrowser.newContext()
    const mytab1 = await mycontext.newPage()
    const mytab2 = await mycontext.newPage()
    await mytab1.goto('https://testautomationpractice.blogspot.com/')
    await mytab2.goto('https://www.saucedemo.com/')
    await mytab1.locator('[name="start"]').click()
    await mytab2.locator('[id="login-button"]').click()
    await mytab1.waitForTimeout(5000)

await mytab1.close()

})

})
