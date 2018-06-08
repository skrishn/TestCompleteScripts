//USEUNIT compareResults

//Provide access to common widgets to make code more readable and easy to reference the individual widgets
// IF these need to be delayed will need to move set to a function like "init"

//Private members
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
  Delay(1000)
  var ago_form = Sys.Browser("*").Page("*").Panel("page_border").Panel(1).Panel("signInForm").Panel("login_form").Form("sign_in_form").Panel("rightAgo").Frame("oAuthFrame").Panel(0).Panel(0).Panel(0).Panel("main").Panel(0).Form("oauth").Fieldset("fieldSet").Panel("ago_form");
  var un = ago_form.Textbox("user_username");
  un.SetText("suba_qa_sem")
  pwd = ago_form.PasswordBox("user_password");
  pwd.SetText("esrigis123")
  ago_form.Panel(0).Panel(0).Button("signIn").Click();
  Delay(2000)
  _init();
  _layoutManager.Panel("jimu_dijit_Message_0").Panel(1).Panel(0).Click();
}

//TODO expand this to init based on theme and widget being tested
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
  _main_page = Sys.Browser("*").Page("*").Panel("main_page");
  _layoutManager = _main_page.Panel("jimu_layout_manager");
}

//TODO this will only stay as a seperate function if it needs to be theme dependant
function _initMap() {
  map = _layoutManager.Panel("map");
  mapDIV = map.Panel("map_root").Panel("map_container").Panel("map_layers").Panel("map_gc");
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
      panel = _layoutManager.Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(0).Panel(1).Panel(0)
      testWidget = _layoutManager.Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1).Panel(1);
      _widgetPanel = testWidget.Panel(0).Panel(0).Panel(2).Panel(1).Panel(0).Panel(1);
      unit = _widgetPanel.Panel(0);
      numberSpinner = _widgetPanel.Panel("widget_dijit_form_NumberSpinner_*");
      search = map.Panel("widgets_Search_Widget_*").Panel(0).Panel("esri_dijit_Search_*").Panel(0).Panel(0).Panel(0).Panel(0).Form(0).Textbox("esri_dijit_Search_*_input");
      save = testWidget.Panel(0).Panel(1).Panel(0).Image("save_png");
      pageTable = Sys.Browser("*").Page("*").Panel(1).Form(0).Table(0);
      where = pageTable.Cell(0, 1).Textbox("where");
      deleteButton = pageTable.Cell(8, 0).SubmitButton("Delete Features");
      _btnContainer = testWidget.Panel(0).Panel(0).Panel(2).Panel(0).Panel(0);
      btn0 = _btnContainer.Image("btn0_png");
      btn1 = _btnContainer.Image("btn1_png");
      btn2 = _btnContainer.Image("btn2_png");
      downloadAll = testWidget.Panel(0).Panel(1).Panel(1).Image("download_all_png");
      //Does this work...could be a nice way to keep widget specific functions
      // that need to determine something based on current state with other options that are avalible
      // when the widget opens...
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
      break;
  }
}

function _initScreening(theme) {
  switch (theme) {
    case 'FoldableTheme':
      break;
  }
}

function _initDataAggregation(theme) {
  switch (theme) {
    case 'FoldableTheme':
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

//////////////////////////////////////////////////////////////////////////////////
//SA specific
function openWidget() {
  try {
    //foldable theme
    Delay(300);
    var widgetPanel = _layoutManager.Panel("themes_FoldableTheme_widgets_HeaderController_Widget_*").Panel(1).Panel(0)

    if (widgetPanel.VisibleOnScreen || widgetPanel.Visible) {
      widgetPanel.Click();
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

function getTabsContainer() {
  tabsContainer = widgetUtils._layoutManager.Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(1);
}

function bufferUnit(myUnit) {
  try {
    getUnit = unit.contentText;
    buMsg = "Buffer units - " + myUnit;
    compareResults.resultTxt(getUnit, myUnit, buMsg); //TODO comparisons should not happen in widgetUtils
  } catch (e) {
    compareResults.printResult("Buffer unit " + e);
  }
}

function doBuffer(bufferCount) {
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

function drawPoint(coords) {
  //Will only draw the first coords
  btn0.Click();
  mapDIV.Click(coords[0], coords[1]);
}

function drawLine(coords) {
  btn1.Click();
  _drawCoords(coords);
}

function drawPoly(coords) {
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

function _drawCoords(coords) {
  Delay(75);
  for (var i = 0; i < coords.length; i++) {
    var func = i + 1 == coords.length ? mapDIV.DblClick : mapDIV.Click;
    func(coords[i][0], coords[i][1]);
    Delay(50);
  }
}

function draw(type, coords) {
  try {
    var func = type == "point" ? drawPoint : type == "line" ? drawLine : drawPoly;
    func(coords);
  } catch (e) {
    compareResults.printResult("Draw " + type + " " + e);
  }
}

function clickIncidentTab() {
  var inciTab = _layoutManager.Panel("widgets_SituationAwareness_Widget_*").Panel(0).Panel(0).Panel(1).Panel(0).Panel(0);
  inciTab.Click();
}

/////////////////////
//Feature Action
////////////////////
function clickFAMenu() {
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

function loopPopupMenu(clickItem) {
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

function addLocation() {
  try {
    //TODO see what we can do about that hardcoded name
    Sys.Browser("*").Page("*").Panel(0).Panel(0).Panel(1).Panel("uniqName_0_83").Panel(1).Click();
    compareResults.printResultResult("Pass", "Add location");
  } catch (e) {
    compareResults.printResult("Add location " + e);
  }
}

function setLocation() {
  try {
    //TODO see what we can do about that hardcoded name
    Sys.Browser("*").Page("*").Panel(0).Panel(0).Panel(1).Panel("uniqName_0_84").Panel(1).Click();
    compareResults.printResultResult("Pass", "Add location");
  } catch (e) {
    compareResults.printResult("Set location " + e);
  }
}

//////////////////////////////////////////////////////////////////////////////////