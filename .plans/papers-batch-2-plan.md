# Plan: Papers batch 2 (4 new questions + full read-aloud)

Status: implemented · 2026-10-16 · builds on [papers-mvp-rfc.md](papers-mvp-rfc.md)

## Decisions

- **No hints anywhere.** The grey hint lines in the exports (J3, TQ, FY, 12J) are not built.
- **One tap places an answer**, as now. There is no "tap to hear, tap again to place".
- **The speaker button reads every piece of text on the screen** except the header: prompt, picture labels, sentence or
  equation (empty slots are read as "blank"), slot labels, and the choices. Each question builds this from its own
  data, so the read-out can never drift from the screen. The hand-written `speech` field goes away.
- **Order (easiest first)**
  - English: is / are → one or many → Tell what Mochi does
  - Math: 3 + 2 → 8 − 3 → hop by 100
- **Not in this batch:** EU-0. Only its picture panel came through (Mochi on a blue mat), with no prompt, sentence or
  choices. Send the full artboard and it becomes one more data entry.
- **English screens keep the shared header** (close, progress, stars), as in batch 1. Every English export has an
  empty header row.

## New questions

### English 2 · One cat or many cats? (artboard TT-0), type `fill-the-gap`

This reuses `FillTheGap` with a new picture and a wider slot.

- **Pictures row**: padding-top 28, gap 36. Two labelled picture cards, column layout, gap 12, padding 24 / 0,
  radius 32.
  - Card 1: 280 px wide, `#F3F7FF`, one open-eyed orange cat (120 px), label "one cat".
  - Card 2: 460 px wide, `#DDF5EE`, three open-eyed cats (110 px, gap 8: orange, light orange, slate with white
    eyes), label "three cats".
  - Labels are 44 / 54, weight 900.
- **Sentence**: "I see three", then the slot (**230** × 100), then "." with a 24 px gap, as drawn.
- **Choices**: cat / cats. Answer: cats. The choice row's padding-top is 36 here (it is 40 on is / are).
- **Read-out**: "One cat or many cats? One cat. Three cats. I see three, blank. Cat, or cats?"

### English 3 · Tell what Mochi does (artboard TQ-0), new type `sentence-builder`

- **Title**: 84 px audio button, Mochi, "Tell what Mochi does".
- **Picture**: 380 × 200 sea-foam panel, radius 32, padding-top 24. Mochi asleep on the blue sofa (300 × 160 SVG
  from the export).
- **Slot row**: padding-top 36, gap 20. Each column has a label (20 / 24, weight 800, `0.04em`) above a 100 px tall
  slot, radius 26.
  - **WHO?** (blue label): already filled. A solid blue card, 300 wide, `#17399A` 6 px lip, white "The cat" at 44 / 54.
  - **DOES WHAT?** (`#C26A1A` label): 300 wide, `#FFF4E6` fill, 4 px dashed `#F29B4B`.
  - **WHERE?** (`#1E8A72` label): 340 wide, `#E7F8F3` fill, 4 px dashed `#3DBBA0`.
- **Tiles**: padding-top 48, gap 20. Each tile is 92 px tall, padding 0 / 28, 4 px solid border, 5 px lip, radius 26,
  text 40 / 48 weight 900.
  - Orange tiles (`#F29B4B` border, `#FBD3AE` lip): sleeps, jumps.
  - Green tiles (`#3DBBA0` border, `#BFE6D8` lip): on the sofa, in the box.
- **Tap**: a tile goes into the slot of its own colour. Once a slot is filled, the other tile of that colour is
  disabled but looks unchanged, so nothing hints at right or wrong. The filled slot turns solid and shows the word.
  When both slots are filled, the paper moves on after 900 ms.
- **Answer**: sleeps + on the sofa. It is recorded in memory only.
- **Read-out**: "Tell what Mochi does. Who? The cat. Does what? Blank. Where? Blank. Sleeps, on the sofa, jumps, or
  in the box?"

### Math 2 · 3 fish swim away (artboard J2-0), new type `take-away-with-pictures`

- **Picture panel**: margin 32 / 120 / 0, padding 48 / 0, gap 22.
  - 5 solid orange fish.
  - An 8 × 90 `#BFD0F5` divider bar, radius 4.
  - 3 fish drawn as a dashed `#12263F` outline (a new outline variant of the `Fish` art).
- **Equation**: "8 − 3 = [slot]", padding-top 32. This shares an `Equation` component with 3 + 2.
- **Choices**: 4 / 5 / 6. Cards are **104** px tall (110 on 3 + 2), padding-top 32. Answer: 5.
- **Read-out**: "3 fish swim away. How many are left? 8 minus 3 equals, blank. 4, 5, or 6?"

### Math 3 · Hop by 100 (artboard J3-0), new type `number-track`

- **Panel**: sea-foam, margin 36 / 120 / 0, padding 40 / 48 / 36, column layout.
  - Top: the hop arcs (1080 × 90 SVG).
  - Below: a track of 5 positions using space-between, with 20 px padding left and right.
- **Track**:
  - Given: 100 and 200, as solid blue 180 × 110 cards with a `#17399A` 6 px lip and white 56 / 68 numbers.
  - Then 3 dashed slots, 180 × 110, radius 28. The slot to fill next is white with a dashed `#2557D6` border. The
    later slots are `#F3F7FF` with a dashed `#BFD0F5` border.
- **Choices**: 500 / 300 / 700 / 400, gap 24, 180 × 110. With the hint removed, the choice row sits 40 px below the
  panel.
- **Tap**: the number fills the leftmost empty slot and turns into a solid blue card like 100 and 200. The next slot
  becomes the one to fill. The tapped card goes into the "used" state. Any number can go anywhere, with no feedback.
  After 3 placements, the paper moves on.
- **Answer**: [300, 400, 500]. 700 is the distractor.
- **Arcs**: solid into every filled or active position, dotted after that, which matches the export's state.
  - **Deviation:** the exported arcs (110 → 870, 190 apart) don't line up with the card centres (about 221 apart).
    I'll draw them between the real card centres.
- **Read-out**: "Hop by 100. What comes next? 100, 200, blank, blank, blank. 500, 300, 700, or 400?"

## Shared changes

| File | Change |
|---|---|
| `styles/paper-colors.css` | Add `#C26A1A`, `#FFF4E6`, `#E7F8F3`, `#3DBBA0`, `#1E8A72`, `#FBD3AE`, `#BFE6D8`. |
| `components/art/Art.jsx` | Add an outline `Fish`, an open-eyed `Cat` (orange, light, slate), and `MochiOnSofa`. |
| `components/Equation.jsx` | New. Shared by 3 + 2 and 8 − 3. Reads + as "plus" and − as "minus". |
| `components/ChoiceCard.jsx`, `AnswerSlot.jsx` | Optional size overrides (card height, slot width). |
| `components/questions/*` | Each question type exports `buildSpeech(question)`. `PaperRunner` passes the result to the audio button. |
| `pages/PaperRunner.jsx` | Register the 3 new types. A question tells the runner when it is complete; this handles multi-slot questions. |
| `data/papers.js` | Add 4 questions in the order above. Remove `speech`. |
| `design/mockups/` | Save the 4 new exports as `.jsx`. |

## Verify

- `vite build` passes. No console errors.
- At 1440 × 900, screenshot each new screen and check its sizes against the export.
- Play both papers from start to finish. Progress goes 1/3, 2/3, 3/3, then "All done".
- Check each read-out string through `buildSpeech` (I can't hear the speech itself).

## After

- Commit on a branch. I push to `main` only when you ask.
