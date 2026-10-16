-- Run this in the Supabase SQL editor.
create table if not exists todos (
  id bigint generated always as identity primary key,
  title text not null,
  created_at timestamptz not null default now()
);
