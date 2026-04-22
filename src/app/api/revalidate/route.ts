import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

type RevalidatePayload = {
  secret: string;
  tags?: string[];
  source?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as RevalidatePayload;
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret || body.secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const tags = body.tags?.length
    ? body.tags
    : ["home-page", "site-settings", "portfolio-sections"];

  tags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({
    revalidated: true,
    tags,
    source: body.source ?? "manual"
  });
}
