//USEUNIT widgetUtils

function openWidget() {
  try {
    //foldable theme
    Delay(300)
    widgetPanel = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("themes_FoldableTheme_widgets_HeaderController_Widget_*").Panel(1).Panel(0)

    if (widgetPanel.VisibleOnScreen || widgetPanel.Visible) {
      widgetPanel.Click();
      return checkOpenPanel();
    } else {
      compareResults.printResultResult("Fail", "Open widget")
    }
  } catch (e) {
    y = aqString.Concat("Open widget ", e)
    compareResults.printResult(y)
    //Log.Message("Open Widget "+e)														
  }
}

function closeWidget() {
  try {

  } catch (e) {

    y = aqString.Concat("Close widget ", e)
    compareResults.printResult(y)
  }
}

function checkOpenPanel() {
  try {
    var v = widgetUtils.testWidget.VisibleOnScreen;
    if(!v){
      compareResults.printResultResult("Fail", "Open Widget")
    }
    return v;
  } catch (e) {
    y = aqString("Open widget panel ", e)
    compareResults.printResult(y)
  }
}

function Test1() {
  Browsers.Item(btChrome).Navigate("https://statem-autotest.mapsdevext.arcgis.com/apps/webappviewer/index.html?id=3286e9500d874f969926411846ed62e9");
  Aliases.browser.pageStatemAutotestMapsdevextArcg.imageIconPngWabDv28.Click(16, 15);
}