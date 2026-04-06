import type { StageFormId } from "@/lib/site-content";

/** Clave legacy; se borra al cargar contacto sin `formulario` en la URL */
export const SB_MOMENTO_STORAGE_KEY = "sb-contact-momento-v1";

export type MomentoStored = { formId: StageFormId; etapaTitle: string };

/** Limpia datos viejos de sessionStorage (ya no se usan para elegir formulario). */
export function clearLegacyMomentoStorage() {
  try {
    sessionStorage.removeItem(SB_MOMENTO_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Resuelve etapa + formulario solo desde la URL y `initialQuery` (SSR).
 * Sin `formulario` válido en la URL → siempre formulario de contacto corto.
 */
export function resolveMomentoQuery(
  nextSearchParams: URLSearchParams,
  initialQuery: { etapa?: string; formulario?: string } | undefined,
): { etapa: string; formulario: string } {
  let etapa = nextSearchParams.get("etapa")?.trim() || "";
  let formulario = nextSearchParams.get("formulario")?.trim() || "";

  if (typeof window !== "undefined") {
    const w = new URLSearchParams(window.location.search);
    if (!etapa) etapa = w.get("etapa")?.trim() || "";
    if (!formulario) formulario = w.get("formulario")?.trim() || "";
  }

  if (!etapa) etapa = initialQuery?.etapa?.trim() || "";
  if (!formulario) formulario = initialQuery?.formulario?.trim() || "";

  return { etapa, formulario };
}
