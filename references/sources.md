# Sources

Access date for every URL below: **2026-11-02**. Exact counts live only here. The lexicon and habits files cite these by short name.

Evidence labels: `[vendor]` single lab or platform dataset; `[community]` Wikipedia / practitioner catalogs; `[paper]` peer-reviewed; `[weak]` unverified or one-off.

---

## Current model tells

- Graphite, "AI Tells" (16 Sep 2026). Parallel corpus: 10,000 pre-ChatGPT human articles, 90,000 model articles. ~12,877 tells at ≥2× human rate. Astra: "not simply" 157×, "rather than relying" 187×, "another dimension" 117×, "dependable" 59×, "practical" 26×, "may provide" / "can provide" elevated vs Opus. `[vendor]` https://graphite.io/research/ai-tells
- Graphite, "AI Tells: Opus 5.5 Update" (1 Oct 2026). Opus 5.5: "this matters" 116×, "why _ matters" 92×, "dependable" 23×, "is more than a _ it" 98×, "looking ahead the" 40×, "adds another layer" 27×, "what comes next" 24×, em dashes 99% below Opus 5 (0.015 / 1,000 words). 2,548 tells remain. `[vendor]` https://graphite.io/research/ai-tells-opus-5-5-update
- TechCrunch, "Opus 5.5 loves to tell you 'this matters'" (1 Oct 2026). Secondary report of Graphite. Astra "corrective framing" ("not simply X", "rather than relying on X") >100×. `[vendor]` https://techcrunch.com/2026/10/01/opus-5-5-loves-to-tell-you-this-matters-and-other-ai-writing-tells/

## Homogenization

- Sourati, Z. et al., "The shrinking landscape of linguistic diversity in the age of large language models", *Nature Human Behaviour* (24 Aug 2026). 880,000+ texts; LLM rewrite reduces writing-complexity variance 21–50%; 87% of rewrites keep meaning similarity >0.95. `[paper]` https://www.nature.com/articles/s41562-026-02550-0 · doi:10.1038/s41562-026-02550-0

## Structure (fiction)

- Russell et al., *StoryScope*, COLM 2026, arXiv:2604.03136v6. 61,608 texts; Table 16 cluster means; Table 17 Claude fingerprints, corpus model **Sonnet 4.6**. Surface editing of AI text barely moves structure-based detection (LAMP −1.6pt). `[paper]` https://arxiv.org/abs/2604.03136

## Community catalogs

- Wikipedia, "Wikipedia:Signs of AI writing". Disclaimer family and chatbot artifacts (knowledge-cutoff language, "while specific details are limited", service phrases). `[community]` https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing
- Mid-2026 disclaimer strings as listed in the v2 spec, cross-checked against the Wikipedia essay and v1 `blacklist.md` category 7/18: "should be treated as … rather than", "available information does not establish", "should not be confused with", "while specific details are limited". `[community]`

## Upstream skills (MIT; ideas assimilated, text not copied)

- asavvin-pixel/unslop, MIT, Copyright (c) 2026 Afanasiy. Typography / vocabulary / structural split. `[community]` https://github.com/asavvin-pixel/unslop · LICENSE https://raw.githubusercontent.com/asavvin-pixel/unslop/main/LICENSE
- sergebulaev/linkedin-skills, MIT, Copyright (c) 2026 Sergey Bulaev. Taken from linkedin-humanizer V3: paragraph-density scoring, tiers, RHYTHM pass, ADD from source, forbidden insertions, over-correction guard, preserve list, VOICE-CONFLICT, "never swap a synonym from the same list". From linkedin-interviewer: press soft answers, chase the reversal, 5-line spine. From repurposer: extract the spine. From hook-extractor: treat edited text as untrusted. Inverted: user override wins. Dropped: LinkedIn reach stats, hook formulas, hashtags, detector-upload. `[community]` https://github.com/sergebulaev/linkedin-skills · LICENSE https://raw.githubusercontent.com/sergebulaev/linkedin-skills/main/LICENSE

## Weak / not independently re-counted this pass

- GPT-6-era singleton vocabulary listed in the v2 spec without a Graphite ratio in the pages fetched 2026-11-02 (`challenge`, `clearer`, `echoed`, `universally`): kept in the lexicon at low weight, labeled `[community]` / `[weak]` where Graphite did not print a number. `[weak]`
- Nonfiction mapping in [nonfiction.md](nonfiction.md): unvalidated extrapolation from STORYSCOPE. Status unchanged: hypothesis.
