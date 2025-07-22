import { BeforeAll, AfterAll, Before, After } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { POManager } from "../../../utils/POManager.js";

let browser;
let context;
let page;
let poManager;

BeforeAll(async function () {
  console.log("✅ BeforeAll: launching browser once");
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();
  page = await context.newPage();
  poManager = new POManager(page);
});

Before(async function () {
  // Assign shared objects to each scenario's world (`this`)
  this.browser = browser;
  this.context = context;
  this.page = page;
  this.po = poManager;
});

After(async function (scenario) {
  if (scenario.result?.status === "FAILED") {
    const screenshot = await page.screenshot();
    await this.attach(screenshot, "image/png");
  }
});

AfterAll(async function () {
  console.log("🧹 AfterAll: closing browser");
  await browser?.close();
});
