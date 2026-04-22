import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactSubmissionSchema } from "@/lib/validation";
import { getPayloadClient } from "@/lib/payload";
import { hasDatabaseUri } from "@/lib/database";

function getRequestIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(getRequestIp(request), {
    maxRequests: 5,
    windowMs: 60_000
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const parsed = contactSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ error: "Spam rejected." }, { status: 400 });
  }

  if (!hasDatabaseUri()) {
    return NextResponse.json({ ok: true, stored: false }, { status: 202 });
  }

  try {
    const payload = await getPayloadClient();

    await payload.create({
      collection: "submissions",
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        preferredChannel: parsed.data.preferredChannel || "email",
        message: parsed.data.message,
        status: "new"
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Graceful fallback keeps form UX alive even if DB/CMS is unavailable.
    console.warn("Contact submission fallback mode:", error);
    return NextResponse.json({ ok: true, stored: false }, { status: 202 });
  }
}
