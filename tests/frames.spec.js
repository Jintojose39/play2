import {test,expect} from '@playwright/test'

test('Handling frames', async ({page}) => {
    await page.goto('https://ui.vision/demo/webtest/frames/')
    await page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_1.html'}).locator('[name="mytext1"]').fill('sample text')

    await (page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'}).childFrames())[0].locator('//div[@id="i6"]/div[@class="vd3tt"]').check()
    await page.waitForTimeout(5000)
})
//page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1.html'})

//page.frame([name='attrbiute_value'])

//page.frameLocator('xpath').locator([id=''])

//page.frames()[0].locator('[name="mytext1"])

//(page.frame({url:'url_value'}).childFrames())[0].locator('attribute='value').click()
