//USEUNIT compareResults
//USEUNIT compareAnalysisLayer
//USEUNIT widgetUtils
//USEUNIT save
//USEUNIT utils

//TODO update signature to support new approach as these arguments
// will not be provided
function test(themeName) {
  Delay(4000)
  utils.clickEnter();
  var rst = widgetUtils.openWidget();
  Log.Message("rst in functionality " + rst)
  if (rst) {
    location();
    locationWithBuffer();
    clickStartOver();
  } else {
    compareResults.printResultResult("Fail", "Open widget");
  }
}

function location() {
  try {
    //No buffer - point, line, polygon
    //Batavia park
    compareResults.printResultCenter("Incident - Point");
    widgetUtils.draw("point", [1191, 285]);
    getPanelArray = compareAnalysisLayer.getAnalysisLayer("noDownload");
    save.saveBtn(env, "pt");
    //TODO find out what this is and move access to widgetUtils
    widgetUtils.map.Panel("map_root").Panel(1).Panel(0).Panel(0).Panel(0).Panel(5).Click();
    widgetUtils.home.Click();
  } catch (e) {
    compareResults.printResult("Locate incident " + e);
  }
}

function locationWithBuffer() {
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
    compareResults.printResult("Locate incident - Buffer" + e);
  }
}

function clickStartOver() {
  try {
    //TODO figure out what this is and move to widgetUtils
    var startOver = widgetUtils.testWidget.Panel(0).Panel(0).Panel(1);
    startOver.Click();
    Sys.Refresh();

    var v = startOver.Visible;
    compareResults.printResultResult(v ? "Fail" : "Pass", "Start over " + (v ? "still" : "not") + " visible");
    if (!v) {
      bufferText = widgetUtils.numberSpinner.Panel(2).Textbox(0).Text;
      compareResults.resultTxt(bufferText, "0", "Buffer text cleared");

      var classNames = "btn32img darkThemeBackground";
      b0 = widgetUtils.btn0.className == classNames;
      b1 = widgetUtils.btn1.className == classNames;
      b2 = widgetUtils.btn2.className == classNames;

      compareResults.printResultResult(b0 && b1 && b2 ? "Pass" : "Fail", "Buttons are inactive");
    }
  } catch (e) {
    compareResults.printResult("Startover" + e);
  }
}