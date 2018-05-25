//USEUNIT compareResults
//USEUNIT widgetUtils
/* 
app1: This app doesn't update count so just zoomout and test layer is active

//Scale visibility is on width height layer. Zoom in near baltimore to see features.

*/

//TODO look at other instances of this loop...it feels redundant
var _themeName;

function test(themeName) {
  _themeName = themeName;
  widgetUtils.init(themeName);

  var layersContainer = widgetUtils.layersContainer;
  var layerCount = layersContainer.ChildCount;

  for (i = layerCount - 1; i >= 0; i--) {
    layerPanel = layersContainer.Child(i);
    recSubstr1 = layerPanel.idstr.substring(0, 2);
    if (recSubstr1 == "re") {
      rec_ftrName = aqString.Remove(layerPanel.idstr, 0, 4);

      num = layerPanel.Panel("recNum_*").contentText;
      label = layerPanel.Panel("recLabel_*");
      tn = label.TextNode(0);
      myLabel = label.contentText;

      //Road conditions - has group layers
      icon = layerPanel.Panel("recIcon_*")
      if (myLabel == "Width & Height Restrictions") {
        break;
      }
      checkScaleVisi(icon);
    }
  }
}

function checkScaleVisi(layerPanel) {
  compareResults.printResultCenter("Check scale visibilty");
  widgetUtils.zoomOut.Click();
  widgetUtils.zoomOut.Click();
  Delay(500)
  if (icon.className == "recIcon active") {
    compareResults.printResultResult("Pass", "Layer is active (as expected)")
  } else {
    compareResults.printResultResult("Fail", "Layer is active (as expected)")
  }
}
