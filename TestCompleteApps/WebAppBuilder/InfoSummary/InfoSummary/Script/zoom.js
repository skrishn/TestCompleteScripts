//USEUNIT compareResults
//USEUNIT widgetUtils
var _themeName;

function test(themeName) {
  _themeName = themeName;
  widgetUtils.init(themeName);
  zoom(panZoomloop());
}

function panZoomloop() {
  //TODO see if we can do more with the testWidget...in widgetUtils...based on other use of this path
  var layersContainer = widgetUtils.layersContainer;

  // get the childcount of number of maps in the side panel
  var layerCount = layersContainer.ChildCount;
  var getNum = [];

  for (i = layerCount - 1; i >= 0; i--) {
    var layerPanel = layersContainer.Child(i)
    recSubstr1 = layerPanel.idstr.substring(0, 2);
    if (recSubstr1 == "re") {
      getNum.push(layerPanel.Panel("recNum_*").contentText)
    }
  }
  return getNum;
}

function zoom(num) {
  //zoom the map and get the num count and compare
  // pan the map and get the num count and compare
	compareResults.printResultCenter("Zoom and check count");

  //zoom out twice
  zoomInOut("out", 2);
  writeResults(num, "Count not updated on Zoom out");

  //Click Home
  widgetUtils.home.Click();

  //zoom in three times
  zoomInOut("in", 3);
  writeResults(num, "Count not updated on Zoom in");
}

function zoomInOut(inOut, numTimes){
  var zoomOp;
  if(inOut == "in"){
    zoomOp = widgetUtils.zoomIn;
  } else {
    zoomOp = widgetUtils.zoomOut;
  }
  for (var i =0; i < numTimes; i++){
    zoomOp.click();
  }
  Delay(500);
}

function writeResults(num, msg){
  var num2 = panZoomloop();
  compareResults.resultTxt(aqConvert.VarToStr(num), aqConvert.VarToStr(num2), msg);
}