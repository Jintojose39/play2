import {test, expect} from '@playwright/test'

test('Handling simple alert', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain('I am an alert box!')
        await page.waitForTimeout(2000)
        await dialog.accept()
    })

    await page.locator('[id="alertBtn"]').click()

})
test('Handling confirmation alert', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    page.on('dialog', async dialog => {
        expect.soft(dialog.type()).toContain('confirm')
        expect(dialog.message()).toContain('Press a button!')
        await page.waitForTimeout(2000)
        //await dialog.accept() //Ok button
        await dialog.dismiss() //Cancel button
    })

    await page.locator('[id="confirmBtn"]').click()

    await page.waitForTim

await page.waitForTimeout(5000)
})
test('Handling prompt alert', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')


    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('prompt')
        expect(dialog.message()).toContain('Please enter your name:')
        //dialog.defaultValue('abcd')
        expect(dialog.defaultValue()).toContain('Harry Potter')
        await dialog.accept('abcd')
    })

    await page.locator('[id="promptBtn"]').click()
})