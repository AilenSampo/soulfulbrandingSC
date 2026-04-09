"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { PortfolioShowcaseItem } from "@/lib/portfolio-showcase";
import { SectionImage } from "@/components/site/SectionImage";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type Props = { items: PortfolioShowcaseItem[] };

export function PortfolioShowcase({ items }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [landed, setLanded] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const DESKTOP_LAYOUT = [
    { w: 260, h: 330, dy: 18, rot: -1.6 },
    { w: 320, h: 410, dy: -12, rot: 0.8 },
    { w: 280, h: 360, dy: 36, rot: -0.7 },
    { w: 340, h: 430, dy: -24, rot: 1.3 },
    { w: 260, h: 330, dy: 26, rot: -1.1 },
    { w: 300, h: 390, dy: -16, rot: 0.5 },
  ] as const;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    if (mq.matches) setLanded(true);
    const onChange = () => {
      setReduceMotion(mq.matches);
      if (mq.matches) setLanded(true);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLanded(true);
          io.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onWheel = (ev: WheelEvent) => {
      const mostlyVertical = Math.abs(ev.deltaY) > Math.abs(ev.deltaX);
      if (!mostlyVertical) return;
      const canScroll =
        scroller.scrollWidth > scroller.clientWidth &&
        (scroller.scrollLeft > 0 || ev.deltaY > 0) &&
        (scroller.scrollLeft < scroller.scrollWidth - scroller.clientWidth || ev.deltaY < 0);
      if (!canScroll) return;
      ev.preventDefault();
      scroller.scrollLeft += ev.deltaY * 1.1;
    };
    scroller.addEventListener("wheel", onWheel, { passive: false });
    return () => scroller.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="relative mt-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-16 bg-gradient-to-r from-brand-page to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-16 bg-gradient-to-l from-brand-page to-transparent md:block" />
      <div
        ref={scrollerRef}
        className="relative overflow-visible md:overflow-x-auto md:overflow-y-hidden md:py-8 md:[scrollbar-width:thin]"
      >
        <div
          ref={gridRef}
          className="relative mx-auto grid max-w-6xl grid-cols-2 gap-4 px-0 py-6 sm:gap-5 md:flex md:w-max md:max-w-none md:items-start md:gap-6 md:px-16 md:py-4 lg:gap-8"
        >
        {items.map((p, i) => {
          const showText = p.showText === true && (Boolean(p.category) || Boolean(p.excerpt));
          const layout = DESKTOP_LAYOUT[i % DESKTOP_LAYOUT.length];

          const delayMs = i * 62;
          const transitionMs = 960 + (i % 6) * 40;

          const motionStyle: CSSProperties = {};
          if (reduceMotion) {
            motionStyle.opacity = 1;
          } else if (!landed) {
            motionStyle.opacity = 0;
            motionStyle.transform = "translateY(12px)";
            motionStyle.transition = "none";
          } else {
            motionStyle.opacity = 1;
            motionStyle.transform = "translateY(0)";
            motionStyle.transition = `opacity ${transitionMs}ms ${EASE} ${delayMs}ms, transform ${transitionMs}ms ${EASE} ${delayMs}ms`;
          }
          motionStyle.width = `${layout.w}px`;
          motionStyle.minWidth = `${layout.w}px`;
          motionStyle.transform = reduceMotion
            ? undefined
            : landed
              ? `translateY(${layout.dy}px) rotate(${layout.rot}deg)`
              : `translateY(${layout.dy + 18}px) rotate(${layout.rot}deg)`;

          const inner = (
            <>
              <div
                className={cn(
                  "relative w-full overflow-hidden rounded-xl",
                  "transition-transform duration-300 group-hover:brightness-105",
                )}
                style={{ height: `${layout.h}px` }}
              >
                <SectionImage
                  src={p.cover}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-[1.06]"
                  imgClassName="object-cover"
                />
              </div>
              {showText ? (
                <div className="p-4">
                  {p.category && (
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-magenta">{p.category}</p>
                  )}
                  <h2 className="mt-1 font-sans text-base font-bold text-brand-navy">{p.title}</h2>
                  {p.excerpt && <p className="mt-2 line-clamp-3 text-sm text-brand-navy/70">{p.excerpt}</p>}
                </div>
              ) : (
                <span className="sr-only">{p.title}</span>
              )}
            </>
          );

          const href = p.href ?? `/portfolio/${p.id}`;

          const shell = cn(
            "group block overflow-hidden rounded-2xl transition-all duration-300 ease-out",
            "hover:z-30 hover:scale-[1.03] hover:shadow-[10px_10px_0_0_rgba(19,25,69,0.12)]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
          );

          const wrapClass = cn(!reduceMotion && "will-change-[opacity,transform]");

          if (p.href === null) {
            return (
              <div key={p.id ?? `${p.title}-${i}`} className={cn(wrapClass, "max-md:w-full max-md:min-w-0")} style={motionStyle}>
                <div className={cn(shell, "cursor-default")}>{inner}</div>
              </div>
            );
          }

          return (
            <div key={p.id ?? `${p.title}-${i}`} className={cn(wrapClass, "max-md:w-full max-md:min-w-0")} style={motionStyle}>
              <Link href={href} className={cn(shell, "cursor-pointer")}>
                {inner}
              </Link>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
