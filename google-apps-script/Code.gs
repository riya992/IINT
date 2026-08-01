/**
 * IINT Enquiry Database - Google Apps Script
 *
 * Setup:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions -> Apps Script.
 * 3. Paste this full file into Code.gs.
 * 4. Deploy -> New deployment -> Web app.
 * 5. Execute as: Me.
 * 6. Who has access: Anyone.
 * 7. Copy the /exec URL into website .env:
 *    VITE_GOOGLE_SHEET_URL="https://script.google.com/macros/s/XXXXX/exec"
 */

const SHEET_NAME = "IINT Enquiries";

const HEADERS = [
  "Timestamp",
  "Form Type",
  "Name",
  "Phone",
  "Email",
  "State",
  "City",
  "Course / Program",
  "Subject",
  "Message / Vision",
  "Archetype",
  "Source Page",
  "User Agent",
  "Submission ID"
];

function doGet(e) {
  return handleRequest_(e);
}

function doPost(e) {
  return handleRequest_(e);
}

function handleRequest_(e) {
  try {
    const payload = parsePayload_(e);
    const tokenError = validateToken_(payload);
    if (tokenError) {
      return jsonResponse_({ success: false, error: tokenError });
    }

    if (payload.ping === "1") {
      return jsonResponse_({
        success: true,
        message: "IINT enquiry endpoint is active",
        sheetName: SHEET_NAME
      });
    }

    const validationError = validatePayload_(payload);
    if (validationError) {
      return jsonResponse_({ success: false, error: validationError });
    }

    const sheet = getDatabaseSheet_();
    ensureHeaderRow_(sheet);
    appendEnquiry_(sheet, payload);

    return jsonResponse_({
      success: true,
      message: "Enquiry saved successfully",
      submissionId: payload.submissionId || ""
    });
  } catch (err) {
    return jsonResponse_({
      success: false,
      error: err && err.message ? err.message : String(err)
    });
  }
}

function validateToken_(payload) {
  const expectedToken = PropertiesService
    .getScriptProperties()
    .getProperty("ENQUIRY_API_TOKEN");

  if (!expectedToken) return "";

  const receivedToken = clean_(payload.apiToken || payload.token || payload.ENQUIRY_API_TOKEN);
  if (receivedToken !== expectedToken) {
    return "Invalid enquiry API token";
  }

  return "";
}

function parsePayload_(e) {
  const payload = {};

  if (e && e.parameter) {
    Object.keys(e.parameter).forEach(function (key) {
      payload[key] = e.parameter[key];
    });
  }

  if (e && e.postData && e.postData.contents) {
    const body = e.postData.contents;
    const type = String(e.postData.type || "").toLowerCase();

    if (type.indexOf("application/json") !== -1 || body.trim().charAt(0) === "{") {
      try {
        const parsed = JSON.parse(body);
        Object.keys(parsed).forEach(function (key) {
          payload[key] = parsed[key];
        });
      } catch (err) {
        payload.rawBody = body;
      }
    } else {
      body.split("&").forEach(function (pair) {
        if (!pair) return;
        const idx = pair.indexOf("=");
        const rawKey = idx === -1 ? pair : pair.slice(0, idx);
        const rawVal = idx === -1 ? "" : pair.slice(idx + 1);
        const key = decodeURIComponent(rawKey.replace(/\+/g, " "));
        const val = decodeURIComponent(rawVal.replace(/\+/g, " "));
        payload[key] = val;
      });
    }
  }

  return payload;
}

function validatePayload_(payload) {
  if (!clean_(payload.name)) return "Name is required";
  if (!clean_(payload.phone) && !clean_(payload.email)) {
    return "Phone or email is required";
  }
  return "";
}

function getDatabaseSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    return;
  }

  const existing = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const matches = HEADERS.every(function (header, idx) {
    return existing[idx] === header;
  });

  if (!matches) {
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
}

function appendEnquiry_(sheet, payload) {
  const now = new Date();
  const row = [
    now,
    clean_(payload.formType || "enquiry"),
    clean_(payload.name),
    clean_(payload.phone),
    clean_(payload.email),
    clean_(payload.state),
    clean_(payload.city),
    clean_(payload.course || payload.program || payload.subject),
    clean_(payload.subject),
    clean_(payload.message || payload.vision),
    clean_(payload.archetype),
    clean_(payload.sourcePage),
    clean_(payload.userAgent),
    clean_(payload.submissionId)
  ];

  sheet.appendRow(row);
  sheet.autoResizeColumns(1, HEADERS.length);
}

function clean_(value) {
  return String(value || "").trim();
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
