import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default function AdminHomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl font-medium text-brand-navy">Panel de administración</h1>
      <p className="mt-2 text-neutral-600">Edita textos, imágenes y proyectos del sitio.</p>
      <ul className="mt-10 space-y-4">
        <li>
          <Link
            href="/admin/content"
            className="block rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-brand-blue/35 hover:shadow"
          >
            <span className="block text-lg font-semibold">Contenido del sitio</span>
            <span className="mt-1 block text-sm text-neutral-600">Hero, secciones, servicios y contacto.</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/projects"
            className="block rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-brand-blue/35 hover:shadow"
          >
            <span className="block text-lg font-semibold">Proyectos (Portfolio)</span>
            <span className="mt-1 block text-sm text-neutral-600">Crear, editar y publicar proyectos.</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/leads"
            className="block rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-brand-blue/35 hover:shadow"
          >
            <span className="block text-lg font-semibold">Leads y formularios de contacto</span>
            <span className="mt-1 block text-sm text-neutral-600">
              Ver quién escribió, qué formulario usó (contacto corto o momentos) y gestionar el estado.
            </span>
          </Link>
        </li>
        <li>
          <Link href="/" className="text-sm font-medium text-brand-blue hover:underline">
            ← Ver sitio público
          </Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
}
