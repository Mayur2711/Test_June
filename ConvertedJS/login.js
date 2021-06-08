"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
var protractor_1 = require("protractor");
var xlsx = require('xlsx');
var workbook = xlsx.readFile('./user_credentials.xlsx');
var worksheet = workbook.Sheets['Sheet1'];
var login = /** @class */ (function () {
    function login() {
        this.userId = protractor_1.element(protractor_1.by.id('userEmail'));
        this.password = protractor_1.element(protractor_1.by.id('password'));
        this.loginBtn = protractor_1.element(protractor_1.by.name('Login'));
        //this.MomentaLogo= element(by.xpath("//div/div/div/*[contains(@role,'img')]"))
        this.MomentaLogo = protractor_1.element(protractor_1.by.xpath('//*[@alt="Momenta by BTS logo"][contains(.,"Momenta Logo")]'));
        this.DashboardEmail = protractor_1.element(protractor_1.by.xpath('//*[@placeholder="Email"]'));
        this.DashboardPassword = protractor_1.element(protractor_1.by.xpath('//*[@placeholder="Password"]'));
    }
    login.prototype.Click = function () {
        this.userId.sendKeys("jaigovt@microsoft.com").then(function () { protractor_1.browser.sleep(1000); });
        this.password.sendKeys("ABab12$").then(function () { protractor_1.browser.sleep(1000); });
        this.loginBtn.click();
    };
    login.prototype.Click_Salesforce = function () {
        var uname = 'B7';
        var pwd = 'C7';
        this.userId.clear();
        this.password.clear();
        this.userId.sendKeys(worksheet[uname].v).then(function () { protractor_1.browser.sleep(1000); });
        this.password.sendKeys(worksheet[pwd].v).then(function () { protractor_1.browser.sleep(1000); });
        this.loginBtn.click().then(function () { protractor_1.browser.sleep(3000); });
        expect(protractor_1.element(protractor_1.by.xpath('//*[@class="page__name" and contains(text(),"Privacy Policy")]')).isPresent()).toBe(true, "could not fing page header");
        expect(protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"I will respect the copyright of the assessment")]')).isPresent()).toBe(true, "text mismatch");
    };
    login.prototype.Click_invalid_salesforce = function () {
        var uname = 'B4';
        var pwd = 'C4';
        this.userId.sendKeys(worksheet[uname].v).then(function () { protractor_1.browser.sleep(1000); });
        this.password.sendKeys(worksheet[pwd].v).then(function () { protractor_1.browser.sleep(1000); });
        this.loginBtn.click().then(function () { protractor_1.browser.sleep(2000); });
        expect(protractor_1.element(protractor_1.by.xpath('//*[@role="alertdialog"]')).isPresent()).toBe(true);
    };
    login.prototype.Click_revisit = function () {
        var uname = 'B10';
        var pwd = 'C10';
        this.userId.sendKeys(worksheet[uname].v).then(function () { protractor_1.browser.sleep(1000); });
        this.password.sendKeys(worksheet[pwd].v).then(function () { protractor_1.browser.sleep(1000); });
        this.loginBtn.click().then(function () { protractor_1.browser.sleep(3000); });
    };
    login.prototype.Click_Abbott = function () {
        protractor_1.browser.sleep(10000);
        expect(protractor_1.element(protractor_1.by.xpath('//*[@alt="Momenta by BTS logo"][contains(.,"Momenta Logo")]')).isPresent()).toBe(true);
        this.MomentaLogo.click().then(function () { protractor_1.browser.sleep(5000); });
        this.userId.sendKeys("test_unique802@abbott.com").then(function () { protractor_1.browser.sleep(1000); });
        this.password.sendKeys("ABab12$").then(function () { protractor_1.browser.sleep(1000); });
        this.loginBtn.click().then(function () { protractor_1.browser.sleep(10000); });
        //expect(element(by.xpath("//img[contains(@src,'login.svg')]")).isPresent()).toBe(true);
    };
    login.prototype.click_AbbottDashboard = function () {
        this.DashboardEmail.sendKeys("gunjan.dadhich@abbott.com");
        this.DashboardPassword.sendKeys("ABab12$").then(function () { protractor_1.browser.sleep(2000); });
        protractor_1.element(protractor_1.by.xpath("//span[contains(.,'Login')]")).click().then(function () { protractor_1.browser.sleep(2000); });
        expect(protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Search for an ")]')).isPresent()).toBe(true);
    };
    login.prototype.click_wonderfulcompany = function () {
        this.DashboardEmail.sendKeys("analytics@wonderful.com");
        this.DashboardPassword.sendKeys("ABab12$").then(function () { protractor_1.browser.sleep(2000); });
        protractor_1.element(protractor_1.by.xpath("//span[contains(.,'Login')]")).click().then(function () { protractor_1.browser.sleep(2000); });
        expect(protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Search for an ")]')).isPresent()).toBe(true);
    };
    return login;
}());
exports.login = login;
