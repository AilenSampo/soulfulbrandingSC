import { prisma } from "@/lib/prisma";
import {
  defaultSiteContent,
  fillEmptyMediaFromDefaults,
  parseSiteContent,
  type SiteContentData,
} from "@/lib/site-content";

let lastGoodContent: SiteContentData | null = null;
let dbRetryAfterMs = 0;

export async function getSiteContent(): Promise<SiteContentData> {
  const now = Date.now();
  if (process.env.NODE_ENV === "development" && now < dbRetryAfterMs) {
    return lastGoodContent ?? defaultSiteContent();
  }
  try {
    const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
    const content = row?.data
      ? fillEmptyMediaFromDefaults(parseSiteContent(row.data))
      : defaultSiteContent();
    lastGoodContent = content;
    dbRetryAfterMs = 0;
    return content;
  } catch (error) {
    // In dev with pooled Neon connections, transient disconnections can happen.
    // Keep the site rendering with defaults instead of breaking the page.
    if (process.env.NODE_ENV === "development") {
      dbRetryAfterMs = Date.now() + 15000;
    }
    console.warn("[content] Falling back to cached/default content due to DB read error.", error);
    return lastGoodContent ?? defaultSiteContent();
  }
}
