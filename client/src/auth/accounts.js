// Placeholder sign-in until the server has real accounts. No server or database is called.
// The functions keep the same shape as the API versions so the login page does not change.
//
// DEMO ONLY: these passwords sit in the browser bundle. Real password checks
// must happen on the server, against hashed passwords.

const STUDENTS = ['S001', 'S002', 'S003'];
const TEACHERS = { T001: 'cty123' };
const KEY = 'cty-session';

function normalise(id) {
  return String(id ?? '').trim().toUpperCase();
}

function save(session) {
  try {
    localStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    // Storage blocked: the session lasts until the page reloads.
  }
  return session;
}

// Step 1: returns { role: 'student' | 'teacher' | null, id }. Students are signed in by this call.
export async function lookupId(id) {
  const key = normalise(id);
  if (STUDENTS.includes(key)) return save({ role: 'student', id: key });
  if (key in TEACHERS) return { role: 'teacher' };
  return { role: null };
}

// Step 2 for teachers: returns { role, id } on success, or null for a wrong password.
export async function teacherLogin(id, password) {
  const key = normalise(id);
  if (TEACHERS[key] !== password) return null;
  return save({ role: 'teacher', id: key });
}

// Returns the signed-in { role, id }, or null.
export async function currentSession() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export async function logout() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing stored.
  }
}
