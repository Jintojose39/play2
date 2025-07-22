import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import env from "../../testData/env.json" assert { type: "json" };
import loginCredentials from "../../testData/loginCredentials.json" assert { type: "json" };
import testData from "../../testData/testData.json" assert { type: "json" };

setDefaultTimeout(60 * 1000);

let priceText = "";
let productName = "";

Given(
  "the user navigates to the home page with {string}",
  async function (username) {
    await this.po.getLoginPage().goToApplication(env.baseURL);
    await this.po
      .getLoginPage()
      .enterTheCredentials(
        loginCredentials.userName,
        loginCredentials.password
      );
    await expect(this.page).toHaveURL(testData.sauceDemoUrl);
  }
);

When("the user adds {string} to the cart", async function (product) {
  productName = product;
  await this.po.getCommonPage().click(this.po.getCartPage().productClick);
  await this.po.getCommonPage().click(this.po.getCartPage().addToCartButton);
});

Then("the cart count should be {string}", async function (expectedCount) {
  await expect(this.po.getCommonPage().cartCount).toHaveText(expectedCount);
});

When("the user clicks on the cart badge", async function () {
  await this.po.getCommonPage().cartCount.click();
});

When("the user proceeds to checkout", async function () {
  priceText = await this.po.getCheckOutPage().productPrice.textContent();
  await this.po.getCommonPage().click(this.po.getCheckOutPage().checkOutButton);
});

Then("the checkout title should be {string}", async function (expectedTitle) {
  await expect(this.po.getCheckOutPage().checkoutTitle).toHaveText(
    expectedTitle
  );
});

When("the user enters the shipping details", async function (dataTable) {
  const data = dataTable.rowsHash();
  await this.po
    .getOrderPage()
    .toFillTheShippingDetails(data.firstName, data.lastName, data.postalCode);
});

Then("the product price should match the selected item", async function () {
  await expect(this.po.getOrderPage().orderSummaryPrice).toContainText(
    priceText
  );
});

When("the user clicks on the finish button", async function () {
  await this.po.getCommonPage().click(this.po.getOrderPage().finish);
});

Then(
  "the user should see the confirmation message {string}",
  async function (expectedMessage) {
    await expect(this.po.getOrderPage().orderCompleteMessage).toHaveText(
      expectedMessage
    );
  }
);

When("the user logs out", async function () {
  await this.po.getLoginPage().logOutFromApplication();
});

Then("the user should be navigated to the login page", async function () {
  await expect(this.page).toHaveURL(env.baseURL);
});
