import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.po = null;
    this.productName = null;
    this.priceText = null;
    this.attach = null;
  }
}

setWorldConstructor(CustomWorld);
