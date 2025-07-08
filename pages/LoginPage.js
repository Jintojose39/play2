class LoginPage {
    constructor(page) {
      this.page = page;
      this.userName = page.locator(`#user-name`);
      this.password = page.locator(`#password`);
      this.loginButton = page.locator(`#login-button`);
      this.signInButton = page.locator(`[value='Login']`);
      this.menuButton =page.locator(`#react-burger-menu-btn`);
      this.logOutSideBar =page.locator(`#logout_sidebar_link`);
    }
  
    async goToApplication(url) {
      await this.page.goto(url);
    }
  
  
    async enterTheCredentials(userName,password) {
      await this.userName.fill(userName);
      await this.password.fill(password);
      await this.loginButton.click();
    }

    async logOutFromApplication(){
      await this.menuButton.click();
      await this.logOutSideBar.click();
      //await browser.close();

    }
  
  }
  
  export { LoginPage };
  