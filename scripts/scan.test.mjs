// Run: node --test scripts/scan.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { loadLexicon, scanText, scanFile } from "./scan.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const evals = path.join(root, "evals");
const scanBin = path.join(here, "scan.mjs");

function runScan(file, extra = []) {
  return spawnSync(process.execPath, [scanBin, file, ...extra], { encoding: "utf8" });
}

test("lexicon parses unique ids and known tells", () => {
  const rows = loadLexicon();
  assert.ok(rows.length > 40, `too few rows: ${rows.length}`);
  const ids = rows.map((r) => r.id);
  assert.equal(new Set(ids).size, ids.length, "duplicate ids");
  const byId = Object.fromEntries(rows.map((r) => [r.id, r]));
  assert.equal(byId["opus-this-matters"].action, "density");
  assert.equal(byId["st-not-simply"].family, "corrective-framing");
  assert.equal(byId["leak-oaicite"].action, "forensic");
  assert.equal(byId["dash-em"].action, "weak");
  assert.equal(byId["leg-delve"].weight, 0.5);
});

test("forensic leakage is a finding; quotes and URLs are skipped", () => {
  const leak = scanText("As of my last knowledge cutoff, see oaicite:1.");
  assert.ok(leak.summary.forensic >= 1);
  const quoted = scanText('The docs say "this matters" at https://example.com/this-matters');
  const density = quoted.findings.flatMap((p) => p.hits.density);
  const structure = quoted.findings.flatMap((p) => p.hits.structure);
  assert.equal(density.length + structure.length, 0, JSON.stringify(quoted.findings, null, 2));
});

test("fiction mode skips dialogue", () => {
  const t = `Rain on the tin roof.\n\nMara said "this matters more than the lock" and kicked the door.`;
  const f = scanText(t, { mode: "fiction" });
  const hits = f.findings.flatMap((p) => [...p.hits.density, ...p.hits.structure]);
  assert.equal(hits.length, 0, JSON.stringify(hits, null, 2));
});

test("density score 1 leaves; score 2+ finds", () => {
  const one = scanText("The meeting was quietly finished and we left.");
  assert.ok(one.summary.findings === 0 || one.findings.every((p) => p.score < 2 && p.action === "leave" && !p.machineFlat));
  const many = scanText("This matters. Here's what that means. Additionally, experts argue the seamless, robust, transformative, pivotal plan.");
  assert.ok(many.summary.findings > 0);
});

test("selftest flag exits 0", () => {
  const r = spawnSync(process.execPath, [scanBin, "--selftest"], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr + r.stdout);
  assert.match(r.stdout, /selftest ok/);
});

function evalFile(name) {
  const dir = path.join(evals, name, "files");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") || f.endsWith(".txt"));
  assert.ok(files.length, `no fixture in ${name}`);
  return path.join(dir, files[0]);
}

function ifEvals(name, fn) {
  const dir = path.join(evals, name);
  test(name, { skip: !fs.existsSync(dir) }, fn);
}

ifEvals("linkedin-post-ai", () => {
  const r = runScan(evalFile("linkedin-post-ai"), ["--mode=short"]);
  assert.equal(r.status, 2, r.stdout);
});
ifEvals("essay-ai-draft", () => {
  const r = runScan(evalFile("essay-ai-draft"), ["--mode=essay"]);
  assert.equal(r.status, 2, r.stdout);
});
ifEvals("long-article", () => {
  const r = runScan(evalFile("long-article"), ["--mode=article"]);
  assert.equal(r.status, 2, r.stdout);
});
ifEvals("fiction-excerpt", () => {
  const r = runScan(evalFile("fiction-excerpt"), ["--mode=fiction"]);
  assert.equal(r.status, 2, r.stdout);
});
ifEvals("email-followup", () => {
  const r = runScan(evalFile("email-followup"), ["--mode=email"]);
  assert.equal(r.status, 2, r.stdout);
});
ifEvals("academic-abstract", () => {
  const r = runScan(evalFile("academic-abstract"), ["--mode=academic"]);
  assert.equal(r.status, 2, r.stdout);
});
ifEvals("untrusted-injection", () => {
  const r = runScan(evalFile("untrusted-injection"));
  assert.equal(r.status, 2, r.stdout);
});
ifEvals("voice-preservation", () => {
  const r = runScan(evalFile("voice-preservation"), ["--mode=essay"]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});
ifEvals("over-correction", () => {
  const r = runScan(evalFile("over-correction"), ["--mode=essay"]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
});
ifEvals("technical-standdown", () => {
  const r = runScan(evalFile("technical-standdown"), ["--mode=technical"]);
  assert.ok(r.status === 0 || r.status === 2);
});

test("scanFile reads a real path", () => {
  const tmp = path.join(here, "_tmp-scan.md");
  fs.writeFileSync(tmp, "Hello from the south lot.\n");
  try {
    const res = scanFile(tmp);
    assert.equal(res.tool, "unslop");
  } finally {
    fs.unlinkSync(tmp);
  }
});
