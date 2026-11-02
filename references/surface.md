# Surface — typography and rhythm

Load at strict tier and above, with [habits.md](habits.md) and [lexicon-2026.md](lexicon-2026.md).

**Last reviewed:** 2026-11-02. Em dash is a **weak** signal. Frontier models under-use it as of late 2026; zero dashes across a long piece can also be a tell. Density is informational. Do not "fix" a single dash.

---

## Typography

Defaults; a style profile may override (never Epistemics).

- **Em dashes:** weak. Cap excess (about 1 per 100 words) with a comma, colon, parentheses, or a rewrite — not a period, not a hunt-to-zero. Hyphens stay in compounds. Scanner reports density only.
- **Quotes:** pick one style and hold it. Default for web: straight.
- **Headings:** sentence case. Title Case On Every Word is the habit.
- **Bold:** only where the reader gets lost without it.
- **Lists:** flowing prose stays prose. Fewer than four items, keep as a paragraph.
- **Emoji** in headings/bullets: no, unless the genre demands it.
- **No "Conclusion" / "In summary" / "Overall"** restatements. End on a decision, next step, consequence, or stop.
- **Markdown / chatbot debris:** forensic. Delete silently. See lexicon leakage rows.

---

## RHYTHM pass

Fix only machine-flat paragraphs. Never manufacture burstiness.

A paragraph is machine-flat when it has ≥4 sentences and sentence-length SD is very low (scanner flags this). Then edit **one** sentence in that paragraph — lengthen or split — so a subordinate clause does real work. Leave the rest.

Do **not**:

- Alternate long / short / long / short across the piece (seesaw = humanizer fingerprint)
- Insert stock slack lines from [prose-benchmarks.md](prose-benchmarks.md)
- Stack fragments. At most **2** fragments in the whole text, unless the author already used more (then KEEP)
- Turn "The X? Y." reveals into a rhythm trick; those are reveal bridges — cut them
- Force a variance target. Variance is a diagnostic. Human paragraphs of three mid-length sentences are fine

Standalone fragments: "Worth it." once can be voice. Three in a row is a pattern.

Layout is not rhythm. One-line paragraphs in short-form stay. See modes/short-form.md.

---

## Cut vs leave

| Class | Rule |
|---|---|
| Forensic leakage | Always delete |
| Structure family | SKILL.md density table (AI fix / author flag / fiction dialogue leave) |
| Stock openers / sincerity | Delete the frame; keep any fact that follows |
| Legacy GPT-4 word, isolated | Leave |
| One triad, one dash, one fragment | Leave |
| Machine-flat paragraph | Edit one sentence |

---

## 60-second scan

1. Forensic strings: `oaicite`, `turn0search`, `chatgpt.com`, `Would you like me`
2. Structure: `here's what`, `not just`, `not simply`, `the result?`
3. Significance tics: `this matters`, `why … matters`
4. Outline test: first sentence of every paragraph — tidy summary → machine-shaped (exempt specs)
5. Ending: recap or "Agree?" → cut
6. Rhythm: any paragraph of identical-length sentences → one edit
7. Character floor: specifics still there?
