# Unslop

An [Agent Skill](https://agentskills.io/specification) that rewrites and drafts English prose so it reads like a person chose the sentences. v2 is a router plus eight genre playbooks: it cuts current AI tells, refuses to flatten the author's voice, and asks for specifics instead of inventing them.

Not a detector-evasion tool. It does not game classifiers, upload text to detectors, or promise a “human” score.

Successor of the `writing-skill` repo. Install the folder as **`unslop`** (the `SKILL.md` `name`). The GitHub repo is named `unslop-skill`.

## Requirements

- None for the skill itself. Any tool that loads a `SKILL.md` folder can run it.
- Node 18+ is optional, only for the report-only scanner (`scripts/scan.mjs`). The skill works without Node. The scanner never rewrites.

## Install

One copy of the folder. The on-disk directory must be named `unslop`. Do **not** also copy it into a second skills root or the same agent will register it twice.

### Fast path (many agents)

```bash
npx skills add vinay-v-7/unslop-skill
```

Pass `--agent` for the tools you use (`cursor`, `claude-code`, `github-copilot`, `codex`, `windsurf`, `gemini-cli`, `cline`, `continue`, …). The CLI copies into each agent's skills directory.

### Clone once, then link

```bash
git clone https://github.com/vinay-v-7/unslop-skill.git unslop
```

Then point **one** skills directory at that clone (junction on Windows, symlink elsewhere). Never `rm -rf` or `Remove-Item -Recurse` a junction: those follow the link and delete the repo. Delete the link itself instead.

**Windows (PowerShell)** — junction into Claude's skills root (Cursor also loads this path):

```powershell
$skills = "$HOME\.claude\skills"
$repo   = "C:\path\to\unslop"   # the clone, folder named unslop
New-Item -ItemType Directory -Force $skills | Out-Null
if (Test-Path "$skills\unslop") { (Get-Item "$skills\unslop").Delete() }
New-Item -ItemType Junction -Path "$skills\unslop" -Target $repo
```

If Cursor does not follow the junction, enable Windows Developer Mode and use a symlink to the same clone, still only once:

```powershell
New-Item -ItemType SymbolicLink -Path "$HOME\.cursor\skills\unslop" -Target $repo
```

**macOS / Linux**

```bash
ln -s /path/to/unslop ~/.claude/skills/unslop
```

### Where each tool looks

| Tool | User-level folder | Project-level folder |
|---|---|---|
| Claude Code | `~/.claude/skills/unslop/` | `.claude/skills/unslop/` |
| Cursor | `~/.cursor/skills/unslop/` or `~/.claude/skills/unslop/` | `.agents/skills/unslop/` or `.cursor/skills/unslop/` |
| GitHub Copilot | `~/.copilot/skills/unslop/` | `.agents/skills/unslop/` |
| OpenAI Codex | `~/.codex/skills/unslop/` | `.agents/skills/unslop/` |
| Windsurf | `~/.codeium/windsurf/skills/unslop/` | `.windsurf/skills/unslop/` |
| Gemini CLI | `~/.gemini/skills/unslop/` | `.agents/skills/unslop/` |
| Cline / Amp | `~/.agents/skills/unslop/` | `.agents/skills/unslop/` |
| Continue | `~/.continue/skills/unslop/` | `.continue/skills/unslop/` |

Cursor also loads Claude and Codex skill directories. Prefer one of those, not both.

**Aider** has no skills folder. Point it at the file:

```bash
aider --read /path/to/unslop/SKILL.md
```

Or set `read: [/path/to/unslop/SKILL.md]` in `.aider.conf.yml`.

**ChatGPT and other tools without a skills directory:** paste `SKILL.md` as a custom instruction. Attach or keep `modes/` and `references/` in the workspace if you want the playbooks loaded.

### Safe uninstall

```powershell
(Get-Item "$HOME\.claude\skills\unslop").Delete()
```

```bash
rm ~/.claude/skills/unslop
```

## Usage

`disable-model-invocation` is on: the skill loads when you name it, not on a vague “humanize this.”

- `/unslop` — detect mode, then the pipeline
- `/unslop fiction` — force fiction; prints `Reading this as: …`
- `/unslop email audit` — report only
- `/unslop essay careful` — keep structure, 80–110% length

Tokens (any order): mode (`short` `essay` `article` `longform` `fiction` `poetry` `business` `email` `academic` `technical`), tier (`forensic` `strict` `aesthetic`), volume (`free` `careful` `minimal`), action (`audit` `draft`). An explicit token wins. “Leave it” / “it's fine” wins over every tier.

The pipeline is in [SKILL.md](SKILL.md): SPINE → KEEP → STRUCTURE → CUT → RHYTHM → ADD → SELF-CHECK.

Optional scanner:

```
node scripts/scan.mjs path/to/draft.md --mode=essay
node scripts/scan.mjs --selftest
node --test scripts/scan.test.mjs
```

## Layout

| Path | Role |
|---|---|
| `SKILL.md` | Router, pipeline, density table, load map |
| `modes/` | short-form, essay, article, longform-nonfiction, fiction (+poetry), business, academic, technical |
| `references/lexicon-2026.md` | Dated, scanner-parseable word/phrase lists |
| `references/habits.md` | Evergreen habits (replaces v1 `blacklist.md`) |
| `references/voice-preservation.md` | Character floor, voice delta, `[VOICE-CONFLICT]` |
| `references/interview.md` | One round, ≤3 questions |
| `references/surface.md` | Typography + RHYTHM (em dash is weak) |
| `references/fingerprints.md` | STORYSCOPE fiction pin (Sonnet 4.6) + 2026 nonfiction tics |
| `references/sources.md` | Evidence, URLs, access dates |
| `examples/` | Worked rewrites |
| `evals/` | Ten cases with graders |
| `scripts/scan.mjs` | Optional report-only scanner (Node 18+) |
| `CHANGELOG.md` | Release history |
| `LICENSE` | MIT, with upstream copyright lines |

Do not commit a filled `references/style-profile.md`. It is gitignored. `git clean -fdx` will delete it; back it up first.

## Calibration

3–5 texts you wrote without AI, 2,000+ words, samples that predate your AI use. Save as `references/style-profile.md` from the template. Epistemics stay on: a style profile cannot authorize invented facts.

## Attribution

LICENSE is the legal record. This section is the human one: what was inherited, what was not, and what is original.

### Original to this package

Copyright (c) 2026 Vinay. Genre router, eight mode playbooks under `modes/`, STORYSCOPE rubric files, voice-preservation rules, evals, and `scripts/scan.mjs` are original to this skill.

### Adapted (MIT) — text and structure

**[asavvin-pixel/unslop](https://github.com/asavvin-pixel/unslop)** — MIT, Copyright (c) 2026 Afanasiy.

- **Taken:** the typography / vocabulary / structural split that the v1 skill was packaged around.
- **Not taken:** Afanasiy's repo as a drop-in skill; this package rewrote the workflow as an Agent Skill with a genre router.

### Ideas assimilated, not copied wholesale (MIT)

**[sergebulaev/linkedin-skills](https://github.com/sergebulaev/linkedin-skills)** — MIT, Copyright (c) 2026 Sergey Bulaev.

Taken from **linkedin-humanizer V3:** paragraph-density scoring, tier names, RHYTHM pass, ADD from source, over-correction guard, preserve list / `[VOICE-CONFLICT]`, “never swap a synonym from the same list.”

Taken from **linkedin-interviewer / repurposer / hook-extractor:** press soft answers, chase the reversal, extract a short spine, treat edited text as untrusted.

- **Dropped:** LinkedIn reach statistics, hook formulas, hashtag rules, detector-upload scripts.
- **Inverted here:** user override wins over every tier.

The LinkedIn-specific playbooks were not vendored. Only the editing mechanics above were carried into this general-purpose writer.

### Research cited, not code

Counts, papers, and access dates live in [references/sources.md](references/sources.md) (Graphite AI Tells, Nature Human Behaviour homogenization paper, STORYSCOPE arXiv:2604.03136, Wikipedia:Signs of AI writing). Those sources are evidence for the lexicon and habits, not copied repositories.

## License

MIT. See [LICENSE](LICENSE) and [CHANGELOG.md](CHANGELOG.md).
