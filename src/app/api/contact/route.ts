import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { isContactFormKey } from "@/lib/contact-form-keys";

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  message: z.string().min(1).max(50000),
  formKey: z.string().optional(),
  stageTitle: z.string().max(200).optional(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const { name, email, message, formKey: rawKey, stageTitle: rawStage } = parsed.data;

  const formKey =
    rawKey && isContactFormKey(rawKey) ? rawKey : ("contacto-corto" as const);
  const stageTitle = (rawStage ?? "").trim().slice(0, 200);

  await prisma.contactMessage.create({
    data: {
      name,
      email,
      message,
      formKey,
      stageTitle,
    },
  });
  return NextResponse.json({ ok: true });
}
