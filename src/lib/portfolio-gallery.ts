import fs from "fs";
import path from "path";
import { PORTFOLIO_SHOWCASE } from "@/lib/portfolio-showcase";

const ROOT = path.join(process.cwd(), "assets", "images", "portfolio");

const ALLOWED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".mp4"]);

export type PortfolioGalleryFile = { filename: string; kind: "image" | "video" };

/** Lista imágenes y vídeos de la carpeta del proyecto (excluye portadas duplicadas cover-*). Solo servidor. */
export function getPortfolioGalleryFiles(projectId: string): PortfolioGalleryFile[] {
  const allowed = PORTFOLIO_SHOWCASE.some((p) => p.id === projectId);
  if (!allowed) return [];

  const dir = path.join(ROOT, projectId);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return [];

  const files = fs.readdirSync(dir).filter((f) => {
    const lower = f.toLowerCase();
    if (lower.startsWith("cover-")) return false;
    const ext = path.extname(f).toLowerCase();
    return ALLOWED_EXT.has(ext);
  });

  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

  return files.map((filename) => ({
    filename,
    kind: path.extname(filename).toLowerCase() === ".mp4" ? "video" : "image",
  }));
}
