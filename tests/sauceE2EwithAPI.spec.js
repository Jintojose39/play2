import { expect, test, chromium, request } from '@playwright/test';
import { POManager } from '../utils/POManager.js'; // Add .js if using ESM
import env from '../testData/env.json' assert { type: 'json' };
import loginCredentials from '../testData/loginCredentials.json' assert { type: 'json' };
import testData from '../testData/testData.json' assert { type: 'json' };


test.describe.serial("SauceDemo Order E2E Flow", () => {
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

});
