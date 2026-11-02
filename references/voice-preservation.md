# Voice preservation

Anti-flat rules. Load unless the text is AI-drafted (SKILL.md load map). Patterns on the tells list are not voice.

**Last reviewed:** 2026-11-02.

**Meta-risk.** Homogenization is the failure mode this file exists to prevent: LLM rewriting keeps meaning and compresses style. Citation in [sources.md](sources.md). A "clean" pass that could have been run on any author has failed.

---

## Preserve list

Do not sand off, even when they look messy:

- Plain is / has / uses
- Plain verbs and true superlatives the author actually wrote
- Honest hedges sitting on real uncertainty
- Lowercase sentence starts, `..` pauses, one-line paragraphs (short-form)
- Deliberate fragments, parenthetical asides, self-interruptions
- Swearing, jokes, risk-taking opinions
- Named people, numbers, places, tools from the source
- Dialogue, including ungrammatical dialogue
- Explicit emotion labels in fiction ("She was angry.")
- Field jargon and its spelling
- The author's actual first-person (`I think`, `I was wrong`)

---

## Voice inventory (KEEP)

Before editing, list at most **7 signature moves** from this text (or from `references/style-profile.md` if it exists). Each move needs an example quote. No quote, not a move.

Typical slots: opener habit, sentence-length preference, humor, hedging style, paragraph shape, taboo words, how they close.

Protect those seven through every later pass. If an edit would spend one, revert that edit.

---

## Character floor

The output keeps at least as many of each as the input had:

- specifics (names, numbers, dates, tools, places)
- opinions with a stake
- humor beats
- risk-taking lines (claims a committee would delete)

Missing ones are asked for via [interview.md](interview.md), never invented. A flourish is allowed only if it comes from the author's material.

---

## Voice delta

After editing, compare before and after on: specifics, opinions, humor, register, inventory moves. Any loss reverts that edit. Tells from [lexicon-2026.md](lexicon-2026.md) do not count as voice, so removing them is not a loss.

---

## Over-correction guard

- Edits stay proportional to problems found. A clean page gets two or three touches, not a quota.
- Zero dashes, zero triads, zero fragments, every sentence 8–20 words: that pattern is itself a tell. Restore variance the author had; do not manufacture a long/short seesaw.
- When unsure whether a pattern is the author's or the model's, leave it.
- Never swap in a synonym from the same lexicon list, or a stock substitute ("delve" → "dive deep").
- Forbidden insertions: sincerity openers ("let me be honest"), hedges the author did not write, new hooks, closing questions, stock slack lines ("We'll see.", "Yeah, that would be nice.") copied from [prose-benchmarks.md](prose-benchmarks.md).

---

## `[VOICE-CONFLICT]` format

When a structure-family hit (reveal bridge, negative-parallel, corrective-framing, disclaimer) appears in **author-written** text, do not silent-substitute.

```
[VOICE-CONFLICT] "<quoted span>" · left in · could be the author; say so if you want it gone
```

Cap at 3 per report. Fiction dialogue: leave, no flag.

---

## User override

If the user says the text is fine, stand down. Report remaining tells only if they ask. Override beats every tier.
