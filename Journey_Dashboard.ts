import {browser, element,by} from "protractor"
import { login } from "./login";
var mail = require('./feature/sendmail.js');


let lgn = new login();

describe('Dashboard Sanity suite',function()
{

    browser.ignoreSynchronization=true;
    it('verify login functionality',function()
    {
        browser.get('https://maadendashboard.btsmomenta.com/#/login');
        expect(browser.getTitle()).toEqual('Momentadashboardapp');
        browser.driver.manage().window().maximize();
        element(by.xpath("//input[contains(@id,'mat-input-0')]")).sendKeys('gunjan.dadhich@maaden.com').then(function(){browser.sleep(3000)})
        element(by.xpath("//input[contains(@id,'password__field')]")).sendKeys('ABab12$').then(function(){browser.sleep(3000)});
        element(by.xpath("//span[@class='mat-button-wrapper'][contains(.,'Login')]")).click().then(function(){browser.sleep(3000)});
        element(by.xpath('//*[contains(text(),"Dashboard")]')).click().then(function(){browser.sleep(10000)})
        mail.send();
    })

    it('verify by clicking on checkbox', function()
    {
        browser.switchTo().frame(element(by.xpath('//iframe[@src]')).getWebElement());
        element(by.xpath('//*[contains(text(),"Pre-Work")]')).click().then(function(){browser.sleep(5000)})
        element(by.xpath('//*[contains(text(),"Welcome!")]')).click().then(function(){browser.sleep(7000)})
        element(by.xpath('//*[contains(text(),"Welcome!")]')).click().then(function(){browser.sleep(7000)})
    
        expect(element(by.xpath('//*[contains(text(),"ACTIVE USERS")]')).isPresent()).toBe(true)
        let text = `Count of value.user.name 19.`;
        let numberPattern = /\d+/g;
        let results = text.match(numberPattern);
        if (results != null) {
            let number = results[0];
            console.log("number is" + number);
                            }
        //expect(element(by.tagName('tspan')).getText()).toBe('19')
       // var elements = element.getElementsByTagName(tagName)
        //let elements = element(by.tagName('svg'));
        //console.log("elements is" + elements)
        //let x = String(element(by.xpath('//*[@class="value"]//*')).getText());
        //console.log("the output is" + x);

        element(by.xpath('//*[@class="value"]//*[contains(text(),"19")]')).getText().then(function(text)
        {
            console.log("x is " + text)
            expect(text).toBeGreaterThan(20);
        });

        

        
        //expect(element(by.xpath('//*[@class="value"]//*[contains(text(),"19")]')).isPresent()).toBeGreaterThan(2)

            
                
    })

    it('Verify by clicking on downlinks',function()
    {
        element(by.xpath('//*[contains(text(),"Login Trends")]')).click().then(function(){browser.sleep(5000)})
    })

    it('Verify click on SELECT Location drop down',function()
    {
        element(by.xpath('//*[@aria-label="value.user.location,  All"]')).click().then(function(){browser.sleep(5000)});
        element(by.xpath('//*[contains(text(),"Asia/Dubai")]')).click().then(function(){browser.sleep(5000)});
        element(by.xpath('//*[contains(text(),"Asia/Kuwait")]')).click().then(function(){browser.sleep(5000)});
        element(by.xpath('//*[contains(text(),"Europe/Madrid")]')).click().then(function(){browser.sleep(5000)});
    })

    it('Verify Stage dropdown',function()
    {
        element(by.xpath('//*[@aria-label="value.stageName,  All"]')).click().then(function(){browser.sleep(5000)});
        element(by.xpath('//*[contains(text(),"Welcome to the")]')).click().then(function(){browser.sleep(5000)});
    })

    it('Verify NPS for the list given users',function()
    {
        element(by.xpath('//*[contains(text(),"list users")]')).click().then(function(){browser.sleep(5000)});
    })

    it('Verify Post given list page',function()
    {
        element(by.xpath('//*[contains(text(),"POST_GIVEN_LIST")]')).click().then(function(){browser.sleep(5000)});
    })
})