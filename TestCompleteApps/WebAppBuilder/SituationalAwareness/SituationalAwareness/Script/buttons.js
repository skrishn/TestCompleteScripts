//USEUNIT compareResults
function home() {
  homeButton = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("map").Panel("widgets_HomeButton_Widget_*").Panel("esri_dijit_HomeButton_0").Panel(0).Panel(0)
  homeButton.Click()
  Delay(800)
}