import {browser,element,by,ElementFinder} from 'protractor' ;

import { report } from 'process';

var xlsx = require('xlsx');
var workbook = xlsx.readFile('./user_credentials.xlsx');
var worksheet = workbook.Sheets['Sheet1']

export class login
{
    userId : ElementFinder;
    password : ElementFinder;
    loginBtn : ElementFinder;
    MomentaLogo : ElementFinder;
    DashboardEmail : ElementFinder
    DashboardPassword : ElementFinder

    constructor()
    {
       this.userId = element(by.id('userEmail'))
       this.password= element(by.id('password'))
       this.loginBtn=  element(by.name('Login'))
       //this.MomentaLogo= element(by.xpath("//div/div/div/*[contains(@role,'img')]"))
       this.MomentaLogo=element(by.xpath('//*[@alt="Momenta by BTS logo"][contains(.,"Momenta Logo")]'))
       this.DashboardEmail = element(by.xpath('//*[@placeholder="Email"]'));
       this.DashboardPassword = element(by.xpath('//*[@placeholder="Password"]'));
     }

     Click()
     {
       this.userId.sendKeys("jaigovt@microsoft.com").then(function(){browser.sleep(1000)})
       this.password.sendKeys("ABab12$").then(function(){browser.sleep(1000)})
       this.loginBtn.click()
     }

     Click_Salesforce()
     {
      var uname = 'B7';
      var pwd = 'C7';
      this.userId.clear();
      this.password.clear();
      this.userId.sendKeys(worksheet[uname].v).then(function(){browser.sleep(1000)})
      this.password.sendKeys(worksheet[pwd].v).then(function(){browser.sleep(1000)})
      this.loginBtn.click().then(function(){browser.sleep(3000)})
      expect(element(by.xpath('//*[@class="page__name" and contains(text(),"Privacy Policy")]')).isPresent()).toBe(true,"could not fing page header")
      expect(element(by.xpath('//*[contains(text(),"I will respect the copyright of the assessment")]')).isPresent()).toBe(true,"text mismatch");
     }

     Click_invalid_salesforce()
     {
      var uname = 'B4';
      var pwd = 'C4';
      this.userId.sendKeys(worksheet[uname].v).then(function(){browser.sleep(1000)})
      this.password.sendKeys(worksheet[pwd].v).then(function(){browser.sleep(1000)})
      this.loginBtn.click().then(function(){browser.sleep(2000)})
      expect(element(by.xpath('//*[@role="alertdialog"]')).isPresent()).toBe(true);
     }
     
     Click_revisit()
     {
      var uname = 'B10';
      var pwd = 'C10';
      this.userId.sendKeys(worksheet[uname].v).then(function(){browser.sleep(1000)})
      this.password.sendKeys(worksheet[pwd].v).then(function(){browser.sleep(1000)})
      this.loginBtn.click().then(function(){browser.sleep(3000)})
     }

      Click_Abbott()
     {
      browser.sleep(10000) 
      expect(element(by.xpath('//*[@alt="Momenta by BTS logo"][contains(.,"Momenta Logo")]')).isPresent()).toBe(true)
      this.MomentaLogo.click().then(function(){browser.sleep(5000)});
      this.userId.sendKeys("test_unique802@abbott.com").then(function(){browser.sleep(1000)})
      this.password.sendKeys("ABab12$").then(function(){browser.sleep(1000)})
      this.loginBtn.click().then(function(){browser.sleep(10000)});
      //expect(element(by.xpath("//img[contains(@src,'login.svg')]")).isPresent()).toBe(true);
     }

     click_AbbottDashboard()
     {
      this.DashboardEmail.sendKeys("gunjan.dadhich@abbott.com");
      this.DashboardPassword.sendKeys("ABab12$").then(function(){browser.sleep(2000)});
      element(by.xpath("//span[contains(.,'Login')]")).click().then(function(){browser.sleep(2000)});
      expect(element(by.xpath('//*[contains(text(),"Search for an ")]')).isPresent()).toBe(true)
     }

     click_wonderfulcompany()
     {
      this.DashboardEmail.sendKeys("analytics@wonderful.com");
      this.DashboardPassword.sendKeys("ABab12$").then(function(){browser.sleep(2000)});
      element(by.xpath("//span[contains(.,'Login')]")).click().then(function(){browser.sleep(2000)});
      expect(element(by.xpath('//*[contains(text(),"Search for an ")]')).isPresent()).toBe(true);
     }
     

 }