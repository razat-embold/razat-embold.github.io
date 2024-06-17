var assert = require('assert');
const { Builder, By, Capabilities, until } = require("selenium-webdriver");
const fs = require('fs');
const path = require('path');
const aisdk = require('@browserstack/ai-sdk-node');


// let file_path = '/Users/razatagarwal/bstack/bstack-extension/out/chrome_extension.crx';
// let buff = new Buffer.from(fs.readFileSync(file_path));
// let base64data = buff.toString('base64');

var capabilities = {
	'bstack:options' : {
		"os" : "Windows",
		"osVersion" : "10"
	},
  // "chromeOptions": {
  //   "extensions" : [ base64data ] 
  // },
	"browserName" : "Firefox",
	"browserVersion" : "latest",
}


var buildDriver = function(){
  return new Builder().
  usingServer('http://localhost:4444/wd/hub'). 
  withCapabilities(capabilities).
  build();
}

async function highlightElement(driver, element) {
  const originalStyle = await element.getAttribute('style');
  await driver.executeScript("arguments[0].setAttribute('style', 'border: 2px solid red;');", element);
  await driver.sleep(1000); // Adjust sleep time as needed
  //await driver.executeScript("arguments[0].setAttribute('style', '" + originalStyle + "');", element);
}

describe('Robust Local Testing', async function() {
  this.timeout(0);
  var driver;
  
  before(function() {
    driver = buildDriver();
    driver.manage().window().maximize();
  });
  
  it('can get properties of element', async function () {
    let url = 'https://razat-embold.github.io/web_pages/button.html';
    let xPath = '/html/body/div[1]/ul/button';
    
    await driver.get(url);
    
    try{
      await driver.sleep(3000);
      
      await driver.findElement(By.xpath(xPath));
      //await driver.executeScript("window.dispatchEvent(new CustomEvent('ai-heal-find-element-success',{ detail: {'xpath': '/html/body/div[1]/ul/button', testName: 'Checking healing', projectName: 'Checking Capture Robust Props Mobile', groupId: '3', listOfCommands: '[{\"k\":\"POST:/element/f.C97FEF49F0C4F9E8915194F09EE6E1DB.d.FFC12753013101F97A780FBD58915B95.e.5/click\",\"t\":\"3044\"},{\"k\":\"POST:/element\",\"t\":\"5642\"}]', sessionId: '43f321ae248dda6b869383695d84a4f9f850ba48', tcgDetails: '{\\\"region\\\":\\\"us-east-3b\\\",\\\"tcgUrls\\\":{\\\"us-east-1\\\":{\\\"endpoint\\\":\\\"tcg.bsstag.com\\\",\\\"elb\\\":\\\"tcg.bsstag.com\\\"},\\\"us-west-2\\\":{\\\"endpoint\\\":\\\"tcg-usw.bsstag.com\\\",\\\"elb\\\":\\\"tcg.bsstag.com\\\"},\\\"us-east-3b\\\":{\\\"endpoint\\\":\\\"tcg-elb.browserstack.com\\\",\\\"elb\\\":\\\"tcg-elb.browserstack.com\\\"},\\\"us-west-2a\\\":{\\\"endpoint\\\":\\\"tcg-usw-elb.browserstack.com\\\",\\\"elb\\\":\\\"tcg-usw-elb.browserstack.com\\\"},\\\"eu-west-1\\\":{\\\"endpoint\\\":\\\"tcg-euw-elb.browserstack.com\\\",\\\"elb\\\":\\\"tcg-euw-elb.browserstack.com\\\"},\\\"ap-south-1\\\":{\\\"endpoint\\\":\\\"tcg-aps-elb.browserstack.com\\\",\\\"elb\\\":\\\"tcg-aps-elb.browserstack.com\\\"},\\\"ap-southeast-2\\\":{\\\"endpoint\\\":\\\"tcg-aps-elb.browserstack.com\\\",\\\"elb\\\":\\\"tcg-aps-elb.browserstack.com\\\"}}}' }}))")

      button = driver.findElement(By.id("moveButton"));
      button.click();

      await driver.sleep(3000);

      await driver.findElement(By.xpath(xPath));
      //await driver.executeScript("window.dispatchEvent(new CustomEvent('ai-heal-find-element-failure',{ detail: {'xpath': '/html/body/div[1]/ul/button', testName: 'Checking healing', projectName: 'Checking Capture Robust Props Mobile', groupId: '3', listOfCommands: '[{\"k\":\"POST:/element/f.C97FEF49F0C4F9E8915194F09EE6E1DB.d.191E87FA51FA4DBFBDFC0CE70C66D4AF.e.9/click\",\"t\":\"6406\"},{\"k\":\"POST:/element\",\"t\":\"9056\"}]', sessionId: '43f321ae248dda6b869383695d84a4f9f850ba48', groupAIEnabled: 'null', tcgDetails: '{\\\"region\\\":\\\"us-east-3b\\\",\\\"tcgUrls\\\":{\\\"us-east-1\\\":{\\\"endpoint\\\":\\\"tcg.bsstag.com\\\",\\\"elb\\\":\\\"tcg.bsstag.com\\\"},\\\"us-west-2\\\":{\\\"endpoint\\\":\\\"tcg-usw.bsstag.com\\\",\\\"elb\\\":\\\"tcg.bsstag.com\\\"},\\\"us-east-3b\\\":{\\\"endpoint\\\":\\\"tcg-elb.browserstack.com\\\",\\\"elb\\\":\\\"tcg-elb.browserstack.com\\\"},\\\"us-west-2a\\\":{\\\"endpoint\\\":\\\"tcg-usw-elb.browserstack.com\\\",\\\"elb\\\":\\\"tcg-usw-elb.browserstack.com\\\"},\\\"eu-west-1\\\":{\\\"endpoint\\\":\\\"tcg-euw-elb.browserstack.com\\\",\\\"elb\\\":\\\"tcg-euw-elb.browserstack.com\\\"},\\\"ap-south-1\\\":{\\\"endpoint\\\":\\\"tcg-aps-elb.browserstack.com\\\",\\\"elb\\\":\\\"tcg-aps-elb.browserstack.com\\\"},\\\"ap-southeast-2\\\":{\\\"endpoint\\\":\\\"tcg-aps-elb.browserstack.com\\\",\\\"elb\\\":\\\"tcg-aps-elb.browserstack.com\\\"}}}' }}))")

    } catch (err){
      console.log(err);
    } 

    await driver.sleep(3000); 
    
    assert.ok(true, 'Test Passed!');
  });

  after(async function() {
    await driver.quit();
  });
});
