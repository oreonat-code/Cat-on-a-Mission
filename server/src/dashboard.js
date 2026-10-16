import { Router } from 'express';
import { requireRole } from './auth.js';
import { handle } from './handle.js';
import { supabase } from './supabase.js';

// Questions in one subject's set. A student is "complete" at this many answers.
export const QUESTIONS_PER_STUDENT = 20;

export const dashboardRouter = Router();
dashboardRouter.use(requireRole('teacher'));

const SUBJECTS = ['English', 'Maths'];

// Answers per student for one subject, as a Map of student id -> count.
async function answeredByStudent(studentIds, subject) {
  const counts = new Map(studentIds.map((id) => [id, 0]));
  if (studentIds.length === 0) return counts;
  const { data, error } = await supabase
    .from('student_answers')
    .select('student_id, answered')
    .eq('subject', subject)
    .in('student_id', studentIds);
  if (error) throw error;
  for (const r of data) counts.set(r.student_id, Math.min(r.answered, QUESTIONS_PER_STUDENT));
  return counts;
}

dashboardRouter.use((req, res, next) => {
  if (!SUBJECTS.includes(req.query.subject)) return res.status(400).json({ error: 'subject must be English or Maths' });
  next();
});

// GET /api/dashboard/classes?level=Primary 1&subject=English
dashboardRouter.get('/classes', handle(async (req, res) => {
  const { level, subject } = req.query;
  const { data: classes, error } = await supabase.from('classes').select('id, name').eq('level', level).order('id');
  if (error) throw error;

  const { data: students, error: sErr } = await supabase
    .from('students')
    .select('id, class_id')
    .in('class_id', classes.map((c) => c.id));
  if (sErr) throw sErr;
  const answered = await answeredByStudent(students.map((s) => s.id), subject);

  res.json({
    questionsPerStudent: QUESTIONS_PER_STUDENT,
    classes: classes.map((c) => {
      const mine = students.filter((s) => s.class_id === c.id);
      return {
        id: c.id,
        name: c.name,
        students: mine.length,
        complete: mine.filter((s) => answered.get(s.id) >= QUESTIONS_PER_STUDENT).length,
        answered: mine.reduce((sum, s) => sum + answered.get(s.id), 0),
      };
    }),
  });
}));

// GET /api/dashboard/classes/:id?subject=English
dashboardRouter.get('/classes/:id', handle(async (req, res) => {
  if (!/^\d+$/.test(req.params.id)) return res.status(404).json({ error: 'Class not found' });
  const { data: cls, error } = await supabase.from('classes').select('id, name, level').eq('id', req.params.id).maybeSingle();
  if (error) throw error;
  if (!cls) return res.status(404).json({ error: 'Class not found' });

  const { data: students, error: sErr } = await supabase.from('students').select('id, name').eq('class_id', cls.id);
  if (sErr) throw sErr;
  const answered = await answeredByStudent(students.map((s) => s.id), req.query.subject);

  res.json({
    questionsPerStudent: QUESTIONS_PER_STUDENT,
    class: cls,
    students: students.map((s) => ({ ...s, answered: answered.get(s.id) })),
  });
}));

// GET /api/dashboard/students/:id?subject=English
dashboardRouter.get('/students/:id', handle(async (req, res) => {
  const { data: student, error } = await supabase
    .from('students')
    .select('id, name, class_id, class:classes(name)')
    .eq('id', req.params.id)
    .maybeSingle();
  if (error) throw error;
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const { data: results, error: rErr } = await supabase
    .from('results')
    .select('topic, correct')
    .eq('student_id', student.id)
    .eq('subject', req.query.subject);
  if (rErr) throw rErr;

  const topics = new Map();
  for (const r of results) {
    const t = topics.get(r.topic) ?? { topic: r.topic, answered: 0, correct: 0 };
    t.answered += 1;
    if (r.correct) t.correct += 1;
    topics.set(r.topic, t);
  }

  res.json({
    questionsPerStudent: QUESTIONS_PER_STUDENT,
    student,
    answered: Math.min(results.length, QUESTIONS_PER_STUDENT),
    topics: [...topics.values()],
  });
}));
