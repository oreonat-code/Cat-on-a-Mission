// Placeholder data until the dashboard reads from the API.
// Names are made up. Do not put real student data here (PDPA).

export const QUESTIONS_PER_STUDENT = 20;
export const MAX_TOPIC_SCORE = 5;

export const SUBJECTS = ['English', 'Maths'];
export const LEVELS = ['Primary 1', 'Primary 2'];

export const TOPICS = {
  English: ['Letter sounds', 'Sight words', 'Rhyming', 'Sentences'],
  Maths: ['Addition', 'Subtraction', 'Place value', 'Word problems'],
};

// done = students fully assessed in the class, out of QUESTIONS_PER_STUDENT
export const classes = [
  { id: 1, done: 0 },
  { id: 2, done: 0 },
  { id: 3, done: 20 },
  { id: 4, done: 9 },
  { id: 5, done: 0 },
  { id: 6, done: 0 },
];

export const students = [
  { id: 's1', name: 'John Low', answered: 14 },
  { id: 's2', name: 'Jenny Lim', answered: 20 },
  { id: 's3', name: 'Aisha Rahman', answered: 9 },
  { id: 's4', name: 'Wei Jie Tan', answered: 17 },
  { id: 's5', name: 'Priya Nair', answered: 11 },
  { id: 's6', name: 'Ethan Goh', answered: 6 },
  { id: 's7', name: 'Mei Ling Ong', answered: 19 },
  { id: 's8', name: 'Daniel Chua', answered: 12 },
];

// Fake per-topic scores derived from how many questions the student answered.
export function topicScores(student, subject) {
  return TOPICS[subject].map((topic, i) => ({
    topic,
    score: Math.max(1, Math.min(MAX_TOPIC_SCORE, Math.round(student.answered / 4) + (i % 2 ? -1 : 0))),
  }));
}
