import { browser } from "protractor";
var HtmlReporter = require('protractor-beautiful-reporter');
declare var global: any


exports.config = 
{
  //Reports folder for microsoft
  /*plugins: [{
    package: 'protractor-screenshoter-plugin',
    screenshotPath: './REP/e2e',
    screenshotOnExpect: 'failure+success',
    screenshotOnSpec: 'none',
    withLogs: true,
    writeReportFreq: 'asap',
    imageToAscii: 'none',
    clearFoldersBeforeTest: true
  }],*/
  //directConnect: true,
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['Journey_PowerBi_Dashboard.js'],
  
  
  onPrepare: function () 
  {
    //Reports folder for salesforce 
    jasmine.getEnv().addReporter(new HtmlReporter({
      preserveDirectory: false,
      screenshotOnExpectFailure:true,
      baseDirectory: 'Reports',
      docTitle: 'Automation test report',
      docName : 'report.html',
       screenshotsSubfolder: 'images',
       jsonsSubfolder: 'json',
       columnSettings:{
        displayTime:true,
        displayBrowser:true,
        displaySessionId:false,
        displayOS:true,
        inlineScreenshots:true
    },
      clientDefaults:{
        showTotalDurationIn: "header",
        totalDurationFormat: "h:m:s",
        gatherBrowserLogs: true
      },
    }).getJasmine2Reporter());
    
    
    return global.browser.getProcessedConfig().then(function (config) 
    {
      browser.manage().timeouts().implicitlyWait(60000);
     }) 
    
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 6000000,
    showColors: true,
    includeStackTrace: false,
  },
  allScriptsTimeout: 90000,
  getPageTimeout: 50000,
 
  
  /* multiCapabilities: 
   [{'browserName': 'chrome'},
   {'browserName': 'firefox'}],*/


   
   /*Capabilities: 
   [{'browserName': 'MicrosoftEdge'}],
   maxInstances: 1*/

   capabilities:{
    'browserName': 'chrome',
    'shardTestFiles': true,
    'maxInstances': 2,
    'goog:chromeOptions': {
        w3c: false
    }


    /*
    capabilities: {
        automationName: 'uiautomator1',
        browserName: 'chrome',
        platformName: 'android',
        //platformVersion: '11.0',
        deviceName: '3201181cd00a164b'
      },*/
}}
    //'browserName': 'chrome',
     /* browserName: 'firefox',
      'moz:firefoxOptions': {
            args: ['--verbose'],
            binary: 'C:/Program Files/Mozilla Firefox/firefox.exe'
        },*/
      //'browserName': 'internet explorer'
     
      //}