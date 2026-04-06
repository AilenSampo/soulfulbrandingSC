import type { SiteContentData } from "@/lib/site-content";
import { SectionImage } from "@/components/site/SectionImage";
import { SectionShell } from "@/components/site/SectionShell";

/** Textura de fondo del mockup (copiada a `public/media/`). No cambiar el nombre sin actualizar aquí. */
export const HERO_PAPER_TEXTURE_URL = "/media/paper-texture-site.png" as const;

/** Wordmark oficial (también en `assets/brand/Identidad SVG/`). */
const SOULFUL_BRAND_WORDMARK_SRC = "/brand/soulful-branding.svg" as const;

type Props = { hero: SiteContentData["hero"] };

export function HeroSection({ hero }: Props) {
  const kicker = "SOULFUL BRANDING® EXPERIENCE";
  const heading = "Cuando una marca entiende quién es y qué representa, su identidad se vuelve magnética.";
  const headingDesktopLine1 = "Cuando una marca entiende quién es y qué representa,";
  const headingDesktopLine2 = "su identidad se vuelve magnética.";
  /** Mobile mockup: máx. 3 líneas arriba de la foto; el resto debajo de la foto */
  const headingMobileLineClass =
    "mx-auto max-w-[min(92vw,22rem)] px-4 text-center font-sans text-[clamp(1.28rem,5.2vw,1.9rem)] font-bold leading-[1.22] tracking-[-0.01em] text-black";
  const lineOne = "Mi trabajo consiste en acompañar ese proceso.";
  const lineTwo = "That’s WHY Soulful Branding®.";

  /** Misma escala visual que el título de Etapas (clamp del h2). */
  const wordmarkSizeClass =
    "h-[clamp(1.2rem,4.8vw,2.5rem)] md:h-[clamp(1.65rem,3.2vw,2.65rem)] w-auto max-w-[min(92vw,52rem)] object-contain object-center";

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

        {/* Bloque cielo + wordmark + modelo: sin scroll interno ni desborde */}
        <div className="relative z-0 mx-auto mt-12 w-full max-w-[1120px] overflow-hidden pb-24 sm:pb-28 md:mt-14 md:pb-0">
          <div className="relative z-10 mx-auto w-full max-w-[980px] overflow-hidden rounded-none bg-brand-sky/95">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/sky-band.png" alt="" className="h-[180px] w-full object-cover sm:h-[220px] md:h-[250px] lg:h-[270px]" />
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden px-3 md:hidden">
              {/* Mismo SVG que Etapas; sobre cielo: blanco semitransparente como antes */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SOULFUL_BRAND_WORDMARK_SRC}
                alt=""
                className={`${wordmarkSizeClass} opacity-50 brightness-0 invert`}
              />
            </div>
          </div>

          {/* Desktop: wordmark centrado sobre la franja (sin texto HTML) */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center px-4 md:flex md:overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SOULFUL_BRAND_WORDMARK_SRC} alt="" className={wordmarkSizeClass} />
          </div>

          <div className="pointer-events-none absolute left-1/2 top-[52%] z-30 w-[48%] max-w-[260px] -translate-x-1/2 -translate-y-1/2 overflow-hidden sm:top-[54%] sm:w-[50%] md:top-[50%] md:w-[21%] md:max-w-[235px] lg:top-[48%] lg:w-[23%] lg:max-w-[260px]">
            <SectionImage
              src={hero.imageUrl}
              alt=""
              className="relative aspect-[2/3] w-full overflow-hidden"
              imgClassName="object-[50%_18%] drop-shadow-[0_18px_24px_rgba(19,25,69,0.2)] sm:object-[50%_22%] md:object-[50%_30%]"
              priority
            />
          </div>
        </div>

        <div aria-hidden className={`relative z-40 mt-6 md:hidden ${headingMobileLineClass}`}>
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
