# CTY colour package

Colour tokens for the Catch Them Young early-learning web app (P1–P2 English and maths).

The brand colours are sampled from the CTY logo (`../brand/cty-logo.webp`):

| Brand colour | Hex | Role |
|---|---|---|
| Navy | `#1f215b` | Text (`--color-ink`), headers, pressed states |
| Yellow | `#fcef1d` | Stars, "ones", highlights on navy |

Everything else is built around those two. Mochi the cat keeps her orange (`#f29b4b`), and sea-foam and sand
stay as calm supporting colours. The primary action colour is an indigo (`#3440b8`) a step brighter than the logo
navy so that buttons look clickable next to navy text.

| File | Use it for |
|---|---|
| `tokens.css` | Plain CSS variables. **Start here.** |
| `tokens.json` | Design tools, Style Dictionary, or tests that read the values |
| `tailwind-theme.css` | Tailwind v4 `@theme` block (`bg-cobalt`, `text-ink`, `bg-cty-yellow`, ...) |

## The rules that make it accessible

1. **Text is always `--color-ink`** (navy, 14.7 on white). Muted captions use `--color-text-muted` (6.6).
2. **Bright hues are fills, not text.** Yellow (1.2 on white), orange and mint fail as text on white. When a hue
   has to be text, use its `--color-text-*` variant.
3. **White text only on cobalt or navy.** White on orange or yellow fails.
4. **Yellow text is allowed on navy only** (`--color-text-on-navy-accent`, 12.3). This is the logo's own pairing.
5. **No red, ever.** A wrong answer uses sand (`--color-feedback-retry`), so a child is not told they failed.
6. **Colour never works alone.** Place-value colours (tens, ones, added) must also differ in shape or outline.
   Slot colours (who / does what / where) must also carry a text label.
7. **A tap-target border must be `--color-line-strong`** (3.9). `--color-line` (1.2) is decorative only.
8. **Offer the comfort theme.** `<html data-theme="comfort">` swaps the white ground for a soft cream. Some
   dyslexic readers prefer this, so make it a setting, not a default.

## Place-value colours (maths)

The same colour means the same thing on the 0–100 board and the 0–1000 blocks.

| Meaning | Token |
|---|---|
| Hundreds | `--color-place-hundreds` |
| Tens | `--color-place-tens` |
| Ones | `--color-place-ones` |
| Added in this question | `--color-place-added` |

## Known caveats

- Contrast ratios were calculated by hand (WCAG 2.x formula), not with a design tool. Re-check with your own
  tooling before shipping.
- The logo hex values were sampled from a compressed web image, so they may differ slightly from CTY's official
  brand values. If CTY has brand guidelines, use those and update `--color-cty-navy` and `--color-cty-yellow`.
- Nunito is a friendly rounded font but not a dyslexia-specific one. Offer Lexend or Atkinson Hyperlegible as a
  settings choice.
- Nothing here has been tested with dyslexic children. Do that before describing the product as dyslexia-friendly.
- The Paper mockups were drawn with the earlier cobalt and starfish-yellow palette and have not been updated to
  match this version.
