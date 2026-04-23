import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import type { NavItem } from "@/lib/site-content";

type Props = {
  title: string;
  nav: NavItem[];
  children: ReactNode;
};

export function LegalDocShell({ title, nav, children }: Props) {
  return (
    <>
      <SiteHeader nav={nav} />
      <main className="min-h-screen bg-brand-page pb-16 pt-8">
        <div className="mx-auto max-w-3xl px-4">
          <Link
            href="/"
            className="mb-6 inline-block text-[11px] font-bold uppercase tracking-[0.32em] text-brand-navy/80 transition hover:opacity-70"
          >
            ← Volver
          </Link>
          <h1 className="font-serif text-3xl font-medium text-brand-navy md:text-4xl">{title}</h1>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-neutral-700 [&_a]:text-brand-blue [&_a]:underline [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:font-sans [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-brand-navy [&_h2]:first:mt-0 [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
