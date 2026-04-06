import Image from "next/image";
import Link from "next/link";
import { AboutMethodSection } from "@/components/site/AboutMethodSection";
import { cn } from "@/lib/cn";

const IMG_PORTRAIT = "/media/about-portrait.jpeg";
const IMG_BOOK = "/media/book-portrait.png";
const IMG_EXPANDED = "/media/about-expanded-top-left-seated-laptop.png";
const IMG_MAIN_LAPTOP = "/media/about-main-laptop-portrait.png";

const textBase = "text-[0.9375rem] font-normal leading-[1.65] md:text-base md:leading-[1.7]";

function IntroBlock() {
  return (
    <div className={cn("space-y-4", textBase)}>
      <p>
        Mi nombre es <strong className="font-semibold text-brand-navy">Sofia Ciabattoni</strong>.
      </p>
      <p className="font-semibold text-brand-navy">
        Exploro la alquimia entre identidad, estrategia y energía. Mi misión es visibilizar marcas —conscientes— con
        impacto social; uniendo estética y propósito.
      </p>
      <p className="font-normal">
        Me gusta presentarme como Artista y Alquimista porque tengo el don de revelar lo oculto y transformarlo en arte.
        De allí nace mi estudio creativo, el Atelier Identitario que hoy lleva mi nombre.
      </p>
    </div>
  );
}

function MidSince() {
  return (
    <p className={cn("min-w-0", textBase)}>
      Since 2018 (til now) me especializo en branding estratégico y diseño emocional. Llevo una década acompañando la
      creación de marcas e identidades que buscan algo más que presencia visual; eligen claridad, coherencia,
      sensibilidad estética, resonancia emocional: I mean = posicionamiento y autenticidad.
    </p>
  );
}

function MidGracias() {
  return (
    <div className={cn("min-w-0 space-y-4", textBase)}>
      <p>
        Gracias a mi experiencia, hace 4 años nació mi propia metodología, el Soulful Branding®. Allí la suma de las
        partes co-crean el todo (estrategia, identidad y energía).
      </p>
      <p>
        <strong className="font-semibold text-brand-navy">El proceso</strong> implica profunda alineación y{" "}
        <strong className="font-semibold text-brand-navy">co-creación identitaria. El resultado</strong> es la expresión
        consciente de lo que ya es.
      </p>
    </div>
  );
}

function ClosingBlock({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-5 pb-1", textBase, className)}>
      <p className="font-semibold text-brand-navy">Es por eso que hoy trabajo con marcas o instituciones que:</p>
      <ul className="space-y-2 pl-1 text-brand-navy [list-style:none]">
        <li className="pl-3">buscan claridad estratégica</li>
        <li className="pl-3">valoran el diseño como comunicación</li>
        <li className="pl-3">quieren construir una identidad sólida</li>
        <li className="pl-3">proyectan a largo plazo</li>
      </ul>
      <p className="pt-1">
        El Soulful Branding® no es un proceso pensado para quienes buscan únicamente un logotipo rápido o soluciones
        superficiales.{" "}
        <strong className="font-semibold text-brand-navy">Es un proceso profundo de construcción identitaria.</strong>
      </p>
    </div>
  );
}

/** Móvil: texto medio sobre tarjeta blanca, cielo de fondo y buda fucsia (alineado a mockup) */
function AboutMobileSkyBlock() {
  return (
    <div className="relative left-1/2 z-0 w-screen max-w-[100vw] -translate-x-1/2 lg:hidden">
      <div className="relative min-h-[min(56vh,460px)] w-full overflow-x-hidden overflow-y-visible px-4 pb-6 pt-12">
        {/* Cielo: más nubes abajo como en el arte */}
        <div
          className="absolute inset-0 bg-cover bg-[center_top] sm:bg-center"
          style={{ backgroundImage: "url(/media/sky-band.png)" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-brand-sky/20 via-transparent to-brand-page/90"
          aria-hidden
        />

        <div className="relative z-[1] mx-auto w-full max-w-[min(92vw,352px)]">
          <div className="relative w-full">
            <div className="rounded-[2px] border border-white/90 bg-white shadow-[0_6px_28px_-6px_rgba(19,25,69,0.18)]">
              <div className="space-y-5 px-6 pb-8 pt-7 text-[0.8125rem] leading-[1.58] text-brand-navy sm:text-[0.875rem] sm:leading-[1.6]">
                <MidSince />
                <MidGracias />
              </div>
            </div>
            {/* Esquina inferior derecha de la tarjeta; el desplazamiento lo sitúa sobre el cielo como en el mockup */}
            <div className="pointer-events-none absolute bottom-0 right-0 z-10 w-[30%] max-w-[108px] translate-x-[6%] translate-y-[36%] sm:max-w-[116px] sm:translate-x-[4%] sm:translate-y-[40%]">
              <Image
                src="/media/about-buddha-fuchsia.png"
                alt=""
                width={200}
                height={200}
                className="h-auto w-full object-contain drop-shadow-[0_10px_22px_rgba(19,25,69,0.2)]"
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="relative left-1/2 z-[1] mt-[4.5rem] w-screen max-w-[100vw] -translate-x-1/2 bg-brand-navy py-2.5 shadow-[0_-4px_20px_-8px_rgba(19,25,69,0.12)]">
          <p className="px-3 text-center text-[8px] font-medium uppercase leading-tight tracking-[0.2em] text-white/95 sm:text-[9px]">
            SOULFUL BRANDING® EXPERIENCE · SOULFUL BRANDING® EXPERIENCE · SOULFUL BRANDING® EXPERIENCE
          </p>
        </div>
      </div>
    </div>
  );
}

function BookImage({ fullWidth }: { fullWidth?: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0",
        fullWidth ? "max-w-[min(100%,420px)]" : "max-w-[min(100%,360px)] lg:mx-0 lg:max-w-[340px]",
      )}
    >
      <div className="relative aspect-square w-full min-h-[200px] overflow-hidden rounded-sm bg-neutral-200/40">
        <Image
          src={IMG_BOOK}
          alt="Sofía con el libro The Book of Alchemy"
          fill
          sizes="(max-width: 1024px) 90vw, 340px"
          className="object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}

export function AboutMorePage() {
  return (
    <div className="bg-brand-page text-brand-navy">
      <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 md:pb-20 md:pt-10 lg:px-10">
        <Link
          href="/#about"
          className="mb-6 inline-block text-[11px] font-bold uppercase tracking-[0.32em] text-brand-navy/80 transition hover:opacity-70 md:mb-8"
        >
          ← Volver
        </Link>

        {/* Móvil: retrato banqueta → intro → bloque cielo+buda → laptop principal → cierre */}
        <div className="flex flex-col gap-8 lg:hidden">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[min(100%,420px)] overflow-hidden rounded-sm bg-neutral-200/40">
            <Image
              src={IMG_PORTRAIT}
              alt="Sofía Ciabattoni"
              fill
              className="object-cover object-[center_28%]"
              sizes="100vw"
              priority
            />
          </div>
          <IntroBlock />
          <AboutMobileSkyBlock />
          {/* Fila final móvil: imagen | texto (mockup) */}
          <div className="grid min-w-0 grid-cols-2 items-stretch gap-0 overflow-hidden rounded-sm border border-neutral-300/25 shadow-[0_2px_12px_rgba(19,25,69,0.06)]">
            <div className="relative h-full min-h-[200px] w-full min-w-0 bg-neutral-200/30">
              <Image
                src={IMG_MAIN_LAPTOP}
                alt="Sofía Ciabattoni con laptop"
                fill
                className="object-cover object-[center_22%]"
                sizes="50vw"
              />
            </div>
            <div className="relative -ml-px flex min-h-0 min-w-0 flex-col justify-center bg-neutral-200/50 px-2 py-3 sm:px-3 sm:py-4">
              <ClosingBlock className="space-y-3 pb-0 text-[0.7rem] leading-[1.45] sm:text-[0.78rem] sm:leading-[1.5]" />
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
            <div className="relative mx-auto aspect-square w-full max-w-[min(100%,420px)] overflow-hidden rounded-sm bg-neutral-200/40 lg:mx-0 lg:max-w-[440px]">
              <Image
                src={IMG_PORTRAIT}
                alt="Sofía Ciabattoni en su espacio de trabajo"
                fill
                className="object-cover object-[center_25%]"
                sizes="(max-width: 1024px) min(100vw, 420px), 440px"
                priority
              />
            </div>
            <IntroBlock />
          </div>

          <div className="mt-10 grid min-w-0 gap-8 lg:mt-12 lg:grid-cols-3 lg:gap-6 lg:items-start">
            <MidSince />
            <MidGracias />
            <BookImage />
          </div>

          <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-10 lg:items-end">
            <div className="relative mx-auto w-full max-w-[min(100%,520px)] lg:mx-0 lg:max-w-none">
              <div className="relative aspect-[3/5] w-full overflow-hidden rounded-sm bg-neutral-200/40 lg:aspect-[2/3] lg:max-h-[min(72vh,640px)]">
                <Image
                  src={IMG_EXPANDED}
                  alt="Sofía Ciabattoni"
                  fill
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <ClosingBlock />
          </div>
        </div>
      </div>

      <AboutMethodSection />

      <footer className="border-t border-brand-navy/20 bg-brand-navy py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/90">
        <p className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-10">
          SOULFUL BRANDING® EXPERIENCE · SOULFUL BRANDING® EXPERIENCE · SOULFUL BRANDING® EXPERIENCE
        </p>
      </footer>
    </div>
  );
}
