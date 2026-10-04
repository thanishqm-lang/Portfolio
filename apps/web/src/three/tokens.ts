/** Reads a design token from the page, so 3D colours come from tokens.css and never from code (tenet 7). */
export function readCssToken(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
