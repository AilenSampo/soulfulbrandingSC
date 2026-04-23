"use client";

import { useEffect, useState } from "react";
import type { ConsentState } from "@/lib/cookie-consent";
import { getConsent } from "@/lib/cookie-consent";

/**
 * Punto único para cargar scripts de analítica / marketing según consentimiento.
 * Hoy no inyecta nada: cuando definas GA4, Meta Pixel, etc., añadí Next.js Script aquí
 * leyendo `consent` (solo en cliente, tras hidratar).
 */
export function ConsentScripts() {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    setConsent(getConsent());

    const onUpdate = (e: Event) => {
      const ce = e as CustomEvent<ConsentState>;
      if (ce.detail) setConsent(ce.detail);
      else setConsent(getConsent());
    };

    window.addEventListener("sb-consent-updated", onUpdate);
    return () => window.removeEventListener("sb-consent-updated", onUpdate);
  }, []);

  useEffect(() => {
    if (!consent) return;
    // Ejemplo futuro:
    // if (consent.analytics) { /* gtag config */ }
    // if (consent.marketing) { /* fbq */ }
  }, [consent]);

  return null;
}
