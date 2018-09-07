//USEUNIT widgetUtils
//USEUNIT compareResults

function test(themeName) {
  _themeName = themeName;
  widgetUtils.init(themeName);
  clickWidget();

  var svg;
  var panel;
  var panel2;
  var textbox;
  var panel3;

  var page = widgetUtils._page;

  Delay(2000);
  widgetUtils.initStartPage();
  
  //click draw
  widgetUtils.drawButton.Click(91, 16);
  
  //click drawPoint
  widgetUtils.drawPointButton.Click(19, 24);
  svg = page.vgMapGc;
  //click map
  svg.Click(867, 391);
  Delay(2000);
  //click report
  page.panel4.Click(32, 17);
  Delay(2000);
  
  widgetUtils.initReportPage();
  validateList();
}

function clickWidget() {
  widget = widgetUtils.testWidget;
  widget.Click();
}

function validateList(){
  var list = widgetUtils.list;
  let firstListItem = list.firstChild;

  for (let i = 0; i < testObjects.length; i++) {
    const testObject = testObjects[i];
    var listItem = i == 0 ? firstListItem : listItem.nextSibling;
    let v = listItem.innerText;
    let msg = "List item " + i + ": Expexted (" + testObject.basicContent + ") Actual (" + v + ")";
    compareResults.resultTxt(v, testObject.basicContent, msg);
    
    //click item and check children
  }
}