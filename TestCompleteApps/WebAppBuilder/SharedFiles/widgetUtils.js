//USEUNIT compareResults

//Provide access to common widgets to make code more readable and easy to reference the individual widgets
// IF these need to be delayed will need to move set to a function like "init"

//Private members
var _page;
var _main_page;
var _layoutManager;
var _zoom;

//Public member

//Current widget for testing (these are test widget specific)
var testWidget;
var layersContainer;

//Current map
var map;

//Current map div
var mapDIV;

//Common ZoomIn
var zoomIn;

//Common ZoomOut
var zoomOut;

//Common Home
var home;

//Common Popup
var popup;

//Common Close
var popupClose;

//Common Popup header
var popupHeader;

//Common Popup next arrow
var popupNext;

//Common Login Form
var loginForm;

//Common Login Form User
var user;

//Common Login Form Password
var password;

//Situation Awareness controls
var unit;
var numberSpinner;
var _widgetPanel;
var _btnContainer;
var pageTable;
var search;
var save;
var where;
var deleteButton;
var btn0;
var btn1;
var btn2;
var panel;
var tabsContainer;
var downloadAll;

//InfoSummary controls

//Data Aggregation controls
var page;
var daPanel;
var _pageContainer;
var nextButton;
var backButton;
var homeButton;
var downloadButton;
var featurePageLabel;
var expandFeatureInfoButton;
var expandFeatureInfoRow;
var expandLocationInfoButton;
var expandLocationInfoRow;
var saveButton;
var cancelButton;
var editButton;
var locateButton;
var syncButton;
var featureInformation;
var locationInformation;
var viewStack;
var _cancelDialog;
var cancelDialogYes;
var cancelDialogNo;
var cancelDialogTitle;
var cancelDialogMessage;
var cancelDialogExit;
var clickCancel;
var reviewPage;
var locationsFoundLabel;
var locationsFoundCount;
var locationsNotFoundLabel;
var locationsNotFoundCount;
var locationsDuplicateLabel;
var locationsDuplicateCount;
var _clearSettingsDialog;
var clearSettingsDialogYes;
var clearSettingsDialogNo;
var _addressPage;
var singleFieldRadio;
var singleFieldSelect;
var multiFieldRadio;
//TODO update all button instances to private naming converntions
// and add a var for all public functions

//Screening controls
var list;
var drawButton;
var placeNameButton;
var backButton;
var refreshButton;
var downloadButton;
var reportButton;
var configButton;
var zoomButton;
var areaValue;
var drawPointButton;
var drawLineButton;
var drawPolyButton;
var drawFreehandPolyButton;
var selectButton;
var bufferDistance;
var bufferUnit;
var startOverButton;
var expandSelectLayer;

//This function handles login for the main shield page when logging into DEV or QA
function initLogin() {
  var loginContainer = Sys.Browser("*").Page("*").Panel("container");
  if (loginContainer && loginContainer.Panel) {
    loginForm = loginContainer.Panel("bg").Panel(0).Form("loginForm");
    user = loginForm.Table(0).Cell(0, 1).Textbox("j_username");
    password = loginForm.Table(0).Cell(1, 1).PasswordBox("j_password");
  }
}

function initSignIn() {
  Delay(1000);
  var ago_form = Sys.Browser("*").Page("*").Panel("page_border").Panel(1).Panel("signInForm").Panel("login_form").Form("sign_in_form").Panel("rightAgo").Frame("oAuthFrame").Panel(0).Panel(0).Panel(0).Panel("main").Panel(0).Form("oauth").Fieldset("fieldSet").Panel("ago_form");
  var un = ago_form.Textbox("user_username");
  un.SetText("suba_qa_sem")
  pwd = ago_form.PasswordBox("user_password");
  pwd.SetText("esrigis123")
  ago_form.Panel(0).Panel(0).Button("signIn").Click();
  Delay(2000);
  _init();
  _layoutManager.Panel("jimu_dijit_Message_0").Panel(1).Panel(0).Click();
}

function init(widget, theme) {
  _init();
  _initMap();
  _initZoom();
  _initHome();
  switch (widget) {
    case 'InfoSummary':
      _initInfoSummary(theme);
      break;
    case 'SituationAwareness':
      _initSituationAwareness(theme);
      break;
    case 'Screening':
      _initScreening(theme);
      break;
    case 'DataAggregation':
      _initDataAggregation(theme);
      break
  }
}

//Get the private main page and layout manager pointers
function _init() {
  _page = Sys.Browser("*").Page("*");
  _main_page = _page.Panel("main_page");
  _layoutManager = _main_page.Panel("jimu_layout_manager");
}

//TODO this will only stay as a seperate function if it needs to be theme dependant
function _initMap() {
  map = _layoutManager.Panel("map");
  try {
    mapDIV = map.Panel("map_root").Panel("map_container").Panel("map_layers").SVG("map_gc");
  }
  catch (e) {
    try {
      mapDIV = map.Panel("map_root").Panel("map_container").Panel("map_layers").Panel("map_gc");
    }
    catch (e) {
      throw "Can't find map div";
    }
  }
}

//TODO this will only stay as a seperate function if it needs to be theme dependant
function _initZoom() {
  _zoom = map.Panel("widgets_ZoomSlider_Widget_*");
  zoomIn = _zoom.Panel(1);
  zoomOut = _zoom.Panel(0);
}

//TODO this will only stay as a seperate function if it needs to be theme dependant
function _initHome() {
  home = map.Panel("widgets_HomeButton_Widget_*").Panel("esri_dijit_HomeButton_0").Panel(0).Panel(0);
}

//Get common access points for the IS widget based on the theme
function _initInfoSummary(theme) {
  layersContainer = map.Panel("widgets_InfoSummary_Widget_*_panel").Panel(1).Panel("uniqName_*_*").Panel("widgets_InfoSummary_Widget_*").Panel(0).Panel(0).Panel(0).Panel(1).Panel(0);

  switch (theme) {
    case 'FoldableTheme':
      testWidget = _layoutManager.Panel("themes_FoldableTheme_widgets_HeaderController_Widget_*").Panel(1).Panel(0);
      break;
  }
}

//Get common access points for the SA widget based on the theme
function _initSituationAwareness(theme) {
  switch (theme) {
    case 'FoldableTheme':
      search = map.Panel("widgets_Search_Widget_*").Panel(0).Panel("esri_dijit_Search_*").Panel(0).Panel(0).Panel(0).Panel(0).Form(0).Textbox("esri_dijit_Search_*_input");
    
      initAfterOpenSituationAwareness = function() {
        //These do not exist on app startup...only after the eidget has been opened
        panel = _layoutManager.Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(0).Panel(1).Panel(0);
        testWidget = _layoutManager.Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1);
        _widgetPanel = testWidget.Panel(0).Panel(0).Panel(2).Panel(1).Panel(0).Panel(1);
        unit = _widgetPanel.Panel(0);
        numberSpinner = _widgetPanel.Panel("widget_dijit_form_NumberSpinner_*");
        _btnContainer = testWidget.Panel(0).Panel(0).Panel(2).Panel(0).Panel(0);
        btn0 = _btnContainer.Image("btn0_png");
        btn1 = _btnContainer.Image("btn1_png");
        btn2 = _btnContainer.Image("btn2_png");
      }
      
      initAfterIncident = function(){
        //These do not exist until incident has been defined
        save = testWidget.Panel(0).Panel(1).Panel(0).Image("save_png");
        pageTable = Sys.Browser("*").Page("*").Panel(1).Form(0).Table(0);
        where = pageTable.Cell(0, 1).Textbox("where");
        deleteButton = pageTable.Cell(8, 0).SubmitButton("Delete Features");
        downloadAll = testWidget.Panel(0).Panel(1).Panel(1).Image("download_all_png");
      }
      
      getResultTab = function () {
        return _layoutManager.Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1);
      }
      
      getIENotificationBar = function () {
        var notificationBar = Sys.Browser("iexplore").BrowserWindow(0).Window("Frame Notification Bar", "", 1).UIAObject("Notification");
        return {
          bar: notificationBar,
          Notification_Save: notificationBar.UIAObject("Save"),
          Notification_Close: notificationBar.UIAObject("Close")
        };
      }
      
      getNotificationBar = function () {
        return Aliases.browser.BrowserWindow.FrameNotificationBar;
      }

      getTabsContainer = function () {
        tabsContainer = widgetUtils._layoutManager.Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1);
      }
      
      bufferUnit = function (myUnit) {
        try {
          getUnit = unit.contentText;
          buMsg = "Buffer units - " + myUnit;
          compareResults.resultTxt(getUnit, myUnit, buMsg); //TODO comparisons should not happen in widgetUtils
        } catch (e) {
          compareResults.printResult("Buffer unit " + e);
        }
      }
      
      doBuffer = function (bufferCount) {
        try {
          upArrow = numberSpinner.Panel(0).Panel(0).Panel(0);
          for (i = 0; i < bufferCount; i++) {
            upArrow.Click();
          }
          //Click somewhere to apply the buffer
          testWidget.Panel(0).Panel(0).Click(119, 5);
        } catch (e) {
          compareResults.printResult("Buffer " + e);
        }
      }
      
      //TODO draw functions should be genericised to apply to screening and SA and any other widget that draws..
      drawPoint = function (coords) {
        //Will only draw the first coords
        btn0.Click();
        mapDIV.Click(coords[0], coords[1]);
      }
      
      drawLine = function (coords) {
        btn1.Click();
        _drawCoords(coords);
      }
      
      drawPoly = function (coords) {
        btn2.Click();
      
        //ensure the poly is closed
        var startX = coords[0][0];
        var startY = coords[0][1];
        var endX = coords[coords.length - 1][0];
        var endY = coords[coords.length - 1][1];
        if (startX != endX || startY != endY) {
          coords.push([startX, startY]);
        }
        _drawCoords(coords);
      }
      
      _drawCoords = function (coords) {
        Delay(75);
        for (var i = 0; i < coords.length; i++) {
          var func = i + 1 == coords.length ? mapDIV.DblClick : mapDIV.Click;
          func(coords[i][0], coords[i][1]);
          Delay(50);
        }
      }
      
      draw = function (type, coords) {
        try {
          var func = type == "point" ? drawPoint : type == "line" ? drawLine : drawPoly;
          func(coords);
        } catch (e) {
          compareResults.printResult("Draw " + type + " " + e);
        }
      }
      
      clickIncidentTab = function () {
        var inciTab = _layoutManager.Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(0).Panel(1).Panel(0).Panel(0);
        inciTab.Click();
      }

      clickFAMenu = function () {
        try {
          var panel = map.Panel("map_root").Panel(1).Panel(0).Panel(2).Panel(0).Panel(0);
          var ellipsis = panel.FindChildByXPath("//span [@class='popup-menu-button']");
          var x = panel.Width - ellipsis.offsetWidth / 2;
          var y = ellipsis.offsetHeight / 2;
          panel.Click(x, y);
        } catch (e) {
          compareResults.printResult("Click ellipsis " + e);
        }
      }
      
      loopPopupMenu = function (clickItem) {
        try {
          Delay(300);
          popupMenu = Sys.Browser("*").Page("*").Panel(0).Panel(0).Panel(1);
          myItem = popupMenu.FindChild("contentText", clickItem, 7);
          myItem.Click();
          /*popupMenuCC = popupMenu.ChildCount;
          for(i = 0; i<popupMenuCC ; i++){
                  popupMenu.fin;
                  myItem = popupMenu.Child(i);
                  Delay(300);
                  myItemCT = myItem.
                  Delay(250);
                  if(myItemCT == clickItem) {
                          myItem0 = myItem.Panel(1);
                          myItem0.Click();
                          compareResults.printResultResult("Pass", clickItem);
                          break;
                  } 																
          } */
        } catch (e) {
          compareResults.printResult("Add location " + e);
        }
      }
      
      addLocation = function () {
        try {
          //TODO see what we can do about that hardcoded name
          Sys.Browser("*").Page("*").Panel(0).Panel(0).Panel(1).Panel("uniqName_0_83").Panel(1).Click();
          compareResults.printResultResult("Pass", "Add location");
        } catch (e) {
          compareResults.printResult("Add location " + e);
        }
      }
      
      setLocation = function () {
        try {
          //TODO see what we can do about that hardcoded name
          Sys.Browser("*").Page("*").Panel(0).Panel(0).Panel(1).Panel("uniqName_0_84").Panel(1).Click();
          compareResults.printResultResult("Pass", "Add location");
        } catch (e) {
          compareResults.printResult("Set location " + e);
        }
      }
      break;
  }
}

function _initScreening(theme) {
  switch (theme) {
    case 'FoldableTheme':
      testWidget = _layoutManager.Panel("themes_FoldableTheme_widgets_HeaderController_Widget_*").Panel(1).Panel(0);

      initReportPage = function(){
        list = map.Panel("widgets_Screening_Widget_20_panel").Panel(1).Panel("uniqName_13_0").Panel("widgets_Screening_Widget_20").Panel(0).Panel(0).Panel(2).Panel(1).Panel(2);
        
        //backButton
        //refreshButton
        //downloadButton
        //reportButton
        //configButton
        //zoomButton
        //areaValue
      }
      
      initStartPage = function(){
        var _widgetPanel = map.Panel("widgets_Screening_Widget_20_panel").Panel(1).Panel("uniqName_13_0").Panel("widgets_Screening_Widget_20").Panel(0).Panel(0);
      
        var _startContainer = _widgetPanel.Panel(1).Panel(0);
        drawButton = _startContainer.Panel(1);
        placeNameButton = _startContainer.Panel(0);
        
        var _drawBox = _widgetPanel.Panel(1).Panel(1).Panel(1).Panel("uniqName_0_2").Panel("jimu_dijit_DrawBox_0").Panel(0);
        drawPointButton = _drawBox.Panel(0);    
        drawLineButton = _drawBox.Panel(2); 
        drawPolyButton = _drawBox.Panel(5);
        drawFreehandPolyButton = _drawBox.Panel(8);     
        selectButton = _drawBox.Panel(12).Panel("jimu_dijit_FeatureSetChooserForMultipleLayers_0").Panel(0).Panel(0).Panel(0).Panel(0).Panel(0);
        
        var _bufferContainer = _widgetPanel.Panel(1).Panel(4);
        bufferDistance = _bufferContainer.Panel(0).Panel("widget_dijit_form_NumberTextBox_0").Panel(1).Textbox(0);  
        bufferUnit = _bufferContainer.Panel(1).Table(0).Cell(0, 1).Textbox(0);
        
        var _keyContainer = _widgetPanel.Panel(1).Panel(6);
        reportButton = _keyContainer.Panel(1).Panel(0);      
        startOverButton = _keyContainer.Panel(0).Panel(0);
        
        expandSelectLayer = _widgetPanel.Panel(1).Panel(1).Panel(1).Panel("uniqName_0_2").Panel(2).Panel(0).Panel(0);
        
        zoomButton = _widgetPanel.Panel(0).Panel(2);
      }
      break;
  }
}

function _initDataAggregation(theme) {
  switch (theme) {
    case 'FoldableTheme':
      testWidget = _layoutManager.Panel("themes_FoldableTheme_widgets_HeaderController_Widget_*").Panel(1).Panel(0);
        
      browseFile = function(path) {
        var browser = Aliases.browser;
        page = browser.pageStatemAutotestMapsqaArcgisCo;
        page.form.label.Click(104, 16);
        var dlgOpen = browser.dlgOpen;
        dlgOpen.OpenFile(path);
      }

      clickDownload = function () {
        daPanel.table.cell6.panel.panel.Click(10, 8);
      }

      initPanel = function () {
        daPanel = page.panelWidgetsDataaggregationWidge;

        _pageContainer = map.Panel("widgets_DataAggregation_Widget_20_panel").Panel(1).Panel("uniqName_13_0").Panel("widgets_DataAggregation_Widget_20").Panel("PageContainer_0");
        viewStack = _pageContainer.Panel("jimu_dijit_ViewStack_0");
        
        backButton = _pageContainer.Panel(0).Table(0).Cell(0, 0);
        clickBack = function () {
          backButton.Click(10, 10);
        }

        nextButton = _pageContainer.Panel(0).Table(0).Cell(0, 2);
        clickNext = function () {
          nextButton.Click(10, 10);
        }
        
        homeButton = _pageContainer.Panel(0).Table(0).Cell(0, 1).Panel(0);
        clickHome = function () {
          homeButton.Click(10, 10);
          //init the response dialog
          Delay(1000);
          _initClearSettingsDialog();
        }
        
        _initClearSettingsDialog = function () {
          _clearSettingsDialog = _layoutManager.Panel("jimu_dijit_Popup_*");
        
          clearSettingsDialogYes = _clearSettingsDialog.Panel(2).Panel(2);
          clickClearSettingsDialogYes = function () {
            clearSettingsDialogYes.Click(5, 5);
          }
      
          clearSettingsDialogNo = _clearSettingsDialog.Panel(2).Panel(0);
          clickClearSettingsDialogNo = function () {
            clearSettingsDialogNo.Click(5, 5);
          }
        }
      }

      initStartPage = function () {
        startPage = viewStack.Panel("CriticalFacilities_StartPage_*");
        addToMapButton = startPage.Panel(0).Panel(0);
        clickAddToMap = function () {
          addToMapButton.Click(10, 10);
        }
      }

      initLocationTypePage = function () {

      }
      
      initAddressPage = function () {
        _addressPage = viewStack.Panel("CriticalFacilities_Addresses_*");
        
        singleFieldRadio = _addressPage.Table(0).Cell(2, 0).Table(0).Cell(0, 0).Panel(0).RadioButton("addr");
        clickSingleFieldRadio = function () {
          singleFieldRadio.Click(3, 3);
        }
        
        singleFieldSelect = _addressPage.Table(0).Cell(2, 0).Table(0).Cell(2, 0).Table(0).Cell(0, 1).Table(0).Cell(0, 0);
        clickSingleFieldSelect = function () {
          singleFieldSelect.Click(3, 3);
        }
        
        multiFieldRadio = _addressPage.Table(0).Cell(3, 0).Table(0).Cell(0, 0).Panel(0).RadioButton("addr");
        clickMultiFieldRadio = function () {
          multiFieldRadio.Click(3, 3);
        }
      }

      initReviewPage = function (type) {
        reviewPage = viewStack.Panel("CriticalFacilities_Review_*");
        //TODO if the paths are the same regardless of what it starts with this switch would not be necessary
        switch (type)
        {
          case 'found':
            locationsFoundLabel = reviewPage.Table(0).Cell(6, 0).Panel(0);
            locationsFoundCount = reviewPage.Table(0).Cell(6, 1).Panel(0);
            break;
        
          case 'notFound':
            locationsNotFoundLabel = reviewPage;
            locationsNotFoundCount = reviewPage;
            break;
          
          case 'duplicate':
            locationsDuplicateLabel = reviewPage;
            locationsDuplicateCount = reviewPage;      
            break;
        
          case 'found-notFound':
            locationsFoundLabel = reviewPage.Table(0).Cell(6, 0).Panel(0);
            locationsFoundCount = reviewPage.Table(0).Cell(6, 1).Panel(0);
            locationsNotFoundLabel = reviewPage.Table(0).Cell(2, 0).Panel(0);
            locationsNotFoundCount = reviewPage.Table(0).Cell(2, 1).Panel(0);
            break;
            
          case 'found-duplicate':
            locationsFoundLabel = reviewPage;
            locationsFoundCount = reviewPage;
            locationsDuplicateLabel = reviewPage;
            locationsDuplicateCount = reviewPage;
            break;
        
          case 'notFound-duplicate':
            locationsNotFoundLabel = reviewPage;
            locationsNotFoundCount = reviewPage;
            locationsDuplicateLabel = reviewPage;
            locationsDuplicateCount = reviewPage;
            break;
          
          case 'found-notFound-duplicate':
            locationsFoundLabel = reviewPage;
            locationsFoundCount = reviewPage;
            locationsNotFoundLabel = reviewPage;
            locationsNotFoundCount = reviewPage;
            locationsDuplicateLabel = reviewPage;
            locationsDuplicateCount = reviewPage;      
            break;
        
        }
      }

      initFeatureListPage = function () {

      }

      initFeaturePage = function () {
        featureTable = daPanel.table;
      
        featurePageLabel = viewStack.Panel("CriticalFacilities_Feature_0").Table(0).Cell(0, 0).Panel(0);
        
        locateButton = viewStack.Panel("CriticalFacilities_Feature_*").Panel(1).Table(0).Cell(0, 2).Panel(0);
        clickLocate = function () {         
          locateButton.Click(8, 10);
        }
        
        cancelButton = viewStack.Panel("CriticalFacilities_Feature_*").Table(1).Cell(0, 1).Panel(0).Panel("FeatureToolbar_0").Table(0).Cell(0, 1).Panel(0);
        clickCancel = function () {
          cancelButton.Click(8, 10);
          Delay(100);
          _initCancelEditDialog();
        }
        
        saveButton = viewStack.Panel("CriticalFacilities_Feature_*").Table(1).Cell(0, 1).Panel(0).Panel("FeatureToolbar_0").Table(0).Cell(0, 2).Panel(0);
        clickSave = function () {
           saveButton.Click(8, 10);
        }
        
        editButton = viewStack.Panel("CriticalFacilities_Feature_*").Table(1).Cell(0, 1).Panel(0).Panel("FeatureToolbar_0").Table(0).Cell(0, 0).Panel(0);
        clickEdit = function () {
          editButton.Click(8, 10);
        }
        
        syncButton = viewStack.Panel("CriticalFacilities_Feature_*").Panel(1).Table(0).Cell(0, 1).Panel(0);
        clickSync = function () {
          syncButton.Click(8, 10);
        }

        expandLocationInfoButton = viewStack.Panel("CriticalFacilities_Feature_*").Table(3).Cell(0, 1)
        clickExpandLocationButton = function(expanded) {
          expandLocationInfoButton.Click(7, 5);
        }
        
        expandLocationInfoRow = viewStack.Panel("CriticalFacilities_Feature_*").Table(3).Cell(0, 0);
        clickExpandLocationRow = function(expanded) {
          expandLocationInfoRow.Click(10, 10);
        }
        
        expandFeatureInfoButton = viewStack.Panel("CriticalFacilities_Feature_*").Table(2).Cell(0, 1).Panel(0);
        clickExpandFeatureButton = function(expanded) {
          expandFeatureInfoButton.Click(10, 10);
        }
        
        expandFeatureInfoRow = viewStack.Panel("CriticalFacilities_Feature_*").Table(2).Cell(0, 0);
        clickExpandFeatureRow = function(expanded) {
          expandFeatureInfoRow.Click(10, 10);
        }
             
        _initCancelEditDialog = function () {
          _cancelDialog = _layoutManager.Panel("jimu_dijit_Popup_0");
          cancelDialogYes = _cancelDialog.Panel(2).Panel(2);
          cancelDialogNo = _cancelDialog.Panel(2).Panel(0);
          cancelDialogTitle = _cancelDialog.Panel(0).TextNode(0);
          cancelDialogMessage = _cancelDialog.Panel(1).Panel(0);
          cancelDialogExit = _cancelDialog.Panel(0).Panel(0);
        }
        
        clickCancelDialogYes = function () {
          cancelDialogYes.Click(5, 5);
        }
        
        clickCancelDialogNo = function () {
          cancelDialogNo.Click(5, 5);
        }
        
        clickCancelDialogExit = function () {
          cancelDialogExit.Click(5, 5);
        }      
      }
      break;
  }
}

function initPopup() {
  var _basePopupPath = map.Panel("map_root").Panel(1).Panel(0);
  popup = _basePopupPath.Panel(1).Panel(0).Panel("esri_dijit_PopupRenderer_*");
  popupClose = _basePopupPath.Panel(0).Panel(0).Panel(5);
  popupHeader = _basePopupPath.Panel(0).Panel(0).Panel(1);
  popupNext = _basePopupPath.Panel(0).Panel(0).Panel(3);
}

function clickWidget() {
  testWidget.Click();
  Delay(1000);
}

//////////////////////////////////////////////////////////////////////////////////
//SA specific

//Can this be used by all widgets if they are placed at the same location??
function openWidget() {
  try {
    //foldable theme
    Delay(300);
    var widgetPanel = _layoutManager.Panel("themes_FoldableTheme_widgets_HeaderController_Widget_*").Panel(1).Panel(0);

    if (widgetPanel.VisibleOnScreen || widgetPanel.Visible) {
      widgetPanel.Click();
      initAfterOpenSituationAwareness();
      return checkOpenPanel();
    } else {
      compareResults.printResultResult("Fail", "Open widget")
    }
  } catch (e) {
    compareResults.printResult("Open widget " + e);
  }
}

function closeWidget() {
  try {

  } catch (e) {
    compareResults.printResult("Close widget " + e);
  }
}

function checkOpenPanel() {
  try {
    var v = testWidget.VisibleOnScreen;
    compareResults.printResultResult(!v ? "Fail" : "Pass", "Open Widget");
    return v;
  } catch (e) {
    compareResults.printResult("Open widget panel " + e);
  }
}
//////////////////////////////////////////////////////////////////////////////////
