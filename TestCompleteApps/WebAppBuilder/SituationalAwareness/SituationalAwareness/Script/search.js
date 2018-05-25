//USEUNIT compareResults
function clickSearch(txt) {

  try {

    searchBar = Sys.Browser("*").Page("*", 0).Panel("main_page").Panel("jimu_layout_manager").Panel("map").Panel("widgets_Search_Widget_*").Panel(0).Panel("esri_dijit_Search_*").Panel(0).Panel(0).Panel(0).Panel(0).Form(0).Textbox("esri_dijit_Search_*_input")
    searchBar.Click()
    searchBar.SetText(txt)
    Sys.Keys("[Enter]")

  } catch (e) {

    y = aqString.Concat("Search ", e)
    comapreResults.printResult(y)


  }
}