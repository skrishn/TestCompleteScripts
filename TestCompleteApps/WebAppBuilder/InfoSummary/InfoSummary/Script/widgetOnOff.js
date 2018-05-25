//USEUNIT compareResults
//USEUNIT layerOnOff
//USEUNIT widgetUtils

var _themeName;

function test(themeName) {
  _themeName = themeName;
  widgetUtils.init(themeName);
  var layersContainer = widgetUtils.layersContainer;

  // get the childcount of number of maps in the side panel
  var layerCount = layersContainer.ChildCount;
  compareResults.printResultCenter("Turn widget on/off");
  for (i = layerCount - 1; i >= 0; i--) {
    var layerPanel = layersContainer.Child(i);
    recSubstr1 = layerPanel.idstr.substring(0, 2);  
    if (recSubstr1 == "re") {
      var label = layerPanel.Panel("recLabel_*");
      var myLabel = label.contentText;
      var validNames = ["Road Conditions", "Weather Stations", "Closed Roads", "Width & Height Restrictions"];
      if (validNames.indexOf(myLabel) > -1) {
        var expandArrow = layerPanel.Panel("exp_*");
        var tn = label.TextNode(0);
        var icon = layerPanel.Panel("recIcon_*");
        var num = layerPanel.Panel("recNum_*").contentText;
        var rec_ftrName = aqString.Remove(layerPanel.idstr, 0, 4);
        widgetOnOff(layersContainer, expandArrow, tn, myLabel, icon, num, rec_ftrName);
      }
    }
  }
}

function widgetOnOff(layersContainer, expandArrow, tn, myLabel, icon, num, rec_ftrName) {
  var secondFeatureArrow;
  if (myLabel == "Closed Roads") {
    testClosedRoads(expandArrow, layersContainer);
  } else if (myLabel == "Road Conditions") {
      compareResults.printResultCenter("Expand Layer with group");
      expandArrow.Click();
      Delay(1000);
      myFtr = clickFeature(rec_ftrName);
      Delay(1500);
      compareResults.printResultResult(expandArrow.className == "expand expandUp" ?
        "Pass" : "Fail", "Expand layer");
      if (expandArrow.className == "expand expandUp") {    
        Delay(1500);
        //Click to close widget
        clickWidget();
        Delay(1000);
        compareResults.printResultResult(layersContainer.VisibleOnScreen == false ?
          "Pass" : "Fail", "Close  widget");
        if (layersContainer.VisibleOnScreen == false) {      
          // Click to open widget
          clickWidget();
          Delay(1000);
          compareResults.printResultResult(layersContainer.VisibleOnScreen ?
            "Pass" : "Fail", "Open  widget");
          if (layersContainer.VisibleOnScreen) {   
            Delay(1000);
            compareResults.printResultResult(expandArrow.className == "expand expandUp" ? 
              "Pass" : "Fail", "Layer remains expanded");
            Delay(1000);
            compareResults.printResultResult(myFtr.className == "groupItemImage groupItemImageUp" ? 
              "Pass" : "Fail", "Group Layer's features remains expanded");
            if (myFtr.className == "groupItemImage groupItemImageUp") {
              myFtr.Click()
            }
            Delay(1000);
            expandArrow.Click();
          }
        }
      }
    } else if (myLabel == "Weather Stations") {
      compareResults.printResultCenter("Turn layer off/on");
      // turn off the  layer
      layerOnOff.layerOff(tn, myLabel, icon, num, "Icon and label disabled", "No count");

      // click widget to close it
      clickWidget();
      Delay(1000);
      compareResults.printResultResult(layersContainer.VisibleOnScreen == false ?
        "Pass" : "Fail", "Close  widget");
      if (layersContainer.VisibleOnScreen == false) {     
        clickWidget();
        Delay(1000);
        compareResults.printResultResult(layersContainer.VisibleOnScreen ?
          "Pass" : "Fail", "Open  widget");
        if (layersContainer.VisibleOnScreen) {        
          compareResults.printResultResult(tn.className == "inActive" ?
            "Pass" : "Fail", "Icon and label remains disabled");
          compareResults.printResultResult(num.Visible ?
            "Fail" : "Pass", "Count values remains invisible");
          icon.Click();
        }
      }
    } else {
      compareResults.printResultCenter("Cluster layer");
      if (myLabel == "Width & Height Restrictions") {
        var ftrItem;
        expandArrow.Click();
        legend_layersContainer = widgetUtils.layersContainer;
        legend_layerCount = legend_layersContainer.ChildCount;
        for (j = legend_layerCount - 1; j >= 0; j--) {
          layerPanel1 = legend_layersContainer.Child(j);
          legSubstr = layerPanel1.idstr;
          legSubstr1 = legSubstr.substring(0, 2);
          leg_featureIDStr = aqString.Remove(legSubstr, 0, 7);

          if (legSubstr1 == "le") {
            if (rec_ftrName == leg_featureIDStr) {
              layerPanel1cc = layerPanel1.ChildCount;

              //Loop the features to identity the feature I wanted near Frenchtown
              for (m = layerPanel1cc - 1; m >= 0; m--) {
                ftrItem = layerPanel1.Child(m);
                ftrItemCT = ftrItem.contentText;
                a = aqString.Find(ftrItemCT, "Thomas J. Hatem");
                if (a != -1) {
                  break;
                }
              }
            } //	break;
          }
        }
        ftrItem.Click();

        // if popup appears
        widgetUtils.initPopup();
        popup = widgetUtils.popup;
        popupClose = widgetUtils.popupClose;

        if (popup.Visible) {
          // clustering value in 2
          //clusteringValue = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("map").Panel("map_root").Panel("map_container").Panel("map_layers").SVG("map_gc").TextNode(0)
          clusteringValue = widgetUtils.mapDIV.SVG(9).TextNode(0);
          clusteringValue.Click();

          popupHeader = widgetUtils.popupHeader;
          phCT = popupHeader.contentText;

          compareResults.printResultResult(phCT == "(1 of 2)" ?
            "Pass" : "Fail", "Cluster symbol with value displays");
          if (phCT == "(1 of 2)") {      
            //Close the widget
            clickWidget();
            Delay(1000);

            if (layersContainer.VisibleOnScreen == false) {
              compareResults.printResultResult("Pass", "Close Widget");
              clickWidget();
              Delay(1000);

              compareResults.printResultResult(layersContainer.VisibleOnScreen ?
                "Pass" : "Fail", "Open widget");
              if (layersContainer.VisibleOnScreen) {
                compareResults.printResultResult(clusteringValue.VisibleOnScreen ?
                  "Pass" : "Fail", "Cluster still displays");
                if (clusteringValue.VisibleOnScreen) { 
                  compareResults.printResultResult(popupHeader.VisibleOnScreen ?
                    "Pass" : "Fail", "Cluster popup still opened");
                  if (popupHeader.VisibleOnScreen) {        
                    //click on the arrow in popup to move to next feature
                    widgetUtils.popupNext.Click()
                    Delay(1000);             
                    widgetUtils.initPopup();
                    secondFtrItem = widgetUtils.popup.Panel(1).Panel(0).contentText;
                    Log.Message("aa and s f tT " + secondFtrItem);
                    b = aqString.Find(secondFtrItem, "John");

                    if (b != -1) {
                      aa = "good";
                    }
                    popupHeader1 = widgetUtils.popupHeader;
                    phCT1 = popupHeader1.contentText;
                    Log.Message("aa and PHCT " + a + phCT1);

                    compareResults.printResultResult((aa == "good") && (phCT1 == "(2 of 2)") ?
                      "Pass" : "Fail", "Click popup arrow to move to next feature");
                  }
                }
              }
            }
          }
          popupClose.Click();
        } else {
          Log.Message("Feature item John not found");
        }
      }
      expandArrow.Click();
    }
}

function testClosedRoads(expandArrow, layersContainer){
  compareResults.printResultCenter("Expand Layer (no group)");
  expandArrow.Click();
  Delay(1000);
  compareResults.printResultResult(expandArrow.className == "expand expandUp" ?
    "Pass" : "Fail", "Expand layer");
  if (expandArrow.className == "expand expandUp") {    
    Delay(1500);
    Log.Message("Closed road - going to close widget");
    //Click to close widget
    clickWidget();
    Delay(1000);

    compareResults.printResultResult(layersContainer.VisibleOnScreen == false ? 
      "Pass" : "Fail", "Close widget");
    if (layersContainer.VisibleOnScreen == false) {
      // Click to open widget
      clickWidget();
      Delay(1000);    
      compareResults.printResultResult(layersContainer.VisibleOnScreen ? 
        "Pass" : "Fail", "Open widget");
      if (layersContainer.VisibleOnScreen) {
        Delay(1000);
        compareResults.printResultResult(expandArrow.className == "expand expandUp" ?
          "Pass" : "Fail", "Layer remains expanded");
        Delay(1000);
        expandArrow.Click();
      }
    }
  }
}

function clickFeature(rec_ftrName) {
  var lgd_idstr, legend_idStr, layerPanel1cc;
  legend_layersContainer = widgetUtils.layersContainer;
  legend_layerCount = legend_layersContainer.ChildCount;
  for (j = legend_layerCount - 1; j >= 0; j--) {
    layerPanel1 = legend_layersContainer.Child(j);
    legSubstr = layerPanel1.idstr;
    legSubstr1 = legSubstr.substring(0, 2);
    leg_featureIDStr = aqString.Remove(legSubstr, 0, 7);
    if (legSubstr1 == "le") {
      if (rec_ftrName == leg_featureIDStr) {
        Log.Message("recs equal");
        Delay(2000);
        layerPanel1cc = layerPanel1.ChildCount;
        Log.Message("layerPanel1cc " + layerPanel1cc)
        break;
      }
    }
  }
  for (k = layerPanel1cc - 1; k >= 0; k--) {
    if (k == layerPanel1cc - 1) {
      layerPanel2 = layerPanel1.Child(k);
      Log.Message("layer panel 2 " + layerPanel2.Name);
      break;
    }
  }
  ftrArrow = layerPanel2.Panel("group_*").Panel(2).Panel(0);
  ftrArrow.Click();
  Delay(1000);
  return ftrArrow;
}

function clickWidget() {
  widget = widgetUtils.testWidget;
  widget.Click();
}