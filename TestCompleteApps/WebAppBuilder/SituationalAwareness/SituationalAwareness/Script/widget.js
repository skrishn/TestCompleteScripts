function openWidget() {

  try {

    //foldable theme
    Delay(300)
    widgetPanel = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("themes_FoldableTheme_widgets_HeaderController_Widget_*").Panel(1).Panel(0)

    if (widgetPanel.VisibleOnScreen == true) {
      widgetPanel.Click()
      open = checkOpenPanel()
      return open;
    } else if (widgetPanel.Visible == true) {
      widgetPanel.Click()
      open = checkOpenPanel()
      return open;
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
    openPanel = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1)

    if (openPanel.VisibleOnScreen == true) {
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

function Test1() {
  Browsers.Item(btChrome).Navigate("https://statem-autotest.mapsdevext.arcgis.com/apps/webappviewer/index.html?id=3286e9500d874f969926411846ed62e9");
  Aliases.browser.pageStatemAutotestMapsdevextArcg.imageIconPngWabDv28.Click(16, 15);
}