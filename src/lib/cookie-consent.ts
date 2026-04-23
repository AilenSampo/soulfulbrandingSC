/**
 * Consentimiento de cookies (cliente). Persistencia en localStorage.
 * Si cambiás la política de cookies, incrementá CONSENT_VERSION para volver a mostrar el banner.
 */

export const CONSENT_STORAGE_KEY = "sb_cookie_consent_v1";
export const CONSENT_VERSION = 1;

export type ConsentState = {
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const defaultNecessary = true as const;

function parseStored(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const o = JSON.parse(raw) as Partial<ConsentState>;
    if (o.version !== CONSENT_VERSION) return null;
    if (o.necessary !== true) return null;
    if (typeof o.analytics !== "boolean" || typeof o.marketing !== "boolean") return null;
    return {
      version: CONSENT_VERSION,
      necessary: defaultNecessary,
      analytics: o.analytics,
      marketing: o.marketing,
      updatedAt: typeof o.updatedAt === "string" ? o.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  return parseStored(localStorage.getItem(CONSENT_STORAGE_KEY));
}

export function saveConsent(state: Omit<ConsentState, "version" | "necessary" | "updatedAt"> & { updatedAt?: string }) {
  const full: ConsentState = {
    version: CONSENT_VERSION,
    necessary: defaultNecessary,
    analytics: state.analytics,
    marketing: state.marketing,
    updatedAt: state.updatedAt ?? new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(full));
  window.dispatchEvent(new CustomEvent("sb-consent-updated", { detail: full }));
}

export function acceptAll(): void {
  saveConsent({ analytics: true, marketing: true });
}

export function denyAll(): void {
  saveConsent({ analytics: false, marketing: false });
}

export function hasAnsweredConsent(): boolean {
  return getConsent() !== null;
}
