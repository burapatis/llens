import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = join(projectRoot, "dist", "client");
const workerFile = join(projectRoot, "dist", "server", "index.js");
const outputDir = join(projectRoot, "pages-dist");
const routes = [
  "/",
  "/knowledge",
  "/articles",
  "/articles/learning-psychology",
  "/articles/child-development",
  "/articles/individual-differences",
  "/articles/multiple-intelligences",
  "/articles/learning-preferences",
  "/articles/motivation",
  "/articles/executive-functions",
  "/articles/inclusive-education",
  "/articles/udl",
  "/articles/differentiation",
  "/articles/assessment-for-learning",
  "/editorial",
  "/design-system",
  "/start",
  "/whole-learner",
  "/toolkit",
  "/paths",
  "/cases",
  "/case-finder",
  "/coach",
  "/follow-up",
  "/downloads",
  "/prompts",
  "/assessment",
  "/data",
  "/about",
  "/principles",
];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });
await writeFile(join(outputDir, ".nojekyll"), "");
await writeFile(join(outputDir, "CNAME"), "llens.thamdee.com\n");

const { default: worker } = await import(
  `${pathToFileURL(workerFile).href}?static-export=${Date.now()}`
);

const assets = {
  async fetch(request) {
    const pathname = decodeURIComponent(new URL(request.url).pathname);
    const relativePath = pathname.replace(/^\/+/, "");
    if (!relativePath || relativePath.includes("..")) {
      return new Response("Not found", { status: 404 });
    }
    try {
      return new Response(await readFile(join(clientDir, relativePath)));
    } catch {
      return new Response("Not found", { status: 404 });
    }
  },
};

async function request(pathname) {
  return worker.fetch(
    new Request(`https://llens.thamdee.com${pathname}`, {
      headers: { accept: pathname.endsWith(".xml") ? "application/xml" : "text/html" },
    }),
    { ASSETS: assets },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function saveResponse(pathname, target, expectedStatus = 200) {
  const response = await request(pathname);
  if (response.status !== expectedStatus) {
    throw new Error(`${pathname} returned ${response.status}; expected ${expectedStatus}`);
  }
  const destination = join(outputDir, target);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, await response.text());
}

for (const route of routes) {
  const target = route === "/" ? "index.html" : `${route.slice(1)}/index.html`;
  await saveResponse(route, target);
}

await saveResponse("/sitemap.xml", "sitemap.xml");
await saveResponse("/robots.txt", "robots.txt");
await saveResponse("/page-that-does-not-exist", "404.html", 404);

await writeFile(
  join(outputDir, "static-export.json"),
  JSON.stringify({ site: "LearnerLens", domain: "llens.thamdee.com", routes }, null, 2),
);

console.log(`GitHub Pages export created with ${routes.length} routes.`);
