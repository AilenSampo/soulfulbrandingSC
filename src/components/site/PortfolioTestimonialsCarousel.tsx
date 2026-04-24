"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { TestimonialBodyParagraphs } from "@/components/site/TestimonialBodyParagraphs";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/lib/testimonials";

type Props = { items: Testimonial[] };

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function PortfolioTestimonialsCarousel({ items }: Props) {
  const [index, setIndex] = useState(0);
  const n = items.length;
  const labelId = useId();
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (n < 1) return;
      setIndex((i) => (i + dir + n) % n);
    },
    [n],
  );

  useEffect(() => {
    if (n < 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, n]);

  if (n < 1) return null;

  return (
    <section className="w-full" aria-labelledby={labelId}>
      <h2 id={labelId} className="font-serif text-3xl font-medium text-brand-navy md:text-4xl">
        Testimonios
      </h2>
      <p className="mt-1 text-sm text-brand-navy/60">Voces de quienes trabajaron el alma de su marca con nosotras.</p>

      <div
        className="relative mt-8 overflow-hidden"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchStartX.current;
          touchStartX.current = null;
          if (start == null) return;
          const end = e.changedTouches[0]?.clientX;
          if (end == null) return;
          const d = end - start;
          if (Math.abs(d) < 48) return;
          if (d < 0) go(1);
          else go(-1);
        }}
      >
        <div
          className="flex w-full will-change-transform"
          style={{
            transform: `translate3d(-${index * 100}%,0,0)`,
            transition: `transform 520ms ${EASE}`,
          }}
        >
          {items.map((t, i) => (
            <div
              key={`${t.brand}-${i}`}
              className="w-full min-w-0 shrink-0 grow-0 basis-full px-0.5"
            >
              <article className="mx-auto max-w-3xl rounded-2xl border border-brand-navy/10 bg-white/80 px-5 py-6 shadow-[0_8px_28px_-12px_rgba(19,25,69,0.2)] md:px-8 md:py-8">
                <h3 className="font-sans text-lg font-bold text-brand-magenta md:text-xl">{t.brand}</h3>
                <div className="mt-4">
                  <TestimonialBodyParagraphs text={t.body} />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-navy/15 bg-white",
              "text-brand-navy transition hover:border-brand-magenta/40 hover:text-brand-magenta",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
            )}
            aria-label="Testimonio anterior"
          >
            <span aria-hidden className="text-lg leading-none">
              ←
            </span>
          </button>
          <span
            className="min-w-[4.5rem] text-center text-xs font-medium tabular-nums text-brand-navy/60"
            aria-live="polite"
          >
            {index + 1} / {n}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-navy/15 bg-white",
              "text-brand-navy transition hover:border-brand-magenta/40 hover:text-brand-magenta",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
            )}
            aria-label="Testimonio siguiente"
          >
            <span aria-hidden className="text-lg leading-none">
              →
            </span>
          </button>
        </div>
        <div className="flex max-w-full flex-wrap justify-center gap-1.5 px-1" aria-label="Elegir testimonio">
          {items.map((t, i) => (
            <button
              key={`dot-${t.brand}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition",
                i === index ? "scale-110 bg-brand-magenta" : "bg-brand-navy/20 hover:bg-brand-navy/40",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
              )}
              aria-label={`${t.brand}, testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
