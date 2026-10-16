# Team 8

React (Vite) + Express + Postgres (Supabase).

## Setup
1. Create a Supabase project. In its SQL editor, run `schema.sql`, then `seed.sql` for made-up demo data.
2. `cp server/.env.example server/.env` and fill in `SUPABASE_URL` (project URL only), `SUPABASE_SERVICE_KEY`
   (the `sb_secret_...` key) and `SESSION_SECRET` (any long random string).
3. Add a teacher: in Supabase, Authentication > Users > Add user with `teacher@example.com` and a password
   (tick "Auto Confirm User"). `seed.sql` links that email to teacher ID `T001`.
4. `npm run install:all`
5. `npm run dev` — client on http://localhost:5173, API on http://localhost:5000

## How data flows
- Login: `POST /api/auth/lookup` (ID), then `POST /api/auth/login` for teachers. The server sets an httpOnly
  session cookie; the browser never talks to Supabase directly.
- Game: `saveResult()` in `client/src/game/results.js` posts each answer to `POST /api/results`.
- Dashboard: reads `GET /api/dashboard/...` (teachers only).
