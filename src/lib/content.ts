import { prisma } from "@/lib/prisma";
import {
  defaultSiteContent,
  fillEmptyMediaFromDefaults,
  parseSiteContent,
  type SiteContentData,
} from "@/lib/site-content";

export async function getSiteContent(): Promise<SiteContentData> {
  const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
  if (!row?.data) return defaultSiteContent();
  return fillEmptyMediaFromDefaults(parseSiteContent(row.data));
}
