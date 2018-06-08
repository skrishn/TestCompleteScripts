//USEUNIT compareResults
//USEUNIT widgetUtils

function clickStartOver() {
  try {
    //TODO figure out what this is and move to widgetUtils
    var startOver = widgetUtils.testWidget.Panel(0).Panel(0).Panel(1);
    startOver.Click();
    Sys.Refresh();
    Log.Message(startOver.Visible);
    
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