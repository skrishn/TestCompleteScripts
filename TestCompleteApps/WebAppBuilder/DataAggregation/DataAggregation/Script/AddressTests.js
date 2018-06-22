//USEUNIT widgetUtils
//USEUNIT config

var _themeName;

function test(themeName) {
  _themeName = themeName;
  
  //open the widget
  widgetUtils.init(themeName);
  clickWidget();
  Delay(1000);
  
  

}

function clickWidget() {
  widget = widgetUtils.testWidget;
  widget.Click();
}

function clickBrowse(){
  
}

function dragDrop(){
  
}