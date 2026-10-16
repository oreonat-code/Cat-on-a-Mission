-- Demo data for development. Run after schema.sql. All names are made up.
-- Do not run this against a database with real students.

insert into classes (name, level) values
  ('Class 1', 'Primary 1'), ('Class 2', 'Primary 1'), ('Class 3', 'Primary 1'),
  ('Class 4', 'Primary 1'), ('Class 5', 'Primary 1'), ('Class 6', 'Primary 1'),
  ('Class 1', 'Primary 2'), ('Class 2', 'Primary 2');

insert into students (id, name, class_id)
select v.id, v.name, c.id
from (values
  ('K7Q2M9', 'John Low', 'Class 3'),
  ('R4X8J2', 'Jenny Lim', 'Class 3'),
  ('W2N6T5', 'Aisha Rahman', 'Class 3'),
  ('H9B3P7', 'Wei Jie Tan', 'Class 3'),
  ('M5D8Z4', 'Priya Nair', 'Class 4'),
  ('F3L7V2', 'Ethan Goh', 'Class 4'),
  ('Y6C2R8', 'Mei Ling Ong', 'Class 4'),
  ('T8G4K3', 'Daniel Chua', 'Class 4')
) as v (id, name, class_name)
join classes c on c.name = v.class_name and c.level = 'Primary 1';

-- Class 3 has answered all 20 English questions; Class 4 has answered some.
insert into results (student_id, subject, topic, question_id, correct)
select s.id, 'English', t.topic, t.topic || '-' || n, abs(hashtext(s.id || t.topic || n)) % 4 <> 0
from students s
join classes c on c.id = s.class_id
cross join (values ('Letter sounds'), ('Sight words'), ('Rhyming'), ('Sentences')) as t (topic)
cross join generate_series(1, 5) as n
where c.level = 'Primary 1'
  and (c.name = 'Class 3' or (c.name = 'Class 4' and n <= 1 + abs(hashtext(s.id)) % 4))
on conflict do nothing;

-- Teacher T001. First create the user in Supabase: Authentication > Users > Add user,
-- with this email and a password, and tick "Auto Confirm User".
insert into teachers (id, email) values ('T001', 'teacher@example.com')
on conflict do nothing;
