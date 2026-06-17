/**
 * =========================================================================
 *  BRIGHT MIND INSTITUTE OF EDUCATION — AI SUMMER CAMP 2026
 *  Master Registration & Automatic PDF Student ID Card Generator
 * =========================================================================
 * 
 * Instructions:
 * 1. Open Google Apps Script (https://script.google.com/) for your Google Sheet.
 * 2. Paste this entire file into Code.gs.
 * 3. ⚠️ IMPORTANT: AUTHORIZE THE EMAIL SERVICE FIRST!
 *    - In the toolbar at the top of the editor, click the function dropdown and select "authorizeScript".
 *    - Click the "Run" button.
 *    - Click "Review permissions" when requested, choose your account, click "Advanced" -> "Go to Untitled project (unsafe)", and click "Allow".
 * 4. Deploy it as a Web App:
 *    - Click "Deploy" -> "New deployment"
 *    - Select type: "Web app"
 *    - Set "Execute as": "Me" (your account)
 *    - Set "Who has access": "Anyone"
 *    - Copy the deployment URL and update your website or local server.ts!
 */

const SHEET_ID   = "1xacbHXJRDUVkhJ8sCL0J8t4_8j23jzD-R2YngDwK5sQ";
const SHEET_NAME = "AI Camp Registrations";

// ── Run this once in the Script Editor to authorize the Gmail/Email service ──
function authorizeScript() {
  var testEmail = Session.getActiveUser().getEmail();
  if (testEmail) {
    try {
      GmailApp.sendEmail(
        testEmail, 
        "Authorization Active", 
        "Congratulations! Your Google Apps Script is now successfully authorized to send emails for the AI Summer Camp 2026."
      );
      Logger.log("✅ Authorization email sent successfully to: " + testEmail);
    } catch (err) {
      Logger.log("❌ Authorization Error: " + err.toString());
    }
  } else {
    Logger.log("Could not retrieve active user email.");
  }
}

// ── doPost ────────────────────────────────────────────────────────
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Missing or invalid post payload data."
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    var result = saveRegistration(data);

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── doGet — Test URL in browser ───────────────────────────────────
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "✅ Script is LIVE and Ready!",
    sheetId: SHEET_ID,
    sheetName: SHEET_NAME,
    camp: "Bright Mind Institute — AI Summer Camp 2026"
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

// ── saveRegistration ──────────────────────────────────────────────
function saveRegistration(data) {
  var ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (err) {
    Logger.log("getActiveSpreadsheet failed: " + err.toString());
  }

  if (!ss) {
    try {
      ss = SpreadsheetApp.openById(SHEET_ID);
    } catch (err) {
      throw new Error("Could not access Google Spreadsheet. Please verify your SHEET_ID or make sure this script is bound to the sheet: " + err.toString());
    }
  }

  var sheet = ss.getSheetByName(SHEET_NAME);

  // Column Headers mapping for sheet creation
  var headersList = [
    "Timestamp",
    "Reference No",
    "Status",
    "First Name",
    "Last Name",
    "Full Name",
    "Date of Birth",
    "Gender",
    "Email",
    "Phone Number",
    "City",
    "Guardian Name",
    "Guardian Phone",
    "Guardian Relation",
    "School / Institution",
    "Current Grade",
    "Academic Stream",
    "Graduation Year",
    "Heard From",
    "AI Experience Level",
    "Topics of Interest",
    "Motivation / Goal",
    "Declaration Accepted"
  ];

  // Create sheet + headers if first time
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(headersList);

    // Style header row (Deep Professional Navy Blue)
    var hr = sheet.getRange(1, 1, 1, headersList.length);
    hr.setBackground("#0E1C35");
    hr.setFontColor("#FFFFFF");
    hr.setFontWeight("bold");
    hr.setFontSize(11);
    hr.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);

    // Dynamic Column widths to prevent clipping
    var widths = [170, 150, 90, 110, 110, 170, 120, 90, 220, 140, 110,
                  160, 145, 130, 210, 180, 140, 120, 160, 170, 230, 290, 150];
    for (var i = 0; i < widths.length; i++) {
      sheet.setColumnWidth(i + 1, widths[i]);
    }
  }

  // Generate Reference Number
  // Formats correctly sequential: e.g. Row 2 is 1st registration -> AISC-2026-0001
  var lastRow = sheet.getLastRow();
  var seqNum = lastRow > 0 ? lastRow : 1;
  var refNum = "AISC-2026-" + String(seqNum).padStart(4, "0");

  var fullName = ((data.fname || "").trim() + " " + (data.lname || "").trim()).trim();
  if (!fullName) fullName = "Student Registrant";

  // Data row values mapping
  var rowValues = [
    new Date(),                                         // Timestamp
    refNum,                                             // Reference No
    "New",                                              // Status
    data.fname      || "",                              // First Name
    data.lname      || "",                              // Last Name
    fullName,                                           // Full Name
    data.dob        || "",                              // Date of Birth
    data.gender     || "",                              // Gender
    data.email      || "",                              // Email
    data.phone      || "",                              // Phone
    data.city       || "",                              // City
    data.gname      || "",                              // Guardian Name
    data.gphone     || "",                              // Guardian Phone
    data.relation   || "",                              // Guardian Relation
    data.school     || "",                              // School
    data.grade      || "",                              // Grade
    data.stream     || "",                              // Stream
    data.gradyear   || "",                              // Graduation Year
    data.source     || "",                              // Heard From
    data.ailevel    || "",                              // AI Level
    data.interest   || "",                              // Interests
    data.motivation || "",                              // Motivation
    "Yes — Accepted"                                    // Declaration
  ];

  sheet.appendRow(rowValues);

  // Style new row with alternating colors and clean formatting
  var newRowIndex = sheet.getLastRow();
  sheet.getRange(newRowIndex, 1, 1, rowValues.length)
    .setBackground(newRowIndex % 2 === 0 ? "#F9F6F0" : "#FFFFFF")
    .setFontSize(10)
    .setVerticalAlignment("middle");

  // Style Status (Orange Accent)
  sheet.getRange(newRowIndex, 3)
    .setBackground("#E05C1A")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Style Reference Number (Navy Accent)
  sheet.getRange(newRowIndex, 2)
    .setBackground("#0E1C35")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Try sending the automatic email with PDF attachment
  var emailSent = false;
  var emailError = "";
  if (data.email) {
    try {
      sendEmailWithIDCard(data, refNum, fullName);
      emailSent = true;
    } catch (err) {
      emailError = err.toString();
      Logger.log("Failed to send confirmation email: " + emailError);
    }
  }

  return {
    success: true,
    refNum:  refNum,
    emailSent: emailSent,
    emailError: emailError,
    message: "Registration saved successfully!"
  };
}

// ── sendEmailWithIDCard ───────────────────────────────────────────
function sendEmailWithIDCard(data, refNum, fullName) {
  var studentEmail = data.email.trim();
  var studentName  = fullName;
  var grade        = data.grade || "Student";
  var city         = data.city || "Karachi";
  
  // ── 1. Create PDF Student ID Card ──
  // Using clean inline HTML table styling for cross-compatibility with Google Apps Script's PDF generator engine
  var idCardHtml = 
    '<html>' +
    '<head>' +
    '  <meta charset="utf-8">' +
    '  <style>' +
    '    body { margin: 0; padding: 20px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; background-color: #ffffff; }' +
    '  </style>' +
    '</head>' +
    '<body>' +
    '  <table border="0" cellpadding="0" cellspacing="0" style="width: 480px; height: 280px; background-color: #FAF7F2; border: 4px solid #0E1C35; border-radius: 12px; border-collapse: separate; overflow: hidden; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">' +
    '    <!-- Header -->' +
    '    <tr style="background-color: #0E1C35;">' +
    '      <td style="padding: 12px 18px; vertical-align: middle;">' +
    '        <img src="https://i.ibb.co/k2b42LsD/23ae5ef8-a3ae-4399-8cfd-be88f3a82bce-removalai-preview.png" alt="Bright Mind" style="height: 32px; filter: brightness(0) invert(1);" />' +
    '      </td>' +
    '      <td style="padding: 12px 18px; text-align: right; vertical-align: middle;">' +
    '        <span style="color: #ffffff; font-size: 15px; font-weight: bold; display: block; letter-spacing: 0.5px; text-transform: uppercase;">ID CARD</span>' +
    '        <span style="background-color: #E05C1A; color: #ffffff; padding: 2px 8px; border-radius: 4px; font-size: 9px; font-weight: bold; text-transform: uppercase; margin-top: 4px; display: inline-block;">STUDENT COHORT</span>' +
    '      </td>' +
    '    </tr>' +
    '    ' +
    '    <!-- Card Body Content -->' +
    '    <tr>' +
    '      <td colspan="2" style="padding: 15px 18px; vertical-align: top;">' +
    '        <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">' +
    '          <tr>' +
    '            <!-- Photo Box -->' +
    '            <td style="width: 100px; vertical-align: top;">' +
    '              <div style="width: 100px; height: 115px; border: 2px dashed #0E1C35; border-radius: 8px; background-color: #ffffff; text-align: center; color: #888880; display: table-cell; vertical-align: middle;">' +
    '                <span style="font-size: 9px; font-weight: bold; line-height: 14px; text-transform: uppercase;">Paste<br>Photograph<br>Here</span>' +
    '              </div>' +
    '            </td>' +
    '            ' +
    '            <!-- Details Column -->' +
    '            <td style="padding-left: 20px; vertical-align: top;">' +
    '              <div style="font-size: 20px; font-weight: bold; color: #0E1C35; margin-bottom: 2px; text-transform: capitalize; letter-spacing: -0.5px;">' + studentName + '</div>' +
    '              <div style="font-size: 12px; font-weight: bold; color: #E05C1A; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">AI Summer Camp 2026</div>' +
    '              ' +
    '              <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; font-size: 11px;">' +
    '                <tr>' +
    '                  <td style="padding: 2.5px 0; color: #7A7A72; font-weight: bold; width: 65px;">Student ID:</td>' +
    '                  <td style="padding: 2.5px 0; color: #0E1C35; font-weight: bold; font-family: Courier, monospace;">' + refNum + '</td>' +
    '                </tr>' +
    '                <tr>' +
    '                  <td style="padding: 2.5px 0; color: #7A7A72; font-weight: bold;">Class Grade:</td>' +
    '                  <td style="padding: 2.5px 0; color: #0E1C35; font-weight: 500;">' + grade + '</td>' +
    '                </tr>' +
    '                <tr>' +
    '                  <td style="padding: 2.5px 0; color: #7A7A72; font-weight: bold;">Location:</td>' +
    '                  <td style="padding: 2.5px 0; color: #0E1C35; font-weight: 500;">' + city + '</td>' +
    '                </tr>' +
    '                <tr>' +
    '                  <td style="padding: 2.5px 0; color: #7A7A72; font-weight: bold;">Date Issue:</td>' +
    '                  <td style="padding: 2.5px 0; color: #0E1C35; font-weight: 500;">June 2026</td>' +
    '                </tr>' +
    '              </table>' +
    '            </td>' +
    '          </tr>' +
    '        </table>' +
    '      </td>' +
    '    </tr>' +
    '    ' +
    '    <!-- Footer Banner -->' +
    '    <tr style="background-color: #111118; color: #ffffff;">' +
    '      <td colspan="2" style="padding: 8px 18px; font-size: 10px; border-collapse: collapse;">' +
    '        <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">' +
    '          <tr>' +
    '            <td style="text-align: left; opacity: 0.85; color: #ffffff;">' +
    '              📍 Manzoor Colony, Karachi, Pakistan' +
    '            </td>' +
    '            <td style="text-align: right; opacity: 0.85; font-weight: bold; color: #ffffff;">' +
    '              📞 +92 310 2310119' +
    '            </td>' +
    '          </tr>' +
    '          <tr>' +
    '            <td colspan="2" style="text-align: center; color: #E05C1A; padding-top: 5px; font-weight: bold; font-size: 9px; letter-spacing: 0.5px; text-transform: uppercase;">' +
    '              Bright Mind Institute of Education' +
    '            </td>' +
    '          </tr>' +
    '        </table>' +
    '      </td>' +
    '    </tr>' +
    '  </table>' +
    '</body>' +
    '</html>';

  var attachmentsList = [];
  try {
    // Render HTML segment dynamically as PDF output stream
    var htmlOutput = HtmlService.createHtmlOutput(idCardHtml);
    var pdfBlob = htmlOutput.getAs('application/pdf').setName("Student_ID_Card_" + refNum + ".pdf");
    attachmentsList.push(pdfBlob);
  } catch (pdfErr) {
    Logger.log("Failed to compile HTML ID card to PDF: " + pdfErr.toString());
  }

  // ── 2. Create Email HTML Body ──
  // A beautiful invitation box matching the corporate branding of Bright Mind
  var emailBodyHtml = 
    '<html>' +
    '<body style="font-family: Arial, sans-serif; background-color: #FAF7F2; padding: 25px; margin: 0; color: #222222;">' +
    '  <table border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #ddd8ce; border-radius: 8px; overflow: hidden; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">' +
    '    <!-- Brand Header -->' +
    '    <tr style="background-color: #0E1C35; text-align: center;">' +
    '      <td style="padding: 24px 15px;">' +
    '        <img src="https://i.ibb.co/k2b42LsD/23ae5ef8-a3ae-4399-8cfd-be88f3a82bce-removalai-preview.png" alt="Bright Mind" style="height: 48px; filter: brightness(0) invert(1);" />' +
    '        <div style="color: #FAF7F2; font-size: 14px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 8px;">Bright Mind Institute of Education</div>' +
    '      </td>' +
    '    </tr>' +
    '    ' +
    '    <!-- Welcome Content -->' +
    '    <tr>' +
    '      <td style="padding: 30px; line-height: 1.6; font-size: 15px; color: #333333;">' +
    '        <h2 style="color: #0E1C35; font-size: 22px; margin-top: 0; font-weight: bold; border-bottom: 2px solid #FAF7F2; padding-bottom: 12px;">Registration Confirmed! 🎉</h2>' +
    '        <p>Dear <strong>' + studentName + '</strong>,</p>' +
    '        <p>Congratulations! We have successfully received your enrollment application for the upcoming <strong>AI Summer Camp 2026</strong> at the Bright Mind Institute of Education.</p>' +
    '        ' +
    '        <!-- Highlight Box -->' +
    '        <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #FAF7F2; border-left: 4px solid #E05C1A; margin: 20px 0; border-collapse: collapse;">' +
    '          <tr>' +
    '            <td style="padding: 15px 18px;">' +
    '              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #7A7A72; font-weight: bold; margin-bottom: 4px;">Student Reference Code</div>' +
    '              <div style="font-family: monospace; font-size: 20px; font-weight: bold; color: #0E1C35; letter-spacing: 1px;">' + refNum + '</div>' +
    '              <div style="margin-top: 10px; font-size: 12.5px; color: #555555;">' +
    '                <strong>Fee Structure:</strong> PKR 4,999 (Flat program fee, payable on your arrival).<br>' +
    '                <strong>Schedule:</strong> Mon–Thu · 2:00 PM – 4:00 PM' +
    '              </div>' +
    '            </td>' +
    '          </tr>' +
    '        </table>' +
    '        ' +
    '        <p><strong>Your Printable Student ID Card:</strong></p>' +
    '        <p>Your official Student ID Card has been automatically generated and is <strong>attached to this email as a PDF document</strong>. Please download it, print it out, and bring it with you to the institute on cohort day.</p>' +
    '        ' +
    '        <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; border: 1px solid #FAF7F2; background-color: #ffffff; padding: 15px; margin: 15px 0; border-radius: 6px;">' +
    '          <tr>' +
    '            <td>' +
    '              <strong>🏫 Institute Venue:</strong><br>' +
    '              Bright Mind Institute, Manzoor Colony, Karachi, Pakistan<br>' +
    '              <strong>💬 Official Support (WhatsApp):</strong> +92 310 2310119<br>' +
    '              <strong>📧 Email Contact:</strong> brightmindinstituteofeducation@gmail.com' +
    '            </td>' +
    '          </tr>' +
    '        </table>' +
    '        ' +
    '        <p>Our academic coordinators will contact you and your parent/guardian on WhatsApp within 24 hours to guide you on the orientation session. We are thrilled to welcome you to the fascinating world of Agentic Artificial Intelligence!</p>' +
    '        ' +
    '        <p style="margin-top: 30px; font-size: 13px; color: #7A7A72; border-top: 1px solid #FAF7F2; padding-top: 15px;">' +
    '          Warm Regards,<br>' +
    '          <strong>Registrar Operations</strong><br>' +
    '          Bright Mind Institute of Education' +
    '        </p>' +
    '      </td>' +
    '    </tr>' +
    '    ' +
    '    <!-- Minimal Footer -->' +
    '    <tr style="background-color: #111118; text-align: center; color: #888880; font-size: 11px;">' +
    '      <td style="padding: 15px;">' +
    '        &copy; 2026 Bright Mind Institute. All Rights Reserved. ' +
    '      </td>' +
    '    </tr>' +
    '  </table>' +
    '</body>' +
    '</html>';

  // Send email with PDF attachment if successfully built
  var emailOptions = {
    htmlBody: emailBodyHtml
  };
  if (attachmentsList.length > 0) {
    emailOptions.attachments = attachmentsList;
  }

  GmailApp.sendEmail(
    studentEmail, 
    "AI Summer Camp 2026 — Registration Confirmed! (ID Card Assigned)", 
    "Hello " + studentName + ",\n\nYour registration has been securely received! Your Reference Code is: " + refNum + ".\n\nBright Mind Institute of Education", 
    emailOptions
  );
}
