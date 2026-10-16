import { appendRow, DEFAULT_SHEET_TAB_NAME, isGoogleSheetsConfigured } from "@/lib/google-sheets";
import { BRAND_NAME } from "@/lib/leadNotification";

export type ContactLeadPayload = {
  fullName: string;
  email: string;
  phone?: string;
  formType?: string;
  organisation?: string;
  instructionType?: string;
  practiceArea?: string;
  deadline?: string;
  message?: string;
  referral?: string;
};

/** One shared tab header order (paste as row 1): */
export const SHEET_HEADER_ROW = [
  "Timestamp",
  "Brand name",
  "Full Name",
  "Email",
  "Phone Number",
  "Form Type",
  "Case Description",
  "Organisation",
  "Instruction Type",
  "Practice Area",
  "Deadline",
  "Referral",
] as const;

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

function formTypeLabel(formType?: string): string {
  const raw = (formType || "contact").trim().toLowerCase();
  if (raw === "instruct") return "Instruct";
  if (raw === "contact") return "Contact";
  return sanitize(formType || "Contact") || "Contact";
}

export function formatContactLeadRow(payload: ContactLeadPayload): string[] {
  return [
    new Date().toISOString(),
    BRAND_NAME,
    sanitize(payload.fullName),
    payload.email.toLowerCase().trim(),
    sanitize(payload.phone || ""),
    formTypeLabel(payload.formType),
    sanitize(payload.message || ""),
    sanitize(payload.organisation || ""),
    sanitize(payload.instructionType || ""),
    sanitize(payload.practiceArea || ""),
    sanitize(payload.deadline || ""),
    sanitize(payload.referral || ""),
  ];
}

/**
 * Soft-fail Sheets write. Returns false when not configured or append fails.
 * Never throws: webhook is the primary lead path.
 */
export async function writeContactLeadToSheetSafely(
  payload: ContactLeadPayload
): Promise<boolean> {
  if (!isGoogleSheetsConfigured()) {
    console.warn("[sheets] not configured, skip contact lead");
    return false;
  }

  try {
    await appendRow(formatContactLeadRow(payload));
    return true;
  } catch (error) {
    console.error("Google Sheets write failed (soft-fail):", {
      message: error instanceof Error ? error.message : "Unknown error",
      spreadsheetId: process.env.GOOGLE_SHEET_ID
        ? `${process.env.GOOGLE_SHEET_ID.slice(0, 8)}...`
        : "missing",
      tab: (process.env.GOOGLE_SHEET_TAB_NAME || DEFAULT_SHEET_TAB_NAME).trim(),
      timestamp: new Date().toISOString(),
    });
    return false;
  }
}
