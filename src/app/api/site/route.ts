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
  try {
    const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
    const data = row?.data
      ? fillEmptyMediaFromDefaults(parseSiteContent(row.data))
      : defaultSiteContent();
    return NextResponse.json(data);
  } catch (error) {
    console.warn("[api/site][GET] DB unavailable, returning default content.", error);
    return NextResponse.json(defaultSiteContent());
  }
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
  try {
    await prisma.siteContent.upsert({
      where: { id: 1 },
      create: { id: 1, data: merged as object },
      update: { data: merged as object },
    });
    return NextResponse.json({ ok: true, data: merged });
  } catch (error) {
    console.error("[api/site][PUT] DB write failed.", error);
    return NextResponse.json(
      { error: "No se pudo guardar por un problema temporal de conexión a la base de datos." },
      { status: 503 },
    );
  }
}
