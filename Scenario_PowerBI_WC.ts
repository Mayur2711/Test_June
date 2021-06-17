import { ElementFinder, element,by, browser ,protractor } from "protractor";
import { scenario } from "./Scenario_PowerBI_Dashboard";
var globalVariable;

let sce= new scenario();
let x;
let y;

export class scenario_wc
{
    Active_user :ElementFinder;
    Completed_user :ElementFinder;
    Registered_user : ElementFinder
    No_of_completed_individuals : ElementFinder
    No_of_pods : ElementFinder
    No_of_missed_individuals : ElementFinder
    

    constructor()
    {
        this.Active_user=element(by.xpath('//*[contains(text(),"Active Users")]/../../..//*'))
        this.Registered_user = element(by.xpath('//*[contains(text(),"Registered Users")]/../../..//*'));
        this.Completed_user = element(by.xpath('//*[contains(text(),"Completed Users")]/../../..//*'));
        this.No_of_completed_individuals= element(by.xpath('//*[@title="No of Completed Individuals"]/following-sibling::visual-modern//*[@class="card"]'))   
        this.No_of_pods = element(by.xpath('//*[@title="No of Pods"]/following-sibling::visual-modern//*[@class="card"] '))
        this.No_of_missed_individuals = element(by.xpath('//*[@title="No of Missed Individuals"]/following-sibling::visual-modern//*[@class="card"] '))
    }   

   
    Active_user_less_than_register_user()
    {
        let x ;
        let y ;
        x=this.Active_user;
        y=this.Registered_user;
        sce.Active_user_less_than_register_user(x,y);
    }

  
        
    Active_user_and_register_user_are_different()
    {
        let x ;
        let y ;
        x=this.Active_user;
        y=this.Registered_user;
        sce.Active_user_and_register_user_are_different(x,y);
    }

    User_completion_not_blank()
    {
        element(by.xpath('//*[contains(text(),"Tracking Users progress")]')).click();
        x = element(by.xpath('//*[@style="width: 98.1487px; height: 49.0112px;"]'))
        y = element(by.xpath('//*[@title="Count of Email"]'));
        sce.User_completion_not_blank(x,y)
    }

    
    Participants_POD_blank()
    {
        element(by.xpath('//*[contains(text(),"Pods")]')).click().then(function(){browser.sleep(8000)})
        this.No_of_completed_individuals.getText().then(function(text)
        {
            if(text=='(Blank)')
            {
                fail('There are no participants in completed individual block')
            }
            else 
            {
                console.log('POD output');
            }
        })
        this.No_of_pods.getText().then(function(text)
        {
            if(text=='(Blank)')
            {
                fail('There are no participants in No of pods block')
            }
            else 
            {
                console.log('POD output');
            }
        })
        this.No_of_missed_individuals.getText().then(function(text)
        {
            if(text=='(Blank)')
            {
                fail('There are no participants in No of missed individuals')
            }
            else 
            {
                console.log('POD output');
            }
        })
    }

    Verify_blank_Main_dashboard()
    {
        element(by.xpath('//*[contains(text(),"Main Dashboard")]')).click();
        this.Active_user.getText().then(function(text)
        {
            if(text=='(Blank)')
            {
                fail('There are no participants in No of missed individuals')
            }
            else 
            {
                console.log('POD output');
            }
        });
        this.Registered_user.getText().then(function(text)
        {
            if(text=='(Blank)')
            {
                fail('There are no participants in No of missed individuals')
            }
            else 
            {
                console.log('POD output');
            }
        });
        this.Completed_user.getText().then(function(text)
        {
            if(text=='(Blank)')
            {
                fail('There are no participants in No of missed individuals')
            }
            else 
            {
                console.log('POD output');
            }
        });
    }

    Verify_blank(globalVariable)
    {
        var text=globalVariable;
        if(text=='(Blank)')
            {
                fail('Blank text is present in landing page tabs')
            }
            else 
            {
                console.log('POD output');
            }
    }
   
   
    Verify_blank_tracking_user_progress()
    {
        element(by.xpath('//*[contains(text(),"Tracking Users progress")]')).click();
        browser.switchTo().frame(element(by.xpath('//*[@style="width: 89.3641px; height: 50.1139px;"]')).getWebElement())
        element(by.xpath('//*[@title="Count of Column1.email"]')).getText().then((text1) =>
        {
            this.Verify_blank(text1);
            console.log("text is " + text1)
        });
        browser.switchTo().defaultContent();
        browser.switchTo().frame(element(by.xpath('//iframe[@src]')).getWebElement());
        browser.switchTo().frame(element(by.xpath('//*[@style="width: 93.4887px; height: 48.739px;"]')).getWebElement());
        element(by.xpath('//*[@title="Count of Email"]')).getText().then((text1) =>
        {
            this.Verify_blank(text1);
            console.log("text is " + text1)
        });
        browser.switchTo().defaultContent();
        browser.switchTo().frame(element(by.xpath('//iframe[@src]')).getWebElement());
        browser.switchTo().frame(element(by.xpath('//*[@style="width: 98.1487px; height: 49.0112px;"]')).getWebElement());
        element(by.xpath('//*[@title="Count of Email"]')).getText().then((text1) =>
        {
            this.Verify_blank(text1);
            console.log("text is " + text1);
        });
        browser.switchTo().defaultContent();
        browser.switchTo().frame(element(by.xpath('//iframe[@src]')).getWebElement());
    }

    Verify_blank_PODS_tab()
    {
        element(by.xpath('//*[@title="Pods"]')).click();
        this.No_of_pods.getText().then((text1) =>
        {
            browser.sleep(2000)
            this.Verify_blank(text1);
            console.log("text in pods is " + text1);
        });
        this.No_of_completed_individuals.getText().then((text1) =>
        {
            browser.sleep(2000)
            this.Verify_blank(text1);
            console.log("text in pods is " + text1);
        });
        this.No_of_missed_individuals.getText().then((text1) =>
        {
            browser.sleep(2000)
            this.Verify_blank(text1);
            console.log("text in pods is " + text1);
        });

       //sce.Verify_Blank_DropDown();
       element.all(by.xpath('//*[@class="slicerText"]')).getText().then(function(text)
        {
            //console.log(text);
            let i=0;
            console.log("length is " + text.length)
            for(i ; i<=text.length ;i++)
            {
                    if(text[i]==('(Blank)'))
                    {
                        console.log('Blank present' + text[i]);
                        fail("Blank text is present in the landing page checkboxes"); 
                    }             
            }
        })

    
    }

    Verify_Email_id_and_CohortId_in_participant_list()
    {
        element(by.xpath('//*[@title="Pods"]')).click();
        element(by.xpath('//*[@title="alain.godard@wonderful.com"]')).click().then(function(){console.log('clicked')});
        browser.actions().sendKeys(protractor.Key.DOWN).perform().then(function(){browser.sleep(5000)});
        browser.actions().sendKeys(protractor.Key.ENTER).perform().then(function(){browser.sleep(5000)});
        browser.actions().sendKeys(protractor.Key.DOWN).perform().then(function(){browser.sleep(5000)});
        browser.actions().sendKeys(protractor.Key.ARROW_LEFT).perform().then(function(){browser.sleep(5000)});
        browser.actions().sendKeys(protractor.Key.ENTER).perform().then(function(){browser.sleep(5000)});

        sce.Verify_Email_id();

        for(var i=0 ; i<10 ; i++)
        {
            browser.actions().sendKeys(protractor.Key.DOWN).perform();           
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
        }
        sce.Verify_Email_id();
        for(var i=0 ; i<10 ; i++)
        {
            browser.actions().sendKeys(protractor.Key.DOWN).perform();           
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
        }
        sce.Verify_Email_id(); 
    }


}