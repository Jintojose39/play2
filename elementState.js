const{chromium}=require('playwright');


(async() =>{
    const browser=await chromium.launch();
    const page=await browser.newPage();
    await page.goto('https://demoqa.com/automation-practice-form');
    const firstname=await page.$('#firstName');
    const sportsCheck=await page.$('#hobbies-checkbox-1');
    const submitButton =await page.$('#submit');
    console.log(await firstname.isDisabled());
    console.log(await firstname.isEnabled());
    console.log(await firstname.isEditable());
    console.log(await sportsCheck.isChecked());
    console.log(await sportsCheck.isVisible());
    console.log(await submitButton.isHidden());
    console.log(await submitButton.isVisible());

    await browser.close();
})();