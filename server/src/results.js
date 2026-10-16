import { Router } from 'express';
import { requireRole } from './auth.js';
import { handle } from './handle.js';
import { supabase } from './supabase.js';

const SUBJECTS = ['English', 'Maths'];

export const resultsRouter = Router();

// The game calls this once per question. The student comes from the session cookie,
// never from the request body, so nobody can save results for someone else.
resultsRouter.post('/', requireRole('student'), handle(async (req, res) => {
  const { subject, topic, questionId, correct } = req.body;
  if (!SUBJECTS.includes(subject) || !topic || !questionId || typeof correct !== 'boolean') {
    return res.status(400).json({ error: 'subject, topic, questionId and correct (boolean) are required' });
  }

  const { error } = await supabase.from('results').upsert(
    { student_id: req.session.id, subject, topic: String(topic), question_id: String(questionId), correct },
    { onConflict: 'student_id,subject,question_id', ignoreDuplicates: true },
  );
  if (error) throw error;
  res.status(201).json({ ok: true });
}));
