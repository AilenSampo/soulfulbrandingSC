"use client";

import Image from "next/image";
import Link from "next/link";
import type { SiteContentData, StageItem } from "@/lib/site-content";
import { SectionImage } from "@/components/site/SectionImage";
import { SectionShell } from "@/components/site/SectionShell";
import { cn } from "@/lib/cn";

type Props = { stages: SiteContentData["stages"] };

const RIBBON = [
  "International creative studio",
  "High end expertise",
  "Servicios exclusivos 1:1",
] as const;

/** Rosa CTA mockup ~#E93675 */
const CTA_PINK = "bg-[#E93675] hover:bg-[#d42f68]";

function stageCardShell(style: StageItem["style"]) {
  switch (style) {
    case "navy":
      return "bg-brand-navy text-white shadow-[0_10px_28px_-12px_rgba(19,25,69,0.35)]";
    case "outlinePink":
      return "border border-neutral-300/90 bg-white text-[#E93675] shadow-[0_10px_28px_-12px_rgba(19,25,69,0.16)]";
    default:
      return "bg-brand-yellowPale text-brand-navy shadow-[0_10px_28px_-12px_rgba(19,25,69,0.14)]";
  }
}

export function StagesSection({ stages }: Props) {
  return (
    <section
      id="etapas"
      className="relative scroll-mt-24 overflow-hidden pt-12 pb-0 md:pt-16 lg:pt-20"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-x-0 top-0 h-1/2 min-h-[210px] bg-cover bg-center md:min-h-[180px]"
          style={{ backgroundImage: "url(/media/sky-band.png)" }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 min-h-[200px] bg-cover bg-[center_top]"
          style={{ backgroundImage: "url(/media/paper-texture-site.png)" }}
          aria-hidden
        />
      </div>

      <SectionShell className="relative z-10">
        <h2 className="relative z-10 mx-auto max-w-[18ch] text-center font-sans text-[clamp(1.2rem,4.8vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-white drop-shadow-[0_2px_8px_rgba(19,25,69,0.25)] sm:max-w-[22ch] md:max-w-none md:text-[clamp(1.65rem,3.2vw,2.65rem)] md:leading-[1.18]">
          {stages.heading}
        </h2>

        <div className="relative mt-7 grid gap-8 pb-[5rem] md:mt-12 md:grid-cols-2 md:items-center md:gap-10 md:pb-20 lg:mt-14 lg:gap-14 lg:pb-24">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] px-4 sm:px-5 md:-bottom-3 md:px-6 lg:-bottom-5 lg:px-8"
            aria-hidden
          >
            <Image
              src="/brand/soulful-branding.svg"
              alt=""
              width={1600}
              height={360}
              className="mx-auto h-auto w-full max-w-full origin-bottom object-contain object-bottom opacity-[0.92] max-md:translate-y-1 max-md:scale-[0.72] scale-[0.88] sm:scale-90 md:translate-y-5 md:scale-[0.97] lg:translate-y-8 lg:scale-[1] xl:translate-y-10 xl:scale-[1.04]"
              priority={false}
            />
          </div>

          <div className="relative z-10 order-1 mx-auto flex w-full max-w-md flex-col gap-4 md:order-1 md:mx-0 md:max-w-none md:gap-4 lg:gap-5">
            {stages.stages.map((s) => {
              const style = s.style ?? "yellow";
              const formId = s.formId ?? "aplicacion-inicio";
              const infoHref = `/?etapa=${encodeURIComponent(s.title)}&formulario=${encodeURIComponent(formId)}#contacto`;
              const showInfo = s.showInfo !== false;
              return (
                <div
                  key={s.title}
                  className={cn(
                    "flex flex-col overflow-hidden rounded-2xl sm:flex-row sm:items-stretch",
                    stageCardShell(style),
                  )}
                >
                  <div
                    className={cn(
                      "min-w-0 flex-1 px-4 py-4 text-left sm:px-6 sm:py-5",
                      style === "outlinePink" && "text-[#E93675]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3 sm:contents">
                      <p className="min-w-0 flex-1 text-base font-bold leading-snug sm:text-lg">{s.title}</p>
                      {showInfo && (
                        <Link
                          href={infoHref}
                          scroll
                          className={cn(
                            "inline-flex shrink-0 items-center justify-center rounded-md px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white transition active:opacity-90 sm:hidden",
                            CTA_PINK,
                          )}
                        >
                          + INFO
                        </Link>
                      )}
                    </div>
                    <p
                      className={cn(
                        "mt-2 text-sm font-medium leading-snug sm:text-[0.9375rem]",
                        style === "navy" && "text-white/92",
                        style === "outlinePink" && "text-[#E93675]/95",
                        style === "yellow" && "text-brand-navy",
                      )}
                    >
                      {s.description}
                    </p>
                    {s.subtitle?.trim() ? (
                      <p
                        className={cn(
                          "mt-2 text-[0.8125rem] font-normal leading-relaxed sm:text-sm",
                          style === "navy" && "text-white/80",
                          style === "outlinePink" && "text-[#E93675]/88",
                          style === "yellow" && "text-brand-navy/85",
                        )}
                      >
                        {s.subtitle}
                      </p>
                    ) : null}
                  </div>
                  {showInfo && (
                    <Link
                      href={infoHref}
                      scroll
                      className={cn(
                        "hidden min-h-[3rem] shrink-0 items-center justify-center whitespace-nowrap px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition sm:inline-flex sm:w-[5.75rem] sm:min-h-0 sm:px-3 sm:py-0",
                        CTA_PINK,
                        style === "navy" && "sm:border-l sm:border-white/25",
                        style === "yellow" && "sm:border-l sm:border-black/5",
                        style === "outlinePink" && "sm:border-l sm:border-neutral-200",
                      )}
                    >
                      + INFO
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="relative z-10 order-2 hidden min-h-0 justify-center pb-2 md:order-2 md:flex md:min-h-[360px] md:justify-end md:pb-8">
            <div className="relative z-10 w-[min(100%,300px)] rounded-xl bg-white p-2 shadow-[0_28px_60px_-24px_rgba(19,25,69,0.42)] sm:w-[min(100%,340px)] md:-translate-y-6 md:w-[min(100%,400px)] lg:-translate-y-8 lg:p-2.5">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-100">
                <SectionImage
                  src={stages.imageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full"
                  imgClassName="object-cover object-[center_22%]"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      <div className="relative left-1/2 z-10 mt-12 w-screen max-w-[100vw] -translate-x-1/2 border-t border-black/[0.07] bg-brand-yellowPale px-4 py-3 md:mt-14 lg:mt-16">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 text-center font-sans text-[8px] font-bold uppercase leading-tight tracking-[0.14em] text-brand-navy sm:flex-row sm:justify-between sm:gap-4 sm:text-[9px] sm:px-6 md:px-10 md:text-[10px] lg:px-14">
          {RIBBON.map((line) => (
            <span key={line} className="min-w-0 flex-1">
              {line}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
