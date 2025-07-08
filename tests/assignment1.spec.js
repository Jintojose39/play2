


import { expect, test } from "@playwright/test";

test.describe("SauceDemo Order Flow", () => {
  test.beforeEach("Login to Application",async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

//   test('Handling Get method', async ({request}) => {
//     const response = await request.get('https://ecommerce-playground.lambdatest.io/')
//     expect(response.status()).toBe(200)
// })

// test('Handling POST method', async ({request}) => {
//     const response = await request.post('https://reqres.in/api/users',{data:{"name": "morpheus","job": "leader"},headers:{'accept':'application/json','x-api-key': 'reqres-free-v1'}})
// const responseJson = await response.json()
//     console.log(await responseJson)
//     const name = await responseJson.name
//     console.log(await name)
//     expect(response.status()).toBe(201)
//     expect(await responseJson.name).toBe('morpheus')
// })

  test("Add product to cart", async ({ page }) => {
    page.locator(`.inventory_item_label`).filter({hasText:"Sauce Labs Bike Light"})
    await page.locator(`(//button[text()="Add to cart"])[1]`).click();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  });

  test("Proceed to checkout", async ({ page }) => {
    await page.locator('(//button[text()="Add to cart"])[1]').click();
    //await page.locator(`.inventory_item_name`).filter({hasText:"Sauce Labs Backpack"}).getByRole("button",{name:"Add to cart"}).click();
   // await page.locator(`.inventory_item_label`).filter({hasText:"Sauce Labs Backpack"}).locator(`//button[text()="Add to cart"]`).click();
    await page.locator(".shopping_cart_badge").click();
    await page.locator("#checkout").click();
  });

  test("Enter shipping information", async ({ page }) => {
    await page.locator('(//button[text()="Add to cart"])[1]').click();
    //await page.locator(`.inventory_item_label`).filter({hasText:"Sauce Labs Backpack"}).locator(`//button[text()="Add to cart"]`).click();
   // await page.locator(`.inventory_item_name`).filter({hasText:"Sauce Labs Backpack"}).getByRole("button",{name:"Add to cart"}).click();
    await page.locator(".shopping_cart_badge").click();
    const priceText = await page.locator('.inventory_item_price').textContent();
    await page.locator("#checkout").click();
    await page.locator("#first-name").fill("Jinto");
    await page.locator("#last-name").fill("Jose");
    await page.locator("#postal-code").fill("1234");
    await page.locator("#continue").click();
    await expect(page.locator(".summary_subtotal_label")).toContainText(priceText);
  });

  test("Complete the order", async ({ page }) => {

    await page.locator('(//button[text()="Add to cart"])[1]').click();
    //await page.locator(`.inventory_item_label`).filter({hasText:"Sauce Labs Backpack"}).locator(`//button[text()="Add to cart"]`).click();
    await page.locator(".shopping_cart_badge").click();
    await page.locator("#checkout").click();
    await page.locator("#first-name").fill("Jinto");
    await page.locator("#last-name").fill("Jose");
    await page.locator("#postal-code").fill("1234");
    await page.locator("#continue").click();
    await page.locator("#finish").click();
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
  });

  test("Logout after order", async ({ page }) => {
   await page.locator('(//button[text()="Add to cart"])[1]').click();
    //await page.locator(`.inventory_item_label`).filter({hasText:"Sauce Labs Backpack"}).locator(`//button[text()="Add to cart"]`).click();
    await page.locator(".shopping_cart_badge").click();
    await page.locator("#checkout").click();
    await page.locator("#first-name").fill("Jinto");
    await page.locator("#last-name").fill("Jose");
    await page.locator("#postal-code").fill("1234");
    await page.locator("#continue").click();
    await page.locator("#finish").click();
    await page.locator("#react-burger-menu-btn").click();
    await page.locator("#logout_sidebar_link").click();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });
});






