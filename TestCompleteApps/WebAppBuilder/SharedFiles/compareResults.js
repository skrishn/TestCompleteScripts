//USEUNIT resultFile

//should be moved to resultFile..does no compare
function printResult(msg) {
  Log.Message(msg);
  resultFile.writeLine("<tr><td> " + msg + " </td><td><font color='#006633'></font></td></tr>");
}

//should be moved to resultFile...does no compare
function printResultCenter(msg) {
  Log.Message(msg);
  resultFile.writeLine("<tr><td align = 'center'> " + msg + " </td><td><font color='#006633'></font></td></tr>");
}

function printResultResult(rslt, msg) {
  resultFile.writePassFailLine(rslt == "Pass");
}

function resultVOS(ele, msg) {
  // the item should not be visible on the screen. This function checks for that. 
  resultFile.writePassFailLine(!ele.VisibleOnScreen, msg);
}

function resultChildCountCompare(cc1, val, msg) {
  resultFile.writePassFailLine(cc1 == val, msg);
}

function resultTxt(txt, txt1, msg) {
  resultFile.writePassFailLine(txt == txt1, msg);
}

function resultImg(pic, img, msg) {
  storedImg = Regions.GetPicture(img);
  resultFile.writePassFailLine((storedImg.Compare(pic), 5), msg); //TODO don't follow how this is a valid compare  
}

function resultTxtIncludes(txt, txt1, msg) {
  resultFile.writePassFailLine(txt.includes(txt1), msg);
}
////////////////////////////////////////////////////////////
//from SA
////////////////////////////////////////////////////////////
function resultTxtNotEmpty(txt, msg) {
  resultFile.writePassFailLine(txt != "", msg);
}

function resultTxtNotEmpty1(txt, msg) {
  resultFile.writePassFailLine(txt != -1, msg);
}

function resultTxtFind(txt, txt1, msg) {
  resultFile.writePassFailLine(aqString.Find(txt, txt1) != -1, msg);
}