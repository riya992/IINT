/**
 * Paste this ENTIRE file into Google Sheet → Extensions → Apps Script
 * Then: Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy the /exec URL into .env as VITE_GOOGLE_SHEET_URL
 */

function parsePayload_(e) {
  if (!e) return {};

  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }

  if (e.postData && e.postData.contents) {
    const type = (e.postData.type || "").toLowerCase();
    const body = e.postData.contents;

    if (type.indexOf("application/json") !== -1 || body.trim().charAt(0) === "{") {
      try {
        return JSON.parse(body);
      } catch (err) {
        return { raw: body };
      }
    }

    const out = {};
    body.split("&").forEach(function (pair) {
      const idx = pair.indexOf("=");
      if (idx === -1) return;
      const key = decodeURIComponent(pair.slice(0, idx).replace(/\+/g, " "));
      const val = decodeURIComponent(pair.slice(idx + 1).replace(/\+/g, " "));
      out[key] = val;
    });
    return out;
  }

  return {};
}

function saveToSheet_(p) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Form Type",
      "Name",
      "Phone",
      "Email",
      "State",
      "City",
      "Course",
      "Message",
      "Submitted At",
    ]);
  }

  sheet.appendRow([
    p.formType || "enquiry",
    p.name || "",
    p.phone || "",
    p.email || "",
    p.state || "",
    p.city || "",
    p.course || p.program || p.subject || "",
    p.message || p.vision || "",
    p.submittedAt || new Date().toISOString(),
  ]);
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function handleSubmit_(e) {
  try {
    const p = parsePayload_(e);
    saveToSheet_(p);
    return jsonResponse_({ success: true });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  }
}

function doGet(e) {
  return handleSubmit_(e);
}

function doPost(e) {
  return handleSubmit_(e);
}
