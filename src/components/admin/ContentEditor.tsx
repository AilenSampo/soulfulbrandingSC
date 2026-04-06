"use client";

import { useEffect, useState } from "react";
import type { SiteContentData, StageFormId } from "@/lib/site-content";
import { defaultSiteContent } from "@/lib/site-content";
import { ImageField } from "@/components/admin/ImageField";

export function ContentEditor() {
  const [data, setData] = useState<SiteContentData>(defaultSiteContent());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/site", { credentials: "include" });
      const j = await res.json();
      if (!cancelled && res.ok) setData(j as SiteContentData);
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function save() {
    setSaving(true);
    setMsg(null);
    const res = await fetch("/api/site", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMsg(res.ok ? "Guardado correctamente." : "No se pudo guardar.");
  }

  if (loading) {
    return <p className="p-8 text-neutral-600">Cargando…</p>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-3xl">Contenido del sitio</h1>
      <p className="mt-2 text-sm text-neutral-600">Los cambios se reflejan en la portada al guardar.</p>

      <section className="mt-10 space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">General</h2>
        <label className="block text-sm font-medium">Título del sitio (pestaña del navegador)</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.meta.siteTitle}
          onChange={(e) => setData({ ...data, meta: { ...data.meta, siteTitle: e.target.value } })}
        />
      </section>

      <section className="mt-8 space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Hero</h2>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={data.hero.showLogo !== false}
            onChange={(e) => setData({ ...data, hero: { ...data.hero, showLogo: e.target.checked } })}
          />
          Mostrar logo soulful-branding.svg arriba
        </label>
        <label className="block text-sm font-medium">Línea superior (opcional)</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.hero.eyebrow}
          onChange={(e) => setData({ ...data, hero: { ...data.hero, eyebrow: e.target.value } })}
        />
        <label className="block text-sm font-medium">Título (ej. SOULFUL BRANDING® — se parte en dos columnas)</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.hero.title}
          onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
        />
        <label className="block text-sm font-medium">Palabra bajo el titular (ej. EXPERIENCE)</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.hero.experienceWord}
          onChange={(e) => setData({ ...data, hero: { ...data.hero, experienceWord: e.target.value } })}
        />
        <label className="block text-sm font-medium">Subtítulo bajo el bloque (opcional)</label>
        <textarea
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          rows={3}
          value={data.hero.subtitle}
          onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
        />
        <ImageField label="Imagen central (mujer)" value={data.hero.imageUrl} onChange={(url) => setData({ ...data, hero: { ...data.hero, imageUrl: url } })} />
      </section>

      <section className="mt-8 space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Esencia</h2>
        <label className="block text-sm font-medium">Titular</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.essence.headline}
          onChange={(e) => setData({ ...data, essence: { ...data.essence, headline: e.target.value } })}
        />
        <label className="block text-sm font-medium">Viñetas (una por línea)</label>
        <textarea
          className="w-full rounded-md border border-neutral-300 px-3 py-2 font-mono text-sm"
          rows={5}
          value={data.essence.bullets.join("\n")}
          onChange={(e) =>
            setData({
              ...data,
              essence: {
                ...data.essence,
                bullets: e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              },
            })
          }
        />
        <label className="block text-sm font-medium">Párrafo (magnetismo)</label>
        <textarea
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          rows={3}
          value={data.essence.bodyParagraph}
          onChange={(e) => setData({ ...data, essence: { ...data.essence, bodyParagraph: e.target.value } })}
        />
        <label className="block text-sm font-medium">Línea de trabajo</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.essence.workLine}
          onChange={(e) => setData({ ...data, essence: { ...data.essence, workLine: e.target.value } })}
        />
        <label className="block text-sm font-medium">Cierre (That&apos;s WHY …)</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.essence.whyLine}
          onChange={(e) => setData({ ...data, essence: { ...data.essence, whyLine: e.target.value } })}
        />
        <label className="block text-sm font-medium">Firma — nombre</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.essence.signatureName}
          onChange={(e) => setData({ ...data, essence: { ...data.essence, signatureName: e.target.value } })}
        />
        <label className="block text-sm font-medium">Firma — rol</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.essence.signatureRole}
          onChange={(e) => setData({ ...data, essence: { ...data.essence, signatureRole: e.target.value } })}
        />
        <ImageField label="Imagen izquierda (desktop)" value={data.essence.imageLeftUrl} onChange={(url) => setData({ ...data, essence: { ...data.essence, imageLeftUrl: url } })} />
        <ImageField label="Imagen derecha" value={data.essence.imageRightUrl} onChange={(url) => setData({ ...data, essence: { ...data.essence, imageRightUrl: url } })} />
      </section>

      <section className="mt-8 space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">About</h2>
        <label className="block text-sm font-medium">Encabezado</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.about.heading}
          onChange={(e) => setData({ ...data, about: { ...data.about, heading: e.target.value } })}
        />
        <label className="block text-sm font-medium">Texto</label>
        <textarea
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          rows={5}
          value={data.about.body}
          onChange={(e) => setData({ ...data, about: { ...data.about, body: e.target.value } })}
        />
        <label className="block text-sm font-medium">Texto secundario (letra pequeña, debajo)</label>
        <textarea
          className="w-full rounded-md border border-neutral-300 px-3 py-2 font-mono text-sm"
          rows={8}
          value={data.about.finePrint ?? ""}
          onChange={(e) => setData({ ...data, about: { ...data.about, finePrint: e.target.value } })}
        />
        <label className="block text-sm font-medium">Enlace “read more”</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.about.readMoreLabel}
          onChange={(e) => setData({ ...data, about: { ...data.about, readMoreLabel: e.target.value } })}
        />
        <ImageField label="Imagen" value={data.about.imageUrl} onChange={(url) => setData({ ...data, about: { ...data.about, imageUrl: url } })} />
      </section>

      <section className="mt-8 space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Etapas</h2>
        <label className="block text-sm font-medium">Titular</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.stages.heading}
          onChange={(e) => setData({ ...data, stages: { ...data.stages, heading: e.target.value } })}
        />
        <label className="block text-sm font-medium">Índice activo (legacy; la home ya no lo usa)</label>
        <input
          type="number"
          min={0}
          max={10}
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.stages.activeIndex}
          onChange={(e) => setData({ ...data, stages: { ...data.stages, activeIndex: Number(e.target.value) || 0 } })}
        />
        <ImageField label="Imagen lateral" value={data.stages.imageUrl} onChange={(url) => setData({ ...data, stages: { ...data.stages, imageUrl: url } })} />
        {data.stages.stages.map((s, i) => (
          <div key={i} className="rounded-md border border-neutral-100 p-3">
            <p className="text-xs font-semibold text-neutral-500">Etapa {i + 1}</p>
            <input
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              value={s.title}
              onChange={(e) => {
                const stages = [...data.stages.stages];
                stages[i] = { ...stages[i], title: e.target.value };
                setData({ ...data, stages: { ...data.stages, stages } });
              }}
            />
            <label className="mt-2 block text-xs font-medium text-neutral-600">Línea corta (gancho)</label>
            <input
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              value={s.description}
              onChange={(e) => {
                const stages = [...data.stages.stages];
                stages[i] = { ...stages[i], description: e.target.value };
                setData({ ...data, stages: { ...data.stages, stages } });
              }}
            />
            <label className="mt-2 block text-xs font-medium text-neutral-600">Subtítulo (párrafo largo visible en la tarjeta)</label>
            <textarea
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              rows={4}
              value={s.subtitle ?? ""}
              onChange={(e) => {
                const stages = [...data.stages.stages];
                stages[i] = { ...stages[i], subtitle: e.target.value };
                setData({ ...data, stages: { ...data.stages, stages } });
              }}
            />
            <label className="mt-2 block text-xs font-medium text-neutral-600">Formulario al pulsar + INFO</label>
            <select
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              value={s.formId ?? "aplicacion-inicio"}
              onChange={(e) => {
                const stages = [...data.stages.stages];
                stages[i] = { ...stages[i], formId: e.target.value as StageFormId };
                setData({ ...data, stages: { ...data.stages, stages } });
              }}
            >
              <option value="aplicacion-inicio">Aplicación — estoy comenzando</option>
              <option value="contacto-evolucion">Contacto — necesito evolucionar</option>
              <option value="aplicacion-expansion">Aplicación — busco expandirme</option>
            </select>
            <label className="mt-2 block text-xs font-medium text-neutral-600">Estilo tarjeta (mockup)</label>
            <select
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              value={s.style ?? "yellow"}
              onChange={(e) => {
                const stages = [...data.stages.stages];
                stages[i] = {
                  ...stages[i],
                  style: e.target.value as "yellow" | "navy" | "outlinePink",
                };
                setData({ ...data, stages: { ...data.stages, stages } });
              }}
            >
              <option value="yellow">Amarillo (Estoy comenzando)</option>
              <option value="navy">Navy (Necesito evolucionar)</option>
              <option value="outlinePink">Blanco / rosa (Busco expandirme)</option>
            </select>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={s.showInfo !== false}
                onChange={(e) => {
                  const stages = [...data.stages.stages];
                  stages[i] = { ...stages[i], showInfo: e.target.checked };
                  setData({ ...data, stages: { ...data.stages, stages } });
                }}
              />
              Mostrar botón + Info
            </label>
          </div>
        ))}
      </section>

      <section className="mt-8 space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Servicios</h2>
        <label className="block text-sm font-medium">Palabra de fondo</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.services.backgroundWord}
          onChange={(e) => setData({ ...data, services: { ...data.services, backgroundWord: e.target.value } })}
        />
        {data.services.items.map((item, i) => (
          <div key={i} className="rounded-md border border-neutral-100 p-3">
            <p className="text-xs font-semibold text-neutral-500">Servicio {i + 1}</p>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(item.featured)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  const items = data.services.items.map((it, j) =>
                    j === i ? { ...it, featured: checked } : { ...it, featured: checked ? false : it.featured },
                  );
                  setData({ ...data, services: { ...data.services, items } });
                }}
              />
              Destacado (estilo oscuro)
            </label>
            <input
              className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              value={item.title}
              onChange={(e) => {
                const items = [...data.services.items];
                items[i] = { ...items[i], title: e.target.value };
                setData({ ...data, services: { ...data.services, items } });
              }}
            />
            <textarea
              className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              rows={2}
              value={item.description}
              onChange={(e) => {
                const items = [...data.services.items];
                items[i] = { ...items[i], description: e.target.value };
                setData({ ...data, services: { ...data.services, items } });
              }}
            />
          </div>
        ))}
      </section>

      <section className="mt-8 space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Contacto</h2>
        <label className="block text-sm font-medium">Encabezado</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.contact.heading}
          onChange={(e) => setData({ ...data, contact: { ...data.contact, heading: e.target.value } })}
        />
        <label className="block text-sm font-medium">Texto</label>
        <textarea
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          rows={3}
          value={data.contact.intro}
          onChange={(e) => setData({ ...data, contact: { ...data.contact, intro: e.target.value } })}
        />
        <label className="block text-sm font-medium">URL Instagram</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.contact.instagramUrl}
          onChange={(e) => setData({ ...data, contact: { ...data.contact, instagramUrl: e.target.value } })}
        />
        <label className="block text-sm font-medium">Email (mailto)</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          placeholder="mailto:hola@ejemplo.com"
          value={data.contact.emailMailto ?? ""}
          onChange={(e) => setData({ ...data, contact: { ...data.contact, emailMailto: e.target.value } })}
        />
        <label className="block text-sm font-medium">URL Substack</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.contact.substackUrl ?? ""}
          onChange={(e) => setData({ ...data, contact: { ...data.contact, substackUrl: e.target.value } })}
        />
        <label className="block text-sm font-medium">URL Pinterest</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.contact.pinterestUrl ?? ""}
          onChange={(e) => setData({ ...data, contact: { ...data.contact, pinterestUrl: e.target.value } })}
        />
        <label className="block text-sm font-medium">Pie de página (marca)</label>
        <input
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
          value={data.contact.footerTagline}
          onChange={(e) => setData({ ...data, contact: { ...data.contact, footerTagline: e.target.value } })}
        />
        <label className="block text-sm font-medium">Líneas bajo la marca (una por línea)</label>
        <textarea
          className="w-full rounded-md border border-neutral-300 px-3 py-2 font-mono text-xs"
          rows={4}
          value={(data.contact.footerLines ?? []).join("\n")}
          onChange={(e) =>
            setData({
              ...data,
              contact: {
                ...data.contact,
                footerLines: e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              },
            })
          }
        />
        <ImageField label="Imagen pie" value={data.contact.footerImageUrl} onChange={(url) => setData({ ...data, contact: { ...data.contact, footerImageUrl: url } })} />
      </section>

      <section className="mt-8 space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Navegación</h2>
        <p className="text-sm text-neutral-600">Etiqueta y enlace (usa rutas como /portfolio o anclas #about).</p>
        {data.nav.map((item, i) => (
          <div key={i} className="flex flex-col gap-2 sm:flex-row">
            <input
              className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
              value={item.label}
              onChange={(e) => {
                const nav = [...data.nav];
                nav[i] = { ...nav[i], label: e.target.value };
                setData({ ...data, nav });
              }}
            />
            <input
              className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
              value={item.href}
              onChange={(e) => {
                const nav = [...data.nav];
                nav[i] = { ...nav[i], href: e.target.value };
                setData({ ...data, nav });
              }}
            />
          </div>
        ))}
      </section>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="rounded-md bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-navyDark disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
        {msg && <span className="text-sm text-neutral-700">{msg}</span>}
      </div>
    </div>
  );
}
