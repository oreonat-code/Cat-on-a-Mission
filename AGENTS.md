# AGENTS.md

Instructions for AI coding agents (and humans) working in this repo.

## Project

Early-learning web app for Catch Them Young (CTY), for P1–P2 children: English (vocab, sentence formation, core
grammar, simple comprehension) and maths (addition and subtraction within 100, extending to 1000). Stack: React
(Vite) client, Express server, Postgres on Supabase. See `README.md` for setup.

## Brand: the CTY logo

The logo is at [`design/brand/cty-logo.webp`](design/brand/cty-logo.webp). Navy `#1f215b` and yellow `#fcef1d`
are the brand colours, and the whole palette is built around them.

- Show the logo in the app header and on the sign-in or landing screen. Do not recolour, stretch, crop or add
  effects to it.
- The logo image has an off-white background box. Place it on a white or very light surface, or ask for a
  transparent version before putting it on a coloured background.
- If CTY has brand guidelines (clear space, minimum size), follow them over anything written here.

## Colours: use the palette in `design/colors/`

All UI colour comes from the tokens in [`design/colors/tokens.css`](design/colors/tokens.css). Do not invent
new colours or hardcode hex values in components.

1. Import `design/colors/tokens.css` once, at the client root (for example in `client/src/main.jsx`).
2. Style with the CSS variables, for example `color: var(--color-ink)` and `background: var(--color-cobalt)`.
3. A JSON copy is in `design/colors/tokens.json`. A Tailwind v4 version is in `design/colors/tailwind-theme.css`
   (only needed if Tailwind is added). If you change a value, change it in all three files.
4. Rationale, contrast ratios and caveats are in [`design/colors/README.md`](design/colors/README.md).

### Colour rules (accessibility, including dyslexia)

These are requirements, not preferences.

- **Text is always `--color-ink`** (the logo navy). Captions use `--color-text-muted`. Never use pure black text.
- **Bright hues are fills and borders, never text.** Yellow, orange and mint fail as text on white. If a hue must
  be text, use `--color-text-star`, `--color-text-mochi` or `--color-text-mint`.
- **White text goes only on cobalt or navy** (`--color-cobalt`, `--color-cobalt-deep`). Never on orange, yellow
  or mint.
- **Yellow text is allowed only on navy** (`--color-text-on-navy-accent`). This is the logo's own pairing.
- **Never use red.** Wrong answers use the sand "try again" style (`--color-feedback-retry`). A child must not be
  shown a failure state.
- **Colour never carries meaning alone.** Pair it with a text label, shape, outline or position. Place-value
  colours (tens, ones, added) need a shape or outline difference. Sentence-slot colours (who, does what, where)
  need a text label.
- **A border that marks a tap target uses `--color-line-strong`** (3.9 contrast). `--color-line` is decorative
  only.
- **Place-value colours are fixed:** hundreds `--color-place-hundreds`, tens `--color-place-tens`, ones
  `--color-place-ones`, added `--color-place-added`. Use the same colours on the 0–100 board and the 0–1000
  blocks.
- **Offer the comfort theme** (`<html data-theme="comfort">`) as a user setting. Do not make it the default.
- Keep yellow (`--color-star`) for stars, "ones" and logo-style highlights, so rewards stay meaningful.

### Combinations that fail. Do not use them

| Combination | Contrast | Use instead |
|---|---|---|
| White text on orange | 2.2 | `--color-ink` on `--color-mochi` (6.7) |
| Orange text on white | 2.2 | `--color-text-mochi` (5.4) |
| Yellow text on white | 1.2 | `--color-text-star` (6.5), or yellow on navy |
| `--color-line` as the only tap-target border | 1.2 | `--color-line-strong` (3.9) |

The contrast figures were calculated by hand with the WCAG formula. Re-check them with a proper tool before
shipping.

## Other accessibility requirements

- Every prompt, word and question needs an audio button. Children who cannot read independently must still be able
  to play every activity.
- English only. No shaming and no peer comparison anywhere in the UI.
- Student data is covered by PDPA. Do not log or expose children's names, answers or progress outside what the
  feature needs.
- Nothing here has been tested with dyslexic children. Do not describe the product as dyslexia-friendly until it
  has been.
