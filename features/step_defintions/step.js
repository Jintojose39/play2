import { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, expect } from '@playwright/test';
import { POManager } from '../../utils/POManager.js';
import env from '../../testData/env.json' assert { type: 'json' };
import loginCredentials from '../../testData/loginCredentials.json' assert { type: 'json' };
import testData from '../../testData/testData.json' assert { type: 'json' };

let browser;
let context;
let page;
let po;
let priceText;
let productName;

setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  po = new POManager(page);

  await po.getLoginPage().goToApplication(env.baseURL);
  await po.getLoginPage().enterTheCredentials(
    loginCredentials.userName,
    loginCredentials.password
  );
});

AfterAll(async () => {
  await browser.close();
});

When('the user navigates to the home page', async () => {
  await expect(page).toHaveURL(testData.sauceDemoUrl);
});

When('the user adds {string} to the cart', async (product) => {
  productName = product;
  await po.getCommonPage().click(po.getCartPage().productClick);
  await po.getCommonPage().click(po.getCartPage().addToCartButton);
});

Then('the cart count should be {string}', async (expectedCount) => {
  await expect(po.getCommonPage().cartCount).toHaveText(expectedCount);
});

When('the user clicks on the cart badge', async () => {
  await po.getCommonPage().cartCount.click();
});

When('the user proceeds to checkout', async () => {
  priceText = await po.getCheckOutPage().productPrice.textContent();
  await po.getCommonPage().click(po.getCheckOutPage().checkOutButton);
});

Then('the checkout title should be {string}', async (expectedTitle) => {
  await expect(po.getCheckOutPage().checkoutTitle).toHaveText(expectedTitle);
});

When('the user enters the shipping details', async function (dataTable) {
  const data = dataTable.rowsHash();
  await po.getOrderPage().toFillTheShippingDetails(
    data.firstName,
    data.lastName,
    data.postalCode
  );
});

Then('the product price should match the selected item', async () => {
  await expect(po.getOrderPage().orderSummaryPrice).toContainText(priceText);
});

When('the user clicks on the finish button', async () => {
  await po.getCommonPage().click(po.getOrderPage().finish);
});

Then('the user should see the confirmation message {string}', async (expectedMessage) => {
  await expect(po.getOrderPage().orderCompleteMessage).toHaveText(expectedMessage);
});

When('the user logs out', async () => {
  await po.getLoginPage().logOutFromApplication();
});

Then('the user should be navigated to the login page', async () => {
  await expect(page).toHaveURL(env.baseURL);
});

