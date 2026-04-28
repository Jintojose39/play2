



import { expect, test as base, chromium } from "@playwright/test";
import { POManager } from "../utils/POManager";
import { LoginPage } from "../pages/LoginPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckOutPage } from "../pages/CheckOutPage.js";
import { OrderPage } from "../pages/OrderPage.js";
import { CommonPage } from "../pages/CommonPage.js";
import env from "../testData/env.json"  assert { type: "json" };
import loginCredentials from "../testData/loginCredentials.json"   assert { type: "json" };

// Extend base test with fixtures for page objects
const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkOutPage: async ({ page }, use) => {
    await use(new CheckOutPage(page));
  },
  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  },
  commonPage: async ({ page }, use) => {
    await use(new CommonPage(page));
  },
});

/**
 * @typedef {import('@playwright/test').Page} Page
 * @typedef {import('../pages/LoginPage').LoginPage} LoginPage
 * @typedef {import('../pages/CartPage').CartPage} CartPage
 * @typedef {import('../pages/CheckOutPage').CheckOutPage} CheckOutPage
 * @typedef {import('../pages/OrderPage').OrderPage} OrderPage
 * @typedef {import('../pages/CommonPage').CommonPage} CommonPage
 */

test.describe("SauceDemo Order E2E Flow", () => {

  test.beforeEach("Login to Application", async ({ page, loginPage }) => {
    await loginPage.goToApplication(env.baseURL);
    await loginPage.enterTheCredentials(loginCredentials.userName, loginCredentials.password);
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






