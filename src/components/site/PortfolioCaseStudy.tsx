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
  const desktopCover = item.detailCoverDesktop ?? item.cover;
  const desktopCoverSrc = typeof desktopCover === "string" ? desktopCover : desktopCover.src;
  const desktopGalleryFilename =
    typeof item.detailCoverDesktop === "string" && item.detailCoverDesktop.startsWith(`/portfolio-media/${item.id}/`)
      ? decodeURIComponent(item.detailCoverDesktop.split("/").pop() ?? "")
      : null;

  return (
    <article className="mx-auto max-w-6xl px-4 pb-20 pt-6">
      <Link href="/portfolio" className="text-sm font-medium text-brand-blue hover:underline">
        ← Volver a Brand&apos;s
      </Link>

      <header className="mt-8">
        <h1 className="font-serif text-3xl font-medium text-brand-navy md:text-4xl lg:text-5xl">{item.title}</h1>
      </header>

      <div className="relative mt-8 aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80 md:hidden">
        <Image
          src={item.cover}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="mt-8 hidden w-full md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={desktopCoverSrc} alt="" className="block h-auto w-full" loading="eager" />
      </div>

      {gallery.length > 0 && (
        <div className="mt-0">
          <h2 className="sr-only">Trabajo</h2>
          <ul className="flex flex-col gap-0">
            {gallery.map((g) => {
              const src = portfolioAssetUrl(item.id, g.filename);
              return (
                <li key={g.filename} className={g.filename === desktopGalleryFilename ? "overflow-hidden md:hidden" : "overflow-hidden"}>
                  {g.kind === "video" ? (
                    <video src={src} controls muted playsInline className="block h-auto w-full object-contain" preload="metadata" />
                  ) : (
                    // Usamos la proporción real del archivo para evitar aire artificial entre piezas.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt="" className="block h-auto w-full" loading="lazy" />
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
