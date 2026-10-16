-- Run this in the Supabase SQL editor.
-- Only the Express server reads and writes these tables, using the secret key.
-- Row Level Security is on with no policies, so the public (publishable) key gets nothing.

create table if not exists classes (
  id bigint generated always as identity primary key,
  name text not null,
  level text not null check (level in ('Primary 1', 'Primary 2'))
);

-- Students sign in with their ID only, so make IDs hard to guess (not S001, S002...).
create table if not exists students (
  id text primary key,
  name text not null,
  class_id bigint not null references classes (id)
);

-- Teacher passwords live in Supabase Auth (Authentication > Users), not here.
-- email must match the teacher's Supabase Auth user.
create table if not exists teachers (
  id text primary key,
  email text not null unique
);

-- One row per question a student has answered. correct = right on the first try.
-- A repeat answer to the same question is ignored, so retries don't inflate counts.
create table if not exists results (
  id bigint generated always as identity primary key,
  student_id text not null references students (id) on delete cascade,
  subject text not null check (subject in ('English', 'Maths')),
  topic text not null,
  question_id text not null,
  correct boolean not null,
  answered_at timestamptz not null default now(),
  unique (student_id, subject, question_id)
);

create index if not exists results_student_subject on results (student_id, subject);
create index if not exists students_class on students (class_id);

-- Answers per student per subject, counted in the database (API reads are capped at 1000 rows).
-- security_invoker keeps RLS in force, so the public key can't read it either.
create or replace view student_answers with (security_invoker = true) as
  select student_id, subject, count(*)::int as answered
  from results
  group by student_id, subject;

alter table classes enable row level security;
alter table students enable row level security;
alter table teachers enable row level security;
alter table results enable row level security;
