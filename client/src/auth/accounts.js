// Placeholder sign-in until the server has real accounts.
// Both functions are async so they can be swapped for fetch('/api/...') calls
// without changing the login page.
//
// DEMO ONLY: these passwords sit in the browser bundle. Real password checks
// must happen on the server, against hashed passwords.

const STUDENTS = ['S001', 'S002', 'S003'];
const TEACHERS = { T001: 'cty123' };

function normalise(id) {
  return id.trim().toUpperCase();
}

// Returns 'student', 'teacher' or null when the ID is not known.
export async function lookupId(id) {
  const key = normalise(id);
  if (STUDENTS.includes(key)) return 'student';
  if (key in TEACHERS) return 'teacher';
  return null;
}

export async function checkTeacherPassword(id, password) {
  return TEACHERS[normalise(id)] === password;
}
