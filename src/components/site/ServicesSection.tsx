"use client";

import Image from "next/image";
import { useState } from "react";
import type { SiteContentData } from "@/lib/site-content";
import { SectionShell } from "@/components/site/SectionShell";
import { cn } from "@/lib/cn";
import servicesBg from "../../../assets/images/shared/sofia-ipad-seated-1.png";

type Props = { services: SiteContentData["services"] };
const SIDE_TOKEN = "sô";
const RIBBON = [
  "SOULFUL BRANDING® EXPERIENCE",
  "SOULFUL BRANDING® EXPERIENCE",
  "SOULFUL BRANDING® EXPERIENCE",
] as const;
const SERVICE_DETAILS = [
  {
    title: "Identidad de marca",
    points: [
      "Esencia de marca",
      "Narrativa verbal",
      "Arquitectura conceptual",
      "Identidad visual",
      "Sistema de marca",
    ],
  },
  {
    title: "Estrategia visual",
    points: [
      "Materiales complementarios que expandan la percepción y experiencia de la marca en el mercado, basados en la identidad actual.",
    ],
  },
  {
    title: "Diseño editorial",
    points: ["Material complementario de carácter institucional, basado en la identidad actual."],
  },
  {
    title: "Presencia digital",
    points: ["Diseño y/o activación de sitio web, plataformas digitales, redes sociales, membresías, etc."],
  },
] as const;

export function ServicesSection({ services }: Props) {
  /** null = ninguna abierta; al salir el cursor del panel crema (título + cards) se vuelve a null */
  const [open, setOpen] = useState<number | null>(null);
  const [detailOpen, setDetailOpen] = useState<number | null>(null);

  return (
    <section
      id="servicios"
      className="relative scroll-mt-24 overflow-hidden bg-[#261d23] pt-7 pb-0 md:pt-10 lg:pt-12"
    >
      <SectionShell className="relative z-10 px-0 sm:px-0 lg:px-0 xl:px-0">
        <div className="relative mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-0">
          <div
            className="pointer-events-none absolute inset-y-6 left-0 hidden w-12 flex-col justify-between text-center font-sans text-[2rem] font-bold leading-none tracking-[-0.02em] text-brand-yellowPale/95 md:flex"
            aria-hidden
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={`left-${i}`}>{SIDE_TOKEN}</span>
            ))}
          </div>
          <div
            className="pointer-events-none absolute inset-y-6 right-0 hidden w-12 flex-col justify-between text-center font-sans text-[2rem] font-bold leading-none tracking-[-0.02em] text-brand-yellowPale/95 md:flex"
            aria-hidden
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={`right-${i}`}>{SIDE_TOKEN}</span>
            ))}
          </div>

          <div
            className="relative mx-auto max-w-[980px] overflow-hidden bg-[#f5f3ef] pt-6 pb-6 md:px-0 md:pt-6 md:pb-8"
            onMouseLeave={() => {
              setOpen(null);
              setDetailOpen(null);
            }}
          >
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
              <Image
                src={servicesBg}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 980px"
                className="object-cover object-center opacity-95"
                priority={false}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 z-0 bg-[#f5f3ef]/35" aria-hidden />

            <h2 className="relative z-10 mb-2 text-center font-sans text-[clamp(3.2rem,15vw,5.7rem)] font-bold leading-[0.9] tracking-[-0.03em] text-brand-yellowPale md:mb-6 md:text-[clamp(4.6rem,10.2vw,8.8rem)]">
              {services.backgroundWord}
            </h2>

            <div className="relative z-10 mx-auto w-full max-w-[860px] px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3 lg:gap-4">
          {services.items.map((item, i) => {
            const isOpen = open === i;
            const expanded = isOpen;
            const showDetails = detailOpen === i;
            return (
              <div
                key={item.title}
                onClick={() => {
                  setOpen(i);
                  if (detailOpen !== i) setDetailOpen(null);
                }}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen(i);
                  }
                }}
                role="button"
                tabIndex={0}
                className={cn(
                  "group flex flex-col rounded-xl border text-left transition md:rounded-lg",
                  expanded
                    ? "min-h-[140px] border-brand-navy/40 bg-brand-navy text-white shadow-[0_16px_36px_-22px_rgba(19,25,69,0.7)] md:min-h-[220px]"
                    : "min-h-[54px] border-neutral-300/90 bg-[#f6f5f2] text-brand-navy hover:bg-white",
                  open === 2 && i === 2 && "md:row-span-2",
                )}
              >
                <span
                  className={cn(
                    "pt-2 pl-3 font-serif text-[0.95rem] font-semibold italic tabular-nums md:pt-2.5 md:pl-4",
                    expanded ? "text-white/80" : "text-brand-navy/70",
                  )}
                >
                  {i + 1}.
                </span>
                <span
                  className={cn(
                    "px-3 pb-2 font-sans text-[0.95rem] font-bold leading-snug tracking-[0.01em] md:px-4 md:text-[1.02rem]",
                    expanded ? "pt-1" : "pt-1.5",
                  )}
                >
                  {item.title}
                </span>
                {expanded && (
                  <>
                    {!showDetails && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailOpen(i);
                        }}
                        className="mt-auto w-fit px-3 pb-3 text-[0.9rem] font-bold uppercase tracking-[0.05em] text-white/90 hover:text-white md:px-4 md:pb-4"
                      >
                        +INFO
                      </button>
                    )}
                    {showDetails && SERVICE_DETAILS[i] && (
                      <div className="px-3 pb-3 md:px-4 md:pb-4">
                        <ol className="space-y-1.5 pl-4 text-[0.88rem] leading-relaxed text-white/90 md:text-[0.96rem]">
                          {SERVICE_DETAILS[i].points.map((point, idx) => (
                            <li key={`${i}-${idx}`}>{point}</li>
                          ))}
                        </ol>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailOpen(null);
                          }}
                          className="mt-3 w-fit text-[0.8rem] font-bold uppercase tracking-[0.05em] text-white/75 hover:text-white"
                        >
                          Cerrar info
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
      <div className="relative left-1/2 z-10 mt-0 w-screen max-w-[100vw] -translate-x-1/2 bg-brand-yellowPale px-3 py-2">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-1 text-center font-sans text-[8px] font-bold uppercase leading-tight tracking-[0.12em] text-brand-navy sm:flex-row sm:justify-between sm:gap-4 sm:text-[9px] sm:px-6 md:px-10 md:text-[10px] lg:px-14">
          {RIBBON.map((line, i) => (
            <span key={`ribbon-${i}`} className="min-w-0 flex-1">
              {line}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
