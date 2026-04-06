import { PrismaClient } from "@prisma/client";
import {
  defaultSiteContent,
  normalizeStagesSection,
  parseSiteContent,
} from "../src/lib/site-content";

const prisma = new PrismaClient();

async function main() {
  const d = defaultSiteContent();
  const row = await prisma.siteContent.findUnique({ where: { id: 1 } });
  const merged = row?.data
    ? (() => {
        const parsed = parseSiteContent(row.data);
        return {
          ...parsed,
          about: d.about,
          stages: normalizeStagesSection({
            ...parsed.stages,
            heading: d.stages.heading,
            stages: d.stages.stages,
            imageUrl: parsed.stages.imageUrl || d.stages.imageUrl,
            activeIndex: d.stages.activeIndex,
          }),
        };
      })()
    : d;

  await prisma.siteContent.upsert({
    where: { id: 1 },
    create: { id: 1, data: merged as object },
    update: { data: merged as object },
  });

  const samples = [
    {
      title: "Proyecto ejemplo",
      slug: "proyecto-ejemplo",
      excerpt: "Identidad y web para un estudio creativo.",
      description: "Descripción ampliada del proyecto. Puedes editarla desde el panel.",
      category: "Branding",
      order: 0,
    },
  ];

  for (const p of samples) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      create: { ...p, imageUrl: "", published: true },
      update: {},
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
