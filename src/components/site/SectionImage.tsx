"use client";

import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

function isRemote(u: string) {
  return u.startsWith("http://") || u.startsWith("https://");
}

export function SectionImage({ src, alt, className, imgClassName, priority }: Props) {
  if (!src || (typeof src === "string" && !src.trim())) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-brand-sky via-brand-cream to-brand-pink/30",
          className,
        )}
        aria-hidden
      />
    );
  }
  const useImgTag = typeof src === "string" && isRemote(src);
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {useImgTag ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={cn("h-full w-full object-cover", imgClassName)} loading={priority ? "eager" : "lazy"} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn("object-cover", imgClassName)}
          priority={priority}
        />
      )}
    </div>
  );
}
