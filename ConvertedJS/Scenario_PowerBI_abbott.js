"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scenario_abbott = void 0;
var protractor_1 = require("protractor");
var Scenario_PowerBI_Dashboard_1 = require("./Scenario_PowerBI_Dashboard");
var sce = new Scenario_PowerBI_Dashboard_1.scenario();
var x;
var y;
var scenario_abbott = /** @class */ (function () {
    function scenario_abbott() {
        this.Active_user = protractor_1.element(protractor_1.by.xpath('//*[@title="ACTIVE USERS"]/following-sibling::visual-modern//*[@class="card"]'));
        this.Registered_user = protractor_1.element(protractor_1.by.xpath('//*[@title="REGISTERED USERS"]/following-sibling::visual-modern//*[@class="card"]'));
        this.Dashboard = protractor_1.element(protractor_1.by.xpath('//*[@title="Dashboard"]'));
        this.Completion_percentage = protractor_1.element(protractor_1.by.xpath('//*[@title="COMPLETED"]/following-sibling::visual-modern//*[@class="card"]'));
        this.No_of_participants = protractor_1.element(protractor_1.by.xpath('//*[@title="No of Participants"]/following-sibling::visual-modern//*[@class="card"] '));
    }
    scenario_abbott.prototype.Active_user_less_than_register_user = function () {
        var x;
        var y;
        x = this.Active_user;
        y = this.Registered_user;
        sce.Active_user_less_than_register_user(x, y);
    };
    scenario_abbott.prototype.Active_user_and_register_user_are_different = function () {
        var x;
        var y;
        x = this.Active_user;
        y = this.Registered_user;
        sce.Active_user_and_register_user_are_different(x, y);
    };
    scenario_abbott.prototype.Compare_date = function () {
        protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.xpath('//*[@style="width: 262.223px; height: 17.4973px;"]')).getWebElement());
        sce.Compare_current_date();
    };
    scenario_abbott.prototype.Completed_percentage = function () {
        x = this.Dashboard;
        y = this.Completion_percentage;
        sce.Completed_percentage(x, y);
    };
    scenario_abbott.prototype.Participants_POD_blank = function () {
        x = this.No_of_participants;
        sce.Participants_POD_blank(x);
    };
    scenario_abbott.prototype.User_completion_not_blank = function () {
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Tracking Users Progress")]')).click().then(function () { protractor_1.browser.sleep(1000); });
        x = protractor_1.element(protractor_1.by.xpath('//*[@style="width: 120.626px; height: 36.4252px;"]'));
        y = protractor_1.element(protractor_1.by.xpath('//*[@title="Count of userId"]'));
        sce.User_completion_not_blank(x, y);
    };
    return scenario_abbott;
}());
exports.scenario_abbott = scenario_abbott;
