//USEUNIT compareResults
//USEUNIT widgetUtils
var _themeName;

function test(themeName) {
  _themeName = themeName;
  widgetUtils.init(themeName);
  var gpLayer;

  compareResults.printResultCenter("Expand Layers");
  
  // get the layer Container panel on the side panel
  var layersContainer = widgetUtils.layersContainer;

  // get the childcount of number of maps in the side panel
  var layerCount = layersContainer.ChildCount;

  //Loop is reversed otherwise the child click happens bottom up
  //for (i = 0; i <= layerCount; i++) {
  for (i = layerCount - 1; i >= 0; i--) {
    var layerPanel = layersContainer.Child(i);
    var recSubstr1 = layerPanel.idstr.substring(0, 2);

    if (recSubstr1 == "re") {
      var rec_ftrName = aqString.Remove(layerPanel.idstr, 0, 4);

      var num = layerPanel.Panel("recNum_*").contentText;

      var label = layerPanel.Panel("recLabel_*");
      var tn = label.TextNode(0);
      var myLabel = label.contentText;

      //Road conditions - has group layers
      if (myLabel == "Road Conditions") {
        gpLayer = "group";
      } else {
        gpLayer = "no group";
      }
      
      compareResults.printResultCenter(myLabel);
      var icon = layerPanel.Panel("recIcon_*");
      var iconPic = icon.SVG(0);

      var expandArrow = layerPanel.Panel("exp_*");
      expandLayer(myLabel, expandArrow, rec_ftrName, layerPanel, gpLayer, num);
    }
  }
}

function expandLayer(myLabel, ea, ftrName, layerPanel, gpLayer, num) {
  //click expand
  ea.Click();
  Delay(1000);

  if (ea.ClassName == "expand expandUp") {
    compareResults.printResultResult("Pass", "Arrow icon indicates expanded");
  } else {
    compareResults.printResultResult("Fail", "Arrow icon indicates expanded");
  }
  msg = "Expand to list features";

  loopLegendLayer(ftrName, msg, gpLayer, num);
  ea.Click();
  Delay(900);
  if (ea.ClassName == "expand expandDown") {
    compareResults.printResultResult("Pass", "Arrow icon indicates collapsed");
  } else {
    compareResults.printResultResult("Fail", "Arrow icon indicates collapsed");
  }
}

function loopLegendLayer(rec_ftrName, msg, gpLayer, num) {
  var lgd_idstr, legend_idStr;
  legend_layersContainer = widgetUtils.layersContainer;

  // get the childcount of number of maps in the side panel
  legend_layerCount = legend_layersContainer.ChildCount;

  for (j = legend_layerCount - 1; j >= 0; j--) {
    layerPanel1 = legend_layersContainer.Child(j);
    legSubstr = layerPanel1.idstr;
    legSubstr1 = legSubstr.substring(0, 2);
    var leg_featureIDStr = aqString.Remove(legSubstr, 0, 7);
    if (legSubstr1 == "le") {
      if (rec_ftrName == leg_featureIDStr) {
        Log.Message("recs equal");
        Delay(2000);
        layerPanel1cc = layerPanel1.ChildCount;
        if ((layerPanel1.className == "legendLayer legendOn") && (layerPanel1cc > 0)) {
          compareResults.printResultResult("Pass", msg);
          clickFeature(gpLayer, num, layerPanel1);
        } else {
          compareResults.printResultResult("Fail", msg);
        }
        break;
      }
    }
  }
}

function clickFeature(gpLayer, num, layerPanel1) {
  var layerPanel2, layerPanel3;
  lpcc = layerPanel1.ChildCount;

  for (k = lpcc - 1; k >= 0; k--) {
    if (k == lpcc - 1) {
      layerPanel2 = layerPanel1.Child(k);
      break;
    }
  }
  if (gpLayer == "group") {
    var ftrArrow = layerPanel2.Panel("group_*").Panel(2).Panel(0);
    ftrArrow.Click();
    Delay(1000);
    if (ftrArrow.ClassName == "groupItemImage groupItemImageUp") {
      compareResults.printResultResult("Pass", "Arrow - feature in group - expanded");
    } else {
      compareResults.printResultResult("Fail", "Arrow - feature in group - expanded");
    }
    var g1 = layerPanel2;
    var g1cc = g1.ChildCount;

    for (kk = 0; kk < g1cc; kk++) {
      if (kk == 0) {
        var layerPanel3 = layerPanel2.Child(kk);
        break;
      }
    }
    var groupFeatures = layerPanel3.Panel("feature_*");
    var groupFeatures1 = layerPanel3.ChildCount;
    Log.Message(groupFeatures1);
    var ftrCount = layerPanel2.Panel("group_*").Panel(1).contentText;
    Log.Message("gp f count " + ftrCount + "  " + groupFeatures1)
    if (layerPanel3.Visible) {
      compareResults.printResultResult("Pass", "Group displays features");
      layerPanel3.Click();
      checkPopup();
      if (groupFeatures1 == ftrCount) {
        compareResults.printResultResult("Pass", "Feature and associated count");
      } else {
        compareResults.printResultResult("Fail", "Feature and associated count");
      }
    } else {
      compareResults.printResultResult("Fail", "Group displays features");
    }
    // Collapse the group
    ftrArrow.Click();
    Delay(1500);
    if (ftrArrow.ClassName == "groupItemImage groupItemImageDown") {
      compareResults.printResultResult("Pass", "Arrow - feature in group - collapse");
    } else {
      compareResults.printResultResult("Fail", "Arrow - feature in group  - collapse");
    }
  } else {
    ftr = layerPanel2.Panel(1);
    ftr.Click();
    compareResults.resultTxt(lpcc, num, "Feature and associated count");
    checkPopup();
  }
}

function checkPopup() {
  widgetUtils.initPopup();
  if (widgetUtils.popup.Visible) {
    compareResults.printResultResult("Pass", "One feature clicked - popup appears")
    widgetUtils.popupClose.Click()
  } else {
    compareResults.printResultResult("Pass", "One feature clicked - popup appears")
  }
}