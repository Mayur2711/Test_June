"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scenario = void 0;
var protractor_1 = require("protractor");
var x;
var y;
var scenario = /** @class */ (function () {
    function scenario() {
        this.Dashboard_and_Reporting = protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Dashboards & Reporting")]'));
        this.tracking_user_completed_users = protractor_1.element(protractor_1.by.xpath('//*[@title="Completed Users"]/following-sibling::visual-modern//*[@name="visual-sandbox"]'));
        this.tracking_user_leadingPPA_radio_btn = protractor_1.element(protractor_1.by.xpath('//*[@title="Leading with Impact Post Program Actions"]'));
        this.Select_division = protractor_1.element(protractor_1.by.xpath('//*[@title="SELECT DIVISION"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'));
        this.Select_Employee_status = protractor_1.element(protractor_1.by.xpath('//*[@title="SELECT EMPLOYEE STATUS"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'));
        this.Select_Job_level = protractor_1.element(protractor_1.by.xpath('//*[@title="SELECT JOB LEVEL"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'));
        this.Select_cohort = protractor_1.element(protractor_1.by.xpath('//*[@title="SELECT COHORT"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'));
        this.Grab_date = protractor_1.element(protractor_1.by.xpath('//*[@id="sandbox-host"]//p//*[@title="Dashboard Last Updated on"]'));
        this.Select_Job_level = protractor_1.element(protractor_1.by.xpath('//*[@title="SELECT JOB LEVEL"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'));
        this.Select_work_location = protractor_1.element(protractor_1.by.xpath('//*[@title="SELECT WORK LOCATION"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'));
        this.Select_work_state = protractor_1.element(protractor_1.by.xpath('//*[@title="SELECT WORK STATE"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'));
        this.Select_work_region = protractor_1.element(protractor_1.by.xpath('//*[@title="SELECT REGION"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'));
    }
    scenario.prototype.Verify_power_BI_files = function () {
        this.Dashboard_and_Reporting.click();
        protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.xpath('//iframe[@src]')).getWebElement());
        protractor_1.browser.sleep(15000);
        expect(protractor_1.element(protractor_1.by.xpath('//*[@title="Completed Users"]/following-sibling::visual-modern//*[@name="visual-sandbox"]')).isDisplayed()).toBe(true);
    };
    scenario.prototype.Verify_changing_values_leadingPPA = function () {
        this.tracking_user_leadingPPA_radio_btn.click().then(function () { protractor_1.browser.sleep(10000); });
    };
    scenario.prototype.Verify_Blank_DropDown = function () {
        protractor_1.element.all(protractor_1.by.xpath('//*[@class="slicerText"]')).getText().then(function (text) {
            //console.log(text);
            var i = 0;
            console.log("length is " + text.length);
            for (i; i <= text.length; i++) {
                if (text[i] == ('(Blank)')) {
                    console.log('Blank present' + text[i]);
                    fail("");
                }
            }
        });
    };
    /*Verify_tracking_user_select_division()
    {
        this.Select_division.click().then(function(){browser.sleep(5000)});
        this.Verify_Blank_DropDown();
    }

    Verify_tracking_user_select_cohort()
    {
        this.Select_cohort.click().then(function(){browser.sleep(5000)});
        this.Verify_Blank_DropDown();
    }*/
    scenario.prototype.Compare_current_date = function () {
        this.Grab_date.getText().then(function (text) {
            console.log("Dashboard date is " + text.substring(0, 15));
            var today = new Date();
            var string = today.toString();
            console.log("System date is " + string.substring(0, 15));
            if (text.substring(0, 15) == string.substring(0, 15)) {
                console.log("Dates are matching");
            }
            else {
                fail("Dates do not match");
            }
            protractor_1.browser.switchTo().defaultContent();
            protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.xpath('//iframe[@src]')).getWebElement());
        });
    };
    scenario.prototype.Completed_percentage = function (x, y) {
        x.click().then(function () { protractor_1.browser.sleep(5000); });
        y.getText().then(function (text) {
            console.log("completion % " + text);
            var str = text;
            var patt1 = str.replace(/%/g, '');
            var a = parseInt(patt1);
            console.log("result is " + isFinite(a));
            if (a > 100) {
                fail("The number is greater than 100");
            }
            else {
                console.log("Pass");
            }
        });
    };
    scenario.prototype.Active_user_less_than_register_user = function (x, y) {
        var a;
        var b;
        x.getText().then(function (text) {
            console.log(" Active user is " + text);
            a = text;
        });
        y.getText().then(function (text1) {
            console.log(" Registered user is " + text1);
            b = text1;
            console.log("a is " + a);
            console.log("b is " + b);
            if (a < b) {
                console.log("Active user is less than register user");
            }
            else {
                fail("Active user is more than register user");
            }
        });
    };
    scenario.prototype.Active_user_and_register_user_are_different = function (x, y) {
        var a;
        var b;
        x.getText().then(function (text) {
            console.log(" Active user is " + text);
            a = text;
        });
        y.getText().then(function (text1) {
            console.log(" Registered user is " + text1);
            b = text1;
            console.log("a is " + a);
            console.log("b is " + b);
            if (a == b) {
                fail("Active user and register user are same");
            }
            else {
                console.log("Active user and registered user are different");
            }
        });
    };
    scenario.prototype.User_completion_not_blank = function (x, y) {
        protractor_1.browser.switchTo().frame((x).getWebElement());
        console.log("my x is " + x);
        console.log("my y is " + y);
        y.getText().then(function (text) {
            console.log("1st page completion is  " + text);
            if (text == '(Blank)') {
                fail('Blank text is present in completion %');
            }
            else {
                console.log('Blank text is not present in completion %');
            }
        });
        protractor_1.browser.switchTo().defaultContent();
        protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.xpath('//iframe[@src]')).getWebElement());
    };
    scenario.prototype.Verify_Go_DO_tab = function () {
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Go-Do")]')).click().then(function () { protractor_1.browser.sleep(8000); });
    };
    scenario.prototype.Participants_POD_blank = function (x) {
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Pods")]')).click().then(function () { protractor_1.browser.sleep(8000); });
        x.getText().then(function (text) {
            if (text == '(Blank)') {
                fail('There are no participants');
            }
            else {
                console.log('POD output');
            }
        });
    };
    scenario.prototype.Verify_blank_drop_down_all_tabs = function () {
        this.Select_cohort.click().then(function () { protractor_1.browser.sleep(2000); });
        //this.Verify_Blank_DropDown();
        protractor_1.element.all(protractor_1.by.xpath('//*[@class="slicerText"]')).getText().then(function (text) {
            //console.log(text);
            var i = 0;
            console.log("length is " + text.length);
            for (i; i <= text.length; i++) {
                if (text[i] == ('(Blank)')) {
                    console.log('Blank present' + text[i]);
                    fail("blank is present in select cohort");
                }
            }
        });
        this.Select_cohort.click().then(function () { protractor_1.browser.sleep(2000); });
        this.Select_division.click().then(function () { protractor_1.browser.sleep(2000); });
        //this.Verify_Blank_DropDown();
        protractor_1.element.all(protractor_1.by.xpath('//*[@class="slicerText"]')).getText().then(function (text) {
            //console.log(text);
            var i = 0;
            console.log("length is " + text.length);
            for (i; i <= text.length; i++) {
                if (text[i] == ('(Blank)')) {
                    console.log('Blank present' + text[i]);
                    fail("Blank is present in select division");
                }
            }
        });
        this.Select_division.click().then(function () { protractor_1.browser.sleep(2000); });
        this.Select_Job_level.click().then(function () { protractor_1.browser.sleep(2000); });
        //this.Verify_Blank_DropDown();
        protractor_1.element.all(protractor_1.by.xpath('//*[@class="slicerText"]')).getText().then(function (text) {
            //console.log(text);
            var i = 0;
            console.log("length is " + text.length);
            for (i; i <= text.length; i++) {
                if (text[i] == ('(Blank)')) {
                    console.log('Blank is present in select job level' + text[i]);
                    fail("Blank is present in select job level");
                }
            }
        });
        this.Select_Job_level.click().then(function () { protractor_1.browser.sleep(2000); });
        this.Select_Employee_status.click().then(function () { protractor_1.browser.sleep(2000); });
        //this.Verify_Blank_DropDown();
        protractor_1.element.all(protractor_1.by.xpath('//*[@class="slicerText"]')).getText().then(function (text) {
            //console.log(text);
            var i = 0;
            console.log("length is " + text.length);
            for (i; i <= text.length; i++) {
                if (text[i] == ('(Blank)')) {
                    console.log('Blank present' + text[i]);
                    fail("Blank is present in Employee status");
                }
            }
        });
        this.Select_Employee_status.click().then(function () { protractor_1.browser.sleep(2000); });
        this.Select_work_location.click().then(function () { protractor_1.browser.sleep(2000); });
        //this.Verify_Blank_DropDown();
        protractor_1.element.all(protractor_1.by.xpath('//*[@class="slicerText"]')).getText().then(function (text) {
            //console.log(text);
            var i = 0;
            console.log("length is " + text.length);
            for (i; i <= text.length; i++) {
                if (text[i] == ('(Blank)')) {
                    console.log('Blank present' + text[i]);
                    fail("Blank is present in work location");
                }
            }
        });
        this.Select_work_location.click().then(function () { protractor_1.browser.sleep(2000); });
        this.Select_work_state.click().then(function () { protractor_1.browser.sleep(2000); });
        //this.Verify_Blank_DropDown();
        protractor_1.element.all(protractor_1.by.xpath('//*[@class="slicerText"]')).getText().then(function (text) {
            //console.log(text);
            var i = 0;
            console.log("length is " + text.length);
            for (i; i <= text.length; i++) {
                if (text[i] == ('(Blank)')) {
                    console.log('Blank present' + text[i]);
                    fail("Blank is present in Work state");
                }
            }
        });
        this.Select_work_state.click().then(function () { protractor_1.browser.sleep(2000); });
        this.Select_work_region.click().then(function () { protractor_1.browser.sleep(2000); });
        //this.Verify_Blank_DropDown();
        protractor_1.element.all(protractor_1.by.xpath('//*[@class="slicerText"]')).getText().then(function (text) {
            //console.log(text);
            var i = 0;
            console.log("length is " + text.length);
            for (i; i <= text.length; i++) {
                if (text[i] == ('(Blank)')) {
                    console.log('Blank present' + text[i]);
                    fail("Blank is present in Work region");
                }
            }
        });
        this.Select_work_region.click().then(function () { protractor_1.browser.sleep(2000); });
    };
    scenario.prototype.Verify_Blank_in_all_drop_down_tracking_user_progress = function () {
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Tracking Users")]')).click().then(function () { protractor_1.browser.sleep(5000); });
        this.Verify_blank_drop_down_all_tabs();
    };
    scenario.prototype.Verify_Blank_in_all_drop_down_Dashboard = function () {
        protractor_1.element(protractor_1.by.xpath("//*[@title='Dashboard']")).click().then(function () { protractor_1.browser.sleep(5000); });
        this.Verify_blank_drop_down_all_tabs();
    };
    scenario.prototype.Verify_Blank_in_all_drop_down_pods = function () {
        protractor_1.element(protractor_1.by.xpath("//*[@title='Pods']")).click().then(function () { protractor_1.browser.sleep(5000); });
        this.Verify_blank_drop_down_all_tabs();
    };
    scenario.prototype.Verify_Blank_in_all_drop_down_Sustainable_Dashboard = function () {
        protractor_1.element(protractor_1.by.xpath("//*[@title='Sustainment Dashboard']")).click().then(function () { protractor_1.browser.sleep(5000); });
        this.Verify_blank_drop_down_all_tabs();
    };
    scenario.prototype.Verify_Email_id = function () {
        protractor_1.element.all(protractor_1.by.xpath('//*[@title="Participant"]/../../following-sibling::div[@class="rowHeaders"]//*//*//*')).getText().then(function (text) {
            console.log("length is " + text.length);
            for (var i = 0; i < text.length; i++) {
                console.log(i + " result is" + text[i] + "<br>");
                if (text[i].includes('@')) {
                    console.log('pass');
                }
                else {
                    fail('Invalid Email id observed');
                }
            }
        });
    };
    scenario.prototype.Learning_Activities_completion = function () {
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Learning Activities")]')).click().then(function () { protractor_1.browser.sleep(8000); });
        protractor_1.element(protractor_1.by.xpath('//*[@title="alejandro.wellisch@abbott.com"]')).click().then(function () { console.log('clicked'); });
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform();
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform();
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ARROW_LEFT).perform();
        protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        this.Verify_Email_id();
        for (var i = 0; i < 30; i++) {
            protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform();
            protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        }
        this.Verify_Email_id();
        for (var i = 0; i < 20; i++) {
            protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.DOWN).perform();
            protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
        }
        this.Verify_Email_id();
    };
    return scenario;
}());
exports.scenario = scenario;
