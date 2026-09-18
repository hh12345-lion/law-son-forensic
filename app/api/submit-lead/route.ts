import { NextResponse } from "next/server";
import { writeContactLeadToSheetSafely } from "@/lib/leads/contactLead";
import { getLeadWebhookUrl, notifyLeadWebhook } from "@/lib/leadNotification";
import { isGoogleSheetsConfigured } from "@/lib/google-sheets";

function sanitize(str: string, maxLen: number): string {
  return str.replace(/<[^>]*>/g, "").trim().slice(0, maxLen);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fullName?: string;
      email?: string;
      phone?: string;
      formType?: string;
      organisation?: string;
      instructionType?: string;
      practiceArea?: string;
      deadline?: string;
      message?: string;
      Message?: string;
      description?: string;
      enquiry?: string;
      details?: string;
      summary?: string;
      notes?: string;
      matter?: string;
      referral?: string;
    };

    const fullName = sanitize(body.fullName ?? "", 200);
    const email = sanitize(body.email ?? "", 320).toLowerCase();
    const phone = sanitize(body.phone ?? "", 50);
    const formType = sanitize(body.formType ?? "contact", 40) || "contact";
    const organisation = sanitize(body.organisation ?? "", 200);
    const instructionType = sanitize(body.instructionType ?? "", 100);
    const practiceArea = sanitize(body.practiceArea ?? "", 100);
    const deadline = sanitize(body.deadline ?? "", 50);
    const message = sanitize(
      body.message ??
        body.Message ??
        body.description ??
        body.enquiry ??
        body.details ??
        body.summary ??
        body.notes ??
        body.matter ??
        "",
      4000
    );
    const referral = sanitize(body.referral ?? "", 100);

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: "fullName and email are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (formType === "contact" && !message) {
      return NextResponse.json(
        { success: false, error: "message is required" },
        { status: 400 }
      );
    }

    const webhookUrl = getLeadWebhookUrl();
    const sheetsConfigured = isGoogleSheetsConfigured();

    if (!webhookUrl && !sheetsConfigured) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Lead storage is not configured. Set Lead_notification_url and/or Google Sheets env vars.",
        },
        { status: 503 }
      );
    }

    let webhookOk = false;
    if (webhookUrl) {
      try {
        const result = await notifyLeadWebhook({
          fullName,
          email,
          phone,
          message,
        });
        webhookOk = result.ok;
        if (!webhookOk) {
          console.error("[submit-lead] webhook failed — continuing with Sheets");
        }
      } catch (error) {
        console.error("[submit-lead] webhook error:", error);
      }
    } else {
      console.warn(
        "[submit-lead] Lead_notification_url missing — continuing with Sheets fallback"
      );
    }

    const sheetsOk = await writeContactLeadToSheetSafely({
      fullName,
      email,
      phone,
      formType,
      organisation,
      instructionType,
      practiceArea,
      deadline,
      message,
      referral,
    });

    if (!webhookOk && !sheetsOk) {
      return NextResponse.json(
        { success: false, error: "Failed to save your enquiry" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      forwarded: webhookOk,
      writtenToSheet: sheetsOk,
    });
  } catch (error) {
    console.error("submit-lead error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
