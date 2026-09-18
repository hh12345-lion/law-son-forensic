import { getSiteDomain } from "@/lib/seo";

export const BRAND_NAME = "Lawson Forensic";

export type LeadPayload = {
  fullName: string;
  email: string;
  phone: string;
  /** Free-text enquiry body — always sent to n8n as `message`. */
  message?: string;
};

export function getLeadWebhookUrl(): string | undefined {
  return (
    process.env.Lead_notification_url ||
    process.env.LEAD_NOTIFICATION_URL ||
    undefined
  );
}

export function buildLeadWebhookBody(payload: LeadPayload) {
  return {
    "Full Name": payload.fullName,
    Email: payload.email,
    "Phone Number": payload.phone ?? "",
    "Brand name": BRAND_NAME,
    domain: getSiteDomain(),
    message: payload.message ?? "",
  };
}

export async function notifyLeadWebhook(
  payload: LeadPayload
): Promise<{ forwarded: boolean; ok: boolean }> {
  const webhookUrl = getLeadWebhookUrl();

  if (!webhookUrl) {
    console.warn(
      "Lead_notification_url not configured — lead logged but not forwarded."
    );
    console.log("Lead submission:", {
      ...payload,
      brand: BRAND_NAME,
      domain: getSiteDomain(),
    });
    return { forwarded: false, ok: true };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildLeadWebhookBody(payload)),
  });

  if (!response.ok) {
    console.error("Webhook POST failed:", response.status, await response.text());
    return { forwarded: false, ok: false };
  }

  return { forwarded: true, ok: true };
}
