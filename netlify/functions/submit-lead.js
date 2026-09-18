/**
 * Netlify backup for /api/submit-lead — soft webhook + soft Sheets.
 * Kept if an old redirect is still active on a deploy.
 */

const { google } = require("googleapis");

const BRAND_NAME = "Lawson Forensic";
const DEFAULT_SHEET_TAB_NAME = BRAND_NAME;

function trimEnvQuotes(value) {
  if (value == null) return undefined;
  let v = String(value).trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1).trim();
  }
  return v || undefined;
}

function normalizeSpreadsheetId(raw) {
  const trimmed = trimEnvQuotes(raw);
  if (!trimmed) return undefined;
  const fromUrl = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (fromUrl && fromUrl[1]) return fromUrl[1];
  return trimmed;
}

function resolveSheetTabName(override) {
  const raw = trimEnvQuotes(override || process.env.GOOGLE_SHEET_TAB_NAME) || DEFAULT_SHEET_TAB_NAME;
  return raw.replace(/\s+/g, " ").trim();
}

function appendRangeForTab(sheetName, columns) {
  const name = sheetName || DEFAULT_SHEET_TAB_NAME;
  const cols = columns || "A:A";
  if (/^[A-Za-z0-9_]+$/.test(name)) return `${name}!${cols}`;
  return `'${name.replace(/'/g, "''")}'!${cols}`;
}

function getLeadWebhookUrl() {
  return (
    process.env.Lead_notification_url ||
    process.env.LEAD_NOTIFICATION_URL ||
    ""
  );
}

function getSiteDomain() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.lawsonforensic.com";
  try {
    const hostname = new URL(siteUrl).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    return "lawsonforensic.com";
  }
}

function normalizePrivateKey(raw) {
  const trimmed = trimEnvQuotes(raw);
  if (!trimmed) return undefined;

  let key = trimmed;
  for (let i = 0; i < 3 && key.includes("\\n"); i += 1) {
    key = key.replace(/\\n/g, "\n");
  }
  key = key.trim();

  if (key.includes("BEGIN PRIVATE KEY") && !key.includes("\n")) {
    key = key
      .replace("-----BEGIN PRIVATE KEY-----", "-----BEGIN PRIVATE KEY-----\n")
      .replace("-----END PRIVATE KEY-----", "\n-----END PRIVATE KEY-----");
  }

  return key.includes("BEGIN PRIVATE KEY") ? key : undefined;
}

function isGoogleSheetsConfigured() {
  return Boolean(
    trimEnvQuotes(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) &&
      normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY) &&
      normalizeSpreadsheetId(process.env.GOOGLE_SHEET_ID)
  );
}

function sanitize(str) {
  return String(str || "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

async function appendLeadToSheet(payload) {
  if (!isGoogleSheetsConfigured()) {
    console.warn("[submit-lead fn] Sheets not configured — skip");
    return false;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: trimEnvQuotes(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL),
      private_key: normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = normalizeSpreadsheetId(process.env.GOOGLE_SHEET_ID);
  const sheetName = resolveSheetTabName();
  const formType =
    String(payload.formType || "contact").toLowerCase() === "instruct"
      ? "Instruct"
      : "Contact";

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: appendRangeForTab(sheetName, "A:L"),
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          BRAND_NAME,
          sanitize(payload.fullName),
          String(payload.email || "").toLowerCase().trim(),
          sanitize(payload.phone),
          formType,
          sanitize(payload.message),
          sanitize(payload.organisation),
          sanitize(payload.instructionType),
          sanitize(payload.practiceArea),
          sanitize(payload.deadline),
          sanitize(payload.referral),
        ],
      ],
    },
  });

  return true;
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON body" }),
    };
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = (() => {
    const keys = [
      "message",
      "Message",
      "description",
      "enquiry",
      "details",
      "summary",
      "notes",
      "matter",
    ];
    for (const key of keys) {
      if (body[key] != null && String(body[key]).trim()) {
        return String(body[key]).trim();
      }
    }
    return "";
  })();

  if (!fullName || !email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "fullName and email are required" }),
    };
  }

  let forwarded = false;
  const webhookUrl = getLeadWebhookUrl();

  if (webhookUrl) {
    try {
      const outbound = {
        "Full Name": fullName,
        Email: email,
        "Phone Number": phone,
        "Brand name": BRAND_NAME,
        domain: getSiteDomain(),
        message,
      };
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(outbound),
      });
      if (!response.ok) {
        console.error(
          "Webhook POST failed:",
          response.status,
          await response.text()
        );
      } else {
        forwarded = true;
      }
    } catch (error) {
      console.error("Webhook POST error:", error);
    }
  } else {
    console.warn(
      "Lead_notification_url not configured — continuing with Sheets fallback"
    );
  }

  let writtenToSheet = false;
  try {
    writtenToSheet = await appendLeadToSheet(body);
  } catch (err) {
    console.error("Google Sheets error (submit-lead fn):", {
      message: err && err.message,
      tab: resolveSheetTabName(),
    });
  }

  if (!forwarded && !writtenToSheet) {
    return {
      statusCode: 502,
      body: JSON.stringify({ message: "Failed to save your enquiry" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      forwarded,
      writtenToSheet,
    }),
  };
};
