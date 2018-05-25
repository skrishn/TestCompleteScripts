//USEUNIT compareResults
//USEUNIT defineLocation
function checkOpenPanel() {

  try {
    openPanel = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1)

    if (openPanel.VisibleOnScreen) {
      a = "yes"

    } else {
      a = "no"
      compareResults.printResultResult("Fail", "Open Widget")
    }

    return a;

  } catch (e) {
    y = aqString("Open widget panel ", e)
    compareResults.printResult(y)
    //Log.Message("Location " +e)

  }
}