import { api } from '../api.js';

// Call once per question when the student first answers it.
// correct: true if right on the first try. Later answers to the same questionId are ignored.
// The server takes the student from the login cookie, so it is not passed here.
export function saveResult({ subject, topic, questionId, correct }) {
  return api('/results', { method: 'POST', body: { subject, topic, questionId, correct } });
}
