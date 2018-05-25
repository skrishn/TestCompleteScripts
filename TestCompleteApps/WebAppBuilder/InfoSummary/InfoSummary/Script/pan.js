//USEUNIT compareResults
//USEUNIT widgetUtils
var _themeName;

function test(themeName) {
  _themeName = themeName;
  widgetUtils.init(themeName);
  compareResults.printResultCenter("Pan and check count");
  pan(panZoomloop());
}

// get the childcount of number of maps in the side panel
function panZoomloop() {						
  layersContainer = widgetUtils.layersContainer;
  var layerCount = layersContainer.ChildCount;
  var getNum = [];
  for (i = layerCount - 1; i >= 0; i--) {
    layerPanel = layersContainer.Child(i);
    recSubstr1 = layerPanel.idstr.substring(0, 2)
    if (recSubstr1 == "re") {
      getNum.push(layerPanel.Panel("recNum_*").contentText);
    }
  }
  return getNum;
}

function pan(getNumValue, layersContainer, layerCount) {
  // pan the map and get the num count and compare
  var mapDiv = widgetUtils.mapDIV;
  mapDiv.Drag(1054, 405, -414, 177);
  var getNumValue2 = panZoomloop();
  
  a = aqConvert.VarToStr(getNumValue);
  b = aqConvert.VarToStr(getNumValue2);
  compareResults.resultTxt(a, b, "Count not updated on pan");
}