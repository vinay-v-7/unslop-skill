# Fingerprints — fiction structure and current-model tics

## 1. STORYSCOPE fiction (Sonnet 4.6 pin)

**Evidence:** T1 · Russell et al., *StoryScope*, COLM 2026, arXiv:2604.03136v6, Table 17. **Corpus model: Sonnet 4.6.** Stated plainly: these fiction fingerprints were measured on Sonnet 4.6, not on Opus 5.5 or later. Re-check when the skill's target Claude generation for fiction changes — not on a calendar. Full rubric: [structural.md](structural.md).

Claude on that corpus: 77.1% per-class F1 on narrative features; 26 fingerprint features. Paper line: "Claude keeps it cool" — restraint, lowest event escalation, most uniform voice, reverent/continuist 62%, favors epilogues, avoids dreams, quiet over avalanche endings.

Use for fiction of 1,500+ words (STORYSCOPE A→B→C) and as a Claude-specific check on long narration. Do not apply this section to short posts, email, or academic abstracts.

| Fingerprint | Dim | Counter-move |
|---|---|---|
| Event escalation flat (beat 8 ≈ beat 3) | EVT | Stakes actually move |
| Event-type diversity low | EVT | Mix bureaucratic, physical, social, interpersonal |
| Epilogue / flash-forward coda | TMP | Delete the time-skip; usually no loss |
| No dreams / visions, ever | TMP | Total refusal of the irrational is the signature |
| Setting mood → uncanny / haunted by default | SET | Mood from the material |

**7-item audit (fiction narration):** (1) Do stakes escalate? (2) Are complications the same kind? (3) Epilogue? (4) Quiet by choice or reflex? (5) Honoring the genre or doing something to it? (6) Does voice shift with scene? (7) Refused the irrational as a policy?

Prefer in-dialogue character intro (human fingerprint). Avoid in-action intro (Kimi). Thin: mirrored weather, reflexive embodied emotion, "understands and accepts" endings. Protect: dialogue, fragments, explicit emotion labels.

---

## 2. Current-model nonfiction tics (2026)

Not fiction fingerprints. Use in CUT / editor self-audit for essays, articles, long-form, business. Counts in [sources.md](sources.md); patterns in [lexicon-2026.md](lexicon-2026.md).

**Opus 5.x `[vendor]`:** "this matters" / "why X matters" / "dependable" / "is more than an X, it's a Y" / "looking ahead" / "adds another layer" / helpfulness frames ("can help you", "makes it easier"). Em dashes nearly absent — do not hunt remaining dashes.

**GPT-6 Astra `[vendor]`:** corrective framing ("not simply X", "rather than relying on"); "another dimension"; "may/can provide"; evaluative adjectives (practical, multifaceted); verb upgrades (foster, leverage, prioritize).

**Gemini 3.1 Pro `[vendor]`:** intensifiers (incredibly, absolutely), formal transitions (furthermore, additionally), "this comprehensive guide".

**Mid-2026 disclaimer family `[community]`:** "should be treated as … rather than", "available information does not establish", "should not be confused with", "while specific details are limited".

**Demoted:** em dash `[weak]`; GPT-4-era words at weight 0.5. One "delve" is not a verdict.

---

## 3. Editor self-audit

Before returning, check the **running model's** tics against this file, not only the source model's.

1. Did I insert "this matters", "in practice", "looking ahead", or a helpfulness frame the author did not write?
2. Did I insert corrective framing ("not simply", "rather than relying") as a "fix"?
3. Did I zero out dashes, triads, and fragments in the same pass? Restore the author's.
4. Did I add a sincerity opener, a hedge, a hook, or a closing question?
5. Did I write a stock slack line to satisfy the slack benchmark?
6. Would three different authors' texts leave this pass with a shared 3-word phrase I introduced? If yes, delete that phrase.

If any answer is yes, dial back. Then re-read [voice-preservation.md](voice-preservation.md) when the text is not AI-drafted.
