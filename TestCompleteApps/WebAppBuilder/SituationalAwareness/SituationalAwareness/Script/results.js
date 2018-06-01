//USEUNIT resultFile
function result(rslt, msg) {
  if (rslt == "Pass") {
    Log.Message("Pass: " + msg);
    aqFile.WriteToTextFile(resultsFile, "<tr><td>" + msg + "</td><td><font color='#006633'>Pass</font></td></tr>", 22, false);
  } else {
    Log.Warning("Fail: " + msg);
    aqFile.WriteToTextFile(resultsFile, "<tr><td>" + msg + "</td><td><font color='#FF0000'>Fail</font></td></tr>", 22, false);
  }
} 