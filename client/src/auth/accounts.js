import { ApiError, api } from '../api.js';

// Step 1: returns { role: 'student' | 'teacher' | null, id }. Students are signed in by this call.
export function lookupId(id) {
  return api('/auth/lookup', { method: 'POST', body: { id } });
}

// Step 2 for teachers: returns { role, id } on success, or null for a wrong password.
export async function teacherLogin(id, password) {
  try {
    return await api('/auth/login', { method: 'POST', body: { id, password } });
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) return null;
    throw e;
  }
}

// Returns the signed-in { role, id }, or null.
export async function currentSession() {
  try {
    return await api('/auth/me');
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) return null;
    throw e;
  }
}

export function logout() {
  return api('/auth/logout', { method: 'POST' });
}
