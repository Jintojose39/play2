import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckOutPage } from '../pages/CheckOutPage.js';
import { OrderPage } from '../pages/OrderPage.js';
import { CommonPage } from '../pages/CommonPage.js';

// Extend base test with fixtures for page objects
export const test = base.extend({
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

export { expect } from '@playwright/test';
