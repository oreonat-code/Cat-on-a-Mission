# RFC: Papers MVP front end

| | |
|---|---|
| Status | Implemented (2026-10-16) using the recommended answer to each open question in §10. AGENTS.md not changed. |
| Date | 2026-10-16 |
| Scope | `client/` only. No server, database or auth changes. |
| Design source | Paper file "hfg", artboards **6 · Math: add with pictures** and **22 · Grammar: is / are**. Exports in [`design/mockups/`](../design/mockups/). |

## 1. Summary

Replace the starter todo app in `client/` with a three-screen flow for P1–P2 children:

1. **Papers page**: two big cards, English and Math.
2. **Question screen**: one question per paper for now, built to match the Paper mockups closely.
3. **All done screen**: a calm finish and a button back to Papers.

All content is hard-coded in the client. Nothing is saved. The goal is a clickable MVP that looks like the Paper designs
and has a data shape we can extend to more questions and question types later.

## 2. Goals and non-goals

**Goals**

- The Math and English question screens match the Paper exports in layout, sizes, spacing, type and colour.
- A child can open a paper, hear the question read aloud, tap an answer and finish, with no adult help.
- Question content is data, so adding a question is a data change. Adding a new question *type* is one new component.

**Non-goals (this MVP)**

- Login, student profiles, saving progress, or any API or Supabase calls.
- The star reward system and a progress or reward screen. Planned as a future feature.
- The other 12 Paper artboards (sentence builder, take away, 0–1000 blocks and so on).
- Tablet, phone or responsive layouts. The comfort theme. Font choice settings.
- Separate content for P1 and P2.

## 3. Decisions so far (from the interview)

| Topic | Decision |
|---|---|
| Content | 1 Math question (artboard 6, add with pictures) and 1 English question (artboard 22, is / are). |
| Papers per subject | One paper per subject. Papers page leads straight into it. |
| P1 vs P2 | **Assumption:** P1 and P2 see the same papers. There is no level picker. *(Please confirm, see §10.)* |
| Answer tap | Tapping a card fills the dashed slot and submits straight away. There is no Check button. |
| Feedback | **No right or wrong is shown.** The correct answer is never revealed. The result is recorded in memory for the future star feature. |
| Audio | Browser text-to-speech (Web Speech API). |
| Device | Desktop only. Fixed 1440 × 900 canvas, no scaling. |
| Colours | Question screens use the **Paper hex values as exported**, not `design/colors/tokens.css`. *(This conflicts with AGENTS.md, see §9.)* |
| Papers page design | Not in Paper. Designed in this RFC in the same visual style (§5.1). |
| End of paper | "All done" screen with a button back to Papers. You had no preference, so this is the default. |

## 4. User flow

```
/papers ──tap English──▶ /papers/english ──tap answer──▶ (pause) ──▶ /papers/english/done ──▶ /papers
        └─tap Math─────▶ /papers/math    ──tap answer──▶ (pause) ──▶ /papers/math/done    ──▶ /papers
                         ▲ close (×) at any time returns to /papers
```

- `/` redirects to `/papers`.
- Refreshing mid-paper restarts that paper at question 1, because nothing is saved.
- Browser Back works like the × button.

## 5. Screens

All screens use a fixed **1440 × 900** canvas, centred horizontally on a white page. If the window is smaller, the page
scrolls. Font: **Nunito**, loaded from Google Fonts in weights 700, 800 and 900.

### 5.1 Papers page (new design, not in Paper)

It uses the same building blocks as the question screens: thick light borders with a solid 6 px "lip" shadow, sea-foam
picture panels, and heavy Nunito.

- **Header row** (same padding as the question header, 32 px top and bottom, 80 px left and right): the CTY logo
  (`design/brand/cty-logo.webp`) at 64 px tall, left-aligned, on white. Do not recolour or crop it.
- **Title**: "Papers", 56 px / 64 px, weight 900, `-0.02em`, colour `#12263F`, centred, 24 px below the header.
- **Subtitle**: "Pick one to start", 28 px, weight 700, muted ink (`#575B7C`), centred, 8 px below the title.
- **Two subject cards**, side by side and centred, 48 px gap, 64 px below the subtitle. Each card is a `<button>`:
  - 480 × 400, white, 4 px solid `#E3E8EF` border, radius 40 px, `box-shadow: #E3E8EF 0 8px 0`.
  - Top: a sea-foam (`#DDF5EE`) picture panel, 400 × 220, radius 28 px, inset 36 px.
    - **English**: three sleeping cats reused from artboard 22 (orange, light orange and grey), 100 px each.
    - **Math**: the 3 orange + 2 blue fish group with the "+" sign, from artboard 6, scaled to fit.
  - Below the panel: the subject name ("English" or "Math"), 56 px weight 900, ink, centred.
  - A small speaker button (56 px circle, `#2557D6` with a `#17399A` 4 px lip, white icon) in the card's top-right
    corner reads the subject name aloud. It stops the tap from also opening the paper.
- **Hover**: border becomes `#BFD0F5`. **Pressed**: card moves down 6 px and the lip shadow drops to 2 px.
- **Focus**: a 4 px `#2557D6` outline with a 4 px offset.

### 5.2 Question screen: shared shell

Both questions share the same shell, taken from artboard 6. The English artboard (22) has an **empty header row and
an empty audio button**. We fill them from artboard 6 so both screens behave the same.

| Element | Spec (from artboard 6) |
|---|---|
| Header row | flex, gap 28, padding 32 / 80 |
| Close (×) | 52 × 52 circle, `#EEF1F6`, 22 px × icon stroke `#12263F` width 3. A `<button>` with `aria-label="Close"`. Goes to `/papers` with no confirm. |
| Progress bar | track `#EEF1F6` 20 px tall, radius 10, grows to fill. Fill `#2557D6`. Width = answered ÷ total. Starts at 0 and animates to 100 % after the answer (300 ms ease-out). |
| Star pill | `#FFF3CC` pill, padding 10 / 20, gap 8, 26 px star (`#FFC93C` fill, `#E0A400` stroke), count 22 px weight 900. **Behaviour is an open question, see §10.1.** |
| Audio button | circle `#2557D6`, lip `box-shadow: #17399A 0 6px 0`, white speaker icon at 50 % of the button size. Math is 96 px (icon 48). English is 84 px as drawn (icon 42). |
| Prompt | 56 / 64, weight 900, `-0.02em`, `#12263F` |

### 5.3 Math: add with pictures (artboard 6)

Use the export in `design/mockups/math-add-with-pictures.jsx` exactly, with these values made dynamic:

- **Picture panel**: `#DDF5EE`, radius 40, margin 28 px top and 200 px left and right, padding 36 px top and bottom,
  gap 48. Left group: `left.count` orange fish (`#F29B4B`, eye `#12263F`). Then "+" (72 / 88, weight 900, `#2557D6`).
  Then the right group: `right.count` blue fish (`#2557D6`, eye `#FFFFFF`). Fish are 84 × 58 with a 20 px gap.
- **Equation row**: padding-top 28, gap 28. `3` `+` `2` `=` at 96 / 104 weight 900, with numbers in `#12263F` and
  operators in `#2557D6`. Then the **answer slot**: 130 × 104, `#F3F7FF` fill, 4 px dashed `#BFD0F5` border, radius 24.
- **Choices**: padding-top 36, gap 28. Each card is 180 × 110, 4 px solid `#E3E8EF` border, radius 28,
  `box-shadow: #E3E8EF 0 6px 0`, digit 56 / 68 weight 900.

### 5.4 English: is / are (artboard 22)

Use `design/mockups/english-is-are.jsx` exactly, plus the shell from §5.2:

- **Title row**: gap 22. Audio button (84 px), then the Mochi face (76 px, orange `#F29B4B`, eyes open with whiskers),
  then "Which word fits?".
- **Picture panel**: 640 × 220, `#DDF5EE`, radius 36, gap 28, padding-top 28. Three sleeping cats at 140 px:
  `#F29B4B`, `#E8B07A`, and `#5B6B80` (white face lines on the grey one).
- **Sentence row**: padding-top 40, gap 24. "The cats", then the slot, then "sleeping." at 84 / 92 weight 900. The
  slot is 190 × 100, `#F3F7FF`, 4 px dashed `#2557D6` border, radius 24. *(This slot border is cobalt, but the Math
  slot border is light `#BFD0F5`. We keep each one as drawn.)*
- **Choices**: padding-top 40, gap 32. Each card is 260 × 120, 4 px `#E3E8EF` border, radius 30,
  `box-shadow: #E3E8EF 0 7px 0`, word 64 / 78 weight 900.

### 5.5 All done screen (new design)

- Same header row, but with only the close (×) button. The progress bar shows 100 %.
- Centred: the Mochi face (eyes open) at 200 px. Below it, "All done!" at 84 / 92 weight 900, then "Great work." at
  32 px weight 700 in muted ink.
- A primary button: "Back to papers", 360 × 100, fill `#2557D6`, white text 40 px weight 900, radius 30, lip
  `#17399A 0 7px 0`. It goes to `/papers`.
- The screen shows no score, no "x out of y", and nothing about which answers were right.
- On arrival it speaks "All done! Great work." The child's last tap counts as the user gesture that browsers require
  before speaking.

## 6. Interaction details

### 6.1 Answering (no right/wrong shown)

1. The child taps a choice card.
2. The card's value appears in the slot, in the same type as the card. The slot border changes from dashed to
   **solid**, in the same colour as before.
3. The tapped card goes into a "used" state: the border becomes `#BFD0F5` and the lip flattens. All cards are disabled
   so a second tap does nothing.
4. The answer is stored in memory as `{ questionId, chosen, correct }`. It is not shown anywhere.
5. The progress bar animates to the new fraction.
6. After **900 ms**, the app moves to the next question, or to `/done` after the last one.

Right and wrong answers look and sound exactly the same. The interface never shows red, a cross, a tick or the correct
answer.

### 6.2 Card states

| State | Visual |
|---|---|
| Rest | as exported |
| Hover | border `#BFD0F5` |
| Pressed (`:active`) | `translateY(4px)`, lip shadow 6 → 2 px, 80 ms |
| Focus-visible | 4 px `#2557D6` outline, 4 px offset |
| Used | border `#BFD0F5`, lip shadow 0, `translateY(6px)` |
| Disabled (others) | unchanged visually, `pointer-events: none` *(no dimming, so nothing hints at right or wrong)* |

### 6.3 Audio (Web Speech API)

- A small `speak(text)` helper wraps `window.speechSynthesis`. It cancels any speech already playing, then speaks.
- Voice: the first available voice in this order: `en-SG`, `en-GB`, `en-AU`, any `en-*`. Rate 0.9, pitch 1.05.
- What the speaker button reads:
  - Math: "How many fish in all? Three plus two equals… Four, five, or six?"
  - English: "Which word fits? The cats, blank, sleeping. Is, or are?"
  - These strings live in the question data as `speech`, so the read-out does not have to match the on-screen text.
- Nothing speaks automatically on the question screen. The child presses the button. (Autoplay is unreliable, and an
  adult may be talking.)
- While speaking, the button gets a 4 px `#BFD0F5` ring. If `speechSynthesis` is missing, the button is hidden.
- AGENTS.md asks for audio on *every* word. Here the choices are read as part of the question, because tapping a card
  submits it. See §10.3.

### 6.4 Keyboard and screen readers

- Every interactive element is a real `<button>`. Tab order: close, audio, choices, left to right.
- The pictures are decorative SVGs with `aria-hidden`. The picture panel has an `aria-label` such as "3 orange fish
  and 2 blue fish".
- The slot is `aria-live="polite"`, so the chosen answer is announced.

## 7. Technical design

### 7.1 Stack changes (client only)

- Add `react-router-dom@6` for `/papers`, `/papers/:subject` and `/papers/:subject/done`. With real URLs, Back and
  refresh behave sensibly.
- Add Nunito with a `<link>` to Google Fonts in `client/index.html`.
- No CSS framework. Use plain CSS files with **CSS variables for the Paper colours** in one file, `paper-colors.css`.
  Components never hard-code hex values. This also makes it easy to move to `tokens.css` later if the team decides to.
- Leave `server/`, `api/`, `schema.sql` and `vercel.json` unchanged. The client makes no API calls.

### 7.2 File layout

```
client/src/
  main.jsx                 # router + global CSS
  App.jsx                  # routes
  styles/
    paper-colors.css       # --pc-ink: #12263F; --pc-blue: #2557D6; ... (all hex from the exports)
    base.css               # Nunito, reset, 1440×900 canvas
  data/
    papers.js              # content (see 7.3)
  lib/
    speak.js               # Web Speech helper
  pages/
    PapersPage.jsx
    PaperRunner.jsx        # holds question index + answers; renders the right question component
    DonePage.jsx
  components/
    QuestionShell.jsx      # header (close, progress, star pill) + audio/title row
    AudioButton.jsx
    AnswerSlot.jsx
    ChoiceCard.jsx
    questions/
      AddWithPictures.jsx  # artboard 6
      FillTheGap.jsx       # artboard 22
    art/
      Fish.jsx  Cat.jsx  Mochi.jsx  Star.jsx  Speaker.jsx  CloseIcon.jsx
```

### 7.3 Data model

```js
// client/src/data/papers.js
export const papers = [
  {
    id: 'math',
    title: 'Math',
    questions: [
      {
        id: 'math-add-pictures-001',
        type: 'add-with-pictures',
        prompt: 'How many fish in all?',
        speech: 'How many fish in all? Three plus two equals… Four, five, or six?',
        left:  { count: 3, colour: 'orange' },
        right: { count: 2, colour: 'blue' },
        choices: [4, 5, 6],
        answer: 5,
      },
    ],
  },
  {
    id: 'english',
    title: 'English',
    questions: [
      {
        id: 'eng-is-are-001',
        type: 'fill-the-gap',
        prompt: 'Which word fits?',
        speech: 'Which word fits? The cats, blank, sleeping. Is, or are?',
        picture: 'three-sleeping-cats',
        before: 'The cats',
        after: 'sleeping.',
        choices: ['is', 'are'],
        answer: 'are',
      },
    ],
  },
];
```

`PaperRunner` looks up the component for each question in a map such as
`{ 'add-with-pictures': AddWithPictures, 'fill-the-gap': FillTheGap }`. An unknown type renders nothing and logs a
warning in development.

### 7.4 State

- `PaperRunner` keeps `index` and `answers[]` in React state. When it navigates to `/done`, it passes the answers in
  router state. Nothing reads them yet; they are there for the future star feature.
- No `localStorage`. AGENTS.md says children's answers are covered by PDPA, so the MVP keeps them in memory only.

## 8. Alternatives considered

| Option | Why not (for now) |
|---|---|
| Paste the Paper exports in as-is (inline styles) | Fastest, but every question type would repeat the shell, and the content would be stuck in the markup. |
| Tailwind | Adds a build dependency. The exports are already plain CSS values. |
| Scale-to-fit or responsive | You chose desktop only. Revisit before testing on school iPads. |
| Recorded audio | Better quality, but needs an MP3 per question. TTS is fine for an MVP. |
| Questions in Supabase | Not needed for 2 questions. The `papers.js` shape maps directly to a future table. |
| Show right or wrong feedback | Your decision: children never see the correct answer. |

## 9. Risks and conflicts with existing repo rules

1. **Colours break AGENTS.md.** AGENTS.md says "All UI colour comes from `design/colors/tokens.css`" and "do not invent
   new colours". `tokens.css` is the colour palette file a teammate added in the last commit ("Rebuild the palette
   around the CTY logo"). The Paper mockups predate it. This RFC follows your call and uses the Paper hex values. AI
   agents read AGENTS.md, though, and will keep "fixing" the colours back unless **AGENTS.md is updated to say so**.
   We should agree this with whoever wrote it.
2. **The answer card border fails the tap-target contrast rule.** `#E3E8EF` on white is about 1.2:1. AGENTS.md
   requires about 3:1 for borders that mark a tap target. The lip shadow helps, but some children may struggle to see
   the card edges.
3. **Ink is `#12263F`, not the logo navy `#1F215B`.** The two are visually close, but the Papers page logo and the
   question text will not match exactly.
4. **TTS voice quality varies.** It depends on the OS. On some Windows machines the only voice is US English. This is
   acceptable for an MVP.
5. **Fixed 1440 × 900.** On a 1280 × 800 laptop, children will have to scroll. The bottom of the canvas is mostly empty,
   so in practice they will just see less whitespace.

## 10. Open questions for review

1. **Star pill vs "no right/wrong shown".** If the star count goes up only on a correct answer, a child can work out
   whether they were right. Options:
   - (a) **Recommended:** add a star for every answered question, to reward effort. It never reveals correctness.
   - (b) Hide the pill until the star feature exists.
   - (c) Show it fixed at 0.
2. **P1/P2.** Confirm that "same for both" means P1 and P2 see the same papers, so there is no level picker.
3. **Audio on each word.** Is reading the choices inside the question prompt enough? Or should each card also have its
   own small speaker icon, which would differ from the mockup?
4. **Auto-advance delay.** 900 ms after the tap is proposed. Should it be longer so the child sees their answer in the
   slot?
5. **AGENTS.md.** Should this work also update AGENTS.md to say that question screens use the Paper palette?

## 11. Acceptance criteria

- [ ] `/papers` shows the CTY logo, the "Papers" title and two cards. Tapping one opens that paper.
- [ ] The Math screen matches `design/mockups/math-add-with-pictures.png` within a few px at 1440 × 900. The only
      differences are the empty slot and a progress bar that starts at 0.
- [ ] The English screen matches `design/mockups/english-is-are.png`, plus the shared header and the speaker icon.
- [ ] Tapping any choice fills the slot, disables the choices, fills the progress bar, and moves on within about 1 s.
      Right and wrong answers look identical.
- [ ] The speaker button reads the `speech` string using an English voice.
- [ ] The × button and browser Back both return to `/papers`.
- [ ] "All done" shows no score. "Back to papers" works.
- [ ] No hex values appear in components; they are all in `paper-colors.css`. No network calls. No `localStorage`.
- [ ] `npm run dev --prefix client` runs without the server or Supabase credentials.

## 12. After review

Once the open questions are answered, this RFC becomes `papers-mvp-spec.md`, and the build follows it. Before
building, re-pull exact values from Paper with `get_jsx` and `get_computed_styles` for any element the exports do not
cover, such as the shell on artboard 22 and its speaker icon. The weekly MCP limit resets on 2026-10-17.
