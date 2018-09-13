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
  //_testCSV(csvFiles.multiFieldAddress, false);

  //Test single field address
  //_testCSV(csvFiles.singleFieldAddress, false);
  
  //_clearResults(csvFiles.singleFieldAddress.url);

  //Test duplicates
  //_testCSV(csvFiles.duplicate, false);

  //Test XY
  _testCSV(csvFiles.xy, true);
}

function _testCSV(csvInfo, clear) {
  widgetUtils.browseFile(csvInfo.path);
  Delay(4000);
  _daWorkflow(csvInfo);
  if (clear) {
    clearResults(csvInfo.url);
  } else {
    //click home and yes to clear the settings 
    widgetUtils.clickHome();
    widgetUtils.clickClearSettingsDialogYes();
  }
}

function _daWorkflow(csvInfo) {
  //init locations and field info
  widgetUtils.initPanel();

  //click next to location info
  widgetUtils.clickNext();
  Delay(10);

  widgetUtils.initLocationTypePage();
  switch (csvInfo.locationType) {
    case 'coordinate':
      widgetUtils.clickCoordinate();
      widgetUtils.clickNext();
      widgetUtils.initCoordinatePage();
      break;
    case 'address':
      //click to locate with address
      //widgetUtils.clickAddress();
      widgetUtils.clickNext();
      widgetUtils.initAddressPage();
      break;
  }


  switch (csvInfo.type) {
    case 'duplicate':
      widgetUtils.clickMultiFieldRadio();
      break;
    case 'single':
      widgetUtils.clickSingleFieldRadio();
      widgetUtils.singleAddrSelect.Keys(csvInfo.fields[0] + "[Enter]");
      break;
    case 'multiple':
      widgetUtils.clickMultiFieldRadio();
      break;
    case 'xy':
      //could also set fields here first
      widgetUtils.clickNext();
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

  var numLocated = csvInfo.numExpectedMatched;
  var numUnlocated = csvInfo.numExpectedUnMatched;
  var numDuplicate = csvInfo.numExpectedDuplicate;
  //init the review page and compare actual and expected result counts
  if (numLocated > 0 && numUnlocated > 0 && numDuplicate > 0) {
    widgetUtils.initReviewPage('found-notFound-duplicate');
    compareResults.isContentTextEqual(widgetUtils.locationsFoundCount, numLocated);
    compareResults.isContentTextEqual(widgetUtils.locationsNotFoundCount, numUnlocated);
    compareResults.isContentTextEqual(widgetUtils.locationsDuplicateCount, numDuplicate);
  } else if (numLocated > 0 && numUnlocated > 0) {
    widgetUtils.initReviewPage('found-notFound');
    compareResults.isContentTextEqual(widgetUtils.locationsFoundCount, numLocated);
    compareResults.isContentTextEqual(widgetUtils.locationsNotFoundCount, numUnlocated);
  } else if (numUnlocated > 0 && numDuplicate > 0) {
    widgetUtils.initReviewPage('notFound-duplicate');
    compareResults.isContentTextEqual(widgetUtils.locationsNotFoundCount, numUnlocated);
    compareResults.isContentTextEqual(widgetUtils.locationsDuplicateCount, numDuplicate);
  } else if (numLocated > 0 && numDuplicate > 0) {
    widgetUtils.initReviewPage('found-duplicate');
    compareResults.isContentTextEqual(widgetUtils.locationsFoundCount, numLocated);
    compareResults.isContentTextEqual(widgetUtils.locationsDuplicateCount, numDuplicate);
  } else if (numLocated > 0) {
    widgetUtils.initReviewPage('found');
    compareResults.isContentTextEqual(widgetUtils.locationsFoundCount, numLocated);
  } else if (numUnlocated > 0) {
    widgetUtils.initReviewPage('notFound');
    compareResults.isContentTextEqual(widgetUtils.locationsNotFoundCount, numUnlocated);
  } else if (numDuplicate > 0) {
    widgetUtils.initReviewPage('duplicate');
    compareResults.isContentTextEqual(widgetUtils.locationsDuplicateCount, numDuplicate);
  }

  //go into locations not found
  widgetUtils.clickNext();
  Delay(10);

  //click into un-located Feature
  widgetUtils.clickNext();
  Delay(10);

  if (csvInfo.numExpectedUnMatched > 0) {
    //TODO for this to support multiple unlocated the config will need
    var unlocatedFeatures = csvInfo.unlocatedFeatures;
    var _numUnlocated = unlocatedFeatures.length;
    unlocatedFeatures.forEach(f => {
      //handle the unlocated feature
      numLocated += 1;
      switch (csvInfo.type) {
        case 'duplicate':
          _numUnlocated = handleUnlocatedDuplicate(f, _numUnlocated, numLocated);
          break;
        case 'single':
          _numUnlocated = handleUnlocatedSingleField(f, _numUnlocated, numLocated);
          break;
        case 'multiple':
          _numUnlocated = handleUnlocatedMultiField(f, _numUnlocated, numLocated);
          break;
        case 'xy':
          _numUnlocated = handleUnlocatedXY(f, _numUnlocated, numLocated);
          break;
      }
    });
  }

  if (csvInfo.numExpectedDuplicate > 0) {
    //TODO some workflow for duplicate
  }

  if (csvInfo.numExpectedMatched > 0) {
    //TODO some workflow for matched
  }
}

function handleUnlocatedDuplicate(f, numUnlocated, numLocated) {
  //init the feature page and start editing
  widgetUtils.initFeaturePage();
  widgetUtils.clickEdit();
  Delay(10);

  //expand the location information
  widgetUtils.clickExpandLocationButton();

  //get the feature table
  var table = widgetUtils.featureTable;

  //verify expected text for location
  compareResults.isTextEqual(table.cell6.textbox, f.address.actual);
  compareResults.isTextEqual(table.cell4.textbox, f.city.actual);
  compareResults.isTextEqual(table.cell7.textbox, f.state.actual);

  //set text and verify locate is enabled
  table.cell4.textbox.SetText(f.city.expected);
  compareResults.isClassNameEqual(widgetUtils.locateButton, "bg-ft-img feature-toolbar-btn float-right bg-locate");

  //clear text and verify locate is disabled
  table.cell4.textbox.SetText("");
  compareResults.isClassNameEqual(widgetUtils.locateButton, "bg-ft-img feature-toolbar-btn float-right bg-locate-disabled");

  //set text and locate
  table.cell4.textbox.SetText(f.city.expected);
  table.cell7.textbox.SetText(f.state.expected);
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
  table.cell4.textbox.SetText(f.address.expected);

  //locate and save
  widgetUtils.clickLocate();
  widgetUtils.clickSave();
  numUnlocated -= 1;
  Delay(100);

  //TODO what happens here would be dependant upon if no more unlocated records or not
  if (numUnlocated === 0) {
    //init the review page and verify that the saved record was moved to locations found
    widgetUtils.initReviewPage('found');
    compareResults.isContentTextEqual(widgetUtils.locationsFoundLabel, 'Locations Found');
    compareResults.isContentTextEqual(widgetUtils.locationsFoundCount, numLocated);
  } else {

  }
  return numUnlocated;
}

function handleUnlocatedSingleField(f, numUnlocated, numLocated) {
  //init the feature page and start editing
  widgetUtils.initFeaturePage();
  widgetUtils.clickEdit();
  Delay(10);

  //expand the location information
  widgetUtils.clickExpandLocationButton();

  //get the feature table
  var table = widgetUtils.locationTable;
  
  //verify expected text for location
  var addressControl = table.Cell(0, 1).Panel("widget_dijit_form_ValidationTextBox_*").Panel(1).Textbox(0);
  compareResults.isTextEqual(addressControl, f.address.actual);
  
  //set text and verify locate is enabled
  addressControl.SetText(f.address.expected);
  compareResults.isClassNameEqual(widgetUtils.locateButton, "bg-ft-img feature-toolbar-btn float-right bg-locate");

  //clear text and verify locate is disabled
  addressControl.SetText(f.address.actual);
  compareResults.isClassNameEqual(widgetUtils.locateButton, "bg-ft-img feature-toolbar-btn float-right bg-locate-disabled");

  //set text and locate
  addressControl.SetText(f.address.expected);
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
  addressControl.SetText("");
  addressControl.SetText(f.address.expected);

  //locate and save
  widgetUtils.clickLocate();
  widgetUtils.clickSave();
  numUnlocated -= 1;
  Delay(100);

  //TODO what happens here would be dependant upon if no more unlocated records or not
  if (numUnlocated === 0) {
    //init the review page and verify that the saved record was moved to locations found
    widgetUtils.initReviewPage('found');
    compareResults.isContentTextEqual(widgetUtils.locationsFoundLabel, 'Locations Found');
    compareResults.isContentTextEqual(widgetUtils.locationsFoundCount, numLocated);
  } else {

  }
  return numUnlocated;
}

function handleUnlocatedMultiField(f, numUnlocated, numLocated) {
  //init the feature page and start editing
  widgetUtils.initFeaturePage();
  widgetUtils.clickEdit();
  Delay(10);

  //expand the location information
  widgetUtils.clickExpandLocationButton();

  //get the feature table
  var table = widgetUtils.featureTable;

  //verify expected text for location
  compareResults.isTextEqual(table.cell6.textbox, f.address.actual);
  compareResults.isTextEqual(table.cell4.textbox, f.city.actual);
  compareResults.isTextEqual(table.cell7.textbox, f.state.actual);

  //set text and verify locate is enabled
  table.cell4.textbox.SetText(f.city.expected);
  compareResults.isClassNameEqual(widgetUtils.locateButton, "bg-ft-img feature-toolbar-btn float-right bg-locate");

  //clear text and verify locate is disabled
  table.cell4.textbox.SetText("");
  compareResults.isClassNameEqual(widgetUtils.locateButton, "bg-ft-img feature-toolbar-btn float-right bg-locate-disabled");

  //set text and locate
  table.cell4.textbox.SetText(f.city.expected);
  table.cell7.textbox.SetText(f.state.expected);
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
  table.cell4.textbox.SetText(f.city.expected);

  //locate and save
  widgetUtils.clickLocate();
  widgetUtils.clickSave();
  numUnlocated -= 1;
  Delay(100);

  //TODO what happens here would be dependant upon if no more unlocated records or not
  if (numUnlocated === 0) {
    //init the review page and verify that the saved record was moved to locations found
    widgetUtils.initReviewPage('found');
    compareResults.isContentTextEqual(widgetUtils.locationsFoundLabel, 'Locations Found');
    compareResults.isContentTextEqual(widgetUtils.locationsFoundCount, numLocated);
  } else {

  }
  return numUnlocated;
}

function handleUnlocatedXY(f, numUnlocated, numLocated) {
  //init the feature page and start editing
  widgetUtils.initFeaturePage();
  widgetUtils.clickEdit();
  Delay(10);

  //expand the location information
  widgetUtils.clickExpandLocationButton();

  //get the feature table
  var table = widgetUtils.featureTable;

  //verify expected text for location
  compareResults.isTextEqual(table.cell6.textbox, f.address.actual);
  compareResults.isTextEqual(table.cell4.textbox, f.city.actual);
  compareResults.isTextEqual(table.cell7.textbox, f.state.actual);

  //set text and verify locate is enabled
  table.cell4.textbox.SetText(f.city.expected);
  compareResults.isClassNameEqual(widgetUtils.locateButton, "bg-ft-img feature-toolbar-btn float-right bg-locate");

  //clear text and verify locate is disabled
  table.cell4.textbox.SetText("");
  compareResults.isClassNameEqual(widgetUtils.locateButton, "bg-ft-img feature-toolbar-btn float-right bg-locate-disabled");

  //set text and locate
  table.cell4.textbox.SetText(f.city.expected);
  table.cell7.textbox.SetText(f.state.expected);
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
  table.cell4.textbox.SetText(f.city.expected);

  //locate and save
  widgetUtils.clickLocate();
  widgetUtils.clickSave();
  numUnlocated -= 1;
  Delay(100);

  //TODO what happens here would be dependant upon if no more unlocated records or not
  if (numUnlocated === 0) {
    //init the review page and verify that the saved record was moved to locations found
    widgetUtils.initReviewPage('found');
    compareResults.isContentTextEqual(widgetUtils.locationsFoundLabel, 'Locations Found');
    compareResults.isContentTextEqual(widgetUtils.locationsFoundCount, numLocated);
  } else {

  }
  return numUnlocated;
}

function dragDrop() {

}

//Clears results of previous submit operations
function _clearResults(url) {
  //TODO write function that will hit the destination layer URL and clear the features
  
  //TODO need to grab a token
  
  // Define the request body JSON string
  var requestBody = '{ "where": "1=1" }'; 
  
  // Create the aqHttpRequest object
  var aqHttpRequest = aqHttp.CreatePostRequest(url + '/deleteFeatures');
  aqHttpRequest.SetHeader("Content-Type", "application/json");
  var aqHttpResponse = aqHttpRequest.Send(requestBody)
  
  Log.Message(aqHttpResponse.StatusCode);
  Log.Message(aqHttpResponse.Text);
}