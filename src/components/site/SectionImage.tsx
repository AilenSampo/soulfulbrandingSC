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

/** Evita mezclar `object-cover` con `object-contain` (en CSS gana una regla arbitraria y suele recortar mal). */
function hasCustomObjectFit(imgClassName?: string) {
  if (!imgClassName?.trim()) return false;
  return (
    /\bobject-(cover|contain|fill|none|scale-down)\b/.test(imgClassName) ||
    /\bobject-\[/.test(imgClassName)
  );
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
  const isLocalPublic =
    typeof src === "string" && src.startsWith("/") && !isRemote(src);
  /** En local el optimizador (`/_next/image`) a veces falla en Windows; servimos el archivo tal cual en dev. */
  const unoptimizedDev = process.env.NODE_ENV === "development" && isLocalPublic;
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {useImgTag ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={cn("h-full w-full", !hasCustomObjectFit(imgClassName) && "object-cover", imgClassName)}
          loading={priority ? "eager" : "lazy"}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(!hasCustomObjectFit(imgClassName) && "object-cover", imgClassName)}
          priority={priority}
          unoptimized={unoptimizedDev}
        />
      )}
    </div>
  );
}
