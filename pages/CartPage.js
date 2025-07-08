

class CartPage{
    constructor(page) {
      this.addToCartButton= page.locator(`(//button[text()="Add to cart"])[1]`);
      this.productClick = page.locator(`//div[text()="Sauce Labs Backpack"]`);
      this.cartFilter = page.locator(`.inventory_item_label`);
      
    }
  
    /**
     * Click on Add to Cart
     */
    async clickOnAddToCart() {
      await this.addToCartButton.click();
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
  
  export { CartPage };
  