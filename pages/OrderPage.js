class OrderPage {
    constructor(page) {
      this.page = page;
      this.firstName = page.locator("#first-name");
      this.lastName = page.locator("#last-name");
      this.postalCode = page.locator("#postal-code");
      this.continue = page.locator("#continue");
      this.orderSummaryPrice = page.locator(`.summary_subtotal_label`);
      this.finish = page.locator("#finish");
      this.orderCompleteMessage = page.locator(`.complete-header`);
      
    }
  
    /**
     * For Filling shipping details
     * @param {String} userName 
     * @param {String} lastName 
     * @param {String} postalCode 
     */
    async toFillTheShippingDetails(userName,lastName,postalCode) {
      await this.firstName.fill(userName);
      await this.lastName.fill(lastName);
      await this.postalCode.fill(postalCode);
      await this.continue.click();
    }
  
   
  
    
  }
  
  export { OrderPage };
  