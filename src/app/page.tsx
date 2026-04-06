import { getSiteContent } from "@/lib/content";
import { SiteHeader } from "@/components/site/SiteHeader";
import { HeroSection } from "@/components/site/HeroSection";
import { EssenceSection } from "@/components/site/EssenceSection";
import { AboutSection } from "@/components/site/AboutSection";
import { StagesSection } from "@/components/site/StagesSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { ContactSection } from "@/components/site/ContactSection";
import { SectionDebugIndicator } from "@/components/dev/SectionDebugIndicator";

function firstQueryParam(v: string | string[] | undefined): string | undefined {
  if (v == null) return undefined;
  const s = Array.isArray(v) ? v[0] : v;
  const t = typeof s === "string" ? s.trim() : "";
  return t || undefined;
}

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const c = await getSiteContent();
  const sp = await searchParams;
  const initialQuery = {
    etapa: firstQueryParam(sp.etapa),
    formulario: firstQueryParam(sp.formulario),
  };

  return (
    <>
      <SiteHeader nav={c.nav} />
      <main>
        <HeroSection hero={c.hero} />
        <EssenceSection essence={c.essence} />
        <AboutSection about={c.about} />
        <StagesSection stages={c.stages} />
        <ServicesSection services={c.services} />
        <ContactSection
          contact={c.contact}
          stageOptions={c.stages.stages.map((s) => s.title)}
          stages={c.stages.stages}
          initialQuery={initialQuery}
        />
      </main>
      <SectionDebugIndicator />
    </>
  );
}
