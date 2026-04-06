import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth-api";

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const items = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return NextResponse.json({ items });
}
