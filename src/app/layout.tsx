import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { ConsentScripts } from "@/components/site/ConsentScripts";
import { CookieBanner } from "@/components/site/CookieBanner";
import "./globals.css";

/**
 * Manual de marca: Helvetica (cuerpo) + Apple Garamond (titulares, citas, institucional).
 * - Helvetica: pila del sistema en Tailwind `font-sans` (no hay licencia web Helvetica en Google Fonts).
 * - Serif: EB Garamond (familia Garamond, uso web). Para Apple Garamond exacta, sustituir por
 *   `next/font/local` con archivos .woff2 del manual.
 */
const garamondSerif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soulful Branding®",
  description: "Estrategia y diseño de marca con propósito.",
  icons: {
    icon: [{ url: "/brand/sc-so-logo.svg", type: "image/svg+xml" }],
    shortcut: "/brand/sc-so-logo.svg",
    apple: "/brand/sc-so-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={garamondSerif.variable}>
      <body className="font-sans font-normal">
        {children}
        <CookieBanner />
        <ConsentScripts />
      </body>
    </html>
  );
}
