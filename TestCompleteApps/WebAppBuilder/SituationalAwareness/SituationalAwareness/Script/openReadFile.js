//USEUNIT compareResults
//USEUNIT config
var w = 0, d = 0, ww, dd;

function openFiles(name, b, num) {
  try {
    var file = config.fileFolder + "\\" + name + ".csv";
    Log.Message("concated file " + file);
    readFile(name, file, num);
    deleteFile(file);
  } catch (e) {
    y1 = aqString.Concat("Open file ", name);
    compareResults.printResult(aqString.Concat(y1, e));
  }
}

function findFiles(panels) {
  try {
    let xyz = 0;
    let files = aqFileSystem.GetFolderInfo(config.fileFolder).Files;
    if (!strictEqual(files, null)) {
      let FileItem = files.Next(); //TODO this var is unused...is this iteration call necessary??
      var panelString = aqConvert.VarToStr(panels);
      var cnt = panels.length
      for (i = 0; i < cnt; i++) {
        var panel = panels[i];
        var _exists = panelString.search(panel) != -1;
        xyz += _exists ? 1 : 0;
        Log.Message(_exists ? " find " : " else " + panel);
      }
      compareResults.resultTxt(xyz, cnt, "Incident download - all analysis result files downloaded");
      deleteFile(file); //TODO what was this??
    }
  } catch (e) {
    compareResults.printResult(aqString.Concat("Find files ", e));
  }
}

function getSummaryFile(getPanelArray, demoConcat, hospConcat, schConcat, shelConcat, emeConcat, bridgeCount, rdBlockCount, rdClosure) {
  try {
    var file = config.fileFolder + "\\Summarized Information.csv";
    readSummaryFile(file, getPanelArray, demoConcat, hospConcat, schConcat, shelConcat, emeConcat, bridgeCount, rdBlockCount, rdClosure);
    deleteFile(file);
  } catch (e) {
    compareResults.printResult(aqString.Concat("Get summary file ", e));
  }
}

function readSummaryFile(file, getPanelArray, demoConcat, hospConcat, schConcat, shelConcat, emeConcat, bridgeCount, rdBlockCount, rdClosure) {
  try {
    var g, h, xyz = 0; w = 0, d = 0
    var f = aqFileSystem.GetFileInfo(file).OpenTextFile(aqFile.faRead, aqFile.ctUTF8);
    var lNum = f.LinesCount;
    for (var i = 0; i < lNum; i++) {
      var lLength = f.LineLength(i);
      // Reads the current line 
      var rl = f.ReadLine();
      var a, cnt;
      if (rl == "Bridges (Summary)") {
        a = "COUNT";
        cnt = bridgeCount;
      } else if (rl == "Emergency Assistance (Summary)") {
        a = "Special Medications Required,Service Animal Present,Transportation Required,Evacuation Plan Present,COUNT";
        cnt = emeConcat;
      } else if (rl == "Shelters (Summary)") {
        a = "Total Capacity,# of Beds Available,Current Occupancy,COUNT");
        cnt = shelConcat;
      } else if (rl == "Schools (Summary)") {
        a = "# of Students,COUNT"
        cnt = schConcat;
      } else if (rl == "Hospitals (Closest Feature)") {
        a = "Facility Identifier,Name of Facility,Owner Name"
        cnt = hospConcat;
      } else if (rl == "Demographics (Summary)") {
        a = "2015 Children (Age <14),2015 Seniors (Age 65+),2015 Total Population"
        cnt = demoConcat;
      } else if (rl == "Road Closures (Summary)") {
        a = "COUNT";
        cnt = rdClosure;
      } else if (rl == "Road Blocks(Summary)") {
        a = "COUNT"
        cnt = rdBlockCount;
      }

      var r = compare(f, i, cnt, a);
      g = r.g;
      h = r.h;

      f.SetPosition(i + 1, 0);
    }
    //TODO what is this all about...it's outside the loop so would only show the last..??
    Log.Message("G " + g);
    Log.Message("H " + h);
    //TODO check compare results...I think I wrote a function that would take the test and message so you don't have to
    // test up front like this..
    compareResults.printResultResult((g <= 8) && (h <= 8) ? "Pass" : "Fail", "Summary Information - result tab matches")

    w = 0;
    d = 0;
    f.Close();
  } catch (e) {
    compareResults.printResult(aqString.Concat("Read summary file ", e));
  }
}

function compare(f, i, cnt, a){
  f.SetPosition(i + 1, 0);
  var clmnName = f.ReadLine();

  f.SetPosition(i + 2, 0);
  var _cnt = f.ReadLine();

  return {
    g: compare1(clmnName, a),
    h: compare2(_cnt, cnt)
  }
}

function compare1(clmn, str) {
  try {
    Log.Message(clmn);
    Log.Message(str);
    w += clmn == str ? 1 : "0";
    if (clmn != str) {
      Log.Message("Didn't match 1  " + clmn + "----" + str);
    }
    return w;
  } catch (e) {
    alert("does concat do exactly what it sounds like??");
    alert(aqString.Concat("Compare summary file fields ", e) == "Compare summary file fields " + e);
    compareResults.printResult(aqString.Concat("Compare summary file fields ", e))
  }
}

function compare2(values, concats) {
  try {
    c1 = concats.replace(/,/g, "");
    v1 = values.replace(/,/g, "");
    Log.Message("C1 is " + c1)
    Log.Message("V1 is " + v1)
    d += c1 == v1 ? 1 : "0";
    if (c1 != v1) {
      Log.Message("Didn't match  2 " + concats + "----" + values);
    }
    return d;
  } catch (e) {
    compareResults.printResult(aqString.Concat("Compare summary file values ", e))
  }
}

function readFile(name, file, num) {
  try {
    Log.Message(name);
    Log.Message(file);
    var f = aqFileSystem.GetFileInfo(file).OpenTextFile(aqFile.faRead, aqFile.ctUTF8);
    if (f.LinesCount > 0) {
      if (name == "Demographics") {
        Log.Message("");
      } else {
        num_Records = f.LinesCount;
        len = num_Records - 2;
        Log.Message("NUM " + num);
        Log.Message("LEN before " + num_Records);
        Log.Message("LEN AFTER  " + len);
        compareResults.resultTxt(num, len, "Address count matches with record count in files");
      }
      if (f.Line == 0) {
        var str;
        if (name == "Bridges") {
          str = "OBJECTID,Facility Identifier,Bridge Name,Bridge Type,Official Bridge Number,Bridge Design,Traffic Type,Design Load Rating,Span Type,Span Length,Number of Spans,Deck Type,Deck Thickness,Lanes on Bridge,Lanes Under Bridge,Median on Bridge,Approach Width,Dowel Length,Dowel Size,Daily Traffic Volume,Year Traffic Counted,Install Date,Condition,Owned By,Managed By,Last Update Date,Last Editor";
        } else if (name == "Schools") {
          str = "OBJECTID,Facility Identifier,Name of Facility,Owner Name,Owner Type,Subtype Field,Feature Code,Full Address,Municipality Name,State Name,Capture Method,Location Type,Description,# of Students,Facility Area,Last Update Date,Last Editor"
        } else if (name == "Shelters") {
          str = "OBJECTID,Emergency Facility ID,Name,Site Address,Organization,Red Cross Model,Contact Name,Contact Email,Contact Phone,Total Capacity,# of Beds Available,Current Occupancy,Hours Operation,Handicap Accessible,Generator,Allows Pets / Animals,Days Operation,Access Restrictions,Open Date,Closed Date,Operational Status,Last Update Date,Last Editor";
        } else if (name == "Demographics") {
          str = "OBJECTID,STATEFP10,COUNTYFP10,TRACTCE10,NAME10,NAMELSAD10,ID,ORIG_ID,sourceCountry,2015 Children (Age <14),2015 Seniors (Age 65+),2015 Total Population,2009-2013 ACS Owner Households with no vehicles available,ACS Pop 5+: Lang at Home Base,ACS HHs w/1+ Pers w/Disability,ACS HHs w/Food Stamps/SNAP,Median Age,Shape__Area,Shape__Length";
        } else if (name == "Emergency Assistance") {
          str = "OBJECTID,Contact ID,Contact Name,Gender,Date of Birth,Full Address,Place Name,Residence Type,Home Phone,Cell Phone,Email,SMS or Text,Medical Condition,Special Medications Required,Medications Required,Special Equipment Required,Service Animal Present,Transportation Required,Evacuation Plan Present,Comments,Emergency Contact Name,Emergency Contact Home Phone,Emergency Contact Cell Phone,Emergency Contact Email,Emergency Contact SMS or Text,Physician Name,Physician's Work Phone,Physician's Email,Start Date,End Date,Last Update Date,Last Editor";
        } else if (name == "Road Closures") {
          str = "OBJECTID,Road Closure,Location,Reason,Comments,Full Closure,Alternate Route,Starts,Ends,Contact Information,Permit Identifier,Incident Number,Incident Name,Last Update Date,Last Editor,DIRECTION,BLOCKOCCUR,Active,Shape__Length";
        } else if (name == "Road Blocks") {
          str = "OBJECTID,Road Closure,Location,Reason,Comments,Full Closure,Direction,Road Closure Duration,Active,Alternate Route,Starts,Ends,Contact Information,Permit Identifier,Incident Number,Incident Name,Last Update Date,Last Editor"
        } else if (name == "Hospitals") {
          str = "OBJECTID,Facility Identifier,Name of Facility,Owner Name,Owner Type,Subtype Field,Feature Code,Full Address,Website,Operational Days,Operational Hours,# of Beds Available,Contact Name,Phone,Email"
        }
        if (typeof (str) !== 'undefined') {
          var s = f.ReadLine();
          var b = aqConvert.VarToStr(str);
          compareResults.resultTxt(s, b, "Read file");
        }
      }
      f.Close();
    }
  } catch (e) {
    compareResults.printResult(aqString.Concat("Read analysis file ", e));
  }
}

function deleteFile(file) {
  var r = aqFileSystem.DeleteFile(file)
  Log.Message(r ? "File Deleted" : "No File Deleted");
}