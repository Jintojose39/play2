import { test, expect } from "../utils/fixtures.js";
import env from "../testData/env.json" assert { type: "json" };
import loginCredentials from "../testData/loginCredentials.json" assert { type: "json" };
import testData from "../testData/testData.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config();

test.describe.serial("SauceDemo Order E2E Flow", () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToApplication(env.baseURL);
    await loginPage.enterTheCredentials(
      loginCredentials.userName,
      loginCredentials.password
    );
  });

  test(`Add "${testData.productName}" product to cart`, async ({ page, commonPage, cartPage }) => {

    await test.step("Validate login success", async () => {
      await expect(page).toHaveURL(process.env.INVENTORY_URL);
    });

    await test.step("Add product to cart", async () => {
      await commonPage.click(cartPage.productClick);
      await commonPage.click(cartPage.addToCartButton);
    });

    await test.step("Validate cart count", async () => {
      await expect(commonPage.cartCount).toHaveText(testData.productCount);
    });
  });

  test("User is able to proceed to checkout", async ({ commonPage, cartPage, checkOutPage }) => {

    // 🔥 Prepare state again
    await commonPage.click(cartPage.productClick);
    await commonPage.click(cartPage.addToCartButton);

    await test.step("Go to cart and checkout", async () => {
      await commonPage.cartCount.click();
      await commonPage.click(checkOutPage.checkOutButton);
    });

    await test.step("Validate checkout page", async () => {
      await expect(checkOutPage.checkoutTitle).toHaveText(
        testData.CheckoutTitle
      );
    });
  });

  test("User is able to fill the shipping information", async ({ commonPage, cartPage, checkOutPage, orderPage }) => {

    // 🔥 Prepare full flow again
    await commonPage.click(cartPage.productClick);
    await commonPage.click(cartPage.addToCartButton);
    await commonPage.cartCount.click();
    await commonPage.click(checkOutPage.checkOutButton);

    await test.step("Enter shipping details", async () => {
      await orderPage.toFillTheShippingDetails(
        testData.firstName,
        testData.lastName,
        testData.postalCode
      );
    });

    await test.step("Validate order summary", async () => {
      await expect(orderPage.orderSummaryPrice).toBeVisible();
    });
  });

  test(`Complete the order for ${testData.productName}`, async ({ commonPage, cartPage, checkOutPage, orderPage }) => {

    // 🔥 Prepare full flow again
    await commonPage.click(cartPage.productClick);
    await commonPage.click(cartPage.addToCartButton);
    await commonPage.cartCount.click();
    await commonPage.click(checkOutPage.checkOutButton);

    await orderPage.toFillTheShippingDetails(
      testData.firstName,
      testData.lastName,
      testData.postalCode
    );

    await test.step("Finish order", async () => {
      await commonPage.click(orderPage.finish);
    });

    await test.step("Validate order confirmation", async () => {
      await expect(orderPage.orderCompleteMessage).toHaveText(
        testData.orderConfirmMessage
      );
    });
  });

});