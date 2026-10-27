import { NextResponse } from "next/server";
import { z } from "zod";
import { buildEnquirySchema } from "@/lib/contact";
import { getDictionary } from "@/lib/i18n";
import { getProduct } from "@/lib/products";

const enquirySchema = buildEnquirySchema(getDictionary("en").form.validation);

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const WEBHOOK_TIMEOUT_MS = 5000;

// Per-instance only: resets on restart and is not shared across serverless instances.
const recentRequests = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  for (const [key, timestamps] of recentRequests) {
    if (timestamps[timestamps.length - 1] <= windowStart) {
      recentRequests.delete(key);
    }
  }

  const timestamps = (recentRequests.get(ip) ?? []).filter((time) => time > windowStart);
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    recentRequests.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  recentRequests.set(ip, timestamps);
  return false;
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests." },
      { status: 429, headers: { "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1000) } },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const { website, consent, ...fields } = parsed.data;

  // Honeypot: real visitors never see this field, so silently accept and drop bot submissions.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const product = fields.product ? getProduct(fields.product) : undefined;
  const leadPayload = {
    ...Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== "" && value !== undefined)),
    productName: product?.name.vi,
    consent,
    createdAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.LEADS_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    console.info("[contact-lead]", leadPayload);
    return NextResponse.json({ ok: true });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadPayload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }
  } catch (error) {
    console.error("[contact-lead] webhook delivery failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not deliver enquiry." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
