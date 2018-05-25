//USEUNIT compareResults
//USEUNIT drawOnMap
//USEUNIT buffer
//USEUNIT compareAnalysisLayer
//USEUNIT buttons
//USEUNIT startOver
//USEUNIT incidentTab
//USEUNIT save
function common(b, env) {
  location(b, env)
  locationWithBuffer(b, env)
  startOver.clickStartOver()								
}

function location(b, env) {

  try {
    //No buffer - point, line, polygon
    //Batavia park
    compareResults.printResultCenter("Incident - Point")
    drawOnMap.point(1191, 285)
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "noDownload")
    save.saveBtn(env, "pt")
    Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("map").Panel("map_root").Panel(1).Panel(0).Panel(0).Panel(0).Panel(5).Click()
    buttons.home()
  } catch (e) {
    y = aqString.Concat("Locate incident ", e)
    compareResults.printResult(y)
  }
}

function locationWithBuffer(b, env) {

  try {
    //Batavia park
    compareResults.printResultCenter("Incident - Point with Buffer")
    drawOnMap.point(582, 274)
    buffer.bufferUnit("Miles")
    buffer.doBuffer(3)
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "Download")
    save.saveBtn(env, "pt")
    Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("map").Panel("map_root").Panel(1).Panel(0).Panel(0).Panel(0).Panel(5).Click()
    incidentTab.clickIncidentTab()
    buttons.home()
  } catch (e) {
    y = aqString.Concat("Locate incident - Buffer", e)
    compareResults.printResult(y)
  }

}
