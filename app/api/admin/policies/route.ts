import { NextResponse } from "next/server";
import { getStoreState, upsertPolicy } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ policies: getStoreState().policies });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    id?: string;
    category?: string;
    title?: string;
    content?: string;
    active?: boolean;
  };

  if (!body.category || !body.title || !body.content) {
    return NextResponse.json({ error: "Category, title, and content are required." }, { status: 400 });
  }

  const policy = upsertPolicy({
    id: body.id ?? `pol-${Date.now()}`,
    category: body.category,
    title: body.title,
    content: body.content,
    active: Boolean(body.active),
    center_id: "center-001",
  });

  return NextResponse.json(policy);
}
