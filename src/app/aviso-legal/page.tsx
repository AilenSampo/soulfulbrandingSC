import { LegalMarkdownBody } from "@/components/site/LegalMarkdownBody";
import { LegalDocShell } from "@/components/site/LegalDocShell";
import { readLegalMarkdownFile } from "@/lib/legal-docs";
import { getSiteContent } from "@/lib/content";

export const metadata = {
  title: "Aviso legal | Soulful Branding®",
};

export default async function AvisoLegalPage() {
  const [c, body] = await Promise.all([getSiteContent(), readLegalMarkdownFile("aviso-legal.md")]);

  return (
    <LegalDocShell title="Aviso legal" nav={c.nav}>
      <LegalMarkdownBody content={body} />
      <p className="pt-6 text-xs text-neutral-500">
        Documentos relacionados: <a href="/politica-privacidad">Política de privacidad</a>,{" "}
        <a href="/politica-cookies">Política de cookies</a>.
      </p>
    </LegalDocShell>
  );
}
