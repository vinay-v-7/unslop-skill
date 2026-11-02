---
name: unslop
description: >
  Rewrites and drafts English prose to cut current AI tells without flattening
  the author's voice. Genre-aware router (short-form, essay, article, longform,
  fiction, business, academic, technical) with forensic, strict, and aesthetic
  tiers. Use when the user names Unslop or asks to humanize, unslop, de-AI,
  remove AI style, or make writing sound less generated.
license: MIT
disable-model-invocation: true
---

# Unslop

Goal: text a thinking person wrote, not a model assembled — and not a homogenizer's average of that person. Paths below are relative to the folder containing this SKILL.md.

Not a detector-evasion tool. Independent of `code-review` and `ui-ux-pro-max`.

## Tokens

Optional, any order, from arguments or the message:

- mode: `short` | `essay` | `article` | `longform` | `fiction` | `poetry` | `business` | `email` | `academic` | `technical`
- tier: `forensic` | `strict` | `aesthetic`
- volume: `free` | `careful` | `minimal`
- action: `audit` (report only) or `draft` (write from notes)

An explicit token wins. User override ("leave it", "it's fine") wins over every tier.

## Pipeline

0. **Stand down** for reference docs, changelogs, legal text, error catalogs, or when the user says the text is fine. Say so and stop.
1. **Read the text.** Detect mode (table below; on a tie pick the more conservative and say so). Detect provenance: author, AI-drafted, mixed, unknown. Unknown is treated as author-written. Announce in one line, e.g. `Reading this as: essay · AI-drafted · strict · careful. Say so if wrong.`
2. **SPINE.** The point in one sentence, plus claims, numbers, names, and asks that must survive.
3. **KEEP.** At most 7 signature moves to protect ([voice-preservation.md](references/voice-preservation.md) unless AI-drafted).
4. **STRUCTURE.** Only where the mode allows it. STORYSCOPE A→B→C for fiction of 1,500+ words. High-confidence nonfiction rows for long-form.
5. **CUT.** Forensic first, then density scoring.
6. **RHYTHM.** Fix only machine-flat paragraphs; edit one sentence in each ([surface.md](references/surface.md)).
7. **ADD.** Fingerprints only from the source or the user. If missing, [interview.md](references/interview.md) — one round, ≤3 questions. Never invent.
8. **SELF-CHECK.** Voice delta, over-correction guard, [fingerprints.md](references/fingerprints.md) §3.
9. **REPORT.** The one-line reading, at most 3 judgment calls, `[VOICE-CONFLICT]` items, any questions. If nothing contentious and they didn't ask: skip the report.

`audit`: stop after CUT (and RHYTHM flags); do not rewrite. `draft`: run the same pipeline on the first draft.

## Density scoring (per paragraph)

| Finding | Action |
|---|---|
| Forensic hit | Always delete. |
| Single-hit structure (reveal-bridge, negative-parallel, corrective-framing, disclaimer) | AI-drafted: fix. Author-written: `[VOICE-CONFLICT]`. Fiction dialogue: leave. |
| Score ≥3 | Rewrite the paragraph from its spine. |
| Score 2 | Replace the weakest hit. |
| Score ≤1 | Leave it. |

Never swap in a synonym from the same list. Optional scanner, report-only: `node scripts/scan.mjs <file|-> [--mode=…] [--json] [--outline]`. The skill works without Node.

## Anti-flat

- **Character floor.** Keep at least as many specifics, opinions, humor beats, and risk-taking lines as the input. Missing ones: ask, never invent. Flourishes only from the author's material.
- **Voice delta.** Compare before and after on specifics, opinions, humor, register, inventory moves. Any loss reverts that edit. Tells are not voice.
- **Over-correction.** Edits proportional to problems. Zero dashes, zero triads, zero fragments, every sentence 8–20 words is itself a tell. Unsure if author or model: leave it. Forbidden insertions: sincerity openers, added hedges, new hooks or closing questions, stock slack lines.
- **Editor self-audit.** Check the output against the running model's tics (fingerprints §3).
- **User override wins.**

## Epistemics

No style profile can override this. Every substantive claim is (1) from the data, (2) computed on a named assumption, (3) judgment with basis, or (4) a gap named once.

Never invent specifics, examples, numbers, or thresholds for liveliness. Hedge once per limitation. Editing is not fact-checking: soften to what the text can carry, or flag missing receipts.

**Fiction carve-out:** inventing sensory detail is fine when drafting from a brief. New events or characters in someone else's fiction are proposed, not inserted.

Protect constructions AI avoids: plain is/has, plain verbs, true superlatives, honest hedges. Replacement tics: a substitute repeated across three texts, and not in the inputs, is a marker. Cure is usually absence.

## Content-type detection

First strong match; explicit token wins.

| Signals | Mode | Length as secondary axis |
|---|---|---|
| Platform post, caption, thread; hook line, one-line paragraphs, hashtags | short-form | ≤~600w; longer → essay or article |
| First-person argued thesis or reflection, one idea with a turn | essay | 600–2,500w; above that, longform |
| Explainer, how-to, blog, newsletter, news; headings, sources | article | 500–2,500w; above that, longform |
| Nonfiction ≥~2,500w or chaptered: feature, report, chapter | longform-nonfiction | ≥2,500w |
| Scenes, characters, dialogue, POV; or verse | fiction | any; structural phases at ≥1,500w |
| Salutation or sign-off, subject, memo, DM, cover letter, proposal | business | usually ≤600w |
| Abstract, citations, methods/results, literature review | academic | any |
| Code, CLI/API names, procedures, README, docs | technical | stand down on reference material |

## Mode defaults

| Mode | Tier | Volume |
|---|---|---|
| short-form | strict | free |
| essay | strict | careful (author) / free (AI) |
| article | strict | careful |
| longform | strict | careful |
| fiction | strict on narration only | careful |
| business | strict | free |
| academic | forensic + academic-strict | minimal |
| technical | forensic | minimal |

## Load map

- Always load the mode file under `modes/`.
- Load [voice-preservation.md](references/voice-preservation.md) unless the text is AI-drafted.
- At strict and above, load [habits.md](references/habits.md), [lexicon-2026.md](references/lexicon-2026.md), [surface.md](references/surface.md).
- Load the mode's named extras and `references/style-profile.md` if it exists.
- Load nothing else. Citations: [sources.md](references/sources.md). Do not load sources.md in a normal run.

## Calibration

On "calibrate to my style" / "learn my voice":

1. Ask for 3–5 texts the user wrote without AI, 2,000+ words total. Samples must predate their AI use.
2. Fill [style-profile-template.md](references/style-profile-template.md) from observations only.
3. Save as `references/style-profile.md` (gitignored). If unwritable, hand them the file.
4. Show the profile; allow hand edits.

On "learn from this text too": append; fresher sample wins; date the note. Limits: no invented facts, no Epistemics off, no imitate-another-author.

## Final check

1. Every concrete detail traces to source or user.
2. Character floor held; voice delta clean.
3. Hedges: one per limitation.
4. No paragraph ends by restating itself, unless the author did that as a move.
5. Outline test (exempt: specs, runbooks).
6. Aphorism budget: ≤1 punchy one-liner closing a paragraph.
7. No stock slack inserted. No replacement tics.
8. Running-model tics (fingerprints §3) absent.
9. Byte-identical spans the mode named (citations, code, flags, asks, deadlines, numbers) untouched.

## Modes and extras

- [short-form](modes/short-form.md) · [essay](modes/essay.md) · [article](modes/article.md) · [longform-nonfiction](modes/longform-nonfiction.md)
- [fiction](modes/fiction.md) (+ poetry) · [business](modes/business.md) · [academic](modes/academic.md) · [technical](modes/technical.md)
- [interview.md](references/interview.md) · [fingerprints.md](references/fingerprints.md) · [prose-benchmarks.md](references/prose-benchmarks.md)
- [structural.md](references/structural.md) · [nonfiction.md](references/nonfiction.md) — only when the mode says so
- Examples: [mindfulness.md](examples/mindfulness.md), [fiction.md](examples/fiction.md), [voice-preserved.md](examples/voice-preserved.md)
