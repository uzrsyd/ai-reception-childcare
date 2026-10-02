import { NextResponse } from "next/server";
import { getAdminSnapshot } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getAdminSnapshot());
}
