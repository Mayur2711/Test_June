"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scenario_wc = void 0;
var protractor_1 = require("protractor");
var Scenario_PowerBI_Dashboard_1 = require("./Scenario_PowerBI_Dashboard");
var globalVariable;
var sce = new Scenario_PowerBI_Dashboard_1.scenario();
var x;
var y;
var scenario_wc = /** @class */ (function () {
    function scenario_wc() {
        this.Active_user = protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Active Users")]/../../..//*'));
        this.Registered_user = protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Registered Users")]/../../..//*'));
        this.Completed_user = protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Completed Users")]/../../..//*'));
        this.No_of_completed_individuals = protractor_1.element(protractor_1.by.xpath('//*[@title="No of Completed Individuals"]/following-sibling::visual-modern//*[@class="card"]'));
        this.No_of_pods = protractor_1.element(protractor_1.by.xpath('//*[@title="No of Pods"]/following-sibling::visual-modern//*[@class="card"] '));
        this.No_of_missed_individuals = protractor_1.element(protractor_1.by.xpath('//*[@title="No of Missed Individuals"]/following-sibling::visual-modern//*[@class="card"] '));
    }
    scenario_wc.prototype.Active_user_less_than_register_user = function () {
        var x;
        var y;
        x = this.Active_user;
        y = this.Registered_user;
        sce.Active_user_less_than_register_user(x, y);
    };
    scenario_wc.prototype.Active_user_and_register_user_are_different = function () {
        var x;
        var y;
        x = this.Active_user;
        y = this.Registered_user;
        sce.Active_user_and_register_user_are_different(x, y);
    };
    scenario_wc.prototype.User_completion_not_blank = function () {
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Tracking Users progress")]')).click();
        x = protractor_1.element(protractor_1.by.xpath('//*[@style="width: 98.1487px; height: 49.0112px;"]'));
        y = protractor_1.element(protractor_1.by.xpath('//*[@title="Count of Email"]'));
        sce.User_completion_not_blank(x, y);
    };
    scenario_wc.prototype.Participants_POD_blank = function () {
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Pods")]')).click().then(function () { protractor_1.browser.sleep(8000); });
        this.No_of_completed_individuals.getText().then(function (text) {
            if (text == '(Blank)') {
                fail('There are no participants in completed individual block');
            }
            else {
                console.log('POD output');
            }
        });
        this.No_of_pods.getText().then(function (text) {
            if (text == '(Blank)') {
                fail('There are no participants in No of pods block');
            }
            else {
                console.log('POD output');
            }
        });
        this.No_of_missed_individuals.getText().then(function (text) {
            if (text == '(Blank)') {
                fail('There are no participants in No of missed individuals');
            }
            else {
                console.log('POD output');
            }
        });
    };
    scenario_wc.prototype.Verify_blank_Main_dashboard = function () {
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Main Dashboard")]')).click();
        this.Active_user.getText().then(function (text) {
            if (text == '(Blank)') {
                fail('There are no participants in No of missed individuals');
            }
            else {
                console.log('POD output');
            }
        });
        this.Registered_user.getText().then(function (text) {
            if (text == '(Blank)') {
                fail('There are no participants in No of missed individuals');
            }
            else {
                console.log('POD output');
            }
        });
        this.Completed_user.getText().then(function (text) {
            if (text == '(Blank)') {
                fail('There are no participants in No of missed individuals');
            }
            else {
                console.log('POD output');
            }
        });
    };
    scenario_wc.prototype.Verify_blank = function (globalVariable) {
        var text = globalVariable;
        if (text == '(Blank)') {
            fail('Blank text is present in landing page tabs');
        }
        else {
            console.log('POD output');
        }
    };
    scenario_wc.prototype.Verify_blank_tracking_user_progress = function () {
        var _this = this;
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Tracking Users progress")]')).click();
        protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.xpath('//*[@style="width: 89.3641px; height: 50.1139px;"]')).getWebElement());
        protractor_1.element(protractor_1.by.xpath('//*[@title="Count of Column1.email"]')).getText().then(function (text1) {
            _this.Verify_blank(text1);
            console.log("text is " + text1);
        });
        protractor_1.browser.switchTo().defaultContent();
        protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.xpath('//iframe[@src]')).getWebElement());
        protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.xpath('//*[@style="width: 93.4887px; height: 48.739px;"]')).getWebElement());
        protractor_1.element(protractor_1.by.xpath('//*[@title="Count of Email"]')).getText().then(function (text1) {
            _this.Verify_blank(text1);
            console.log("text is " + text1);
        });
        protractor_1.browser.switchTo().defaultContent();
        protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.xpath('//iframe[@src]')).getWebElement());
        protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.xpath('//*[@style="width: 98.1487px; height: 49.0112px;"]')).getWebElement());
        protractor_1.element(protractor_1.by.xpath('//*[@title="Count of Email"]')).getText().then(function (text1) {
            _this.Verify_blank(text1);
            console.log("text is " + text1);
        });
        protractor_1.browser.switchTo().defaultContent();
        protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.xpath('//iframe[@src]')).getWebElement());
    };
    scenario_wc.prototype.Verify_blank_PODS_tab = function () {
        var _this = this;
        protractor_1.element(protractor_1.by.xpath('//*[@title="Pods"]')).click();
        this.No_of_pods.getText().then(function (text1) {
            protractor_1.browser.sleep(2000);
            _this.Verify_blank(text1);
            console.log("text in pods is " + text1);
        });
        this.No_of_completed_individuals.getText().then(function (text1) {
            protractor_1.browser.sleep(2000);
            _this.Verify_blank(text1);
            console.log("text in pods is " + text1);
        });
        this.No_of_missed_individuals.getText().then(function (text1) {
            protractor_1.browser.sleep(2000);
            _this.Verify_blank(text1);
            console.log("text in pods is " + text1);
        });
        //sce.Verify_Blank_DropDown();
        protractor_1.element.all(protractor_1.by.xpath('//*[@class="slicerText"]')).getText().then(function (text) {
            //console.log(text);
            var i = 0;
            console.log("length is " + text.length);
            for (i; i <= text.length; i++) {
                if (text[i] == ('(Blank)')) {
                    console.log('Blank present' + text[i]);
                    fail("Blank text is present in the landing page checkboxes");
                }
            }
        });
    };
    scenario_wc.prototype.Verify_Email_id_and_CohortId_in_participant_list = function () {
        protractor_1.element(protractor_1.by.xpath('//*[@title="Pods"]')).click();
        protractor_1.element(protractor_1.by.xpath('//*[@title="alain.godard@wonderful.com"]')).click().then(function () { console.log('clicked'); });
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform().then(function () { protractor_1.browser.sleep(5000); });
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform().then(function () { protractor_1.browser.sleep(5000); });
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform().then(function () { protractor_1.browser.sleep(5000); });
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ARROW_LEFT).perform().then(function () { protractor_1.browser.sleep(5000); });
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform().then(function () { protractor_1.browser.sleep(5000); });
        sce.Verify_Email_id();
        for (var i = 0; i < 10; i++) {
            protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform();
            protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        }
        sce.Verify_Email_id();
        for (var i = 0; i < 10; i++) {
            protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform();
            protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        }
        sce.Verify_Email_id();
    };
    return scenario_wc;
}());
exports.scenario_wc = scenario_wc;
