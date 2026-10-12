/**
 * build.mjs — render the investor one-sheet to a single-page US Letter PDF.
 *
 *   npx tsx scripts/onesheet/build.mjs      (or: node scripts/onesheet/build.mjs)
 *
 * Uses the Playwright chromium already cached on this machine. The HTML is
 * styled from the same palette and type pairing as /i/bizintro, with the
 * animated pieces rendered as their final composed state.
 */
import { chromium } from "playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.argv[2] || path.join(here, "../../public/Lisnin_OneSheet_2026.pdf");

const qr = await readFile(path.join(here, "qr.inline.svg"), "utf8");
const logo = await readFile(path.join(here, "../../public/lisnin-logo__black.svg"), "utf8");

let html = await readFile(path.join(here, "onesheet.html"), "utf8");
html = html.replace("<!--QR-->", qr).replace("<!--LOGO-->", logo);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluateHandle("document.fonts.ready");

// Report overflow before writing, so a second page can never ship silently.
const fit = await page.evaluate(() => {
  const el = document.querySelector(".sheet");
  return { contentPx: el.scrollHeight, framePx: el.clientHeight };
});

await mkdir(path.dirname(OUT), { recursive: true });
await page.pdf({
  path: OUT,
  format: "Letter",
  printBackground: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
});
await browser.close();

const over = fit.contentPx - fit.framePx;
console.log(`content ${fit.contentPx}px / frame ${fit.framePx}px  →  ${over > 0 ? `OVERFLOW ${over}px` : `fits (${Math.abs(over)}px spare)`}`);
console.log("written:", OUT);
if (over > 0) process.exitCode = 2;
