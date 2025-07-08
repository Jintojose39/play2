import { expect, test, chromium } from "@playwright/test";
import { POManager } from "../utils/POManager";
import env from "../testData/env.json";
import loginCredentials from "../testData/loginCredentials.json";
import testData from "../testData/testData2.json";

testData.forEach((user, index) => {
test.describe.serial(`SauceDemo Order E2E Flow :${user.productName,index+1}`, () => {
  let browser;
  let context;
  let page;
  let po;
  let priceText;
  test.beforeAll("Login to Application", async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    po = new POManager(page);
    await po.getLoginPage().goToApplication(env.baseURL);
    await po
      .getLoginPage()
      .enterTheCredentials(
        loginCredentials.userName,
        loginCredentials.password
      );
  });

  test(`${index+1} :Add  "${user.productName}" product to cart`, async () => {
    await test.step("Login to Sauce Demo Application and validate the url", async () => {
      await expect(page).toHaveURL(user.sauceDemoUrl);
    });
    await test.step(`Click on Add to cart button`, async () => {
      await po.getCommonPage().click(po.getCartPage().productClick);
      await po.getCommonPage().click(po.getCartPage().addToCartButton);
    });
    await test.step(`Verify that product should be added to the cart and cart count is to be ${user.productCount}`, async () => {
      await expect(po.getCommonPage().cartCount).toHaveText(
        user.productCount
      );
    });
  });

  test(`${index+1} :User is able to Proceed the checkout`, async () => {
    await test.step(`Click on cart badge and proceed check out process`, async () => {
      await po.getCommonPage().cartCount.click();
      await po.getCommonPage().click(po.getCommonPage().cartCount);
      priceText = await po.getCheckOutPage().productPrice.textContent();
      await po.getCommonPage().click(po.getCheckOutPage().checkOutButton);
    });
    await test.step(`Verify the title as "${user.CheckoutTitle}"after navigate from checkout page`, async () => {
      await expect(po.getCheckOutPage().checkoutTitle).toHaveText(
        user.CheckoutTitle
      );
    });
  });
  test(`${index+1} :User is able to fill the shipping information`, async () => {
    await test.step(`Enter the shipping details and click on Continue`, async () => {
      await po
        .getOrderPage()
        .toFillTheShippingDetails(
          user.firstName,
          user.lastName,
          user.postalCode
        );
    });
    await test.step(`Verify the price of the ordered product should be: "${priceText}"`, async () => {
      await expect(po.getOrderPage().orderSummaryPrice).toContainText(
        priceText
      );
    });
  });

  test(`${index+1}: Complete the order for :${user.productName} `, async () => {
    await test.step(`User is able to complete the order and validate the order message "${user.orderConfirmMessage}"`, async () => {
      await po.getCommonPage().click(po.getOrderPage().finish);
      await expect(po.getOrderPage().orderCompleteMessage).toHaveText(
        user.orderConfirmMessage
      );
    });
  });

  test.afterAll("Logout from the application", async () => {
    await po.getLoginPage().logOutFromApplication();
    await expect(page).toHaveURL(env.baseURL);
    await browser.close();
  });
});

});
