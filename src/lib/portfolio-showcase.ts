import type { StaticImageData } from "next/image";
import signaDesktopCover from "../../assets/images/logo-cover-signa.jpg";

/**
 * Brand's (/portfolio). `id` coincide con la carpeta en `public/portfolio-media/<id>/`.
 * Portadas: `public/portfolio-media/portadas/cover-*-logo.*`
 */
export type PortfolioShowcaseItem = {
  id: string;
  title: string;
  /** Ruta bajo `public/` (p. ej. `/portfolio-media/portadas/...`) */
  cover: string | StaticImageData;
  /** Portada alternativa solo para la ficha interna en desktop. */
  detailCoverDesktop?: string | StaticImageData;
  href?: string | null;
  showText?: boolean;
  category?: string;
  excerpt?: string;
};

/** Orden tipo mockup (filas izq → der, arriba → abajo). 11 portadas. */
export const PORTFOLIO_SHOWCASE: PortfolioShowcaseItem[] = [
  {
    id: "ajna-encuadernaciones",
    title: "Ajna Encuadernaciones",
    cover: "/portfolio-media/portadas/cover-ajna-logo.jpeg",
    detailCoverDesktop: "/portfolio-media/ajna-encuadernaciones/cover-ajna-logo.png",
  },
  {
    id: "cic-roasters",
    title: "CIC Roasters",
    cover: "/portfolio-media/portadas/cover-cic-logo.png",
    detailCoverDesktop: "/portfolio-media/cic-roasters/CIC_RArtboard 10.png",
  },
  {
    id: "carla-scaramuzza",
    title: "Carla Scaramuzza",
    cover: "/portfolio-media/portadas/cover-carla-scaramuzza-logo.png",
    detailCoverDesktop: "/portfolio-media/carla-scaramuzza/7.png",
  },
  {
    id: "play-arch-lab",
    title: "PLA Arch Lab",
    cover: "/portfolio-media/portadas/cover-play-arch-lab-logo.png",
    detailCoverDesktop: "/portfolio-media/play-arch-lab/identidad pla arch lab-11.png",
  },
  {
    id: "fusion-studio",
    title: "Fusion Studio",
    cover: "/portfolio-media/portadas/cover-fusion-logo.png",
    detailCoverDesktop: "/portfolio-media/fusion-studio/1.png",
  },
  {
    id: "lanucci",
    title: "Lanucci",
    cover: "/portfolio-media/portadas/cover-lanucci-logo.png",
    detailCoverDesktop: "/portfolio-media/lanucci/11.png",
  },
  {
    id: "signa-lm",
    title: "SIGNA",
    cover: "/portfolio-media/portadas/cover-signa-logo.png",
    detailCoverDesktop: signaDesktopCover,
  },
  {
    id: "supernova",
    title: "Supernova",
    cover: "/portfolio-media/portadas/cover-supernova-logo.png",
    detailCoverDesktop: "/portfolio-media/supernova/1.png",
  },
  {
    id: "botanico-petit-hotel",
    title: "Botánico Petit Hotel",
    cover: "/portfolio-media/portadas/cover-botanico-logo.png",
    detailCoverDesktop: "/portfolio-media/botanico-petit-hotel/identidad botanico petit hotel_Page_10.png",
  },
  { id: "marian-pacheco", title: "Marian Pacheco", cover: "/portfolio-media/portadas/cover-marian-pacheco-logo.png" },
  {
    id: "malena-rinuado",
    title: "Malena Rinaudo",
    cover: "/portfolio-media/portadas/cover-malena-rinaudo-logo.png",
    detailCoverDesktop: "/portfolio-media/malena-rinuado/1.png",
  },
];
