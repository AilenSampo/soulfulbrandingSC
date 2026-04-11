import Link from "next/link";
import { getSiteContent } from "@/lib/content";
import { PORTFOLIO_SHOWCASE } from "@/lib/portfolio-showcase";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PortfolioShowcase } from "@/components/site/PortfolioShowcase";

export const metadata = {
  title: "Portfolio | Soulful Branding®",
};

export default async function PortfolioPage() {
  const c = await getSiteContent();

  return (
    <>
      <SiteHeader nav={c.nav} />
      <main className="min-h-screen flex-1 bg-brand-page pb-20 pt-10 md:flex md:min-h-0 md:flex-col md:overflow-hidden md:pb-6 md:pt-3">
        <div className="mx-auto flex max-w-6xl flex-col px-4 md:min-h-0 md:flex-1">
          <Link
            href="/"
            className="mb-6 inline-block text-[11px] font-bold uppercase tracking-[0.32em] text-brand-navy/80 transition hover:opacity-70 md:mb-2"
          >
            ← Volver
          </Link>
          <h1 className="font-serif text-4xl font-medium leading-tight text-brand-navy md:text-4xl lg:text-5xl">Brand&apos;s</h1>
          <PortfolioShowcase items={PORTFOLIO_SHOWCASE} />
        </div>
      </main>
    </>
  );
}
