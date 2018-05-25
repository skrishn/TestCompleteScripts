//USEUNIT compareResults
function clickFAMenu() {

  try {

    var panel = Sys.Browser("*").Page("*").Panel("main_page").Panel("jimu_layout_manager").Panel("map").Panel("map_root").Panel(1).Panel(0).Panel(2).Panel(0).Panel(0)
    var ellipsis = panel.FindChildByXPath("//span [@class='popup-menu-button']");
    var x = panel.Width - ellipsis.offsetWidth / 2;
    var y = ellipsis.offsetHeight / 2;
    panel.Click(x, y);

  } catch (e) {

    y = aqString.Concat("Click ellipsis ", e)
    compareResults.printResult(y)

  }

}

function loopPopupMenu(clickItem) {

  try {
    Delay(300)
    popupMenu = Sys.Browser("*").Page("*").Panel(0).Panel(0).Panel(1)
    myItem = popupMenu.FindChild("contentText", clickItem, 7)
    myItem.Click()
    /*popupMenuCC = popupMenu.ChildCount
    for(i = 0; i<popupMenuCC ; i++){
            popupMenu.fin
            myItem = popupMenu.Child(i)
            Delay(300)
            myItemCT = myItem.
            Delay(250)
            if(myItemCT == clickItem) {
                    myItem0 = myItem.Panel(1)
                    myItem0.Click()
                    compareResults.printResultResult("Pass", clickItem)
                    break;
            } 																
    } */

  } catch (e) {

    y = aqString.Concat("Add location ", e)
    compareResults.printResult(y)
  }
}

function addLocation() {

  try {
    Sys.Browser("*").Page("*").Panel(0).Panel(0).Panel(1).Panel("uniqName_0_83").Panel(1).Click()
    compareResults.printResultResult("Pass", "Add location")
  } catch (e) {

    y = aqString.Concat("Add location ", e)
    compareResults.printResult(y)

  }

}

function setLocation() {

  try {
    Sys.Browser("*").Page("*").Panel(0).Panel(0).Panel(1).Panel("uniqName_0_84").Panel(1).Click()
    compareResults.printResultResult("Pass", "Add location")
  } catch (e) {

    y = aqString.Concat("Set location ", e)
    compareResults.printResult(y)

  }
}