// Placeholder data until the dashboard reads from the API.
// Names are made up. Do not put real student data here (PDPA).

export const QUESTIONS_PER_STUDENT = 20;
export const MAX_TOPIC_SCORE = 5;

export const TOPICS = {
  English: ['Letter sounds', 'Sight words', 'Rhyming', 'Sentences'],
  Maths: ['Addition', 'Subtraction', 'Place value', 'Word problems'],
};

// Each class has its own made-up roster: [name, questions answered out of QUESTIONS_PER_STUDENT].
// A student counts as fully assessed once they have answered every question,
// unless the teacher has ticked or unticked them on the class page.
const ROSTERS = {
  1: [['Alicia Tan', 20], ['Bryan Koh', 12], ['Chloe Wong', 20], ['Darren Lee', 7], ['Farah Aziz', 15], ['Gavin Ng', 3], ['Hui Min Teo', 18], ['Isaac Lim', 9]],
  2: [['Jasmine Yeo', 20], ['Kumar Pillai', 20], ['Lucas Chan', 16], ['Nur Aisyah', 20], ['Owen Tay', 11], ['Rachel Sim', 20], ['Sean Ho', 8], ['Tara Menon', 20], ['Victor Ang', 14]],
  3: [['Amelia Seah', 20], ['Benjamin Loh', 20], ['Clara Foo', 20], ['Dev Raj', 20], ['Elaine Quek', 20], ['Faiz Hamid', 20], ['Grace Toh', 20], ['Harith Iskandar', 20]],
  4: [['John Low', 14], ['Jenny Lim', 20], ['Aisha Rahman', 9], ['Wei Jie Tan', 17], ['Priya Nair', 11], ['Ethan Goh', 6], ['Mei Ling Ong', 19], ['Daniel Chua', 12]],
  5: [['Adam Yusof', 20], ['Bernice Chia', 13], ['Cheng Hao Lim', 20], ['Divya Suresh', 5], ['Eugene Pang', 10], ['Felicia Low', 20], ['Hafiz Rahim', 17], ['Ivy Kwek', 2], ['Jun Wei Sng', 8], ['Kayla Fernandez', 15]],
  6: [['Liam Boey', 20], ['Maya Krishnan', 16], ['Nathan Yap', 20], ['Olivia Heng', 9], ['Ryan Tham', 20], ['Siti Nurhaliza', 12], ['Timothy Wee', 4], ['Umairah Salleh', 20], ['Xavier Lau', 18]],
};

export const classes = Object.entries(ROSTERS).map(([id, roster]) => ({
  id,
  name: `Class ${id}`,
  students: roster.map(([name, answered], i) => ({ id: `c${id}s${i + 1}`, name, answered })),
}));

export const findClass = (id) => classes.find((c) => c.id === id);
export const findStudent = (cls, id) => cls?.students.find((s) => s.id === id);

// The teacher's manual ticks on the class page, saved per subject and class.
export const ticksKey = (subject, classId) => `cty-assessed-${subject}-${classId}`;

export function readTicks(subject, classId) {
  try {
    return JSON.parse(localStorage.getItem(ticksKey(subject, classId))) ?? {};
  } catch {
    return {};
  }
}

export const isAssessed = (ticks, student) => ticks[student.id] ?? student.answered === QUESTIONS_PER_STUDENT;

// How many students in the class are fully assessed, for the Home tiles.
export function classProgress(cls, subject) {
  const ticks = readTicks(subject, cls.id);
  return { assessed: cls.students.filter((s) => isAssessed(ticks, s)).length, total: cls.students.length };
}

// Fake per-topic scores derived from how many questions the student answered.
export function topicScores(student, subject) {
  return TOPICS[subject].map((topic, i) => ({
    topic,
    score: Math.max(1, Math.min(MAX_TOPIC_SCORE, Math.round(student.answered / 4) + (i % 2 ? -1 : 0))),
  }));
}
