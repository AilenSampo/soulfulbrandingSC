import type { SiteContentData } from "@/lib/site-content";
import { SectionImage } from "@/components/site/SectionImage";
import { SectionShell } from "@/components/site/SectionShell";

/** Textura de fondo del mockup (copiada a `public/media/`). No cambiar el nombre sin actualizar aquí. */
export const HERO_PAPER_TEXTURE_URL = "/media/paper-texture-site.png" as const;

type Props = { hero: SiteContentData["hero"] };

function splitTitle(title: string): [string, string] {
  const t = title.trim();
  const space = t.indexOf(" ");
  if (space === -1) return [t, ""];
  return [t.slice(0, space).trim(), t.slice(space).trim()];
}

export function HeroSection({ hero }: Props) {
  const [a, b] = splitTitle(hero.title);
  const brandLabel = [a, b].filter(Boolean).join(" ");
  const kicker = "SOULFUL BRANDING® EXPERIENCE";
  const heading = "Cuando una marca entiende quién es y qué representa, su identidad se vuelve magnética.";
  const headingDesktopLine1 = "Cuando una marca entiende quién es y qué representa,";
  const headingDesktopLine2 = "su identidad se vuelve magnética.";
  /** Mobile mockup: máx. 3 líneas arriba de la foto; el resto debajo de la foto */
  const headingMobileLineClass =
    "mx-auto max-w-[min(92vw,22rem)] px-4 text-center font-sans text-[clamp(1.28rem,5.2vw,1.9rem)] font-bold leading-[1.22] tracking-[-0.01em] text-black";
  const lineOne = "Mi trabajo consiste en acompañar ese proceso.";
  const lineTwo = "That’s WHY Soulful Branding®.";

  /** Misma escala tipográfica que el título de la sección Etapas (“¿En qué momento estás?”). */
  const brandOverSkyClassName =
    "mx-auto max-w-[18ch] text-center font-sans text-[clamp(1.2rem,4.8vw,2.5rem)] font-bold leading-[1.2] tracking-tight sm:max-w-[22ch] md:max-w-none md:text-[clamp(1.65rem,3.2vw,2.65rem)] md:leading-[1.18]";

  return (
    <section id="hero" className="relative overflow-x-hidden bg-brand-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage: `url('${HERO_PAPER_TEXTURE_URL}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-brand-sky/8" aria-hidden />

      <SectionShell className="relative z-10 py-10 md:py-10 lg:py-12">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.16em] text-black/35 md:text-[11px] md:tracking-[0.2em]">
            {kicker}
        </p>

        {/* Un solo h1 semántico (lectores de pantalla); el diseño móvil reparte la frase con saltos explícitos */}
        <h1 className="sr-only">{heading}</h1>

        <div aria-hidden className={`relative z-20 mt-6 md:hidden ${headingMobileLineClass}`}>
          <p>
            Cuando una marca
            <br />
            entiende <strong className="font-bold">quién</strong> es y qué
            <br />
            representa
          </p>
        </div>

        <div
          aria-hidden
          className="relative z-20 mx-auto mt-6 hidden max-w-[44ch] text-center font-sans text-[clamp(1.5rem,1.45vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.01em] text-black md:block"
        >
          <p>
            {headingDesktopLine1}
            <br />
            {headingDesktopLine2}
          </p>
        </div>

        {/* pb en móvil: reserva aire bajo la foto para que los pies del recorte no tapen el titular siguiente */}
        <div className="relative z-0 mx-auto mt-12 w-full max-w-[1120px] overflow-x-hidden pb-24 sm:pb-28 md:mt-14 md:pb-0">
          {/* z-10: franja cielo (móvil: titular blanco dentro; desktop: titular negro va en capa hermana para que sobresalga del ancho del sky) */}
          <div className="relative z-10 mx-auto w-full max-w-[980px] overflow-hidden bg-brand-sky/95 md:overflow-visible">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/sky-band.png" alt="" className="h-[180px] w-full object-cover sm:h-[220px] md:h-[250px] lg:h-[270px]" />
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-3 md:hidden">
              <p className={`${brandOverSkyClassName} text-white/45`}>
                {a}
                <br />
                {b}
              </p>
            </div>
          </div>

          {/* Desktop: misma escala que el título de Etapas */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 hidden -translate-y-1/2 px-4 md:block">
            <p className={`${brandOverSkyClassName} text-black`}>{brandLabel}</p>
          </div>

          {/* z-30: modelo; en móvil un poco más arriba para acortar solape hacia el texto de abajo */}
          <div className="pointer-events-none absolute left-1/2 top-[52%] z-30 w-[48%] max-w-[260px] -translate-x-1/2 -translate-y-1/2 sm:top-[54%] sm:w-[50%] md:top-[50%] md:w-[21%] md:max-w-[235px] lg:top-[48%] lg:w-[23%] lg:max-w-[260px]">
            <SectionImage
              src={hero.imageUrl}
              alt=""
              className="relative aspect-[2/3] w-full overflow-visible"
              imgClassName="object-[50%_18%] drop-shadow-[0_18px_24px_rgba(19,25,69,0.2)] sm:object-[50%_22%] md:object-[50%_30%]"
              priority
            />
          </div>
        </div>

        <div
          aria-hidden
          className={`relative z-40 mt-6 md:hidden ${headingMobileLineClass}`}
        >
          <p>
            su <strong className="font-bold">Identidad</strong>
            <br />
            se vuelve <strong className="font-bold">magnética</strong>.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[42rem] text-center md:mt-20">
          <p className="font-sans text-[clamp(0.95rem,1.45vw,1.3rem)] font-normal leading-[1.3] text-black md:text-[clamp(0.95rem,1.1vw,1.15rem)]">
            {lineOne}
          </p>
          <p className="mt-1 font-sans text-[clamp(1rem,1.6vw,1.45rem)] font-normal leading-[1.25] text-black md:text-[clamp(1rem,1.2vw,1.2rem)]">
            {lineTwo}
          </p>
        </div>
      </SectionShell>
    </section>
  );
}
