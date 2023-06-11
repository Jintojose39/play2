const{chromium}=require('playwright');


(async() =>{
    const browser=await chromium.launch({headless:false,slowMo:1000});
    const page=await browser.newPage();
    await page.goto('https://login.salesforce.com/?locale=in');
    const userName=await page.$('//*[@id="username"]');
    await userName.type('jinto123',{delay:50})
    const passWord=await page.$('//*[@id="password"]');
    await passWord.type('123456',{delay:50})
    await browser.close();
})();