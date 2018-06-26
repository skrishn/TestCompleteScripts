//USEUNIT utils
//USEUNIT widgetUtils

//type: dev or qa
function runTests(type) {
  //host contains the app url, app name, and dev/qa flag, browsers, and tests defined in the config file
  var host = utils.getHost(type);

  //start logging
  utils.initLog(host.env);

  //test each app
  host.apps.forEach(function (app) {
    utils.writeLine('#303CF4', app.name);

    //with each browser
    host.browsers.forEach(function (browser) {
      utils.writeLine('#FF00FF', browser);

      //run the browser with host url
      utils.run(browser, app.url);

      //Run widget tests
      host.tests.forEach(function (t) {
        try {
          if(host.requiresAGOLLogin){
            utils.loginAGOL(host.user, host.password);
          }
          widgetUtils.init(host.widgetName, app.themeName);
          t.test(app.themeName);
        }
        catch (err) {
          Log.Warning(err.message);
        }
      });

      //Close browser 
      utils.closeBrowser();
    });
  });
  //Stop the logging
  utils.stopLogging();
}