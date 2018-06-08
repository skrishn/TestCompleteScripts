//USEUNIT compareResults
//USEUNIT compareAnalysisLayer
//USEUNIT widgetUtils
//USEUNIT startOver
//USEUNIT utils

function common(b, env) {

  location(b, env)
  //startOver.clickStartOver()
}

function location(b, env) {

  try {
    compareResults.printResultCenter("Define location - Add an existing feature")

    //Batavia park
    compareResults.printResultCenter("Incident - Point")
    widgetUtils.draw('point', [1191, 285]);

    //Click on the map to add an Existing feature
    addExistingFeature("Middle River")
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "noDownload")
    //widgetUtils.clickIncidentTab()

    compareResults.printResultCenter("Incident - Point with Buffer")
    widgetUtils.doBuffer(2);
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "Download")
    //widgetUtils.clickIncidentTab()
    widgetUtils.home.Click();
    Delay(800);

    compareResults.printResultCenter("Incident - Line")

    //startover
    Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(1).Click()

    //easy baltimore midway	

    widgetUtils.draw("line", [[824, 214], [990, 219]]);
    Delay(300)
    //Click on the map to add an Existing feature
    addExistingFeature("Middle River")
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "noDownload")

    compareResults.printResultCenter("Incident - Line with Buffer")
    widgetUtils.doBuffer(2);
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "Download")
    widgetUtils.home.Click();
    Delay(800);

    compareResults.printResultCenter("Incident - Polygon")
    //startover
    Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(1).Click()

    //POrt of Baltimore, Dundalk	
    Delay(500)
    widgetUtils.draw("poly", [[1101, 463], [1104, 324], [1222, 327], [1227, 464], [1100, 463]]);
    Delay(300)

    //Click on the map to add an Existing feature
    addExistingFeature("Rosedale, MD, USA")
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "noDownload")
    //widgetUtils.clickIncidentTab()

    compareResults.printResultCenter("Incident - Polygon with Buffer")
    widgetUtils.doBuffer(2);
    getPanelArray = compareAnalysisLayer.getAnalysisLayer(b, "Download")
    widgetUtils.home.Click();
    Delay(800);

  } catch (e) {
    compareResults.printResult("Locate incident " + e);
  }
}

function addExistingFeature(srchTxt) {
  try {
    // Drop a an incident by clicking on map
    clickSearch(srchTxt);
    widgetUtils.clickFAMenu();
    widgetUtils.loopPopupMenu("Add/Remove Location");
    widgetUtils.loopPopupMenu("Set Location");
  } catch (e) {
    compareResults.printResult("Add existing feature " + e);
  }
}

function clickSearch(txt) {
  try {
    widgetUtils.search.Click();
    widgetUtils.search.SetText(txt);
    Utils.clickEnter();
  } catch (e) {
    comapreResults.printResult("Search " + e);
  }
}