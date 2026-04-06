import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  parseSiteContent,
  defaultSiteContent,
  fillEmptyMediaFromDefaults,
  type SiteContentData,
} from "@/lib/site-content";
import { isAdminRequest } from "@/lib/auth-api";

export async function GET() {
  const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const data = row?.data
    ? fillEmptyMediaFromDefaults(parseSiteContent(row.data))
    : defaultSiteContent();
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = (await req.json()) as SiteContentData;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }
  const merged = parseSiteContent(body);
  await prisma.siteContent.upsert({
    where: { id: 1 },
    create: { id: 1, data: merged as object },
    update: { data: merged as object },
  });
  return NextResponse.json({ ok: true, data: merged });
}
