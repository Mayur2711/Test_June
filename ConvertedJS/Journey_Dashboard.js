"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var login_1 = require("./login");
var mail = require('./feature/sendmail.js');
var lgn = new login_1.login();
describe('Dashboard Sanity suite', function () {
    protractor_1.browser.ignoreSynchronization = true;
    it('verify login functionality', function () {
        protractor_1.browser.get('https://maadendashboard.btsmomenta.com/#/login');
        expect(protractor_1.browser.getTitle()).toEqual('Momentadashboardapp');
        protractor_1.browser.driver.manage().window().maximize();
        protractor_1.element(protractor_1.by.xpath("//input[contains(@id,'mat-input-0')]")).sendKeys('gunjan.dadhich@maaden.com').then(function () { protractor_1.browser.sleep(3000); });
        protractor_1.element(protractor_1.by.xpath("//input[contains(@id,'password__field')]")).sendKeys('ABab12$').then(function () { protractor_1.browser.sleep(3000); });
        protractor_1.element(protractor_1.by.xpath("//span[@class='mat-button-wrapper'][contains(.,'Login')]")).click().then(function () { protractor_1.browser.sleep(3000); });
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Dashboard")]')).click().then(function () { protractor_1.browser.sleep(10000); });
        mail.send();
    });
    it('verify by clicking on checkbox', function () {
        protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.xpath('//iframe[@src]')).getWebElement());
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Pre-Work")]')).click().then(function () { protractor_1.browser.sleep(5000); });
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Welcome!")]')).click().then(function () { protractor_1.browser.sleep(7000); });
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Welcome!")]')).click().then(function () { protractor_1.browser.sleep(7000); });
        expect(protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"ACTIVE USERS")]')).isPresent()).toBe(true);
        var text = "Count of value.user.name 19.";
        var numberPattern = /\d+/g;
        var results = text.match(numberPattern);
        if (results != null) {
            var number = results[0];
            console.log("number is" + number);
        }
        //expect(element(by.tagName('tspan')).getText()).toBe('19')
        // var elements = element.getElementsByTagName(tagName)
        //let elements = element(by.tagName('svg'));
        //console.log("elements is" + elements)
        //let x = String(element(by.xpath('//*[@class="value"]//*')).getText());
        //console.log("the output is" + x);
        protractor_1.element(protractor_1.by.xpath('//*[@class="value"]//*[contains(text(),"19")]')).getText().then(function (text) {
            console.log("x is " + text);
            expect(text).toBeGreaterThan(20);
        });
        //expect(element(by.xpath('//*[@class="value"]//*[contains(text(),"19")]')).isPresent()).toBeGreaterThan(2)
    });
    it('Verify by clicking on downlinks', function () {
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Login Trends")]')).click().then(function () { protractor_1.browser.sleep(5000); });
    });
    it('Verify click on SELECT Location drop down', function () {
        protractor_1.element(protractor_1.by.xpath('//*[@aria-label="value.user.location,  All"]')).click().then(function () { protractor_1.browser.sleep(5000); });
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Asia/Dubai")]')).click().then(function () { protractor_1.browser.sleep(5000); });
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Asia/Kuwait")]')).click().then(function () { protractor_1.browser.sleep(5000); });
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Europe/Madrid")]')).click().then(function () { protractor_1.browser.sleep(5000); });
    });
    it('Verify Stage dropdown', function () {
        protractor_1.element(protractor_1.by.xpath('//*[@aria-label="value.stageName,  All"]')).click().then(function () { protractor_1.browser.sleep(5000); });
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Welcome to the")]')).click().then(function () { protractor_1.browser.sleep(5000); });
    });
    it('Verify NPS for the list given users', function () {
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"list users")]')).click().then(function () { protractor_1.browser.sleep(5000); });
    });
    it('Verify Post given list page', function () {
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"POST_GIVEN_LIST")]')).click().then(function () { protractor_1.browser.sleep(5000); });
    });
});
