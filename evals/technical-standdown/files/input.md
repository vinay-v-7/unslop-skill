# scan(1)

## NAME
scan — report AI-prose tells (read-only)

## SYNOPSIS
`node scripts/scan.mjs <file|-> [--mode=essay] [--json] [--outline] [--selftest]`

## FLAGS
`--mode=MODE`
: Restrict dialogue skipping and labels. One of short, essay, article, longform, fiction, poetry, business, email, academic, technical.

`--json`
: Print the report as JSON.

`--selftest`
: Run built-in checks and exit 0 on success.

## EXIT STATUS
0 clean; 2 findings; 1 error.

## BUGS
`--outline` prints the first sentence of each paragraph, not a model summary.
