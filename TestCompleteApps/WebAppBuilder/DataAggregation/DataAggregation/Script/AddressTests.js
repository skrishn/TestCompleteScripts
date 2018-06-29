//USEUNIT widgetUtils
//USEUNIT config

var _themeName;

function test(themeName) {
  _themeName = themeName;

  //click the widget to open it
  widgetUtils.clickWidget();

  //config option that is specific to DA tests
  var csvFiles = config.csvFiles;

  //Test single field address
  testCSV(csvFiles.singleFieldAddress, true);

  //Test multiField address
  testCSV(csvFiles.multiFieldAddress, false);

  //Test duplicates
  testCSV(csvFiles.duplicate, true);

  //Test XY
  testCSV(csvFiles.xy, true);
}

function testCSV(csvInfo, clear) {
  //try {
    widgetUtils.browseFile(csvInfo.path);
    basicTest2(csvInfo);
    if (clear) {
      clearResults(url);
    }
  //} catch (error) {

  //}
}

function basicTest2(csvInfo){
  widgetUtils.initPanel();
  var panel = widgetUtils.daPanel;
  table = panel.table;
  panel2 = table.cell.panel;
  widgetUtils.clickNext();
  widgetUtils.clickNext();
  
  Delay(1000);
  panel.panelCriticalfacilitiesAddresses.table.cell.panel.Click(7, 4);
  widgetUtils.clickNext();
  widgetUtils.clickNext();
  Delay(1000);
  widgetUtils.clickNext();
  Delay(1000);
  widgetUtils.initStartPage();
  widgetUtils.startPage.panel.panel.Click(75, 13);
  Delay(1000);
  table.cell2.panel.Click(2, 10);
  table2 = table.table;
  Delay(1000);
  table2.cell.panel.Click(4, 11);
  Delay(1000);
  table2.cell2.panel.Click(8, 7);
  Delay(1000);
  table.cell3.Click(216, 20);
  Delay(2000);
  textbox = table.cell4.textbox;
  Delay(1000);
  textbox.Click(56, 13);
  Delay(1000);
  textbox.SetText("Denver");
  Delay(2000);
  textbox = table.cell7.textbox;
  Delay(2000);
  textbox.SetText("CO");
  Delay(2000);
  //textbox.SetText("");
  //page.Keys("[Tab]");
  panel2 = panel.panelPagecontainer0;
  panel2.Click(321, 223);
  table.cell5.panel.Click(8, 7);
  Delay(1000);
  panel = panel2.panelCriticalfacilitiesReview0.panel;
  Delay(1000);
  panel.Click(48, 18);
  Delay(1000);
  panel2.Click(308, 177);
  Delay(1000);
  panel.Click(57, 16);
  Delay(1000);
  table.cell6.panel.panel.Click(10, 8);
  Delay(1000);
  widgetUtils.clickHome();
  Delay(1000);
}

function dragDrop() {

}

//Clears results of previous submit operations
function clearResults(url) {
  //TODO write function that will hit the destination layer URL and clear the features

}