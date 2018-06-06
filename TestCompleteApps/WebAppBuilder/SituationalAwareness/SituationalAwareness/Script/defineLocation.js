//USEUNIT compareResults
//USEUNIT compareAnalysisLayer
//USEUNIT widgetUtils
//USEUNIT startOver
//USEUNIT save
//USEUNIT widget

//TODO update signature to support new approach as these arguments
// will not be provided
function test(b, env) {
  //////////////////////////////////
  //Moved from old functionalTest
  Delay(4000)
  Sys.Desktop.Keys("[Enter]")
  rst = widget.openWidget()
  Log.Message("rst in functionality " + rst)
  if (rst) {
    location(b, env);
    locationWithBuffer(b, env);
    startOver.clickStartOver();
  } else {
    compareResults.printResultResult("Fail", "Open widget")
  }
}

function location(b, env) {
  try {
    //No buffer - point, line, polygon
    //Batavia park
    compareResults.printResultCenter("Incident - Point");
    widgetUtils.draw("point", [1191, 285]);
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "noDownload");
    save.saveBtn(env, "pt");
    //TODO find out what this is and move access to widgetUtils
    widgetUtils.map.Panel("map_root").Panel(1).Panel(0).Panel(0).Panel(0).Panel(5).Click()
    widgetUtils.home.Click()
  } catch (e) {
    y = aqString.Concat("Locate incident ", e)
    compareResults.printResult(y)
  }
}

function locationWithBuffer(b, env) {
  try {
    //Batavia park
    compareResults.printResultCenter("Incident - Point with Buffer");
    widgetUtils.draw("point", [582, 274]);
    widgetUtils.bufferUnit("Miles");
    widgetUtils.doBuffer(3);
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "Download");
    save.saveBtn(env, "pt");
    //TODO find out what this is and move access to widgetUtils
    widgetUtils.map.Panel("map_root").Panel(1).Panel(0).Panel(0).Panel(0).Panel(5).Click();
    widgetUtils.clickIncidentTab();
    widgetUtils.home.Click();
  } catch (e) {
    y = aqString.Concat("Locate incident - Buffer", e);
    compareResults.printResult(y);
  }
}