"use client";

import { useState } from "react";
import { TestimonialBodyParagraphs } from "@/components/site/TestimonialBodyParagraphs";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/lib/testimonials";

type Props = { testimonial: Testimonial; className?: string };

export function CaseStudyTestimonialDisclosure({ testimonial, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("md:hidden", className)}>
      <details
        className="group overflow-hidden rounded-2xl border border-brand-navy/10 bg-white/90 shadow-[0_6px_22px_-10px_rgba(19,25,69,0.18)] open:shadow-[0_8px_28px_-12px_rgba(19,25,69,0.2)]"
        onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
      >
        <summary
          className="flex list-none cursor-pointer select-none items-center justify-between gap-3 px-4 py-3.5 pr-3 font-sans text-sm font-semibold text-brand-navy transition hover:bg-black/[0.02] [&::-webkit-details-marker]:hidden"
        >
          <span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/50">Testimonio</span>
            <span className="mt-0.5 block text-base text-brand-magenta">{testimonial.brand}</span>
          </span>
          <span
            className={cn(
              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-navy/10 bg-white text-sm text-brand-navy/70 transition",
              open && "border-brand-magenta/30 text-brand-magenta",
            )}
            aria-hidden
          >
            {open ? "−" : "+"}
          </span>
        </summary>
        <div className="border-t border-brand-navy/10 px-4 pb-4 pt-1">
          <TestimonialBodyParagraphs text={testimonial.body} />
        </div>
      </details>
    </div>
  );
}
