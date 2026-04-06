import Image from "next/image";
import Link from "next/link";
import type { PortfolioShowcaseItem } from "@/lib/portfolio-showcase";
import { portfolioAssetUrl } from "@/lib/portfolio-asset-url";
import type { PortfolioGalleryFile } from "@/lib/portfolio-gallery";

type Props = {
  item: PortfolioShowcaseItem;
  gallery: PortfolioGalleryFile[];
};

export function PortfolioCaseStudy({ item, gallery }: Props) {
  return (
    <article className="mx-auto max-w-6xl px-4 pb-20 pt-6">
      <Link href="/portfolio" className="text-sm font-medium text-brand-blue hover:underline">
        ← Volver a Brand&apos;s
      </Link>

      <header className="mt-8">
        <h1 className="font-serif text-3xl font-medium text-brand-navy md:text-4xl lg:text-5xl">{item.title}</h1>
      </header>

      <div className="relative mx-auto mt-8 aspect-square max-w-[min(100%,420px)] overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80 md:max-w-[min(100%,520px)]">
        <Image
          src={item.cover}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 520px"
          priority
        />
      </div>

      {gallery.length > 0 && (
        <div className="mt-12">
          <h2 className="sr-only">Trabajo</h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            {gallery.map((g) => {
              const src = portfolioAssetUrl(item.id, g.filename);
              return (
                <li key={g.filename} className="overflow-hidden rounded-xl bg-neutral-50 ring-1 ring-neutral-200/60">
                  {g.kind === "video" ? (
                    <video src={src} controls muted playsInline className="h-auto w-full object-contain" preload="metadata" />
                  ) : (
                    <div className="relative aspect-[4/3] w-full bg-neutral-100">
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        unoptimized
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </article>
  );
}
