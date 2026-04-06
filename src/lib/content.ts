import { prisma } from "@/lib/prisma";
import {
  defaultSiteContent,
  fillEmptyMediaFromDefaults,
  parseSiteContent,
  type SiteContentData,
} from "@/lib/site-content";

export async function getSiteContent(): Promise<SiteContentData> {
  try {
    const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
    if (!row?.data) return defaultSiteContent();
    return fillEmptyMediaFromDefaults(parseSiteContent(row.data));
  } catch (error) {
    // In dev with pooled Neon connections, transient disconnections can happen.
    // Keep the site rendering with defaults instead of breaking the page.
    console.warn("[content] Falling back to default content due to DB read error.", error);
    return defaultSiteContent();
  }
}
