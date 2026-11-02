# Mode: technical

Load when: code, CLI/API names, procedures, README, docs. Token: `technical`.
Default tier: forensic
Default volume: minimal
Structural phases: none. **Stand down on reference material.**

## 1 What good human writing looks like here

The command runs. The flag is the flag. A README can be tidy. Tutorials may have a little voice; reference pages should not be "humanized".

## 2 Tells that matter most

1. Forensic leakage in prose wrapping the code
2. Promotional README filler ("unlock", "seamless", "robust", "delve into this comprehensive guide")
3. "In this article, we will explore"
4. Fake casualness in a runbook
5. Corrective framing that restates a spec ("this is not simply a cache, it's a…")

If the file is a spec, man page, OpenAPI description, changelog, error catalog, or API reference: **stand down**. Say so and stop.

## 3 Not tells here (protect)

- Code, commands, flags, env vars, file paths, identifiers — **byte-identical**
- Tables of parameters
- Heading structure of a reference
- "Utilize" in a POSIX or Java voice
- Dry imperative ("Run:", "Set:")

## 4 Structural work

None. Light pass on tutorials and READMEs only: forensic + obvious promotional sentences. Do not reorder procedures.

## 5 Voice moves

- Required: every command, flag, and identifier unchanged
- Allowed: cutting one marketing sentence from a README intro
- Forbidden: rewriting code comments into jokes, inventing examples that were not in the repo, "friendly" rewrites of error strings

## 6 Questions to ask the author

Is this reference or a tutorial? Any string that must remain exact (flags, errors, license)?

## 7 Length and volume

Minimal. If they asked `draft`, still do not invent APIs.

## 8 Mode final check

Stood down on reference docs, or said why not. Code and flags byte-identical. No new commands.

## References to load

This file. Skip voice-preservation on reference docs (stand down first). Forensic: lexicon leakage rows. Tutorials at strict only if they asked. Optional style-profile for tutorial voice.
