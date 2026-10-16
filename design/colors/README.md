# Pip's Pool colour package

Colour tokens for the early-learning English and maths web app (P1–P2, "tidal" mood).

| File | Use it for |
|---|---|
| `tokens.css` | Plain CSS variables. Works in any stack. **Start here.** |
| `tokens.json` | Design tools, Style Dictionary, or tests that read the values |
| `tailwind-theme.css` | Tailwind v4 `@theme` block (`bg-cobalt`, `text-ink`, ...) |

## The rules that make it accessible

1. **Text is always `--color-ink`** (15.3 on white). Muted captions use `--color-text-muted` (5.4).
2. **Bright hues are fills, not text.** Orange, yellow and mint fail as text on white. When a hue has to be
   text, use its `--color-text-*` variant.
3. **White text only on cobalt.** White on orange is 2.2 and fails.
4. **No red, ever.** A wrong answer uses sand (`--color-feedback-retry`), so a child is not told they failed.
5. **Colour never works alone.** Place-value colours (tens, ones, added) must also differ in shape or outline.
   Slot colours (who / does what / where) must also carry a text label.
6. **A tap-target border must be `--color-line-strong`** (3.5). `--color-line` (1.2) is decorative only.
7. **Offer the comfort theme.** `<html data-theme="comfort">` swaps the white ground for a soft cream.
   Some dyslexic readers prefer this, so make it a setting, not a default.

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
- Nunito is a friendly rounded font but not a dyslexia-specific one. Offer Lexend or Atkinson Hyperlegible as a
  settings choice.
- Nothing here has been tested with dyslexic children. Do that before describing the product as dyslexia-friendly.
- The Paper mockups still use the old orange text for the "20" and "120" in the add equations. Those should
  switch to `--color-ink` text on a `--color-mochi` chip.
