import {element,by,browser, ElementFinder, ElementArrayFinder} from "protractor"
import {login} from "./login"
import { scenario } from "./Scenario_Abbott";

let lgn = new login();

export class registration
{
    // drop down page 
    dropdown1 : ElementFinder;
    dropdown2 : ElementFinder;
    Continue_code : ElementFinder;

    // country page 
    country_button : ElementFinder;
    country_continue : ElementFinder;

    //Accounts page 
    yes_button : ElementArrayFinder

    //radio buttons 
    one : ElementFinder
    two : ElementFinder
    three : ElementFinder
    four : ElementFinder
    five : ElementFinder
    six : ElementFinder
    seven : ElementFinder
    eight : ElementFinder

    //salesforce variables 
    continue_salesforce: ElementFinder
    Accept_button : ElementFinder

    Reject_button : ElementFinder
   
    //Abbott variables 
    IAccept_button : ElementFinder
    IDecline_button : ElementFinder  

    GoDo_btn : ElementFinder

    constructor()
    {
       this.dropdown1 = element(by.name('Select an industry'));
       this.dropdown2 = element(by.name('Vertical available for Government industry'));
       this.Continue_code =  element(by.name('Continue'));
       this.country_button= element(by.id('mat-radio-2'));
       this.country_continue=element(by.name('Continue to Next Activity'));
       this.yes_button = element.all(by.className('plugin-single__text'));
        this.one= element(by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[1]"))
        this.two= element(by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[3]"))
        this.three= element(by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[5]"))
        this.four = element(by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[7]"))
        this.five = element(by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[9]"))
        this.six=   element(by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[11]"))
        this.seven  =element(by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[13]"))
        this.eight= element(by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[15]"))   
        this.continue_salesforce=element(by.xpath('//*[@class="plugin-common__btn-continue__text"]'));
        this.Accept_button=element(by.xpath('//span[contains(text()," Accept")]'))
        this.Reject_button=element(by.xpath('//span[contains(text()," Reject")]'))
        this.IAccept_button=element(by.xpath('/html/body/app-root/app-data-privacy/div/div/div[2]/div[2]/button[1]'))
        this.IDecline_button=element(by.xpath('//*[contains(text(),"I Decline")]'))
        this.GoDo_btn= element(by.xpath("//*[contains(text(),'Go')]"));


    }

    registration()
    {
        this.dropdown1.sendKeys("Government");

        browser.sleep(3000);

        this.dropdown2.sendKeys("Public");    
        
        browser.sleep(5000);

        this.Continue_code.click();

        browser.sleep(10000);

        this.country_button.click();

        browser.sleep(2000);

        this.country_continue.click();

        browser.sleep(10000);

        this.yes_button.first().click();

        browser.sleep(2000);

        this.country_continue.click();

        browser.sleep(5000);

        this.one.click().then(function(){browser.sleep(2000)})
        this.two.click().then(function(){browser.sleep(2000)}) 
        this.three.click().then(function(){browser.sleep(2000)})
        this.four.click().then(function(){browser.sleep(2000)}) 
        this.four.click().then(function(){browser.sleep(2000)}) 
        this.five.click().then(function(){browser.sleep(2000)}) 
        this.six.click().then(function(){browser.sleep(2000)}) 
        this.six.click().then(function(){browser.sleep(2000)}) 
        this.seven.click().then(function(){browser.sleep(2000)}) 
        this.eight.click().then(function(){browser.sleep(2000)}) 

        this.country_continue.click().then(function(){browser.sleep(10000)}) 
        


    }

    accept_privacy_salesforce()
    {
        //this.continue_salesforce.click().then(function(){browser.sleep(5000)});
        this.Accept_button.click().then(function(){browser.sleep(5000)});
        this.continue_salesforce.click().then(function(){browser.sleep(5000)});
    }

    reject_privacy_salesforce()
    {
        //this.continue_salesforce.click().then(function(){browser.sleep(5000)});
        this.Reject_button.click().then(function(){browser.sleep(5000)}); 
        lgn.Click_Salesforce(); 
    }

    accept_privacy_Abbott()
    {
       // this.IAccept_button.click().then(function(){browser.sleep(5000)});
       browser.sleep(10000)
       element(by.xpath('//*[contains(text(),"English")]')).click().then(function(){browser.sleep(10000)})
       element(by.xpath('//*[contains(text(),"Submit")]')).click().then(function(){browser.sleep(10000)})
       browser.executeScript("document.getElementsByName('I Accept')[0].click()").then(function(){browser.sleep(5000)});
       //expect(element(by.xpath('//*[contains(text(),"Get Started")]')).isPresent()).toBe(true);
       //expect(element(by.xpath('//*[contains(text(),"Being")]')).isPresent()).toBe(true);
    }

    async reject_privacy_abbott()
    {
        browser.sleep(3000)
        await browser.executeScript("document.getElementsByName('I Decline')[0].click()").then(function(){browser.sleep(6000)});
       // expect(element(by.xpath('//*[contains(text(),"Log in")]')).isPresent()).toBe(true);
    }

    Scenario_GoDo()
    {
        this.GoDo_btn.click().then(function(){browser.sleep(5000)});
    }

    
}