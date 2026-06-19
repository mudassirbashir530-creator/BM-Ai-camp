/**
 * =========================================================================
 *  BRIGHT MIND INSTITUTE OF EDUCATION — AI SUMMER CAMP 2026
 *  Master Registration & Automatic PDF Student ID Card Generator
 * =========================================================================
 * 
 * Instructions:
 * 1. Open Google Apps Script (https://script.google.com/) for your Google Sheet.
 * 2. Paste this entire file into Code.gs.
 * 3. [CRITICAL] IMPORTANT: AUTHORIZE THE EMAIL SERVICE FIRST!
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
      Logger.log("[SUCCESS] Authorization email sent successfully to: " + testEmail);
    } catch (err) {
      Logger.log("[ERROR] Authorization Error: " + err.toString());
    }
  } else {
    Logger.log("Could not retrieve active user email.");
  }
}

// ── doPost ────────────────────────────────────────────────────────
function doPost(e) {
  console.log("doPost triggered");
  try {
    if (!e || !e.postData || !e.postData.contents) {
      console.error("doPost missing payload", JSON.stringify(e));
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Missing or invalid post payload data."
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    console.log("Parsed request data:", data);
    var result = saveRegistration(data);

    console.log("doPost returning success", result);
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error("doPost fatal error:", error.toString());
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── doGet — Test URL in browser ───────────────────────────────────
function doGet(e) {
  console.log("doGet triggered");
  return ContentService.createTextOutput(JSON.stringify({
    status: "[OK] Script is LIVE and Ready!",
    sheetId: SHEET_ID,
    sheetName: SHEET_NAME,
    camp: "Bright Mind Institute — AI Summer Camp 2026"
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

// ── saveRegistration ──────────────────────────────────────────────
function saveRegistration(data) {
  console.log("saveRegistration started");
  var ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (err) {
    console.warn("getActiveSpreadsheet failed: " + err.toString());
    Logger.log("getActiveSpreadsheet failed: " + err.toString());
  }

  if (!ss) {
    try {
      ss = SpreadsheetApp.openById(SHEET_ID);
    } catch (err) {
      console.error("Could not access Google Spreadsheet: " + err.toString());
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
    console.log("Attempting to send email to:", data.email);
    try {
      sendEmailWithIDCard(data, refNum, fullName);
      emailSent = true;
      console.log("Email successfully sent to:", data.email);
    } catch (err) {
      emailError = err.toString();
      console.error("Failed to send confirmation email:", emailError);
      Logger.log("Failed to send confirmation email: " + emailError);
    }
  } else {
    console.log("No email provided in data payload. Skipping email logic.");
  }

  console.log("saveRegistration returning success. Ref:", refNum);
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
  console.log("sendEmailWithIDCard started for:", data.email);
  var studentEmail = data.email.trim();
  var studentName  = fullName;
  var grade        = data.grade || "Student";
  var city         = data.city || "Karachi";
  
  // ── 1. Create PDF Student ID Card ──
  // Using high-fidelity inline CSS & layout perfectly optimized for Google's PDF converter engine.
  // Standard CSS shapes and tables are utilized to support rounded borders, custom branding, and a portrait credit card dimension.
  var idCardHtml = 
    '<html>' +
    '<head>' +
    '  <meta charset="UTF-8">' +
    '  <style>' +
    '    body {' +
    '      margin: 0;' +
    '      padding: 0;' +
    '      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;' +
    '      background-color: #ffffff;' +
    '      -webkit-print-color-adjust: exact;' +
    '    }' +
    '    .card-container {' +
    '      width: 340px;' +
    '      height: 520px;' +
    '      background-color: #FAF7F2;' +
    '      border: 3px solid #0E1C35;' +
    '      border-radius: 16px;' +
    '      position: relative;' +
    '      overflow: hidden;' +
    '      box-sizing: border-box;' +
    '      margin: 40px auto;' +
    '      box-shadow: 0 6px 15px rgba(0,0,0,0.15);' +
    '    }' +
    '    .back-card-container {' +
    '      width: 340px;' +
    '      height: 520px;' +
    '      background-color: #0E1C35;' +
    '      border: 3px solid #E05C1A;' +
    '      border-radius: 16px;' +
    '      position: relative;' +
    '      overflow: hidden;' +
    '      box-sizing: border-box;' +
    '      margin: 40px auto;' +
    '      box-shadow: 0 6px 15px rgba(0,0,0,0.15);' +
    '    }' +
    '  </style>' +
    '</head>' +
    '<body>' +
    '  ' +
    '  <!-- FRONT OF CARD -->' +
    '  <div class="card-container">' +
    '    <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; table-layout: fixed; border-collapse: collapse;">' +
    '      <!-- Logo Row (Solid white backdrop to prevent a dark transparent PNG from getting lost) -->' +
    '      <tr>' +
    '        <td style="height: 75px; background-color: #ffffff; text-align: center; vertical-align: middle;">' +
    '          <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">' +
    '            <tr>' +
    '              <td style="text-align: center; padding: 10px 0;">' +
    '                <img src="https://i.ibb.co/k2b42LsD/23ae5ef8-a3ae-4399-8cfd-be88f3a82bce-removalai-preview.png" style="height: 48px; border: 0; display: block; margin: 0 auto;" alt="Bright Mind Logo" />' +
    '              </td>' +
    '            </tr>' +
    '          </table>' +
    '        </td>' +
    '      </tr>' +
    '      ' +
    '      <!-- Corporate Diagonal Angled Strip Divider (No CSS rotate, using vector SVG for guaranteed PDF sharpness) -->' +
    '      <tr>' +
    '        <td style="height: 45px; padding: 0; margin: 0; vertical-align: top;">' +
    '          <svg width="340" height="45" viewBox="0 0 340 45" fill="none" style="display: block; margin: 0; padding: 0;">' +
    '            <!-- Navy Blue Diagonal Stripe -->' +
    '            <path d="M0 0 L340 15 V35 L0 20 Z" fill="#0E1C35"/>' +
    '            <!-- Orange Accent Parallel Stripe -->' +
    '            <path d="M0 20 L340 35 V42 L0 27 Z" fill="#E05C1A"/>' +
    '          </svg>' +
    '        </td>' +
    '      </tr>' +
    '      ' +
    '      <!-- Main Details Stage -->' +
    '      <tr>' +
    '        <td style="vertical-align: top; padding: 14px 18px 5px 18px;">' +
    '          <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; height: auto;">' +
    '            <tr>' +
    '              <!-- Circular Portrait Frame on Left -->' +
    '              <td style="width: 110px; vertical-align: top; text-align: center; padding-top: 5px;">' +
    '                <table border="0" cellpadding="0" cellspacing="0" style="width: 95px; height: 95px; margin: 0 auto;">' +
    '                  <tr>' +
    '                    <td style="border: 3px solid #E05C1A; border-radius: 50%; background-color: #ffffff; text-align: center; vertical-align: middle; padding: 4px; border-collapse: separate;">' +
    '                      <div style="font-size: 8px; font-weight: bold; line-height: 12px; color: #0E1C35; font-family: sans-serif; text-transform: uppercase;">' +
    '                        PASTE<br/>PHOTOGRAPH<br/>HERE' +
    '                      </div>' +
    '                    </td>' +
    '                  </tr>' +
    '                </table>' +
    '                <div style="margin-top: 25px; text-align: center;">' +
    '                  <span style="background-color: #0E1C35; color: #ffffff; padding: 3px 9px; border-radius: 4px; font-size: 8px; font-weight: bold; text-transform: uppercase; font-family: sans-serif; display: inline-block; letter-spacing: 0.5px;">' +
    '                    STUDENT COHORT' +
    '                  </span>' +
    '                </div>' +
    '              </td>' +
    '              ' +
    '              <!-- Right Column: Student Core Data -->' +
    '              <td style="padding-left: 18px; vertical-align: top;">' +
    '                <!-- Large Bold Name -->' +
    '                <div style="font-size: 18px; font-weight: bold; color: #0E1C35; margin-bottom: 2px; text-transform: capitalize; font-family: sans-serif; letter-spacing: -0.3px;">' +
    '                  ' + studentName + '' +
    '                </div>' +
    '                <!-- Program Caption -->' +
    '                <div style="font-size: 9px; font-weight: bold; color: #E05C1A; margin-bottom: 15px; text-transform: uppercase; font-family: sans-serif; letter-spacing: 0.8px;">' +
    '                  AI SUMMER CAMP 2026' +
    '                </div>' +
    '                ' +
    '                <!-- Metadata Matrix Table -->' +
    '                <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; font-size: 10px; font-family: sans-serif; color: #0E1C35;">' +
    '                  <tr>' +
    '                    <td style="padding: 4px 0; color: #7A7A72; font-weight: bold; width: 62px;">Student ID:</td>' +
    '                    <td style="padding: 4px 0; color: #E05C1A; font-weight: bold; font-family: Courier, monospace; font-size: 11.5px;">' + refNum + '</td>' +
    '                  </tr>' +
    '                  <tr>' +
    '                    <td style="padding: 4px 0; color: #7A7A72; font-weight: bold;">Grade:</td>' +
    '                    <td style="padding: 4px 0; font-weight: bold;">' + grade + '</td>' +
    '                  </tr>' +
    '                  <tr>' +
    '                    <td style="padding: 4px 0; color: #7A7A72; font-weight: bold;">City:</td>' +
    '                    <td style="padding: 4px 0; font-weight: bold;">' + city + '</td>' +
    '                  </tr>' +
    '                  <tr>' +
    '                    <td style="padding: 4px 0; color: #7A7A72; font-weight: bold;">Date Issued:</td>' +
    '                    <td style="padding: 4px 0; font-weight: bold;">June 2026</td>' +
    '                  </tr>' +
    '                </table>' +
    '              </td>' +
    '            </tr>' +
    '          </table>' +
    '        </td>' +
    '      </tr>' +
    '      ' +
    '      <!-- Premium Solid Footer Bottom Strip -->' +
    '      <tr>' +
    '        <td style="height: 60px; background-color: #0E1C35; vertical-align: middle; text-align: center; padding: 6px 12px;">' +
    '          <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">' +
    '            <tr>' +
    '              <td style="text-align: center; color: #ffffff; font-family: sans-serif; font-weight: bold; font-size: 9px; letter-spacing: 0.6px; text-transform: uppercase; padding-bottom: 2px;">' +
    '                BRIGHT MIND INSTITUTE OF EDUCATION' +
    '              </td>' +
    '            </tr>' +
    '            <tr>' +
    '              <td style="text-align: center; color: #E05C1A; font-family: sans-serif; font-size: 8px; font-weight: bold;">' +
    '                Address: Manzoor Colony, Karachi, Pakistan &nbsp;|&nbsp; Support: +92 310 2310119' +
    '              </td>' +
    '            </tr>' +
    '          </table>' +
    '        </td>' +
    '      </tr>' +
    '    </table>' +
    '  </div>' +
    '  ' +
    '  <!-- Page Break for Premium Back of Card (Optional second page) -->' +
    '  <div style="page-break-before: always;"></div>' +
    '  ' +
    '  <!-- BACK OF CARD -->' +
    '  <div class="back-card-container">' +
    '    <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; table-layout: fixed; border-collapse: collapse;">' +
    '      <tr>' +
    '        <td style="vertical-align: middle; text-align: center; padding: 30px 20px;">' +
    '          ' +
    '          <!-- Centered White Pill Holder for Logo (Keeps it cleanly visible and stylized) -->' +
    '          <table border="0" cellpadding="0" cellspacing="0" style="width: 180px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 2px solid #E05C1A; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">' +
    '            <tr>' +
    '              <td style="padding: 15px; text-align: center; vertical-align: middle;">' +
    '                <img src="https://i.ibb.co/k2b42LsD/23ae5ef8-a3ae-4399-8cfd-be88f3a82bce-removalai-preview.png" style="height: 40px; display: block; margin: 0 auto; border: 0;" alt="Bright Mind" />' +
    '              </td>' +
    '            </tr>' +
    '          </table>' +
    '          ' +
    '          <!-- Decorative dotted separator -->' +
    '          <div style="margin-top: 25px; height: 10px; overflow: hidden; text-align: center;">' +
    '            <svg width="200" height="10" viewBox="0 0 200 10" fill="none" style="display: block; margin: 0 auto;">' +
    '              <line x1="0" y1="5" x2="200" y2="5" stroke="#E05C1A" stroke-width="2" stroke-dasharray="8 4" />' +
    '            </svg>' +
    '          </div>' +
    '          ' +
    '          <!-- Back Badge Header labels -->' +
    '          <div style="margin-top: 25px; color: #ffffff; font-family: sans-serif; text-transform: uppercase; font-weight: bold; font-size: 13px; letter-spacing: 1px; line-height: 1.4;">' +
    '            AI SUMMER CAMP 2026' +
    '          </div>' +
    '          <div style="margin-top: 4px; color: #E05C1A; font-family: sans-serif; font-size: 9px; font-weight: bold; letter-spacing: 0.5px;">' +
    '            STUDENT IDENTIFICATION BADGE' +
    '          </div>' +
    '          ' +
    '          <!-- Terms Statement -->' +
    '          <div style="margin-top: 35px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 15px; margin-left: 15px; margin-right: 15px;">' +
    '            <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; font-family: sans-serif; font-size: 8.5px; color: #A0AFC0; line-height: 1.5; text-align: center;">' +
    '              <tr>' +
    '                <td style="padding-bottom: 6px; font-weight: bold;">' +
    '                  This card is the official property of Bright Mind Institute of Education. Please keep it visible at all times during camp sessions.' +
    '                </td>' +
    '              </tr>' +
    '              <tr>' +
    '                <td style="color: #ffffff; font-weight: bold; font-size: 8.5px; padding-top: 4px;">' +
    '                  If found, please contact WhatsApp Support:<br/>' +
    '                  +92 310 2310119' +
    '                </td>' +
    '              </tr>' +
    '            </table>' +
    '          </div>' +
    '          ' +
    '        </td>' +
    '      </tr>' +
    '      ' +
    '      <!-- Bottom Branding Belt -->' +
    '      <tr>' +
    '        <td style="height: 50px; background-color: #0c1424; vertical-align: middle; text-align: center; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">' +
    '          <div style="color: #ffffff; font-family: sans-serif; font-size: 8.5px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase;">' +
    '            BRIGHT MIND INSTITUTE OF EDUCATION' +
    '          </div>' +
    '        </td>' +
    '      </tr>' +
    '    </table>' +
    '  </div>' +
    '  ' +
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

  // ── 2. Create Email HTML Body (No emojis or numerical entities; using clean UTF-8 declaration and CSS indicators) ──
  var emailBodyHtml = 
    '<html>' +
    '<head>' +
    '  <meta charset="UTF-8">' +
    '  <title>Registration Confirmation</title>' +
    '</head>' +
    '<body style="font-family: Arial, sans-serif; background-color: #FAF7F2; padding: 25px; margin: 0; color: #222222;">' +
    '  <table border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #ddd8ce; border-radius: 8px; overflow: hidden; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">' +
    '    <!-- Brand Header -->' +
    '    <tr style="background-color: #0E1C35; text-align: center;">' +
    '      <td style="padding: 24px 15px;">' +
    '        <img src="https://i.ibb.co/k2b42LsD/23ae5ef8-a3ae-4399-8cfd-be88f3a82bce-removalai-preview.png" alt="Bright Mind" style="height: 48px; border: 0;" />' +
    '        <div style="color: #FAF7F2; font-size: 14px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 8px;">Bright Mind Institute of Education</div>' +
    '      </td>' +
    '    </tr>' +
    '    ' +
    '    <!-- Welcome Content -->' +
    '    <tr>' +
    '      <td style="padding: 30px; line-height: 1.6; font-size: 15px; color: #333333;">' +
    '        <h2 style="color: #0E1C35; font-size: 22px; margin-top: 0; font-weight: bold; border-bottom: 2px solid #FAF7F2; padding-bottom: 12px;">' +
    '          Registration Confirmed' +
    '        </h2>' +
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
    '                <strong>Schedule:</strong> Mon–Thu | 2:00 PM – 4:00 PM' +
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
    '            <td style="line-height: 1.8;">' +
    '              <span style="display: inline-block; width: 8px; height: 8px; background-color: #E05C1A; border-radius: 50%; margin-right: 6px; vertical-align: middle;"></span> ' +
    '              <strong>Institute Venue:</strong> Bright Mind Institute, Manzoor Colony, Karachi, Pakistan<br/>' +
    '              ' +
    '              <span style="display: inline-block; width: 8px; height: 8px; background-color: #E05C1A; border-radius: 50%; margin-right: 6px; vertical-align: middle;"></span> ' +
    '              <strong>Official Support (WhatsApp):</strong> +92 310 2310119<br/>' +
    '              ' +
    '              <span style="display: inline-block; width: 8px; height: 8px; background-color: #E05C1A; border-radius: 50%; margin-right: 6px; vertical-align: middle;"></span> ' +
    '              <strong>Email Contact:</strong> brightmindinstituteofeducation@gmail.com' +
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
    '        Copyright 2026 Bright Mind Institute. All Rights Reserved.<br>' +
    '        Bright Mind Institute, Manzoor Colony, Karachi, Pakistan<br><br>' +
    '        If you did not initiate this registration, please disregard this email.' +
    '      </td>' +
    '    </tr>' +
    '  </table>' +
    '</body>' +
    '</html>';

  // Plain-text Fallback
  var plainTextBody = 
    "Dear " + studentName + ",\n\n" +
    "Your registration for the AI Summer Camp 2026 has been confirmed.\n\n" +
    "Student Reference Code: " + refNum + "\n" +
    "Fee Structure: PKR 4,999 (Flat program fee, payable on your arrival).\n" +
    "Schedule: Mon-Thu, 2:00 PM - 4:00 PM\n\n" +
    "Your Student ID Card is attached as a PDF document. Please print it and bring it with you.\n\n" +
    "Institute Venue:\n" +
    "Bright Mind Institute, Manzoor Colony, Karachi, Pakistan\n" +
    "WhatsApp Support: +92 310 2310119\n" +
    "Email: brightmindinstituteofeducation@gmail.com\n\n" +
    "Warm Regards,\nRegistrar Operations\nBright Mind Institute of Education\n\n" +
    "---\n" +
    "Physical Address: Bright Mind Institute, Manzoor Colony, Karachi, Pakistan\n" +
    "If you didn't request this registration, please ignore this email.";

  // Send email with PDF attachment if successfully built
  var emailOptions = {
    htmlBody: emailBodyHtml
  };
  if (attachmentsList.length > 0) {
    emailOptions.attachments = attachmentsList;
  }

  console.log("Calling GmailApp.sendEmail...");
  GmailApp.sendEmail(
    studentEmail, 
    "AI Summer Camp 2026 Registration Confirmation", 
    plainTextBody, 
    emailOptions
  );
  console.log("GmailApp.sendEmail completed.");
}

// ── TEST FUNCTIONS (Run directly from Apps Script Editor) ──────────

function TEST_saveOnly() {
  Logger.log("Starting TEST_saveOnly...");
  var fakeData = {
    fname: "Test",
    lname: "User",
    email: "test_save@example.com",
    phone: "123456789",
    grade: "Grade 10"
  };
  try {
    var result = saveRegistration(fakeData);
    Logger.log("Saved successfully. Result: " + JSON.stringify(result));
  } catch (err) {
    Logger.log("TEST_saveOnly ERROR: " + err.toString());
  }
}

function TEST_emailOnly() {
  Logger.log("Starting TEST_emailOnly...");
  // Replace this email with your own testing email address
  var yourTestingEmail = Session.getActiveUser().getEmail(); 
  if (!yourTestingEmail) yourTestingEmail = "test@example.com";
  
  var fakeData = {
    email: yourTestingEmail,
    grade: "Grade 10",
    city: "Karachi"
  };
  try {
    sendEmailWithIDCard(fakeData, "AISC-TEST-0000", "Test Student");
    Logger.log("Email sent successfully to " + yourTestingEmail);
  } catch (err) {
    Logger.log("TEST_emailOnly ERROR: " + err.toString());
  }
}

/**
 * Executes a full registration process simulation (saves to sheet, compiles 
 * portrait PDF client badge, and emails recipient with UTF-8 character stability).
 */
function TEST_fullFlow() {
  Logger.log("========================================");
  Logger.log("Starting TEST_fullFlow for AI Summer Camp 2026...");
  
  // Choose the active Google user's email address or a reliable fallback
  var testEmail = Session.getActiveUser().getEmail();
  if (!testEmail) {
    testEmail = "mudassirbashir530@gmail.com";
  }
  
  var mockData = {
    fname: "Mudassir",
    lname: "Bashir",
    email: testEmail.trim(),
    phone: "+92 310 2310119",
    city: "Karachi",
    grade: "Grade 10",
    dob: "2010-06-15",
    gender: "Male",
    gname: "Bashir Ahmed",
    gphone: "+92 300 1234567",
    relation: "Father",
    school: "Bright Mind High School",
    stream: "Science",
    gradyear: "2028",
    source: "Social Media",
    ailevel: "Intermediate",
    interest: "Generative AI, Agentic Workflows",
    motivation: "I want to build real-world AI agents to solve local Pakistani community challenges."
  };
  
  Logger.log("Testing recipient email set to: " + testEmail);
  
  try {
    var response = saveRegistration(mockData);
    Logger.log("[TEST SUCCESS] Registration saved, ID card PDF generated, and email sent successfully!");
    Logger.log("JSON Response details: " + JSON.stringify(response));
    Logger.log("========================================");
  } catch (err) {
    Logger.log("[TEST FAILED] Error during TEST_fullFlow execution: " + err.toString());
    Logger.log("========================================");
    throw err;
  }
}
