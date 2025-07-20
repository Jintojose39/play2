// tests/visual.spec.js
const { test } = require("@playwright/test");
require('dotenv').config();

const {
  Eyes,
  VisualGridRunner,
  Target,
  Configuration,
  BrowserType,
  DeviceName,
} = require("@applitools/eyes-playwright");

test("Visual validation with Applitools and Playwright", async ({ page }) => {
  const runner = new VisualGridRunner({ testConcurrency: 5 });
  const eyes = new Eyes(runner);
  const config = new Configuration();
  config.setApiKey(process.env.APPLITOOLS_API_KEY);
  console.log("Loaded API Key:", process.env.APPLITOOLS_API_KEY);
  config.setAppName("Applitools Playwright Demo");
  config.setTestName("Home Page Visual Test");
  config.addBrowser(1200, 800, BrowserType.CHROME);
  config.addBrowser(1200, 800, BrowserType.FIREFOX);
  config.addDeviceEmulation(DeviceName.iPhone_X);
  eyes.setConfiguration(config);
  await eyes.open(page);
  await page.goto("https://www.saucedemo.com/");
  await eyes.check("Home Page", Target.window());
  await eyes.close();
});
