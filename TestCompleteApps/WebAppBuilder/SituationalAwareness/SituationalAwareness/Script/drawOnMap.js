//USEUNIT compareResults
//USEUNIT widgetUtils

function draw(type, coords){
  try {
    var func = type == "point" ? widgetUtils.drawPoint : type == "line" ? widgetUtils.drawLine : widgetUtils.drawPoly;
    func(coords);
  } catch (e) {
    compareResults.printResult(aqString.Concat("Draw " + type + " ", e));
  }
}