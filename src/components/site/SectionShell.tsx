import { cn } from "@/lib/cn";

/** Ancho máximo tipo artboard 1440px + márgenes laterales del mockup */
export function SectionShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-14", className)}>{children}</div>;
}
