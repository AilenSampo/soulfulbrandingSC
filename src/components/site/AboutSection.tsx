import Link from "next/link";
import type { SiteContentData } from "@/lib/site-content";
import { SectionImage } from "@/components/site/SectionImage";
import { SectionShell } from "@/components/site/SectionShell";

type Props = { about: SiteContentData["about"] };

const finePrintClass =
  "w-full text-justify text-[0.625rem] font-normal leading-[1.45] text-brand-navy/45 md:text-[0.625rem] md:leading-[1.36] md:text-brand-blue/75 lg:text-[0.6875rem] lg:leading-[1.4]";

export function AboutSection({ about }: Props) {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-brand-cream pb-20 pt-14 md:py-10 md:pb-12 lg:py-12 lg:pb-14"
    >
      <SectionShell>
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:items-center md:gap-8 lg:gap-10">
          {/* Mobile: títulos + imagen con overlay */}
          <div className="md:col-span-2 md:hidden">
            <div className="text-center">
              <p className="hidden font-sans text-xs font-bold uppercase tracking-[0.28em] text-brand-navy">
                {about.heading}
              </p>
              <p className="mt-3 font-sans text-[clamp(1.25rem,4.8vw,1.65rem)] font-bold uppercase tracking-[0.1em] text-brand-navy">
                SOFIA CIABATTONI
              </p>
            </div>
            <div className="relative mx-auto mt-8 aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm shadow-[0_20px_50px_-20px_rgba(19,25,69,0.35)]">
              <SectionImage
                src={about.imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full"
                imgClassName="object-cover object-[center_18%]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/75 via-brand-navy/55 to-black/80"
                aria-hidden
              />
              <div className="absolute inset-0 bg-neutral-900/35" aria-hidden />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-5 py-10 text-center">
                <p className="max-w-[22rem] font-sans text-[0.9375rem] font-normal leading-[1.6] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  {about.body}
                </p>
                <Link
                  href="/about"
                  className="mt-7 inline-block text-[11px] font-bold uppercase tracking-normal text-white underline decoration-white/90 underline-offset-[6px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]"
                >
                  {about.readMoreLabel}
                </Link>
              </div>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full overflow-hidden rounded-sm shadow-[0_20px_50px_-20px_rgba(19,25,69,0.35)] md:mx-0 md:block md:h-[500px] md:w-[min(44vw,500px)] md:max-w-none md:justify-self-start lg:h-[540px] lg:w-[min(42vw,540px)]">
            <SectionImage src={about.imageUrl} alt="About" className="absolute inset-0 h-full w-full" imgClassName="object-cover object-[center_24%]" />
          </div>
          <div className="hidden max-w-xl md:flex md:min-h-[500px] md:max-w-md md:flex-col md:items-center md:justify-center md:justify-self-center md:text-center lg:min-h-[540px] lg:max-w-lg">
            <h2 className="font-serif text-[clamp(3rem,8vw,4.5rem)] font-semibold italic leading-[0.95] tracking-tight text-brand-blue md:text-[clamp(2.5rem,3.8vw,3.5rem)] lg:text-[clamp(2.75rem,4vw,4rem)]">
              {about.heading}
            </h2>
            <p className="mt-8 text-base font-normal leading-[1.65] text-brand-navy/88 md:text-[0.9375rem] md:leading-[1.55] lg:mt-9 lg:text-base lg:leading-[1.6]">
              {about.body}
            </p>
            <Link
              href="/about"
              className="mt-10 inline-block text-xs font-bold uppercase tracking-normal text-brand-navy transition hover:opacity-70 md:mt-9 lg:mt-10"
            >
              {about.readMoreLabel}
            </Link>
          </div>

          {about.finePrint ? (
            <p className={`mt-5 md:col-span-2 md:mt-3 ${finePrintClass}`}>{about.finePrint}</p>
          ) : null}
        </div>
      </SectionShell>
    </section>
  );
}
