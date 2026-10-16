/**
 * Verifies public/sitemap.xml matches buildPublicUrlInventory().
 * Run: npm run seo:verify
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { buildPublicUrlInventory } from "../lib/seo/publicUrlInventory";

function extractLocs(xml: string): string[] {
  const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g);
  return [...matches].map((m) => m[1]).sort();
}

function main() {
  const sitemapPath = join(process.cwd(), "public", "sitemap.xml");
  if (!existsSync(sitemapPath)) {
    console.error("Missing public/sitemap.xml: run npm run seo:generate");
    process.exit(1);
  }

  const xml = readFileSync(sitemapPath, "utf8");
  const inFile = new Set(extractLocs(xml));
  const expected = new Set(buildPublicUrlInventory().allUrls);

  const missing = [...expected].filter((u) => !inFile.has(u));
  const extra = [...inFile].filter((u) => !expected.has(u));

  if (missing.length || extra.length) {
    if (missing.length) {
      console.error("Missing from sitemap:", missing);
    }
    if (extra.length) {
      console.error("Extra in sitemap:", extra);
    }
    process.exit(1);
  }

  console.log(`seo:verify OK (${inFile.size} URLs)`);
}

main();
