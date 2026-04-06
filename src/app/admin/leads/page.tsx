import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/session";
import { LeadsManager } from "@/components/admin/LeadsManager";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminLeadsPage() {
  const jar = await cookies();
  if (!(await verifyAdminToken(jar.get(ADMIN_COOKIE_NAME)?.value))) {
    redirect("/admin/login?next=/admin/leads");
  }

  const items = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-3xl font-medium text-brand-navy">Leads y formularios</h1>
      <p className="mt-2 max-w-2xl text-neutral-600">
        Aquí llegan los envíos del <strong>formulario corto de Contacto</strong> y los{" "}
        <strong>tres formularios largos</strong> que se abren desde + INFO en &quot;¿En qué momento te
        encuentras?&quot;. Podés filtrar, leer el mensaje completo y cambiar el estado del lead.
      </p>

      <div className="mt-8">
        <LeadsManager initialItems={items} />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-neutral-200 pt-8">
        <Link href="/admin" className="text-sm font-medium text-brand-blue hover:underline">
          ← Volver al panel
        </Link>
        <Link href="/" className="text-sm text-neutral-600 hover:text-brand-navy">
          Ver sitio público
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}
