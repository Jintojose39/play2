
import { expect } from '@playwright/test';
class CommonPage {
  constructor(page) {
    this.page = page;
    this.cartCount = page.locator(`.shopping_cart_badge`);
    
  }

  async click(locator) {
    await locator.waitFor({ state: 'visible' }); 
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();         
    await locator.click();
  }

  async type(selector, text) {
    await locator(selector).fill(text);
  }

  async waitForElement(selector) {
    await locator(selector).waitFor({ state: "visible" });
  }

  async getTitle() {
    return await this.page.title();
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }

  async isElementVisible(selector) {
    return await locator(selector).isVisible();
  }

}

export { CommonPage };
