import { ElementFinder, element,by, browser ,protractor } from "protractor";

export class scenario
{
    // side links 
    My_program_btn : ElementFinder
    GoDo_btn : ElementFinder
    Start_btn : ElementFinder
    Start_btn_let_start :ElementFinder
    Resource_centre_btn : ElementFinder
    pdf_lets_start_btn : ElementFinder
    Continue_Btn : ElementFinder
    Menu_btn : ElementFinder
    text_box_not_being1 : ElementFinder
    text_box_not_being2 : ElementFinder
    text_box_not_being3 : ElementFinder
    text_box_not_being4 : ElementFinder
    text_box_not_being5 : ElementFinder
    text_box_recog1 : ElementFinder
    text_box_recog2 : ElementFinder
    text_box_recog3 : ElementFinder
    text_box_recog4 : ElementFinder
    text_box_recog5 : ElementFinder
    text_box_heart1 : ElementFinder
    pdf_heart : ElementFinder
    text_box_heart2 :ElementFinder
    text_box_heart3 : ElementFinder
    text_box_heart4 : ElementFinder
    text_box_head : ElementFinder

    hands_radio1 : ElementFinder
    hands_text1 : ElementFinder

    see_textbox1 :ElementFinder
    see_textbox2 : ElementFinder
    see_textbox3 :ElementFinder
    see_textbox4 : ElementFinder
    see_radio1 : ElementFinder
    see_radio2 : ElementFinder
    see_continue : ElementFinder
    
    godo_commit : ElementFinder
    peer_pod_radio :ElementFinder
    peer_pod_radio1 :ElementFinder
    peer_pod_radio2 : ElementFinder
    peer_pod_yes : ElementFinder
    peer_pod_text1: ElementFinder
    peer_pod_text2: ElementFinder
    peer_pod_text3: ElementFinder
    peer_pod_text4: ElementFinder
    peer_pod_text5 : ElementFinder

    the_battle_yes_btn :ElementFinder
    the_battle_yes_btn1 : ElementFinder
    the_battle_yes_btn2 : ElementFinder

    peer_pod_hear_radio1 : ElementFinder
    peer_pod_hear_radio2 : ElementFinder
    peer_pod_hear_radio3 : ElementFinder
    peer_pod_hear_radio4 : ElementFinder
    peer_pod_hear_radio5 : ElementFinder
    peer_pod_hear_text_box1 : ElementFinder
    peer_pod_hear_text_box2 : ElementFinder
    peer_pod_hear_text_box3 : ElementFinder
    peer_pod_hear_checkbox1 : ElementFinder

    //A question of skill and will
    question_check1 : ElementFinder
    question_check2 : ElementFinder
    question_check3 : ElementFinder
    question_check4 : ElementFinder
    question_check5 : ElementFinder
    question_check6 : ElementFinder
    question_check7 : ElementFinder
    question_check8 : ElementFinder

    question_radio1 : ElementFinder
    question_radio2 : ElementFinder
    
    Resume_btn : ElementFinder
    Resume_btn_single : ElementFinder

    speak_peerpod_radio1 : ElementFinder
    speak_peerpod_text1 : ElementFinder
    speak_peerpod_radio2 : ElementFinder
    speak_peerpod_radio3 : ElementFinder
    speak_peerpod_radio4 : ElementFinder
    speak_peerpod_text2 : ElementFinder
    speak_peerpod_check1 : ElementFinder
    speak_peerpod_text3 : ElementFinder
    speak_peerpod_text4 : ElementFinder

    leader_as_coach_checkbox1 : ElementFinder
    leader_as_coach_checkbox3 : ElementFinder
    pdf_purposeful_questions : ElementFinder
	nav_radio1: ElementFinder
   	nav_radio2: ElementFinder
	nav_radio3: ElementFinder
	nav_radio4: ElementFinder
    nav_text_box1: ElementFinder
	together_text_box1: ElementFinder
	together_check_box1: ElementFinder
	together_check_box2: ElementFinder
	together_check_box3: ElementFinder
	together_radio1: ElementFinder
	together_radio2: ElementFinder
	together_radio3: ElementFinder
	
    coach_peerpod_text1 : ElementFinder
    coach_peerpod_text2 : ElementFinder
    coach_peerpod_check1 : ElementFinder
	coach_peerpod_check2 : ElementFinder

	completed_peerpod : ElementFinder
	notyet_peerpod : ElementFinder
    average_peerpod : ElementFinder
	
    constructor()
    {
        this.My_program_btn = element(by.xpath("//*[contains(text(),'My Program')]"));
        this.GoDo_btn = element(by.xpath("//*[contains(text(),'Go')]"));
        this.Start_btn= element(by.xpath('//button[@name="Start "]'));
        this.Start_btn_let_start = element(by.xpath('//span[@class="plugin-common__btn-start__text"][contains(.,"Start")]'));
        this.Resource_centre_btn= element(by.xpath('//span[@class="plugin-sidenav__item-text"][contains(.,"Resource Center")]'))
        this.pdf_lets_start_btn = element(by.xpath('//div[contains(@class,"plugin-download-btn")]'))
        this.Continue_Btn = element(by.xpath('//*[contains(text(),"Continue")]'))
        this.Menu_btn = element(by.xpath('(//i[@aria-hidden="true"][contains(.,"menu")])[2]'))
        this.text_box_not_being1=element(by.xpath('//*[@id="feelingsnotatyourbest"]'));
        this.text_box_not_being2=element(by.xpath('//*[@id="thoughtsnotatyourbest"]'));
        this.text_box_not_being3=element(by.xpath('//*[contains(@id,"younotbest")]'));
        this.text_box_not_being4=element(by.xpath('//*[contains(@id,"othersnotbest")]'));
        this.text_box_not_being5=element(by.xpath('//*[contains(@id,"businessnotbest")]'));
        this.text_box_recog1=element(by.xpath('//*[contains(@id,"feelingsbest")]'));
        this.text_box_recog2=element(by.xpath('//div[contains(@id,"thoughts")]'));
        this.text_box_recog3=element(by.xpath('//div[contains(@id,"youbest")]'));
        this.text_box_recog4=element(by.xpath('//div[contains(@id,"others")]'));
        this.text_box_recog5=element(by.xpath('//div[contains(@id,"businessbest")]'));
        this.text_box_heart1=element(by.xpath('//div[@id="samemotions"]'))
        this.pdf_heart=element(by.xpath("//div[@class='plugin-download-text']"));
        this.text_box_heart2=element(by.xpath("//div[contains(@id,'yourmoment')]"));
        this.text_box_heart3=element(by.xpath("//div[@id='youremotions']"));
        this.text_box_heart4=element(by.xpath("//div[@id='selftalk']"));
        this.text_box_head = element(by.xpath('//div[contains(@id,"yourrealist")]'));
        this.hands_radio1 = element(by.xpath('//div[@class="plugin-single__text"][contains(.,"A. ")]'));
        this.hands_text1= element(by.xpath("//div[contains(@id,'yourchoice')]"));
        this.see_textbox1 = element(by.xpath("//div[contains(@id,'naomijudgments')]"));
        this.see_textbox2 = element(by.xpath("//div[contains(@id,'impactjuan')]"));
        this.see_radio1 =element(by.xpath("//span[@class='plugin-single__text-title'][contains(.,'A.')]"));
        this.see_textbox3 = element(by.xpath("//div[contains(@id,'davidjugments')]"));
        this.see_textbox4 = element(by.xpath("//div[contains(@id,'impactstella')]"));
        this.see_radio2 = element(by.xpath("//div[@class='plugin-single__text'][contains(.,'A.')]"));
        this.see_continue= element(by.xpath("//span[contains(@class,'plugin-common__btn-continue__text')]"))
        this.godo_commit = element(by.xpath("//button[contains(@name,'Commit')]"))
        this.peer_pod_radio = element(by.xpath('//*[@id="mat-radio-47"]'))
        this.peer_pod_radio1=element(by.xpath('//*[@id="mat-radio-53"]'))
        this.peer_pod_yes = element(by.xpath("//label[contains(.,'Yes')]"))
        this.peer_pod_text1= element(by.xpath("//div[contains(@id,'ifyes')]"));
        this.peer_pod_text2= element(by.xpath("//div[contains(@id,'ifnow')]"));
        this.peer_pod_text3=element(by.xpath("//div[contains(@id,'actions')]"))
        this.peer_pod_radio2 = element(by.xpath("//div[@class='plugin-single__text'][contains(.,'I attended')]"));
        this.peer_pod_text4 = element(by.xpath("//div[contains(@id,'takeaway')]"));
        this.peer_pod_text5= element(by.xpath("//div[contains(@id,'actionpod')]"));
        this.the_battle_yes_btn = element(by.xpath("//label[@class='mat-radio-label'][contains(.,'Yes')]"));
        this.the_battle_yes_btn1= element(by.xpath('//*[@value="p2naomiplayback_item1"]'));
        this.the_battle_yes_btn2= element(by.xpath('//*[@value="p3naomiplayback_item1"]'));
        this.peer_pod_hear_radio1 = element(by.xpath('//*[@id="mat-radio-98"]'))
        this.peer_pod_hear_radio2 = element(by.xpath('//*[@id="mat-radio-102"]'))
        this.peer_pod_hear_text_box1 =element(by.xpath('//*[@id="playback"]'))
        this.peer_pod_hear_radio3= element(by.xpath('//*[@id="mat-radio-107"]'))
        this.peer_pod_hear_radio4=element(by.xpath('//*[contains(text(),"Once")]'))
        this.peer_pod_hear_text_box2=element(by.xpath('//*[@id="speakless"]'));
        this.peer_pod_hear_radio5 = element(by.xpath('//*[contains(text(),"attended the Peer")]'))
        this.peer_pod_hear_text_box3= element(by.xpath('//*[@id="reflect3"]'))
        this.peer_pod_hear_checkbox1= element(by.xpath('//*[contains(text(),"Playback")]'));
        this.question_check1 = element(by.xpath("//label[@class='mat-checkbox-layout'][contains(.,'C. The other ')]"));
        this.question_check2 = element(by.xpath("//*[contains(text(),'B.')]"));
        this.question_check3 = element(by.xpath('//*[contains(text(),"A. The other person")]'));
        this.question_check4 = element(by.xpath('//*[contains(text(),"A.")]'))
        this.question_check5 = element(by.xpath('//*[contains(text(),"C.")]'));
        this.question_check6 = element(by.xpath('//*[contains(text(),"A.")]'))
        this.question_check7 = element(by.xpath('//*[contains(text(),"C.")]'))
        this.question_check8 = element(by.xpath('//*[contains(text(),"A.")]'))
        this.question_radio1 = element(by.xpath("(//span[@class='plugin-single__text-title'][contains(.,'A. Explorer')])[1]"));
        this.question_radio2 = element(by.xpath("(//span[@class='plugin-single__text-title'][contains(.,'A. Explorer')])[2]"));
        this.Resume_btn = element(by.xpath('//*[contains(text(),"Resume")]'))
        this.Resume_btn_single = element(by.xpath('//*[contains(text(),"Resume")]'))
        this.speak_peerpod_radio1 = element(by.xpath('//*[@id="mat-radio-163"]'))
        this.speak_peerpod_text1 = element(by.xpath('//*[@id="GodoInput3"]'))
        this.speak_peerpod_radio2 = element(by.xpath('//*[@id="mat-radio-166"]'));
        this.speak_peerpod_radio3 = element(by.xpath('//*[@value="practicenewstyles_item1"]'))
        this.speak_peerpod_radio4 = element(by.xpath('//*[@value="experimenttorun_item1"]'))
        this.speak_peerpod_text2 = element(by.xpath('//*[@id="GodoInput3a"]'))
        this.speak_peerpod_check1 = element(by.xpath('//*[contains(text(),"When leading")]'))
        this.speak_peerpod_text3 = element(by.xpath('//*[@id="takeawayspod3"]'))
        this.speak_peerpod_text4 = element(by.xpath('//*[@id="oppflex"]'))
        this.leader_as_coach_checkbox1= element(by.xpath('//*[contains(text(),"Shared your own experience to help others learn")]'));
        this.leader_as_coach_checkbox3= element(by.xpath('//*[contains(text(),"Offered a listening ear or comfort")]'));
        this.pdf_purposeful_questions=element(by.xpath("//div[@class='plugin-download-text']"));
		this.nav_radio1 =element(by.xpath('//*[@value="samQ1_item1"]'))
		this.nav_radio2 =element(by.xpath('//*[@value="samQ2_item1"]'))
		this.nav_radio3 =element(by.xpath('//*[@value="samQ3_item1"]'))
		this.nav_radio4 =element(by.xpath('//*[@value="samQ4_item1"]')) 
        this.nav_text_box1= element(by.xpath('//*[@id="reflectcoach"]'))
		this.together_text_box1= element(by.xpath('//*[@id="AnnNaomi"]'))
        this.together_check_box1= element(by.xpath('//*[contains(text(),"G.")]'));
		this.together_check_box2= element(by.xpath('//*[contains(text(),"D.")]'));
		this.together_check_box3= element(by.xpath('//*[contains(text(),"A.")]'));
		this.together_radio1= element(by.xpath('//*[contains(text(),"What options do you have?")]')); 
		this.together_radio2= element(by.xpath('//*[contains(text(),"Expert")]'));
		this.together_radio3= element(by.xpath('//*[contains(text(),"That sounds great")]'));
		this.coach_peerpod_check1 = element(by.xpath('//*[contains(text(),"Challenging")]'));
		this.coach_peerpod_check2 = element(by.xpath('//*[contains(text(),"Accelerating")]'));
		this.coach_peerpod_text1 = element(by.xpath('//*[@id="inputfourone"]'))
		this.coach_peerpod_text2 = element(by.xpath('//*[@id="inputfourtwo"]'))
		this.completed_peerpod = element(by.xpath('//*[@value=1]/parent::*/parent::*/parent::*'))
		this.notyet_peerpod = element(by.xpath('//*[@value=2]/parent::*/parent::*/parent::*'))
        this.average_peerpod = element(by.xpath('//*[@value=3]/parent::*/parent::*/parent::*'))
    }

    Scenario_verify_first_module()
    {
        this.My_program_btn.click().then(function(){browser.sleep(5000)})
        this.Start_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function()
        {
            var el =  element(by.tagName('video'));
            browser.executeScript('arguments[0].currentTime=312;', el);
            browser.sleep(10000);
        });
        this.pdf_lets_start_btn.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){
            browser.sleep(5000)
            var el =  element(by.tagName('video'));
            browser.executeScript('arguments[0].currentTime=71;', el);
            browser.sleep(10000);
        });
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath("//img[contains(@src,'Completion.svg')]")).isPresent()).toBe(true);
        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);

    }

    Scenario_being_at_your_best()
    {
        this.Menu_btn.click().then(function(){browser.sleep(5000)});
        this.My_program_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function()
        {
            browser.sleep(5000)
            var el =  element(by.tagName('video'));
            browser.executeScript('arguments[0].currentTime=128;', el);
            browser.sleep(10000);

        });
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.text_box_not_being1.sendKeys("test1");
        this.text_box_not_being2.sendKeys("test2");
        this.text_box_not_being3.sendKeys("test3");
        this.text_box_not_being4.sendKeys("test4");
        this.text_box_not_being5.sendKeys("test5");

        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.text_box_recog1.sendKeys("test1");
        this.text_box_recog2.sendKeys("test2");
        this.text_box_recog3.sendKeys("test3");
        this.text_box_recog4.sendKeys("test4");
        this.text_box_recog5.sendKeys("test5");

        this.Continue_Btn.click().then(function()
        {
            browser.sleep(5000)
            var el =  element(by.tagName('video'));
            browser.executeScript('arguments[0].currentTime=113;', el);
            browser.sleep(10000);

        });
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
    }

    Scenario_getting_out_of_box()
    {
        this.Menu_btn.click().then(function(){browser.sleep(5000)});
        this.My_program_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function(){browser.sleep(3000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.text_box_heart1.sendKeys("test100").then(function(){browser.sleep(5000)});
        this.pdf_purposeful_questions.click().then(function(){browser.sleep(5000)})
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});



        this.text_box_heart2.sendKeys("test1");
        this.text_box_heart3.sendKeys("test2");
        this.text_box_heart4.sendKeys("test3");

        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//p[contains(.,"The second step")]')).isPresent()).toBe(true);
    }

    Scenario_head()
    {
        this.Continue_Btn.click().then(function()
        {
            browser.sleep(5000)
            var el =  element(by.tagName('video'));
            browser.executeScript('arguments[0].currentTime=96;', el);
            browser.sleep(10000);

        });
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.text_box_head.sendKeys("test 1");

        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//p[contains(.,"The last step")]')).isPresent()).toBe(true);
    }

    Scenario_hands()
    {

        this.hands_radio1.click().then(function(){browser.sleep(3000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.hands_text1.sendKeys("text1");
        this.pdf_lets_start_btn.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
    }

    Scenario_seeing_with_fresh_eyes_1()
    {
        this.Menu_btn.click().then(function(){browser.sleep(5000)});
        this.My_program_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function()
        {
            browser.sleep(3000);
            var el =  element(by.tagName('video'));
            browser.executeScript('arguments[0].currentTime=74;', el);
            browser.sleep(10000);
        });
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.see_textbox1.sendKeys("test1");
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.see_textbox2.sendKeys("test2");
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.see_radio1.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.see_textbox3.sendKeys("test3").then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.see_textbox4.sendKeys("test4").then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.see_radio2.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        //expect(element(by.xpath("//h3[contains(.,'Check your judgment')]")).isPresent()).toBe(true);
    }

    Scenario_seeing_with_fresh_eyes_2()
    {
        this.see_continue.click().then(function(){browser.sleep(5000)});
        this.see_continue.click().then(function(){browser.sleep(5000)});
        this.see_continue.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
    }

    Scenario_Go_Do_see()
    {
        this.Menu_btn.click().then(function(){browser.sleep(5000)});
        this.My_program_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.godo_commit.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.godo_commit.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
    }

    Scenario_peer_pod_see()
    {
        this.Menu_btn.click().then(function(){browser.sleep(5000)});
        this.My_program_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
		this.notyet_peerpod.click().then(function(){browser.sleep(5000)});
        this.peer_pod_yes.click().then(function(){browser.sleep(5000)});
        this.peer_pod_text1.sendKeys("text1");
        this.peer_pod_text2.sendKeys("text2").then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});     
        this.notyet_peerpod.click().then(function(){browser.sleep(5000)});
        this.peer_pod_text3.sendKeys("test4").then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.peer_pod_radio2.click().then(function(){browser.sleep(5000)});
        this.peer_pod_text4.sendKeys("test4");
        this.peer_pod_text5.sendKeys("test5");
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//*[contains(text(),"Well done!")]')).isPresent()).toBe(true);
    }

    Scenario_hear_introduction()
    {
        this.Menu_btn.click().then(function(){browser.sleep(5000)});
        this.My_program_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function()
        {
            browser.sleep(5000);
            var el =  element(by.tagName('video'));
            browser.executeScript('arguments[0].currentTime=56;', el);
            browser.sleep(10000);
        });
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
    }

    Scenario_the_battle_of_two_voices()
    {
        this.Menu_btn.click().then(function(){browser.sleep(5000)});
        this.My_program_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.the_battle_yes_btn.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.the_battle_yes_btn1.click().then(function(){browser.sleep(5000)});
        this.the_battle_yes_btn2.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
    }

    Scenario_the_power_of_curiosity()
    {
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function()
        {
            browser.sleep(3000);
            var el =  element(by.tagName('video'));
            browser.executeScript('arguments[0].currentTime=76;', el);
            browser.sleep(10000);
        });
        this.see_continue.click().then(function(){browser.sleep(10000)});
        this.see_continue.click().then(function(){browser.sleep(10000)});
        this.see_continue.click().then(function(){browser.sleep(10000)});
        this.see_continue.click().then(function(){browser.sleep(10000)});
        this.see_continue.click().then(function(){browser.sleep(10000)});
        //this.see_continue.click().then(function(){browser.sleep(10000)});
        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
    }

    Scenario_Go_do_hear()
    {
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function(){browser.sleep(5000)});
        this.godo_commit.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.godo_commit.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
    }

    Scenario_peer_pod_coaching_hear()
    {
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function(){browser.sleep(5000)});
        this.notyet_peerpod.click().then(function(){browser.sleep(5000)});
        this.average_peerpod.click().then(function(){browser.sleep(5000)});
        this.peer_pod_hear_text_box1.sendKeys("test test").then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.completed_peerpod.click().then(function(){browser.sleep(5000)});
        this.peer_pod_hear_radio4.click().then(function(){browser.sleep(5000)});
        this.peer_pod_hear_text_box2.sendKeys("test test test").then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.peer_pod_hear_radio5.click().then(function(){browser.sleep(5000)});
        this.peer_pod_hear_text_box3.sendKeys("test 1223")
        this.peer_pod_hear_checkbox1.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//*[contains(text(),"Well done!")]')).isPresent()).toBe(true);
    }

    Scenario_Speak_introduction()
    {
        this.Menu_btn.click().then(function(){browser.sleep(5000)});
        this.My_program_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function()
        {
            browser.sleep(5000);
            var el =  element(by.tagName('video'));
            browser.executeScript('arguments[0].currentTime=73;', el);
            browser.sleep(10000);
        });
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
    }

    Scenario_the_four_style_of_an_effective_leader()
    {
        this.Menu_btn.click().then(function(){browser.sleep(5000)});
        this.My_program_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function()
        {
            browser.sleep(5000);
            var el =  element(by.tagName('video'));
            browser.executeScript('arguments[0].currentTime=165;', el);
            browser.sleep(10000);
        });
        this.Continue_Btn.click().then(function(){browser.sleep(8000)});
        this.question_check1.click().then(function(){browser.sleep(8000)});
        this.Continue_Btn.click().then(function(){browser.sleep(8000)});
        this.question_check2.click().then(function(){browser.sleep(8000)});
        this.Continue_Btn.click().then(function(){browser.sleep(8000)});
        this.question_check3.click().then(function(){browser.sleep(8000)});
        this.Continue_Btn.click().then(function(){browser.sleep(8000)});
        this.question_check4.click().then(function(){browser.sleep(8000)});
        this.Continue_Btn.click().then(function(){browser.sleep(8000)});
        this.question_check5.click().then(function(){browser.sleep(8000)});
        this.Continue_Btn.click().then(function(){browser.sleep(8000)});
        this.question_check6.click().then(function(){browser.sleep(8000)});
        this.Continue_Btn.click().then(function(){browser.sleep(8000)});
        this.question_check7.click().then(function(){browser.sleep(8000)});
        this.Continue_Btn.click().then(function(){browser.sleep(8000)});
        this.question_check8.click().then(function(){browser.sleep(8000)});
        this.Continue_Btn.click().then(function(){browser.sleep(8000)});
        this.Continue_Btn.click().then(function(){browser.sleep(8000)});
        this.Continue_Btn.click().then(function(){browser.sleep(8000)});

        this.question_radio1.click().then(function(){browser.sleep(5000)});
        this.question_radio2.click().then(function(){browser.sleep(5000)});
        this.question_radio2.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});

        this.question_radio1.click().then(function(){browser.sleep(5000)});
        this.question_radio1.click().then(function(){browser.sleep(5000)});
        this.question_radio2.click().then(function(){browser.sleep(5000)});
        this.question_radio2.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});

        this.see_continue.click().then(function(){browser.sleep(5000)});

        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
    }

    Scenario_Speak_GoDo()
    {
        this.Menu_btn.click().then(function(){browser.sleep(5000)});
        this.My_program_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function(){browser.sleep(5000)});
        this.godo_commit.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.godo_commit.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
    }

    Scenario_Speak_peer_pod()
    {
        this.Menu_btn.click().then(function(){browser.sleep(5000)});
        this.My_program_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function(){browser.sleep(5000)});
        this.completed_peerpod.click().then(function(){browser.sleep(5000)});
        this.speak_peerpod_text1.sendKeys("test test").then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.notyet_peerpod.click().then(function(){browser.sleep(5000)});
        this.speak_peerpod_radio3.click().then(function(){browser.sleep(5000)});
        this.speak_peerpod_radio4.click().then(function(){browser.sleep(5000)});
        this.speak_peerpod_text2.sendKeys("text text text").then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.peer_pod_radio2.click().then(function(){browser.sleep(5000)});
        this.speak_peerpod_check1.click().then(function(){browser.sleep(5000)});
        this.speak_peerpod_text3.sendKeys("test test test");
        this.speak_peerpod_text4.sendKeys("test test").then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});

        expect(element(by.xpath('//*[contains(text(),"Great work")]')).isPresent()).toBe(true);
    }

    //Coach and develop
	Scenario_What_is_coaching()
	{
	this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function()
        {
            browser.sleep(3000);
            var el =  element(by.tagName('video'));
            browser.executeScript('arguments[0].currentTime=106;', el);
            browser.sleep(10000);
        });
	this.Continue_Btn.click().then(function(){browser.sleep(5000)});	
	this.leader_as_coach_checkbox1.click().then(function(){browser.sleep(5000)});
	this.leader_as_coach_checkbox3.click().then(function(){browser.sleep(5000)});
	this.Continue_Btn.click().then(function(){browser.sleep(5000)});
	expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
	
	}
	
	
	Scenario_Coach_as_a_navigation_system()
	{
		this.Continue_Btn.click().then(function(){browser.sleep(5000)});
		this.Start_btn_let_start.click().then(function()
        {
            browser.sleep(3000);
            var el =  element(by.tagName('video'));
            browser.executeScript('arguments[0].currentTime=79;', el);
            browser.sleep(10000);
        });
		this.pdf_purposeful_questions.click().then(function(){browser.sleep(8000)});
		this.Continue_Btn.click().then(function(){browser.sleep(8000)});
		this.Continue_Btn.click().then(function(){browser.sleep(8000)});
		this.nav_radio1.click().then(function(){browser.sleep(8000)});
		this.Continue_Btn.click().then(function(){browser.sleep(8000)});
		this.nav_radio2.click().then(function(){browser.sleep(8000)});
		this.nav_radio3.click().then(function(){browser.sleep(8000)});
		this.nav_radio4.click().then(function(){browser.sleep(8000)});
		this.Continue_Btn.click().then(function(){browser.sleep(8000)});
        this.nav_text_box1.sendKeys("business value");
		this.Continue_Btn.click().then(function(){browser.sleep(5000)});
		expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
	}
	
	
	Scenario_See_Hear_Speak_as_a_coach()
	{
		this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function(){browser.sleep(5000)});
 		this.together_text_box1.sendKeys("business value1");
	this.Continue_Btn.click().then(function(){browser.sleep(5000)});
		this.together_check_box1.click().then(function(){browser.sleep(8000)});
		this.together_check_box2.click().then(function(){browser.sleep(8000)});
		this.together_check_box3.click().then(function(){browser.sleep(8000)});
		this.Continue_Btn.click().then(function(){browser.sleep(5000)});		
		this.together_radio1.click().then(function(){browser.sleep(8000)});
		this.together_radio1.click().then(function(){browser.sleep(8000)});
		this.together_radio2.click().then(function(){browser.sleep(8000)});
		this.together_radio2.click().then(function(){browser.sleep(8000)});
		this.together_radio3.click().then(function(){browser.sleep(8000)});
		this.together_radio3.click().then(function(){browser.sleep(8000)});
		this.Continue_Btn.click().then(function(){browser.sleep(8000)});
		this.pdf_lets_start_btn.click().then(function(){browser.sleep(8000)});
		this.see_continue.click().then(function(){browser.sleep(8000)});
        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
	}	
		
			
		Scenario_Go_do_coach()
    {
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.Start_btn_let_start.click().then(function(){browser.sleep(5000)});
        this.godo_commit.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        this.godo_commit.click().then(function(){browser.sleep(5000)});
        this.Continue_Btn.click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
    }

		Scenario_Peer_Pod_coach()
{
		this.Continue_Btn.click().then(function(){browser.sleep(5000)});
		this.Start_btn_let_start.click().then(function(){browser.sleep(5000)});
		this.completed_peerpod.click().then(function(){browser.sleep(5000)});
		this.coach_peerpod_check1.click().then(function(){browser.sleep(5000)});
        this.coach_peerpod_check2.click().then(function(){browser.sleep(5000)});
        this.coach_peerpod_text1.sendKeys("business value 30").then(function(){browser.sleep(5000)});
        this.coach_peerpod_text2.sendKeys("business value 31").then(function(){browser.sleep(5000)});
		this.pdf_lets_start_btn.click().then(function(){browser.sleep(5000)});
		
		
		this.Continue_Btn.click().then(function(){browser.sleep(5000)});
		this.notyet_peerpod.click().then(function(){browser.sleep(5000)});
		element(by.xpath('//*[@id="inputreflectionthree"]')).sendKeys("business value 34").then(function(){browser.sleep(5000)});
		element(by.xpath('//*[@id="inputreflectionfive"]')).sendKeys("business value 35").then(function(){browser.sleep(5000)});
		this.pdf_lets_start_btn.click().then(function(){browser.sleep(5000)});
		this.Continue_Btn.click().then(function(){browser.sleep(5000)});

		
		this.pdf_lets_start_btn.click().then(function(){browser.sleep(5000)});
		this.Continue_Btn.click().then(function(){browser.sleep(5000)});

		this.peer_pod_radio2.click().then(function(){browser.sleep(5000)});
		this.pdf_lets_start_btn.click().then(function(){browser.sleep(5000)});
		element(by.xpath('//*[@id="takeawayM4"]')).sendKeys("business value 36").then(function(){browser.sleep(5000)});
		element(by.xpath('//*[@id="actionpod4"]')).sendKeys("business value 37").then(function(){browser.sleep(5000)});		
		this.Continue_Btn.click().then(function(){browser.sleep(5000)});

        expect(element(by.xpath('//*[contains(text(),"Well done!")]')).isPresent()).toBe(true);
	
    }

     Scenario_WrapUp()
    {
	    this.Continue_Btn.click().then(function(){browser.sleep(5000)});
		this.Start_btn_let_start.click().then(function()
        {
            browser.sleep(3000);
            var el =  element(by.tagName('video'));
            browser.executeScript('arguments[0].currentTime=99;', el);
            browser.sleep(10000);
        });

	    element(by.xpath('//*[contains(text(),"Hear")]')).click().then(function(){browser.sleep(5000)});
	    element(by.xpath('//*[contains(text(),"Speak")]')).click().then(function(){browser.sleep(5000)});
	    element(by.xpath('//*[contains(text(),"Coach and develop")]')).click().then(function(){browser.sleep(5000)});	
	    element(by.xpath('//*[@id="howto"]')).sendKeys("business value33");
	    this.Continue_Btn.click().then(function(){browser.sleep(5000)});
	    this.pdf_lets_start_btn.click().then(function(){browser.sleep(5000)});
	    this.Continue_Btn.click().then(function(){browser.sleep(5000)});
	    expect(element(by.xpath('//*[contains(text(),"Congratulations")]')).isPresent()).toBe(true);
    }

    Scenario_GoDo()
    {
        browser.sleep(10000)
        this.Menu_btn.click().then(function(){browser.sleep(5000)});
        this.My_program_btn.click().then(function(){browser.sleep(5000)});
        element(by.xpath('//*[contains(text(),"Go Dos")]')).click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath("//*[contains(text(),'Practice getting out of the box')]")).isPresent()).toBe(true)
        expect(element(by.xpath("//*[contains(text(),'Practice seeing others')]")).isPresent()).toBe(true)
        expect(element(by.xpath("//*[contains(text(),'Practice hearing others')]")).isPresent()).toBe(true)
        expect(element(by.xpath("//*[contains(text(),'Talk less, listen more')]")).isPresent()).toBe(true)
        expect(element(by.xpath("//*[contains(text(),'Flex your Supporter')]")).isPresent()).toBe(true)
        expect(element(by.xpath("//*[contains(text(),'Practice a new style with a team member')]")).isPresent()).toBe(true)
        expect(element(by.xpath("//*[contains(text(),'Use the navigation system framework to coach for development')]")).isPresent()).toBe(true)
        expect(element(by.xpath("//*[contains(text(),'Flex your Challenger approach')]")).isPresent()).toBe(true)
    }

    Scenario_ResourceCenter()
    {
        this.Resource_centre_btn.click().then(function(){browser.sleep(5000)})
        let list = element.all(by.xpath('//*[@class="mat-card-header-text"]'));
        expect(list.count()).toBe(30);
    }

    Scenario_support()
    {
        element(by.xpath('//*[contains(text(),"Support")]')).click().then(function(){browser.sleep(5000)});
        expect(element(by.xpath('//*[contains(text(),"The Continue button is grayed out")]')).isPresent()).toBe(true);
        expect(element(by.xpath('//*[contains(text(),"Videos are not displaying/playing properly.")]')).isPresent()).toBe(true);
        expect(element(by.xpath('//*[contains(text(),"Can I access the program outside the Abbott network?")]')).isPresent()).toBe(true);
        expect(element(by.xpath('//*[contains(text(),"Who will receive data on my participation in the program?")]')).isPresent()).toBe(true);

        //let list1 = element.all(by.xpath('//*[@role="button"]'));
        //expect(list1.count()).toBe(8);

    }

}
