import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("home renders real navigation and creator information", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  for (const href of ["/knowledge", "/toolkit", "/paths", "/cases", "/coach", "/about"]) assert.match(html, new RegExp(`href="${href}"`));
  assert.match(html, /Boorapatis Ploysuwan/);
  assert.match(html, /mailto:burapatis@gmail\.com/);
  assert.doesNotMatch(html, /#case-detail|href="#principles"/);
});

test("all destination pages server-render successfully", async () => {
  const routes = ["/knowledge", "/toolkit", "/paths", "/cases", "/coach", "/downloads", "/prompts", "/assessment", "/about", "/principles"];
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, route);
  }
});

test("deep-link targets exist on knowledge, cases and principles pages", async () => {
  const [knowledge, cases, principles] = await Promise.all([render("/knowledge").then(r=>r.text()), render("/cases").then(r=>r.text()), render("/principles").then(r=>r.text())]);
  for (const id of ["learning-psychology", "child-development", "individual-differences", "motivation", "udl", "differentiation"]) assert.match(knowledge, new RegExp(`id="${id}"`));
  for (const id of ["voice-choice", "meaningful-goals", "scaffolding"]) assert.match(cases, new RegExp(`id="${id}"`));
  for (const id of ["privacy", "responsible-ai", "accessibility"]) assert.match(principles, new RegExp(`id="${id}"`));
});
