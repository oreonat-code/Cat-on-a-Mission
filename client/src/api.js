import { useEffect, useState } from 'react';

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Calls the Express API. The session cookie is sent automatically (same origin via Vite's proxy).
export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(`/api${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  // Session expired mid-visit: reload into the login page (auth calls handle 401 themselves).
  if (res.status === 401 && !path.startsWith('/auth/')) {
    window.location.assign('/login');
    return new Promise(() => {});
  }
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, data?.error ?? `Request failed (${res.status})`);
  return data;
}

// Loads `path` and reloads whenever it changes. Returns { data, error, loading }.
export function useApi(path) {
  const [state, setState] = useState({ data: null, error: null, loading: true });

  useEffect(() => {
    let current = true;
    setState({ data: null, error: null, loading: true });
    api(path).then(
      (data) => current && setState({ data, error: null, loading: false }),
      (error) => current && setState({ data: null, error, loading: false }),
    );
    return () => {
      current = false;
    };
  }, [path]);

  return state;
}
