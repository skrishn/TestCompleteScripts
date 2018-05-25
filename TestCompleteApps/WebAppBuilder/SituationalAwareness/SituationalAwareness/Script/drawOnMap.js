//USEUNIT compareResults
var drawToolPanel, mapDiv;

function point(x, y) {

  drawToolPanel = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(2).Panel(0).Panel(0)

  mapDiv = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("map").Panel("map_root").Panel("map_container").Panel("map_layers").SVG("map_gc")

  try {
    pt = drawToolPanel.Image("btn0_png")
    pt.Click()
    mapDiv.Click(x, y)
  } catch (e) {

    y = aqString.Concat("Drop point ", e)
    compareResults.printResult(y)
  }
}

function line(x, y, x1, y1) {

  drawToolPanel = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(2).Panel(0).Panel(0)

  mapDiv = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("map").Panel("map_root").Panel("map_container").Panel("map_layers").SVG("map_gc")

  try {
    ln = drawToolPanel.Image("btn1_png")
    ln.Click()
    Delay(75)
    mapDiv.Click(x, y)
    Delay(50)
    mapDiv.DblClick(x1, y1)
    Log.Message("drew a line")
  } catch (e) {
    y = aqString.Concat("Draw line ", e)
    compareResults.printResult(y)
  }
}

function polyg(x, y, x1, y1, x2, y2, x3, y3, x4, y4) {

  try {

    drawToolPanel = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(2).Panel(0).Panel(0)

    mapDiv = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("map").Panel("map_root").Panel("map_container").Panel("map_layers").SVG("map_gc")

    poly = drawToolPanel.Image("btn2_png")
    poly.Click()
    mapDiv.Click(x, y)
    mapDiv.Click(x1, y1)
    mapDiv.Click(x2, y2)
    mapDiv.Click(x3, y3)
    mapDiv.DblClick(x4, y4)
    Log.Message("drew a poly")
  } catch (e) {
    y = aqString.Concat("Draw poly ", e)
    compareResults.printResult(y)
  }

}