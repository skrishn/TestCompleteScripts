//USEUNIT compareResults
//USEUNIT downloadUtils

let demoConcat = "", hospConcat = "", schConcat = "", shelConcat = "", emeConcat = "";
let bridgeCount = "", rdBlockCount = "", rdClosure = "";

function getAnalysisLayer(download) {
  try {
    Delay(500)
    widgetUtils.getTabsContainer();
    var cnt = widgetUtils.panel.ChildCount;
    var panels = [];
    if (cnt > 1) {
      for (i = cnt - 1; i >= 0; i--) {
        var panel = widgetUtils.panel.Child(i);
        var panelText = panel.contentText;
        if (panel.className.indexOf("SATTab") > -1) {
          if (panelText != "Incident") {
            panel.Click();
            //TODO why is Demographics handled differently??
            // curious why the commented section below could not replace this...testTab would also need to be updated
            // if the names are no longer updated by us
            // var name = panelText.replace(/[^a-zA-Z]/g, '');
            // var num_features = panelText.replace(/[^0-9]/g, '');
            // panels.push(name);
            // testTab(panel, name, b, num_features);

            if (panelText == "Demographics") {
              //panels.push(panelText);
              //testTab(panel, panelText, "demo");
            } else {
              //TODO what is all this
              //Look and see why the space is being added..??
              //If that can be skipped we can delete this stuff and simplify the name tests in testTab
              var name = panelText.replace(/[^a-zA-Z]/g, '');
              var num_features = panelText.replace(/[^0-9]/g, '');
              if (name == "EmergencyAssistance") {
                name = name.replace("EmergencyAssistance", "Emergency Assistance");
              } else if (name == "RoadBlocks") {
                name = name.replace("RoadBlocks", "Road Blocks");
              } else if (name == "RoadClosures") {
                name = name.replace("RoadClosures", "Road Closures");
              }
              panels.push(name);
              testTab(panel, name, num_features);
            }
          }
        }
      }

      widgetUtils.clickIncidentTab();
      if (download == "Download") {
        compareResults.printResult("Download ");
        downloadUtils.incidentDownload(b, panels, demoConcat, hospConcat, schConcat, shelConcat,
          emeConcat, bridgeCount, rdBlockCount, rdClosure);
      }
    }
    return panels;
  } catch (e) {
    compareResults.printResult("Analysis layer" + e);
  }
}

function testTab(panel, name, num_features) {
  try {
    compareResults.printResultCenter(name);

    if (name == "Demographics") {
      demoConcat = demographics();
    } else if (name == "Hospitals") {
      hospConcat = hospitals();
    } else if (name.indexOf("Schools") > -1) {
      schConcat = schools();
    } else if (name.indexOf("Shelters") > -1) {
      shelConcat = shelters();
    } else if (name.indexOf("Emergency Assistance") > -1) {
      emeConcat = emergencyAssistance();
    } else if (name.indexOf("Bridges") > -1) {
      bridges();
    } else if (name.indexOf("Road Blocks") > -1) {
      roadBlocks();
    } else if (name.indexOf("Road Closures") > -1) {
      roadClosures();
    }

    downloadUtils.resultsDownload(panel, name, num_features, "btnExport download");
  } catch (e) {
    compareResults.printResult("Eval results " + e);
  }
}

function demographics() {
  var concatTexts = ["Age<14 - ", "Age>65 - ", "Total population - "];
  return testText(3, 1, concatTexts);
}

function hospitals() {
  var panel = widgetUtils.tabsContainer.Panel(4).Panel(0);

  testCount();

  var addr = panel.Panel(1).Panel(1).contentText;
  compareResults.resultTxtNotEmpty(addr, "Address displays");

  var distPanel = panel.Panel(1).Panel(0);
  if (distPanel.Panel(1).Exists == true) {
    var txtFind = aqString.Find(distPanel.Panel(1).contentText, "(approximate)");
    compareResults.resultTxtNotEmpty1(distPanel.Panel(0).contentText, "Points incident - distance and duration");
  } else {
    compareResults.printResult("Line and polygon incidents - no distance and duration");
  }

  return addr.replace(/\n|\r/g, ',');
}

function schools() {
  var concatTexts = ["No of students - "];
  return testText(5, 2, concatTexts);
}

function shelters() {
  var concatTexts = ["Total capacity - ", "No of beds available - ", "Current capacity - "];
  return testText(6, 2, concatTexts);
}

function emergencyAssistance() {
  var concatTexts = ["Medication required - ", "Service animal present - ",
    "Transportation required - ", "Evacuation plan present - "];
  return testText(7, 2, concatTexts);
}

function bridges() {
  testCount(8);
}

function roadBlocks() {
  testCount(9);
}

function testCount(i) {
  var count = widgetUtils.tabsContainer.Panel(i).Panel(0).Panel(1).Panel(1).contentText;
  compareResults.resultTxt(count, i, "Count in header and panel matches");
  return count;
}

function testText(index, baseIndex, concatTexts) {
  var tab = widgetUtils.tabsContainer.Panel(index);
  var appends = [testCount(index)];
  for (var i = baseIndex; i <= concatTexts.length + baseIndex; i++) {
    var concatText = concatTexts[i - baseIndex];
    var v = tab.Panel(0).Panel(i).Panel(1).contentText;
    compareResults.resultTxtNotEmpty(v, concatText + v);
    appends.push(v);
  }

  return appends.join(",");
}