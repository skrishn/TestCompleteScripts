//USEUNIT widgetUtils
//USEUNIT config
//USEUNIT compareResults

var _themeName;

function test(themeName) {
  _themeName = themeName;

  //click the widget to open it
  widgetUtils.clickWidget();

  //config option that is specific to DA tests
  var csvFiles = config.csvFiles;
  
  //Test multiField address
  _testCSV(csvFiles.multiFieldAddress, false);

  //Test single field address
  _testCSV(csvFiles.singleFieldAddress, false);

  //Test duplicates
  _testCSV(csvFiles.duplicate, false);

  //Test XY
  _testCSV(csvFiles.xy, true);
}

function _testCSV(csvInfo, clear) {
  //try {
    widgetUtils.browseFile(csvInfo.path);
    Delay(4000);
    //need a way to pull out the edit layer url
    //_clearResults();
    _daWorkflow(csvInfo);
    if (clear) {
      clearResults(url);
    }
  //} catch (error) {
    
  //}
}

function _daWorkflow(csvInfo) {
  //init locations and field info
  widgetUtils.initPanel();
  
  //click next to location info
  widgetUtils.clickNext();
  Delay(10);
  
  //click to locate with address
  widgetUtils.clickNext();
  Delay(10);
  widgetUtils.initAddressPage();
  
  switch (csvInfo.type)
  {
    case 'duplicate':
      widgetUtils.clickMultiFieldRadio();  
      break;
    case 'single':
      widgetUtils.clickSingleFieldRadio();
      //TODO Need to set Field here
      break;      
    case 'multiple':
      widgetUtils.clickMultiFieldRadio();  
      break;
    case 'xy':
    
      break;
  }
  
  //click next to go back to locations and field info
  widgetUtils.clickNext();
  
  //click next to go to field info
  widgetUtils.clickNext();
  Delay(10);
  
  //click next to accept defaults and go back to field info
  widgetUtils.clickNext();
  Delay(10);
  
  //init the start page and click add to map
  widgetUtils.initStartPage();
  widgetUtils.clickAddToMap();
  Delay(2000);
  
  //init the review page and go into locations not found
  widgetUtils.initReviewPage('found-notFound');
  widgetUtils.clickNext();
  Delay(10);
  
  //click into un-located Feature
  widgetUtils.clickNext();
  Delay(10);
  
  //handle the unlocated feature
  handleUnlocated();

  //click home and yes to clear the settings 
  widgetUtils.clickHome();
  widgetUtils.clickClearSettingsDialogYes();
}

function handleUnlocated()
{
  //init the feature page and start editing
  widgetUtils.initFeaturePage();
  widgetUtils.clickEdit();
  Delay(10);

  //expand the location information
  widgetUtils.clickExpandLocationButton();

  //get the feature table
  var table = widgetUtils.featureTable;
  
  //verify expected text for location
  compareResults.isTextEqual(table.cell6.textbox, "8140 E 5TH AVENUE");
  compareResults.isTextEqual(table.cell4.textbox, "");
  compareResults.isTextEqual(table.cell7.textbox, "");

  //set text and verify locate is enabled
  table.cell4.textbox.SetText("Denver");
  compareResults.isClassNameEqual(widgetUtils.locateButton, "bg-ft-img feature-toolbar-btn float-right bg-locate");
  
  //clear text and verify locate is disabled
  table.cell4.textbox.SetText("");
  compareResults.isClassNameEqual(widgetUtils.locateButton, "bg-ft-img feature-toolbar-btn float-right bg-locate-disabled");
  
  //set text and locate
  table.cell4.textbox.SetText("Denver");
  table.cell7.textbox.SetText("CO"); 
  widgetUtils.clickLocate();
  Delay(1000);

  //verify cancel and save are enabled
  compareResults.isClassNameEqual(widgetUtils.cancelButton, "bg-ft-img feature-toolbar-btn bg-cancel");
  compareResults.isClassNameEqual(widgetUtils.saveButton, "float-right bg-ft-img feature-toolbar-btn bg-save");
  
  //cancel the locate
  widgetUtils.clickCancel();
  widgetUtils.clickCancelDialogYes();
  
  //TODO seems like we should clear out the address info they set here...seems like a bug to me
  
  //clear and reset text
  table.cell4.textbox.SetText("");
  table.cell4.textbox.SetText("Denver");
  
  //locate and save
  widgetUtils.clickLocate();
  widgetUtils.clickSave();
  Delay(100);
  
  //init the review page and verify that the saved record was moved to locations found
  widgetUtils.initReviewPage('found');
  compareResults.isContentTextEqual(widgetUtils.locationsFoundLabel, 'Locations Found');
  compareResults.isContentTextEqual(widgetUtils.locationsFoundCount, '25');
}

function dragDrop() {

}

//Clears results of previous submit operations
function _clearResults(url) {
  //TODO write function that will hit the destination layer URL and clear the features

}