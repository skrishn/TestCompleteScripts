//USEUNIT compareResults
//USEUNIT drawOnMap
//USEUNIT compareAnalysisLayer
//USEUNIT widgetUtils
//USEUNIT startOver
//USEUNIT incidentTab
//USEUNIT save
function common(b, env) {
  location(b, env);
  locationWithBuffer(b, env);
  startOver.clickStartOver();
}

function location(b, env) {
  try {
    //No buffer - point, line, polygon
    //Batavia park
    compareResults.printResultCenter("Incident - Point");
    drawOnMap.draw("point", [1191, 285]);
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
    drawOnMap.draw("point", [582, 274]);
    widgetUtils.bufferUnit("Miles");
    widgetUtils.doBuffer(3);
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "Download");
    save.saveBtn(env, "pt");
    //TODO find out what this is and move access to widgetUtils
    widgetUtils.map.Panel("map_root").Panel(1).Panel(0).Panel(0).Panel(0).Panel(5).Click();
    incidentTab.clickIncidentTab();
    widgetUtils.home.Click();
  } catch (e) {
    y = aqString.Concat("Locate incident - Buffer", e);
    compareResults.printResult(y);
  }
}