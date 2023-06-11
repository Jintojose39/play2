const{firefox}=require('playwright');


(async() =>{
    const browser=await firefox.launch({headless:false,slowMo:1000});
    const page=await browser.newPage();
    await page.goto('https://www.w3schools.com/howto/howto_css_custom_checkbox.asp');
    
    const checks=await page.$$('#main div:nth-child(1) input[type="checkbox"]');
    await checks[0].check();
    await checks[1].check();
    const radio=await page.$$('#main div:nth-child(1) input[type="radio"]');
    await radio.check[1].check();
    await radio.check[0].check();
    await browser.close();
})();