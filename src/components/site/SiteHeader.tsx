"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { NavItem } from "@/lib/site-content";
import { cn } from "@/lib/cn";

type Props = {
  nav: NavItem[];
};

export function SiteHeader({ nav }: Props) {
  const [open, setOpen] = useState(false);
  const displayNav = nav.map((item) =>
    item.label.toLowerCase() === "portfolio" || item.href === "/portfolio"
      ? { ...item, label: "Brand´s" }
      : item,
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#333130]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6 md:py-4 lg:px-10 xl:px-14 lg:py-5">
        <Link
          href="/"
          className="relative h-12 w-[min(72vw,13.5rem)] shrink-0 sm:h-14 sm:w-[15rem] md:h-16 md:w-[17rem] lg:h-[4.25rem] lg:w-[19rem]"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logoclaro.png"
            alt="Soulful Branding"
            fill
            className="object-contain object-left"
            priority
            sizes="(max-width: 640px) 216px, (max-width: 768px) 240px, (max-width: 1024px) 272px, 304px"
          />
        </Link>
        <nav className="hidden items-center gap-7 md:flex lg:gap-10">
          {displayNav.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="text-[11px] font-semibold tracking-[0.03em] text-white/95 transition hover:text-white/70 lg:text-xl"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="rounded-md p-2 md:hidden"
          aria-expanded={open}
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="mt-1.5 block h-0.5 w-6 bg-white" />
          <span className="mt-1.5 block h-0.5 w-6 bg-white" />
        </button>
      </div>
      <div
        className={cn(
          "border-t border-white/10 bg-[#333130] md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-0.5 px-4 py-3">
          {displayNav.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="rounded-md px-3 py-2.5 text-sm font-medium tracking-[0.02em] text-white/95 hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
