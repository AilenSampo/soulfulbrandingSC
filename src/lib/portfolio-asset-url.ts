/** URL para servir un archivo desde `assets/images/portfolio/<id>/` vía API. */
export function portfolioAssetUrl(projectId: string, filename: string) {
  const enc = (s: string) => encodeURIComponent(s);
  return `/api/portfolio-asset/${enc(projectId)}/${enc(filename)}`;
}
