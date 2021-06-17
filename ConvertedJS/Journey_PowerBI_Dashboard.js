"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var login_1 = require("./login");
var Scenario_PowerBI_Dashboard_1 = require("./Scenario_PowerBI_Dashboard");
var Scenario_PowerBI_WC_1 = require("./Scenario_PowerBI_WC");
var Scenario_PowerBI_abbott_1 = require("./Scenario_PowerBI_abbott");
var lgn = new login_1.login();
var sce = new Scenario_PowerBI_Dashboard_1.scenario();
var sce_wc = new Scenario_PowerBI_WC_1.scenario_wc();
var sce_abbott = new Scenario_PowerBI_abbott_1.scenario_abbott();
describe('Dashboard Sanity Suite', function () {
    protractor_1.browser.ignoreSynchronization = true;
    /*
        it('login valid user',function()
        {
           
            browser.get('https://abbottdashboard.btsmomenta.com/');
            expect(browser.getTitle()).toEqual('Momentadashboardapp');
            browser.driver.manage().window().maximize();
            lgn.click_AbbottDashboard();
        });
    
        it('Verify Power BI files visibility',function()
        {
            sce.Verify_power_BI_files();
        })
    
        it('Verify Current date with Dashboard date',function()
        {
            sce_abbott.Compare_date();
        })
    
        it('Verify Completed % of Active Users not exceeding 100%' ,function()
        {
            sce_abbott.Completed_percentage();
        })
    
        it('Verify active user should be less than register user',function()
        {
            sce_abbott.Active_user_less_than_register_user();
        })
    
        it('registered users and active users are different',function()
        {
            sce_abbott.Active_user_and_register_user_are_different();
        })
    
        it('Verify user completion not blank',function()
        {
            sce_abbott.User_completion_not_blank();
        })
    
        it('Verify Go-Do tab',function()
        {
            sce.Verify_Go_DO_tab();
        })
    
        it('Verify if Participants is blank under POD',function()
        {
            sce_abbott.Participants_POD_blank();
        })
    
        it('Verify blank drop downs in tracking user progress page',function(){
            sce.Verify_Blank_in_all_drop_down_tracking_user_progress();
        })
    
        it('Verify blank drop downs in Dashboard tab',function()
        {
            sce.Verify_Blank_in_all_drop_down_Dashboard();
    
        })
    
        it('Verify blank dropdown in pods tab',function(){
            sce.Verify_Blank_in_all_drop_down_pods();
        })
    
        it('Verify blank dropdown in Sustainable Dashboard tab',function(){
            sce.Verify_Blank_in_all_drop_down_Sustainable_Dashboard();
        })
    
        it('verify Email id in participants list', function(){
            sce.Learning_Activities_completion();
        })
    */
    // from here writing code for wonderful company 
    it('verify successful login to wonderful company', function () {
        protractor_1.browser.get('https://wonderfulcompanydashboard.btsmomenta.com/');
        expect(protractor_1.browser.getTitle()).toEqual('Momentadashboardapp');
        protractor_1.browser.driver.manage().window().maximize();
        lgn.click_wonderfulcompany();
    });
    it('verify power BI files visibility (WC)', function () {
        protractor_1.element(protractor_1.by.xpath('//*[contains(text(),"Dashboards & Reporting")]')).click().then(function () {
            protractor_1.browser.sleep(5000);
            protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.xpath('//*[@style="width: 100%; height: 100%;"]')).getWebElement());
            protractor_1.browser.sleep(30000);
            protractor_1.browser.switchTo().frame(protractor_1.element(protractor_1.by.xpath('//*[@style="width: 262.768px; height: 17.4539px;"]')).getWebElement());
        });
    });
    it('Compare date (WC)', function () {
        sce.Compare_current_date();
    });
    it('Verify active user should be less than register user(WC)', function () {
        sce_wc.Active_user_less_than_register_user();
    });
    it('registered users and active users are different(WC)', function () {
        sce_wc.Active_user_and_register_user_are_different();
    });
    it('Verify user completion not blank(WC)', function () {
        sce_wc.User_completion_not_blank();
    });
    /*it('Verify if Participants is blank under POD(WC)',function()
    {
        // need to merge this
        sce_wc.Participants_POD_blank();
    })*/
    it('Verify blank in Main Dashboard(WC)', function () {
        sce_wc.Verify_blank_Main_dashboard();
    });
    it('Verify blank under tracking user progress tab(WC)', function () {
        sce_wc.Verify_blank_tracking_user_progress();
    });
    it('Verify blank under PODS tab on landing page(WC)', function () {
        sce_wc.Verify_blank_PODS_tab();
    });
    it('Verify Email id under participant list(WC)', function () {
        sce_wc.Verify_Email_id_and_CohortId_in_participant_list();
    });
});
