import path from "path";
import { PORTFOLIO_ALLOWED_PROJECT_IDS } from "@/lib/portfolio-allowed-ids";
import galleryManifest from "@/data/portfolio-gallery-manifest.json";

const ALLOWED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".mp4"]);
const ALLOWED_IDS = new Set<string>(PORTFOLIO_ALLOWED_PROJECT_IDS);

export type PortfolioGalleryFile = { filename: string; kind: "image" | "video" };

const manifest = galleryManifest as Record<string, string[]>;

/**
 * Galería por proyecto: lista fija en `portfolio-gallery-manifest.json` (evita `fs` en el servidor;
 * Vercel no empaqueta cientos de MB en la función `portfolio/[slug]`).
 */
export function getPortfolioGalleryFiles(projectId: string): PortfolioGalleryFile[] {
  if (!ALLOWED_IDS.has(projectId)) return [];

  const raw = manifest[projectId];
  if (!raw?.length) return [];

  const files = raw.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ALLOWED_EXT.has(ext);
  });
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

  return files.map((filename) => ({
    filename,
    kind: path.extname(filename).toLowerCase() === ".mp4" ? "video" : "image",
  }));
}
