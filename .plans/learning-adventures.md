# Learning Adventures
Implement the supplied references in an isolated worktree, homepage first, then all five existing question types.
1. Homepage: shared room, CTY logo, illustrated subject cards, fish trail, shop, wardrobe, badges and settings.
2. Questions: room and trail, large native controls, answer audio, responsive layouts, shared completion screen.
3. Rewards: one fish per completed question regardless of correctness. Persist only balance, accessories, completed subjects and visual preferences. No names, answers, recordings or backend changes.
4. Verify: production build, full subject journeys, storage/rewards/shop/equip, keyboard/dialogs, reduced motion, comfort theme, desktop/mobile overflow and contrast.
Keep /papers URLs. Leave original checkout's uncommitted changes untouched. Prompts: client/src/assets/cat-world/README.md.

## Verification completed
- Production build and git diff --check passed.
- Browser: English fill-the-gap, plural choice and sentence builder completed.
- Browser: Maths addition, subtraction and number track completed; a nonmatching answer still earned one fish with neutral feedback.
- Both completion screens showed three collected fish and a complete trail.
- Shop deducted three fish exactly; insufficient funds disabled the other purchase; equipped bow survived reload. Both subject badges appeared.
- Native dialog Escape restored focus to its opening button. Comfort and Calm settings updated the document attributes.
- Desktop homepage checked at 1440 x 900, with bottom navigation visible.
- WCAG formula checks: navy/white 14.72:1, navy/cream 13.74:1, navy/cobalt tint 9.53:1, navy/mint tint 10.88:1, muted/white 6.58:1, white/cobalt 8.17:1, target border/white 3.89:1.
- Phone checks are outside the requested scope per the user's clarification.
- Read-aloud uses existing browser speech synthesis; real-device audio and testing with children remain manual checks.
