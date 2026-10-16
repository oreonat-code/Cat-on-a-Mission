// Paper content. Adding a question is a data change here; a new `type` also needs a
// component registered in pages/PaperRunner.jsx. Read-aloud text is built from these
// fields by each question type, so it always matches the screen.
export const papers = [
  {
    id: 'english',
    title: 'English',
    questions: [
      {
        id: 'eng-is-are-001',
        type: 'fill-the-gap',
        prompt: 'Which word fits?',
        picture: 'three-sleeping-cats',
        pictureLabel: 'Three cats sleeping',
        before: 'The cats',
        after: 'sleeping.',
        choices: ['is', 'are'],
        answer: 'are',
      },
      {
        id: 'eng-one-or-many-001',
        type: 'fill-the-gap',
        prompt: 'One cat or many cats?',
        picture: 'one-vs-many-cats',
        before: 'I see three',
        after: '.',
        slotWidth: 230,
        choices: ['cat', 'cats'],
        answer: 'cats',
      },
      {
        id: 'eng-who-does-where-001',
        type: 'sentence-builder',
        prompt: 'Tell what Mochi does',
        picture: 'mochi-on-sofa',
        pictureLabel: 'Mochi is sleeping on the sofa',
        given: { label: 'Who?', text: 'The cat' },
        slots: [
          { key: 'doesWhat', label: 'Does what?', colour: 'mochi' },
          { key: 'where', label: 'Where?', colour: 'mint' },
        ],
        tiles: [
          { text: 'sleeps', slot: 'doesWhat' },
          { text: 'on the sofa', slot: 'where' },
          { text: 'jumps', slot: 'doesWhat' },
          { text: 'in the box', slot: 'where' },
        ],
        answer: { doesWhat: 'sleeps', where: 'on the sofa' },
      },
    ],
  },
  {
    id: 'math',
    title: 'Math',
    questions: [
      {
        id: 'math-add-pictures-001',
        type: 'add-with-pictures',
        prompt: 'How many fish in all?',
        left: { count: 3, colour: 'orange' },
        right: { count: 2, colour: 'blue' },
        choices: [4, 5, 6],
        answer: 5,
      },
      {
        id: 'math-take-away-001',
        type: 'take-away-with-pictures',
        prompt: '3 fish swim away. How many are left?',
        start: 8,
        takeAway: 3,
        choices: [4, 5, 6],
        answer: 5,
      },
      {
        id: 'math-hop-100-001',
        type: 'number-track',
        prompt: 'Hop by 100. What comes next?',
        given: [100, 200],
        slots: 3,
        choices: [500, 300, 700, 400],
        answer: [300, 400, 500],
      },
    ],
  },
];

export function getPaper(id) {
  return papers.find((p) => p.id === id);
}
