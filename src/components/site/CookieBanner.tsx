"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { denyAll, getConsent, acceptAll, saveConsent } from "@/lib/cookie-consent";

/**
 * CMP ligero: la X y "Denegar" rechazan cookies no esenciales (solo necesarias).
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!getConsent()) setOpen(true);
  }, []);

  if (!open) return null;

  const handleAccept = () => {
    acceptAll();
    setOpen(false);
  };

  const handleDeny = () => {
    denyAll();
    setOpen(false);
  };

  const handleSavePreferences = () => {
    saveConsent({ analytics, marketing });
    setOpen(false);
  };

  const handleSettingsClick = () => {
    if (showSettings) handleSavePreferences();
    else {
      const c = getConsent();
      if (c) {
        setAnalytics(c.analytics);
        setMarketing(c.marketing);
      }
      setShowSettings(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
    >
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={handleDeny}
          className="absolute right-4 top-4 text-neutral-500 transition hover:text-brand-navy"
          aria-label="Rechazar cookies no esenciales y cerrar"
        >
          ✕
        </button>

        <h2 id="cookie-banner-title" className="pr-8 text-center font-sans text-base font-semibold text-brand-navy">
          Gestionar el consentimiento de las cookies
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
        Usamos cookies y tecnologías similares para mejorar tu experiencia de navegación, entender cómo se utiliza el sitio y ofrecerte contenido más relevante. Podés elegir qué cookies aceptar; si preferís no hacerlo, algunas funcionalidades del sitio podrían no estar disponibles.
        </p>

        {showSettings ? (
          <div className="mt-4 space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm text-brand-navy">
            <label className="flex cursor-pointer items-start gap-2">
              <input type="checkbox" checked readOnly className="mt-0.5" disabled />
              <span>Necesarias (siempre activas; imprescindibles para el funcionamiento del sitio)</span>
            </label>
            <label className="flex cursor-pointer items-start gap-2">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-0.5"
              />
              <span>Analíticas</span>
            </label>
            <label className="flex cursor-pointer items-start gap-2">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-0.5"
              />
              <span>Marketing</span>
            </label>
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 rounded-lg bg-brand-blue py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={handleDeny}
            className="flex-1 rounded-lg border border-neutral-200 bg-neutral-100 py-2.5 text-sm font-medium text-brand-navy transition hover:bg-neutral-200/80"
          >
            Denegar
          </button>
          <button
            type="button"
            onClick={handleSettingsClick}
            className="flex-1 rounded-lg border border-neutral-200 bg-neutral-100 py-2.5 text-sm font-medium text-brand-navy transition hover:bg-neutral-200/80"
          >
            {showSettings ? "Guardar preferencias" : "Ajustes"}
          </button>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-center text-xs text-brand-blue underline">
          <Link href="/politica-cookies" className="hover:opacity-80">
            Política de cookies
          </Link>
          <Link href="/politica-privacidad" className="hover:opacity-80">
            Política de privacidad
          </Link>
          <Link href="/aviso-legal" className="hover:opacity-80">
            Aviso legal
          </Link>
        </div>
      </div>
    </div>
  );
}
