
import { LoginPage } from '../pages/LoginPage.js';
import {CartPage} from '../pages/CartPage.js'
import { CheckOutPage } from '../pages/CheckOutPage.js';
import { OrderPage } from '../pages/OrderPage.js';
import { CommonPage } from '../pages/CommonPage.js';
/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.cartPage = new CartPage(page);
    this.checkOutPage = new CheckOutPage(page);
    this.orderPage = new OrderPage(page);
   this.commonPage = new CommonPage(page);
  }

  

  getLoginPage() {
    return this.loginPage;
  }

  getCartPage() {
    return this.cartPage;
  }
  getCheckOutPage() {
    return this.checkOutPage;
  }
  getOrderPage() {
    return this.orderPage;
  }
  getCommonPage() {
    return this.commonPage;
  }
}
