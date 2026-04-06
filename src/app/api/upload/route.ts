import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { isAdminRequest } from "@/lib/auth-api";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

export async function POST(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Tipo no permitido" }, { status: 400 });
  }
  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Máximo 8MB" }, { status: 400 });
  }
  const ext = path.extname(file.name) || (file.type === "image/png" ? ".png" : ".jpg");
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const fsPath = path.join(dir, name);
  await writeFile(fsPath, buf);
  const url = `/uploads/${name}`;
  return NextResponse.json({ url });
}
