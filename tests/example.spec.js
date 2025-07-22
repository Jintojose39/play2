


import { expect, test, chromium } from "@playwright/test";
import { POManager } from "../utils/POManager";
import env from "../testData/env.json"  assert { type: "json" };
import loginCredentials from "../testData/loginCredentials.json"   assert { type: "json" };

test.describe("SauceDemo Order E2E Flow", () => {

  let browser;
  let context;
  let page;
  let po;
  //let user;
  let userCreationMessage;
  test.beforeEach("Login to Application",async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
   po = new POManager(page);
    await po.getLoginPage().goToApplication(env.baseURL);
    await po.getLoginPage().enterTheCredentials(loginCredentials.userName,loginCredentials.password);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });


  // let browser;
  // let context;
  // let page;
  // let po = new POManager(page);
  // //let user;
  // let userCreationMessage;





  // test("Add product to cart", async ({ page }) => {
  //   page.locator(`.inventory_item_label`).filter({hasText:"Sauce Labs Bike Light"})
  //   await page.locator(`(//button[text()="Add to cart"])[1]`).click();
  //   await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  // });

  // test("Proceed to checkout", async ({ page }) => {
  //   await page.locator('(//button[text()="Add to cart"])[1]').click();
  //   //await page.locator(`.inventory_item_name`).filter({hasText:"Sauce Labs Backpack"}).getByRole("button",{name:"Add to cart"}).click();
  //  // await page.locator(`.inventory_item_label`).filter({hasText:"Sauce Labs Backpack"}).locator(`//button[text()="Add to cart"]`).click();
  //   await page.locator(".shopping_cart_badge").click();
  //   await page.locator("#checkout").click();
  // });

  // test("Enter shipping information", async ({ page }) => {
  //   await page.locator('(//button[text()="Add to cart"])[1]').click();
  //   //await page.locator(`.inventory_item_label`).filter({hasText:"Sauce Labs Backpack"}).locator(`//button[text()="Add to cart"]`).click();
  //  // await page.locator(`.inventory_item_name`).filter({hasText:"Sauce Labs Backpack"}).getByRole("button",{name:"Add to cart"}).click();
  //   await page.locator(".shopping_cart_badge").click();
  //   const priceText = await page.locator('.inventory_item_price').textContent();
  //   await page.locator("#checkout").click();
  //   await page.locator("#first-name").fill("Jinto");
  //   await page.locator("#last-name").fill("Jose");
  //   await page.locator("#postal-code").fill("1234");
  //   await page.locator("#continue").click();
  //   await expect(page.locator(".summary_subtotal_label")).toContainText(priceText);
  // });

  // test("Complete the order", async ({ page }) => {

  //   await page.locator('(//button[text()="Add to cart"])[1]').click();
  //   //await page.locator(`.inventory_item_label`).filter({hasText:"Sauce Labs Backpack"}).locator(`//button[text()="Add to cart"]`).click();
  //   await page.locator(".shopping_cart_badge").click();
  //   await page.locator("#checkout").click();
  //   await page.locator("#first-name").fill("Jinto");
  //   await page.locator("#last-name").fill("Jose");
  //   await page.locator("#postal-code").fill("1234");
  //   await page.locator("#continue").click();
  //   await page.locator("#finish").click();
  //   await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
  // });

  // test("Logout after order", async ({ page }) => {
  //  await page.locator('(//button[text()="Add to cart"])[1]').click();
  //   //await page.locator(`.inventory_item_label`).filter({hasText:"Sauce Labs Backpack"}).locator(`//button[text()="Add to cart"]`).click();
  //   await page.locator(".shopping_cart_badge").click();
  //   await page.locator("#checkout").click();
  //   await page.locator("#first-name").fill("Jinto");
  //   await page.locator("#last-name").fill("Jose");
  //   await page.locator("#postal-code").fill("1234");
  //   await page.locator("#continue").click();
  //   await page.locator("#finish").click();
  //   await page.locator("#react-burger-menu-btn").click();
  //   await page.locator("#logout_sidebar_link").click();
  //   await expect(page).toHaveURL("https://www.saucedemo.com/");
  // });
});






