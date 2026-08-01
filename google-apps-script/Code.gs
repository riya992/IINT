/**
 * Paste this ENTIRE file into Google Sheet → Extensions → Apps Script
 * Then: Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy the /exec URL into .env as VITE_GOOGLE_SHEET_URL
 */

var PREFERRED_COLUMN_ORDER = [
  "formType",
  "name",
  "phone",
  "email",
  "state",
  "city",
  "course",
  "program",
  "subject",
  "message",
  "vision",
  "archetype",
  "submittedAt",
];

function parsePayload_(e) {
  if (!e) return {};

  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }

  if (e.postData && e.postData.contents) {
    var type = (e.postData.type || "").toLowerCase();
    var body = e.postData.contents;

    if (type.indexOf("application/json") !== -1 || body.trim().charAt(0) === "{") {
      try {
        return JSON.parse(body);
      } catch (err) {
        return { raw: body };
      }
    }

    var out = {};
    body.split("&").forEach(function (pair) {
      var idx = pair.indexOf("=");
      if (idx === -1) return;
      var key = decodeURIComponent(pair.slice(0, idx).replace(/\+/g, " "));
      var val = decodeURIComponent(pair.slice(idx + 1).replace(/\+/g, " "));
      out[key] = val;
    });
    return out;
  }

  return {};
}

function getExistingHeaders_(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol === 0) return [];

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  return headers
    .map(function (h) {
      return String(h || "").trim();
    })
    .filter(function (h) {
      return h.length > 0;
    });
}

function mergeHeaders_(existingHeaders, payloadKeys) {
  var headers = existingHeaders.slice();
  var seen = {};

  headers.forEach(function (h) {
    seen[h] = true;
  });

  PREFERRED_COLUMN_ORDER.forEach(function (key) {
    if (payloadKeys.indexOf(key) !== -1 && !seen[key]) {
      headers.push(key);
      seen[key] = true;
    }
  });

  payloadKeys.forEach(function (key) {
    if (!seen[key]) {
      headers.push(key);
      seen[key] = true;
    }
  });

  return headers;
}

function saveToSheet_(p) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var payloadKeys = Object.keys(p);
  var existingHeaders = getExistingHeaders_(sheet);
  var headers = mergeHeaders_(existingHeaders, payloadKeys);

  if (existingHeaders.length === 0) {
    sheet.appendRow(headers);
  } else if (headers.length > existingHeaders.length) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  var row = headers.map(function (header) {
    var value = p[header];
    return value === undefined || value === null ? "" : String(value);
  });

  sheet.appendRow(row);
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function handleSubmit_(e) {
  try {
    var p = parsePayload_(e);
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
