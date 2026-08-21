import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = join(projectRoot, "pages-dist");
const publicUrl = "https://llens.thamdee.com";
const routes = ["/", "/start", "/knowledge", "/articles", "/articles/learning-psychology", "/articles/child-development", "/articles/individual-differences", "/articles/multiple-intelligences", "/articles/learning-preferences", "/articles/motivation", "/articles/executive-functions", "/articles/inclusive-education", "/articles/udl", "/articles/differentiation", "/articles/assessment-for-learning", "/editorial", "/design-system", "/toolkit", "/paths", "/cases", "/case-finder", "/coach", "/follow-up", "/downloads", "/prompts", "/assessment", "/data", "/about", "/principles"];

function pageFile(pathname) {
  return pathname === "/" ? join(outputDir, "index.html") : join(outputDir, pathname.slice(1), "index.html");
}

async function exists(pathname, message = pathname) {
  await assert.doesNotReject(access(pathname), message);
}

test("GitHub Pages export contains every public route and discovery file", async () => {
  for (const route of routes) await exists(pageFile(route), route);
  for (const file of ["404.html", "CNAME", ".nojekyll", "sitemap.xml", "robots.txt", "static-export.json"]) {
    await exists(join(outputDir, file), file);
  }
  assert.equal((await readFile(join(outputDir, "CNAME"), "utf8")).trim(), "llens.thamdee.com");
  assert.match(await readFile(join(outputDir, "sitemap.xml"), "utf8"), /https:\/\/llens\.thamdee\.com\/toolkit/);
  assert.match(await readFile(join(outputDir, "robots.txt"), "utf8"), /https:\/\/llens\.thamdee\.com\/sitemap\.xml/);
});

test("every route emits its own canonical URL", async () => {
  for (const route of routes) {
    const html = await readFile(pageFile(route), "utf8");
    const expected = `${publicUrl}${route === "/" ? "" : route}`;
    assert.match(html, new RegExp(`<link rel="canonical" href="${expected.replaceAll("/", "\\/")}"`), route);
  }
});

test("all internal links, anchors, downloads and root assets resolve", async () => {
  for (const route of routes) {
    const html = await readFile(pageFile(route), "utf8");
    const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(match => match[1]);

    for (const reference of references) {
      if (/^(?:https?:|mailto:|tel:|data:|javascript:)/.test(reference)) continue;

      const parsed = new URL(reference, `${publicUrl}${route}`);
      if (parsed.origin !== publicUrl) continue;
      const pathname = decodeURIComponent(parsed.pathname);

      if (parsed.hash) {
        const targetHtml = await readFile(pageFile(pathname || route), "utf8");
        const id = parsed.hash.slice(1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        assert.match(targetHtml, new RegExp(`id="${id}"`), `${route} -> ${reference}`);
      }

      if (pathname === "/") {
        await exists(pageFile("/"), `${route} -> ${reference}`);
      } else if (extname(pathname)) {
        await exists(join(outputDir, pathname.slice(1)), `${route} -> ${reference}`);
      } else {
        await exists(pageFile(pathname), `${route} -> ${reference}`);
      }
    }
  }
});

test("404 page offers clear recovery paths", async () => {
  const html = await readFile(join(outputDir, "404.html"), "utf8");
  assert.match(html, /ไม่พบหน้าที่ต้องการ/);
  assert.match(html, /href="\/"/);
  assert.match(html, /href="\/knowledge"/);
  assert.match(html, /href="\/toolkit"/);
});
