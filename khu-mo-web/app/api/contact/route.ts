import { NextResponse } from "next/server";
import { z } from "zod";
import { CONTACT_LIMITS, INTEREST_VALUES } from "@/lib/contact";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.nameMin, "Please enter your name.")
    .max(CONTACT_LIMITS.nameMax, "Name is too long."),
  email: z
    .string()
    .trim()
    .max(CONTACT_LIMITS.emailMax, "Email is too long.")
    .email("Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .max(CONTACT_LIMITS.phoneMax, "Phone number is too long.")
    .optional()
    .or(z.literal("")),
  interest: z.enum(INTEREST_VALUES),
  message: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.messageMin, "Please share a bit more detail.")
    .max(CONTACT_LIMITS.messageMax, "Message is too long."),
  website: z.string().optional(),
});

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

  const parsed = contactSchema.safeParse(payload);
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

  const { name, email, phone, interest, message, website } = parsed.data;

  // Honeypot: real visitors never see this field, so silently accept and drop bot submissions.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const trimmedPhone = phone?.trim();
  const leadPayload = {
    name,
    email,
    phone: trimmedPhone ? trimmedPhone : undefined,
    interest,
    message,
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
