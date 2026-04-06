"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type SectionEntry = {
  id: string;
  label: string;
};

function toLabel(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Sección cuyo rect contiene el punto vertical medio del viewport (más estable que solo intersectionRatio). */
function pickActiveSection(nodes: HTMLElement[]): string | null {
  if (nodes.length === 0) return null;
  const midY = window.innerHeight * 0.42;
  for (const node of nodes) {
    const r = node.getBoundingClientRect();
    if (r.top <= midY && r.bottom >= midY) return node.id || null;
  }
  const sorted = [...nodes].sort((a, b) => {
    const da = Math.abs(a.getBoundingClientRect().top + a.offsetHeight / 2 - midY);
    const db = Math.abs(b.getBoundingClientRect().top + b.offsetHeight / 2 - midY);
    return da - db;
  });
  return sorted[0]?.id ?? null;
}

export function SectionDebugIndicator() {
  const [active, setActive] = useState<string>("(sin seccion)");
  const [sections, setSections] = useState<SectionEntry[]>([]);

  const sectionMap = useMemo(() => new Map(sections.map((s) => [s.id, s.label])), [sections]);

  const refresh = useCallback(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const entries = nodes.map((node) => ({ id: node.id, label: toLabel(node.id) }));
    setSections(entries);
    const id = pickActiveSection(nodes);
    if (id) setActive(id);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh, { passive: true });
    return () => {
      window.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, [refresh]);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] max-w-xs rounded-lg border border-brand-navy/20 bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
      <p className="font-semibold uppercase tracking-wide text-brand-navy/70">Seccion activa</p>
      <p className="mt-1 font-mono text-brand-navy">{sectionMap.get(active) ?? active}</p>
    </div>
  );
}
