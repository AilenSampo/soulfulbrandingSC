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
      <main className="min-h-screen bg-brand-page pb-20 pt-10">
        <div className="mx-auto max-w-6xl px-4">
          <Link
            href="/"
            className="mb-6 inline-block text-[11px] font-bold uppercase tracking-[0.32em] text-brand-navy/80 transition hover:opacity-70 md:mb-8"
          >
            ← Volver
          </Link>
          <h1 className="font-serif text-4xl font-medium text-brand-navy md:text-5xl">Brand&apos;s</h1>
          <PortfolioShowcase items={PORTFOLIO_SHOWCASE} />
        </div>
      </main>
    </>
  );
}
