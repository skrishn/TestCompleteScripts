//USEUNIT compareResults
//USEUNIT widgetUtils
function saveBtn(env, type) {
  try {
    svebtn = widgetUtils.save;
    if (svebtn.Exists) {
      svebtn.Click();
      //checkFeatures(env, type);
      checkFeaturesSimple(env, type);
    } else {
      compareResults.printResultResult("Fail", "No save button");
    }
  } catch (e) {
    y = aqString.Concat("Save ", e);
    compareResults.printResult(y);
  }
}

function deleteFeatures(baseURL, id, check, query){
  var _baseURL = baseURL + "/" + id;
  var queryURL = _baseURL + "/query?where=1=1&objectIds=&f=html&token";
  var delUrl = _baseURL + "/deleteFeatures";
  openNewTab(queryURL);
  if(check){
    checkResult();
  }
  if(query){
    query(queryURL);
  }
  delFeatures(delUrl);
}

//TODO query URLS should be a part of the config
function checkFeaturesSimple(env, type) {
  try {
    var baseUrl;
    if (env == "dev") {
      baseUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer";
      if(type in ["pt", "ln", "pg"]){
        var id = type == "pt" ? 8 : type == "ln" ? 9 : 10;
        deleteFeatures(baseUrl, id, type == "pt", type != "pt");
      }
    } else {
      if (env == "qa") {
      //TODO these are all pointing at the same devext resources...
        baseUrl = "https://servicesdev.arcgis.com/ZjAWRvdlnNLJ42Xt/arcgis/rest/services/SituationalAwareness_WFL1/FeatureServer";
        if(type in ["pt", "ln", "pg"]){
          var id = type == "pt" ? 8 : type == "ln" ? 9 : 10;
          deleteFeatures(baseUrl, id, false, true);
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
    y = aqString.Concat("Feature saved - ", rslt);
    compareResults.printResultResult((rslt == 1 || rslt > 1) ? "Pass" : "Fail", y);
  } catch (e) {
    y = aqString.Concat("Check result", e);
    compareResults.printResult(y);
  }
}

function query(url) {
  Delay(1000)
  widgetUtils.where.Click();
  widgetUtils.where.SetText("1=1");

  queryBtn = widgetUtils.pageTable.Find("value", "Query (GET)", 45);
  queryBtn.scrollIntoView();
  queryBtn.Click();
  rslt0 = Sys.Browser("*").Page("*").Panel(1).TextNode(0).contentText;
  var rslt = rslt0.replace(/[^0-9]/g, '');
  y = aqString.Concat("Feature saved - ", rslt);
  compareResults.printResultResult((rslt == 1 || rslt > 1) ? "Pass" : "Fail", y);
  Delay(1000);
}
function delFeatures(url) {
  Browsers.CurrentBrowser.Navigate(url);
  Delay(1000);
  widgetUtils.where.SetText("1=1");
  widgetUtils.deleteButton.Click();
  Delay(1000);
}
function openNewTab(url) {
  Sys.Keys("^t");
  Browsers.CurrentBrowser.Navigate(url);
  Delay(1000);
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
