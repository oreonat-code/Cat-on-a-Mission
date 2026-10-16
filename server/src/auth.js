import { Router } from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';
import { handle } from './handle.js';
import { supabase } from './supabase.js';

const COOKIE = 'cty_session';
const MAX_AGE_MS = 8 * 60 * 60 * 1000; // 8 hours

if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET === 'change-me') {
  throw new Error('Set SESSION_SECRET in server/.env (see .env.example).');
}

function normalise(id) {
  return String(id ?? '').trim().toUpperCase();
}

function setSession(res, session) {
  const token = jwt.sign(session, process.env.SESSION_SECRET, { expiresIn: MAX_AGE_MS / 1000 });
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE_MS,
  });
}

// Reads the signed cookie into req.session ({ role, id }) or leaves it null.
export function readSession(req, _res, next) {
  req.session = null;
  const token = req.cookies?.[COOKIE];
  if (token) {
    try {
      const { role, id } = jwt.verify(token, process.env.SESSION_SECRET);
      req.session = { role, id };
    } catch {
      // Expired or tampered cookie: treat as signed out.
    }
  }
  next();
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.session) return res.status(401).json({ error: 'Not signed in' });
    if (req.session.role !== role) return res.status(403).json({ error: 'Not allowed' });
    next();
  };
}

// Slows down anyone trying IDs or passwords one after another.
const loginLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: 'draft-7', legacyHeaders: false });

export const authRouter = Router();

// Step 1 of login. Students are signed in straight away; teachers go on to /login.
authRouter.post('/lookup', loginLimit, handle(async (req, res) => {
  const id = normalise(req.body.id);
  if (!id) return res.status(400).json({ error: 'id is required' });

  const { data: student, error } = await supabase.from('students').select('id').eq('id', id).maybeSingle();
  if (error) throw error;
  if (student) {
    setSession(res, { role: 'student', id });
    return res.json({ role: 'student', id });
  }

  const { data: teacher, error: tErr } = await supabase.from('teachers').select('id').eq('id', id).maybeSingle();
  if (tErr) throw tErr;
  res.json({ role: teacher ? 'teacher' : null });
}));

// Step 2 for teachers: password is checked by Supabase Auth.
authRouter.post('/login', loginLimit, handle(async (req, res) => {
  const id = normalise(req.body.id);
  const password = String(req.body.password ?? '');
  if (!id || !password) return res.status(400).json({ error: 'id and password are required' });

  const { data: teacher, error } = await supabase.from('teachers').select('email').eq('id', id).maybeSingle();
  if (error) throw error;
  if (!teacher) return res.status(401).json({ error: 'Wrong ID or password' });

  // Separate client so a sign-in never changes the shared server client's auth state.
  const authClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: authErr } = await authClient.auth.signInWithPassword({ email: teacher.email, password });
  if (authErr) return res.status(401).json({ error: 'Wrong ID or password' });

  setSession(res, { role: 'teacher', id });
  res.json({ role: 'teacher', id });
}));

authRouter.get('/me', (req, res) => {
  if (!req.session) return res.status(401).json({ error: 'Not signed in' });
  res.json(req.session);
});

authRouter.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE);
  res.status(204).end();
});
