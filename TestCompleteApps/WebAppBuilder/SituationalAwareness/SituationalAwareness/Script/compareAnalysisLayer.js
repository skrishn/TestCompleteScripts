//USEUNIT compareResults
//USEUNIT downloadUtils
//USEUNIT openReadFile

//let children, seniors, totalPopulation, hospAddr, no_of_students, schoolCount, shelterCount, totalCapacity, no_of_beds, currCapacity; 
//let emerCount, medReq, animalPresent, transPlan, evaPlan, bridgeCount, rdBlockCount, rdClosure;
let demoConcat = "", hospConcat = "", schConcat = "", shelConcat = "", emeConcat = "", bridgeCount = "", rdBlockCount = "", rdClosure = "";

//Project.Variables.AddVariable("MyVar", "String");*/
var pfn, panels
function getAnalysisLayer(b, dn) {
  try {
    Delay(500)
    var saPanel = widgetUtils.panel;
    var saPanelCC = saPanel.ChildCount;
    var getPanelArray = [];
    if (saPanelCC > 1) {
      for (i = saPanelCC - 1; i >= 0; i--) {
        panels = saPanel.Child(i)
        pfn = panels.FullName
        panelsCT = panels.contentText
        if (panels.className == "SATTab") {
          if (panelsCT != "Incident") {
            panels.Click()
            if (panelsCT == "Demographics") {
              getPanelArray.push(panelsCT)
              checkResultsTab(panels, panelsCT, b, "demo")
            } else {
              var currentPanelName = panelsCT.replace(/[^a-zA-Z]/g, '');
              var num_features = panelsCT.replace(/[^0-9]/g, '');
              if (currentPanelName == "EmergencyAssistance") {
                cpn = currentPanelName.replace("EmergencyAssistance", "Emergency Assistance")
                currentPanelName = cpn
              } else if (currentPanelName == "RoadBlocks") {
                cpn = currentPanelName.replace("RoadBlocks", "Road Blocks")
                currentPanelName = cpn
              } else {
                if (currentPanelName == "RoadClosures") {
                  cpn = currentPanelName.replace("RoadClosures", "Road Closures")
                  currentPanelName = cpn
                }
              }
              getPanelArray.push(currentPanelName)
              checkResultsTab(panels, currentPanelName, b, num_features)
            }
          }
        }
      }

      widgetUtils.clickIncidentTab()
      if (dn == "Download") {
        compareResults.printResult("Download ")
        downloadUtils.incidentDownload(b, getPanelArray, demoConcat, hospConcat, schConcat, shelConcat, emeConcat, bridgeCount, rdBlockCount, rdClosure)
      }
    }
    return getPanelArray
  } catch (e) {
    y = aqString.Concat("Analysis layer", e)
    compareResults.printResult(y)
  }
}
function checkResultsTab(pfn, currentPanelName, b, num_features) {

  try {
    if (currentPanelName == "Demographics") {
      compareResults.printResultCenter(currentPanelName)
      // the three tabs - check heading and value
      ip1 = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(3).Panel(0)

      children = ip1.Panel(1).Panel(1).contentText
      msg1 = aqString.Concat("Age<14 - ", children)
      compareResults.resultTxtNotEmpty(children, msg1)

      seniors = ip1.Panel(2).Panel(1).contentText
      msg1 = aqString.Concat("Age>65 - ", seniors)
      compareResults.resultTxtNotEmpty(seniors, msg1)

      totalPopulation = ip1.Panel(3).Panel(1).contentText
      msg1 = aqString.Concat("Total population - ", totalPopulation)
      compareResults.resultTxtNotEmpty(totalPopulation, msg1)
      demoConcat = children + "," + seniors + "," + totalPopulation
      downloadUtils.resultsDownload(panels, currentPanelName, b, "demo", "btnExport download")
    }

    if (currentPanelName != "Demographics") {

      if (currentPanelName == "Hospitals") {
        compareResults.printResultCenter(currentPanelName)
        hospitalCount = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(4).Panel(0).Panel(1).Panel(0).Panel(0).contentText

        hospPanel = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(4).Panel(0)
        hospPanelcc = hospPanel.ChildCount
        hosps = hospPanelcc - 1
        compareResults.resultTxt(hosps, num_features, "Hospitals - Count in header and panel matches")

        hospAddr = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(4).Panel(0).Panel(1).Panel(1).contentText
        compareResults.resultTxtNotEmpty(hospAddr, "Address displays")
        //Project.Variables.hospConcat = aqString.Concat(children, ",", seniors, ",", totalPopulation)
        Log.Message(hospAddr)
        hospConcat = hospAddr.replace(/\n|\r/g, ',');
        Log.Message(hospConcat)
        Log.Message("")

        if (Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(4).Panel(0).Panel(1).Panel(0).Panel(1).Exists == true) {

          dist = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(4).Panel(0).Panel(1).Panel(0).Panel(1).contentText
          txtFind = aqString.Find(dist, "(approximate)")
          resultTxtNotEmpty1(hospitalCount, "Points incident - distance and duration")

        } else {
          compareResults.printResult("Line and polygon incidents - no distance and duration")

        }
        downloadUtils.resultsDownload(panels, currentPanelName, b, num_features, "btnExport")

      }
      if (aqString.Find(currentPanelName, "Schools") != -1) {

        compareResults.printResultCenter(currentPanelName)
        schoolCount = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(5).Panel(0).Panel(1).Panel(1).contentText
        compareResults.resultTxt(schoolCount, num_features, "Count in header and panel matches")

        no_of_students = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(5).Panel(0).Panel(2).Panel(1).contentText
        msg1 = aqString.Concat("No of students - ", no_of_students)
        compareResults.resultTxtNotEmpty(no_of_students, msg1)
        downloadUtils.resultsDownload(panels, currentPanelName, b, num_features, "btnExport download")
        schConcat = schoolCount + "," + no_of_students

      }
      if (aqString.Find(currentPanelName, "Shelters") != -1) {

        compareResults.printResultCenter(currentPanelName)
        shelterCount = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(6).Panel(0).Panel(1).Panel(1).contentText
        compareResults.resultTxt(shelterCount, num_features, "Count in header and panel matches")

        totalCapacity = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(6).Panel(0).Panel(2).Panel(1).contentText
        msg1 = aqString.Concat("Total capacity - ", totalCapacity)
        compareResults.resultTxtNotEmpty(totalCapacity, msg1)

        no_of_beds = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(6).Panel(0).Panel(3).Panel(1).contentText
        msg1 = aqString.Concat("No of beds available - ", no_of_beds)
        compareResults.resultTxtNotEmpty(no_of_beds, msg1)

        currCapacity = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(6).Panel(0).Panel(4).Panel(1).contentText
        msg1 = aqString.Concat("Current capacity - ", currCapacity)
        compareResults.resultTxtNotEmpty(currCapacity, msg1)
        downloadUtils.resultsDownload(panels, currentPanelName, b, num_features, "btnExport download")

        shelConcat = shelterCount + "," + totalCapacity + "," + no_of_beds + "," + currCapacity
      }
      if (aqString.Find(currentPanelName, "Emergency Assistance") != -1) {

        compareResults.printResultCenter(currentPanelName)
        emerCount = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(7).Panel(0).Panel(1).Panel(1).contentText
        compareResults.resultTxt(emerCount, num_features, "Count in header and panel matches")

        medReq = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(7).Panel(0).Panel(2).Panel(1).contentText
        msg1 = aqString.Concat("Medication required - ", medReq)
        compareResults.resultTxtNotEmpty(medReq, msg1)

        animalPresent = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(7).Panel(0).Panel(3).Panel(1).contentText
        msg1 = aqString.Concat("Service animal present - ", animalPresent)
        compareResults.resultTxtNotEmpty(animalPresent, msg1)

        transPlan = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(7).Panel(0).Panel(4).Panel(1).contentText
        msg1 = aqString.Concat("Transportation required - ", transPlan)
        compareResults.resultTxtNotEmpty(transPlan, msg1)


        evaPlan = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(7).Panel(0).Panel(5).Panel(1).contentText
        msg1 = aqString.Concat("Evacuation plan present - ", evaPlan)
        compareResults.resultTxtNotEmpty(evaPlan, msg1)
        downloadUtils.resultsDownload(panels, currentPanelName, b, num_features, "btnExport download")

        emeConcat = emerCount + "," + medReq + "," + animalPresent + "," + transPlan + "," + evaPlan
        Log.Message(emeConcat)
        Log.Message("")
      }
      if (aqString.Find(currentPanelName, "Bridges") != -1) {

        compareResults.printResultCenter(currentPanelName)
        bridgeCount = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(8).Panel(0).Panel(1).Panel(1).contentText
        compareResults.resultTxt(bridgeCount, num_features, "Count in header and panel matches")
        downloadUtils.resultsDownload(panels, currentPanelName, b, num_features, "btnExport download")
      }
      if (aqString.Find(currentPanelName, "Road Blocks") != -1) {
        compareResults.printResultCenter(currentPanelName)
        rdBlockCount = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(9).Panel(0).Panel(1).Panel(1).contentText
        compareResults.resultTxt(rdBlockCount, num_features, "Count in header and panel matches")
        downloadUtils.resultsDownload(panels, currentPanelName, b, num_features, "btnExport download")

      } else {
        if (aqString.Find(currentPanelName, "Road Closures") != -1) {
          compareResults.printResultCenter(currentPanelName)
          rdClosure = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(10).Panel(0).Panel(1).Panel(1).contentText
          compareResults.resultTxt(rdClosure, num_features, "Count in header and panel matches")
          downloadUtils.resultsDownload(panels, currentPanelName, b, num_features, "btnExport download")
        }
      }
    }
  } catch (e) {
    y = aqString.Concat("Eval results ", e)
    compareResults.printResult(y)
  }
}

function innerPanel(currentPanel, currentPanelName) {
  try {
    getCT = []
    currentPanel0 = currentPanel.Panel(0)
    getCC = currentPanel0.ChildCount
    for (i = getCC - 1; i >= 0; i--) {

      panelChild = currentPanel0.Child(i)
      ignorePanel = "Panel(0)";
      if (panelChild.Name != ignorePanel) {
        getCT = panelChild.Panel(0).Panel(0).contentText
        checkResultsTab(getCt, currentPanelName)
      }
    }
  } catch (e) {
    y = aqString.Concat("Inner panel ", e)
    compareResults.printResult(y)
  }
}