//USEUNIT resultFile
function printResult(msg) {
  Log.Message(msg);
  aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#006633'></font></td></tr>", 22, false);
}

function printResultCenter(msg) {
  Log.Message(msg);
  aqFile.WriteToTextFile(resultsFile, "<tr><td align = 'center'> " + msg + " </td><td><font color='#006633'></font></td></tr>", 22, false);
}

function printResultResult(rslt, msg) {
  try {
    if (rslt == "Pass") {
      Log.Message("Pass: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#006633'>Pass</font></td></tr>", 22, false);
    } else {
      Log.Message("Fail: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#FF0000'>Fail</font></td></tr>", 22, false);
    }
  } catch (e) {
    Log.Message(e.message)
  }
}

function resultVOS(ele, msg) {
  try { // the item should not be visible on the screen. This function checks for that. 
    if (ele.VisibleOnScreen) {
      Log.Message("Fail: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#FF0000'>Fail</font></td></tr>", 22, false);
    } else {
      Log.Message("Pass: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#006633'>Pass</font></td></tr>", 22, false);

    }
  } catch (e) {
    Log.Message(e.message)
  }
}

function resultChildCountCompare(cc1, val, msg) {
  Log.Message(cc1)
  Log.Message(val)
  try {
    if (cc1 == val) {
      Log.Message("Pass: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#006633'>Pass</font></td></tr>", 22, false);

    } else {
      Log.Message("Fail: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#FF0000'>Fail</font></td></tr>", 22, false);
    }
  } catch (e) {
    Log.Message(e.message)
  }
}

function resultTxt(txt, txt1, msg) {
  Log.Message(txt)
  Log.Message(txt1)
  try {
    if (txt == txt1) {
      Log.Message("Pass: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#006633'>Pass</font></td></tr>", 22, false);

    } else {
      Log.Message("Fail: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#FF0000'>Fail</font></td></tr>", 22, false);
    }
  } catch (e) {
    Log.Message(e.message)
  }
}

function resultTxtNotEmpty(txt, msg) {
  Log.Message(txt)
  try {
    if (txt != "") {
      Log.Message("Pass: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#006633'>Pass</font></td></tr>", 22, false);

    } else {
      Log.Message("Fail: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#FF0000'>Fail</font></td></tr>", 22, false);
    }
  } catch (e) {
    Log.Message(e.message)
  }
}
function resultTxtNotEmpty1(txt, msg) {
  Log.Message(txt)
  try {
    if (txt != -1) {
      Log.Message("Pass: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#006633'>Pass</font></td></tr>", 22, false);

    } else {
      Log.Message("Fail: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#FF0000'>Fail</font></td></tr>", 22, false);
    }
  } catch (e) {
    Log.Message(e.message)
  }
}
function resultImg(pic, img, msg) {
  storedImg = Regions.GetPicture(img);
  try {
    if (storedImg.Compare(pic), 5) {
      Log.Message("Pass: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#006633'>Pass</font></td></tr>", 22, false);
    } else {
      Log.Message("Fail: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#FF0000'>Fail</font></td></tr>", 22, false);
    }
  } catch (e) {
    Log.Message(e.message)
  }
}

function resultTxtIncludes(txt, txt1, msg) {
  try {
    Log.Message(txt)
    Log.Message(txt1)
    if (txt.includes(txt1)) {
      Log.Message("Pass: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#006633'>Pass</font></td></tr>", 22, false);
    } else {
      Log.Message("Fail: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#FF0000'>Fail</font></td></tr>", 22, false);
    }
  } catch (e) {
    Log.Message(e.message)
  }
}

function resultTxtFind(txt, txt1, msg) {
  try {
    Log.Message(txt)
    Log.Message(txt1)
    var Res = aqString.Find(txt, txt1);
    if (Res != -1) {
      Log.Message("Pass: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#006633'>Pass</font></td></tr>", 22, false);
    } else {
      Log.Message("Fail: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#FF0000'>Fail</font></td></tr>", 22, false);
    }
  } catch (e) {
    Log.Message(e.message)
  }
}

function printCatch(msg, msg1) {
  try {
    var Res = aqString.Find(txt, txt1);
    if (Res != -1) {
      Log.Message("Pass: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#006633'>Pass</font></td></tr>", 22, false);
    } else {
      Log.Message("Fail: " + msg);
      aqFile.WriteToTextFile(resultsFile, "<tr><td> " + msg + " </td><td><font color='#FF0000'>Fail</font></td></tr>", 22, false);
    }
  } catch (e) {
    Log.Message(e.message)
  }
} 