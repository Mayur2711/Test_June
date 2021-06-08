"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = void 0;
var protractor_1 = require("protractor");
var login_1 = require("./login");
var lgn = new login_1.login();
var registration = /** @class */ (function () {
    function registration() {
        this.dropdown1 = protractor_1.element(protractor_1.by.name('Select an industry'));
        this.dropdown2 = protractor_1.element(protractor_1.by.name('Vertical available for Government industry'));
        this.Continue_code = protractor_1.element(protractor_1.by.name('Continue'));
        this.country_button = protractor_1.element(protractor_1.by.id('mat-radio-2'));
        this.country_continue = protractor_1.element(protractor_1.by.name('Continue to Next Activity'));
        this.yes_button = protractor_1.element.all(protractor_1.by.className('plugin-single__text'));
        this.one = protractor_1.element(protractor_1.by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[1]"));
        this.two = protractor_1.element(protractor_1.by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[3]"));
        this.three = protractor_1.element(protractor_1.by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[5]"));
        this.four = protractor_1.element(protractor_1.by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[7]"));
        this.five = protractor_1.element(protractor_1.by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[9]"));
        this.six = protractor_1.element(protractor_1.by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[11]"));
        this.seven = protractor_1.element(protractor_1.by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[13]"));
        this.eight = protractor_1.element(protractor_1.by.xpath("(//label[@class='mat-radio-label'][contains(.,'High')])[15]"));
        this.continue_salesforce = protractor_1.element(protractor_1.by.xpath('//*[@class="plugin-common__btn-continue__text"]'));
        this.Accept_button = protractor_1.element(protractor_1.by.xpath('//span[contains(text()," Accept")]'));
        this.Reject_button = protractor_1.element(protractor_1.by.xpath('//span[contains(text()," Reject")]'));
        this.IAccept_button = protractor_1.element(protractor_1.by.xpath('/html/body/app-root/app-data-privacy/div/div/div[2]/div[2]/button[1]'));
        this.IDecline_button = protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"I Decline")]'));
        this.GoDo_btn = protractor_1.element(protractor_1.by.xpath("//*[contains(text(),'Go')]"));
    }
    registration.prototype.registration = function () {
        this.dropdown1.sendKeys("Government");
        protractor_1.browser.sleep(3000);
        this.dropdown2.sendKeys("Public");
        protractor_1.browser.sleep(5000);
        this.Continue_code.click();
        protractor_1.browser.sleep(10000);
        this.country_button.click();
        protractor_1.browser.sleep(2000);
        this.country_continue.click();
        protractor_1.browser.sleep(10000);
        this.yes_button.first().click();
        protractor_1.browser.sleep(2000);
        this.country_continue.click();
        protractor_1.browser.sleep(5000);
        this.one.click().then(function () { protractor_1.browser.sleep(2000); });
        this.two.click().then(function () { protractor_1.browser.sleep(2000); });
        this.three.click().then(function () { protractor_1.browser.sleep(2000); });
        this.four.click().then(function () { protractor_1.browser.sleep(2000); });
        this.four.click().then(function () { protractor_1.browser.sleep(2000); });
        this.five.click().then(function () { protractor_1.browser.sleep(2000); });
        this.six.click().then(function () { protractor_1.browser.sleep(2000); });
        this.six.click().then(function () { protractor_1.browser.sleep(2000); });
        this.seven.click().then(function () { protractor_1.browser.sleep(2000); });
        this.eight.click().then(function () { protractor_1.browser.sleep(2000); });
        this.country_continue.click().then(function () { protractor_1.browser.sleep(10000); });
    };
    registration.prototype.accept_privacy_salesforce = function () {
        //this.continue_salesforce.click().then(function(){browser.sleep(5000)});
        this.Accept_button.click().then(function () { protractor_1.browser.sleep(5000); });
        this.continue_salesforce.click().then(function () { protractor_1.browser.sleep(5000); });
    };
    registration.prototype.reject_privacy_salesforce = function () {
        //this.continue_salesforce.click().then(function(){browser.sleep(5000)});
        this.Reject_button.click().then(function () { protractor_1.browser.sleep(5000); });
        lgn.Click_Salesforce();
    };
    registration.prototype.accept_privacy_Abbott = function () {
        // this.IAccept_button.click().then(function(){browser.sleep(5000)});
        protractor_1.browser.sleep(10000);
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"English")]')).click().then(function () { protractor_1.browser.sleep(10000); });
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Submit")]')).click().then(function () { protractor_1.browser.sleep(10000); });
        protractor_1.browser.executeScript("document.getElementsByName('I Accept')[0].click()").then(function () { protractor_1.browser.sleep(5000); });
        //expect(element(by.xpath('//*[contains(text(),"Get Started")]')).isPresent()).toBe(true);
        //expect(element(by.xpath('//*[contains(text(),"Being")]')).isPresent()).toBe(true);
    };
    registration.prototype.reject_privacy_abbott = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        protractor_1.browser.sleep(3000);
                        return [4 /*yield*/, protractor_1.browser.executeScript("document.getElementsByName('I Decline')[0].click()").then(function () { protractor_1.browser.sleep(6000); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    registration.prototype.Scenario_GoDo = function () {
        this.GoDo_btn.click().then(function () { protractor_1.browser.sleep(5000); });
    };
    return registration;
}());
exports.registration = registration;
