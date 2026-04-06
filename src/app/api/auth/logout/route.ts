import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/session";

export async function POST() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ ok: true });
}
