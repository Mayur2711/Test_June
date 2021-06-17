import { ElementFinder, element,by, browser ,protractor } from "protractor";
import {scenario} from "./Scenario_PowerBI_Dashboard";

let sce= new scenario();
let x;
let y;
export class scenario_abbott
{
    Active_user: ElementFinder
    Registered_user : ElementFinder
    Dashboard : ElementFinder
    Completion_percentage : ElementFinder
    No_of_participants : ElementFinder
    
    constructor()
    {
        this.Active_user= element(by.xpath('//*[@title="ACTIVE USERS"]/following-sibling::visual-modern//*[@class="card"]'));
        this.Registered_user = element(by.xpath('//*[@title="REGISTERED USERS"]/following-sibling::visual-modern//*[@class="card"]'));
        this.Dashboard = element(by.xpath('//*[@title="Dashboard"]'))
        this.Completion_percentage =  element(by.xpath('//*[@title="COMPLETED"]/following-sibling::visual-modern//*[@class="card"]'));
        this.No_of_participants = element(by.xpath('//*[@title="No of Participants"]/following-sibling::visual-modern//*[@class="card"] '))
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

    Compare_date()
    {
        browser.switchTo().frame(element(by.xpath('//*[@style="width: 262.223px; height: 17.4973px;"]')).getWebElement());
        sce.Compare_current_date();
    }

    Completed_percentage()
    {
        x= this.Dashboard;
        y= this.Completion_percentage;
        sce.Completed_percentage(x,y);
    }

    Participants_POD_blank()
    {
        x=this.No_of_participants;
        sce.Participants_POD_blank(x)
    }

    User_completion_not_blank()
    {
        element(by.xpath('//*[contains(text(),"Tracking Users Progress")]')).click().then(function(){browser.sleep(1000)})
        x = element(by.xpath('//*[@style="width: 120.626px; height: 36.4252px;"]'))
        y = element(by.xpath('//*[@title="Count of userId"]'));
        sce.User_completion_not_blank(x,y)
    }

}