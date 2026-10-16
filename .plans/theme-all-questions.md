# Theme all remaining questions

Base: `feat/cat-learning-adventures` at `337c8f1`. New worktree and branch:
`feat/theme-all-questions`. Uncommitted fish-animation work in the base checkout is untouched.

The “Which word fits?” scene is the visual reference. Keep the homepage, shared header, rewards,
question content and neutral answer behavior. Replace old question artwork with matching painted
illustrations and consistent framed panels:

- One or many: repeat a single illustrated cat with exact React-rendered counts and spoken captions.
- Sentence builder: wide sleeping-cat-on-sofa scene, larger slots, labelled choice groups.
- Addition and subtraction: repeat the original cartoon SVG fish; departed fish retain dashed outlines
  and arrows so colour is never the only cue.
- Count by 100: stepping-stone cards and native SVG arcs aligned by one grid; numbers
  remain real text. Every hop's increment is in the read-aloud.

Artwork: built-in imagegen with `sleeping-cats.webp` as a style reference. Exact prompts and final
asset paths are recorded in `client/src/assets/cat-world/README.md`.

Validate: production build, diff whitespace, every question on both subject journeys, exact animal
counts, single completion/reward, audio strings, keyboard controls and desktop layouts.
Phone and tablet support are outside this task's scope per the user. No new dependencies or server changes.

## Verified
- Production build and git diff --check pass.
- Full Maths and English journeys completed; each mission awarded exactly three fish.
- Nonmatching subtraction choice retained neutral feedback and earned one fish.
- DOM counts: addition 3 orange + 2 blue fish, subtraction 5 remaining + 3 departed, plural scene 1 + 3 cats.
- Number track disables used choices, advances the active slot, and awards its fish after the last slot only.
- Sentence choices work with Enter; completing one role disables its other choice while the other role remains available.
- Desktop 1440x900 and 1280x720 visual checks passed. All image assets load. No application errors; only existing React Router v7 migration warnings in development.
- New cat artwork totals about 74 kB of WebP assets. UI text, values and controls remain native elements.
- Earlier tablet checks were stopped after the user clarified desktop-only scope.

## Browser feedback applied
- Cat moves to the start of the shared trail; the trail now ends directly at the bowl.
- Removed the visible fish-group captions and number-path captions.
- Maths fish reuse the original SVG cartoon artwork; generated fish assets are removed.
- Removed the sitting cat from the number path.
