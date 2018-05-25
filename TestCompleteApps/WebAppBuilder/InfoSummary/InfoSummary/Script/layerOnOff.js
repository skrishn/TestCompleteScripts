//USEUNIT compareResults
//USEUNIT widgetUtils
var _themeName;

function test(themeName) {
  _themeName = themeName;
  widgetUtils.init(themeName);

  // get the layer Container panel on the side panel
  compareResults.printResultCenter("Turn layers off and On");
  var layersContainer = widgetUtils.layersContainer;

  // get the childcount of number of maps in the side panel
  var layerCount = layersContainer.ChildCount;

  for (i = layerCount - 1; i >= 0; i--) {
    var layerPanel = layersContainer.Child(i);
    var recSubstr1 = layerPanel.idstr.substring(0, 2);
    if (recSubstr1 == "re") {
      var num = layerPanel.Panel("recNum_*");
      var label = layerPanel.Panel("recLabel_*");
      var tn = label.TextNode(0);
      var myLabel = label.contentText;

      compareResults.printResultCenter(myLabel);
      var icon = layerPanel.Panel("recIcon_*");
      var iconPic = icon.SVG(0); //unused
      var expandArrow = layerPanel.Panel("exp_*"); //unused

      // turn off the layer
      layerOff(tn, myLabel, icon, num, "Layer off - Icon and label disabled", "Layer off - No count");
      Delay(1000);

      //turn on the layer
      layerOn(myLabel, icon, num);
      Delay(1000);
    }
  }
}

function layerOff(tn, myLabel, icon, num, msg1, msg2) {
  icon.Click();
  compareResults.printResultResult(tn.className == "inActive" ? "Pass" : "Fail", msg1);
  compareResults.printResultResult(num.Visible ? "Fail" : "Pass", msg2);
}

function layerOn(myLabel, icon, num) {
  icon.Click();
  msg = "Layer on - icon and label enabled. Count visible";
  compareResults.printResultResult(icon.className == "recIcon active" && num.VisibleOnScreen ? "Pass" : "Fail", msg);
}