# Lexicon 2026

Dated word and phrase lists. The scanner reads **every markdown table whose header is** `id | pattern | kind | weight | family | action | evidence | era`. Counts and URLs live in [sources.md](sources.md). Habits (the durable mechanisms) live in [habits.md](habits.md).

**Last reviewed:** 2026-11-02.

**How to read a row.** `kind`: `word` (unicode letter-boundary), `phrase` (case-insensitive, word-bounded), `frame` (`_` = 1–3 tokens), `regex`. `action`: `forensic` (always a finding), `structure` (single-hit family), `density` (sum weights per paragraph), `weak` (report only). `evidence`: `vendor` | `community` | `weak`. Exact ratios stay in sources.md.

**How to update.** Add or edit a table row. Bump **Last reviewed**. Add the URL, access date, and evidence label in sources.md. Do not put counts here. Demote a dying tell by setting `action` to `weak` or `weight` to `0.5`; do not delete it until two consecutive reviews.

**Scoring reminder (SKILL.md).** Forensic: always delete. Structure family, one hit: fix if AI-drafted; `[VOICE-CONFLICT]` if author-written; leave fiction dialogue. Density ≥3: rewrite the paragraph from its spine. Density 2: replace the weakest hit. Density ≤1: leave it. Never swap in a synonym from this file.

---

## Forensic leakage

Model debris no human types into a finished text.

| id | pattern | kind | weight | family | action | evidence | era |
|---|---|---|---|---|---|---|---|
| leak-oaicite | oaicite | phrase | 3 | leakage | forensic | community | evergreen |
| leak-oai-citation | oai_citation | phrase | 3 | leakage | forensic | community | evergreen |
| leak-turn0 | turn0search | regex | 3 | leakage | forensic | community | evergreen |
| leak-contentref | contentReference | phrase | 3 | leakage | forensic | community | evergreen |
| leak-chatgpt-utm | utm_source=chatgpt.com | phrase | 3 | leakage | forensic | community | evergreen |
| leak-openai-utm | utm_source=openai | phrase | 3 | leakage | forensic | community | evergreen |
| leak-grok-ref | referrer=grok.com | phrase | 3 | leakage | forensic | community | evergreen |
| leak-cutoff | as of my last | phrase | 3 | leakage | forensic | community | evergreen |
| leak-knowledge | knowledge cutoff | phrase | 3 | leakage | forensic | community | evergreen |
| leak-certainly | certainly! | phrase | 3 | leakage | forensic | community | evergreen |
| leak-of-course | of course! | phrase | 3 | leakage | forensic | community | evergreen |
| leak-hope-helps | i hope this helps | phrase | 3 | leakage | forensic | community | evergreen |
| leak-let-me-know | let me know if | phrase | 3 | leakage | forensic | community | evergreen |
| leak-absolutely-right | you're absolutely right | phrase | 3 | leakage | forensic | community | evergreen |
| leak-would-you-like | would you like me to | phrase | 3 | leakage | forensic | community | evergreen |
| leak-explore | in this article, we will explore | phrase | 3 | leakage | forensic | community | evergreen |
| leak-your-name | [Your Name] | phrase | 3 | leakage | forensic | community | evergreen |
| leak-xx-date | 20\d\d-XX-XX | regex | 3 | leakage | forensic | community | evergreen |
| leak-cite-n | \[cite:\s*\d+\] | regex | 3 | leakage | forensic | community | evergreen |

---

## Structure families (single-hit)

| id | pattern | kind | weight | family | action | evidence | era |
|---|---|---|---|---|---|---|---|
| st-heres-what | here's what | phrase | 1 | reveal-bridge | structure | community | 2026 |
| st-heres-how | here's how | phrase | 1 | reveal-bridge | structure | community | 2026 |
| st-the-result | the result? | phrase | 1 | reveal-bridge | structure | community | 2026 |
| st-the-reality | the reality? | phrase | 1 | reveal-bridge | structure | community | 2026 |
| st-the-truth | the truth? | phrase | 1 | reveal-bridge | structure | community | 2026 |
| st-not-just | not just | phrase | 1 | negative-parallel | structure | community | evergreen |
| st-not-only | not only | phrase | 1 | negative-parallel | structure | community | evergreen |
| st-its-not-its | it's not | phrase | 1 | negative-parallel | structure | community | evergreen |
| st-no-x-no-y | no _, no _, just | frame | 1 | negative-parallel | structure | community | evergreen |
| st-not-simply | not simply | phrase | 1 | corrective-framing | structure | vendor | gpt-6-astra |
| st-rather-than-relying | rather than relying | phrase | 1 | corrective-framing | structure | vendor | gpt-6-astra |
| st-rather-than-simply | rather than simply | phrase | 1 | corrective-framing | structure | vendor | opus-5.x |
| st-treated-as-rather | should be treated as | phrase | 1 | disclaimer | structure | community | mid-2026 |
| st-does-not-establish | available information does not establish | phrase | 1 | disclaimer | structure | community | mid-2026 |
| st-not-confused | should not be confused with | phrase | 1 | disclaimer | structure | community | mid-2026 |
| st-details-limited | while specific details are limited | phrase | 1 | disclaimer | structure | community | mid-2026 |
| st-details-scarce | while specific details are scarce | phrase | 1 | disclaimer | structure | community | mid-2026 |
| st-more-than-a | is more than a _ it | frame | 1 | corrective-framing | structure | vendor | opus-5.x |
| st-more-than-an | is more than an _ it | frame | 1 | corrective-framing | structure | vendor | opus-5.x |
| st-more-than-just | is more than just | phrase | 1 | corrective-framing | structure | community | evergreen |

---

## Opus 5.x `[vendor]`

| id | pattern | kind | weight | family | action | evidence | era |
|---|---|---|---|---|---|---|---|
| opus-this-matters | this matters | phrase | 1.5 | significance | density | vendor | opus-5.x |
| opus-why-matters | why _ matters | frame | 1.5 | significance | density | vendor | opus-5.x |
| opus-matters-most | matters most | phrase | 1 | significance | density | vendor | opus-5.x |
| opus-dependable | dependable | word | 1 | evaluative | density | vendor | opus-5.x |
| opus-looking-ahead | looking ahead | phrase | 1 | transition | density | vendor | opus-5.x |
| opus-adds-layer | adds another layer | phrase | 1.5 | transition | density | vendor | opus-5.x |
| opus-what-comes | what comes next | phrase | 1 | transition | density | vendor | opus-5.x |
| opus-in-practice | in practice | phrase | 0.5 | transition | density | vendor | opus-5.x |
| opus-just-as-important | just as important | phrase | 1 | significance | density | vendor | opus-5.x |
| opus-can-help-you | can help you | phrase | 1 | helpfulness | density | vendor | opus-5.x |
| opus-makes-easier | makes it easier | phrase | 1 | helpfulness | density | vendor | opus-5.x |

---

## GPT-6 Astra `[vendor]` / community vocab

| id | pattern | kind | weight | family | action | evidence | era |
|---|---|---|---|---|---|---|---|
| astra-another-dim | another dimension | phrase | 1.5 | transition | density | vendor | gpt-6-astra |
| astra-may-provide | may provide | phrase | 1 | hedge | density | vendor | gpt-6-astra |
| astra-can-provide | can provide | phrase | 1 | hedge | density | vendor | gpt-6-astra |
| astra-practical | practical | word | 0.6 | evaluative | density | vendor | gpt-6-astra |
| astra-multifaceted | multifaceted | word | 1 | evaluative | density | vendor | gpt-6-astra |
| astra-foster | foster | word | 0.8 | verb-upgrade | density | vendor | gpt-6-astra |
| astra-leverage | leverage | word | 0.8 | verb-upgrade | density | vendor | gpt-6-astra |
| astra-prioritize | prioritize | word | 0.6 | verb-upgrade | density | vendor | gpt-6-astra |
| astra-quietly | quietly | word | 0.6 | evaluative | density | vendor | gpt-6-astra |
| astra-steady | steady | word | 0.6 | evaluative | density | vendor | opus-5.x |
| astra-universally | universally | word | 0.8 | evaluative | density | vendor | gpt-6-astra |
| astra-challenge | challenge | word | 0.4 | evaluative | density | community | gpt-6-astra |
| astra-clearer | clearer | word | 0.4 | evaluative | density | community | gpt-6-astra |
| astra-echoed | echoed | word | 0.8 | evaluative | density | community | gpt-6-astra |

---

## Stock openers, closers, clean-slop hooks

| id | pattern | kind | weight | family | action | evidence | era |
|---|---|---|---|---|---|---|---|
| stock-heres-thing | here's the thing | phrase | 1.5 | opener | density | community | evergreen |
| stock-sink-in | let that sink in | phrase | 1.5 | opener | density | community | evergreen |
| stock-kicker | here's the kicker | phrase | 1.5 | opener | density | community | evergreen |
| stock-resonates | this resonates | phrase | 1 | opener | density | community | evergreen |
| stock-at-core | at its core | phrase | 1 | opener | density | community | evergreen |
| stock-fast-paced | fast-paced world | phrase | 1.5 | opener | density | community | evergreen |
| stock-ever-evolving | ever-evolving | phrase | 1 | opener | density | community | evergreen |
| stock-dive-deep | dive deep | phrase | 1 | opener | density | community | evergreen |
| stock-lets-honest | let's be honest | phrase | 1.5 | sincerity | density | community | evergreen |
| stock-lets-real | let's be real | phrase | 1.5 | sincerity | density | community | evergreen |
| stock-spoiler | spoiler alert | phrase | 1 | opener | density | community | evergreen |
| stock-real-question | the real question | phrase | 1.5 | hook | density | community | evergreen |
| stock-heres-what-means | here's what that means | phrase | 1.5 | hook | density | community | evergreen |
| stock-part-got-me | the part that got me | phrase | 1 | hook | density | community | evergreen |
| stock-in-summary | in summary | phrase | 1.5 | closer | density | community | evergreen |
| stock-in-conclusion | in conclusion | phrase | 1.5 | closer | density | community | evergreen |
| stock-overall | overall, | phrase | 1 | closer | density | community | evergreen |
| stock-ultimately | ultimately, | phrase | 1 | closer | density | community | evergreen |
| stock-to-sum-up | to sum up | phrase | 1.5 | closer | density | community | evergreen |
| stock-hope-finds | hope this finds you well | phrase | 1.5 | sycophancy | density | community | evergreen |
| stock-hope-email | hope this email finds you | phrase | 1.5 | sycophancy | density | community | evergreen |
| stock-dont-hesitate | don't hesitate to | phrase | 1 | closer | density | community | evergreen |
| stock-please-do-not | please do not hesitate | phrase | 1.5 | closer | density | community | evergreen |
| stock-sits-intersection | sits at the intersection | phrase | 1.5 | cliche | density | community | evergreen |
| stock-important-note | it is important to note | phrase | 1.5 | disclaimer | density | community | evergreen |
| stock-worth-noting | worth noting | phrase | 1 | disclaimer | density | community | evergreen |
| stock-worth-mentioning | worth mentioning | phrase | 1 | disclaimer | density | community | evergreen |
| stock-keep-in-mind | keep in mind that | phrase | 1 | disclaimer | density | community | evergreen |

---

## Copula avoidance, inflation, -ing analysis

| id | pattern | kind | weight | family | action | evidence | era |
|---|---|---|---|---|---|---|---|
| cop-serves-as | serves as | phrase | 1 | copula | density | community | evergreen |
| cop-stands-as | stands as | phrase | 1 | copula | density | community | evergreen |
| cop-acts-as | acts as | phrase | 0.8 | copula | density | community | evergreen |
| cop-functions-as | functions as | phrase | 1 | copula | density | community | evergreen |
| cop-testament | testament | word | 1 | inflation | density | community | gpt-4 |
| cop-boasts | boasts | word | 1 | promotional | density | community | gpt-4 |
| ing-highlighting | highlighting | word | 0.8 | ing-analysis | density | community | evergreen |
| ing-underscoring | underscoring | word | 0.8 | ing-analysis | density | community | evergreen |
| ing-showcasing | showcasing | word | 0.8 | ing-analysis | density | community | evergreen |
| ing-underscores | underscores | word | 0.8 | ing-analysis | density | community | evergreen |
| ing-emphasizing | emphasizing | word | 0.8 | ing-analysis | density | community | evergreen |
| conn-additionally | additionally, | phrase | 1 | connective | density | community | evergreen |
| conn-moreover | moreover, | phrase | 1 | connective | density | community | evergreen |
| conn-furthermore | furthermore, | phrase | 1 | connective | density | community | evergreen |
| dram-game-changer | game-changer | phrase | 1.5 | dramatization | density | community | evergreen |
| dram-paradigm | paradigm shift | phrase | 1.5 | dramatization | density | community | evergreen |
| dram-unlock | unlock the full potential | phrase | 1.5 | dramatization | density | community | evergreen |
| attr-experts | experts argue | phrase | 1.5 | attribution | density | community | evergreen |
| attr-observers | observers have | phrase | 1.5 | attribution | density | community | evergreen |
| attr-widely | widely regarded | phrase | 1 | attribution | density | community | evergreen |

---

## Legacy GPT-4-era (weight 0.5)

One isolated hit is not a finding. A cluster still is.

| id | pattern | kind | weight | family | action | evidence | era |
|---|---|---|---|---|---|---|---|
| leg-delve | delve | word | 0.5 | legacy | density | community | gpt-4 |
| leg-tapestry | tapestry | word | 0.5 | legacy | density | community | gpt-4 |
| leg-intricate | intricate | word | 0.5 | legacy | density | community | gpt-4 |
| leg-meticulous | meticulous | word | 0.5 | legacy | density | community | gpt-4 |
| leg-pivotal | pivotal | word | 0.5 | legacy | density | community | gpt-4 |
| leg-crucial | crucial | word | 0.5 | legacy | density | community | gpt-4 |
| leg-garner | garner | word | 0.5 | legacy | density | community | gpt-4 |
| leg-bolster | bolster | word | 0.5 | legacy | density | community | gpt-4 |
| leg-vibrant | vibrant | word | 0.5 | legacy | density | community | gpt-4 |
| leg-landscape | landscape | word | 0.5 | legacy | density | community | gpt-4 |
| leg-robust | robust | word | 0.5 | legacy | density | community | gpt-4o |
| leg-seamless | seamless | word | 0.5 | legacy | density | community | gpt-4o |
| leg-empower | empower | word | 0.5 | legacy | density | community | gpt-4o |
| leg-elevate | elevate | word | 0.5 | legacy | density | community | gpt-4o |
| leg-transformative | transformative | word | 0.5 | legacy | density | community | gpt-4o |
| leg-underscore | underscore | word | 0.5 | legacy | density | community | gpt-4o |
| dash-em | — | regex | 0.25 | dash | weak | vendor | 2026 |
| dash-em-unicode | \u2014 | regex | 0.25 | dash | weak | vendor | 2026 |
