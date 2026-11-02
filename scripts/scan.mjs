#!/usr/bin/env node
// unslop scanner: report-only density / forensic / rhythm flags. Zero dependencies, Node 18+.
// Terms come from references/lexicon-2026.md (single source of truth). Does not rewrite.
//
// Usage: node scan.mjs <file|-> [--mode=…] [--json] [--outline] [--selftest] [--help]
// Exit: 0 clean, 2 findings, 1 error.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const VERSION = "2.0.0";
const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, "..");
const LEXICON_PATH = path.join(ROOT, "references", "lexicon-2026.md");

const MODES = new Set(["short", "essay", "article", "longform", "fiction", "poetry", "business", "email", "academic", "technical"]);

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseLexicon(md) {
  const rows = [];
  const seen = new Set();
  const lines = md.split(/\r?\n/);
  let inTable = false;
  let headers = [];
  for (const line of lines) {
    if (!line.startsWith("|")) {
      inTable = false;
      headers = [];
      continue;
    }
    const cells = line.split("|").slice(1, -1).map((c) => c.trim());
    if (cells.every((c) => /^[-:]+$/.test(c))) continue;
    if (!inTable) {
      headers = cells.map((h) => h.toLowerCase());
      inTable = headers[0] === "id" && headers.includes("pattern") && headers.includes("action");
      continue;
    }
    if (!inTable || cells.length < headers.length) continue;
    const rec = {};
    headers.forEach((h, i) => { rec[h] = cells[i]; });
    if (!rec.id || !rec.pattern || rec.id === "id") continue;
    if (seen.has(rec.pattern)) continue;
    seen.add(rec.pattern);
    rec.weight = Number(rec.weight);
    if (!Number.isFinite(rec.weight)) rec.weight = 1;
    rec.re = compilePattern(rec.pattern, rec.kind);
    rows.push(rec);
  }
  return rows;
}

function compilePattern(pattern, kind) {
  if (kind === "regex") {
    try { return new RegExp(pattern, "giu"); } catch { return new RegExp(escapeRe(pattern), "gi"); }
  }
  if (kind === "frame") {
    const parts = pattern.split("_").map((p) => p.trim()).filter(Boolean).map(escapeRe);
    const gap = "\\s+\\S+(?:\\s+\\S+){0,2}";
    const body = parts.join(gap);
    return new RegExp(`(?<![\\p{L}\\p{N}])${body}(?![\\p{L}\\p{N}])`, "giu");
  }
  const body = escapeRe(pattern);
  return new RegExp(`(?<![\\p{L}\\p{N}])${body}(?![\\p{L}\\p{N}])`, "giu");
}

export function loadLexicon(file = LEXICON_PATH) {
  return parseLexicon(fs.readFileSync(file, "utf8"));
}

function maskSkipped(text, { fiction = false } = {}) {
  let masked = text;
  const hide = (src, re) => { src = src.replace(re, (m) => " ".repeat(m.length)); return src; };
  masked = hide(masked, /```[\s\S]*?```/g);
  masked = hide(masked, /`[^`]*`/g);
  masked = hide(masked, /\bhttps?:\/\/\S+/gi);
  masked = hide(masked, /\bwww\.\S+/gi);
  masked = hide(masked, /“[^”]*”/g);
  masked = hide(masked, /"[^"]*"/g);
  if (fiction) {
    masked = hide(masked, /‘[^’]*’/g);
    masked = hide(masked, /'[^']*'/g);
  }
  return masked;
}

function splitParagraphs(text) {
  const parts = [];
  const re = /(?:\S[^\n]*(?:\n(?!\s*\n)[^\n]*)*)/g;
  let m;
  while ((m = re.exec(text))) {
    parts.push({ text: m[0], start: m.index });
  }
  return parts;
}

function splitSentences(para) {
  const out = [];
  const re = /[^.!?]+[.!?]+|[^.!?]+$/g;
  let m;
  while ((m = re.exec(para))) {
    const t = m[0].trim();
    if (t) out.push(t);
  }
  return out;
}

function wordCount(s) {
  const m = s.match(/[\p{L}\p{N}’'-]+/gu);
  return m ? m.length : 0;
}

function mean(arr) {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function stdev(arr) {
  if (arr.length < 2) return 0;
  const m = mean(arr);
  return Math.sqrt(arr.reduce((s, x) => s + (x - m) ** 2, 0) / (arr.length - 1));
}

function isFragment(sentence) {
  const w = wordCount(sentence);
  if (w === 0) return false;
  if (w <= 3) return true;
  const hasVerb = /\b(is|are|was|were|be|been|being|am|has|have|had|do|does|did|can|could|will|would|should|might|must|may|'s|'re|'ve|'d|n't)\b|[a-z]ed\b|[a-z]ing\b/i.test(sentence);
  return w < 6 && !hasVerb;
}

function isSeesaw(lengths) {
  if (lengths.length < 4) return false;
  let alt = 0;
  for (let i = 1; i < lengths.length; i++) {
    const a = lengths[i - 1];
    const b = lengths[i];
    const flip = (a >= 18 && b <= 8) || (a <= 8 && b >= 18);
    if (flip) alt++;
    else alt = 0;
    if (alt >= 3) return true;
  }
  return false;
}

function lineOf(text, idx) {
  return text.slice(0, idx).split("\n").length;
}

function matchAll(re, text) {
  const flags = re.flags.includes("g") ? re.flags : re.flags + "g";
  const g = new RegExp(re.source, flags);
  const hits = [];
  let m;
  while ((m = g.exec(text))) {
    hits.push({ index: m.index, text: m[0] });
    if (m[0].length === 0) g.lastIndex++;
  }
  return hits;
}

function paragraphAction({ forensic, structure, score }) {
  if (forensic.length) return "delete-forensic";
  if (structure.length) return "structure-hit";
  if (score >= 3) return "rewrite";
  if (score >= 2) return "replace-weakest";
  return "leave";
}

export function scanText(raw, opts = {}) {
  const lexicon = opts.lexicon || loadLexicon();
  const mode = (opts.mode || "").replace(/-form$/, "");
  const fiction = mode === "fiction" || mode === "poetry";
  const masked = maskSkipped(raw, { fiction });
  const paras = splitParagraphs(raw);
  const paragraphs = [];
  let forensicDoc = 0;
  let structureDoc = 0;
  let fragments = 0;
  let dashes = 0;
  const allLengths = [];

  for (const p of paras) {
    const slice = masked.slice(p.start, p.start + p.text.length);
    const sentences = splitSentences(p.text);
    const lengths = sentences.map(wordCount);
    lengths.forEach((n) => allLengths.push(n));
    fragments += sentences.filter(isFragment).length;
    const forensic = [];
    const structure = [];
    const density = [];
    const weak = [];
    for (const row of lexicon) {
      const hits = matchAll(row.re, slice);
      if (!hits.length) continue;
      const rec = { id: row.id, family: row.family, action: row.action, weight: row.weight, n: hits.length, sample: hits[0].text };
      if (row.action === "forensic") forensic.push(rec);
      else if (row.action === "structure") structure.push(rec);
      else if (row.action === "weak") weak.push(rec);
      else density.push(rec);
    }
    const score = density.reduce((s, h) => s + h.weight * h.n, 0);
    const sd = stdev(lengths);
    const machineFlat = sentences.length >= 4 && sd < 3 && mean(lengths) >= 8;
    forensicDoc += forensic.reduce((s, h) => s + h.n, 0);
    structureDoc += structure.reduce((s, h) => s + h.n, 0);
    const action = paragraphAction({ forensic, structure, score });
    paragraphs.push({
      line: lineOf(raw, p.start),
      text: p.text.slice(0, 80),
      firstSentence: sentences[0] || "",
      hits: { forensic, structure, density, weak },
      score: Math.round(score * 100) / 100,
      action,
      sentences: sentences.length,
      meanLength: Math.round(mean(lengths) * 10) / 10,
      sd: Math.round(sd * 10) / 10,
      machineFlat,
    });
  }

  dashes += (raw.match(/\u2014/g) || []).length;
  dashes += (raw.match(/--/g) || []).length;
  const words = wordCount(raw) || 1;
  const findings = paragraphs.filter((p) =>
    p.action !== "leave" || p.machineFlat
  );

  return {
    tool: "unslop",
    version: VERSION,
    mode: opts.mode || null,
    paragraphs: paragraphs.length,
    words,
    summary: {
      forensic: forensicDoc,
      structure: structureDoc,
      fragments,
      seesaw: isSeesaw(allLengths),
      dashDensityPer1000: Math.round((dashes / words) * 1000 * 10) / 10,
      findings: findings.length,
    },
    paragraphsDetail: paragraphs,
    findings,
  };
}

export function scanFile(file, opts = {}) {
  const raw = fs.readFileSync(file, "utf8");
  return scanText(raw, opts);
}

function hasFindings(res) {
  return res.summary.findings > 0 || res.summary.forensic > 0 || res.summary.structure > 0;
}

function formatText(res, fileLabel) {
  const out = [];
  out.push(`unslop scanner ${res.version}${res.mode ? ` · mode=${res.mode}` : ""} · ${fileLabel}`);
  out.push(`words ${res.words} · paragraphs ${res.paragraphs} · forensic ${res.summary.forensic} · structure ${res.summary.structure} · fragments ${res.summary.fragments} · seesaw ${res.summary.seesaw} · dashes/1k ${res.summary.dashDensityPer1000} (info)`);
  for (const p of res.paragraphsDetail) {
    const flags = [];
    if (p.action !== "leave") flags.push(p.action);
    if (p.machineFlat) flags.push("machine-flat");
    if (!flags.length) continue;
    out.push(`  L${p.line} score ${p.score} · ${flags.join(", ")} · sent ${p.sentences} mean ${p.meanLength} sd ${p.sd}`);
    const names = [...p.hits.forensic, ...p.hits.structure, ...p.hits.density]
      .map((h) => `${h.id}×${h.n}`)
      .slice(0, 8);
    if (names.length) out.push(`         ${names.join(", ")}`);
  }
  if (!res.findings.length) out.push("  clean");
  return out.join("\n");
}

function formatOutline(res) {
  return res.paragraphsDetail.map((p, i) => `${i + 1}. ${p.firstSentence.replace(/\s+/g, " ")}`).join("\n");
}

function selftest() {
  const lex = loadLexicon();
  const ai = "This matters because the platform is more than a tool, it is a dependable partner. Here's what that means in practice.\n\nAdditionally, experts argue we should leverage a robust, seamless, transformative pipeline. In conclusion, looking ahead, what comes next can help you.";
  const human = "I parked at the south lot at 6:40 a.m. and the coffee was already burnt. Priya had printed the routing sheet on yellow paper, the kind that smears if you rest your thumb on it.\n\nWe missed the 7:15 window by nine minutes. I still think the nine minutes were the garage gate, not the loader.";
  const a = scanText(ai, { lexicon: lex, mode: "essay" });
  const h = scanText(human, { lexicon: lex, mode: "essay" });
  if (!hasFindings(a)) throw new Error("selftest: AI sample should have findings");
  if (hasFindings(h)) throw new Error("selftest: human sample should be clean: " + JSON.stringify(h.findings, null, 2));
  const quoted = 'She said "this matters" and sat down.';
  const f = scanText(quoted, { lexicon: lex, mode: "fiction" });
  if (f.summary.forensic || f.findings.some((p) => p.hits.density.length || p.hits.structure.length)) {
    throw new Error("selftest: fiction dialogue should be skipped");
  }
  const leak = "As of my last knowledge cutoff, oaicite:12 remains.";
  const l = scanText(leak, { lexicon: lex });
  if (!l.summary.forensic) throw new Error("selftest: forensic leakage missed");
  console.log("selftest ok");
  return 0;
}

const HELP = `unslop scanner ${VERSION}
Usage: node scan.mjs <file|-> [options]
  --mode=short|essay|article|longform|fiction|poetry|business|email|academic|technical
  --json              machine-readable output
  --outline           first sentence of each paragraph
  --selftest          built-in calibration checks
  --help
Reads terms from references/lexicon-2026.md. Report only; does not rewrite.
Exit: 0 clean, 2 findings, 1 error`;

async function main(argv) {
  const flags = argv.filter((a) => a.startsWith("--"));
  const args = argv.filter((a) => !a.startsWith("--"));
  const flag = (n) => flags.includes(`--${n}`) || flags.includes(`-${n}`);
  const modeArg = (flags.find((a) => a.startsWith("--mode=")) || "").split("=")[1];
  if (flag("help") || argv.includes("-h")) { console.log(HELP); return 0; }
  if (flag("selftest")) return selftest();
  if (modeArg && !MODES.has(modeArg)) { console.error(`Bad --mode value: ${modeArg}`); return 1; }

  let raw;
  let label;
  if (!args.length) { console.error("Usage: node scan.mjs <file|->"); return 1; }
  if (args[0] === "-") {
    raw = await readStdin();
    label = "stdin";
  } else {
    if (!fs.existsSync(args[0])) { console.error(`Not found: ${args[0]}`); return 1; }
    raw = fs.readFileSync(args[0], "utf8");
    label = args[0];
  }
  const res = scanText(raw, { mode: modeArg });
  if (flag("outline")) console.log(formatOutline(res));
  else console.log(flag("json") ? JSON.stringify(res, null, 2) : formatText(res, label));
  return hasFindings(res) ? 2 : 0;
}

async function readStdin() {
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  return Buffer.concat(chunks).toString("utf8");
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
  main(process.argv.slice(2)).then((code) => process.exit(code), (e) => {
    console.error(e.stack || String(e));
    process.exit(1);
  });
}

export const VERSION_EXPORT = VERSION;
