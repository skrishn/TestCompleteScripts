//USEUNIT compareResults
//USEUNIT openReadFile
function incidentDownload(b, getPanelArray, demoConcat, hospConcat, schConcat, shelConcat, emeConcat, bridgeCount, rdBlockCount, rdClosure) {
  try {
    // delete all the files
    delAllFiles()
    downloadAll = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1).Panel(0).Panel(1).Panel(1).Image("download_all_png")
    downloadAll.Click()
    if (b == "iexplore") {
      downloadAllIncidents()
    }
    Delay(2000)
    openReadFile.findFiles(getPanelArray)
    openReadFile.getSummaryFile(getPanelArray, demoConcat, hospConcat, schConcat, shelConcat, emeConcat, bridgeCount, rdBlockCount, rdClosure)
  } catch (e) {
    y = aqString.Concat("Download ", e)
    compareResults.printResult(y)
  }
}

function resultsDownload(panels, panelsCT, b, num, dName) {
  try {
    Delay(1000)
    delAllFiles()
    //When a results tab is open - this panel is seen
    rsltTabPanel = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1)
    rsltTabPanelCC = rsltTabPanel.ChildCount
    for (i = rsltTabPanelCC - 1; i >= 0; i--) {
      //Find the panel that has children
      activePanel = rsltTabPanel.Child(i)
      if (activePanel.Visible == true) {
        downloadButton = activePanel.Panel(0).Panel(0).Panel(0)
        downloadButton.Click()
        if (b == "iexplore") {
          rsltDownload()
        }
        openReadFile.openFiles(panelsCT, b, num)
        break;
      }
    }
  } catch (e) {
    y = aqString.Concat("Download ", e)
    compareResults.printResult(y)
  }
}

function rsltDownload() {
  try {

    frameNotificationBar = Sys.Browser("iexplore").BrowserWindow(0).Window("Frame Notification Bar", "", 1).UIAObject("Notification")
    frameNotificationBar.Refresh();
    //frameNotificationBar.RefreshMappingInfo();
    var saveDialog = frameNotificationBar.UIAObject("Save")
    //saveDialog.RefreshMappingInfo();
    if (!saveDialog.Exists) {
      //break;
      Log.Message("ting ting ting")
    }
    saveDialog.Click();

    frameNotificationBar.Refresh();
    //frameNotificationBar.RefreshMappingInfo();
    var closeDialog = frameNotificationBar.UIAObject("Close")
    //closeDialog.RefreshMappingInfo();
    if (!(closeDialog.Exists && closeDialog.VisibleOnScreen)) {
      //break;
      Log.Message("ting ting ting")
    }

    closeDialog.Click();
    // image.Click(5, 14);
    //svg.HoverMouse(1060, 73);
    //browserWindow.Close();
  } catch (e) {
    y = aqString.Concat("rsltDownload ", e)
    compareResults.printResult(y)
  }
}

function downloadAllIncidents() {
  try {
    browser = Aliases.browser;
    browserWindow = browser.BrowserWindow;
    frameNotificationBar = browserWindow.FrameNotificationBar;

    for (; ;) {
      frameNotificationBar.Refresh();
      frameNotificationBar.RefreshMappingInfo();
      var saveDialog = frameNotificationBar.Notification_Save;
      saveDialog.RefreshMappingInfo();
      if (!saveDialog.Exists) {
        break;
      }

      saveDialog.Save.Click();
    }

    for (; ;) {
      frameNotificationBar.Refresh();
      frameNotificationBar.RefreshMappingInfo();
      var closeDialog = frameNotificationBar.Notification_Close;
      closeDialog.RefreshMappingInfo();
      if (!(closeDialog.Exists && closeDialog.VisibleOnScreen)) {
        break;
      }

      closeDialog.Close.Click();
    }
  } catch (e) {
    y = aqString.Concat("downloadAllIncidents ", e)
    compareResults.printResult(y)
  }
}

function delAllFiles() {
  // delete all the files
  aqFileSystem.DeleteFile("C:\\Users\\suba6982\\Downloads\\*.csv")
}
