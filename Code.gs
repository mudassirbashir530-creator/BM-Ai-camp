/**
 * Google Apps Script Web App for "AI Camp Registrations"
 * Paste this code inside your Apps Script editor (https://script.google.com/)
 * Linked Sheet ID: 1xacbHXJRDUVkhJ8sCL0J8t4_8j23jzD-R2YngDwK5sQ
 */

function doPost(e) {
  // Setup CORS support by returning proper headers
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Missing or invalid post payload data."
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
    }

    var data = JSON.parse(e.postData.contents);
    var sheetId = "1xacbHXJRDUVkhJ8sCL0J8t4_8j23jzD-R2YngDwK5sQ";
    var ss = SpreadsheetApp.openById(sheetId);
    var sheetName = "AI Camp Registrations";
    var sheet = ss.getSheetByName(sheetName);

    // Auto-create sheet if it does not exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      var headerRow = [
        "Timestamp",
        "Reference Number",
        "fname",
        "lname",
        "dob",
        "gender",
        "email",
        "phone",
        "city",
        "gname",
        "gphone",
        "relation",
        "school",
        "grade",
        "stream",
        "gradyear",
        "source",
        "ailevel",
        "interest",
        "motivation"
      ];
      sheet.appendRow(headerRow);
      // Style headers
      sheet.getRange(1, 1, 1, headerRow.length)
        .setFontWeight("bold")
        .setBackground("#FAF7F2")
        .setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // Auto-generate reference number in AISC-2026-XXXX format
    var lastRow = sheet.getLastRow();
    var serialNumber = lastRow; // Since row 1 is header, next row index represents serial sequential
    var refNum = "AISC-2026-" + String(serialNumber).padStart(4, "0");
    var timestamp = new Date().toISOString();

    // Map properties
    var rowValues = [
      timestamp,
      refNum,
      data.fname || "",
      data.lname || "",
      data.dob || "",
      data.gender || "",
      data.email || "",
      data.phone || "",
      data.city || "",
      data.gname || "",
      data.gphone || "",
      data.relation || "",
      data.school || "",
      data.grade || "",
      data.stream || "",
      data.gradyear || "",
      Array.isArray(data.source) ? data.source.join(", ") : (data.source || ""),
      data.ailevel || "",
      Array.isArray(data.interest) ? data.interest.join(", ") : (data.interest || ""),
      data.motivation || ""
    ];

    sheet.appendRow(rowValues);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      refNum: refNum
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
  }
}

// Handle CORS preflight options request
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    });
}
