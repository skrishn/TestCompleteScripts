//USEUNIT widget
//USEUNIT defineLocation
//USEUNIT existingFeature
//USEUNIT compareResults
function tests(name, b, env) {
  try {
    Delay(4000)

    if (name == "app1") {
      Sys.Desktop.Keys("[Enter]")
      rst = widget.openWidget()
      Log.Message("rst in functionality " + rst)
      if (rst == "yes") {
        defineLocation.common(b, env)
        //existingFeature.common(b,env)
      } else {

        compareResults.printResultResult("Fail", "Open widget")
      }
    }
  } catch (e) {
    y = aqString.Concat("Fn tests ", e)
    compareResults.printResult(y)
    //Log.Message("fn tests " +e)
  }
}