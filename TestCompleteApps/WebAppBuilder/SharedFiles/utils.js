//USEUNIT widgetUtils
//USEUNIT resultFile
//USEUNIT config

var startTime, startCounter;

//Widget name
var widgetName = config.widgetName;

//Shield page user/password
var shieldUser = config.shieldUser;
var shieldPassword = config.shieldPassword;

//DEV env test properties
var devTestName = config.devTestName;
var devURLs = config.devURLs;
var devLog = config.devLog;

//QA evv test properties
var qaTestName = config.qaTestName;
var qaURL = config.qaURLs;
var qaLog = config.qaLog;

//list of browsers to test
var browsers = config.browsers;

//This function wil create the host object for these tests
// supports a value of 'dev' or 'qa'
function getHost(type) {
  //set host env properties based on type
  var host = {
    apps: [],
    env: {
      type: type,
      path: type == "dev" ? config.devLog : config.qaLog,
      name: type + "-tests"
    },
    tests: config.tests,
    browsers: config.browsers,
    widgetName: widgetName
  };

  //set the test URLs and names for host apps
  var testURLs = type == "dev" ? config.devURLs : config.qaURLs;
  var testNames = type == "dev" ? config.devTestNames : config.qaTestNames;
  if (testURLs.length == testNames.length) {
    for (var i = 0; i < testURLs.length; i++) {
      host.apps.push({
        name: testNames[i],
        url: testURLs[i],
        themeName: _getThemeName(testURLs[i])
      });
    }
  } else {
    Log.Error("Must have a unique test name for each test URL." +
      " Check the config file to verify the number of test names equal the number of test URLs.");
  }
  return host;


  //return {
  //  apps: {
  //    app1: {
  //      name: "app1",
  //      url: type == "dev" ? devURL : qaURL        
  //    }
  //  },
  //  env: {
  //    type: type,
  //    path: type == "dev" ? devLog : qaLog,
  //    name: type == "dev" ? devTestName : qaTestName
  //  }
  //};
}

//This function will clear the browser cahce then login and navigate to the test app url 
function run(browserName, url) {
  while (Sys.WaitBrowser().Exists) {
    Sys.WaitBrowser().Close();
  }
  Browsers.Item(browserName).Run();

  if (Sys.Browser(browserName).IsOpen) {
    Delay(4000);
    maximizeWindow(browserName);
    clearBrowserCache(browserName);

    navigate(url);
    Delay(500);

    maximizeWindow(browserName);
    login();
    navigate(url, 10000);
  } else {
    Browsers.Item(browserName).Run();
    delay(5000);
  }
}

//This function will login through the shield page that we are presented when accessing DEV or QA sites
function login() {
  let regions = Regions.GetPicture("shieldpage_png")
  Log.Message("Shield Page found");
  Delay(500);

  widgetUtils.initLogin();

  var _user = widgetUtils.user;
  _user.Click();
  _user.SetText(shieldUser);
  _user.Keys("[Tab]");

  var _password = widgetUtils.password;
  _password.Click();
  _password.SetText(shieldPassword);
  _password.Keys("[Enter]");
  Delay(900);
}

//This function will maximize the browser window
function maximizeWindow(browser) {
  Sys.Browser(browser).BrowserWindow(0).Maximize();
  Delay(1000);
}

//This function will close the browser window
function closeBrowser() {
  Sys.Browser("*").Close();
}

//This function will clear the browser cahce for chrome
// It expects that IE and FireFox have the settings defined to clear the cache 
//  when the browsr is closed or to not retain history
function clearBrowserCache(browser) {
  if (browser == "chrome") {
    Browsers.Item(browser).Navigate("chrome://settings/clearBrowserData");
    Aliases.browser.BrowserWindow.Chrome_RenderWidgetHostHWND.Click(1188, 727);
    Log.Message(browser + " cache cleared");
  } else {
    Log.Message(browser + " should be set to avoid retaining history or to clear the cache on browser close");
  }
  Delay(300);
}

//This function will navigate to the test url
function navigate(url, delay) {
  Browsers.CurrentBrowser.Navigate(url);
  Delay(delay);
}

//Get the name of the theme used by a given app
function _getThemeName(url) {
  return "FoldableTheme";
}

//This function will get the current time
function getCurrentTime() {
  return Utilities.FormatDateTime("t", Now());
}

//This function will determine the full duration of the test runs
function getTotalTime() {
  var v = aqPerformance.Value();
  var h = parseInt((v / (1000 * 60 * 60)) % 24);
  var m = parseInt((v / (1000 * 60)) % 60);
  var s = parseInt((v / (1000 * 60)));
  return h + " hours " + m + " minutes " + s + " seconds";
}

//This function will capture the start time and create the output results file
function initLog(env) {
  //get the time when the process starts
  _getStartTime();

  //create a log file to store results
  _createResultFile(env);
}

function _getStartTime() {
  //Get the start Time
  startTime = getCurrentTime();

  //Start time counter to get the time
  startcounter = aqPerformance.Start();
}

function _createResultFile(env) {
  //create the results file
  resultFile.createFile(env.path, env.name);
  resultFile.writeLine("<tr><td> Start time </td><td><font color='#303CF4'>" + startTime + "</font></td></tr>");
}

function writeLine(hexColor, value) {
  Log.Message("Processing: " + value);
  resultFile.writeLine("<tr><td align = 'center'><font color='" + hexColor + "'>" + value + "</font></td></tr>");
}

function stopLogging() {
  //Get the end Time
  endTime = getCurrentTime();
  resultFile.writeLine("<tr><td> End time </td><td><font color='#303CF4'>" + endTime + "</font></td></tr>");

  totalTime = getTotalTime();
  Log.Message("Total Time: " + totalTime);
  resultFile.writeLine("<tr><td> Total time </td><td><font color='#303CF4'>" + totalTime + "</font></td></tr>");
}


///////////////////////////////////
//From SA
function clickEnter() {
  Sys.Keys("[Enter]");

  //Sys.Desktop.Keys("[Enter]")
}

function openIt() {

  ForReading = 1;
  // Creates a new file object
  //fs = Sys.OleObject("Scripting.FileSystemObject");

  // Launch Excel
  //var Excel = Sys.OleObject("Excel.Application");
  // Make it visible
  //Excel.Visible = true;
  AFileName = "C:\\Users\\suba6982\\Downloads\\SA\\Bridges.csv";
  //f = fs.
  //f = fs.OpenTextFile(AFileName, ForReading);
  var f = aqFileSystem.GetFileInfo(AFileName).OpenTextFile(aqFile.faRead, aqFile.ctUTF8);
  //Log.Message("File by lines:");

  while (!f.IsEndOfFile()) {
    s = f.ReadLine();
    Log.Message(s);
  }
  f.Close();

}