//USEUNIT compareResults
function saveBtn(env, type) {
  try {
    svebtn = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(1).Panel(0).Image("save_png")
    if (svebtn.Exists) {
      svebtn.Click()
      //checkFeatures(env, type)
      checkFeaturesSimple(env, type)
    } else {
      compareResults.printResultResult("Fail", "No save button")
    }
  } catch (e) {

    y = aqString.Concat("Save ", e)
    compareResults.printResult(y)

  }
}

function checkFeaturesSimple(env, type) {

  try {
    //Log.Message(env);    
    let queryURL;
    if (env == "dev") {
      if (type == "pt") {
        queryURL = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/8/query?where=1=1&objectIds=&f=html&token"
        openNewTab(queryURL)
        checkResult()
        // query(queryURL);
        delUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/8/deleteFeatures"
        delFeatures(delUrl)

      } else if (type == "ln") {
        queryURL = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/9/query?where=1=1&objectIds=&f=html&token"
        openNewTab(queryURL)
        query(queryURL);
        delUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/9/deleteFeatures"
        delFeatures(delUrl)

      } else {
        if (type == "pg") {
          queryURL = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/10/query?where=1=1&objectIds=&f=html&token"
          openNewTab(queryURL)
          query(queryURL);
          delUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/10/deleteFeatures"
          delFeatures(delUrl)
        }
      }
    } else {
      if (env == "qa") {
        if (type == "pt") {
          queryURL = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/8/query?where=1=1&objectIds=&f=html&token"
          openNewTab(queryURL)
          query(queryURL);
          delUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/8/deleteFeatures"
          delFeatures(delUrl)

        } else if (type == "ln") {
          queryURL = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/9/query?where=1=1&objectIds=&f=html&token"
          openNewTab(queryURL)
          query(queryURL);
          delUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/9/deleteFeatures"
          delFeatures(delUrl)

        } else {
          if (type == "pg") {
            queryURL = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/10/query?where=1=1&objectIds=&f=html&token"
            openNewTab(queryURL)
            query(queryURL);
            delUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/10/deleteFeatures"
            delFeatures(delUrl)
          }

        }

      }

    }
    //close tab
    Sys.Keys("^w")
  } catch (e) {
    y = aqString.Concat("Check features simple ", e)
    compareResults.printResult(y)
  }

}

function checkResult() {
  try {

    featuresResult = Sys.Browser("*").Page("https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/*").Panel(1).TextNode(0).contentText
    Log.Message(featuresResult)
    var rslt = featuresResult.replace(/[^0-9]/g, '');
    y = aqString.Concat("Feature saved - ", rslt)
    if (rslt == 1 || rslt > 1) {
      compareResults.printResultResult("Pass", y)
    } else {
      compareResults.printResultResult("Fail", y)
    }

  } catch (e) {
    y = aqString.Concat("Check result", e)
    compareResults.printResult(y)
  }
}

function query(url) {

  //Browsers.CurrentBrowser.Navigate(url);
  // Sys.Process("chrome").ToUrl(url)
  Delay(1000)
  //Sys.Browser("*").Page("*").Panel(1).Link(1).Click();

  whereTextBox = Sys.Browser("*").Page("*").Panel(1).Form(0).Table(0).Cell(0, 1).Textbox("where")
  whereTextBox.Click()
  whereTextBox.SetText("1=1");

  qb = Sys.Browser("*").Page("*").Panel(1).Form(0).Table(0)
  queryBtn = qb.Find("value", "Query (GET)", 45)
  queryBtn.scrollIntoView()
  queryBtn.Click()
  //Sys.Browser("*").Page("*").Panel(1).Form(0).Table(0).Cell(37, 0).SubmitButton("Query (GET)").scrollIntoView()
  // Sys.Browser("*").Page("*").Panel(1).Form(0).Table(0).Cell(37, 0).SubmitButton("Query (GET)").Click()
  rslt0 = Sys.Browser("*").Page("*").Panel(1).TextNode(0).contentText
  var rslt = rslt0.replace(/[^0-9]/g, '');
  y = aqString.Concat("Feature saved - ", rslt)
  if (rslt == 1 || rslt > 1) {
    compareResults.printResultResult("Pass", y)
  } else {
    compareResults.printResultResult("Fail", y)
  }

  Delay(1000);

}
function delFeatures(url) {

  Browsers.CurrentBrowser.Navigate(url);
  Delay(1000)
  //Sys.Browser("*").Page("*").Panel(1).Link(5).Click();
  whereTextBox = Sys.Browser("*").Page("*").Panel(1).Form(0).Table(0).Cell(1, 1).Textbox("where")
  whereTextBox.SetText("1=1");
  Sys.Browser("*").Page("*").Panel(1).Form(0).Table(0).Cell(8, 0).SubmitButton("Delete Features").Click()
  Delay(1000);

}
function openNewTab(url) {
  Sys.Keys("^t")
  Browsers.CurrentBrowser.Navigate(url);
  Delay(1000)
}

/*function checkFeatures(env, type) {
    try {
    Log.Message(env);    
    let queryURL;
    if (env == "dev") {
        if (type == "pt") {
            queryURL = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/8/query"
            openNewTab(queryURL)
            query(queryURL);
            delUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/8/deleteFeatures"
            delFeatures(delUrl) 
            
        } else if (type == "ln") {
            queryURL = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/9/query"
            openNewTab(queryURL)
            query(queryURL);
            delUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/9/deleteFeatures"
            delFeatures(delUrl) 

        } else {
            if (type == "pg") {
                queryURL = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/10/query"
                openNewTab(queryURL)
                query(queryURL);
                delUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/10/deleteFeatures"
                delFeatures(delUrl) 
            }
        }        
    } else {
        if (env == "qa") {
            if (type == "pt") {
                queryURL = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/8/query"
                openNewTab(queryURL)
                query(queryURL);
                delUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/8/deleteFeatures"
                delFeatures(delUrl) 

            } else if (type == "ln") {
                queryURL = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/9/query"
                openNewTab(queryURL)
                query(queryURL);
                delUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/9/deleteFeatures"
                delFeatures(delUrl) 

            } else {
                if (type == "pg") {
                    queryURL = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/10/query"
                    openNewTab(queryURL)
                    query(queryURL);
                    delUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer/10/deleteFeatures"
                    delFeatures(delUrl) 
                }

            }

        }

    }
    //close tab
    Sys.Keys("^w")
    } catch(e) {
       y = aqString.Concat("Check features ", e)
       compareResults.printResult(y)
    }
}*/
