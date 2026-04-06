/**
 * Sesión admin: HMAC-SHA256 con Web Crypto (funciona en Edge middleware y en Node).
 */

const COOKIE = "sb_admin";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const encoder = new TextEncoder();

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "dev-only-change-me";
}

/** UTF-8 → base64url (equivalente a Buffer.from(s,'utf8').toString('base64url') en Node) */
function utf8ToBase64Url(str: string): string {
  const bytes = encoder.encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function base64UrlToUtf8(b64url: string): string {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const bin = atob(b64 + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    out[i] = bin.charCodeAt(i);
  }
  return new TextDecoder().decode(out);
}

function bytesToBase64Url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function hmacSha256Base64Url(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return bytesToBase64Url(sig);
}

export async function createAdminToken(): Promise<string> {
  const exp = Date.now() + MAX_AGE_MS;
  const payload = utf8ToBase64Url(JSON.stringify({ exp }));
  const sig = await hmacSha256Base64Url(getSecret(), payload);
  return `${payload}.${sig}`;
}

export async function verifyAdminToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmacSha256Base64Url(getSecret(), payload);
  if (!timingSafeEqualStr(sig, expected)) return false;
  try {
    const json = JSON.parse(base64UrlToUtf8(payload)) as { exp?: number };
    if (!json.exp || Date.now() > json.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export { COOKIE as ADMIN_COOKIE_NAME };
