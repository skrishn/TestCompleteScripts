//USEUNIT compareResults
//USEUNIT openReadFile
//USEUNIT config

function incidentDownload(b, getPanelArray, demoConcat, hospConcat, schConcat, shelConcat, emeConcat, bridgeCount, rdBlockCount, rdClosure) {
  try {
    delAllFiles();
    widgetUtils.downloadAll.Click();
    if (b == "iexplore") {
      downloadAllIncidents();
    }
    Delay(2000);
    openReadFile.findFiles(getPanelArray);
    openReadFile.getSummaryFile(getPanelArray, demoConcat, hospConcat, schConcat, shelConcat, emeConcat, bridgeCount, rdBlockCount, rdClosure);
  } catch (e) {
    compareResults.printResult("Download " + e);
  }
}

function resultsDownload(panels, panelsCT, b, num, dName) {
  try {
    Delay(1000);
    delAllFiles();
    //When a results tab is open - this panel is seen
    var resultTab = widgetUtils.getResultTab();
    for (i = resultTab.ChildCount - 1; i >= 0; i--) {
      //Find the panel that has children
      var activePanel = resultTab.Child(i);
      if (activePanel.Visible == true) {
        downloadButton = activePanel.Panel(0).Panel(0).Panel(0);
        downloadButton.Click();
        if (b == "iexplore") {
          rsltDownload();
        }
        openReadFile.openFiles(panelsCT, b, num);
        break;
      }
    }
  } catch (e) {
    compareResults.printResult("Download " + e);
  }
}

function rsltDownload() {
  try {
    var notificationBar = widgetUtils.getIENotificationBar();
    notificationBar.bar.Refresh();

    var saveDialog = notificationBar.Notification_Save;
    if (!saveDialog.Exists) {
      throw "saveDialog does not exist";
    }
    saveDialog.Click();

    notificationBar.Refresh();

    var closeDialog = notificationBar.Notification_Close;
    if (!closeDialog.Exists && !closeDialog.VisibleOnScreen) {
      throw "closeDialog does not exist or is not visible";
    }
    closeDialog.Click();
  } catch (e) {
    compareResults.printResult("rsltDownload " + e);
  }
}

function downloadAllIncidents() {
  try {
    var notificationBar = widgetUtils.getNotificationBar();

    //TODO what are these about...almost seems like one could consolidate the above
    // with this function and just handle differently for IE
    //Is this empty loop just so the break statement could be used??
    for (; ;) {
      notificationBar.Refresh();
      notificationBar.RefreshMappingInfo();
      var saveDialog = notificationBar.Notification_Save;
      saveDialog.RefreshMappingInfo();
      if (!saveDialog.Exists) {
        break;
      }
      saveDialog.Save.Click();
    }

    for (; ;) {
      notificationBar.Refresh();
      notificationBar.RefreshMappingInfo();
      var closeDialog = notificationBar.Notification_Close;
      closeDialog.RefreshMappingInfo();
      if (!(closeDialog.Exists && closeDialog.VisibleOnScreen)) {
        break;
      }
      closeDialog.Close.Click();
    }
  } catch (e) {
    compareResults.printResult("downloadAllIncidents " + e);
  }
}

function delAllFiles() {
  // delete all the files
  aqFileSystem.DeleteFile(config.fileFolder + "\\*.csv")
}
