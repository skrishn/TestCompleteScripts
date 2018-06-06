//USEUNIT compareResults
var w = 0, d = 0, ww, dd;

function openFiles(getFileName, b, num) {
  try {
    myFolder = aqFileSystem.FindFiles("C:\\Users\\suba6982\\Downloads\\", "*.csv");
    myFile0 = aqString.Concat("C:\\Users\\suba6982\\Downloads\\", getFileName)
    myFile = aqString.Concat(myFile0, ".csv")
    Log.Message("concated file " + myFile)
    //foundFiles = aqFileSystem.FindFiles(myFile0,"*.csv");
    //if (!strictEqual(foundFiles, null)) {
    readFile(getFileName, myFile, num)
    deleteFile(myFile)
    // } else
    // compareResults.printResult("File not found - download error");
  } catch (e) {
    y1 = aqString.Concat("Open file ", getFileName)
    y = aqString.Concat(y1, e)
    compareResults.printResult(y)
  }
}

function findFiles(getPanelArray) {
  try {
    let xyz = 0
    let sPath = "C:\\Users\\suba6982\\Downloads";
    // Obtains information about the folder
    let colFiles = aqFileSystem.GetFolderInfo(sPath).Files;
    // Checks whether the folder stores any files
    if (!strictEqual(colFiles, null)) {
      // Iterates through the collection of files stored in the folder
      // Obtains a file stored in the folder
      let FileItem = colFiles.Next();
      cleanStr = aqConvert.VarToStr(getPanelArray)
      arrayLen = getPanelArray.length
      for (i = 0; i < arrayLen; i++) {
        isFileThere = getPanelArray[i]
        findFile = cleanStr.search(isFileThere)
        if (findFile != -1) {
          xyz = xyz + 1
          Log.Message(" find " + isFileThere)
        } else {
          xyz = xyz + 0
          Log.Message(" else " + isFileThere)
        }
      }
      compareResults.resultTxt(xyz, arrayLen, "Incident download - all analysis result files downloaded")
      deleteFile(myFile)
    }
  } catch (e) {
    y = aqString.Concat("Find files ", e)
    compareResults.printResult(y)
  }
}

function getSummaryFile(getPanelArray, demoConcat, hospConcat, schConcat, shelConcat, emeConcat, bridgeCount, rdBlockCount, rdClosure) {

  try {
    myFile = "C:\\Users\\suba6982\\Downloads\\Summarized Information.csv"
    readSummaryFile(myFile, getPanelArray, demoConcat, hospConcat, schConcat, shelConcat, emeConcat, bridgeCount, rdBlockCount, rdClosure)
    deleteFile(myFile)
  } catch (e) {
    y = aqString.Concat("Get summary file ", e)
    compareResults.printResult(y)
  }

}

function readSummaryFile(myFile, getPanelArray, demoConcat, hospConcat, schConcat, shelConcat, emeConcat, bridgeCount, rdBlockCount, rdClosure) {
  try {
    var g, h, xyz = 0; w = 0, d = 0
    myFile = myFile
    getPanelArray = getPanelArray
    /* Log.Message("---------------------------------------------------------------------")
     Log.Message(" demo   " + demoConcat)
     Log.Message(" hosp   " + hospConcat)
     Log.Message(" school   " + schConcat)
     Log.Message(" shel   " + shelConcat)
     Log.Message(" emergency   " + emeConcat)
     Log.Message(" rd block   " + rdBlockCount)
     Log.Message(" rd closure   " + rdClosure)
     Log.Message(" bridge   " + bridgeCount)*/
    //Log.Message("---------------------------------------------------------------------")
    var f = aqFileSystem.GetFileInfo(myFile).OpenTextFile(aqFile.faRead, aqFile.ctUTF8);
    var lNum = f.LinesCount;
    for (var i = 0; i < lNum; i++) {
      var lLength = f.LineLength(i);
      // Reads the current line 
      var rl = f.ReadLine()
      if (rl == "Bridges (Summary)") {
        f.SetPosition(i + 1, 0);
        clmnName = f.ReadLine()
        a = "COUNT"
        f.SetPosition(i + 2, 0);
        brdgCount = f.ReadLine()
        //Log.Message(brdgCount)
        g = compare1(clmnName, a)
        h = compare2(brdgCount, bridgeCount)

      } else if (rl == "Emergency Assistance (Summary)") {
        f.SetPosition(i + 1, 0);
        clmnName = f.ReadLine()
        a = "Special Medications Required,Service Animal Present,Transportation Required,Evacuation Plan Present,COUNT"

        f.SetPosition(i + 2, 0);
        emerValues = f.ReadLine()
        //Log.Message("what did I print " +emerValues)
        g = compare1(clmnName, a)
        h = compare2(emerValues, emeConcat)

      } else if (rl == "Shelters (Summary)") {
        f.SetPosition(i + 1, 0);
        shelClmn = f.ReadLine()
        a = "Total Capacity,# of Beds Available,Current Occupancy,COUNT"
        //Log.Message("what did I print " + shelClmn)

        f.SetPosition(i + 2, 0);
        shelValues = f.ReadLine()
        //Log.Message(shelValues)

        g = compare1(shelClmn, a)
        h = compare2(shelValues, shelConcat)

      } else if (rl == "Schools (Summary)") {
        f.SetPosition(i + 1, 0);
        schClmn = f.ReadLine()
        a = "# of Students,COUNT"
        //Log.Message(schClmn)

        f.SetPosition(i + 2, 0);
        schValues = f.ReadLine()
        //Log.Message(schValues)

        g = compare1(schClmn, a)
        h = compare2(schValues, schConcat)

      } else if (rl == "Hospitals (Closest Feature)") {

        f.SetPosition(i + 1, 0);
        clmn = f.ReadLine()
        a = "Facility Identifier,Name of Facility,Owner Name"
        //Log.Message(clmn)

        f.SetPosition(i + 2, 0);
        hospValues = f.ReadLine()
        //Log.Message(hospValues)

        g = compare1(clmn, a)
        h = compare2(hospValues, hospConcat)

      } else if (rl == "Demographics (Summary)") {

        f.SetPosition(i + 1, 0);
        clmn = f.ReadLine()
        a = "2015 Children (Age <14),2015 Seniors (Age 65+),2015 Total Population"
        //Log.Message(clmn)

        f.SetPosition(i + 2, 0);
        demoValues = f.ReadLine()
        //Log.Message(schValues)

        g = compare1(clmn, a)
        h = compare2(demoValues, demoConcat)

      } else if (rl == "Road Closures (Summary)") {

        f.SetPosition(i + 1, 0);
        clmn = f.ReadLine()
        a = "COUNT"
        //Log.Message(clmn)

        f.SetPosition(i + 2, 0);
        rcValues = f.ReadLine()
        //Log.Message(rcValues)

        g = compare1(clmn, a)
        h = compare2(rcValues, rdClosure)

      } else {

        if (rl == "Road Blocks(Summary)") {
          f.SetPosition(i + 1, 0);
          clmn = f.ReadLine()
          a = "COUNT"
          //Log.Message(clmn)

          f.SetPosition(i + 2, 0);
          rbValues = f.ReadLine()
          //Log.Message(rbValues)
          //w = compare(clmn, a, rbValues, rdBlockCount)
          g = compare1(clmn, a)
          h = compare2(rbValues, rdBlockCount)
        }
      }
      // Log.Message(i)
      // Sets the cursor to the next line
      f.SetPosition(i + 1, 0);

    }
    Log.Message("G " + g)
    Log.Message("H " + h)
    if ((g <= 8) && (h <= 8)) {
      compareResults.printResultResult("Pass", "Summary Information - result tab matches")
    } else {
      //if ((g == 0) && (h == 0)) {

      compareResults.printResultResult("Fail", "Summary Information - result tab matches")
      //}
    }

    w = 0
    d = 0
    f.Close();

  } catch (e) {
    y = aqString.Concat("Read summary file ", e)
    compareResults.printResult(y)
  }
}

function compare1(clmn, str) {
  try {
    Log.Message(clmn)
    Log.Message(str)
    if (clmn == str) {
      w = w + 1
    } else {
      w = w + "0"
      Log.Message("Didn't match 1  " + clmn + "----" + str)
    }
    //Log.Message("its w " + w)
    return w;
  } catch (e) {
    y = aqString.Concat("Compare summary file fields ", e)
    compareResults.printResult(y)
  }

}

function compare2(values, concats) {
  try {
    c1 = concats.replace(/,/g, "");
    v1 = values.replace(/,/g, "");
    Log.Message("C1 is " + c1)
    Log.Message("V1 is " + v1)
    if (c1 == v1) {
      d = d + 1
    } else {
      d = d + "0"
      Log.Message("Didn't match  2 " + concats + "----" + values)
    }
    //Log.Message("its d " + d)
    return d;
  } catch (e) {
    y = aqString.Concat("Compare summary file values ", e)
    compareResults.printResult(y)
  }

}

function readFile(getFileName, myFile, num) {

  try {
    getFileName = getFileName
    Log.Message(getFileName)
    myFile = myFile
    Log.Message(myFile)
    num = num
    var f = aqFileSystem.GetFileInfo(myFile).OpenTextFile(aqFile.faRead, aqFile.ctUTF8);
    msg = "Read file"

    if (f.LinesCount > 0) {
      /*s = f.ReadAll();
      Log.Message(s);
      readLen = f.LineLength()
      Log.Message(readLen)*/
      if (getFileName == "Demographics") {
        Log.Message("")
      } else {
        num_Records = f.LinesCount
        len = num_Records - 2
        Log.Message("NUM " + num)
        Log.Message("LEN before " + num_Records)
        Log.Message("LEN AFTER  " + len)
        compareResults.resultTxt(num, len, "Address count matches with record count in files")
      }
      if (f.Line == 0) {
        s = f.ReadLine()
        if (getFileName == "Bridges") {

          str = "OBJECTID,Facility Identifier,Bridge Name,Bridge Type,Official Bridge Number,Bridge Design,Traffic Type,Design Load Rating,Span Type,Span Length,Number of Spans,Deck Type,Deck Thickness,Lanes on Bridge,Lanes Under Bridge,Median on Bridge,Approach Width,Dowel Length,Dowel Size,Daily Traffic Volume,Year Traffic Counted,Install Date,Condition,Owned By,Managed By,Last Update Date,Last Editor"
          b = aqConvert.VarToStr(str)
          compareResults.resultTxt(s, b, msg)

        } else if (getFileName == "Schools") {

          str = "OBJECTID,Facility Identifier,Name of Facility,Owner Name,Owner Type,Subtype Field,Feature Code,Full Address,Municipality Name,State Name,Capture Method,Location Type,Description,# of Students,Facility Area,Last Update Date,Last Editor"
          b = aqConvert.VarToStr(str)
          compareResults.resultTxt(s, b, msg)

        } else if (getFileName == "Shelters") {

          str = "OBJECTID,Emergency Facility ID,Name,Site Address,Organization,Red Cross Model,Contact Name,Contact Email,Contact Phone,Total Capacity,# of Beds Available,Current Occupancy,Hours Operation,Handicap Accessible,Generator,Allows Pets / Animals,Days Operation,Access Restrictions,Open Date,Closed Date,Operational Status,Last Update Date,Last Editor"
          b = aqConvert.VarToStr(str)
          compareResults.resultTxt(s, b, msg)

        } else if (getFileName == "Demographics") {

          str = "OBJECTID,STATEFP10,COUNTYFP10,TRACTCE10,NAME10,NAMELSAD10,ID,ORIG_ID,sourceCountry,2015 Children (Age <14),2015 Seniors (Age 65+),2015 Total Population,2009-2013 ACS Owner Households with no vehicles available,ACS Pop 5+: Lang at Home Base,ACS HHs w/1+ Pers w/Disability,ACS HHs w/Food Stamps/SNAP,Median Age,Shape__Area,Shape__Length"
          b = aqConvert.VarToStr(str)
          compareResults.resultTxt(s, b, msg)

        } else if (getFileName == "Emergency Assistance") {

          str = "OBJECTID,Contact ID,Contact Name,Gender,Date of Birth,Full Address,Place Name,Residence Type,Home Phone,Cell Phone,Email,SMS or Text,Medical Condition,Special Medications Required,Medications Required,Special Equipment Required,Service Animal Present,Transportation Required,Evacuation Plan Present,Comments,Emergency Contact Name,Emergency Contact Home Phone,Emergency Contact Cell Phone,Emergency Contact Email,Emergency Contact SMS or Text,Physician Name,Physician's Work Phone,Physician's Email,Start Date,End Date,Last Update Date,Last Editor"
          b = aqConvert.VarToStr(str)
          compareResults.resultTxt(s, b, msg)

        } else if (getFileName == "Road Closures") {

          str = "OBJECTID,Road Closure,Location,Reason,Comments,Full Closure,Alternate Route,Starts,Ends,Contact Information,Permit Identifier,Incident Number,Incident Name,Last Update Date,Last Editor,DIRECTION,BLOCKOCCUR,Active,Shape__Length"
          b = aqConvert.VarToStr(str)
          compareResults.resultTxt(s, b, msg)

        } else if (getFileName == "Road Blocks") {

          str = "OBJECTID,Road Closure,Location,Reason,Comments,Full Closure,Direction,Road Closure Duration,Active,Alternate Route,Starts,Ends,Contact Information,Permit Identifier,Incident Number,Incident Name,Last Update Date,Last Editor"
          b = aqConvert.VarToStr(str)
          compareResults.resultTxt(s, b, msg)

        } else {
          if (getFileName == "Hospitals") {

            str = "OBJECTID,Facility Identifier,Name of Facility,Owner Name,Owner Type,Subtype Field,Feature Code,Full Address,Website,Operational Days,Operational Hours,# of Beds Available,Contact Name,Phone,Email"
            b = aqConvert.VarToStr(str)
            compareResults.resultTxt(s, b, msg)
          }
        }
      }
      f.Close();
    }

  } catch (e) {
    y = aqString.Concat("Read analysis file ", e)
    compareResults.printResult(y)
  }
}


function deleteFile(myFile) {

  rslt = aqFileSystem.DeleteFile(myFile)
  if (rslt == true) {
    Log.Message("File Deleted")
  } else {
    Log.Message("No File Deleted")
  }

}
 /*if ((isNaN(g)) && isNaN(h)) {
            compareResults.printResultResult("Fail", "Summary Information - result tab matches")
        } else {
            //if ((g == 0) && (h == 0)) {

                compareResults.printResultResult("Pass", "Summary Information - result tab matches")
            //}
        }*/
        //msg = "Read file - Summarized Information"        

        /*if (f.LinesCount > 0) {
            bull = f.Cursor
            Log.Message("bull cursor " +bull)
            s = f.ReadAll();
            Log.Message(s);
            cleanStr = s.replace(/\n|\r/g, ' ');
            Log.Message(cleanStr)
            //b = aqConvert.VarToStr(getPanelArray)
            //Log.Message(b)
            arrayLen = getPanelArray.length
            for (i = 0; i < arrayLen; i++) {
                getStr = getPanelArray[i]
                Log.Message("Get str = " +getStr)
                findStr = cleanStr.search(getStr)
                if (findStr != -1) {
                    Log.Message("Found string *********  " + getStr)
                    xyz = xyz + 1
                } else {
                    xyz = xyz + 0
                }     */
        //}
        //compareResults.resultTxt(xyz, arrayLen, "Summary Information - result tab matches")
        /*readLen = f.LineLength()
        Log.Message(readLen)
        if (getFileName == "Demographics") {
            Log.Message("")
        } else {
            num_Records = f.LinesCount
            len = num_Records - 2
            Log.Message("NUM " + num)
            Log.Message("LEN before " + num_Records)
            Log.Message("LEN AFTER  " + len)
            compareResults.resultTxt(num, len, "Address count matches with record count in files")
        }*/

        //}