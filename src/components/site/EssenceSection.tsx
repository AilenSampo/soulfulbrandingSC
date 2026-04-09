import type { SiteContentData } from "@/lib/site-content";
import { SectionImage } from "@/components/site/SectionImage";
import { SectionShell } from "@/components/site/SectionShell";
import bookPortrait from "../../../assets/images/shared/book-portrait.png";

type Props = { essence: SiteContentData["essence"] };

export function EssenceSection({ essence }: Props) {
  const headline = "Toda marca tiene una esencia.";
  const lines = [
    "La coherencia le da fuerza.",
    "La percepción define el impacto.",
    "La autenticidad genera magnetismo.",
    "La expresión manifiesta su Identidad.",
  ];

  return (
    <section id="esencia" className="bg-[#4248B5] py-14 text-white md:py-16 lg:py-20">
      <SectionShell className="relative">
        <div className="md:hidden">
          <div className="grid grid-cols-[1fr_auto] items-start gap-2">
            <h2 className="max-w-[min(56vw,11.75rem)] font-serif text-[clamp(2.35rem,9vw,3.65rem)] font-medium italic leading-[1.02] tracking-tight text-white">
              Toda
              <br />
              marca
              <br />
              tiene una
              <br />
              esencia.
            </h2>
            <div className="relative mt-4 w-[36vw] max-w-[168px]">
              <div className="relative aspect-[3/4] w-full overflow-hidden shadow-[0_16px_30px_-12px_rgba(0,0,0,0.35)]">
                <SectionImage src={bookPortrait} alt="" className="absolute inset-0 h-full w-full" imgClassName="object-cover" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-8 items-center pr-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/sc-so-logo.svg" alt="" className="h-6 w-auto opacity-50 brightness-0 invert" />
                </div>
              </div>
              <div className="pointer-events-none absolute -left-[54%] -top-[22%] z-20 w-[92%] max-w-[150px]">
                <SectionImage
                  src="/media/about-buddha-fuchsia.png"
                  alt=""
                  className="relative aspect-square w-full overflow-visible"
                  imgClassName="object-contain"
                />
              </div>
            </div>
          </div>
          <ul className="mt-10 space-y-2.5 text-left text-[clamp(1.1rem,5vw,1.45rem)] leading-[1.45] text-white/95">
            {lines.map((line) => (
              <li key={line}>
                <span className="font-semibold">{line.split(" ").slice(0, 2).join(" ")}</span>{" "}
                {line.split(" ").slice(2).join(" ")}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden md:block md:min-h-[430px] lg:min-h-[470px]">
          <div className="absolute left-0 top-5 w-[210px]">
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-[0_16px_30px_-12px_rgba(0,0,0,0.35)]">
              <SectionImage src={essence.imageLeftUrl} alt="" className="absolute inset-0 h-full w-full" imgClassName="object-cover" />
            </div>
          </div>
          <div className="absolute left-[156px] top-[258px] z-20 w-[86px] lg:left-[172px] lg:top-[282px] lg:w-[94px]">
            <SectionImage src="/media/hero-purple-heart-gold.png" alt="" className="relative aspect-square w-full overflow-visible" imgClassName="object-contain" />
          </div>

          <div className="absolute left-[258px] top-3 max-w-[520px] lg:left-[284px] lg:max-w-[560px]">
            <h2 className="font-serif text-[clamp(2.45rem,3.5vw,3.85rem)] font-medium leading-[0.95] tracking-tight text-white">
              {headline}
            </h2>
            <ul className="mt-14 space-y-2.5 text-left text-[clamp(1.15rem,1.55vw,1.45rem)] leading-[1.45] text-white/95 lg:mt-16">
              {lines.map((line) => (
                <li key={line}>
                  <span className="font-semibold">{line.split(" ").slice(0, 2).join(" ")}</span>{" "}
                  {line.split(" ").slice(2).join(" ")}
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute right-0 top-1 w-[210px] lg:w-[230px]">
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-[0_16px_30px_-12px_rgba(0,0,0,0.35)]">
              <SectionImage src={bookPortrait} alt="" className="absolute inset-0 h-full w-full" imgClassName="object-cover" />
            </div>
          </div>
          <div className="absolute right-[132px] top-[186px] z-30 w-[168px] lg:right-[152px] lg:top-[204px] lg:w-[182px]">
            <SectionImage src="/media/journaling.png" alt="" className="relative aspect-[3/4] w-full overflow-visible" imgClassName="object-contain" />
          </div>

          <div className="absolute bottom-0 left-[56px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/sc-so-logo.svg" alt="" className="h-6 w-auto opacity-50 brightness-0 invert" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40 md:text-[11px] md:tracking-[0.2em]">
              SOULFUL BRANDING® EXPERIENCE
            </p>
          </div>
          <div className="absolute bottom-0 right-[16px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/sc-so-logo.svg" alt="" className="h-6 w-auto opacity-50 brightness-0 invert" />
          </div>
        </div>

      </SectionShell>
    </section>
  );
}
