import { readFile } from "fs/promises";
import path from "path";

const LEGAL_DIR = path.join(process.cwd(), "files");

/** Quita el H1 inicial del .md para no duplicar el título de la página. */
function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s[^\n]*\r?\n+/, "");
}

export async function readLegalMarkdownFile(filename: string): Promise<string> {
  const filePath = path.join(LEGAL_DIR, filename);
  const raw = await readFile(filePath, "utf-8");
  return stripLeadingH1(raw);
}
