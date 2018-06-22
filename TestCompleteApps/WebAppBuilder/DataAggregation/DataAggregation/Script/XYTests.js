//USEUNIT widgetUtils
//USEUNIT config

var _themeName;

function test(themeName) {
  _themeName = themeName;
  widgetUtils.init(themeName);
  clickWidget();
}

function clickWidget() {
  widget = widgetUtils.testWidget;
  widget.Click();
}