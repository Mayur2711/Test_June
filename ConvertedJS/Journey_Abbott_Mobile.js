"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var login_1 = require("./login");
var Scenario_Abbott_Mobile_1 = require("./Scenario_Abbott_Mobile");
var registration_1 = require("./registration");
var lgn = new login_1.login();
var reg = new registration_1.registration();
var sce = new Scenario_Abbott_Mobile_1.scenario();
//describe('Abbott Sanity Suite on https://qa2.btsmomenta.com',function()
describe('Abbott Sanity Suite on https://abbott.btsmomenta.com', function () {
    protractor_1.browser.ignoreSynchronization = true;
    it('login valid user', function () {
        protractor_1.browser.get('https://Abbott.btsmomenta.com');
        //browser.get('https://qa2.btsmomenta.com');
        expect(protractor_1.browser.getTitle()).toEqual('Momenta');
        //browser.driver.manage().window().maximize();
        protractor_1.browser.sleep(15000);
        lgn.Click_Abbott();
    });
    /*
        it('I Accept policy',function()
        {
            reg.accept_privacy_Abbott();
        });
        
        it('Verify Being a leader today module completion',function()
        {
            sce.Scenario_verify_first_module();
        });
    
        it('verify Being at your best as leader completion',function()
        {
            sce.Scenario_being_at_your_best();
        })
    
        it('verify head module',function()
        {
            sce.Scenario_getting_out_of_box();
        })
    
        it('verify hand module',function(){
            sce.Scenario_head();
        })
    
        it('verify getting out of box completion ', function(){
            sce.Scenario_hands();
        })
    
        it('verify seeing with you fresh eyes initialization',function(){
            sce.Scenario_seeing_with_fresh_eyes_1();
        })
    
        it('verify seeing with your fresh eyes completion', function(){
            sce.Scenario_seeing_with_fresh_eyes_2();
        })
    
        it('verify see_godo',function(){
            sce.Scenario_Go_Do_see();
        })
    
        it('verify see_peer_pod',function(){
            sce.Scenario_peer_pod_see();
        })
    
        it('verify hear introduction',function(){
            sce.Scenario_hear_introduction();
        })
    
        it('verify the battle between two voices', function(){
            sce.Scenario_the_battle_of_two_voices();
        })*/
    it('verify the power of curiosity', function () {
        sce.Scenario_the_power_of_curiosity();
    });
    it('verify the GoDo for hear ', function () {
        sce.Scenario_Go_do_hear();
    });
    it('verify the peer pod coaching hear', function () {
        sce.Scenario_peer_pod_coaching_hear();
    });
    it('verify the speak introduction', function () {
        sce.Scenario_Speak_introduction();
    });
    it('verify the four syles of effective leader', function () {
        sce.Scenario_the_four_style_of_an_effective_leader();
    });
    it('verify the godo for speak', function () {
        sce.Scenario_Speak_GoDo();
    });
    it('verify speak peer pod', function () {
        sce.Scenario_Speak_peer_pod();
    });
    //Coach and Develop
    it('What is coaching?', function () {
        sce.Scenario_What_is_coaching();
    });
    it('Coach_as_a_navigation_system', function () {
        sce.Scenario_Coach_as_a_navigation_system();
    });
    it('See_Hear_Speak_as_a_coach', function () {
        sce.Scenario_See_Hear_Speak_as_a_coach();
    });
    it('Go_Do_coach', function () {
        sce.Scenario_Go_do_coach();
    });
    it('Peer_Pod_coach', function () {
        sce.Scenario_Peer_Pod_coach();
    });
    it('WrapUp', function () {
        sce.Scenario_WrapUp();
    });
    it('Verify Go Do page', function () {
        sce.Scenario_GoDo();
    });
    it('Verify resource centre', function () {
        sce.Scenario_ResourceCenter();
    });
    it('Verify support under side link', function () {
        sce.Scenario_support();
    });
});
