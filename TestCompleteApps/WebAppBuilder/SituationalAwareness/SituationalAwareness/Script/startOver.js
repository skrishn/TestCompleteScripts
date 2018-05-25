//USEUNIT compareResults
function clickStartOver() {

  try {
    startOver = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(1)

    startOver.Click()
    Sys.Refresh()
    Log.Message(startOver.Visible)
    if (startOver.Visible) {
      compareResults.printResultResult("Fail", "Start over still visible")

    } else {
      compareResults.printResultResult("Pass", "Start over not visible")

      bufferText = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(2).Panel(1).Panel(0).Panel(1).Panel("widget_dijit_form_NumberSpinner_0").Panel(2).Textbox(0).Text
      compareResults.resultTxt(bufferText, "0", "Buffer text cleared")

      b0 = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(2).Panel(0).Panel(0).Image("btn0_png")
      b0CN = b0.className

      b1 = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(2).Panel(0).Panel(0).Image("btn1_png")
      b1CN = b1.className

      b2 = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(0).Panel(2).Panel(0).Panel(0).Image("btn2_png")
      b2CN = b2.className

      if (b0CN && b1CN && b2CN == "btn32img darkThemeBackground") {
        compareResults.printResultResult("Pass", "Buttons are inactive")

      } else {
        compareResults.printResultResult("Fail", "Buttons are inactive")
      }
    }
  } catch (e) {
    y = aqString.Concat("Startover", e)
    compareResults.printResult(y)
  }
}