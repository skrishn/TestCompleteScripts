//USEUNIT compareResults
function bufferUnit(myUnit) {
  try {
    myUnit = myUnit
    getUnit = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(2).Panel(1).Panel(0).Panel(1).Panel(0).contentText
    buMsg = aqString.Concat("Buffer units - ", myUnit)
    compareResults.resultTxt(getUnit, myUnit, buMsg)
  } catch (e) {
    y = aqString.Concat("Buffer unit ", e)
    compareResults.printResult(y)
  }
}

function doBuffer(bufferCount) {
  try {
    upArrow = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(2).Panel(1).Panel(0).Panel(1).Panel("widget_dijit_form_NumberSpinner_*").Panel(0).Panel(0).Panel(0)
    for (i = 0; i < bufferCount; i++) {
      upArrow.Click()
    }
    //Click somewhere to apply the buffer
    Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Click(119, 5);
  } catch (e) {
    y = aqString.Concat("Buffer ", e)
    compareResults.printResult(y)
  }
}