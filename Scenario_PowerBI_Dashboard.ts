import { createPublicKey } from "crypto";
import { ElementFinder, element,by, browser ,protractor } from "protractor";
import { DriverProvider } from "protractor/built/driverProviders";
import { textChangeRangeIsUnchanged, VariableLikeDeclaration } from "typescript";
let x ;
let y ;

export class scenario
{
    //side links 
    Dashboard_and_Reporting : ElementFinder
    tracking_user_completed_users : ElementFinder
    tracking_user_leadingPPA_radio_btn : ElementFinder
    Select_division : ElementFinder
    Select_cohort : ElementFinder
    Select_Job_level : ElementFinder
    Select_Employee_status : ElementFinder
    Select_work_location : ElementFinder
    Select_work_state : ElementFinder
    Select_work_region : ElementFinder
    Grab_date : ElementFinder

    

    constructor()
    {
        this.Dashboard_and_Reporting = element(by.xpath('//*[contains(text(),"Dashboards & Reporting")]'));
        this.tracking_user_completed_users = element(by.xpath('//*[@title="Completed Users"]/following-sibling::visual-modern//*[@name="visual-sandbox"]'))
        this.tracking_user_leadingPPA_radio_btn = element(by.xpath('//*[@title="Leading with Impact Post Program Actions"]'))
        this.Select_division = element(by.xpath('//*[@title="SELECT DIVISION"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'));
        this.Select_Employee_status = element(by.xpath('//*[@title="SELECT EMPLOYEE STATUS"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'))
        this.Select_Job_level = element(by.xpath('//*[@title="SELECT JOB LEVEL"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'))
        this.Select_cohort = element(by.xpath('//*[@title="SELECT COHORT"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'));
        this.Grab_date = element(by.xpath('//*[@id="sandbox-host"]//p//*[@title="Dashboard Last Updated on"]'))
        
        this.Select_Job_level = element(by.xpath('//*[@title="SELECT JOB LEVEL"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'))
        this.Select_work_location= element(by.xpath('//*[@title="SELECT WORK LOCATION"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'));
        this.Select_work_state = element(by.xpath('//*[@title="SELECT WORK STATE"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'));
        this.Select_work_region = element(by.xpath('//*[@title="SELECT REGION"]/following-sibling::visual-modern//*[@class="slicer-restatement"]'));
        
    }

    Verify_power_BI_files()
    {
        this.Dashboard_and_Reporting.click();
        browser.switchTo().frame(element(by.xpath('//iframe[@src]')).getWebElement());
        browser.sleep(15000);
        expect(element(by.xpath('//*[@title="Completed Users"]/following-sibling::visual-modern//*[@name="visual-sandbox"]')).isDisplayed()).toBe(true);
    }

    Verify_changing_values_leadingPPA()
    {
        this.tracking_user_leadingPPA_radio_btn.click().then(function(){browser.sleep(10000)});
    }


     Verify_Blank_DropDown()
    {
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
                        fail(""); 
                    }             
            }
        }) 

    }
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

    Compare_current_date()
    {
        this.Grab_date.getText().then(function(text)
        {
           console.log("Dashboard date is " + text.substring(0,15));
           var today = new Date();
           var string = today.toString();
           console.log("System date is " + string.substring(0,15));
           if(text.substring(0,15)==string.substring(0,15))
           {
                console.log("Dates are matching")
                
           }
           else
           {
               fail("Dates do not match")
           }
           browser.switchTo().defaultContent();
           browser.switchTo().frame(element(by.xpath('//iframe[@src]')).getWebElement());
        })
       
    }

    Completed_percentage(x,y)
    {
        x.click().then(function(){browser.sleep(5000)});
        y.getText().then(function(text)
        {
            console.log("completion % " + text);
            var str = text ;
            let patt1 = str.replace(/%/g, '');
            var a =  parseInt(patt1);
            console.log("result is " + isFinite(a));
            if(a>100)
            {
                fail("The number is greater than 100");
            }
            else
            {
                console.log("Pass");
            }
        })

    }

    Active_user_less_than_register_user(x,y)
    {
        let a;
        let b;
        x.getText().then(function(text)
        {
            console.log(" Active user is " + text )
            a = text;
        })
        
        y.getText().then(function(text1)
        {
            console.log(" Registered user is " + text1 )
             b = text1; 
             console.log("a is " + a);
             console.log("b is " + b);
             if(a<b)
             {
                 console.log("Active user is less than register user");
             }
             else
             {
                 fail("Active user is more than register user")
             }
        })    
        
    }

    Active_user_and_register_user_are_different(x,y)
    {
        let a;
        let b;
        x.getText().then(function(text)
        {
            console.log(" Active user is " + text )
            a = text;
        })
        
        y.getText().then(function(text1)
        {
            console.log(" Registered user is " + text1 )
             b = text1; 
             console.log("a is " + a);
             console.log("b is " + b);
             if(a==b)
             {
                 fail("Active user and register user are same")
             }
             else
             {
                 console.log("Active user and registered user are different")
             }
        })    
        
    }

    User_completion_not_blank(x,y)
    {
        browser.switchTo().frame((x).getWebElement());
        console.log("my x is " + x);
        console.log("my y is "+ y);
        y.getText().then(function(text)
        {
            console.log("1st page completion is  " + text);
            if(text=='(Blank)')
            {
                fail('Blank text is present in completion %')
            }
            else 
            {
                console.log('Blank text is not present in completion %')
            }
        });
        browser.switchTo().defaultContent();
        browser.switchTo().frame(element(by.xpath('//iframe[@src]')).getWebElement());
    }

    Verify_Go_DO_tab()
    {
        element(by.xpath('//*[contains(text(),"Go-Do")]')).click().then(function(){browser.sleep(8000)})
    }

    Participants_POD_blank(x)
    {
        
        element(by.xpath('//*[contains(text(),"Pods")]')).click().then(function(){browser.sleep(8000)})
        x.getText().then(function(text)
        {
            if(text=='(Blank)')
            {
                fail('There are no participants')
            }
            else 
            {
                console.log('POD output');
            }
        })

    }

   
    Verify_blank_drop_down_all_tabs()
    { 
        this.Select_cohort.click().then(function(){browser.sleep(2000)});  
        //this.Verify_Blank_DropDown();
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
                        fail("blank is present in select cohort"); 
                    }             
            }
        }) 
        this.Select_cohort.click().then(function(){browser.sleep(2000)});

        this.Select_division.click().then(function(){browser.sleep(2000)});
        //this.Verify_Blank_DropDown();
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
                        fail("Blank is present in select division"); 
                    }             
            }
        }) 
        this.Select_division.click().then(function(){browser.sleep(2000)});

        this.Select_Job_level.click().then(function(){browser.sleep(2000)});
        //this.Verify_Blank_DropDown();
        element.all(by.xpath('//*[@class="slicerText"]')).getText().then(function(text)
        {
            //console.log(text);
            let i=0;
            console.log("length is " + text.length)
            for(i ; i<=text.length ;i++)
            {
                    if(text[i]==('(Blank)'))
                    {
                        console.log('Blank is present in select job level' + text[i]);
                        fail("Blank is present in select job level"); 
                    }             
            }
        }) 
        this.Select_Job_level.click().then(function(){browser.sleep(2000)});

        this.Select_Employee_status.click().then(function(){browser.sleep(2000)});
        //this.Verify_Blank_DropDown();
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
                        fail("Blank is present in Employee status"); 
                    }             
            }
        }) 
        this.Select_Employee_status.click().then(function(){browser.sleep(2000)});

        this.Select_work_location.click().then(function(){browser.sleep(2000)});
        //this.Verify_Blank_DropDown();
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
                        fail("Blank is present in work location"); 
                    }             
            }
        }) 
        this.Select_work_location.click().then(function(){browser.sleep(2000)});

        this.Select_work_state.click().then(function(){browser.sleep(2000)});
        //this.Verify_Blank_DropDown();
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
                        fail("Blank is present in Work state"); 
                    }             
            }
        }) 
        this.Select_work_state.click().then(function(){browser.sleep(2000)});
        this.Select_work_region.click().then(function(){browser.sleep(2000)});
        //this.Verify_Blank_DropDown();
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
                        fail("Blank is present in Work region"); 
                    }             
            }
        }) 
        this.Select_work_region.click().then(function(){browser.sleep(2000)});
    }

    Verify_Blank_in_all_drop_down_tracking_user_progress()
    {
        element(by.xpath('//*[contains(text(),"Tracking Users")]')).click().then(function(){browser.sleep(5000)})
        this.Verify_blank_drop_down_all_tabs();
    }
    Verify_Blank_in_all_drop_down_Dashboard()
    {
        element(by.xpath("//*[@title='Dashboard']")).click().then(function(){browser.sleep(5000)})
        this.Verify_blank_drop_down_all_tabs();
    }

    Verify_Blank_in_all_drop_down_pods()
    {
        element(by.xpath("//*[@title='Pods']")).click().then(function(){browser.sleep(5000)})
        this.Verify_blank_drop_down_all_tabs();
    }

    Verify_Blank_in_all_drop_down_Sustainable_Dashboard()
    {
        element(by.xpath("//*[@title='Sustainment Dashboard']")).click().then(function(){browser.sleep(5000)});
        this.Verify_blank_drop_down_all_tabs();
    }

    Verify_Email_id()
    {
        element.all(by.xpath('//*[@title="Participant"]/../../following-sibling::div[@class="rowHeaders"]//*//*//*')).getText().then(function(text)
        {
           
            console.log("length is " + text.length);
            for(var i =0 ; i< text.length;i++)
            {
                console.log(i + " result is" + text[i]+ "<br>");
                if(text[i].includes('@'))
                {
                    console.log('pass')
                }
                else
                {
                    fail('Invalid Email id observed')
                }
            }
        });
    }
    Learning_Activities_completion()
    {
        element(by.xpath('//*[contains(text(),"Learning Activities")]')).click().then(function(){browser.sleep(8000)});
        element(by.xpath('//*[@title="alejandro.wellisch@abbott.com"]')).click().then(function(){console.log('clicked')});
        browser.actions().sendKeys(protractor.Key.DOWN).perform();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.actions().sendKeys(protractor.Key.DOWN).perform();
        browser.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();

        this.Verify_Email_id();

        for(var i=0 ; i<30 ; i++)
        {
            browser.actions().sendKeys(protractor.Key.DOWN).perform();           
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
        }
       
        this.Verify_Email_id();

        for(var i=0 ; i<20 ; i++)
        {
            
            browser.actions().sendKeys(protractor.Key.DOWN).perform();           
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
        }
        this.Verify_Email_id(); 
    }

}
    