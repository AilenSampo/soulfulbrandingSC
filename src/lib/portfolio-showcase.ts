import type { StaticImageData } from "next/image";
import coverAjna from "../../assets/images/portfolio/portadas/cover-ajna-logo.jpeg";
import coverBotanico from "../../assets/images/portfolio/portadas/cover-botanico-logo.png";
import coverCarla from "../../assets/images/portfolio/portadas/cover-carla-scaramuzza-logo.png";
import coverCic from "../../assets/images/portfolio/portadas/cover-cic-logo.png";
import coverFusion from "../../assets/images/portfolio/portadas/cover-fusion-logo.png";
import coverLanucci from "../../assets/images/portfolio/portadas/cover-lanucci-logo.png";
import coverMalena from "../../assets/images/portfolio/portadas/cover-malena-rinaudo-logo.png";
import coverMarian from "../../assets/images/portfolio/portadas/cover-marian-pacheco-logo.png";
import coverPlayArch from "../../assets/images/portfolio/portadas/cover-play-arch-lab-logo.png";
import coverSigna from "../../assets/images/portfolio/portadas/cover-signa-logo.png";
import coverSupernova from "../../assets/images/portfolio/portadas/cover-supernova-logo.png";

/**
 * Brand's (/portfolio). `id` coincide con la carpeta del proyecto en
 * `assets/images/portfolio/<id>/` para vincular galerías o ficha después.
 * Portadas: `assets/images/portfolio/portadas/cover-*-logo.*`
 */
export type PortfolioShowcaseItem = {
  id: string;
  title: string;
  cover: StaticImageData;
  href?: string | null;
  showText?: boolean;
  category?: string;
  excerpt?: string;
};

/** Orden tipo mockup (filas izq → der, arriba → abajo). 11 portadas. */
export const PORTFOLIO_SHOWCASE: PortfolioShowcaseItem[] = [
  { id: "ajna-encuadernaciones", title: "Ajna Encuadernaciones", cover: coverAjna },
  { id: "cic-roasters", title: "CIC Roasters", cover: coverCic },
  { id: "carla-scaramuzza", title: "Carla Scaramuzza", cover: coverCarla },
  { id: "play-arch-lab", title: "PLA Arch Lab", cover: coverPlayArch },
  { id: "fusion-studio", title: "Fusion Studio", cover: coverFusion },
  { id: "lanucci", title: "Lanucci", cover: coverLanucci },
  { id: "signa-lm", title: "SIGNA", cover: coverSigna },
  { id: "supernova", title: "Supernova", cover: coverSupernova },
  { id: "botanico-petit-hotel", title: "Botánico Petit Hotel", cover: coverBotanico },
  { id: "marian-pacheco", title: "Marian Pacheco", cover: coverMarian },
  { id: "malena-rinuado", title: "Malena Rinaudo", cover: coverMalena },
];
