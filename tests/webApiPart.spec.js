import { expect, test } from "@playwright/test";

let page;
let webContext;
test.describe("SauceDemo Order Flow", () => {
  test.beforeAll("Login to Application",async ({ browser }) => {
     const context = await browser.newContext();
     page = await context.newPage();
     await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await context.storageState({path:'state.json'})
    webContext =await browser.newContext({storageState :'state.json'})
  });


  test("validate the url",async ()=>{
     const page = await webContext.newPage()
     await page.goto("https://www.saucedemo.com/");
     await expect(page).toHaveURL("https://www.saucedemo.com");
     
  })



});