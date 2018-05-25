//USEUNIT compareResults
//USEUNIT drawOnMap
//USEUNIT buffer
//USEUNIT compareAnalysisLayer
//USEUNIT buttons
//USEUNIT startOver
//USEUNIT incidentTab
//USEUNIT openPanel
//USEUNIT featureActionMenu
//USEUNIT search
function common(b, env) {

  location(b, env)
  //startOver.clickStartOver()
}

function location(b, env) {

  try {
    compareResults.printResultCenter("Define location - Add an existing feature")

    //Batavia park
    compareResults.printResultCenter("Incident - Point")
    drawOnMap.point(1191, 285)

    //Click on the map to add an Existing feature
    addExistingFeature("Middle River")
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "noDownload")
    //incidentTab.clickIncidentTab()

    compareResults.printResultCenter("Incident - Point with Buffer")
    buffer.doBuffer(2)
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "Download")
    //incidentTab.clickIncidentTab()
    buttons.home()

    compareResults.printResultCenter("Incident - Line")

    //startover
    Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(1).Click()

    //easy baltimore midway	

    drawOnMap.line(824, 214, 990, 219);
    Delay(300)
    //Click on the map to add an Existing feature
    addExistingFeature("Middle River")
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "noDownload")

    compareResults.printResultCenter("Incident - Line with Buffer")
    buffer.doBuffer(2)
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "Download")
    buttons.home()

    compareResults.printResultCenter("Incident - Polygon")
    //startover
    Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(1).Click()

    //POrt of Baltimore, Dundalk	
    Delay(500)
    drawOnMap.polyg(1101, 463, 1104, 324, 1222, 327, 1227, 464, 1100, 463);
    Delay(300)

    //Click on the map to add an Existing feature
    addExistingFeature("Rosedale, MD, USA")
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "noDownload")
    //incidentTab.clickIncidentTab()

    compareResults.printResultCenter("Incident - Polygon with Buffer")
    buffer.doBuffer(2)
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "Download")
    buttons.home()

  } catch (e) {
    y = aqString.Concat("Locate incident ", e)
    compareResults.printResult(y)
  }

}

function addExistingFeature(srchTxt) {

  try {

    // Drop a an incident by clicking on map
    search.clickSearch(srchTxt)
    featureActionMenu.clickFAMenu()
    featureActionMenu.loopPopupMenu("Add/Remove Location")

    featureActionMenu.loopPopupMenu("Set Location")
  } catch (e) {

    y = aqString.Concat("Add existing feature ", e)
    compareResults.printResult(y)

  }
}