//USEUNIT compareResults
function clickIncidentTab() {
  inciTab = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(0).Panel(1).Panel(0).Panel(0)
  inciTab.Click()
}