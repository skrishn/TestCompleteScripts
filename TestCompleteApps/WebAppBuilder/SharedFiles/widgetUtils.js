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

function initLogin(){
  var loginContainer = Sys.Browser("*").Page("*").Panel("container");
  if(loginContainer && loginContainer.Panel){
    loginForm = loginContainer.Panel("bg").Panel(0).Form("loginForm");
    user = loginForm.Table(0).Cell(0, 1).Textbox("j_username");
    password = loginForm.Table(0).Cell(1, 1).PasswordBox("j_password");
  }
}

function initSignIn(){
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
function init(widget, theme){
  _init();
  _initMap();
  _initZoom();
  _initHome();
  switch (widget)
  {
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

function _init(){
  _main_page = Sys.Browser("*").Page("*").Panel("main_page");
  _layoutManager = _main_page.Panel("jimu_layout_manager");
}

//TODO this will only stay as a seperate function if it needs to be theme dependant
function _initMap(){
  map = _layoutManager.Panel("map");
  mapDIV = map.Panel("map_root").Panel("map_container").Panel("map_layers").Panel("map_gc");
}

//TODO this will only stay as a seperate function if it needs to be theme dependant
function _initZoom(){
  _zoom = map.Panel("widgets_ZoomSlider_Widget_*");
  zoomIn = _zoom.Panel(1);
  zoomOut = _zoom.Panel(0);
}

//TODO this will only stay as a seperate function if it needs to be theme dependant
function _initHome(){
  home = map.Panel("widgets_HomeButton_Widget_*").Panel("esri_dijit_HomeButton_0").Panel(0).Panel(0);
}

function _initInfoSummary(theme){
  layersContainer = map.Panel("widgets_InfoSummary_Widget_*_panel").Panel(1).Panel("uniqName_*_*").Panel("widgets_InfoSummary_Widget_*").Panel(0).Panel(0).Panel(0).Panel(1).Panel(0);
  
  switch (theme){
    case 'FoldableTheme':
      testWidget = _layoutManager.Panel("themes_FoldableTheme_widgets_HeaderController_Widget_*").Panel(1).Panel(0);
      break;
  }
}

function _initSituationAwareness(theme){
  switch (theme){
    case 'FoldableTheme':
      break;
  }
}

function _initScreening(theme){
  switch (theme){
    case 'FoldableTheme':
      break;
  }
}

function _initDataAggregation(theme){
  switch (theme){
    case 'FoldableTheme':
      break;
  }
}

function initPopup(){
  var _basePopupPath = map.Panel("map_root").Panel(1).Panel(0);
  popup = _basePopupPath.Panel(1).Panel(0).Panel("esri_dijit_PopupRenderer_*");
  popupClose = _basePopupPath.Panel(0).Panel(0).Panel(5);
  popupHeader = _basePopupPath.Panel(0).Panel(0).Panel(1);
  popupNext = _basePopupPath.Panel(0).Panel(0).Panel(3);
}