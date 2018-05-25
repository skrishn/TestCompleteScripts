//USEUNIT compareResults
//USEUNIT widgetUtils

var _themeName;

function test(themeName) {
  _themeName = themeName;
  widgetUtils.init(themeName);
  clickWidget();
  Delay(1000);
  clickWidget();
}

function clickWidget() {
  widget = widgetUtils.testWidget;
  widget.Click();
}