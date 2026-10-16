// Paper content. Adding a question is a data change here; a new `type` also needs a
// component registered in pages/PaperRunner.jsx.
export const papers = [
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
        pictureLabel: 'Three cats sleeping',
        before: 'The cats',
        after: 'sleeping.',
        choices: ['is', 'are'],
        answer: 'are',
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
        speech: 'How many fish in all? Three plus two equals… Four, five, or six?',
        left: { count: 3, colour: 'orange' },
        right: { count: 2, colour: 'blue' },
        choices: [4, 5, 6],
        answer: 5,
      },
    ],
  },
];

export function getPaper(id) {
  return papers.find((p) => p.id === id);
}
