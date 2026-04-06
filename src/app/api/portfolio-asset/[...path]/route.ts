import fs from "fs/promises";
import path from "path";
import { PORTFOLIO_SHOWCASE } from "@/lib/portfolio-showcase";

const ROOT = path.join(process.cwd(), "assets", "images", "portfolio");
const ALLOWED_IDS = new Set(PORTFOLIO_SHOWCASE.map((p) => p.id));

function contentType(ext: string): string {
  const e = ext.toLowerCase();
  if (e === ".png") return "image/png";
  if (e === ".jpg" || e === ".jpeg") return "image/jpeg";
  if (e === ".webp") return "image/webp";
  if (e === ".gif") return "image/gif";
  if (e === ".mp4") return "video/mp4";
  return "application/octet-stream";
}

export async function GET(_request: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const segments = (await ctx.params).path;
  if (!segments?.length) return new Response("Not found", { status: 404 });

  const projectId = segments[0];
  if (!ALLOWED_IDS.has(projectId)) return new Response("Forbidden", { status: 403 });

  const rest = segments.slice(1);
  if (rest.length === 0) return new Response("Not found", { status: 404 });
  if (rest.some((s) => s.includes(".."))) return new Response("Bad request", { status: 400 });

  const resolvedRoot = path.resolve(path.join(ROOT, projectId));
  const filePath = path.resolve(path.join(ROOT, projectId, ...rest));
  const rel = path.relative(resolvedRoot, filePath);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) return new Response("Not found", { status: 404 });
    const buf = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    return new Response(buf, {
      headers: {
        "Content-Type": contentType(ext),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
