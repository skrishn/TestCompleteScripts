var resultsFile;

//This function creates a file with file name in the format yymmdd_filename_devextorQA_HrsMinsSec.html
function createFile(folder, name) {
  // Return the hours, minutes and seconds parts of the current time value and then post them to the log
  var time = aqDateTime.Time();
  var h = IntToStr(aqDateTime.GetHours(time));
  var m = IntToStr(aqDateTime.GetMinutes(time));
  var s = IntToStr(aqDateTime.GetSeconds(time));

  // The full pathname to the results file
  var date = aqConvert.DateTimeToFormatStr(aqDateTime.Today(), "%y%m%d");
  var resultsFile = folder + "\\" + date + "_" + name + "_" + h + m + s + ".html";
  Log.Message("Results File: " + resultsFile);

  // Create the result file
  aqFile.Create(resultsFile);
  if (aqFile.Exists(resultsFile)) {
    startup(resultsFile)
  } else {
    Log.Message("File NOT Exists: " + resultsFile);
    Log.Message("Second attempt to create file: " + resultsFile);
    aqFile.Create(resultsFile);
    startup(resultsFile);
  }
}

//This function creates the headline of the text file
function startup(resultsFile) {
  dateRan = Utilities.FormatDateTime("mm/dd/yy t", Now());
  message = "Info Summary sanity and functionality tests" + " ran on " + dateRan;

  //update the results file with the base details
  writeLineStart("<!DOCTYPE html><html><head><meta charset='utf-8'<h1 align = 'center'>" + message + "</h1></head><body>");
  writeLine("<table border='1' width='75%' align = center>");
  writeLine("<tr><td width='80%' bgcolor='#151B54' align = center><font color='#FFFFFF'>Test description</font></td>");
  writeLine("<td width='20%' bgcolor='#151B54' align = center><font color='#FFFFFF'>Result</font></td>");
}

//Common function to be called from functional scripts. 
// writeResultToFileAsHtml(msg <String>, result <String Pass||Fail>)
function writeResultToFileAsHtml(msg, result) {
  Log.Message(msg);
  Log.Message(result);

  if (result == "Pass") {
    //For pass results - The pass is in green
    writeLine("<br>");
    writeLine("<tr><td></td><td><font color='#006633'>Pass</font>");
  } else {
    //For fails - The fail is in red 
    writeLine("<br>");
    //_writeLine("<tr><td>"msg"</td><td><font color='#FF0000'>Fail</font></td></tr>");
  }
}

//Common function to write line that does not consider pass/fail
function writeLine(html) {
  aqFile.WriteToTextFile(resultsFile, html, 22, false);
}

//Common function to write line that does not consider pass/fail
function writeLineStart(html) {
  aqFile.WriteToTextFile(resultsFile, html, 22, true);
}

function writePassFailLine(pass, msg) {
  if (pass) {
    Log.Message("Pass: " + msg);
    writeLine("<tr><td> " + msg + " </td><td><font color='#006633'>Pass</font></td></tr>");
  } else {
    Log.Error("Fail: " + msg);
    writeLine("<tr><td> " + msg + " </td><td><font color='#FF0000'>Fail</font></td></tr>");
  }
}