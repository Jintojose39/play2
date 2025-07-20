import { CommonPage } from "./CommonPage.js";
class CheckOutPage extends CommonPage {
    constructor(page){
      super(page);
      this.page = page;
      this.checkOutButton = page.locator("#checkout");
      this.checkoutTitle = page.locator(`.title`);
      this.productPrice = page.locator('.inventory_item_price');
      
    }
  
    async goToApplication(url) {
      await this.page.goto(url);
    }
  
    async goToMyAccountAndLogin() {
      await this.myAccount.hover();
      await this.loginButton.click();
      await this.page.waitForTimeout(3000);
    }
    async enterTheCredentials(userName,password) {
      await this.userName.fill(userName);
      await this.password.fill(password);
      await this.loginButton.click();
    }
  
    async validLogin(username, password) {
      await this.userName.fill(username);
      await this.password.fill(password);
      await this.signInButton.click();
      //await this.page.waitForLoadState("networkidle");
    }
  }
  
  export { CheckOutPage };
  